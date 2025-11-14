import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import PersonalDetailsStep from "@/components/apply/PersonalDetailsStep";
import AcademicInfoStep from "@/components/apply/AcademicInfoStep";
import ProgramPreferencesStep from "@/components/apply/ProgramPreferencesStep";
import DocumentSelectionStep from "@/components/apply/DocumentSelectionStep";
import ReviewSubmitStep from "@/components/apply/ReviewSubmitStep";

export interface ApplicationFormData {
  // Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | undefined;
  nationality: string;
  passportNumber: string;
  
  // Academic Info
  currentEducationLevel: string;
  institution: string;
  gpa: string;
  englishTest: string;
  englishScore: string;
  
  // Program Preferences
  preferredCountries: string[];
  preferredDegree: string;
  preferredField: string;
  intakeYear: string;
  intakeSeason: string;
  budget: string;
  
  // Documents
  selectedDocuments: {
    transcript: File | null;
    passport: File | null;
    cv: File | null;
    motivationLetter: File | null;
    englishCertificate: File | null;
    recommendationLetter: File | null;
  };
}

const Apply = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: undefined,
    nationality: "",
    passportNumber: "",
    currentEducationLevel: "",
    institution: "",
    gpa: "",
    englishTest: "",
    englishScore: "",
    preferredCountries: [],
    preferredDegree: "",
    preferredField: "",
    intakeYear: "",
    intakeSeason: "",
    budget: "",
    selectedDocuments: {
      transcript: null,
      passport: null,
      cv: null,
      motivationLetter: null,
      englishCertificate: null,
      recommendationLetter: null,
    },
  });

  const steps = [
    { number: 1, title: "Personal Details", component: PersonalDetailsStep },
    { number: 2, title: "Academic Info", component: AcademicInfoStep },
    { number: 3, title: "Program Preferences", component: ProgramPreferencesStep },
    { number: 4, title: "Documents", component: DocumentSelectionStep },
    { number: 5, title: "Review & Submit", component: ReviewSubmitStep },
  ];

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateFormData = (data: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted py-8 md:py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Application Form
            </h1>
            <p className="text-muted-foreground">
              Complete your application in {totalSteps} simple steps
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <button
                    onClick={() => handleStepClick(step.number)}
                    className={`flex flex-col items-center gap-2 ${
                      step.number === currentStep
                        ? "opacity-100"
                        : step.number < currentStep
                        ? "opacity-100 cursor-pointer"
                        : "opacity-40"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step.number < currentStep
                          ? "bg-primary text-primary-foreground"
                          : step.number === currentStep
                          ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                          : "bg-muted-foreground/20 text-muted-foreground"
                      }`}
                    >
                      {step.number < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="text-xs font-medium text-center hidden md:block">
                      {step.title}
                    </span>
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded transition-colors ${
                        step.number < currentStep
                          ? "bg-primary"
                          : "bg-muted-foreground/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="p-6 md:p-8">
            <CurrentStepComponent
              formData={formData}
              updateFormData={updateFormData}
            />
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={handleNext} className="gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={() => alert("Application submitted! (Demo mode)")} className="gap-2">
                Submit Application
                <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Apply;
