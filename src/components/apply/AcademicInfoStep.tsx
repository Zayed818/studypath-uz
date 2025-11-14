import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationFormData } from "@/pages/Apply";

interface AcademicInfoStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const AcademicInfoStep = ({ formData, updateFormData }: AcademicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Academic Information</h2>
        <p className="text-muted-foreground">
          Tell us about your educational background
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentEducationLevel">Current Education Level *</Label>
        <Select
          value={formData.currentEducationLevel}
          onValueChange={(value) => updateFormData({ currentEducationLevel: value })}
        >
          <SelectTrigger id="currentEducationLevel">
            <SelectValue placeholder="Select your current level" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-background">
            <SelectItem value="high-school">High School</SelectItem>
            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
            <SelectItem value="master">Master's Degree</SelectItem>
            <SelectItem value="phd">PhD/Doctorate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="institution">Current/Last Institution *</Label>
        <Input
          id="institution"
          placeholder="University or School Name"
          value={formData.institution}
          onChange={(e) => updateFormData({ institution: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gpa">GPA / Average Grade *</Label>
        <Input
          id="gpa"
          placeholder="e.g., 3.8 / 4.0 or 85%"
          value={formData.gpa}
          onChange={(e) => updateFormData({ gpa: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          Enter your GPA on your institution's scale or percentage
        </p>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">English Proficiency</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="englishTest">Test Type</Label>
            <Select
              value={formData.englishTest}
              onValueChange={(value) => updateFormData({ englishTest: value })}
            >
              <SelectTrigger id="englishTest">
                <SelectValue placeholder="Select test" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-background">
                <SelectItem value="ielts">IELTS</SelectItem>
                <SelectItem value="toefl">TOEFL</SelectItem>
                <SelectItem value="duolingo">Duolingo</SelectItem>
                <SelectItem value="pte">PTE</SelectItem>
                <SelectItem value="none">Not taken yet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="englishScore">Score</Label>
            <Input
              id="englishScore"
              placeholder="e.g., 7.0 or 95"
              value={formData.englishScore}
              onChange={(e) => updateFormData({ englishScore: e.target.value })}
              disabled={formData.englishTest === "none"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicInfoStep;
