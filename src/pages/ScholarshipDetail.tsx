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
  Users,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Scholarship data
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
    logo: "🇹🇷",
    description: "Türkiye Bursları is a fully-funded scholarship program offered by the Turkish government for international students. It covers tuition, accommodation, health insurance, Turkish language course, and provides a monthly stipend.",
    eligibility: [
      "Age: Under 21 for Bachelor's, under 30 for Master's, under 35 for PhD",
      "Minimum GPA: 70% for Bachelor's, 75% for Master's and PhD",
      "Not a Turkish citizen or student",
      "Graduated or graduating from high school/university",
      "Good health condition",
    ],
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
  },
  "malaysia-international": {
    id: "malaysia-international",
    title: "Malaysia International Scholarship",
    organization: "Malaysian Government",
    country: "Malaysia",
    amount: "Full tuition + RM3,500/month",
    coverage: "Full Coverage",
    degreeLevel: ["Master's", "PhD"],
    field: "Science, Technology, Social Sciences",
    deadline: "March 31, 2026",
    logo: "🇲🇾",
    description: "The Malaysia International Scholarship (MIS) is awarded to outstanding international students to pursue postgraduate studies at participating Malaysian universities.",
    eligibility: [
      "Age: Under 40 for Master's, under 45 for PhD",
      "CGPA: Minimum 3.5/4.0 or equivalent",
      "English proficiency: IELTS 6.0 or TOEFL 550",
      "Acceptance letter from Malaysian university",
      "Good health and conduct",
    ],
    applicationSteps: [
      "Obtain admission offer from Malaysian university",
      "Complete online MIS application form",
      "Upload academic transcripts and certificates",
      "Submit research proposal (for PhD)",
      "Provide recommendation letters (2)",
      "Wait for selection results",
    ],
    timeline: {
      open: "January 1, 2026",
      deadline: "March 31, 2026",
      results: "June 2026",
    },
    benefits: [
      "Full tuition fee waiver",
      "Monthly allowance (RM3,500)",
      "Thesis allowance (RM3,000-5,000)",
      "Annual book allowance (RM500)",
      "Medical insurance",
      "Single airfare (economy class)",
    ],
  },
  "qatar-foundation": {
    id: "qatar-foundation",
    title: "Qatar Foundation Scholarship",
    organization: "Qatar Foundation",
    country: "Qatar",
    amount: "Full tuition + living expenses",
    coverage: "Full Coverage",
    degreeLevel: ["Bachelor's", "Master's"],
    field: "All Fields",
    deadline: "January 15, 2026",
    logo: "🇶🇦",
    description: "Qatar Foundation offers scholarships to outstanding students at its partner universities, covering all academic and living expenses in Qatar's Education City.",
    eligibility: [
      "Outstanding academic achievement",
      "SAT/ACT scores for undergraduate",
      "English proficiency (TOEFL/IELTS)",
      "Admission to QF partner university",
      "Leadership and community involvement",
    ],
    applicationSteps: [
      "Apply to QF partner universities",
      "Complete scholarship application",
      "Submit academic records",
      "Provide standardized test scores",
      "Write personal statement",
      "Attend interview if selected",
    ],
    timeline: {
      open: "October 1, 2025",
      deadline: "January 15, 2026",
      results: "April 2026",
    },
    benefits: [
      "Full tuition coverage",
      "Accommodation allowance",
      "Monthly living stipend",
      "Health insurance",
      "Annual return flight ticket",
      "Book allowance",
    ],
  },
  "king-abdullah": {
    id: "king-abdullah",
    title: "King Abdullah Scholarship",
    organization: "Saudi Ministry of Education",
    country: "Saudi Arabia",
    amount: "Full tuition + SR4,000-5,000/month",
    coverage: "Full Coverage",
    degreeLevel: ["Bachelor's", "Master's", "PhD"],
    field: "All Fields",
    deadline: "December 31, 2025",
    logo: "🇸🇦",
    description: "The King Abdullah Scholarship Program (KASP) is a comprehensive scholarship supporting Saudi and international students to study at top universities worldwide.",
    eligibility: [
      "Admission to accredited university",
      "Age requirements vary by degree",
      "Good academic standing (GPA ≥ 3.75/5.0)",
      "English proficiency required",
      "Medical fitness certificate",
    ],
    applicationSteps: [
      "Register on SAFEER platform",
      "Obtain university admission",
      "Submit scholarship application",
      "Upload required documents",
      "Complete cultural attaché interview",
      "Receive scholarship decision",
    ],
    timeline: {
      open: "September 1, 2025",
      deadline: "December 31, 2025",
      results: "February-March 2026",
    },
    benefits: [
      "Full tuition and fees",
      "Monthly stipend (SR4,000-5,000)",
      "Medical insurance",
      "Annual round-trip ticket",
      "Book allowance",
      "Arrival allowance",
    ],
  },
  "chevening": {
    id: "chevening",
    title: "Chevening Scholarships",
    organization: "UK Government",
    country: "United Kingdom",
    amount: "Full tuition + £1,600/month",
    coverage: "Full Coverage",
    degreeLevel: ["Master's"],
    field: "All Fields",
    deadline: "November 7, 2025",
    logo: "🇬🇧",
    description: "Chevening Scholarships are the UK government's global scholarship programme, funded by the Foreign, Commonwealth and Development Office and partner organisations.",
    eligibility: [
      "Citizen of Chevening-eligible country",
      "Undergraduate degree",
      "At least 2 years work experience (2,800 hours)",
      "Apply to 3 eligible UK universities",
      "English language requirement",
    ],
    applicationSteps: [
      "Select three UK university courses",
      "Complete online Chevening application",
      "Submit two references",
      "Write four essays (500 words each)",
      "Attend interview if shortlisted",
      "Accept UK university offer",
    ],
    timeline: {
      open: "August 6, 2025",
      deadline: "November 7, 2025",
      results: "June 2026",
    },
    benefits: [
      "Full tuition fees",
      "Monthly living allowance (£1,600)",
      "Airfare to/from UK",
      "Arrival allowance",
      "Departure allowance",
      "Thesis/dissertation grant",
    ],
  },
  "daad": {
    id: "daad",
    title: "DAAD Scholarships",
    organization: "German Academic Exchange Service",
    country: "Germany",
    amount: "€934-1,200/month + tuition",
    coverage: "Full Coverage",
    degreeLevel: ["Master's", "PhD"],
    field: "Various",
    deadline: "Various (September-November 2025)",
    logo: "🇩🇪",
    description: "DAAD offers a wide range of scholarships for international students and researchers to study in Germany, promoting international academic exchange.",
    eligibility: [
      "Bachelor's degree for Master's programs",
      "Master's degree for PhD programs",
      "Strong academic record",
      "German/English language proficiency",
      "Motivation letter and study plan",
    ],
    applicationSteps: [
      "Identify suitable DAAD scholarship",
      "Prepare application documents",
      "Apply through DAAD portal",
      "Submit university applications",
      "Provide recommendation letters",
      "Complete language certificates",
    ],
    timeline: {
      open: "Varies by program (May-August 2025)",
      deadline: "September-November 2025",
      results: "March-May 2026",
    },
    benefits: [
      "Monthly scholarship (€934-1,200)",
      "Health insurance",
      "Travel allowance",
      "Study and research allowance",
      "German language course",
      "Rent subsidy in some cases",
    ],
  },
  "fulbright": {
    id: "fulbright",
    title: "Fulbright Foreign Student Program",
    organization: "U.S. Department of State",
    country: "United States",
    amount: "Full tuition + living stipend",
    coverage: "Full Coverage",
    degreeLevel: ["Master's", "PhD"],
    field: "All Fields",
    deadline: "October 15, 2025",
    logo: "🇺🇸",
    description: "The Fulbright Program provides grants for international graduate students to study and conduct research in the United States.",
    eligibility: [
      "Bachelor's degree or equivalent",
      "English proficiency (TOEFL/IELTS)",
      "Leadership potential",
      "Strong academic record",
      "Return to home country after completion",
    ],
    applicationSteps: [
      "Contact Fulbright Commission in home country",
      "Complete application form",
      "Write personal statement",
      "Submit research/study proposal",
      "Provide 3 recommendation letters",
      "Attend interview if selected",
    ],
    timeline: {
      open: "February 1, 2025",
      deadline: "October 15, 2025",
      results: "April-May 2026",
    },
    benefits: [
      "Full tuition and fees",
      "Living stipend",
      "Accident/sickness insurance",
      "Round-trip airfare",
      "Book allowance",
      "Pre-academic English training",
    ],
  },
};

const ScholarshipDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  
  const scholarship = id ? scholarshipsData[id] : null;

  if (!scholarship) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-12 text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4">Scholarship Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The scholarship you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/scholarships">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Scholarships
              </Link>
            </Button>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white">
        <div className="container px-4">
          <Button
            variant="ghost"
            className="mb-6 text-white hover:text-white hover:bg-white/10"
            asChild
          >
            <Link to="/scholarships">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back')}
            </Link>
          </Button>

          <div className="flex items-start gap-6">
            <div className="text-6xl">{scholarship.logo}</div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {scholarship.title}
              </h1>
              <p className="text-lg text-white/90 mb-4">
                {scholarship.organization}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white text-secondary">{scholarship.coverage}</Badge>
                {scholarship.degreeLevel.map((level: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-white/10 border-white/20 text-white">
                    {level}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">{t('scholarshipDetail.overview')}</h2>
              <p className="text-muted-foreground leading-relaxed">{scholarship.description}</p>
            </Card>

            {/* Eligibility */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-primary" />
                {t('scholarshipDetail.eligibility')}
              </h2>
              <ul className="space-y-3">
                {scholarship.eligibility.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Application Steps */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                {t('scholarshipDetail.applicationSteps')}
              </h2>
              <ol className="space-y-4">
                {scholarship.applicationSteps.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-medium">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            {/* Benefits */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                {t('scholarshipDetail.benefits')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scholarship.benefits.map((benefit: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Information */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">{t('scholarshipDetail.keyInfo')}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{t('scholarshipDetail.country')}</span>
                  </div>
                  <p className="font-medium">{scholarship.country}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm">{t('scholarshipDetail.amount')}</span>
                  </div>
                  <p className="font-medium text-primary">{scholarship.amount}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{t('scholarshipDetail.field')}</span>
                  </div>
                  <p className="font-medium">{scholarship.field}</p>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {t('scholarshipDetail.timeline')}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('scholarshipDetail.applicationOpen')}</p>
                  <p className="font-medium">{scholarship.timeline.open}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('scholarshipDetail.deadline')}</p>
                  <p className="font-medium text-destructive">{scholarship.timeline.deadline}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('scholarshipDetail.results')}</p>
                  <p className="font-medium">{scholarship.timeline.results}</p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-6 bg-primary/5">
              <h3 className="font-semibold mb-4">{t('scholarshipDetail.readyToApply')}</h3>
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/apply">
                    <Calendar className="mr-2 h-4 w-4" />
                    {t('scholarshipDetail.startApplication')}
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t('scholarshipDetail.contactCounselor')}
                </Button>
              </div>
            </Card>

            {/* Alert */}
            <Alert>
              <Calendar className="h-4 w-4" />
              <AlertDescription>
                {t('scholarshipDetail.deadlineAlert')} <strong>{scholarship.deadline}</strong>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ScholarshipDetail;
