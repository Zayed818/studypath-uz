import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ApplicationFormData } from "@/pages/Apply";
import { format } from "date-fns";
import { CheckCircle2, FileText, User, GraduationCap, Target } from "lucide-react";

interface ReviewSubmitStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const ReviewSubmitStep = ({ formData }: ReviewSubmitStepProps) => {
  const uploadedDocs = Object.entries(formData.selectedDocuments).filter(
    ([_, file]) => file !== null
  );

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
            
            <div className="text-muted-foreground">Date of Birth:</div>
            <div className="font-medium">
              {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Not provided"}
            </div>
            
            <div className="text-muted-foreground">Nationality:</div>
            <div className="font-medium">{formData.nationality || "Not provided"}</div>
            
            <div className="text-muted-foreground">Passport Number:</div>
            <div className="font-medium">{formData.passportNumber || "Not provided"}</div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Academic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-muted-foreground">Education Level:</div>
            <div className="font-medium">{formData.currentEducationLevel || "Not provided"}</div>
            
            <div className="text-muted-foreground">Institution:</div>
            <div className="font-medium">{formData.institution || "Not provided"}</div>
            
            <div className="text-muted-foreground">GPA:</div>
            <div className="font-medium">{formData.gpa || "Not provided"}</div>
            
            <div className="text-muted-foreground">English Test:</div>
            <div className="font-medium">
              {formData.englishTest ? `${formData.englishTest.toUpperCase()}` : "Not provided"}
              {formData.englishScore && ` - ${formData.englishScore}`}
            </div>
          </div>
        </CardContent>
      </Card>

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

      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Ready to Submit
        </h4>
        <p className="text-sm text-muted-foreground">
          By clicking "Submit Application", you confirm that all information provided is accurate
          and complete. You'll receive a confirmation email with next steps.
        </p>
      </div>
    </div>
  );
};

export default ReviewSubmitStep;
