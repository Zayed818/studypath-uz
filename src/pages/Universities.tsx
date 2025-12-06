import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText,
  Globe,
  Home,
  Plane,
  Heart,
  Loader2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSavedPrograms } from "@/hooks/useSavedPrograms";
import { ShareProgramDialog } from "@/components/universities/ShareProgramDialog";
import { toast } from "@/hooks/use-toast";

interface Program {
  id: string;
  title: string;
  university: string;
  degree: string;
  field: string;
  tuitionFee: string;
  intakeDates: string;
  deadline: string;
  requirements: string;
}

interface CountryInfo {
  id: string;
  tuitionRange: string;
  livingCost: string;
  visaRequirement: string;
  programs: Program[];
}

const countryData: Record<string, CountryInfo> = {
  turkey: {
    id: "turkey",
    tuitionRange: "$2,000 - $20,000",
    livingCost: "$300 - $600/month",
    visaRequirement: "Student visa required",
    programs: [
      {
        id: "turkey-1",
        title: "Mechanical Engineering",
        university: "Istanbul Technical University",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$3,800/year",
        intakeDates: "September 2025",
        deadline: "August 1, 2025",
        requirements: "High school diploma with strong math background"
      },
      {
        id: "turkey-2",
        title: "Computer Engineering",
        university: "Middle East Technical University",
        degree: "Bachelor's",
        field: "Computer & Data",
        tuitionFee: "$4,500/year",
        intakeDates: "September 2025",
        deadline: "July 15, 2025",
        requirements: "High school diploma, English proficiency (TOEFL 80+)"
      },
      {
        id: "turkey-3",
        title: "Business Administration",
        university: "Koç University",
        degree: "Bachelor's",
        field: "Business & Economics",
        tuitionFee: "$18,000/year",
        intakeDates: "September 2025",
        deadline: "June 30, 2025",
        requirements: "High school diploma, SAT/ACT, English proficiency"
      },
      {
        id: "turkey-4",
        title: "Architecture",
        university: "Bilkent University",
        degree: "Bachelor's",
        field: "Design & Creative",
        tuitionFee: "$16,500/year",
        intakeDates: "September 2025",
        deadline: "July 1, 2025",
        requirements: "Portfolio, high school diploma, English proficiency"
      }
    ]
  },
  malaysia: {
    id: "malaysia",
    tuitionRange: "$3,000 - $15,000",
    livingCost: "$400 - $800/month",
    visaRequirement: "Student pass required",
    programs: [
      {
        id: "malaysia-1",
        title: "Data Science",
        university: "Universiti Teknologi Malaysia",
        degree: "Master's",
        field: "Computer & Data",
        tuitionFee: "$4,800/year",
        intakeDates: "September 2025, February 2026",
        deadline: "July 31, 2025",
        requirements: "Bachelor's degree in related field, GPA 3.0+"
      },
      {
        id: "malaysia-2",
        title: "Medicine (MD)",
        university: "International Medical University",
        degree: "Bachelor's",
        field: "Medicine & Health",
        tuitionFee: "$14,000/year",
        intakeDates: "July 2025",
        deadline: "May 15, 2025",
        requirements: "High school diploma with biology, chemistry, physics"
      },
      {
        id: "malaysia-3",
        title: "Business Administration",
        university: "University of Malaya",
        degree: "Bachelor's",
        field: "Business & Economics",
        tuitionFee: "$5,200/year",
        intakeDates: "October 2025",
        deadline: "August 15, 2025",
        requirements: "High school diploma, IELTS 6.0+"
      },
      {
        id: "malaysia-4",
        title: "Electrical Engineering",
        university: "Universiti Malaya",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$6,000/year",
        intakeDates: "September 2025",
        deadline: "July 20, 2025",
        requirements: "High school with strong math and physics"
      }
    ]
  },
  qatar: {
    id: "qatar",
    tuitionRange: "$0 - $50,000",
    livingCost: "$1,000 - $2,000/month",
    visaRequirement: "Student visa required",
    programs: [
      {
        id: "qatar-1",
        title: "Petroleum Engineering",
        university: "Qatar University",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$0/year (Citizens), $30,000/year (International)",
        intakeDates: "September 2025",
        deadline: "June 1, 2025",
        requirements: "High school diploma, strong math background"
      },
      {
        id: "qatar-2",
        title: "International Business",
        university: "HEC Paris in Qatar",
        degree: "MBA",
        field: "Business & Economics",
        tuitionFee: "$45,000/year",
        intakeDates: "September 2025",
        deadline: "May 30, 2025",
        requirements: "Bachelor's degree, 3+ years work experience, GMAT/GRE"
      },
      {
        id: "qatar-3",
        title: "Medicine (MD)",
        university: "Weill Cornell Medicine - Qatar",
        degree: "Doctor of Medicine",
        field: "Medicine & Health",
        tuitionFee: "$50,000/year",
        intakeDates: "August 2025",
        deadline: "December 15, 2024",
        requirements: "Pre-medical bachelor's degree, MCAT scores"
      },
      {
        id: "qatar-4",
        title: "Computer Science",
        university: "Carnegie Mellon University Qatar",
        degree: "Bachelor's",
        field: "Computer & Data",
        tuitionFee: "$48,000/year",
        intakeDates: "August 2025",
        deadline: "January 15, 2025",
        requirements: "High school diploma, SAT/ACT, strong math"
      }
    ]
  },
  saudiArabia: {
    id: "saudiArabia",
    tuitionRange: "$0 - $30,000",
    livingCost: "$800 - $1,500/month",
    visaRequirement: "Student visa required",
    programs: [
      {
        id: "saudi-1",
        title: "Petroleum Engineering",
        university: "King Fahd University of Petroleum & Minerals",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$0/year (Scholarship available)",
        intakeDates: "September 2025",
        deadline: "March 15, 2025",
        requirements: "High school diploma with high GPA, English proficiency"
      },
      {
        id: "saudi-2",
        title: "Computer Engineering",
        university: "King Abdullah University of Science and Technology",
        degree: "Master's",
        field: "Computer & Data",
        tuitionFee: "$0/year (Fully funded)",
        intakeDates: "August 2025",
        deadline: "January 10, 2025",
        requirements: "Bachelor's degree, GRE, English proficiency"
      },
      {
        id: "saudi-3",
        title: "Finance",
        university: "King Saud University",
        degree: "Bachelor's",
        field: "Business & Economics",
        tuitionFee: "$8,000/year",
        intakeDates: "September 2025",
        deadline: "June 30, 2025",
        requirements: "High school diploma, English proficiency"
      },
      {
        id: "saudi-4",
        title: "Medicine (MD)",
        university: "King Abdulaziz University",
        degree: "Bachelor of Medicine",
        field: "Medicine & Health",
        tuitionFee: "$12,000/year",
        intakeDates: "September 2025",
        deadline: "May 15, 2025",
        requirements: "High school with biology, chemistry, physics"
      }
    ]
  },
  australia: {
    id: "australia",
    tuitionRange: "$20,000 - $50,000",
    livingCost: "$1,400 - $2,500/month",
    visaRequirement: "Student visa (subclass 500) required",
    programs: [
      {
        id: "australia-1",
        title: "Data Science",
        university: "University of Melbourne",
        degree: "Master's",
        field: "Computer & Data",
        tuitionFee: "$45,000/year",
        intakeDates: "February 2025, July 2025",
        deadline: "November 30, 2024",
        requirements: "Bachelor's degree in related field, English proficiency"
      },
      {
        id: "australia-2",
        title: "Civil Engineering",
        university: "University of Sydney",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$48,000/year",
        intakeDates: "February 2025",
        deadline: "January 15, 2025",
        requirements: "High school with strong math and physics"
      },
      {
        id: "australia-3",
        title: "Business Administration (MBA)",
        university: "Australian National University",
        degree: "MBA",
        field: "Business & Economics",
        tuitionFee: "$47,000/year",
        intakeDates: "February 2025",
        deadline: "December 1, 2024",
        requirements: "Bachelor's degree, 2+ years work experience, GMAT"
      },
      {
        id: "australia-4",
        title: "Nursing",
        university: "Monash University",
        degree: "Bachelor's",
        field: "Medicine & Health",
        tuitionFee: "$35,000/year",
        intakeDates: "February 2025",
        deadline: "January 10, 2025",
        requirements: "High school diploma, English proficiency (IELTS 7.0+)"
      }
    ]
  },
  uk: {
    id: "uk",
    tuitionRange: "£10,000 - £40,000",
    livingCost: "£1,000 - £1,800/month",
    visaRequirement: "Student visa (Tier 4) required",
    programs: [
      {
        id: "uk-1",
        title: "Artificial Intelligence / Machine Learning",
        university: "Imperial College London",
        degree: "Master's",
        field: "Computer & Data",
        tuitionFee: "£35,900/year",
        intakeDates: "September 2025",
        deadline: "March 31, 2025",
        requirements: "Bachelor's in computer science or related field"
      },
      {
        id: "uk-2",
        title: "Medicine (MD)",
        university: "University of Oxford",
        degree: "Bachelor of Medicine",
        field: "Medicine & Health",
        tuitionFee: "£38,400/year",
        intakeDates: "October 2025",
        deadline: "October 15, 2024",
        requirements: "A-levels with biology and chemistry, BMAT/UCAT"
      },
      {
        id: "uk-3",
        title: "Economics",
        university: "London School of Economics",
        degree: "Bachelor's",
        field: "Business & Economics",
        tuitionFee: "£23,330/year",
        intakeDates: "September 2025",
        deadline: "January 31, 2025",
        requirements: "A-levels with math, English proficiency"
      },
      {
        id: "uk-4",
        title: "Architecture",
        university: "University College London",
        degree: "Bachelor's",
        field: "Design & Creative",
        tuitionFee: "£28,100/year",
        intakeDates: "September 2025",
        deadline: "January 31, 2025",
        requirements: "Portfolio, A-levels, English proficiency"
      }
    ]
  },
  canada: {
    id: "canada",
    tuitionRange: "CAD $15,000 - $35,000",
    livingCost: "CAD $1,000 - $1,500/month",
    visaRequirement: "Study permit required",
    programs: [
      {
        id: "canada-1",
        title: "Computer Science",
        university: "University of Toronto",
        degree: "Bachelor's",
        field: "Computer & Data",
        tuitionFee: "CAD $58,160/year",
        intakeDates: "September 2025",
        deadline: "January 15, 2025",
        requirements: "High school with strong math, English proficiency"
      },
      {
        id: "canada-2",
        title: "Business Administration (MBA)",
        university: "McGill University",
        degree: "MBA",
        field: "Business & Economics",
        tuitionFee: "CAD $52,000/year",
        intakeDates: "September 2025",
        deadline: "January 31, 2025",
        requirements: "Bachelor's degree, GMAT/GRE, work experience"
      },
      {
        id: "canada-3",
        title: "Environmental Science",
        university: "University of British Columbia",
        degree: "Bachelor's",
        field: "Science",
        tuitionFee: "CAD $42,802/year",
        intakeDates: "September 2025",
        deadline: "January 15, 2025",
        requirements: "High school with biology and chemistry"
      },
      {
        id: "canada-4",
        title: "Pharmacy",
        university: "University of Waterloo",
        degree: "Bachelor's",
        field: "Medicine & Health",
        tuitionFee: "CAD $38,000/year",
        intakeDates: "September 2025",
        deadline: "February 1, 2025",
        requirements: "Pre-pharmacy courses, English proficiency"
      }
    ]
  },
  germany: {
    id: "germany",
    tuitionRange: "€0 - €20,000",
    livingCost: "€800 - €1,200/month",
    visaRequirement: "National visa (Type D) required",
    programs: [
      {
        id: "germany-1",
        title: "Mechanical Engineering",
        university: "Technical University of Munich",
        degree: "Master's",
        field: "Engineering",
        tuitionFee: "€0/year (Public university)",
        intakeDates: "October 2025",
        deadline: "May 31, 2025",
        requirements: "Bachelor's in engineering, German or English proficiency"
      },
      {
        id: "germany-2",
        title: "Renewable Energy",
        university: "University of Freiburg",
        degree: "Master's",
        field: "Science",
        tuitionFee: "€0/year (Public university)",
        intakeDates: "October 2025",
        deadline: "June 15, 2025",
        requirements: "Bachelor's in related field, English proficiency"
      },
      {
        id: "germany-3",
        title: "Information Technology",
        university: "RWTH Aachen University",
        degree: "Bachelor's",
        field: "Computer & Data",
        tuitionFee: "€0/year (Public university)",
        intakeDates: "October 2025",
        deadline: "July 15, 2025",
        requirements: "High school diploma, German or English proficiency"
      },
      {
        id: "germany-4",
        title: "International Business",
        university: "Mannheim Business School",
        degree: "Master's",
        field: "Business & Economics",
        tuitionFee: "€18,000/year",
        intakeDates: "September 2025",
        deadline: "May 1, 2025",
        requirements: "Bachelor's degree, GMAT, English proficiency"
      }
    ]
  },
  usa: {
    id: "usa",
    tuitionRange: "$25,000 - $70,000",
    livingCost: "$1,200 - $2,500/month",
    visaRequirement: "F-1 student visa required",
    programs: [
      {
        id: "usa-1",
        title: "Computer Science",
        university: "Massachusetts Institute of Technology",
        degree: "Bachelor's",
        field: "Computer & Data",
        tuitionFee: "$57,590/year",
        intakeDates: "September 2025",
        deadline: "January 1, 2025",
        requirements: "High school with strong academics, SAT/ACT"
      },
      {
        id: "usa-2",
        title: "Artificial Intelligence / Machine Learning",
        university: "Stanford University",
        degree: "Master's",
        field: "Computer & Data",
        tuitionFee: "$58,416/year",
        intakeDates: "September 2025",
        deadline: "December 15, 2024",
        requirements: "Bachelor's in CS or related field, GRE"
      },
      {
        id: "usa-3",
        title: "Business Administration (MBA)",
        university: "Harvard Business School",
        degree: "MBA",
        field: "Business & Economics",
        tuitionFee: "$73,440/year",
        intakeDates: "September 2025",
        deadline: "April 3, 2025",
        requirements: "Bachelor's degree, GMAT/GRE, work experience"
      },
      {
        id: "usa-4",
        title: "Medicine (MD)",
        university: "Johns Hopkins University",
        degree: "Doctor of Medicine",
        field: "Medicine & Health",
        tuitionFee: "$60,390/year",
        intakeDates: "August 2025",
        deadline: "October 31, 2024",
        requirements: "Pre-med bachelor's degree, MCAT scores"
      },
      {
        id: "usa-5",
        title: "Civil Engineering",
        university: "University of California, Berkeley",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$44,007/year",
        intakeDates: "September 2025",
        deadline: "November 30, 2024",
        requirements: "High school with strong math and science"
      }
    ]
  },
  poland: {
    id: "poland",
    tuitionRange: "€2,000 - €6,000",
    livingCost: "€400 - €700/month",
    visaRequirement: "National visa required",
    programs: [
      {
        id: "poland-1",
        title: "Medicine (MD)",
        university: "Jagiellonian University Medical College",
        degree: "Doctor of Medicine",
        field: "Medicine & Health",
        tuitionFee: "€11,500/year",
        intakeDates: "October 2025",
        deadline: "July 31, 2025",
        requirements: "High school with biology, chemistry, physics"
      },
      {
        id: "poland-2",
        title: "Computer Engineering",
        university: "Warsaw University of Technology",
        degree: "Bachelor's",
        field: "Computer & Data",
        tuitionFee: "€2,000/year",
        intakeDates: "October 2025",
        deadline: "August 15, 2025",
        requirements: "High school diploma, English proficiency"
      },
      {
        id: "poland-3",
        title: "Dentistry",
        university: "Medical University of Warsaw",
        degree: "Doctor of Dental Medicine",
        field: "Medicine & Health",
        tuitionFee: "€10,000/year",
        intakeDates: "October 2025",
        deadline: "July 20, 2025",
        requirements: "High school with biology and chemistry"
      },
      {
        id: "poland-4",
        title: "Graphic Design",
        university: "Academy of Fine Arts in Warsaw",
        degree: "Bachelor's",
        field: "Design & Creative",
        tuitionFee: "€3,000/year",
        intakeDates: "October 2025",
        deadline: "June 30, 2025",
        requirements: "Portfolio, high school diploma"
      }
    ]
  }
};

