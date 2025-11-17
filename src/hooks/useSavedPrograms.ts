import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface SavedProgram {
  id: string;
  user_id: string;
  program_id: string;
  university_name: string;
  program_name: string;
  country: string;
  degree: string;
  field: string;
  tuition: string | null;
  duration: string | null;
  notes: string | null;
  created_at: string;
}

interface ProgramToSave {
  programId: string;
  universityName: string;
  programName: string;
  country: string;
  degree: string;
  field: string;
  tuition?: string;
  duration?: string;
}

export function useSavedPrograms() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [savedPrograms, setSavedPrograms] = useState<SavedProgram[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedPrograms = async () => {
    if (!user) {
      setSavedPrograms([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('saved_programs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedPrograms(data || []);
    } catch (error) {
      console.error('Error fetching saved programs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPrograms();
  }, [user]);

  const isSaved = (programId: string) => {
    return savedPrograms.some((p) => p.program_id === programId);
  };

  const saveProgram = async (program: ProgramToSave) => {
    if (!user) {
      toast({
        title: t('savedPrograms.loginToSave'),
        variant: 'destructive',
      });
      return false;
    }

    try {
      const { error } = await supabase.from('saved_programs').insert({
        user_id: user.id,
        program_id: program.programId,
        university_name: program.universityName,
        program_name: program.programName,
        country: program.country,
        degree: program.degree,
        field: program.field,
        tuition: program.tuition || null,
        duration: program.duration || null,
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already Saved',
            description: 'This program is already in your saved list.',
            variant: 'destructive',
          });
          return false;
        }
        throw error;
      }

      await fetchSavedPrograms();
      toast({
        title: t('savedPrograms.savedSuccess'),
      });
      return true;
    } catch (error) {
      console.error('Error saving program:', error);
      toast({
        title: 'Error',
        description: 'Failed to save program. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const unsaveProgram = async (programId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_programs')
        .delete()
        .eq('user_id', user.id)
        .eq('program_id', programId);

      if (error) throw error;

      await fetchSavedPrograms();
      toast({
        title: t('savedPrograms.unsavedSuccess'),
      });
      return true;
    } catch (error) {
      console.error('Error unsaving program:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove program. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const updateNotes = async (programId: string, notes: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('saved_programs')
        .update({ notes })
        .eq('user_id', user.id)
        .eq('program_id', programId);

      if (error) throw error;

      await fetchSavedPrograms();
      return true;
    } catch (error) {
      console.error('Error updating notes:', error);
      return false;
    }
  };

  return {
    savedPrograms,
    loading,
    isSaved,
    saveProgram,
    unsaveProgram,
    updateNotes,
    refetch: fetchSavedPrograms,
  };
}
