import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Globe, Menu } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">StudyPath</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Find Programs
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/programs">Universities</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/scholarships">Scholarships</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/careers">Careers</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Get Support
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>About</DropdownMenuItem>
              <DropdownMenuItem>Contact</DropdownMenuItem>
              <DropdownMenuItem>Blog</DropdownMenuItem>
              <DropdownMenuItem>FAQ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">English</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>O'zbekcha (Uzbek)</DropdownMenuItem>
              <DropdownMenuItem>Русский (Russian)</DropdownMenuItem>
              <DropdownMenuItem>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            Log In
          </Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90">
            Sign Up
          </Button>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-2">
          <Link
            to="/programs"
            className="block py-2 text-sm font-medium hover:text-primary"
          >
            Universities
          </Link>
          <Link
            to="/scholarships"
            className="block py-2 text-sm font-medium hover:text-primary"
          >
            Scholarships
          </Link>
          <Link
            to="/careers"
            className="block py-2 text-sm font-medium hover:text-primary"
          >
            Careers
          </Link>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            Log In
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
