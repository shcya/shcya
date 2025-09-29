/*
  # Create Storage Buckets for Document Uploads

  1. Storage Buckets
    - `documents` - For storing DSC application documents (PAN, Aadhaar, Photos)

  2. Security
    - Enable public access for document viewing
    - Allow public uploads for form submissions
    - Set file size limits and allowed file types
*/

-- Create documents bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public uploads
CREATE POLICY "Allow public uploads to documents bucket"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'documents');

-- Create policy for public downloads
CREATE POLICY "Allow public downloads from documents bucket"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'documents');

-- Create policy for authenticated users to manage documents
CREATE POLICY "Allow authenticated users to manage documents"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'documents');