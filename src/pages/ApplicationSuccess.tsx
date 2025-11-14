import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Clock, FileCheck, Building, ArrowRight } from "lucide-react";

const ApplicationSuccess = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [referenceNumber, setReferenceNumber] = useState("");
  const [programName, setProgramName] = useState("");
  const [universityName, setUniversityName] = useState("");

  useEffect(() => {
    setReferenceNumber(searchParams.get("ref") || "");
    setProgramName(searchParams.get("program") || "");
    setUniversityName(searchParams.get("university") || "");
  }, [searchParams]);

  const timelineSteps = [
    {
      status: "completed",
      icon: CheckCircle,
      title: t('applicationSuccess.submitted'),
      description: new Date().toLocaleDateString(),
      color: "text-success",
    },
    {
      status: "pending",
      icon: Clock,
      title: t('applicationSuccess.agencyReview'),
      description: "48 hours",
      color: "text-warning",
    },
    {
      status: "pending",
      icon: Building,
      title: t('applicationSuccess.universityDecision'),
      description: t('common.pending'),
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted py-12">
        <div className="container px-4 max-w-4xl mx-auto">
          {/* Success Header */}
          <Card className="p-8 mb-8 text-center bg-gradient-to-br from-success/10 to-primary/5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t('applicationSuccess.title')}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {t('applicationSuccess.thankYou')}
            </p>
            <div className="inline-flex items-center gap-2 bg-background px-4 py-2 rounded-lg">
              <FileCheck className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {t('applicationSuccess.referenceNumber')}:
              </span>
              <span className="font-mono font-bold">{referenceNumber}</span>
            </div>
          </Card>

          {/* Application Details */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{t('apply.programUniversity')}</h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">{t('programs.program')}:</span>
                <p className="font-medium">{programName}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">{t('programs.university')}:</span>
                <p className="font-medium">{universityName}</p>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">{t('applicationSuccess.timeline')}</h2>
            <div className="space-y-6">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 ${step.color}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === "completed" 
                        ? "bg-success/20" 
                        : "bg-muted"
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      {step.status === "completed" && (
                        <Badge variant="secondary" className="bg-success/20 text-success">
                          {t('common.completed')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute left-[1.25rem] top-[3rem] w-0.5 h-12 bg-border -z-10" />
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Next Steps Info */}
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <h3 className="font-semibold mb-2">{t('common.whatNext')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('applicationSuccess.nextStepsDescription')}
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('applicationSuccess.step1')}</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('applicationSuccess.step2')}</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{t('applicationSuccess.step3')}</span>
              </li>
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link to="/programs">
                {t('applicationSuccess.applyAnother')}
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">
                {t('nav.home')}
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApplicationSuccess;
