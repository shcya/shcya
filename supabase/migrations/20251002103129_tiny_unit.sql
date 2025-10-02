/*
  # Create job applications table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `position_applied` (text, required)
      - `experience_years` (integer, default 0)
      - `current_company` (text, optional)
      - `qualification` (text, required)
      - `skills` (text, optional)
      - `resume_url` (text, optional)
      - `cover_letter` (text, optional)
      - `expected_salary` (text, optional)
      - `availability` (text, default 'immediate')
      - `employment_type_preference` (text, default 'full-time')
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `job_applications` table
    - Add policy for anonymous users to insert applications
    - Add policy for authenticated users to read applications
    - Add policy for service role to manage all applications

  3. Indexes
    - Index on created_at for sorting
    - Index on position_applied for filtering
    - Index on status for filtering
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position_applied text NOT NULL,
  experience_years integer DEFAULT 0,
  current_company text,
  qualification text NOT NULL,
  skills text,
  resume_url text,
  cover_letter text,
  expected_salary text,
  availability text DEFAULT 'immediate',
  employment_type_preference text DEFAULT 'full-time',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Enable read access for all users"
  ON job_applications
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "allow_anon_insert_job_applications"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "allow_authenticated_select_job_applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_service_role_all_job_applications"
  ON job_applications
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at 
  ON job_applications (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_job_applications_position 
  ON job_applications (position_applied);

CREATE INDEX IF NOT EXISTS idx_job_applications_status 
  ON job_applications (status);

-- Trigger for updated_at
CREATE TRIGGER update_job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();