import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Menu } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

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
              {t('nav.findPrograms')}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/universities">{t('nav.universities')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/programs">{t('nav.findPrograms')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/scholarships">{t('nav.scholarships')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/careers">{t('nav.careers')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {t('nav.getSupport')}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>{t('nav.about')}</DropdownMenuItem>
              <DropdownMenuItem>{t('nav.contact')}</DropdownMenuItem>
              <DropdownMenuItem>{t('nav.blog')}</DropdownMenuItem>
              <DropdownMenuItem>{t('nav.faq')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-3">
          <LanguageSelector />

          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            {t('nav.login')}
          </Button>
          <Button size="sm" className="bg-secondary hover:bg-secondary/90">
            {t('nav.signup')}
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
            to="/universities"
            className="block py-2 text-sm font-medium hover:text-primary"
          >
            {t('nav.universities')}
          </Link>
          <Link
            to="/programs"
            className="block py-2 text-sm font-medium hover:text-primary"
          >
            {t('nav.findPrograms')}
          </Link>
          <Link
            to="/scholarships"
            className="block py-2 text-sm font-medium hover:text-primary"
          >
            {t('nav.scholarships')}
          </Link>
          <Link
            to="/careers"
            className="block py-2 text-sm font-medium hover:text-primary"
          >
            {t('nav.careers')}
          </Link>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            {t('nav.login')}
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
