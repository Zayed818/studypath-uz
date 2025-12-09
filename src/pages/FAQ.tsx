import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const FAQ = () => {
  const { t } = useLanguage();

  const faqCategories = [
    {
      title: t("faq.categories.general.title"),
      questions: [
        {
          q: t("faq.categories.general.q1"),
          a: t("faq.categories.general.a1"),
        },
        {
          q: t("faq.categories.general.q2"),
          a: t("faq.categories.general.a2"),
        },
        {
          q: t("faq.categories.general.q3"),
          a: t("faq.categories.general.a3"),
        },
      ],
    },
    {
      title: t("faq.categories.applications.title"),
      questions: [
        {
          q: t("faq.categories.applications.q1"),
          a: t("faq.categories.applications.a1"),
        },
        {
          q: t("faq.categories.applications.q2"),
          a: t("faq.categories.applications.a2"),
        },
        {
          q: t("faq.categories.applications.q3"),
          a: t("faq.categories.applications.a3"),
        },
      ],
    },
    {
      title: t("faq.categories.scholarships.title"),
      questions: [
        {
          q: t("faq.categories.scholarships.q1"),
          a: t("faq.categories.scholarships.a1"),
        },
        {
          q: t("faq.categories.scholarships.q2"),
          a: t("faq.categories.scholarships.a2"),
        },
      ],
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
                {t("faq.hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground">
                {t("faq.hero.subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-10">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-3">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`${categoryIndex}-${index}`}
                        className="bg-card border border-border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-left text-foreground hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("faq.cta.title")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t("faq.cta.subtitle")}
              </p>
              <Link to="/contact">
                <Button size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t("faq.cta.button")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
