import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertTriangle,
  Award,
  Home,
  TrendingUp,
  BookOpen,
  Users,
  Building,
} from "lucide-react";

const ProgramDetail = () => {
  const { id } = useParams();

  // Mock data - in production this would come from an API
  const program = {
    id: 1,
    university: "Technical University of Munich",
    location: "Munich, Germany",
    country: "Germany",
    program: "BSc Mechanical Engineering",
    degree: "Bachelor's",
    field: "Engineering-Technology",
    description:
      "World-class mechanical engineering program with strong industry connections. Students gain hands-on experience through lab work, internships, and collaborative projects with leading engineering firms.",
    tuition: "No Tuition",
    tuitionDetails: "Public universities in Germany charge minimal semester fees (approximately €300-400)",
    applicationFee: "Contact university",
    duration: "4 years",
    intake: "Rolling admissions",
    intakeDates: [
      { season: "Winter Semester", applicationDeadline: "July 15, 2025", startDate: "October 2025" },
      { season: "Summer Semester", applicationDeadline: "January 15, 2026", startDate: "April 2026" },
    ],
    housingAvailable: true,
    housingCost: "€350-500/month",
    livingCost: "€850-1,200/month",
    visaFee: "€75",
    scholarshipAvailable: true,
    requirements: {
      gpa: "Minimum GPA of 3.5 on a 4.0 scale",
      english: "TOEFL iBT 90+ or IELTS 6.5+ (if program is in English) or German language proficiency (TestDaF 4x4 or DSH-2)",
      documents: [
        "High school diploma or equivalent (officially translated)",
        "Academic transcripts (officially translated)",
        "CV/Resume",
        "Statement of Purpose (500-1000 words)",
        "Two letters of recommendation from academic supervisors",
        "Copy of passport",
        "Proof of English/German language proficiency",
        "Portfolio of personal or professional projects (optional but recommended)",
      ],
    },
    overview: [
      "Design and develop software solutions for various platforms",
      "Write clean, efficient, and maintainable code",
      "Collaborate with cross-functional teams",
      "Debug and troubleshoot software issues",
      "Stay updated with emerging technologies",
    ],
    education: [
      "Strong foundation in algorithms and data structures",
      "Proficiency in multiple programming languages",
      "Understanding of software development methodologies",
      "Portfolio of personal or professional projects",
    ],
    outlook:
      "The demand for mechanical engineers continues to grow rapidly as industries increasingly rely on automation, robotics, AI, and mobile technologies. Cloud computing, AI, and mobile development are particularly hot areas. Remote work opportunities are abundant, and career advancement paths include senior engineer, architect, or management roles.",
    pros: [
      "High earning potential",
      "Remote work opportunities",
      "Continuous learning",
      "Creative problem-solving",
    ],
    cons: ["Can be stressful with deadlines", "Long hours sometimes required", "Rapidly changing technology"],
    ownerAgency: {
      name: "SAMI Education Consultancy",
      logo: "S",
      verified: true,
      responseTime: "Within 24 hours",
      slaCompliant: true,
    },
  };

  const daysUntilDeadline = 45; // Mock calculation

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-12">
        <div className="container px-4">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Programs
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{program.university}</h1>
              <p className="text-xl text-white/90 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {program.location}
              </p>

              <h2 className="text-2xl font-semibold mb-4">{program.program}</h2>

              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
                  {program.degree}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
                  {program.field}
                </Badge>
                {program.scholarshipAvailable && (
                  <Badge className="bg-secondary text-white border-secondary/30">
                    <Award className="h-3 w-3 mr-1" />
                    Scholarship Available
                  </Badge>
                )}
                <Badge className="bg-white text-primary border-white/30">Top University</Badge>
                <Badge className="bg-success/90 text-white border-success/30">No Tuition</Badge>
              </div>
            </div>

            <div className="lg:w-80">
              <Card className="p-6 bg-white">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground mb-1">Tuition Fee</p>
                  <p className="text-3xl font-bold text-primary">{program.tuition}</p>
                </div>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Application Fee</span>
                    <span className="font-semibold">{program.applicationFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Housing</span>
                    <span className="font-semibold">
                      {program.housingAvailable ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg" asChild>
                    <Link 
                      to={`/apply?programId=${program.id}&universityId=${program.country}&programName=${encodeURIComponent(program.program)}&universityName=${encodeURIComponent(program.university)}`}
                    >
                      Apply Now
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    Request Help
                  </Button>
                  <Button variant="ghost" className="w-full" size="sm">
                    Save Program
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Deadline Alert */}
      {daysUntilDeadline <= 30 && (
        <div className="container px-4 py-4">
          <Alert className="border-warning bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning-foreground">
              <strong>Deadline Alert:</strong> Application deadline is in {daysUntilDeadline} days
              (July 15, 2025). Apply soon to secure your spot!
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <section className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
                <TabsTrigger value="costs">Costs</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Program Description
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{program.description}</p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    What You'll Learn
                  </h3>
                  <ul className="space-y-3">
                    {program.overview.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Career Outlook
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{program.outlook}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-success flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Advantages
                      </h4>
                      <ul className="space-y-2">
                        {program.pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-muted-foreground flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Considerations
                      </h4>
                      <ul className="space-y-2">
                        {program.cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Eligibility Requirements
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Academic Requirements</h4>
                      <p className="text-muted-foreground">{program.requirements.gpa}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Language Proficiency</h4>
                      <p className="text-muted-foreground">{program.requirements.english}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Required Documents</h4>
                      <ul className="space-y-3">
                        {program.requirements.documents.map((doc, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                <Alert className="border-info bg-info/10">
                  <AlertDescription className="text-info-foreground">
                    <strong>Missing Documents?</strong> Our partner agencies can help you prepare all
                    required documents and ensure your application is complete.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="deadlines" className="space-y-6">
                {program.intakeDates.map((intake, idx) => (
                  <Card key={idx} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{intake.season}</h3>
                        <p className="text-sm text-muted-foreground">Starts {intake.startDate}</p>
                      </div>
                      <Badge variant="outline" className="text-lg px-4 py-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        {intake.startDate}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold">Application Opens</p>
                          <p className="text-sm text-muted-foreground">December 1, 2023</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border-l-4 border-l-destructive">
                        <div>
                          <p className="font-semibold text-destructive">Application Deadline</p>
                          <p className="text-sm text-muted-foreground">{intake.applicationDeadline}</p>
                        </div>
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-semibold">Shortlist Notification</p>
                          <p className="text-sm text-muted-foreground">April 30, 2024</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg border-l-4 border-l-success">
                        <div>
                          <p className="font-semibold text-success">Final Results</p>
                          <p className="text-sm text-muted-foreground">June 15, 2024</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="costs" className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Cost Breakdown
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-semibold">Tuition Fee (per year)</p>
                        <p className="text-sm text-muted-foreground">{program.tuitionDetails}</p>
                      </div>
                      <p className="text-2xl font-bold text-success">{program.tuition}</p>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-semibold">Application Fee</p>
                      <p className="text-lg font-semibold">{program.applicationFee}</p>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-semibold">Housing Cost (per month)</p>
                      <p className="text-lg font-semibold">{program.housingCost}</p>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-semibold">Living Cost (per month)</p>
                      <p className="text-lg font-semibold">{program.livingCost}</p>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-semibold">Visa Application Fee</p>
                      <p className="text-lg font-semibold">{program.visaFee}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-secondary/5 border-secondary/20">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-secondary" />
                    Scholarship Opportunities Available
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    This program qualifies for various scholarship opportunities that can help reduce or
                    eliminate tuition costs.
                  </p>
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10" asChild>
                    <Link to="/scholarships">Explore Scholarships</Link>
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Quick Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-muted-foreground">{program.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Intake</p>
                    <p className="text-muted-foreground">{program.intake}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Home className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Housing</p>
                    <p className="text-muted-foreground">
                      {program.housingAvailable ? "Available on campus" : "Off-campus only"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Admission Type</p>
                    <p className="text-muted-foreground">Rolling admissions</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Related Programs */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Related Programs</h3>
              <div className="space-y-3">
                <Link to="/programs/2" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <p className="font-semibold text-sm mb-1">MSc Computer Science</p>
                  <p className="text-xs text-muted-foreground">Stanford University</p>
                </Link>
                <Link to="/programs/3" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <p className="font-semibold text-sm mb-1">Bachelor of Engineering</p>
                  <p className="text-xs text-muted-foreground">University of Toronto</p>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProgramDetail;
