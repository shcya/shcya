/*
  # Fix Row Level Security Policies

  1. Security Updates
    - Drop existing restrictive policies
    - Create new policies allowing anonymous users to insert data
    - Allow public access for form submissions
    - Maintain security for data viewing (authenticated users only)

  2. Tables Updated
    - service_inquiries: Allow anonymous INSERT, authenticated SELECT
    - dsc_applications: Allow anonymous INSERT, authenticated SELECT
*/

-- Drop existing policies that might be too restrictive
DROP POLICY IF EXISTS "Allow authenticated users to view service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "Allow public insert on service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "Allow authenticated users to view dsc_applications" ON dsc_applications;
DROP POLICY IF EXISTS "Allow public insert on dsc_applications" ON dsc_applications;

-- Create new policies for service_inquiries
CREATE POLICY "Enable insert for anonymous users" ON service_inquiries
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users" ON service_inquiries
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Enable all for service role" ON service_inquiries
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create new policies for dsc_applications
CREATE POLICY "Enable insert for anonymous users" ON dsc_applications
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Enable select for authenticated users" ON dsc_applications
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Enable all for service role" ON dsc_applications
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsc_applications ENABLE ROW LEVEL SECURITY;