import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ApplicationFormData, ValidationErrors } from "@/pages/Apply";
import { format } from "date-fns";

interface ReviewStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
  onEditStep: (step: number) => void;
  validationErrors?: ValidationErrors;
}

const ReviewStep = ({ formData, updateFormData, onEditStep, validationErrors }: ReviewStepProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Program Details */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">{t('apply.programDetails')}</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('apply.university')}:</span>
            <span className="font-medium">{formData.universityName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('apply.program')}:</span>
            <span className="font-medium">{formData.programName}</span>
          </div>
        </div>
      </Card>

      {/* Personal Details */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg">{t('apply.personalDetails')}</h3>
          <Button variant="ghost" size="sm" onClick={() => onEditStep(1)}>
            <Edit className="h-4 w-4 mr-1" />
            {t('common.edit')}
          </Button>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('apply.fullName')}:</span>
            <span className="font-medium">{formData.firstName} {formData.lastName}</span>
          </div>
          {formData.dateOfBirth && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('apply.dateOfBirth')}:</span>
              <span className="font-medium">{format(formData.dateOfBirth, "PPP")}</span>
            </div>
          )}
          {formData.gender && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('apply.gender')}:</span>
              <span className="font-medium">{formData.gender}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('apply.nationality')}:</span>
            <span className="font-medium">{formData.nationality}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('apply.currentCity')}:</span>
            <span className="font-medium">{formData.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('apply.email')}:</span>
            <span className="font-medium">{formData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('apply.phone')}:</span>
            <span className="font-medium">{formData.phone}</span>
          </div>
        </div>
      </Card>

      {/* Eligibility */}
      {(formData.currentEducationLevel || formData.gpa || formData.englishTest || formData.budgetRange || formData.scholarshipInterest) && (
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-lg">{t('apply.eligibility')}</h3>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(2)}>
              <Edit className="h-4 w-4 mr-1" />
              {t('common.edit')}
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            {formData.currentEducationLevel && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.education')}:</span>
                <span className="font-medium">{formData.currentEducationLevel}</span>
              </div>
            )}
            {formData.gpa && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.gpa')}:</span>
                <span className="font-medium">{formData.gpa}</span>
              </div>
            )}
            {formData.englishTest && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.englishTest')}:</span>
                <span className="font-medium">{formData.englishTest} {formData.englishScore && `- ${formData.englishScore}`}</span>
              </div>
            )}
            {formData.budgetRange && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.budgetRange')}:</span>
                <span className="font-medium">{formData.budgetRange}</span>
              </div>
            )}
            {formData.scholarshipInterest && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.scholarshipInterest')}:</span>
                <span className="font-medium">{t('common.yes')}</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Documents */}
      {(formData.transcript || formData.englishProof || formData.passport || formData.cv || formData.recommendationLetters) && (
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-semibold text-lg">{t('apply.documents')}</h3>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(3)}>
              <Edit className="h-4 w-4 mr-1" />
              {t('common.edit')}
            </Button>
          </div>
          <div className="space-y-2 text-sm">
            {formData.transcript && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.transcript')}:</span>
                <span className="font-medium">{formData.transcript.name}</span>
              </div>
            )}
            {formData.englishProof && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.englishProof')}:</span>
                <span className="font-medium">{formData.englishProof.name}</span>
              </div>
            )}
            {formData.passport && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.passport')}:</span>
                <span className="font-medium">{formData.passport.name}</span>
              </div>
            )}
            {formData.cv && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.cv')}:</span>
                <span className="font-medium">{formData.cv.name}</span>
              </div>
            )}
            {formData.recommendationLetters && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('apply.recommendationLetters')}:</span>
                <span className="font-medium">{formData.recommendationLetters.name}</span>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Consent */}
      <Card className="p-6">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => updateFormData({ consent: checked as boolean })}
          />
          <div className="space-y-1 flex-1">
            <Label htmlFor="consent" className="text-sm font-normal cursor-pointer leading-relaxed">
              {t('apply.consentText')}
            </Label>
            {validationErrors?.consent && (
              <p className="text-sm text-destructive">{validationErrors.consent}</p>
            )}
          </div>
        </div>
      </Card>

      {formData.consent && (
        <div className="p-4 bg-primary/10 rounded-md text-center">
          <p className="font-semibold text-primary">{t('apply.readyToSubmit')}</p>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;
