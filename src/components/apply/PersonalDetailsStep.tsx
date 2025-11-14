import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ApplicationFormData } from "@/pages/Apply";
import { useLanguage } from "@/contexts/LanguageContext";

interface PersonalDetailsStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

// City data by country
const citiesByCountry: Record<string, string[]> = {
  uzbekistan: ["Tashkent", "Samarkand", "Bukhara", "Andijan", "Namangan", "Fergana", "Nukus", "Karshi", "Termez"],
  kazakhstan: ["Almaty", "Nur-Sultan", "Shymkent", "Aktobe", "Karaganda", "Taraz", "Pavlodar", "Oskemen"],
  kyrgyzstan: ["Bishkek", "Osh", "Jalal-Abad", "Karakol", "Tokmok", "Uzgen", "Naryn", "Talas"],
  tajikistan: ["Dushanbe", "Khujand", "Kulob", "Qurghonteppa", "Istaravshan", "Panjakent", "Tursunzoda"],
};

const PersonalDetailsStep = ({ formData, updateFormData }: PersonalDetailsStepProps) => {
  const { t } = useLanguage();
  
  const availableCities = formData.countryOfResidence 
    ? citiesByCountry[formData.countryOfResidence] || []
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('apply.personalDetails')}</h2>
        <p className="text-muted-foreground">
          {t('apply.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            {t('scholarshipDetail.firstName')} *
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            {t('scholarshipDetail.lastName')} *
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            {t('scholarshipDetail.email')} *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            {t('scholarshipDetail.phone')} *
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+998 90 123 4567"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="countryOfResidence">
            {t('apply.countryOfResidence')} *
          </Label>
          <Select
            value={formData.countryOfResidence}
            onValueChange={(value) => {
              updateFormData({ countryOfResidence: value, city: "" });
            }}
          >
            <SelectTrigger id="countryOfResidence">
              <SelectValue placeholder={t('apply.selectCountry')} />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background">
              <SelectItem value="uzbekistan">{t('universities.uzbekistan')}</SelectItem>
              <SelectItem value="kazakhstan">{t('universities.kazakhstan')}</SelectItem>
              <SelectItem value="kyrgyzstan">{t('universities.kyrgyzstan')}</SelectItem>
              <SelectItem value="tajikistan">{t('universities.tajikistan')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">
            {t('apply.city')} *
          </Label>
          <Select
            value={formData.city}
            onValueChange={(value) => updateFormData({ city: value })}
            disabled={!formData.countryOfResidence}
          >
            <SelectTrigger id="city">
              <SelectValue placeholder={t('apply.selectCity')} />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background">
              {availableCities.map((city) => (
                <SelectItem key={city} value={city.toLowerCase()}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('apply.dateOfBirthOptional')}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? (
                  format(formData.dateOfBirth, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50 bg-background" align="start">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth}
                onSelect={(date) => updateFormData({ dateOfBirth: date })}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">
            {t('apply.gender')}
          </Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => updateFormData({ gender: value })}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder={t('apply.selectGender')} />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background">
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
