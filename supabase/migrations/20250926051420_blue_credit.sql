/*
  # Fix RLS Policy for Service Inquiries

  1. Security Changes
    - Drop existing restrictive policies on service_inquiries table
    - Create new policy allowing anonymous users to insert service inquiries
    - Maintain security by allowing only INSERT operations for anonymous users
    - Keep SELECT permissions for authenticated users only

  2. Changes Made
    - Enable RLS on service_inquiries table (if not already enabled)
    - Drop any existing policies that might be blocking inserts
    - Create "Allow anonymous service inquiry submissions" policy for INSERT operations
    - Create "Allow authenticated users to view inquiries" policy for SELECT operations
*/

-- Ensure RLS is enabled on service_inquiries table
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON service_inquiries;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON service_inquiries;
DROP POLICY IF EXISTS "Enable all for service role" ON service_inquiries;
DROP POLICY IF EXISTS "Users can read own data" ON service_inquiries;
DROP POLICY IF EXISTS "Allow anonymous service inquiry submissions" ON service_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view inquiries" ON service_inquiries;

-- Create policy to allow anonymous users to submit service inquiries
CREATE POLICY "Allow anonymous service inquiry submissions"
  ON service_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all service inquiries
CREATE POLICY "Allow authenticated users to view inquiries"
  ON service_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow service role full access (for admin operations)
CREATE POLICY "Enable all for service role"
  ON service_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);