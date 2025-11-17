-- Create help_requests table
CREATE TABLE public.help_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_id TEXT NOT NULL,
  university_name TEXT NOT NULL,
  program_name TEXT NOT NULL,
  
  -- User Contact Info
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Help Request Details
  help_type TEXT NOT NULL,
  message TEXT NOT NULL,
  current_education_level TEXT,
  preferred_contact_method TEXT,
  
  -- Status Tracking
  status TEXT DEFAULT 'pending',
  assigned_agency_id UUID,
  agency_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for help_requests
CREATE POLICY "Users can view their own help requests"
  ON public.help_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create help requests"
  ON public.help_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending requests"
  ON public.help_requests FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Agencies can view all help requests"
  ON public.help_requests FOR SELECT
  USING (public.is_agency(auth.uid()));

CREATE POLICY "Agencies can update help requests"
  ON public.help_requests FOR UPDATE
  USING (public.is_agency(auth.uid()));

CREATE POLICY "Admins have full access to help requests"
  ON public.help_requests FOR ALL
  USING (public.is_admin(auth.uid()));

-- Create indexes for help_requests
CREATE INDEX idx_help_requests_user_id ON public.help_requests(user_id);
CREATE INDEX idx_help_requests_status ON public.help_requests(status);
CREATE INDEX idx_help_requests_created_at ON public.help_requests(created_at DESC);

-- Trigger to update updated_at for help_requests
CREATE TRIGGER update_help_requests_updated_at
  BEFORE UPDATE ON public.help_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create saved_programs table
CREATE TABLE public.saved_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  program_id TEXT NOT NULL,
  
  -- Program Details (denormalized for quick access)
  university_name TEXT NOT NULL,
  program_name TEXT NOT NULL,
  country TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT NOT NULL,
  tuition TEXT,
  duration TEXT,
  
  -- User Notes
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Unique constraint to prevent duplicates
  UNIQUE(user_id, program_id)
);

-- Enable RLS
ALTER TABLE public.saved_programs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for saved_programs
CREATE POLICY "Users can view their own saved programs"
  ON public.saved_programs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save programs"
  ON public.saved_programs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their saved programs"
  ON public.saved_programs FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their saved programs"
  ON public.saved_programs FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for saved_programs
CREATE INDEX idx_saved_programs_user_id ON public.saved_programs(user_id);
CREATE INDEX idx_saved_programs_created_at ON public.saved_programs(created_at DESC);