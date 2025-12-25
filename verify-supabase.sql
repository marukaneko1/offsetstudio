-- Run this in Supabase SQL Editor to verify everything was created correctly

-- Check if the table exists and see its structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'submissions'
ORDER BY ordinal_position;

-- Check if indexes were created
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'submissions';

-- Check if RLS is enabled
SELECT 
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'submissions';

-- Check if policies were created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies
WHERE tablename = 'submissions';

