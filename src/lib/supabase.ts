import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export interface ServiceInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service_type: string;
  message?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DSCApplication {
  id?: string;
  applicant_name: string;
  email: string;
  mobile: string;
  pan_number: string;
  aadhaar_number: string;
  dsc_class: string;
  application_type: string;
  organization?: string;
  designation?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  pan_document_url?: string;
  aadhaar_document_url?: string;
  photo_document_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface JobApplication {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  position_applied: string;
  experience_years: number;
  current_company?: string;
  qualification: string;
  skills?: string;
  resume_url?: string;
  cover_letter?: string;
  expected_salary?: string;
  availability: string;
  employment_type_preference: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

// Service functions
export const serviceInquiryService = {
  async create(inquiry: ServiceInquiry) {
    try {
      console.log('Submitting service inquiry:', inquiry);
      
      // Ensure we're using the anon key for public submissions
      const { data, error } = await supabase
        .from('service_inquiries')
        .insert([{
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone,
          company: inquiry.company || null,
          service_type: inquiry.service_type,
          message: inquiry.message || null
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Service inquiry error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // More specific error messages
        if (error.code === '42501') {
          throw new Error('Database permission error. Please try again or contact support.');
        } else if (error.code === '23505') {
          throw new Error('This inquiry has already been submitted.');
        } else {
          throw new Error(`Failed to submit inquiry: ${error.message}`);
        }
      }
      
      console.log('Service inquiry submitted successfully:', data);
      return data;
    } catch (err) {
      console.error('Service inquiry submission error:', err);
      throw err;
    }
  },

  async getAll() {
    const { data, error } = await supabase
      .from('service_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getByServiceType(serviceType: string) {
    const { data, error } = await supabase
      .from('service_inquiries')
      .select('*')
      .eq('service_type', serviceType)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

export const dscApplicationService = {
  async create(application: DSCApplication) {
    try {
      console.log('Submitting DSC application:', application);
      
      // Ensure we're using the anon key for public submissions
      const { data, error } = await supabase
        .from('dsc_applications')
        .insert([{
          applicant_name: application.applicant_name,
          email: application.email,
          mobile: application.mobile,
          pan_number: application.pan_number,
          aadhaar_number: application.aadhaar_number,
          dsc_class: application.dsc_class || 'class2',
          application_type: application.application_type || 'new',
          organization: application.organization || null,
          designation: application.designation || null,
          address: application.address,
          city: application.city,
          state: application.state,
          pincode: application.pincode,
          pan_document_url: application.pan_document_url || null,
          aadhaar_document_url: application.aadhaar_document_url || null,
          photo_document_url: application.photo_document_url || null,
          status: 'pending'
        }])
        .select()
        .single();
      
      if (error) {
        console.error('DSC application error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // More specific error messages
        if (error.code === '42501') {
          throw new Error('Database permission error. Please try again or contact support.');
        } else if (error.code === '23505') {
          throw new Error('This application has already been submitted.');
        } else {
          throw new Error(`Failed to submit DSC application: ${error.message}`);
        }
      }
      
      console.log('DSC application submitted successfully:', data);
      return data;
    } catch (err) {
      console.error('DSC application submission error:', err);
      throw err;
    }
  },

  async getAll() {
    const { data, error } = await supabase
      .from('dsc_applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getByStatus(status: string) {
    const { data, error } = await supabase
      .from('dsc_applications')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('dsc_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const jobApplicationService = {
  async create(application: JobApplication) {
    try {
      console.log('Submitting job application:', application);
      
      const { data, error } = await supabase
        .from('job_applications')
        .insert([{
          full_name: application.full_name,
          email: application.email,
          phone: application.phone,
          position_applied: application.position_applied,
          experience_years: application.experience_years || 0,
          current_company: application.current_company || null,
          qualification: application.qualification,
          skills: application.skills || null,
          resume_url: application.resume_url || null,
          cover_letter: application.cover_letter || null,
          expected_salary: application.expected_salary || null,
          availability: application.availability || 'immediate',
          employment_type_preference: application.employment_type_preference || 'full-time',
          status: 'pending'
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Job application error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        if (error.code === '42501') {
          throw new Error('Database permission error. Please try again or contact support.');
        } else if (error.code === '23505') {
          throw new Error('This application has already been submitted.');
        } else {
          throw new Error(`Failed to submit job application: ${error.message}`);
        }
      }
      
      console.log('Job application submitted successfully:', data);
      return data;
    } catch (err) {
      console.error('Job application submission error:', err);
      throw err;
    }
  },

  async getAll() {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getByPosition(position: string) {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('position_applied', position)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getByStatus(status: string) {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from('job_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// File upload service
export const fileUploadService = {
  async uploadFile(file: File, bucket: string, path: string) {
    try {
      console.log(`Uploading file to bucket: ${bucket}, path: ${path}`);
      
      if (!supabase) {
        throw new Error('Supabase not configured')
      }

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, {
          cacheControl: '3600',
          upsert: true // Allow overwriting files
        });
      
      if (error) {
        console.error('File upload error details:', {
          message: error.message,
          statusCode: error.statusCode
        });
        
        if (error.statusCode === '404') {
          throw new Error('Storage bucket not found. Please contact support.');
        } else {
          throw new Error(`Failed to upload file: ${error.message}`);
        }
      }
      
      console.log('File uploaded successfully:', data);
      return data;
    } catch (err) {
      console.error('File upload error:', err);
      throw err;
    }
  },

  async getPublicUrl(bucket: string, path: string) {
    try {
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);
      
      return data.publicUrl;
    } catch (err) {
      console.error('Get public URL error:', err);
      throw err;
    }
  }
};