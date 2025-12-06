-- Create applications table to store student applications
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Program Context
  program_id TEXT NOT NULL,
  university_name TEXT NOT NULL,
  program_name TEXT NOT NULL,
  program_degree_level TEXT,
  program_degree_name TEXT,
  
  -- Personal Info (Stage 1)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  nationality TEXT NOT NULL,
  city TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Eligibility Info (Stage 2 - all optional)
  current_education_level TEXT,
  gpa TEXT,
  english_test TEXT,
  english_score TEXT,
  budget_range TEXT,
  scholarship_interest BOOLEAN DEFAULT false,
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'submitted',
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_applications_updated_at
BEFORE UPDATE ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies

-- Users can view their own applications (by user_id OR email match for anonymous submissions)
CREATE POLICY "Users can view their own applications"
ON public.applications
FOR SELECT
USING (
  auth.uid() = user_id 
  OR (user_id IS NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()))
);

-- Anyone can create applications (supports anonymous submissions)
CREATE POLICY "Anyone can create applications"
ON public.applications
FOR INSERT
WITH CHECK (true);

-- Users can update their own pending applications
CREATE POLICY "Users can update their own pending applications"
ON public.applications
FOR UPDATE
USING (
  auth.uid() = user_id 
  AND status = 'submitted'
);

-- Agencies can view all applications
CREATE POLICY "Agencies can view all applications"
ON public.applications
FOR SELECT
USING (public.is_agency(auth.uid()));

-- Agencies can update application status
CREATE POLICY "Agencies can update applications"
ON public.applications
FOR UPDATE
USING (public.is_agency(auth.uid()));

-- Admins have full access
CREATE POLICY "Admins have full access to applications"
ON public.applications
FOR ALL
USING (public.is_admin(auth.uid()));