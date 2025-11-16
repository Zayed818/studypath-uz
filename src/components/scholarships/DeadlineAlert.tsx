import { useLanguage } from '@/contexts/LanguageContext';
import { calculateDaysUntilDeadline, getDeadlineUrgency, formatDeadlineDate } from '@/lib/scholarshipUtils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Clock } from 'lucide-react';

interface DeadlineAlertProps {
  deadlineDate: string;
}

export function DeadlineAlert({ deadlineDate }: DeadlineAlertProps) {
  const { t, language } = useLanguage();
  const daysLeft = calculateDaysUntilDeadline(deadlineDate);
  const urgency = getDeadlineUrgency(daysLeft);
  const formattedDate = formatDeadlineDate(deadlineDate, language);

  if (daysLeft < 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{t('scholarships.closed')}</AlertTitle>
        <AlertDescription>
          {t('scholarships.applicationClosed')}
        </AlertDescription>
      </Alert>
    );
  }

  const variantMap = {
    critical: 'destructive' as const,
    warning: 'default' as const,
    normal: 'default' as const,
  };

  return (
    <Alert variant={variantMap[urgency]}>
      <Clock className="h-4 w-4" />
      <AlertTitle>
        {daysLeft === 1 ? t('scholarships.lastDay') : `${daysLeft} ${t('scholarships.daysLeft')}`}
      </AlertTitle>
      <AlertDescription>
        {t('scholarships.applicationClosesOn')} {formattedDate}
      </AlertDescription>
    </Alert>
  );
}
