/*
  # Reset Service Inquiries RLS Policies

  This migration completely resets the RLS policies for the service_inquiries table
  to allow anonymous users to submit service inquiries.

  1. Security Changes
    - Disable RLS temporarily to clean up
    - Drop all existing policies that might be conflicting
    - Re-enable RLS with proper policies
    - Allow anonymous users (anon role) to INSERT data
    - Allow authenticated users to SELECT data
    - Allow service role full access

  2. Policy Details
    - `anon_insert_policy`: Allows anonymous users to submit inquiries
    - `authenticated_select_policy`: Allows authenticated users to view inquiries
    - `service_role_all_policy`: Allows service role full access
*/

-- Disable RLS temporarily to clean up existing policies
ALTER TABLE service_inquiries DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "anonymous_insert_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "authenticated_select_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "service_role_all_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "Users can read own data" ON service_inquiries;
DROP POLICY IF EXISTS "Enable all for service role" ON service_inquiries;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON service_inquiries;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON service_inquiries;

-- Re-enable RLS
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert service inquiries
CREATE POLICY "anon_insert_policy" ON service_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to select service inquiries
CREATE POLICY "authenticated_select_policy" ON service_inquiries
  FOR SELECT TO authenticated
  USING (true);

-- Create policy to allow service role full access
CREATE POLICY "service_role_all_policy" ON service_inquiries
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Verify the policies are created correctly
SELECT schemaname, tablename, policyname, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'service_inquiries';