import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, MessageCircle, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted border-t mt-20">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">StudyPath</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Find your perfect university abroad — Simple, Fast, Trusted.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@uniworld.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Uzbekistan</span>
              </div>
            </div>
          </div>

          {/* Find Programs */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Find Programs</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/programs" className="hover:text-primary transition-colors">
                  Universities
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-primary transition-colors">
                  Scholarships
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Terms & Social */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Terms</h3>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms
                </a>
              </li>
            </ul>
            
            <h3 className="font-semibold mb-4 text-foreground">Social Media</h3>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2025 StudyPath. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
