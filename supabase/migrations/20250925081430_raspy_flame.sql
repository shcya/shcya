/*
  # Fix Storage Policies for DSC Documents

  1. Storage Buckets
    - Create dsc-documents bucket if not exists
    - Set up proper policies for file uploads

  2. Security
    - Allow public uploads to dsc-documents bucket
    - Allow public access to uploaded files
*/

-- Create storage bucket for DSC documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('dsc-documents', 'dsc-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to dsc-documents bucket
CREATE POLICY "Allow public uploads to dsc-documents"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'dsc-documents');

-- Allow public access to dsc-documents
CREATE POLICY "Allow public access to dsc-documents"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'dsc-documents');

-- Allow authenticated users to manage dsc-documents
CREATE POLICY "Allow authenticated users to manage dsc-documents"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'dsc-documents');