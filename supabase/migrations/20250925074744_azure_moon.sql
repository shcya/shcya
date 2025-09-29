/*
  # SHCYA Professional Services Database Schema

  1. New Tables
    - `service_inquiries`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `phone` (text, required)
      - `company` (text, optional)
      - `service_type` (text, required)
      - `message` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `dsc_applications`
      - `id` (uuid, primary key)
      - `applicant_name` (text, required)
      - `email` (text, required)
      - `mobile` (text, required)
      - `pan_number` (text, required)
      - `aadhaar_number` (text, required)
      - `dsc_class` (text, required)
      - `application_type` (text, required)
      - `organization` (text, optional)
      - `designation` (text, optional)
      - `address` (text, required)
      - `city` (text, required)
      - `state` (text, required)
      - `pincode` (text, required)
      - `pan_document_url` (text, optional)
      - `aadhaar_document_url` (text, optional)
      - `photo_document_url` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public insert access (for form submissions)
    - Add policies for authenticated admin access (for viewing submissions)
*/

-- Create service_inquiries table
CREATE TABLE IF NOT EXISTS service_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text,
  service_type text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create dsc_applications table
CREATE TABLE IF NOT EXISTS dsc_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  applicant_name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  pan_number text NOT NULL,
  aadhaar_number text NOT NULL,
  dsc_class text NOT NULL DEFAULT 'class2',
  application_type text NOT NULL DEFAULT 'new',
  organization text,
  designation text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  pan_document_url text,
  aadhaar_document_url text,
  photo_document_url text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsc_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for service_inquiries
CREATE POLICY "Allow public insert on service_inquiries"
  ON service_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view service_inquiries"
  ON service_inquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for dsc_applications
CREATE POLICY "Allow public insert on dsc_applications"
  ON dsc_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view dsc_applications"
  ON dsc_applications
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_inquiries_created_at ON service_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_service_inquiries_service_type ON service_inquiries(service_type);
CREATE INDEX IF NOT EXISTS idx_dsc_applications_created_at ON dsc_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dsc_applications_status ON dsc_applications(status);
CREATE INDEX IF NOT EXISTS idx_dsc_applications_email ON dsc_applications(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_service_inquiries_updated_at
  BEFORE UPDATE ON service_inquiries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dsc_applications_updated_at
  BEFORE UPDATE ON dsc_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();