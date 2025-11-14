import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ApplicationFormData } from "@/pages/Apply";
import { format } from "date-fns";
import { CheckCircle2, FileText, User, GraduationCap, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReviewSubmitStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const ReviewSubmitStep = ({ formData, updateFormData }: ReviewSubmitStepProps) => {
  const { t } = useLanguage();
  
  const uploadedDocs = Object.entries(formData.selectedDocuments).filter(
    ([_, file]) => file !== null
  );

  const hasAcademicInfo = formData.currentEducationLevel || formData.gpa || 
                          formData.englishTest || formData.transcript;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Application</h2>
        <p className="text-muted-foreground">
          Please review all information before submitting
        </p>
      </div>

      {/* Personal Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Full Name:</div>
            <div className="font-medium">
              {formData.firstName} {formData.lastName}
            </div>
            
            <div className="text-muted-foreground">Email:</div>
            <div className="font-medium">{formData.email}</div>
            
            <div className="text-muted-foreground">Phone:</div>
            <div className="font-medium">{formData.phone}</div>
            
            <div className="text-muted-foreground">Country:</div>
            <div className="font-medium capitalize">{formData.countryOfResidence || "Not provided"}</div>
            
            <div className="text-muted-foreground">City:</div>
            <div className="font-medium capitalize">{formData.city || "Not provided"}</div>
            
            <div className="text-muted-foreground">Date of Birth:</div>
            <div className="font-medium">
              {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Not provided"}
            </div>
            
            <div className="text-muted-foreground">Gender:</div>
            <div className="font-medium capitalize">{formData.gender || "Not provided"}</div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      {hasAcademicInfo && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              {t('apply.academicInfo')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              {formData.currentEducationLevel && (
                <>
                  <div className="text-muted-foreground">Education Level:</div>
                  <div className="font-medium capitalize">{formData.currentEducationLevel}</div>
                </>
              )}
              
              {formData.gpa && (
                <>
                  <div className="text-muted-foreground">GPA / Score:</div>
                  <div className="font-medium">{formData.gpa}</div>
                </>
              )}
              
              {formData.englishTest && (
                <>
                  <div className="text-muted-foreground">English Test:</div>
                  <div className="font-medium">
                    {formData.englishTest.toUpperCase()}
                    {formData.englishScore && ` - ${formData.englishScore}`}
                  </div>
                </>
              )}
              
              {formData.transcript && (
                <>
                  <div className="text-muted-foreground">Transcript:</div>
                  <div className="font-medium">{formData.transcript.name}</div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Program Preferences */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            Program Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[140px]">Preferred Countries:</span>
              <div className="flex flex-wrap gap-2">
                {formData.preferredCountries.length > 0 ? (
                  formData.preferredCountries.map((country) => (
                    <Badge key={country} variant="secondary">
                      {country}
                    </Badge>
                  ))
                ) : (
                  <span className="font-medium">Not selected</span>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-2">
              <div className="text-muted-foreground">Degree Level:</div>
              <div className="font-medium">{formData.preferredDegree || "Not selected"}</div>
              
              <div className="text-muted-foreground">Field of Study:</div>
              <div className="font-medium">{formData.preferredField || "Not selected"}</div>
              
              <div className="text-muted-foreground">Intake:</div>
              <div className="font-medium">
                {formData.intakeYear && formData.intakeSeason
                  ? `${formData.intakeSeason} ${formData.intakeYear}`
                  : "Not selected"}
              </div>
              
              <div className="text-muted-foreground">Budget:</div>
              <div className="font-medium">{formData.budget || "Not specified"}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Uploaded Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {uploadedDocs.length > 0 ? (
            <ul className="space-y-2">
              {uploadedDocs.map(([key, file]) => (
                <li key={key} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="font-medium">{file?.name}</span>
                  <span className="text-muted-foreground">
                    ({(file!.size / 1024).toFixed(1)} KB)
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No documents uploaded</p>
          )}
        </CardContent>
      </Card>

      {/* Consent Checkbox */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => 
                updateFormData({ consent: checked as boolean })
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor="consent"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {t('apply.consentText')}
              </Label>
              <p className="text-xs text-muted-foreground">
                By checking this box, you confirm that all information provided is accurate and complete.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ready to Submit */}
      <div className="bg-muted/50 rounded-lg p-6 text-center space-y-2">
        <CheckCircle2 className="h-12 w-12 mx-auto text-primary" />
        <h3 className="font-semibold text-lg">Application Ready</h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Your application will be submitted to our team. We'll review it within 48 hours and get back to you.
        </p>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;
