import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useLanguage } from "@/contexts/LanguageContext";
import { ApplicationFormData, ValidationErrors } from "@/pages/Apply";

interface ProfileStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
  validationErrors?: ValidationErrors;
}

const ProfileStep = ({ formData, updateFormData, validationErrors }: ProfileStepProps) => {
  const { t } = useLanguage();

  const centralAsianCountries = [
    { value: "uzbekistan", label: "Uzbekistan" },
    { value: "kazakhstan", label: "Kazakhstan" },
    { value: "kyrgyzstan", label: "Kyrgyzstan" },
    { value: "tajikistan", label: "Tajikistan" },
  ];

  const citiesByCountry: Record<string, string[]> = {
    uzbekistan: ["Tashkent", "Samarkand", "Bukhara", "Khiva", "Namangan", "Andijan", "Fergana"],
    kazakhstan: ["Almaty", "Nur-Sultan", "Shymkent", "Aktobe", "Karaganda"],
    kyrgyzstan: ["Bishkek", "Osh", "Jalal-Abad", "Karakol"],
    tajikistan: ["Dushanbe", "Khujand", "Kulob", "Qurghonteppa"],
  };

  const cities = formData.nationality ? citiesByCountry[formData.nationality] || [] : [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name - First */}
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('apply.firstName')} *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            placeholder={t('apply.firstNamePlaceholder')}
          />
          {validationErrors?.firstName && (
            <p className="text-sm text-destructive">{validationErrors.firstName}</p>
          )}
        </div>

        {/* Full Name - Last */}
        <div className="space-y-2">
          <Label htmlFor="lastName">{t('apply.lastName')} *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            placeholder={t('apply.lastNamePlaceholder')}
          />
          {validationErrors?.lastName && (
            <p className="text-sm text-destructive">{validationErrors.lastName}</p>
          )}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label>{t('apply.dateOfBirth')} *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : t('apply.selectDate')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.dateOfBirth}
              onSelect={(date) => updateFormData({ dateOfBirth: date })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {validationErrors?.dateOfBirth && (
          <p className="text-sm text-destructive">{validationErrors.dateOfBirth}</p>
        )}
      </div>

      {/* Gender (Optional) */}
      <div className="space-y-2">
        <Label>{t('apply.gender')} ({t('apply.optional')})</Label>
        <Select value={formData.gender} onValueChange={(value) => updateFormData({ gender: value })}>
          <SelectTrigger>
            <SelectValue placeholder={t('apply.selectGender')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">{t('apply.male')}</SelectItem>
            <SelectItem value="female">{t('apply.female')}</SelectItem>
            <SelectItem value="other">{t('apply.other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Nationality */}
      <div className="space-y-2">
        <Label>{t('apply.nationality')} *</Label>
        <Select 
          value={formData.nationality} 
          onValueChange={(value) => updateFormData({ nationality: value, city: "" })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('apply.selectNationality')} />
          </SelectTrigger>
          <SelectContent>
            {centralAsianCountries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {validationErrors?.nationality && (
          <p className="text-sm text-destructive">{validationErrors.nationality}</p>
        )}
      </div>

      {/* Current City */}
      <div className="space-y-2">
        <Label>{t('apply.currentCity')} *</Label>
        <Select 
          value={formData.city} 
          onValueChange={(value) => updateFormData({ city: value })}
          disabled={!formData.nationality}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('apply.selectCity')} />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {validationErrors?.city && (
          <p className="text-sm text-destructive">{validationErrors.city}</p>
        )}
      </div>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">{t('apply.email')} *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder={t('apply.emailPlaceholder')}
          />
          {validationErrors?.email && (
            <p className="text-sm text-destructive">{validationErrors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t('apply.phone')} *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            placeholder={t('apply.phonePlaceholder')}
          />
          {validationErrors?.phone && (
            <p className="text-sm text-destructive">{validationErrors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileStep;
