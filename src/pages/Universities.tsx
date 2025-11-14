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
  Plane
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
        title: "Computer Engineering",
        university: "Middle East Technical University",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$4,500/year",
        intakeDates: "September 2025",
        deadline: "July 15, 2025",
        requirements: "High school diploma, English proficiency (TOEFL 80+)"
      },
      {
        id: "turkey-2",
        title: "International Relations",
        university: "Koç University",
        degree: "Bachelor's",
        field: "Social Sciences",
        tuitionFee: "$18,000/year",
        intakeDates: "September 2025",
        deadline: "June 30, 2025",
        requirements: "High school diploma, SAT/ACT, English proficiency"
      },
      {
        id: "turkey-3",
        title: "Mechanical Engineering",
        university: "Istanbul Technical University",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$3,800/year",
        intakeDates: "September 2025",
        deadline: "August 1, 2025",
        requirements: "High school diploma with strong math background"
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
        title: "Business Administration",
        university: "University of Malaya",
        degree: "Bachelor's",
        field: "Business",
        tuitionFee: "$5,200/year",
        intakeDates: "October 2025",
        deadline: "August 15, 2025",
        requirements: "High school diploma, IELTS 6.0+"
      },
      {
        id: "malaysia-2",
        title: "Data Science",
        university: "Universiti Teknologi Malaysia",
        degree: "Master's",
        field: "Computer Science",
        tuitionFee: "$4,800/year",
        intakeDates: "September 2025, February 2026",
        deadline: "July 31, 2025",
        requirements: "Bachelor's degree in related field, GPA 3.0+"
      },
      {
        id: "malaysia-3",
        title: "Medicine",
        university: "International Medical University",
        degree: "Bachelor's",
        field: "Medicine",
        tuitionFee: "$14,000/year",
        intakeDates: "July 2025",
        deadline: "May 15, 2025",
        requirements: "High school diploma with biology, chemistry, physics"
      }
    ]
  },
  qatar: {
    id: "qatar",
    tuitionRange: "$15,000 - $50,000",
    livingCost: "$1,000 - $2,000/month",
    visaRequirement: "Student residence permit required",
    programs: [
      {
        id: "qatar-1",
        title: "Media & Communication",
        university: "Qatar University",
        degree: "Bachelor's",
        field: "Communication",
        tuitionFee: "$18,500/year",
        intakeDates: "September 2025",
        deadline: "June 30, 2025",
        requirements: "High school diploma, TOEFL 79+, portfolio"
      },
      {
        id: "qatar-2",
        title: "Electrical Engineering",
        university: "Texas A&M University at Qatar",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$45,000/year",
        intakeDates: "August 2025",
        deadline: "May 1, 2025",
        requirements: "High school diploma, SAT/ACT, strong math scores"
      },
      {
        id: "qatar-3",
        title: "Islamic Studies",
        university: "Hamad Bin Khalifa University",
        degree: "Master's",
        field: "Islamic Studies",
        tuitionFee: "$20,000/year",
        intakeDates: "September 2025",
        deadline: "April 30, 2025",
        requirements: "Bachelor's degree, Arabic proficiency, research proposal"
      }
    ]
  },
  saudiArabia: {
    id: "saudiArabia",
    tuitionRange: "$10,000 - $40,000",
    livingCost: "$600 - $1,200/month",
    visaRequirement: "Student visa required",
    programs: [
      {
        id: "saudi-1",
        title: "Petroleum Engineering",
        university: "King Fahd University of Petroleum & Minerals",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "$15,000/year",
        intakeDates: "September 2025",
        deadline: "March 31, 2025",
        requirements: "High school diploma, TOEFL 68+, strong science grades"
      },
      {
        id: "saudi-2",
        title: "Arabic Language",
        university: "King Saud University",
        degree: "Bachelor's",
        field: "Languages",
        tuitionFee: "$12,000/year",
        intakeDates: "September 2025",
        deadline: "June 15, 2025",
        requirements: "High school diploma, basic Arabic knowledge"
      },
      {
        id: "saudi-3",
        title: "Computer Science",
        university: "KAUST",
        degree: "Master's",
        field: "Computer Science",
        tuitionFee: "Fully Funded",
        intakeDates: "September 2025",
        deadline: "January 8, 2025",
        requirements: "Bachelor's degree, GRE, TOEFL 79+, research experience"
      }
    ]
  },
  australia: {
    id: "australia",
    tuitionRange: "$20,000 - $45,000",
    livingCost: "$1,200 - $2,500/month",
    visaRequirement: "Student visa (subclass 500) required",
    programs: [
      {
        id: "australia-1",
        title: "Nursing",
        university: "University of Sydney",
        degree: "Bachelor's",
        field: "Nursing",
        tuitionFee: "$32,000/year",
        intakeDates: "February 2026",
        deadline: "December 15, 2025",
        requirements: "High school diploma, IELTS 7.0+, health requirements"
      },
      {
        id: "australia-2",
        title: "Cybersecurity",
        university: "University of Melbourne",
        degree: "Master's",
        field: "Computer Science",
        tuitionFee: "$38,000/year",
        intakeDates: "March 2026, July 2026",
        deadline: "January 31, 2026",
        requirements: "Bachelor's degree in IT/CS, IELTS 6.5+"
      },
      {
        id: "australia-3",
        title: "MBA",
        university: "Monash University",
        degree: "Master's",
        field: "Business",
        tuitionFee: "$42,000/year",
        intakeDates: "February 2026",
        deadline: "November 30, 2025",
        requirements: "Bachelor's degree, 2+ years work experience, GMAT/GRE"
      }
    ]
  },
  uk: {
    id: "uk",
    tuitionRange: "£10,000 - £38,000",
    livingCost: "£900 - £1,400/month",
    visaRequirement: "Student visa (Tier 4) required",
    programs: [
      {
        id: "uk-1",
        title: "Law",
        university: "University of Oxford",
        degree: "Bachelor's",
        field: "Law",
        tuitionFee: "£28,370/year",
        intakeDates: "October 2025",
        deadline: "October 15, 2024",
        requirements: "Excellent A-levels, LNAT, personal statement"
      },
      {
        id: "uk-2",
        title: "Finance",
        university: "London School of Economics",
        degree: "Master's",
        field: "Finance",
        tuitionFee: "£34,200/year",
        intakeDates: "September 2025",
        deadline: "January 13, 2025",
        requirements: "Bachelor's degree in related field, GMAT 650+"
      },
      {
        id: "uk-3",
        title: "Computer Science",
        university: "University of Manchester",
        degree: "Bachelor's",
        field: "Computer Science",
        tuitionFee: "£26,000/year",
        intakeDates: "September 2025",
        deadline: "January 31, 2025",
        requirements: "Strong A-levels in math/sciences, IELTS 6.5+"
      }
    ]
  },
  canada: {
    id: "canada",
    tuitionRange: "CAD $15,000 - $50,000",
    livingCost: "CAD $800 - $1,500/month",
    visaRequirement: "Study permit required",
    programs: [
      {
        id: "canada-1",
        title: "Engineering",
        university: "University of Toronto",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "CAD $58,160/year",
        intakeDates: "September 2025",
        deadline: "January 15, 2025",
        requirements: "High school diploma, strong math/science grades, English proficiency"
      },
      {
        id: "canada-2",
        title: "Artificial Intelligence",
        university: "University of British Columbia",
        degree: "Master's",
        field: "Computer Science",
        tuitionFee: "CAD $9,314/year",
        intakeDates: "September 2025",
        deadline: "December 15, 2024",
        requirements: "Bachelor's in CS/related field, GRE, research experience"
      },
      {
        id: "canada-3",
        title: "Psychology",
        university: "McGill University",
        degree: "Bachelor's",
        field: "Psychology",
        tuitionFee: "CAD $28,700/year",
        intakeDates: "September 2025",
        deadline: "January 15, 2025",
        requirements: "High school diploma, IELTS 6.5+, strong academic record"
      }
    ]
  },
  germany: {
    id: "germany",
    tuitionRange: "€0 - €20,000",
    livingCost: "€800 - €1,200/month",
    visaRequirement: "Student visa required",
    programs: [
      {
        id: "germany-1",
        title: "Mechanical Engineering",
        university: "Technical University of Munich",
        degree: "Bachelor's",
        field: "Engineering",
        tuitionFee: "No tuition (€144.40 semester fee)",
        intakeDates: "October 2025",
        deadline: "July 15, 2025",
        requirements: "Abitur or equivalent, German B2 or English B2"
      },
      {
        id: "germany-2",
        title: "Renewable Energy",
        university: "RWTH Aachen",
        degree: "Master's",
        field: "Engineering",
        tuitionFee: "No tuition (semester fees only)",
        intakeDates: "October 2025",
        deadline: "March 1, 2025",
        requirements: "Bachelor's in engineering, German or English proficiency"
      },
      {
        id: "germany-3",
        title: "Philosophy",
        university: "Humboldt University",
        degree: "Bachelor's",
        field: "Humanities",
        tuitionFee: "No tuition (€315 semester fee)",
        intakeDates: "October 2025",
        deadline: "July 15, 2025",
        requirements: "High school diploma, German C1, philosophical background"
      }
    ]
  },
  usa: {
    id: "usa",
    tuitionRange: "$20,000 - $70,000",
    livingCost: "$1,000 - $2,500/month",
    visaRequirement: "F-1 student visa required",
    programs: [
      {
        id: "usa-1",
        title: "Computer Science",
        university: "MIT",
        degree: "Bachelor's",
        field: "Computer Science",
        tuitionFee: "$57,986/year",
        intakeDates: "September 2025",
        deadline: "January 1, 2025",
        requirements: "SAT/ACT, strong academic record, essays, recommendations"
      },
      {
        id: "usa-2",
        title: "MBA",
        university: "Harvard Business School",
        degree: "Master's",
        field: "Business",
        tuitionFee: "$73,440/year",
        intakeDates: "September 2025",
        deadline: "September 7, 2024",
        requirements: "Bachelor's degree, GMAT/GRE, 3+ years work experience"
      },
      {
        id: "usa-3",
        title: "Public Health",
        university: "Johns Hopkins University",
        degree: "Master's",
        field: "Public Health",
        tuitionFee: "$62,840/year",
        intakeDates: "September 2025",
        deadline: "January 15, 2025",
        requirements: "Bachelor's degree, GRE, relevant experience, TOEFL 100+"
      }
    ]
  },
  poland: {
    id: "poland",
    tuitionRange: "€2,000 - €12,000",
    livingCost: "€400 - €700/month",
    visaRequirement: "National visa type D required",
    programs: [
      {
        id: "poland-1",
        title: "Medicine",
        university: "Jagiellonian University",
        degree: "Bachelor's",
        field: "Medicine",
        tuitionFee: "€11,000/year",
        intakeDates: "October 2025",
        deadline: "July 31, 2025",
        requirements: "High school diploma, biology/chemistry/physics, entrance exam"
      },
      {
        id: "poland-2",
        title: "International Business",
        university: "Warsaw School of Economics",
        degree: "Bachelor's",
        field: "Business",
        tuitionFee: "€3,000/year",
        intakeDates: "October 2025",
        deadline: "August 15, 2025",
        requirements: "High school diploma, English proficiency B2+"
      },
      {
        id: "poland-3",
        title: "Architecture",
        university: "Gdańsk University of Technology",
        degree: "Bachelor's",
        field: "Architecture",
        tuitionFee: "€2,000/year",
        intakeDates: "October 2025",
        deadline: "September 15, 2025",
        requirements: "High school diploma, portfolio, entrance exam"
      }
    ]
  }
};

const Universities = () => {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string>("turkey");
  const [degreeFilter, setDegreeFilter] = useState<string>("all");
  const [fieldFilter, setFieldFilter] = useState<string>("all");
  const [tuitionFilter, setTuitionFilter] = useState<string>("all");

  const currentCountryData = countryData[selectedCountry];

  // Filter programs based on selected filters
  const filteredPrograms = currentCountryData.programs.filter((program) => {
    if (degreeFilter !== "all" && program.degree !== degreeFilter) return false;
    if (fieldFilter !== "all" && program.field !== fieldFilter) return false;
    // Add tuition filter logic if needed
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
                <SelectItem value="PhD">PhD</SelectItem>
              </SelectContent>
            </Select>

            <Select value={fieldFilter} onValueChange={setFieldFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('universities.filterByField')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Medicine">Medicine</SelectItem>
                <SelectItem value="Social Sciences">Social Sciences</SelectItem>
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

              <div className="flex gap-2">
                <Button className="flex-1" size="sm" asChild>
                  <Link to={`/programs/${program.id}`}>{t('universities.viewProgram')}</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/apply">{t('universities.applyNow')}</Link>
                </Button>
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
