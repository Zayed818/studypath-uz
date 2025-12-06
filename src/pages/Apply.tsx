import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Check, GraduationCap, Building2 } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import ProfileStep from "@/components/apply/ProfileStep";
import EligibilityStep from "@/components/apply/EligibilityStep";
import DocumentsStep from "@/components/apply/DocumentsStep";
import ReviewStep from "@/components/apply/ReviewStep";
import ConfirmationStep from "@/components/apply/ConfirmationStep";
import { parseDegreeFromProgram } from "@/lib/degreeUtils";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface ApplicationFormData {
  // Program Context (auto-detected)
  programId: string;
  universityId: string;
  programName: string;
  universityName: string;
  programDegreeLevel: string; // 'bachelor' | 'master' | 'phd' | 'diploma'
  programDegreeName: string; // Display name like "Bachelor of Science"
  
  // Stage 1: Profile (mandatory)
  firstName: string;
  lastName: string;
  dateOfBirth: Date | undefined;
  gender: string; // optional
  nationality: string; // Central Asian countries only
  city: string;
  email: string;
  phone: string;
  
  // Stage 2: Eligibility (all optional)
  currentEducationLevel: string;
  gpa: string;
  englishTest: string;
  englishScore: string;
  budgetRange: string;
  scholarshipInterest: boolean;
  
  // Stage 3: Documents (all optional)
  transcript: File | null;
  englishProof: File | null;
  passport: File | null;
  cv: File | null;
  recommendationLetters: File | null;
  
  // Stage 4: Consent
  consent: boolean;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  city?: string;
  email?: string;
  phone?: string;
  consent?: string;
}

