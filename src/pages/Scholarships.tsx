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
import { Search, Award, MapPin, Calendar, DollarSign, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DeadlineCountdownBadge } from "@/components/scholarships/DeadlineCountdownBadge";
import { ExternalRedirectDialog } from "@/components/scholarships/ExternalRedirectDialog";
import { trackScholarshipEvent, isScholarshipInfoFresh } from "@/lib/scholarshipUtils";

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
    deadlineDate: "2026-02-20",
    lastUpdated: "2025-01-15",
    description: "Turkish government scholarship covering tuition, accommodation, health insurance, and monthly stipend.",
    logo: "🇹🇷",
    apply_url: "https://www.turkiyeburslari.gov.tr/",
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
    deadlineDate: "2026-03-31",
    lastUpdated: "2025-01-10",
    description: "Malaysian government scholarship for postgraduate studies at top Malaysian universities.",
    logo: "🇲🇾",
    apply_url: "https://biasiswa.mohe.gov.my/",
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
    deadlineDate: "2026-01-15",
    lastUpdated: "2024-12-01",
    description: "Prestigious scholarship at Qatar Foundation partner universities covering all expenses.",
    logo: "🇶🇦",
    apply_url: "https://www.qf.org.qa/education/scholarships",
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
    deadlineDate: "2025-12-31",
    lastUpdated: "2024-09-15",
    description: "Saudi government scholarship for international students at top universities worldwide.",
    logo: "🇸🇦",
    apply_url: "https://kasp.moe.gov.sa/",
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
    deadlineDate: "2025-11-07",
    lastUpdated: "2025-01-05",
    description: "UK government's prestigious scholarship program for future leaders and influencers.",
    logo: "🇬🇧",
    apply_url: "https://www.chevening.org/",
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
    deadlineDate: "2025-11-30",
    lastUpdated: "2025-01-12",
    description: "German government scholarships for international students and researchers.",
    logo: "🇩🇪",
    apply_url: "https://www.daad.de/en/",
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
    deadlineDate: "2025-10-15",
    lastUpdated: "2024-08-20",
    description: "Prestigious U.S. government scholarship for international graduate students.",
    logo: "🇺🇸",
    apply_url: "https://foreign.fulbrightonline.org/",
  },
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [degreeFilter, setDegreeFilter] = useState("all");
  const [coverageFilter, setCoverageFilter] = useState("all");
  const [deadlineFilter, setDeadlineFilter] = useState("all");
  const [redirectDialog, setRedirectDialog] = useState<{ open: boolean; scholarship: typeof scholarships[0] | null }>({
    open: false,
    scholarship: null,
  });
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
    
    let matchesDeadline = true;
    if (deadlineFilter !== "all") {
      const now = new Date();
      const deadline = new Date(scholarship.deadlineDate);
      const diffTime = deadline.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (deadlineFilter === "upcoming") matchesDeadline = diffDays > 0 && diffDays <= 30;
      else if (deadlineFilter === "thisMonth") {
        matchesDeadline = deadline.getMonth() === now.getMonth() && deadline.getFullYear() === now.getFullYear();
      }
      else if (deadlineFilter === "next3Months") matchesDeadline = diffDays > 0 && diffDays <= 90;
    }

    return matchesSearch && matchesCountry && matchesField && matchesDegree && matchesCoverage && matchesDeadline;
  });

  const handleApplyClick = (scholarship: typeof scholarships[0]) => {
    setRedirectDialog({ open: true, scholarship });
  };

  const handleViewDetails = (scholarshipId: string) => {
    trackScholarshipEvent('view', scholarshipId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
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

      <section className="container px-4 py-8">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t('scholarships.searchPlaceholder')}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

              <Select value={deadlineFilter} onValueChange={setDeadlineFilter}>
                <SelectTrigger>
                  <SelectValue placeholder={t('scholarships.filterDeadline')} />
                </SelectTrigger>
                <SelectContent className="z-50 bg-background">
                  <SelectItem value="all">{t('scholarships.deadlineFilter.all')}</SelectItem>
                  <SelectItem value="upcoming">{t('scholarships.deadlineFilter.upcoming')}</SelectItem>
                  <SelectItem value="thisMonth">{t('scholarships.deadlineFilter.thisMonth')}</SelectItem>
                  <SelectItem value="next3Months">{t('scholarships.deadlineFilter.next3Months')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <p className="text-sm text-muted-foreground mt-4">
          {filteredScholarships.length} {t('scholarships.results')}
        </p>
      </section>

      <section className="container px-4 pb-16">
        {filteredScholarships.length === 0 ? (
          <Card className="p-12 text-center">
            <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">{t('scholarships.noResultsTitle')}</h3>
            <p className="text-muted-foreground">{t('scholarships.noResultsSubtitle')}</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship) => {
              const isFresh = isScholarshipInfoFresh(scholarship.lastUpdated);
              
              return (
                <Card key={scholarship.id} className="p-6 hover:shadow-xl transition-all flex flex-col">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{scholarship.logo}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{scholarship.title}</h3>
                      <p className="text-sm text-muted-foreground">{scholarship.organization}</p>
                    </div>
                  </div>

                  {!isFresh && (
                    <Badge variant="secondary" className="mb-3 gap-1 w-fit">
                      <AlertTriangle className="h-3 w-3" />
                      {t('scholarships.infoOutdated')}
                    </Badge>
                  )}

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
                      <div className="flex-1 space-y-1">
                        <span className="text-sm block">{scholarship.deadline}</span>
                        <DeadlineCountdownBadge deadlineDate={scholarship.deadlineDate} />
                      </div>
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

                  <div className="flex gap-2 mt-auto">
                    <Button className="flex-1" size="sm" asChild onClick={() => handleViewDetails(scholarship.id)}>
                      <Link to={`/scholarships/${scholarship.id}`}>
                        {t('scholarships.viewDetails')}
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleApplyClick(scholarship)}>
                      {t('scholarships.apply')}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <Footer />

      {redirectDialog.scholarship && (
        <ExternalRedirectDialog
          open={redirectDialog.open}
          onOpenChange={(open) => setRedirectDialog({ open, scholarship: null })}
          scholarshipId={redirectDialog.scholarship.id}
          scholarshipTitle={redirectDialog.scholarship.title}
          applyUrl={redirectDialog.scholarship.apply_url}
        />
      )}
    </div>
  );
};

export default Scholarships;
