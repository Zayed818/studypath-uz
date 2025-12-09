import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("terms.sections.acceptance.title"),
      content: t("terms.sections.acceptance.content"),
    },
    {
      title: t("terms.sections.services.title"),
      content: t("terms.sections.services.content"),
    },
    {
      title: t("terms.sections.accounts.title"),
      content: t("terms.sections.accounts.content"),
    },
    {
      title: t("terms.sections.userConduct.title"),
      content: t("terms.sections.userConduct.content"),
    },
    {
      title: t("terms.sections.intellectual.title"),
      content: t("terms.sections.intellectual.content"),
    },
    {
      title: t("terms.sections.disclaimer.title"),
      content: t("terms.sections.disclaimer.content"),
    },
    {
      title: t("terms.sections.limitation.title"),
      content: t("terms.sections.limitation.content"),
    },
    {
      title: t("terms.sections.changes.title"),
      content: t("terms.sections.changes.content"),
    },
    {
      title: t("terms.sections.contact.title"),
      content: t("terms.sections.contact.content"),
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
                {t("terms.hero.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("terms.hero.lastUpdated")}: December 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
              <p className="text-muted-foreground text-lg mb-8">
                {t("terms.intro")}
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

export default Terms;
