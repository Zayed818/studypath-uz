import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Target, Globe, Award } from "lucide-react";

const About = () => {
  const { t } = useLanguage();

  const values = [
    {
      icon: Users,
      title: t("about.values.studentFirst.title"),
      description: t("about.values.studentFirst.description"),
    },
    {
      icon: Target,
      title: t("about.values.transparency.title"),
      description: t("about.values.transparency.description"),
    },
    {
      icon: Globe,
      title: t("about.values.global.title"),
      description: t("about.values.global.description"),
    },
    {
      icon: Award,
      title: t("about.values.quality.title"),
      description: t("about.values.quality.description"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                {t("about.hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t("about.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
                {t("about.mission.title")}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed text-center">
                {t("about.mission.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
              {t("about.values.title")}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 text-center shadow-sm border border-border"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">{t("about.stats.programs")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">{t("about.stats.countries")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">{t("about.stats.universities")}</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">{t("about.stats.students")}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
