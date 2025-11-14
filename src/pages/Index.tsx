import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Search, Target, Shield, Clock, TrendingUp, GraduationCap, Award, Briefcase, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-20 md:py-32">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Search Card */}
          <Card className="max-w-4xl mx-auto p-6 md:p-8 bg-white shadow-2xl">
            <p className="text-foreground text-sm mb-4 font-medium">
              {t('hero.searchTitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t('hero.selectCountry')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t('hero.chooseDegree')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelor">Bachelor's</SelectItem>
                  <SelectItem value="master">Master's</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t('hero.selectField')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="computer-science">Computer Science</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="arts">Arts & Humanities</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-secondary hover:bg-secondary/90 text-lg font-semibold h-14"
              asChild
            >
              <Link to="/programs">
                <Search className="mr-2 h-5 w-5" />
                {t('hero.searchButton')}
              </Link>
            </Button>

            {/* Quick Access */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground text-center mb-4">{t('hero.quickAccess')}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link to="/programs">
                  <Button variant="outline" className="w-full flex flex-col h-auto py-4 gap-2">
                    <GraduationCap className="h-5 w-5" />
                    <span className="text-xs">Universities</span>
                  </Button>
                </Link>
                <Link to="/scholarships">
                  <Button variant="outline" className="w-full flex flex-col h-auto py-4 gap-2">
                    <Award className="h-5 w-5" />
                    <span className="text-xs">Scholarships</span>
                  </Button>
                </Link>
                <Link to="/careers">
                  <Button variant="outline" className="w-full flex flex-col h-auto py-4 gap-2">
                    <Briefcase className="h-5 w-5" />
                    <span className="text-xs">Careers</span>
                  </Button>
                </Link>
                <Button variant="outline" className="w-full flex flex-col h-auto py-4 gap-2">
                  <HeadphonesIcon className="h-5 w-5" />
                  <span className="text-xs">Support</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Why Choose StudyPath */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('whyChoose.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t('whyChoose.personalizedMatches')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('whyChoose.personalizedMatchesDesc')}
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t('whyChoose.trustedSupport')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('whyChoose.trustedSupportDesc')}
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t('whyChoose.timeSaving')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('whyChoose.timeSavingDesc')}
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{t('whyChoose.informedDecisions')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('whyChoose.informedDecisionsDesc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('howItWorks.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 relative">
              <div className="text-6xl font-bold text-primary/10 mb-4">01</div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                {t('howItWorks.step1')}
                <span className="text-primary">→</span>
              </h3>
              <p className="text-muted-foreground">
                {t('howItWorks.step1Desc')}
              </p>
            </Card>

            <Card className="p-8 relative">
              <div className="text-6xl font-bold text-primary/10 mb-4">02</div>
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                {t('howItWorks.step2')}
                <span className="text-primary">→</span>
              </h3>
              <p className="text-muted-foreground">
                {t('howItWorks.step2Desc')}
              </p>
            </Card>

            <Card className="p-8 relative">
              <div className="text-6xl font-bold text-primary/10 mb-4">03</div>
              <h3 className="text-xl font-semibold mb-3">
                {t('howItWorks.step3')}
              </h3>
              <p className="text-muted-foreground">
                {t('howItWorks.step3Desc')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <Card className="bg-gradient-to-br from-primary to-primary-dark text-white p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white"
              asChild
            >
              <Link to="/programs">{t('cta.button')}</Link>
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
