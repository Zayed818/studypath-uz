import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { 
  TrendingUp, CheckCircle, XCircle, Search, Lightbulb, 
  ArrowLeft, ArrowRight, RotateCcw, Sparkles, Target,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { quizQuestions, careers, hollandTypes, HollandCode } from "@/lib/careerQuizData";
import { 
  calculateHollandScores, 
  getTopCareerMatches, 
  getPersonalityProfile,
  getChartData,
  CareerMatch
} from "@/lib/careerQuizLogic";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const Careers = () => {
  const [activeTab, setActiveTab] = useState<"search" | "quiz">("search");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language } = useLanguage();

  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const allQuestionsAnswered = Object.keys(quizAnswers).length === totalQuestions;

  // Calculate results
  const hollandScores = useMemo(() => 
    calculateHollandScores(quizAnswers, quizQuestions), 
    [quizAnswers]
  );
  
  const topCareerMatches = useMemo(() => 
    getTopCareerMatches(hollandScores, 6), 
    [hollandScores]
  );
  
  const personalityProfile = useMemo(() => 
    getPersonalityProfile(hollandScores, language as 'en' | 'uz' | 'ru'), 
    [hollandScores, language]
  );

  const chartData = useMemo(() => 
    getChartData(hollandScores, language as 'en' | 'uz' | 'ru'),
    [hollandScores, language]
  );

  const chartConfig: ChartConfig = {
    score: {
      label: t('careers.quiz.score'),
    },
  };

  // Filter careers for search
  const filteredCareers = useMemo(() => {
    if (!searchQuery.trim()) return careers;
    const query = searchQuery.toLowerCase();
    return careers.filter(career => {
      const title = language === 'uz' ? career.titleUz : language === 'ru' ? career.titleRu : career.title;
      const description = language === 'uz' ? career.descriptionUz : language === 'ru' ? career.descriptionRu : career.description;
      return title.toLowerCase().includes(query) || 
             description.toLowerCase().includes(query) ||
             career.skills.some(skill => skill.toLowerCase().includes(query)) ||
             career.relatedFields.some(field => field.toLowerCase().includes(query));
    });
  }, [searchQuery, language]);

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const getCareerTitle = (career: CareerMatch | typeof careers[0]) => {
    return language === 'uz' ? career.titleUz : language === 'ru' ? career.titleRu : career.title;
  };

  const getCareerDescription = (career: CareerMatch | typeof careers[0]) => {
    return language === 'uz' ? career.descriptionUz : language === 'ru' ? career.descriptionRu : career.description;
  };

  const getCareerPros = (career: CareerMatch | typeof careers[0]) => {
    return language === 'uz' ? career.prosUz : language === 'ru' ? career.prosRu : career.pros;
  };

  const getCareerCons = (career: CareerMatch | typeof careers[0]) => {
    return language === 'uz' ? career.consUz : language === 'ru' ? career.consRu : career.cons;
  };

  const getMatchReason = (career: CareerMatch) => {
    return language === 'uz' ? career.matchReasonUz : language === 'ru' ? career.matchReasonRu : career.matchReason;
  };

  const currentQ = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="relative py-16 bg-gradient-to-br from-accent via-accent to-primary text-white">
        <div className="container px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('careers.title')}</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {t('careers.subtitle')}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('careers.searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
            </Card>

            {/* Results count */}
            <p className="text-muted-foreground mb-6">
              {filteredCareers.length} {t('careers.results')}
            </p>

            {/* Careers Grid */}
            <div className="space-y-6">
              {filteredCareers.map((career) => {
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
                            <h3 className="font-bold text-xl mb-2">{getCareerTitle(career)}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{getCareerDescription(career)}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                                {career.salary}
                              </Badge>
                              <Badge variant="outline" className="border-green-500/50 text-green-600">
                                {career.growth}
                              </Badge>
                              <Badge variant="secondary">
                                {t('careers.demand')}: {career.demand === 'Very High' ? t('careers.demandVeryHigh') : 
                                  career.demand === 'High' ? t('careers.demandHigh') : t('careers.demandModerate')}
                              </Badge>
                              <Badge variant="outline" className="font-mono">
                                {career.hollandCode}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Pros & Cons */}
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-green-600 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              {t('careers.pros')}
                            </h4>
                            <ul className="space-y-2">
                              {getCareerPros(career).slice(0, 3).map((pro, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
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
                              {getCareerCons(career).slice(0, 2).map((con, idx) => (
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
          <div className="max-w-4xl mx-auto">
            {!showResults ? (
              <Card className="p-8">
                {/* Quiz Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <span className="font-semibold">{t('careers.quiz.title')}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {t('careers.question')} {currentQuestion + 1} / {totalQuestions}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Current Question */}
                <div className="space-y-6">
                  <h3 className="font-bold text-xl md:text-2xl">
                    {language === 'uz' ? currentQ.questionUz : 
                     language === 'ru' ? currentQ.questionRu : currentQ.question}
                  </h3>

                  <div className="space-y-3">
                    {currentQ.options.map((option, idx) => {
                      const isSelected = quizAnswers[currentQ.id] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(currentQ.id, idx)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            isSelected 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50 hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-primary' : 'border-muted-foreground'
                            }`}>
                              {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                            </div>
                            <span className={isSelected ? 'font-medium' : ''}>
                              {language === 'uz' ? option.textUz : 
                               language === 'ru' ? option.textRu : option.text}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t('careers.previous')}
                  </Button>

                  {currentQuestion < totalQuestions - 1 ? (
                    <Button
                      onClick={goToNextQuestion}
                      disabled={quizAnswers[currentQ.id] === undefined}
                    >
                      {t('careers.next')}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={!allQuestionsAnswered}
                      className="bg-secondary hover:bg-secondary/90"
                    >
                      {t('careers.seeResults')}
                      <Target className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              /* Results Section */
              <div className="space-y-8">
                {/* Results Header */}
                <Card className="p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {t('careers.quiz.resultsTitle')}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {t('careers.quiz.resultsSubtitle')}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold">{t('careers.quiz.yourType')}:</span>
                    <Badge className="text-lg px-3 py-1 font-mono bg-primary text-primary-foreground">
                      {personalityProfile.map(p => p.code).join('')}
                    </Badge>
                  </div>
                </Card>

                {/* Personality Profile */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {t('careers.quiz.personalityProfile')}
                  </h3>
                  
                  {/* Chart */}
                  <div className="h-64 mb-6">
                    <ChartContainer config={chartConfig}>
                      <BarChart data={chartData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={100}
                          tick={{ fontSize: 12 }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </div>

                  {/* Top 3 Types */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {personalityProfile.map((profile, idx) => (
                      <div 
                        key={profile.code}
                        className={`p-4 rounded-lg border-2 ${
                          idx === 0 ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant={idx === 0 ? 'default' : 'outline'}
                            className="font-mono"
                          >
                            {profile.code}
                          </Badge>
                          <span className="font-semibold">{profile.name}</span>
                          {idx === 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {t('careers.quiz.primary')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {profile.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {profile.traits.slice(0, 3).map((trait, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Career Matches */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    {t('careers.recommendedCareers')}
                  </h3>
                  
                  <div className="space-y-4">
                    {topCareerMatches.map((career, idx) => {
                      const Icon = career.icon;
                      return (
                        <div 
                          key={career.id}
                          className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                            idx === 0 ? 'border-primary bg-primary/5' : 'border-border'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-bold text-lg">{getCareerTitle(career)}</h4>
                                <Badge 
                                  className={`flex-shrink-0 ${
                                    career.matchPercentage >= 70 
                                      ? 'bg-green-500 text-white' 
                                      : career.matchPercentage >= 50 
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-muted'
                                  }`}
                                >
                                  {career.matchPercentage}% {t('careers.quiz.match')}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {getCareerDescription(career)}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs font-mono">
                                  {career.hollandCode}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {getMatchReason(career)}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  {career.salary}
                                </Badge>
                                <Badge variant="outline" className="text-xs border-green-500/50 text-green-600">
                                  {career.demand === 'Very High' ? t('careers.demandVeryHigh') : 
                                   career.demand === 'High' ? t('careers.demandHigh') : t('careers.demandModerate')}
                                </Badge>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" asChild className="flex-shrink-0">
                              <Link to={`/careers/${career.id}`}>
                                <ChevronRight className="h-5 w-5" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1" onClick={resetQuiz}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t('careers.quiz.retake')}
                  </Button>
                  <Button className="flex-1 bg-secondary hover:bg-secondary/90" asChild>
                    <Link to="/programs">{t('careers.explorePrograms')}</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
