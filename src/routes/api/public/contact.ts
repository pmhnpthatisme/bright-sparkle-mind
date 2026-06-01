import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(7).max(40).regex(/^[0-9+()\-.\s]+$/),
  message: z.string().trim().min(1).max(5000),
  consent_reply: z.literal(true),
  consent_comms: z.literal(true),
  consent_crisis: z.literal(true),
});

// Simple in-memory rate limit (5 per 10 min per IP). Resets on cold start.
const HITS = new Map<string, { count: number; resetAt: number }>();
const RL_WINDOW_MS = 10 * 60 * 1000;
const RL_MAX = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const rec = HITS.get(ip);
  if (!rec || rec.resetAt < now) {
    HITS.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS });
    return true;
  }
  if (rec.count >= RL_MAX) return false;
  rec.count += 1;
  return true;
}

const TO_EMAIL = "lumentelepsych@gmail.com";

async function sendViaResend(input: z.infer<typeof ContactSchema>) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;
  if (!lovableKey || !resendKey) {
    return { ok: false, error: "Email service not configured (Resend connector not linked)" };
  }
  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1e293b">
      <h2 style="color:#4c1d95;margin:0 0 16px">New patient inquiry — Lumen Telepsych</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#64748b">Name</td><td style="padding:6px 0;font-weight:bold">${escapeHtml(input.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(input.email)}">${escapeHtml(input.email)}</a></td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Phone</td><td style="padding:6px 0"><a href="tel:${escapeHtml(input.phone)}">${escapeHtml(input.phone)}</a></td></tr>
      </table>
      <h3 style="color:#4c1d95;margin:20px 0 8px;font-size:15px">Message</h3>
      <p style="white-space:pre-wrap;background:#f5f3ff;padding:14px;border-radius:10px;font-size:14px;line-height:1.5">${escapeHtml(input.message)}</p>
      <p style="font-size:12px;color:#64748b;margin-top:18px">Patient has consented to receive a reply at the email/phone above and has acknowledged the crisis-care and communications disclosures.</p>
    </div>
  `;
  try {
    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: "Lumen Telepsych <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: input.email,
        subject: `New patient inquiry — ${input.name}`,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `Resend ${res.status}: ${text.slice(0, 300)}` };
    }
    return { ok: true, error: null as string | null };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!),
  );
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip =
          request.headers.get("cf-connecting-ip") ||
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown";
        if (!rateLimit(ip)) {
          return Response.json(
            { ok: false, error: "Too many requests. Please try again in a few minutes." },
            { status: 429 },
          );
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
        }

        const parsed = ContactSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            { ok: false, error: "Please fill out every field and check all three consent boxes." },
            { status: 400 },
          );
        }
        const data = parsed.data;

        const emailResult = await sendViaResend(data);

        const { error: dbError } = await supabaseAdmin.from("contact_submissions").insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          consent_reply: true,
          consent_comms: true,
          consent_crisis: true,
          email_sent: emailResult.ok,
          email_error: emailResult.ok ? null : emailResult.error,
        });

        if (dbError && !emailResult.ok) {
          return Response.json(
            { ok: false, error: "Couldn't save your message. Please text or call us directly." },
            { status: 500 },
          );
        }

        return Response.json({ ok: true });
      },
    },
  },
});