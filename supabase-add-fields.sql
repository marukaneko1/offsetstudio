-- Run this SQL to add the new fields to your existing submissions table
-- This is safe to run even if the columns already exist

-- Add service_description column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'submissions' AND column_name = 'service_description'
  ) THEN
    ALTER TABLE submissions ADD COLUMN service_description TEXT;
  END IF;
END $$;

-- Add budget column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'submissions' AND column_name = 'budget'
  ) THEN
    ALTER TABLE submissions ADD COLUMN budget TEXT;
  END IF;
END $$;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'submissions'
ORDER BY ordinal_position;

