-- Create a table for storing career quiz results
CREATE TABLE public.career_quiz_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  holland_scores JSONB NOT NULL,
  top_holland_codes TEXT NOT NULL,
  top_careers JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id)
);

-- Enable Row Level Security
ALTER TABLE public.career_quiz_results ENABLE ROW LEVEL SECURITY;

-- Users can view their own quiz results
CREATE POLICY "Users can view their own quiz results"
ON public.career_quiz_results
FOR SELECT
USING (auth.uid() = user_id);

-- Users can save their quiz results
CREATE POLICY "Users can save quiz results"
ON public.career_quiz_results
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their quiz results
CREATE POLICY "Users can update their quiz results"
ON public.career_quiz_results
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their quiz results
CREATE POLICY "Users can delete their quiz results"
ON public.career_quiz_results
FOR DELETE
USING (auth.uid() = user_id);