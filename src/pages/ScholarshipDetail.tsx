import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
  Shield,
  ExternalLink,
  Plane,
  Home,
  Heart,
  BookOpen,
  Briefcase,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DeadlineAlert } from "@/components/scholarships/DeadlineAlert";
import { ExternalRedirectDialog } from "@/components/scholarships/ExternalRedirectDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackScholarshipEvent, isScholarshipInfoFresh, formatDeadlineDate } from "@/lib/scholarshipUtils";

const scholarshipsData: Record<string, any> = {
  "turkiye-burslari": {
    id: "turkiye-burslari",
    title: "Türkiye Bursları",
    organization: "Turkish Government",
    country: "Turkey",
    amount: "Full tuition + ₺3,000-4,500/month",
    coverage: "Full Coverage",
    degreeLevel: ["Bachelor's", "Master's", "PhD"],
    field: "All Fields",
    deadline: "February 20, 2026",
    deadlineDate: "2026-02-20",
    lastUpdated: "2025-01-15",
    logo: "🇹🇷",
    apply_url: "https://www.turkiyeburslari.gov.tr/",
    description: "Türkiye Bursları is a fully-funded scholarship program offered by the Turkish government for international students. It covers tuition, accommodation, health insurance, Turkish language course, and provides a monthly stipend.",
    eligibility: [
      "Age: Under 21 for Bachelor's, under 30 for Master's, under 35 for PhD",
      "Minimum GPA: 70% for Bachelor's, 75% for Master's and PhD",
      "Not a Turkish citizen or student",
      "Graduated or graduating from high school/university",
      "Good health condition",
    ],
    languageRequirements: "English proficiency or Turkish language course provided",
    gpaRequirement: "70% minimum (Bachelor's), 75% minimum (Master's/PhD)",
    nationalityRestrictions: "Open to all countries except Turkey",
    coverageDetails: {
      tuition: "100% tuition fee coverage at any Turkish university",
      livingStipend: "₺3,000/month (Bachelor's), ₺3,500/month (Master's), ₺4,500/month (PhD)",
      travel: "One-time round-trip economy class airfare",
      insurance: "Full health insurance coverage during studies",
      other: ["University dormitory accommodation", "One-year Turkish language course", "Residence permit fees"],
    },
    requiredDocuments: [
      "Valid passport copy",
      "Recent passport-size photograph",
      "Academic transcripts (translated if not in English/Turkish)",
      "High school/university diploma",
      "Language proficiency certificate (TOEFL/IELTS or equivalent)",
      "Letter of recommendation (optional but recommended)",
      "Statement of purpose",
    ],
    commonMistakes: [
      "Incomplete application form - Double-check all fields before submission",
      "Missing document translations - Ensure all documents are in English or Turkish",
      "Late submission - Apply at least 1 week before deadline to avoid technical issues",
      "Incorrect program selection - Choose programs carefully, you can select up to 12",
      "Poor statement of purpose - Write a clear, compelling explanation of your goals",
    ],
    trustSignals: {
      officialWebsite: "https://www.turkiyeburslari.gov.tr/",
      accreditation: ["Turkish Government Scholarship", "YTB Verified"],
      verificationBadge: true,
    },
    applicationSteps: [
      "Create account on tbbs.turkiyeburslari.gov.tr",
      "Fill out online application form",
      "Upload required documents (transcripts, passport, photo)",
      "Select up to 12 university programs",
      "Submit application before deadline",
      "Attend interview if shortlisted",
    ],
    timeline: {
      open: "January 10, 2026",
      deadline: "February 20, 2026",
      results: "July-August 2026",
    },
    benefits: [
      "Full tuition fee coverage",
      "Monthly stipend (₺3,000-4,500)",
      "Accommodation in university dormitories",
      "One-year Turkish language course",
      "Health insurance",
      "Round-trip airfare",
    ],
    faq: [
      {
        question: "Can I work while on the scholarship?",
        answer: "Part-time work is allowed with proper work permits, but full-time study is required.",
      },
      {
        question: "Is the Turkish language course mandatory?",
        answer: "Yes, all scholarship recipients must complete a one-year Turkish language preparatory program before starting their degree.",
      },
      {
        question: "Can I choose any university in Turkey?",
        answer: "You can select up to 12 programs from participating Turkish universities. Final placement is determined by YTB.",
      },
    ],
    relatedPrograms: ["engineering-turkey", "medicine-turkey"],
    relatedCareers: ["international-relations", "engineering"],
  },
  // ... other scholarships remain the same structure
};

const ScholarshipDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [redirectDialog, setRedirectDialog] = useState(false);

  const scholarship = scholarshipsData[id || ""];

  useEffect(() => {
    if (scholarship) {
      trackScholarshipEvent('view', scholarship.id);
    }
  }, [scholarship]);

  if (!scholarship) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container px-4 py-16 text-center">
          <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Scholarship Not Found</h1>
          <p className="text-muted-foreground mb-6">The scholarship you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/scholarships">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scholarships
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const isFresh = isScholarshipInfoFresh(scholarship.lastUpdated);
  const formattedDeadline = formatDeadlineDate(scholarship.deadlineDate, language);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white py-8">
        <div className="container px-4">
          <Button variant="ghost" size="sm" asChild className="mb-4 text-white hover:bg-white/20">
            <Link to="/scholarships">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back')}
            </Link>
          </Button>

          <div className="flex items-start gap-6">
            <div className="text-6xl">{scholarship.logo}</div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{scholarship.title}</h1>
              <p className="text-lg text-white/90 mb-4">{scholarship.organization}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  {scholarship.coverage}
                </Badge>
                {scholarship.degreeLevel.map((level: string, index: number) => (
                  <Badge key={index} variant="outline" className="border-white/30 text-white">
                    {level}
                  </Badge>
                ))}
                {scholarship.trustSignals?.verificationBadge && (
                  <Badge variant="secondary" className="bg-green-500/20 text-white border-green-400/30 gap-1">
                    <Shield className="h-3 w-3" />
                    {t('scholarships.verifiedScholarship')}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {!isFresh && (
          <Alert variant="default" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{t('scholarships.infoNotRecentlyUpdated')}</AlertDescription>
          </Alert>
        )}

        <DeadlineAlert deadlineDate={scholarship.deadlineDate} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('scholarships.eligibility')}</h2>
              <p className="text-muted-foreground mb-4">{scholarship.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{t('scholarships.languageRequirements')}</h3>
                  <p className="text-sm text-muted-foreground">{scholarship.languageRequirements}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">{t('scholarships.gpaRequirement')}</h3>
                  <p className="text-sm text-muted-foreground">{scholarship.gpaRequirement}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">{t('scholarships.nationalityRestrictions')}</h3>
                  <p className="text-sm text-muted-foreground">{scholarship.nationalityRestrictions}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Additional Requirements</h3>
                  <ul className="space-y-2">
                    {scholarship.eligibility.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                {t('scholarships.coverageDetails')}
              </h2>
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t('scholarships.tuitionCoverage')}</h3>
                    <p className="text-sm text-muted-foreground">{scholarship.coverageDetails.tuition}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t('scholarships.livingStipend')}</h3>
                    <p className="text-sm text-muted-foreground">{scholarship.coverageDetails.livingStipend}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Plane className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t('scholarships.travelAllowance')}</h3>
                    <p className="text-sm text-muted-foreground">{scholarship.coverageDetails.travel}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t('scholarships.insuranceCoverage')}</h3>
                    <p className="text-sm text-muted-foreground">{scholarship.coverageDetails.insurance}</p>
                  </div>
                </div>
                
                {scholarship.coverageDetails.other && scholarship.coverageDetails.other.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">{t('scholarships.otherBenefits')}</h3>
                      <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                        {scholarship.coverageDetails.other.map((benefit: string, index: number) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6" />
                {t('scholarships.requiredDocuments')}
              </h2>
              <ul className="grid gap-2">
                {scholarship.requiredDocuments.map((doc: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <h3 className="font-semibold mb-2">{t('scholarships.commonMistakes')}</h3>
                <ul className="space-y-1 text-sm">
                  {scholarship.commonMistakes.map((mistake: string, index: number) => (
                    <li key={index}>• {mistake}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('scholarships.applicationProcess')}</h2>
              <ol className="space-y-3">
                {scholarship.applicationSteps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('scholarships.faq')}</h2>
              <Accordion type="single" collapsible className="w-full">
                {scholarship.faq.map((item: any, index: number) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{t('scholarships.keyInfo')}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{t('common.country')}</span>
                  </div>
                  <p className="font-medium">{scholarship.country}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{t('common.amount')}</span>
                  </div>
                  <p className="font-medium text-primary">{scholarship.amount}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Award className="h-4 w-4" />
                    <span className="text-sm">{t('common.field')}</span>
                  </div>
                  <p className="font-medium">{scholarship.field}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">{t('scholarships.timeline')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('common.open')}</p>
                    <p className="font-medium">{scholarship.timeline.open}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('common.deadline')}</p>
                    <p className="font-medium">{formattedDeadline}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t('common.resultsAnnounced')}</p>
                    <p className="font-medium">{scholarship.timeline.results}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
              <h3 className="font-semibold mb-2">{t('scholarships.applyOnOfficialSite')}</h3>
              <p className="text-sm mb-4 opacity-90">
                {t('scholarships.externalRedirectMessage')}
              </p>
              <Button 
                onClick={() => setRedirectDialog(true)} 
                className="w-full bg-white text-primary hover:bg-white/90"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {t('scholarships.apply')}
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{t('scholarships.trustSignals')}</h3>
              </div>
              <div className="space-y-3">
                {scholarship.trustSignals.accreditation.map((acc: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{acc}</span>
                  </div>
                ))}
                <a
                  href={scholarship.trustSignals.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {t('scholarships.officialWebsite')}
                  <ExternalLink className="h-3 w-3" />
                </a>
                <p className="text-xs text-muted-foreground">
                  {t('scholarships.lastUpdated')}: {scholarship.lastUpdated}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />

      <ExternalRedirectDialog
        open={redirectDialog}
        onOpenChange={setRedirectDialog}
        scholarshipId={scholarship.id}
        scholarshipTitle={scholarship.title}
        applyUrl={scholarship.apply_url}
      />
    </div>
  );
};

export default ScholarshipDetail;
