import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { TrendingUp, CheckCircle, XCircle, Code, Database, Users, Search, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const mockCareers = [
  {
    id: 1,
    title: "Software Engineer",
    salary: "$110,000 - $180,000",
    growth: "+22% (Much faster than average)",
    demand: "Very High",
    icon: Code,
    pros: ["High salary", "Remote work options", "Creative problem-solving", "Continuous learning"],
    cons: ["Long hours sometimes", "Continuous learning required"],
    skills: ["Programming", "Problem Solving", "Git", "Agile", "Teamwork", "Communication"],
    relatedFields: ["Computer Science", "Software Engineering", "Information Technology"],
    topUniversities: ["Stanford", "MIT", "Carnegie Mellon"],
  },
  {
    id: 2,
    title: "Data Scientist",
    salary: "$95,000 - $150,000",
    growth: "+22% (Much faster than average)",
    demand: "Very High",
    icon: Database,
    pros: ["High demand", "Diverse industries", "Impact on business decisions"],
    cons: ["Requires strong math skills", "Data cleaning can be tedious"],
    skills: ["Statistics", "Python/R", "Machine Learning", "Data Visualization"],
    relatedFields: ["Data Science", "Statistics", "Computer Science"],
    topUniversities: ["UC Berkeley", "Stanford", "Harvard"],
  },
  {
    id: 3,
    title: "Product Manager",
    salary: "$100,000 - $180,000",
    growth: "+7% (High)",
    demand: "High",
    icon: Users,
    pros: ["Strategic role", "Good compensation", "Cross-functional work"],
    cons: ["High pressure", "Balancing stakeholders"],
    skills: ["Leadership", "Communication", "Strategy", "Technical understanding"],
    relatedFields: ["Business Administration", "Computer Science", "Engineering"],
    topUniversities: ["Harvard Business School", "Stanford GSB", "Wharton"],
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What type of work environment do you prefer?",
    options: [
      "Office setting with team collaboration",
      "Remote/flexible work from anywhere",
      "Hands-on work in labs or field",
      "Client-facing and people-oriented",
    ],
  },
  {
    id: 2,
    question: "Which skills do you enjoy using most?",
    options: [
      "Analytical thinking and problem solving",
      "Creative design and innovation",
      "Communication and persuasion",
      "Helping and teaching others",
    ],
  },
  {
    id: 3,
    question: "What motivates you most in a career?",
    options: [
      "High salary and financial security",
      "Making a positive impact on society",
      "Continuous learning and growth",
      "Work-life balance and flexibility",
    ],
  },
];

const Careers = () => {
  const [activeTab, setActiveTab] = useState<"search" | "quiz">("search");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleQuizSubmit = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <section className="relative py-16 bg-gradient-to-br from-accent via-accent to-primary text-white">
        <div className="container px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Career Advisor</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Explore careers and discover the education path to reach your goals
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="container px-4 py-8">
        <div className="flex gap-4 border-b mb-8">
          <button
            onClick={() => setActiveTab("search")}
            className={`pb-4 px-6 font-semibold transition-colors relative ${
              activeTab === "search"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t('careers.searchTab')}
          </button>
          <button
            onClick={() => setActiveTab("quiz")}
            className={`pb-4 px-6 font-semibold transition-colors relative ${
              activeTab === "quiz"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t('careers.quizTab')}
          </button>
        </div>

        {activeTab === "search" && (
          <div>
            {/* Search Bar */}
            <Card className="p-6 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for any career (e.g., Software Engineer, Doctor, Teacher)..."
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </Card>

            {/* Careers Grid */}
            <div className="space-y-6">
              {mockCareers.map((career) => {
                const Icon = career.icon;
                return (
                  <Card key={career.id} className="p-6 hover:shadow-xl transition-all">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left: Basic Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-2">{career.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                                {career.salary}
                              </Badge>
                              <Badge variant="outline" className="border-success/50 text-success">
                                {career.growth}
                              </Badge>
                              <Badge variant="secondary">{t('careers.demand')}: {career.demand}</Badge>
                            </div>
                          </div>
                        </div>

                        {/* Pros & Cons */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-success flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              {t('careers.pros')}
                            </h4>
                            <ul className="space-y-2">
                              {career.pros.map((pro, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-destructive flex items-center gap-2">
                              <XCircle className="h-4 w-4" />
                              {t('careers.cons')}
                            </h4>
                            <ul className="space-y-2">
                              {career.cons.map((con, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Required Skills */}
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            {t('careers.skills')}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {career.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Related Fields */}
                        <div className="mb-4">
                          <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">
                            {t('careers.relatedFields')}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {career.relatedFields.map((field, idx) => (
                              <Badge key={idx} className="bg-secondary/10 text-secondary border-secondary/20">
                                {field}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Top Universities */}
                        <div>
                          <h4 className="font-semibold mb-2 text-sm uppercase text-muted-foreground">
                            {t('careers.topUniversities')}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {career.topUniversities.map((uni, idx) => (
                              <span key={idx} className="text-sm font-medium">
                                {uni}
                                {idx < career.topUniversities.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: CTA */}
                      <div className="md:w-64 flex flex-col gap-3">
                        <Button className="w-full" asChild>
                          <Link to={`/careers/${career.id}`}>{t('careers.learnMore')}</Link>
                        </Button>
                        <Button variant="outline" className="w-full bg-secondary/5 hover:bg-secondary/10" asChild>
                          <Link to="/programs">{t('careers.explorePrograms')}</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Career Personality Quiz</h2>
                <p className="text-muted-foreground">
                  Answer these questions to discover careers that match your interests and personality
                </p>
              </div>

              {!showResults ? (
                <div className="space-y-8">
                  {quizQuestions.map((q, idx) => (
                    <div key={q.id} className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        {idx + 1}. {q.question}
                      </h3>
                      <RadioGroup
                        value={quizAnswers[q.id]}
                        onValueChange={(value) =>
                          setQuizAnswers({ ...quizAnswers, [q.id]: value })
                        }
                      >
                        {q.options.map((option, optIdx) => (
                          <div key={optIdx} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                            <RadioGroupItem value={option} id={`q${q.id}-${optIdx}`} />
                            <Label htmlFor={`q${q.id}-${optIdx}`} className="flex-1 cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}

                  <Button
                    size="lg"
                    className="w-full bg-secondary hover:bg-secondary/90"
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  >
                    Get My Career Recommendations
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Your Top Career Matches</h3>
                    <p className="text-muted-foreground">
                      Based on your answers, here are careers that match your profile
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {mockCareers.slice(0, 3).map((career, idx) => {
                      const Icon = career.icon;
                      return (
                        <Card key={career.id} className="p-6 border-l-4 border-l-primary">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-bold text-lg">{career.title}</h4>
                                <Badge className="bg-primary/10 text-primary border-primary/20">
                                  {90 - idx * 5}% Match
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{career.salary}</p>
                              <Button size="sm" variant="outline" asChild>
                                <Link to={`/careers/${career.id}`}>View Full Details</Link>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowResults(false);
                        setQuizAnswers({});
                      }}
                    >
                      Retake Quiz
                    </Button>
                    <Button className="flex-1 bg-secondary hover:bg-secondary/90" asChild>
                      <Link to="/programs">Explore Related Programs</Link>
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
