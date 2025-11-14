import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ApplicationFormData } from "@/pages/Apply";

interface ProgramPreferencesStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const countries = [
  { id: "usa", label: "United States" },
  { id: "uk", label: "United Kingdom" },
  { id: "canada", label: "Canada" },
  { id: "germany", label: "Germany" },
  { id: "australia", label: "Australia" },
  { id: "netherlands", label: "Netherlands" },
];

const ProgramPreferencesStep = ({ formData, updateFormData }: ProgramPreferencesStepProps) => {
  const handleCountryToggle = (countryId: string) => {
    const updated = formData.preferredCountries.includes(countryId)
      ? formData.preferredCountries.filter((c) => c !== countryId)
      : [...formData.preferredCountries, countryId];
    updateFormData({ preferredCountries: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Program Preferences</h2>
        <p className="text-muted-foreground">
          Help us find the best programs for you
        </p>
      </div>

      <div className="space-y-2">
        <Label>Preferred Countries *</Label>
        <p className="text-sm text-muted-foreground mb-3">
          Select up to 3 countries
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {countries.map((country) => (
            <div key={country.id} className="flex items-center space-x-2">
              <Checkbox
                id={country.id}
                checked={formData.preferredCountries.includes(country.id)}
                onCheckedChange={() => handleCountryToggle(country.id)}
                disabled={
                  !formData.preferredCountries.includes(country.id) &&
                  formData.preferredCountries.length >= 3
                }
              />
              <Label
                htmlFor={country.id}
                className="text-sm font-normal cursor-pointer"
              >
                {country.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preferredDegree">Degree Level *</Label>
          <Select
            value={formData.preferredDegree}
            onValueChange={(value) => updateFormData({ preferredDegree: value })}
          >
            <SelectTrigger id="preferredDegree">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background">
              <SelectItem value="bachelor">Bachelor's</SelectItem>
              <SelectItem value="master">Master's</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredField">Field of Study *</Label>
          <Select
            value={formData.preferredField}
            onValueChange={(value) => updateFormData({ preferredField: value })}
          >
            <SelectTrigger id="preferredField">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background">
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="computer-science">Computer Science</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="arts">Arts & Humanities</SelectItem>
              <SelectItem value="sciences">Natural Sciences</SelectItem>
              <SelectItem value="social">Social Sciences</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="intakeYear">Intake Year *</Label>
          <Select
            value={formData.intakeYear}
            onValueChange={(value) => updateFormData({ intakeYear: value })}
          >
            <SelectTrigger id="intakeYear">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background">
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="intakeSeason">Intake Season *</Label>
          <Select
            value={formData.intakeSeason}
            onValueChange={(value) => updateFormData({ intakeSeason: value })}
          >
            <SelectTrigger id="intakeSeason">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-background">
              <SelectItem value="spring">Spring (Jan-Mar)</SelectItem>
              <SelectItem value="fall">Fall (Sep-Nov)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Annual Budget (USD) *</Label>
        <Select
          value={formData.budget}
          onValueChange={(value) => updateFormData({ budget: value })}
        >
          <SelectTrigger id="budget">
            <SelectValue placeholder="Select budget range" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-background">
            <SelectItem value="0-10000">$0 - $10,000 (Need full scholarship)</SelectItem>
            <SelectItem value="10000-20000">$10,000 - $20,000</SelectItem>
            <SelectItem value="20000-30000">$20,000 - $30,000</SelectItem>
            <SelectItem value="30000-50000">$30,000 - $50,000</SelectItem>
            <SelectItem value="50000+">$50,000+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProgramPreferencesStep;
