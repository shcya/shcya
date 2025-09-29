/*
  # Final Fix for RLS Policies

  1. Complete Reset
    - Disable RLS on both tables
    - Drop all existing policies
    - Create simple, permissive policies
    
  2. Service Inquiries Table
    - Allow anonymous users to insert data
    - Allow authenticated users to read data
    
  3. DSC Applications Table  
    - Allow anonymous users to insert data
    - Allow authenticated users to read data
    
  4. Security
    - Service role has full access to both tables
    - Simple policies to avoid conflicts
*/

-- Disable RLS temporarily to clean up
ALTER TABLE service_inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE dsc_applications DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "anonymous_insert_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "authenticated_select_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "service_role_all_service_inquiries" ON service_inquiries;
DROP POLICY IF EXISTS "anon_insert_policy" ON service_inquiries;
DROP POLICY IF EXISTS "authenticated_select_policy" ON service_inquiries;
DROP POLICY IF EXISTS "service_role_all_policy" ON service_inquiries;
DROP POLICY IF EXISTS "Users can read own data" ON service_inquiries;

DROP POLICY IF EXISTS "Enable all for service role" ON dsc_applications;
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON dsc_applications;
DROP POLICY IF EXISTS "Enable select for authenticated users" ON dsc_applications;

-- Re-enable RLS
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsc_applications ENABLE ROW LEVEL SECURITY;

-- Create simple, working policies for service_inquiries
CREATE POLICY "allow_anon_insert_service_inquiries"
  ON service_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "allow_authenticated_select_service_inquiries"
  ON service_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_service_role_all_service_inquiries"
  ON service_inquiries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create simple, working policies for dsc_applications
CREATE POLICY "allow_anon_insert_dsc_applications"
  ON dsc_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "allow_authenticated_select_dsc_applications"
  ON dsc_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_service_role_all_dsc_applications"
  ON dsc_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);