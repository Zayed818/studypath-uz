import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Search, Award, MapPin, Calendar, DollarSign, Target, Globe } from "lucide-react";

const mockScholarships = [
  {
    id: 1,
    title: "Fulbright Foreign Student Program",
    organization: "U.S. Department of State",
    country: "United States",
    amount: "Full tuition + living expenses",
    coverage: "Full Coverage",
    degreeLevel: "Master's & PhD",
    field: "All Fields",
    deadline: "October 15, 2025",
    description: "Prestigious scholarship for international students to pursue graduate studies in the US",
  },
  {
    id: 2,
    title: "Chevening Scholarships",
    organization: "UK Government",
    country: "United Kingdom",
    amount: "Full tuition + monthly stipend",
    coverage: "Full Coverage",
    degreeLevel: "Master's",
    field: "All Fields",
    deadline: "November 7, 2025",
    description: "UK government scholarship for future leaders and influencers",
  },
  {
    id: 3,
    title: "DAAD Scholarships",
    organization: "German Academic Exchange Service",
    country: "Germany",
    amount: "€934-1,200/month + tuition",
    coverage: "Full Coverage",
    degreeLevel: "Master's & PhD",
    field: "Various",
    deadline: "Various deadlines",
    description: "German government scholarships for international students",
  },
  {
    id: 4,
    title: "Australia Awards Scholarships",
    organization: "Australian Government",
    country: "Australia",
    amount: "Full tuition + living allowance",
    coverage: "Full Coverage",
    degreeLevel: "Bachelor's, Master's & PhD",
    field: "All Fields",
    deadline: "April 30, 2025",
    description: "Australian government scholarships for students from developing countries",
  },
  {
    id: 5,
    title: "Erasmus Mundus Joint Masters",
    organization: "European Union",
    country: "Europe (Multiple)",
    amount: "€1,400/month + tuition",
    coverage: "Partial to Full",
    degreeLevel: "Master's",
    field: "Various",
    deadline: "Various deadlines",
    description: "EU scholarship for international students to study in multiple European countries",
  },
  {
    id: 6,
    title: "Swiss Government Excellence Scholarships",
    organization: "Swiss Confederation",
    country: "Switzerland",
    amount: "CHF 1,920/month + fees",
    coverage: "Full Coverage",
    degreeLevel: "PhD & Postdoc",
    field: "All Fields",
    deadline: "December 15, 2025",
    description: "Swiss government scholarships for international researchers",
  },
];

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <section className="relative py-16 bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white">
        <div className="container px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Scholarship Hub</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Discover funding opportunities to make your education abroad affordable
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container px-4 py-8">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search scholarships by name, country, or field..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fields</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="science">Science</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Degrees</SelectItem>
                <SelectItem value="bachelor">Bachelor's</SelectItem>
                <SelectItem value="master">Master's</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Deadline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Deadline</SelectItem>
                <SelectItem value="soon">Due Soon</SelectItem>
                <SelectItem value="month">Within a Month</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Coverage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Coverage</SelectItem>
                <SelectItem value="full">Full Coverage</SelectItem>
                <SelectItem value="partial">Partial Coverage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-6 bg-secondary hover:bg-secondary/90" size="lg">
            Apply Filters
          </Button>
        </Card>

        <p className="text-sm text-muted-foreground mt-4">
          Showing <span className="font-semibold text-foreground">{mockScholarships.length}</span> scholarships
        </p>
      </section>

      {/* Scholarships Grid */}
      <section className="container px-4 pb-16">
        <div className="space-y-6">
          {mockScholarships.map((scholarship) => (
            <Card key={scholarship.id} className="p-6 hover:shadow-xl transition-all border-l-4 border-l-secondary">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">{scholarship.title}</h3>
                      <p className="text-sm text-muted-foreground">{scholarship.organization}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{scholarship.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Country
                      </p>
                      <p className="font-semibold text-sm">{scholarship.country}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        Degree Level
                      </p>
                      <p className="font-semibold text-sm">{scholarship.degreeLevel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Amount
                      </p>
                      <p className="font-semibold text-sm">{scholarship.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Deadline
                      </p>
                      <p className="font-semibold text-sm text-destructive">{scholarship.deadline}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                      {scholarship.coverage}
                    </Badge>
                    <Badge variant="outline">{scholarship.field}</Badge>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 md:w-48">
                  <Button className="flex-1 bg-secondary hover:bg-secondary/90" asChild>
                    <Link to={`/scholarships/${scholarship.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Get Help Applying
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Load More Scholarships
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-light py-16">
        <div className="container px-4 text-center">
          <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Need Help Preparing Your Application?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with our verified agencies who specialize in scholarship applications.
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary/90">
            Connect with an Agency
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Scholarships;
