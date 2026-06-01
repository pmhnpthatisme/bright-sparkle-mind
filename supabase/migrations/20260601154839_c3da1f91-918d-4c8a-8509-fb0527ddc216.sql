
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  consent_reply BOOLEAN NOT NULL,
  consent_comms BOOLEAN NOT NULL,
  consent_crisis BOOLEAN NOT NULL,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  email_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon;
GRANT INSERT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact inquiry"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent_reply = true
    AND consent_comms = true
    AND consent_crisis = true
    AND length(name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(phone) BETWEEN 7 AND 40
    AND length(message) BETWEEN 1 AND 5000
  );
