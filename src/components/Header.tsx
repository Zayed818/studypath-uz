import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, signOut } = useAuth();
  const { isAgency } = useUserRole();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-3 md:px-4">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          <span className="text-lg md:text-xl font-bold text-primary">StudyPath</span>
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
              <DropdownMenuItem asChild>
                <Link to="/about">{t('nav.about')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">{t('nav.contact')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/faq">{t('nav.faq')}</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-2 md:space-x-3">
          <LanguageSelector />

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  {isAgency && (
                    <DropdownMenuItem onClick={() => navigate('/agency')}>
                      {t('agencyDashboard.title')}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => navigate('/my-applications')}>
                    My Applications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/saved-programs')}>
                    {t('savedPrograms.title')}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={async () => {
                    await signOut();
                    navigate('/auth');
                  }}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden md:inline-flex"
                onClick={() => navigate('/auth')}
              >
                {t('nav.login')}
              </Button>
              <Button 
                size="sm" 
                className="bg-secondary hover:bg-secondary/90 text-sm md:text-base px-3 md:px-4"
                onClick={() => navigate('/auth')}
              >
                {t('nav.signup')}
              </Button>
            </>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden px-2"
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
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/profile')}
              >
                Profile
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => navigate('/my-applications')}
              >
                My Applications
              </Button>
              {isAgency && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={() => navigate('/agency')}
                >
                  {t('agencyDashboard.title')}
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start"
                onClick={async () => {
                  await signOut();
                  navigate('/auth');
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => navigate('/auth')}
            >
              {t('nav.login')}
            </Button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
