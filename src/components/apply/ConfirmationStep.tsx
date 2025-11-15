import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface ConfirmationStepProps {
  applicationId: string;
}

const ConfirmationStep = ({ applicationId }: ConfirmationStepProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <CheckCircle className="h-20 w-20 text-green-500" />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">{t('apply.applicationSubmitted')}</h2>
        <p className="text-muted-foreground">{t('apply.submittedMessage')}</p>
      </div>

      <Card className="p-6 bg-muted/30">
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">{t('apply.applicationId')}:</span>
            <span className="font-mono font-bold text-primary">{applicationId}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{t('apply.responseTime')}: <strong>48 {t('common.hours')}</strong></span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">{t('apply.whatNext')}</h3>
        <ul className="space-y-3 text-sm text-left">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Mail className="h-3 w-3 text-primary" />
            </div>
            <span>{t('apply.whatNext1')}</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Phone className="h-3 w-3 text-primary" />
            </div>
            <span>{t('apply.whatNext2')}</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="h-3 w-3 text-primary" />
            </div>
            <span>{t('apply.whatNext3')}</span>
          </li>
        </ul>
      </Card>

      <div className="pt-4">
        <Button asChild size="lg">
          <Link to="/">{t('apply.returnHome')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
