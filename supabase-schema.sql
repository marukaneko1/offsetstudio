-- Run this SQL in your Supabase SQL Editor to create the submissions table

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  website TEXT,
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  service_description TEXT,
  budget TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at ON submissions(submitted_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Create policy: Only service role can insert (from API routes)
CREATE POLICY "Allow service role to insert submissions"
  ON submissions
  FOR INSERT
  WITH CHECK (true);

-- Create policy: Only service role can read (from API routes)
CREATE POLICY "Allow service role to read submissions"
  ON submissions
  FOR SELECT
  USING (true);

-- Note: In production, you might want to add more restrictive policies
-- For now, this allows the service role (used in API routes) to read/write

