import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ApplicationFormData } from "@/pages/Apply";
import { useLanguage } from "@/contexts/LanguageContext";

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  countryOfResidence?: string;
  city?: string;
}

interface PersonalDetailsStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
  validationErrors?: ValidationErrors;
}

const citiesByCountry: Record<string, string[]> = {
  uzbekistan: ["Tashkent", "Samarkand", "Bukhara", "Andijan", "Namangan"],
  kazakhstan: ["Almaty", "Nur-Sultan", "Shymkent", "Karaganda"],
  kyrgyzstan: ["Bishkek", "Osh", "Jalal-Abad", "Karakol"],
  tajikistan: ["Dushanbe", "Khujand", "Kulob", "Qurghonteppa"],
};

const PersonalDetailsStep = ({ formData, updateFormData, validationErrors = {} }: PersonalDetailsStepProps) => {
  const { t } = useLanguage();
  const availableCities = formData.countryOfResidence ? citiesByCountry[formData.countryOfResidence] || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('apply.personalDetails')}</h2>
        <p className="text-muted-foreground">{t('apply.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('apply.firstName')} *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className={validationErrors.firstName ? "border-destructive" : ""}
          />
          {validationErrors.firstName && <p className="text-xs text-destructive">{validationErrors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t('apply.lastName')} *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className={validationErrors.lastName ? "border-destructive" : ""}
          />
          {validationErrors.lastName && <p className="text-xs text-destructive">{validationErrors.lastName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">{t('apply.email')} *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className={validationErrors.email ? "border-destructive" : ""}
          />
          {validationErrors.email && <p className="text-xs text-destructive">{validationErrors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{t('apply.phone')} *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder="+998"
            className={validationErrors.phone ? "border-destructive" : ""}
          />
          {validationErrors.phone && <p className="text-xs text-destructive">{validationErrors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">{t('apply.countryOfResidence')} *</Label>
          <Select value={formData.countryOfResidence} onValueChange={(value) => updateFormData({ countryOfResidence: value, city: "" })}>
            <SelectTrigger id="country" className={`bg-background ${validationErrors.countryOfResidence ? "border-destructive" : ""}`}>
              <SelectValue placeholder={t('apply.selectCountry')} />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem value="uzbekistan">Uzbekistan</SelectItem>
              <SelectItem value="kazakhstan">Kazakhstan</SelectItem>
              <SelectItem value="kyrgyzstan">Kyrgyzstan</SelectItem>
              <SelectItem value="tajikistan">Tajikistan</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.countryOfResidence && <p className="text-xs text-destructive">{validationErrors.countryOfResidence}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">{t('apply.city')} *</Label>
          <Select value={formData.city} onValueChange={(value) => updateFormData({ city: value })} disabled={!formData.countryOfResidence}>
            <SelectTrigger id="city" className={`bg-background ${validationErrors.city ? "border-destructive" : ""}`}>
              <SelectValue placeholder={formData.countryOfResidence ? t('apply.selectCity') : t('apply.selectCountryFirst')} />
            </SelectTrigger>
            <SelectContent className="bg-background">
              {availableCities.map((city) => (
                <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.city && <p className="text-xs text-destructive">{validationErrors.city}</p>}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('apply.dateOfBirthOptional')}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-background", !formData.dateOfBirth && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>{t('apply.selectDate')}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background">
              <Calendar mode="single" selected={formData.dateOfBirth} onSelect={(date) => updateFormData({ dateOfBirth: date })} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} className="pointer-events-auto" />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>{t('apply.gender')}</Label>
          <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder={t('apply.selectGender')} />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem value="male">{t('apply.male')}</SelectItem>
              <SelectItem value="female">{t('apply.female')}</SelectItem>
              <SelectItem value="other">{t('apply.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsStep;
