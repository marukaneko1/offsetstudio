-- Run this to verify everything is set up correctly
-- This will show you what exists without errors

-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'submissions'
) AS table_exists;

-- Count policies (should be 2)
SELECT COUNT(*) AS policy_count
FROM pg_policies
WHERE tablename = 'submissions';

-- Check RLS is enabled
SELECT 
    tablename,
    rowsecurity AS rls_enabled
FROM pg_tables
WHERE tablename = 'submissions';

-- List all policies
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'submissions';

