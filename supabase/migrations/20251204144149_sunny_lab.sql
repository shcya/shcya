/*
  # Fix Database Security Issues

  1. Remove Unused Indexes
    - Drop unused indexes that are not being utilized by queries
    - Keep only necessary indexes for performance

  2. Consolidate Duplicate Policies
    - Remove duplicate permissive policies for authenticated users
    - Keep only the necessary policies for each table

  3. Secure Function Search Path
    - Fix the mutable search_path issue in update_updated_at_column function

  4. Security Improvements
    - Ensure proper RLS policies without duplication
    - Maintain data access security while removing redundancy
*/

-- 1. Remove unused indexes
DROP INDEX IF EXISTS idx_service_inquiries_created_at;
DROP INDEX IF EXISTS idx_service_inquiries_service_type;
DROP INDEX IF EXISTS idx_dsc_applications_created_at;
DROP INDEX IF EXISTS idx_dsc_applications_status;
DROP INDEX IF EXISTS idx_dsc_applications_email;
DROP INDEX IF EXISTS idx_job_applications_created_at;
DROP INDEX IF EXISTS idx_job_applications_position;
DROP INDEX IF EXISTS idx_job_applications_status;

-- 2. Remove duplicate policies for service_inquiries
DROP POLICY IF EXISTS "allow_authenticated_select_service_inquiries" ON public.service_inquiries;

-- 3. Remove duplicate policies for dsc_applications
DROP POLICY IF EXISTS "allow_authenticated_select_dsc_applications" ON public.dsc_applications;

-- 4. Remove duplicate policies for job_applications
DROP POLICY IF EXISTS "allow_authenticated_select_job_applications" ON public.job_applications;

-- 5. Fix function search path security issue
-- Drop and recreate the function with secure search_path
DROP FUNCTION IF EXISTS public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- 6. Add only essential indexes for actual query patterns
-- These indexes are based on common query patterns in the application

-- Index for ordering service inquiries by creation date (used in getAll())
CREATE INDEX IF NOT EXISTS idx_service_inquiries_created_at_desc 
ON public.service_inquiries (created_at DESC);

-- Index for filtering DSC applications by status (used in getByStatus())
CREATE INDEX IF NOT EXISTS idx_dsc_applications_status_created_at 
ON public.dsc_applications (status, created_at DESC);

-- Index for filtering job applications by status (used in getByStatus())
CREATE INDEX IF NOT EXISTS idx_job_applications_status_created_at 
ON public.job_applications (status, created_at DESC);

-- 7. Ensure RLS is properly enabled (verification)
ALTER TABLE public.service_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dsc_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- 8. Verify remaining policies are sufficient
-- The "Enable read access for all users" policies should be sufficient for public read access
-- The anon insert policies allow form submissions
-- The service_role policies allow admin access