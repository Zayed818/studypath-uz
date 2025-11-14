import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ApplicationFormData } from "@/pages/Apply";
import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, User, FileText, CheckCircle } from "lucide-react";

interface ReviewSubmitStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const ReviewSubmitStep = ({ formData, updateFormData }: ReviewSubmitStepProps) => {
  const { t } = useLanguage();
  const hasAcademicInfo = formData.currentEducationLevel || formData.gpa || formData.englishTest || formData.englishScore || formData.transcript;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">{t('apply.reviewSubmit')}</h2>
      </div>

      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-3">
          <GraduationCap className="h-5 w-5 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">{t('apply.programUniversity')}</h3>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">{t('programs.program')}:</span>
                <p className="font-medium">{formData.programName || t('apply.notProvided')}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">{t('programs.university')}:</span>
                <p className="font-medium">{formData.universityName || t('apply.notProvided')}</p>
              </div>
            </div>
          </div>
          <Badge variant="secondary">{t('common.selected')}</Badge>
        </div>
      </Card>

      <Separator />

      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <User className="h-5 w-5 text-primary mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-4">{t('apply.personalDetails')}</h3>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">{t('apply.firstName')}</Label><p className="font-medium">{formData.firstName}</p></div>
                <div><Label className="text-muted-foreground">{t('apply.lastName')}</Label><p className="font-medium">{formData.lastName}</p></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">{t('apply.email')}</Label><p className="font-medium">{formData.email}</p></div>
                <div><Label className="text-muted-foreground">{t('apply.phone')}</Label><p className="font-medium">{formData.phone}</p></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label className="text-muted-foreground">{t('apply.countryOfResidence')}</Label><p className="font-medium capitalize">{formData.countryOfResidence}</p></div>
                <div><Label className="text-muted-foreground">{t('apply.city')}</Label><p className="font-medium capitalize">{formData.city}</p></div>
              </div>
              {formData.dateOfBirth && <div><Label className="text-muted-foreground">{t('apply.dateOfBirth')}</Label><p className="font-medium">{formData.dateOfBirth.toLocaleDateString()}</p></div>}
              {formData.gender && <div><Label className="text-muted-foreground">{t('apply.gender')}</Label><p className="font-medium capitalize">{formData.gender}</p></div>}
            </div>
          </div>
        </div>
      </Card>

      {hasAcademicInfo && (
        <>
          <Separator />
          <Card className="p-6">
            <div className="flex items-start gap-3 mb-4">
              <GraduationCap className="h-5 w-5 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-4">{t('apply.academicInfoOptional')}</h3>
                <div className="grid gap-4">
                  {formData.currentEducationLevel && <div><Label className="text-muted-foreground">{t('apply.currentEducationLevel')}</Label><p className="font-medium">{formData.currentEducationLevel}</p></div>}
                  {formData.gpa && <div><Label className="text-muted-foreground">{t('apply.gpa')}</Label><p className="font-medium">{formData.gpa}</p></div>}
                  {formData.englishTest && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><Label className="text-muted-foreground">{t('apply.englishTest')}</Label><p className="font-medium">{formData.englishTest}</p></div>
                      {formData.englishScore && <div><Label className="text-muted-foreground">{t('apply.englishScore')}</Label><p className="font-medium">{formData.englishScore}</p></div>}
                    </div>
                  )}
                  {formData.transcript && <div><Label className="text-muted-foreground">{t('apply.uploadTranscript')}</Label><p className="font-medium text-sm">{formData.transcript.name}</p></div>}
                </div>
              </div>
            </div>
          </Card>
        </>
      )}

      <Separator />

      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <Checkbox id="consent" checked={formData.consent} onCheckedChange={(checked) => updateFormData({ consent: checked === true })} className="mt-1" />
          <Label htmlFor="consent" className="text-sm font-medium leading-relaxed cursor-pointer">{t('apply.consentText')}</Label>
        </div>
      </Card>

      {formData.consent && (
        <Card className="p-6 bg-success/10 border-success/30">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <p className="font-medium text-success">{t('apply.readyToSubmit')}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ReviewSubmitStep;
