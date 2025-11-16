import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Search, GraduationCap, MapPin, Calendar, Clock, Award, DollarSign, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const mockPrograms = [
  {
    id: 1,
    university: "Stanford University",
    location: "California, United States",
    program: "Master of Science in Computer Science",
    degree: "Master's",
    field: "Computer Science",
    tuition: "$22,100/year",
    applicationFee: "$90",
    duration: "2 years",
    intakes: [{ month: "sep", year: 2025 }],
    scholarshipAvailable: true,
    highDemand: true,
  },
  {
    id: 2,
    university: "University of Oxford",
    location: "Oxford, United Kingdom",
    program: "MBA - Business Administration",
    degree: "Master's",
    field: "Business",
    tuition: "£26,770/year",
    applicationFee: "£75",
    duration: "1 year",
    intakes: [{ month: "oct", year: 2025 }],
    scholarshipAvailable: false,
    highDemand: true,
  },
  {
    id: 3,
    university: "University of Toronto",
    location: "Toronto, Canada",
    program: "Bachelor of Engineering",
    degree: "Bachelor's",
    field: "Engineering",
    tuition: "CAD $58,160/year",
    applicationFee: "CAD $156",
    duration: "4 years",
    intakes: [{ month: "sep", year: 2025 }, { month: "jan", year: 2026 }],
    scholarshipAvailable: true,
    highDemand: false,
  },
  {
    id: 4,
    university: "ETH Zurich",
    location: "Zurich, Switzerland",
    program: "Master in Computer Science",
    degree: "Master's",
    field: "Computer Science",
    tuition: "CHF 1,460/year",
    applicationFee: "CHF 150",
    duration: "2 years",
    intakes: [{ month: "sep", year: 2025 }, { month: "feb", year: 2026 }],
    scholarshipAvailable: true,
    highDemand: true,
  },
  {
    id: 5,
    university: "University of Melbourne",
    location: "Melbourne, Australia",
    program: "Doctor of Medicine (MD)",
    degree: "Doctorate",
    field: "Medicine",
    tuition: "AUD $45,824/year",
    applicationFee: "AUD $100",
    duration: "4 years",
    intakes: [{ month: "feb", year: 2026 }],
    scholarshipAvailable: false,
    highDemand: true,
  },
  {
    id: 6,
    university: "National University of Singapore",
    location: "Singapore, Singapore",
    program: "Bachelor of Business Administration",
    degree: "Bachelor's",
    field: "Business",
    tuition: "SGD $29,850/year",
    applicationFee: "SGD $20",
    duration: "3 years",
    intakes: [{ month: "aug", year: 2025 }],
    scholarshipAvailable: true,
    highDemand: false,
  },
  {
    id: 7,
    university: "MIT",
    location: "Massachusetts, United States",
    program: "Master of Engineering in AI",
    degree: "Master's",
    field: "Computer Science",
    tuition: "$29,750/year",
    applicationFee: "$95",
    duration: "2 years",
    intakes: [{ month: "sep", year: 2025 }],
    scholarshipAvailable: true,
    highDemand: true,
  },
  {
    id: 8,
    university: "University of Cambridge",
    location: "Cambridge, United Kingdom",
    program: "BA Economics",
    degree: "Bachelor's",
    field: "Economics",
    tuition: "£22,227/year",
    applicationFee: "£75",
    duration: "3 years",
    intakes: [{ month: "oct", year: 2025 }],
    scholarshipAvailable: false,
    highDemand: true,
  },
  {
    id: 9,
    university: "University of British Columbia",
    location: "Vancouver, Canada",
    program: "Master of Data Science",
    degree: "Master's",
    field: "Data Science",
    tuition: "CAD $42,000/year",
    applicationFee: "CAD $125",
    duration: "10 months",
    intakes: [{ month: "sep", year: 2025 }, { month: "jan", year: 2026 }],
    scholarshipAvailable: true,
    highDemand: true,
  },
];

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <section className="bg-muted py-12">
        <div className="container px-4">
          <h1 className="text-4xl font-bold mb-4">{t('programs.pageTitle')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('programs.pageDescription')}
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container px-4 py-8">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('programs.searchPlaceholder')}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('programs.studyLevel')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="bachelor">Bachelor's</SelectItem>
                <SelectItem value="master">Master's</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('programs.fieldOfStudy')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('programs.country')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('programs.tuitionRange')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('common.all')}</SelectItem>
                <SelectItem value="low">Under $10,000</SelectItem>
                <SelectItem value="medium">$10,000 - $30,000</SelectItem>
                <SelectItem value="high">$30,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <p className="text-sm text-muted-foreground mt-4">
          {t('programs.showing')} <span className="font-semibold text-foreground">{mockPrograms.length}</span> {t('programs.programs')}
        </p>
      </section>

      {/* Programs Grid */}
      <section className="container px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockPrograms.map((program) => (
            <Card key={program.id} className="p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{program.university}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {program.location}
                  </p>
                </div>
              </div>

              <h4 className="font-medium mb-3">{program.program}</h4>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{program.degree}</Badge>
                <Badge variant="outline">{program.field}</Badge>
                {program.scholarshipAvailable && (
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                    <Award className="h-3 w-3 mr-1" />
                    {t('programs.scholarshipAvailable')}
                  </Badge>
                )}
                {program.highDemand && (
                  <Badge variant="outline" className="border-info/50 text-info">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {t('programs.highDemand')}
                  </Badge>
                )}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('programDetail.tuitionFee')}</span>
                  <span className="font-semibold">{program.tuition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('programDetail.applicationFee')}</span>
                  <span className="font-semibold">{program.applicationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('programDetail.duration')}</span>
                  <span className="font-semibold">{program.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t('programDetail.intake')}</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {program.intakes.map((intake, idx) => (
                      <span key={idx}>
                        {t(`months.${intake.month}`)} {intake.year}
                        {idx < program.intakes.length - 1 && ', '}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm" asChild>
                  <Link to={`/programs/${program.id}`}>{t('programs.viewDetails')}</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/apply?programId=${program.id}&universityName=${encodeURIComponent(program.university)}&programName=${encodeURIComponent(program.program)}&universityId=${program.id}`}>
                    {t('programs.apply')}
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button variant="outline" size="sm" disabled>
            ← {t('common.previous')}
          </Button>
          <Button variant="default" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            {t('common.next')} →
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;