// SaveProgramButton component
const SaveProgramButton = ({ program, selectedCountry }: { program: Program; selectedCountry: string }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { saveProgram, unsaveProgram, isSaved } = useSavedPrograms();
  const [saving, setSaving] = useState(false);

  const saved = isSaved(program.id);

  const handleToggleSave = async () => {
    if (!user) {
      toast({
        title: t('universities.loginToSave'),
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    if (saved) {
      await unsaveProgram(program.id);
    } else {
      await saveProgram({
        programId: program.id,
        universityName: program.university,
        programName: program.title,
        country: selectedCountry,
        degree: program.degree,
        field: program.field,
        tuition: program.tuitionFee,
      });
    }
    setSaving(false);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1"
      onClick={handleToggleSave}
      disabled={saving}
    >
      {saving ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`h-4 w-4 ${saved ? 'fill-destructive text-destructive' : ''}`} />
      )}
      <span className="hidden sm:inline">
        {saved ? t('universities.saved') : t('universities.saveProgram')}
      </span>
    </Button>
  );
};

const Universities = () => {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>("turkey");
  const [degreeFilter, setDegreeFilter] = useState<string>("all");
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const [tuitionFilter, setTuitionFilter] = useState<string>("all");

  const currentCountryData = countryData[selectedCountry];

  // Get unique fields for filter
  const uniqueFields = Array.from(
    new Set(currentCountryData.programs.map((p) => p.field))
  );

  // Filter programs based on selected filters
  const filteredPrograms = currentCountryData.programs.filter((program) => {
    if (degreeFilter !== "all" && program.degree !== degreeFilter) return false;
    if (fieldFilter !== "all" && program.field !== fieldFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container px-4">
          <h1 className="text-4xl font-bold mb-4">{t('universities.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('universities.pageDescription')}
          </p>
        </div>
      </section>

      {/* Country Selection */}
      <section className="container px-4 py-8">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">{t('universities.selectCountry')}</h2>
          <Tabs value={selectedCountry} onValueChange={setSelectedCountry}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2 h-auto">
              <TabsTrigger value="turkey" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.turkey')}
              </TabsTrigger>
              <TabsTrigger value="malaysia" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.malaysia')}
              </TabsTrigger>
              <TabsTrigger value="qatar" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.qatar')}
              </TabsTrigger>
              <TabsTrigger value="saudiArabia" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.saudiArabia')}
              </TabsTrigger>
              <TabsTrigger value="australia" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.australia')}
              </TabsTrigger>
              <TabsTrigger value="uk" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.uk')}
              </TabsTrigger>
              <TabsTrigger value="canada" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.canada')}
              </TabsTrigger>
              <TabsTrigger value="germany" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.germany')}
              </TabsTrigger>
              <TabsTrigger value="usa" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.usa')}
              </TabsTrigger>
              <TabsTrigger value="poland" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {t('universities.countries.poland')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Card>
      </section>

      {/* Country Overview */}
      <section className="container px-4 pb-8">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            {t('universities.countryOverview')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t('universities.tuitionRange')}</h3>
                <p className="text-muted-foreground">{currentCountryData.tuitionRange}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Home className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t('universities.livingCost')}</h3>
                <p className="text-muted-foreground">{currentCountryData.livingCost}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Plane className="h-5 w-5 text-primary mt-1" />
              <div>
                <h3 className="font-semibold mb-1">{t('universities.visaRequirement')}</h3>
                <p className="text-muted-foreground">{currentCountryData.visaRequirement}</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Filters */}
      <section className="container px-4 pb-8">
        <Card className="p-6">
          <h3 className="font-bold mb-4">{t('common.filters')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Select value={degreeFilter} onValueChange={setDegreeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('universities.filterByDegree')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                <SelectItem value="Master's">Master's</SelectItem>
                <SelectItem value="MBA">MBA</SelectItem>
                <SelectItem value="Doctor of Medicine">Doctor of Medicine</SelectItem>
                <SelectItem value="Doctor of Dental Medicine">Doctor of Dental Medicine</SelectItem>
                <SelectItem value="Bachelor of Medicine">Bachelor of Medicine</SelectItem>
              </SelectContent>
            </Select>

            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('universities.filterByField')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                {uniqueFields.map((field) => (
                  <SelectItem key={field} value={field}>{field}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={tuitionFilter} onValueChange={setTuitionFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('universities.filterByTuition')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="free">Free/Low Cost</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('universities.filterByDeadline')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="soon">Deadline Soon</SelectItem>
                <SelectItem value="open">Still Open</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>
      </section>

      {/* Programs Grid */}
      <section className="container px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">
          {t('universities.programsAvailable')} ({filteredPrograms.length})
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{program.title}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {program.university}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{program.degree}</Badge>
                <Badge variant="outline">{program.field}</Badge>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {t('programDetail.tuitionFee')}
                  </span>
                  <span className="font-semibold">{program.tuitionFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {t('universities.intakeDates')}
                  </span>
                  <span className="font-semibold">{program.intakeDates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {t('universities.applicationDeadline')}
                  </span>
                  <span className="font-semibold">{program.deadline}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {t('universities.requirements')}
                </h4>
                <p className="text-xs text-muted-foreground">{program.requirements}</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm" asChild>
                    <Link to={`/programs/${program.id}`}>{t('universities.viewProgram')}</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link 
                      to={`/apply?programId=${program.id}&universityId=${selectedCountry}&programName=${encodeURIComponent(program.title)}&universityName=${encodeURIComponent(program.university)}`}
                    >
                      {t('universities.applyNow')}
                    </Link>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <SaveProgramButton program={program} selectedCountry={selectedCountry} />
                  <ShareProgramDialog
                    programId={program.id}
                    programName={program.title}
                    universityName={program.university}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Universities;
