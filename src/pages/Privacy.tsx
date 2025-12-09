import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("privacy.sections.collection.title"),
      content: t("privacy.sections.collection.content"),
    },
    {
      title: t("privacy.sections.usage.title"),
      content: t("privacy.sections.usage.content"),
    },
    {
      title: t("privacy.sections.sharing.title"),
      content: t("privacy.sections.sharing.content"),
    },
    {
      title: t("privacy.sections.security.title"),
      content: t("privacy.sections.security.content"),
    },
    {
      title: t("privacy.sections.cookies.title"),
      content: t("privacy.sections.cookies.content"),
    },
    {
      title: t("privacy.sections.rights.title"),
      content: t("privacy.sections.rights.content"),
    },
    {
      title: t("privacy.sections.contact.title"),
      content: t("privacy.sections.contact.content"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("privacy.hero.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("privacy.hero.lastUpdated")}: December 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
              <p className="text-muted-foreground text-lg mb-8">
                {t("privacy.intro")}
              </p>

              {sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-3">
                    {index + 1}. {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
