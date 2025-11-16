import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackScholarshipEvent } from '@/lib/scholarshipUtils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink } from 'lucide-react';

interface ExternalRedirectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scholarshipId: string;
  scholarshipTitle: string;
  applyUrl: string;
}

export function ExternalRedirectDialog({
  open,
  onOpenChange,
  scholarshipId,
  scholarshipTitle,
  applyUrl,
}: ExternalRedirectDialogProps) {
  const { t } = useLanguage();
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    trackScholarshipEvent('apply_click', scholarshipId);
    window.open(applyUrl, '_blank', 'noopener,noreferrer');
    onOpenChange(false);
    setAgreed(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setAgreed(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            {t('scholarships.externalRedirectTitle')}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p>
              {t('scholarships.externalRedirectMessage')}
            </p>
            <div className="bg-muted p-4 rounded-md">
              <p className="font-medium text-sm text-foreground">{scholarshipTitle}</p>
              <p className="text-xs text-muted-foreground mt-1 break-all">{applyUrl}</p>
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
              />
              <label
                htmlFor="agree"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('scholarships.agreeAndContinue')}
              </label>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {t('common.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue} disabled={!agreed}>
            {t('scholarships.continueToApplication')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
