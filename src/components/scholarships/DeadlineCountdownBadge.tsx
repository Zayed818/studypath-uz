import { useLanguage } from '@/contexts/LanguageContext';
import { calculateDaysUntilDeadline, getDeadlineUrgency } from '@/lib/scholarshipUtils';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

interface DeadlineCountdownBadgeProps {
  deadlineDate: string;
}

export function DeadlineCountdownBadge({ deadlineDate }: DeadlineCountdownBadgeProps) {
  const { t } = useLanguage();
  const daysLeft = calculateDaysUntilDeadline(deadlineDate);
  const urgency = getDeadlineUrgency(daysLeft);

  if (daysLeft < 0) {
    return (
      <Badge variant="secondary" className="gap-1">
        <Clock className="h-3 w-3" />
        {t('scholarships.closed')}
      </Badge>
    );
  }

  if (daysLeft > 14) return null;

  const variantMap = {
    critical: 'destructive' as const,
    warning: 'default' as const,
    normal: 'secondary' as const,
  };

  return (
    <Badge variant={variantMap[urgency]} className="gap-1">
      <Clock className="h-3 w-3" />
      {daysLeft} {t('scholarships.daysLeft')}
    </Badge>
  );
}
