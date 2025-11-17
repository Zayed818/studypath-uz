import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';

interface RequestHelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programId: string;
  universityName: string;
  programName: string;
}

const helpRequestSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  helpType: z.string().min(1, 'Please select a help type'),
  educationLevel: z.string().optional(),
  message: z.string().min(50, 'Message must be at least 50 characters'),
  contactMethod: z.string().min(1, 'Please select a contact method'),
});

type HelpRequestForm = z.infer<typeof helpRequestSchema>;

export function RequestHelpDialog({
  open,
  onOpenChange,
  programId,
  universityName,
  programName,
}: RequestHelpDialogProps) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  const form = useForm<HelpRequestForm>({
    resolver: zodResolver(helpRequestSchema),
    defaultValues: {
      fullName: '',
      email: user?.email || '',
      phone: '',
      helpType: '',
      educationLevel: '',
      message: '',
      contactMethod: 'email',
    },
  });

  // Fetch user profile when dialog opens
  useState(() => {
    if (user && open) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setUserProfile(data);
            form.setValue('fullName', data.full_name || '');
            form.setValue('email', data.email || user.email || '');
            form.setValue('phone', data.phone || '');
          }
        });
    }
  });

  const onSubmit = async (data: HelpRequestForm) => {
    if (!user) {
      toast({
        title: t('requestHelp.loginRequired'),
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('help_requests').insert({
        user_id: user.id,
        program_id: programId,
        university_name: universityName,
        program_name: programName,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        help_type: data.helpType,
        message: data.message,
        current_education_level: data.educationLevel,
        preferred_contact_method: data.contactMethod,
      });

      if (error) throw error;

      toast({
        title: t('requestHelp.successTitle'),
        description: t('requestHelp.successMessage'),
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting help request:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('requestHelp.loginRequired')}</DialogTitle>
            <DialogDescription>
              Please sign in to request help with your application.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => navigate('/auth')}>{t('requestHelp.loginButton')}</Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('requestHelp.title')}</DialogTitle>
          <DialogDescription>{t('requestHelp.subtitle')}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('requestHelp.fullName')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('requestHelp.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('requestHelp.phone')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="helpType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('requestHelp.helpType')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select help type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="eligibility">{t('requestHelp.helpTypes.eligibility')}</SelectItem>
                      <SelectItem value="documents">{t('requestHelp.helpTypes.documents')}</SelectItem>
                      <SelectItem value="application">{t('requestHelp.helpTypes.application')}</SelectItem>
                      <SelectItem value="general">{t('requestHelp.helpTypes.general')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('requestHelp.educationLevel')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="highSchool">{t('requestHelp.educationLevels.highSchool')}</SelectItem>
                      <SelectItem value="bachelor">{t('requestHelp.educationLevels.bachelor')}</SelectItem>
                      <SelectItem value="master">{t('requestHelp.educationLevels.master')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('requestHelp.message')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t('requestHelp.messagePlaceholder')}
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('requestHelp.contactMethod')}</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <label htmlFor="email">{t('requestHelp.contactMethods.email')}</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone" />
                        <label htmlFor="phone">{t('requestHelp.contactMethods.phone')}</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="whatsapp" />
                        <label htmlFor="whatsapp">{t('requestHelp.contactMethods.whatsapp')}</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                {t('requestHelp.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('requestHelp.submit')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