const Apply = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [applicationId, setApplicationId] = useState("");
  const totalSteps = 5;
  
  const [formData, setFormData] = useState<ApplicationFormData>({
    programId: "",
    universityId: "",
    programName: "",
    universityName: "",
    programDegreeLevel: "",
    programDegreeName: "",
    firstName: "",
    lastName: "",
    dateOfBirth: undefined,
    gender: "",
    nationality: "",
    city: "",
    email: "",
    phone: "",
    currentEducationLevel: "",
    gpa: "",
    englishTest: "",
    englishScore: "",
    budgetRange: "",
    scholarshipInterest: false,
    transcript: null,
    englishProof: null,
    passport: null,
    cv: null,
    recommendationLetters: null,
    consent: false,
  });

  // Auto-detect program context from URL
  useEffect(() => {
    const programId = searchParams.get("programId") || "";
    const universityId = searchParams.get("universityId") || "";
    const programName = searchParams.get("programName") || "";
    const universityName = searchParams.get("universityName") || "";

    if (!programId || !universityName) {
      toast({
        title: t('common.error'),
        description: t('apply.selectProgramFirst'),
        variant: "destructive",
      });
      navigate("/programs");
      return;
    }

    // Parse degree information from program name
    const degreeInfo = parseDegreeFromProgram(programName);

    setFormData((prev) => ({
      ...prev,
      programId,
      universityId,
      programName,
      universityName,
      programDegreeLevel: degreeInfo.level,
      programDegreeName: degreeInfo.displayName,
    }));
  }, [searchParams, navigate, t]);

  // Autosave to localStorage
  useEffect(() => {
    if (formData.programId) {
      localStorage.setItem(`application_draft_${formData.programId}`, JSON.stringify(formData));
    }
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const programId = searchParams.get("programId");
    if (programId) {
      const draft = localStorage.getItem(`application_draft_${programId}`);
      if (draft) {
        setFormData(JSON.parse(draft));
      }
    }
  }, [searchParams]);

  const steps = [
    { number: 1, title: t('apply.profile'), component: ProfileStep },
    { number: 2, title: t('apply.eligibility'), component: EligibilityStep },
    { number: 3, title: t('apply.documents'), component: DocumentsStep },
    { number: 4, title: t('apply.review'), component: ReviewStep },
    { number: 5, title: t('apply.confirmation'), component: ConfirmationStep },
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

  const validateProfileStep = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = t('apply.fieldRequired');
    }
    if (!formData.lastName.trim()) {
      errors.lastName = t('apply.fieldRequired');
    }
    if (!formData.dateOfBirth) {
      errors.dateOfBirth = t('apply.fieldRequired');
    }
    if (!formData.nationality) {
      errors.nationality = t('apply.fieldRequired');
    }
    if (!formData.city) {
      errors.city = t('apply.fieldRequired');
    }
    if (!formData.email.trim()) {
      errors.email = t('apply.fieldRequired');
    } else if (!validateEmail(formData.email)) {
      errors.email = t('apply.invalidEmail');
    }
    if (!formData.phone.trim()) {
      errors.phone = t('apply.fieldRequired');
    } else if (!validatePhone(formData.phone)) {
      errors.phone = t('apply.invalidPhone');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateReviewStep = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.consent) {
      errors.consent = t('apply.consentRequired');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const updateFormData = (data: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    // Clear validation errors for updated fields
    const updatedKeys = Object.keys(data);
    setValidationErrors((prev) => {
      const newErrors = { ...prev };
      updatedKeys.forEach((key) => {
        delete newErrors[key as keyof ValidationErrors];
      });
      return newErrors;
    });
  };

  const handleNext = () => {
    // Validate stage 1 (Profile)
    if (currentStep === 1 && !validateProfileStep()) {
      return;
    }

    // Validate stage 4 (Review - consent)
    if (currentStep === 4 && !validateReviewStep()) {
      return;
    }

    // Submit on stage 4 (Review)
    if (currentStep === 4) {
      handleSubmit();
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Save application to database
      const { data, error } = await supabase
        .from('applications')
        .insert({
          user_id: user?.id || null,
          program_id: formData.programId,
          university_name: formData.universityName,
          program_name: formData.programName,
          program_degree_level: formData.programDegreeLevel,
          program_degree_name: formData.programDegreeName,
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth?.toISOString().split('T')[0] || null,
          gender: formData.gender || null,
          nationality: formData.nationality,
          city: formData.city,
          email: formData.email,
          phone: formData.phone,
          current_education_level: formData.currentEducationLevel || null,
          gpa: formData.gpa || null,
          english_test: formData.englishTest || null,
          english_score: formData.englishScore || null,
          budget_range: formData.budgetRange || null,
          scholarship_interest: formData.scholarshipInterest,
          status: 'submitted'
        })
        .select('id')
        .single();

      if (error) throw error;

      // Clear draft
      localStorage.removeItem(`application_draft_${formData.programId}`);

      // Set application ID and move to confirmation
      setApplicationId(data.id);
      setCurrentStep(5);

      toast({
        title: t('apply.success'),
        description: t('apply.applicationSubmittedSuccess'),
      });
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: t('common.error'),
        description: t('apply.submissionError'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t('apply.applicationForm')}</h1>
          </div>

          {/* Program Info Card */}
          {formData.programName && (
            <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">{t('apply.applyingTo')}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">{formData.programName}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{formData.universityName}</span>
                    </div>
                  </div>
                  {formData.programDegreeName && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="font-normal">
                        {t('apply.degreeLevel')}: {formData.programDegreeName}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2 mb-4" />
            <div className="flex justify-between text-xs">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex flex-col items-center gap-1 ${
                    currentStep === step.number
                      ? "text-primary font-semibold"
                      : currentStep > step.number
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep > step.number
                        ? "bg-green-600 text-white"
                        : currentStep === step.number
                        ? "bg-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="hidden sm:block text-center">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card className="p-6 md:p-8 mb-8">
            {currentStep === 1 && (
              <ProfileStep
                formData={formData}
                updateFormData={updateFormData}
                validationErrors={validationErrors}
              />
            )}
            {currentStep === 2 && (
              <EligibilityStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 3 && (
              <DocumentsStep
                formData={formData}
                updateFormData={updateFormData}
              />
            )}
            {currentStep === 4 && (
              <ReviewStep
                formData={formData}
                updateFormData={updateFormData}
                validationErrors={validationErrors}
                onEditStep={handleEditStep}
              />
            )}
            {currentStep === 5 && (
              <ConfirmationStep applicationId={applicationId} />
            )}
          </Card>

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                size="lg"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                {t('apply.back')}
              </Button>

              {currentStep < 4 && (
                <Button onClick={handleNext} size="lg">
                  {t('apply.next')}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}

              {currentStep === 4 && (
                <Button 
                  onClick={handleNext} 
                  size="lg"
                  disabled={isSubmitting || !formData.consent}
                >
                  {isSubmitting ? t('apply.submitting') : t('apply.submit')}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
