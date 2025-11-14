import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  AlertTriangle,
  Target,
  Clock,
  Users,
  BookOpen,
  ExternalLink,
} from "lucide-react";

const ScholarshipDetail = () => {
  const { id } = useParams();

  // Mock data - in production this would come from an API
  const scholarship = {
    id: 1,
    title: "Global Excellence Scholarship",
    organization: "International Education Foundation",
    country: "USA, UK, Canada, Australia",
    amount: "$25,000",
    coverage: "Full Coverage",
    degreeLevel: ["Bachelor's", "Master's"],
    field: "All Fields",
    applicationDeadline: "March 15, 2024",
    description:
      "A prestigious scholarship program designed to support outstanding international students pursuing higher education. This scholarship covers tuition fees, accommodation, and living expenses.",
    about:
      "The Global Excellence Scholarship is one of the most competitive international scholarship programs, attracting thousands of applicants from over 100 countries. The program aims to foster academic excellence, cultural exchange, and leadership development among future global leaders.",
    eligibility: [
      "Minimum GPA of 3.5 on a 4.0 scale",
      "Proof of English proficiency (TOEFL/IELTS)",
      "Letter of recommendation from academic supervisor",
      "Personal statement (500-1000 words)",
      "Copy of academic transcripts",
    ],
    applicationSteps: [
      {
        step: 1,
        title: "Complete online application form",
        description: "Fill out the comprehensive application form on the official website",
        deadline: null,
      },
      {
        step: 2,
        title: "Upload required documents",
        description: "Submit all required documents including transcripts, recommendation letters, and test scores",
        deadline: null,
      },
      {
        step: 3,
        title: "Submit personal statement",
        description: "Write and submit a compelling personal statement explaining your goals and motivation",
        deadline: null,
      },
      {
        step: 4,
        title: "Attend online interview (if shortlisted)",
        description: "Selected candidates will be invited for an online interview with the selection committee",
        deadline: "May 15, 2024",
      },
      {
        step: 5,
        title: "Await final decision notification",
        description: "Final results will be communicated via email",
        deadline: "June 15, 2024",
      },
    ],
    timeline: [
      { date: "December 1, 2023", event: "Application Opens", status: "completed" },
      { date: "March 15, 2024", event: "Application Deadline", status: "upcoming" },
      { date: "April 30, 2024", event: "Shortlist Notification", status: "future" },
      { date: "May 1-15, 2024", event: "Interviews", status: "future" },
      { date: "June 15, 2024", event: "Final Results", status: "future" },
    ],
    benefits: [
      "Full tuition coverage",
      "Monthly living stipend",
      "Health insurance",
      "Travel allowance",
      "Book and study materials allowance",
      "Networking opportunities with global scholars",
    ],
    requirements: {
      academic: "Minimum GPA of 3.5 on a 4.0 scale",
      language: "TOEFL iBT 90+ or IELTS 6.5+",
      experience: "Demonstrated leadership and community involvement",
    },
    daysUntilDeadline: 45,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white py-12">
        <div className="container px-4">
          <Link
            to="/scholarships"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Scholarships
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur">
              <Award className="h-10 w-10 text-white" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{scholarship.title}</h1>
              <p className="text-xl text-white/90 mb-4">{scholarship.organization}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
                  <MapPin className="h-3 w-3 mr-1" />
                  {scholarship.country}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur">
                  <Target className="h-3 w-3 mr-1" />
                  {scholarship.degreeLevel.join(", ")}
                </Badge>
                <Badge className="bg-white text-secondary border-white/30">
                  {scholarship.coverage}
                </Badge>
              </div>

              <p className="text-white/80 leading-relaxed">{scholarship.description}</p>
            </div>

            <div className="lg:w-80">
              <Card className="p-6 bg-white">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Scholarship Amount</p>
                  <p className="text-4xl font-bold text-secondary">{scholarship.amount}</p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border-l-4 border-l-destructive">
                    <span className="font-semibold">Application Deadline</span>
                    <span className="font-bold text-destructive">{scholarship.applicationDeadline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Coverage</span>
                    <span className="font-semibold">{scholarship.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Field</span>
                    <span className="font-semibold">{scholarship.field}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-secondary hover:bg-secondary/90" size="lg">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Users className="h-4 w-4 mr-2" />
                    Contact Counselor
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Deadline Alert */}
      {scholarship.daysUntilDeadline <= 60 && (
        <div className="container px-4 py-4">
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription>
              <strong>Urgent:</strong> Only {scholarship.daysUntilDeadline} days left to apply!
              Deadline: {scholarship.applicationDeadline}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <section className="container px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-secondary" />
                About This Scholarship
              </h2>
              <p className="text-muted-foreground leading-relaxed">{scholarship.about}</p>
            </Card>

            {/* Eligibility */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-secondary" />
                Eligibility Requirements
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Academic Requirements</h3>
                  <p className="text-muted-foreground mb-3">{scholarship.requirements.academic}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Language Proficiency</h3>
                  <p className="text-muted-foreground mb-3">{scholarship.requirements.language}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Additional Requirements</h3>
                  <p className="text-muted-foreground mb-3">{scholarship.requirements.experience}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Required Documents</h3>
                  <ul className="space-y-3">
                    {scholarship.eligibility.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* How to Apply */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-secondary" />
                How to Apply
              </h2>

              <div className="space-y-4">
                {scholarship.applicationSteps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary border-2 border-secondary/20">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1 pb-6 border-l-2 border-muted pl-6 -ml-5">
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      {step.deadline && (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {step.deadline}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Benefits */}
            <Card className="p-6 bg-secondary/5 border-secondary/20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-secondary" />
                Scholarship Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {scholarship.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card className="p-6">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Application Timeline
              </h3>

              <div className="space-y-4">
                {scholarship.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative ${
                      idx !== scholarship.timeline.length - 1 ? "pb-4 border-l-2 pl-6 ml-2" : "pl-6 ml-2"
                    } ${
                      item.status === "completed"
                        ? "border-success"
                        : item.status === "upcoming"
                        ? "border-destructive"
                        : "border-muted"
                    }`}
                  >
                    <div
                      className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 ${
                        item.status === "completed"
                          ? "bg-success border-success"
                          : item.status === "upcoming"
                          ? "bg-destructive border-destructive"
                          : "bg-muted border-muted"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-semibold">{item.event}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Quick Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Amount</p>
                    <p className="text-muted-foreground">{scholarship.amount}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Degree Level</p>
                    <p className="text-muted-foreground">{scholarship.degreeLevel.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Countries</p>
                    <p className="text-muted-foreground">{scholarship.country}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-secondary flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Field of Study</p>
                    <p className="text-muted-foreground">{scholarship.field}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Help CTA */}
            <Card className="p-6 bg-muted">
              <h3 className="font-bold mb-3">Need Help with Your Application?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our verified counselors can help you prepare a winning scholarship application.
              </p>
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Get Expert Help
              </Button>
            </Card>

            {/* Related Scholarships */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Similar Scholarships</h3>
              <div className="space-y-3">
                <Link to="/scholarships/2" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <p className="font-semibold text-sm mb-1">Chevening Scholarships</p>
                  <p className="text-xs text-muted-foreground">UK Government • Full Coverage</p>
                </Link>
                <Link to="/scholarships/3" className="block p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <p className="font-semibold text-sm mb-1">DAAD Scholarships</p>
                  <p className="text-xs text-muted-foreground">Germany • €934-1,200/month</p>
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

export default ScholarshipDetail;
