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
import { Search, Award, MapPin, Calendar, DollarSign, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const scholarships = [
  {
    id: "turkiye-burslari",
    title: "Türkiye Bursları",
    organization: "Turkish Government",
    country: "Turkey",
    amount: "Full tuition + ₺3,000-4,500/month",
    coverage: "Full Coverage",
    degreeLevel: ["Bachelor's", "Master's", "PhD"],
    field: "All Fields",
    deadline: "February 20, 2026",
    description: "Turkish government scholarship covering tuition, accommodation, health insurance, and monthly stipend.",
    logo: "🇹🇷",
  },
  {
    id: "malaysia-international",
    title: "Malaysia International Scholarship",
    organization: "Malaysian Government",
    country: "Malaysia",
    amount: "Full tuition + RM3,500/month",
    coverage: "Full Coverage",
    degreeLevel: ["Master's", "PhD"],
    field: "Science, Technology, Social Sciences",
    deadline: "March 31, 2026",
    description: "Malaysian government scholarship for postgraduate studies at top Malaysian universities.",
    logo: "🇲🇾",
  },
  {
    id: "qatar-foundation",
    title: "Qatar Foundation Scholarship",
    organization: "Qatar Foundation",
    country: "Qatar",
    amount: "Full tuition + living expenses",
    coverage: "Full Coverage",
    degreeLevel: ["Bachelor's", "Master's"],
    field: "All Fields",
    deadline: "January 15, 2026",
    description: "Prestigious scholarship at Qatar Foundation partner universities covering all expenses.",
    logo: "🇶🇦",
  },
  {
    id: "king-abdullah",
    title: "King Abdullah Scholarship",
    organization: "Saudi Ministry of Education",
    country: "Saudi Arabia",
    amount: "Full tuition + SR4,000-5,000/month",
    coverage: "Full Coverage",
    degreeLevel: ["Bachelor's", "Master's", "PhD"],
    field: "All Fields",
    deadline: "December 31, 2025",
    description: "Saudi government scholarship for international students at top universities worldwide.",
    logo: "🇸🇦",
  },
  {
    id: "chevening",
    title: "Chevening Scholarships",
    organization: "UK Government",
    country: "United Kingdom",
    amount: "Full tuition + £1,600/month",
    coverage: "Full Coverage",
    degreeLevel: ["Master's"],
    field: "All Fields",
    deadline: "November 7, 2025",
    description: "UK government's prestigious scholarship program for future leaders and influencers.",
    logo: "🇬🇧",
  },
  {
    id: "daad",
    title: "DAAD Scholarships",
    organization: "German Academic Exchange Service",
    country: "Germany",
    amount: "€934-1,200/month + tuition",
    coverage: "Full Coverage",
    degreeLevel: ["Master's", "PhD"],
    field: "Various",
    deadline: "Various (September-November 2025)",
    description: "German government scholarships for international students and researchers.",
    logo: "🇩🇪",
  },
  {
    id: "fulbright",
    title: "Fulbright Foreign Student Program",
    organization: "U.S. Department of State",
    country: "United States",
    amount: "Full tuition + living stipend",
    coverage: "Full Coverage",
    degreeLevel: ["Master's", "PhD"],
    field: "All Fields",
    deadline: "October 15, 2025",
    description: "Prestigious U.S. government scholarship for international graduate students.",
    logo: "🇺🇸",
  },
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [coverageFilter, setCoverageFilter] = useState("all");
  const { t } = useLanguage();

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCountry = countryFilter === "all" || scholarship.country.toLowerCase().includes(countryFilter.toLowerCase());
    const matchesField = fieldFilter === "all" || scholarship.field.toLowerCase().includes(fieldFilter.toLowerCase());
    const matchesDegree = degreeFilter === "all" || scholarship.degreeLevel.some(level => level.toLowerCase().includes(degreeFilter.toLowerCase()));
    const matchesCoverage = coverageFilter === "all" || scholarship.coverage.toLowerCase().includes(coverageFilter.toLowerCase());

    return matchesSearch && matchesCountry && matchesField && matchesDegree && matchesCoverage;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <section className="relative py-16 bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white">
        <div className="container px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('scholarships.pageTitle')}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {t('scholarships.pageDescription')}
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container px-4 py-8">
        <Card className="p-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t('scholarships.searchPlaceholder')}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('scholarships.filterCountry')} />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background">
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="turkey">Turkey</SelectItem>
                  <SelectItem value="malaysia">Malaysia</SelectItem>
                  <SelectItem value="qatar">Qatar</SelectItem>
                  <SelectItem value="saudi">Saudi Arabia</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                </SelectContent>
              </Select>

              <Select value={fieldFilter} onValueChange={setFieldFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('scholarships.filterField')} />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background">
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="all fields">All Fields</SelectItem>
                  <SelectItem value="science">Science & Technology</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="social">Social Sciences</SelectItem>
                </SelectContent>
              </Select>

              <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('scholarships.filterDegree')} />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background">
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="bachelor">Bachelor's</SelectItem>
                  <SelectItem value="master">Master's</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>

              <Select value={coverageFilter} onValueChange={setCoverageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('scholarships.filterCoverage')} />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background">
                  <SelectItem value="all">{t('common.all')}</SelectItem>
                  <SelectItem value="full">Full Coverage</SelectItem>
                  <SelectItem value="partial">Partial Coverage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <p className="text-sm text-muted-foreground mt-4">
          {t('scholarships.showing')} <span className="font-semibold text-foreground">{filteredScholarships.length}</span> {t('scholarships.results')}
        </p>
      </section>

      {/* Scholarships Grid */}
      <section className="container px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="p-6 hover:shadow-xl transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{scholarship.logo}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{scholarship.title}</h3>
                  <p className="text-sm text-muted-foreground">{scholarship.organization}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{scholarship.country}</span>
                </div>

                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-medium text-primary">{scholarship.amount}</span>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{scholarship.deadline}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{scholarship.coverage}</Badge>
                {scholarship.degreeLevel.map((level, index) => (
                  <Badge key={index} variant="outline">{level}</Badge>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {scholarship.description}
              </p>

              <div className="flex gap-2">
                <Button className="flex-1" size="sm" asChild>
                  <Link to={`/scholarships/${scholarship.id}`}>
                    {t('scholarships.viewDetails')}
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/apply">{t('scholarships.apply')}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <Card className="p-12 text-center">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search term
            </p>
          </Card>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Scholarships;
