/*
  # Comprehensive RLS Policy Fix for Service Inquiries

  1. Security Changes
    - Drop all existing policies that might be blocking anonymous users
    - Create new policy allowing anonymous users to insert service inquiries
    - Ensure authenticated users can view inquiries
    - Maintain service role access for admin operations

  2. Tables Affected
    - `service_inquiries` - Fix INSERT policy for anonymous users
*/

-- First, disable RLS temporarily to clean up
ALTER TABLE service_inquiries DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous service inquiry submissions" ON service_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "Enable all for service role" ON service_inquiries;
DROP POLICY IF EXISTS "Users can read own data" ON service_inquiries;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON service_inquiries;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON service_inquiries;

-- Re-enable RLS
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;

-- Create a simple, permissive policy for anonymous inserts
CREATE POLICY "anonymous_insert_service_inquiries"
  ON service_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all inquiries
CREATE POLICY "authenticated_select_service_inquiries"
  ON service_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role full access
CREATE POLICY "service_role_all_service_inquiries"
  ON service_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);