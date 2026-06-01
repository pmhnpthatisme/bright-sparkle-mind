-- Add HIPAA consent column to contact_submissions table
ALTER TABLE public.contact_submissions ADD COLUMN consent_hipaa boolean NOT NULL DEFAULT false;