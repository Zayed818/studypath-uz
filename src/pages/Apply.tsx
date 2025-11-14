import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import PersonalDetailsStep from "@/components/apply/PersonalDetailsStep";
import AcademicInfoStep from "@/components/apply/AcademicInfoStep";
import ReviewSubmitStep from "@/components/apply/ReviewSubmitStep";

export interface ApplicationFormData {
  // Program Context
  programId: string;
  universityId: string;
  programName: string;
  universityName: string;
  
  // Personal Details (mandatory)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryOfResidence: string;
  city: string;
  dateOfBirth: Date | undefined; // optional
  gender: string; // optional
  
  // Academic Info (all optional)
  currentEducationLevel: string;
  gpa: string;
  englishTest: string;
  englishScore: string;
  transcript: File | null;
  
  // Consent
  consent: boolean;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  countryOfResidence?: string;
  city?: string;
  consent?: string;
}

const Apply = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const totalSteps = 3;
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    programId: "",
    universityId: "",
    programName: "",
    universityName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryOfResidence: "",
    city: "",
    dateOfBirth: undefined,
    gender: "",
    currentEducationLevel: "",
    gpa: "",
    englishTest: "",
    englishScore: "",
    transcript: null,
    consent: false,
  });

  // Capture program context from URL on mount
  useEffect(() => {
    const programId = searchParams.get("programId") || "";
    const universityId = searchParams.get("universityId") || "";
    const programName = searchParams.get("programName") || "";
    const universityName = searchParams.get("universityName") || "";

    if (!programId || !universityName) {
      toast({
        title: t('common.error'),
        description: "Please select a program first",
        variant: "destructive",
      });
      navigate("/programs");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      programId,
      universityId,
      programName,
      universityName,
    }));
  }, [searchParams, navigate, t]);

  const steps = [
    { number: 1, title: t('apply.personalDetails'), component: PersonalDetailsStep },
    { number: 2, title: t('apply.academicInfoOptional'), component: AcademicInfoStep },
    { number: 3, title: t('apply.reviewSubmit'), component: ReviewSubmitStep },
  ];

  const progress = (currentStep / totalSteps) * 100;

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validatePersonalDetails = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = t('apply.requiredField');
    }
    if (!formData.lastName.trim()) {
      errors.lastName = t('apply.requiredField');
    }
    if (!formData.email.trim()) {
      errors.email = t('apply.requiredField');
    } else if (!validateEmail(formData.email)) {
      errors.email = t('apply.invalidEmail');
    }
    if (!formData.phone.trim()) {
      errors.phone = t('apply.requiredField');
    } else if (!validatePhone(formData.phone)) {
      errors.phone = t('apply.invalidPhone');
    }
    if (!formData.countryOfResidence) {
      errors.countryOfResidence = t('apply.requiredField');
    }
    if (!formData.city) {
      errors.city = t('apply.requiredField');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    // Validate step 1 before proceeding
    if (currentStep === 1 && !validatePersonalDetails()) {
      toast({
        title: t('common.error'),
        description: t('apply.fillRequired'),
        variant: "destructive",
      });
      return;
    }

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
    // Clear validation errors for updated fields
    if (validationErrors) {
      const newErrors = { ...validationErrors };
      Object.keys(data).forEach((key) => {
        delete newErrors[key as keyof ValidationErrors];
      });
      setValidationErrors(newErrors);
    }
  };

  const handleSubmit = async () => {
    // Final validation
    if (!validatePersonalDetails()) {
      toast({
        title: t('common.error'),
        description: t('apply.fillRequired'),
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }

    if (!formData.consent) {
      toast({
        title: t('common.error'),
        description: t('apply.consentRequired'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate reference number
      const referenceNumber = `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // In production, this would be an API call to save the application
      console.log("Application submitted:", {
        ...formData,
        referenceNumber,
        submittedAt: new Date().toISOString(),
      });

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to success page
      navigate(`/apply/success?ref=${referenceNumber}&program=${encodeURIComponent(formData.programName)}&university=${encodeURIComponent(formData.universityName)}`);
    } catch (error) {
      toast({
        title: t('common.error'),
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              validationErrors={currentStep === 1 ? validationErrors : undefined}
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
                {t('common.next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="gap-2"
                disabled={isSubmitting || !formData.consent}
              >
                {isSubmitting ? t('apply.submitting') : t('apply.submit')}
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
