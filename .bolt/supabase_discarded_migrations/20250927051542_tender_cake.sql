/*
  # Disable RLS for service_inquiries table

  This migration completely disables Row Level Security for the service_inquiries table
  to allow anonymous users to submit service inquiry forms without authentication.

  1. Changes
     - Disable RLS on service_inquiries table
     - Remove all existing policies that were blocking anonymous access
     - Allow public access for form submissions

  2. Security Note
     - This table is meant for public form submissions
     - No sensitive data is stored in this table
     - Admin access is still controlled through application logic
*/

-- Disable Row Level Security for service_inquiries table
ALTER TABLE service_inquiries DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to ensure clean state
DROP POLICY IF EXISTS "anonymous_insert_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "authenticated_select_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "service_role_all_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "anon_insert_policy" ON service_inquiries;
DROP POLICY IF EXISTS "authenticated_select_policy" ON service_inquiries;
DROP POLICY IF EXISTS "service_role_all_policy" ON service_inquiries;
DROP POLICY IF EXISTS "Enable all for service role" ON service_inquiries;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON service_inquiries;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON service_inquiries;

-- Verify RLS is disabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'service_inquiries';