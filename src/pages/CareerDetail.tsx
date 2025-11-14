import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  Briefcase,
  GraduationCap,
  Lightbulb,
  BookOpen,
  Building,
} from "lucide-react";

const CareerDetail = () => {
  const { id } = useParams();

  // Mock data - in production this would come from an API
  const career = {
    id: 1,
    title: "Software Engineer",
    salary: "$110,000 - $180,000",
    salaryByRegion: {
      "United States": "$110,000 - $180,000",
      "United Kingdom": "£50,000 - £90,000",
      "Germany": "€55,000 - €85,000",
      "Canada": "CAD $80,000 - CAD $130,000",
    },
    growth: "+22% (Much faster than average)",
    demand: "Very High",
    description:
      "Software engineers design, develop, test, and maintain software systems and applications. They work on everything from operating systems to mobile apps, using various programming languages and development tools.",
    overview: [
      "Design and develop software solutions for various platforms",
      "Write clean, efficient, and maintainable code",
      "Collaborate with cross-functional teams",
      "Debug and troubleshoot software issues",
      "Stay updated with emerging technologies",
    ],
    requiredSkills: [
      { skill: "Programming", level: "Expert" },
      { skill: "Problem Solving", level: "Expert" },
      { skill: "Git", level: "Advanced" },
      { skill: "Agile", level: "Intermediate" },
      { skill: "Teamwork", level: "Advanced" },
      { skill: "Communication", level: "Advanced" },
    ],
    education: [
      "Bachelor's degree in Computer Science or related field",
      "Strong foundation in algorithms and data structures",
      "Proficiency in multiple programming languages",
      "Understanding of software development methodologies",
      "Portfolio of personal or professional projects",
    ],
    outlook:
      "The demand for software engineers continues to grow rapidly as businesses increasingly rely on technology. Cloud computing, AI, and mobile development are particularly hot areas. Remote work opportunities are abundant, and career advancement paths include senior engineer, architect, or management roles.",
    careerPath: [
      { level: "Junior Software Engineer", years: "0-2 years", salary: "$70,000 - $90,000" },
      { level: "Software Engineer", years: "2-5 years", salary: "$90,000 - $130,000" },
      { level: "Senior Software Engineer", years: "5-8 years", salary: "$130,000 - $180,000" },
      { level: "Lead Engineer / Architect", years: "8+ years", salary: "$180,000 - $250,000+" },
    ],
    pros: [
      "High earning potential",
      "Remote work opportunities",
      "Continuous learning",
      "Creative problem-solving",
      "Strong job security",
      "Global opportunities",
    ],
    cons: [
      "Can be stressful with deadlines",
      "Long hours sometimes required",
      "Rapidly changing technology requires constant learning",
      "Sedentary work style",
    ],
    relatedFields: [
      "Computer Science",
      "Software Engineering",
      "Information Technology",
      "Computer Engineering",
    ],
    topUniversities: [
      { name: "Stanford University", location: "USA", program: "CS" },
      { name: "MIT", location: "USA", program: "CS & Engineering" },
      { name: "Carnegie Mellon University", location: "USA", program: "Software Engineering" },
      { name: "UC Berkeley", location: "USA", program: "EECS" },
      { name: "ETH Zurich", location: "Switzerland", program: "Computer Science" },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent via-accent to-primary text-white py-12">
        <div className="container px-4">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Careers
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur">
              <Briefcase className="h-10 w-10 text-white" />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{career.title}</h1>
              <p className="text-lg text-white/90 mb-6 leading-relaxed max-w-3xl">
                {career.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur text-base px-4 py-2">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {career.salary}
                </Badge>
                <Badge className="bg-success text-white border-success/30 text-base px-4 py-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {career.growth}
                </Badge>
                <Badge className="bg-white text-primary border-white/30 text-base px-4 py-2">
                  Demand: {career.demand}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Career Overview
              </h2>
              <ul className="space-y-3">
                {career.overview.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Required Skills */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                Required Skills
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {career.requiredSkills.map((item, idx) => (
                  <div key={idx} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{item.skill}</span>
                      <Badge variant="outline" className="text-xs">
                        {item.level}
                      </Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width:
                            item.level === "Expert"
                              ? "100%"
                              : item.level === "Advanced"
                              ? "75%"
                              : "50%",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education Path */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Education Requirements
              </h2>
              <ul className="space-y-3">
                {career.education.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Career Outlook */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                Career Outlook
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{career.outlook}</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-success flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Pros
                  </h3>
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
                  <h3 className="font-semibold mb-3 text-muted-foreground flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    Cons
                  </h3>
                  <ul className="space-y-2">
                    {career.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Career Path */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Career Progression Path</h2>
              <div className="space-y-4">
                {career.careerPath.map((level, idx) => (
                  <div key={idx} className="relative pl-8 pb-6 border-l-2 border-primary/20 last:border-l-0 last:pb-0">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold">{level.level}</h3>
                          <p className="text-sm text-muted-foreground">{level.years}</p>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {level.salary}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Salary by Region */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Salary by Region
              </h3>
              <div className="space-y-3">
                {Object.entries(career.salaryByRegion).map(([region, salary]) => (
                  <div key={region} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium text-sm">{region}</span>
                    <span className="text-sm font-bold text-primary">{salary}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Study Fields */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Related Study Fields</h3>
              <div className="flex flex-wrap gap-2">
                {career.relatedFields.map((field, idx) => (
                  <Badge key={idx} className="bg-secondary/10 text-secondary border-secondary/20">
                    {field}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Top Universities */}
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Top Universities for This Career
              </h3>
              <div className="space-y-3">
                {career.topUniversities.map((uni, idx) => (
                  <div key={idx} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <p className="font-semibold text-sm">{uni.name}</p>
                    <p className="text-xs text-muted-foreground">{uni.location} • {uni.program}</p>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline" asChild>
                <Link to="/programs">Browse Programs</Link>
              </Button>
            </Card>

            {/* CTA */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <h3 className="font-bold mb-3">Ready to Start This Career?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore universities and programs that can help you achieve your career goals.
              </p>
              <Button className="w-full" asChild>
                <Link to="/programs">Find Programs</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerDetail;
