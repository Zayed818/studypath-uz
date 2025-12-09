import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, MessageCircle, Instagram, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

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
              {t('footer.tagline')}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@studypath.uz</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+998 (71) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Tashkent, Uzbekistan</span>
              </div>
            </div>
          </div>

          {/* Find Programs */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">{t('footer.programs')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/programs" className="hover:text-primary transition-colors">
                  {t('footer.universities')}
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-primary transition-colors">
                  {t('footer.scholarships')}
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary transition-colors">
                  {t('footer.careers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">{t('footer.about')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  {t('nav.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms & Social */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
            
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
          <p>© 2025 StudyPath. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
