import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationFormData } from "@/pages/Apply";
import { useLanguage } from "@/contexts/LanguageContext";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AcademicInfoStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const AcademicInfoStep = ({ formData, updateFormData }: AcademicInfoStepProps) => {
  const { t } = useLanguage();

  const handleTranscriptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateFormData({ transcript: file });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('apply.academicInfo')}</h2>
        <p className="text-muted-foreground">
          {t('programs.allFieldsOptional') || 'All fields are optional'}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentEducationLevel">
          {t('programDetail.educationLevel') || 'Highest Qualification'}
        </Label>
        <Select
          value={formData.currentEducationLevel}
          onValueChange={(value) => updateFormData({ currentEducationLevel: value })}
        >
          <SelectTrigger id="currentEducationLevel">
            <SelectValue placeholder="Select your qualification" />
          </SelectTrigger>
          <SelectContent className="z-50 bg-background">
            <SelectItem value="high-school">High School</SelectItem>
            <SelectItem value="bachelor">Bachelor</SelectItem>
            <SelectItem value="master">Master</SelectItem>
            <SelectItem value="phd">PhD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gpa">GPA / Average Score</Label>
        <Input
          id="gpa"
          type="number"
          step="0.01"
          placeholder="e.g., 3.8 or 85"
          value={formData.gpa}
          onChange={(e) => updateFormData({ gpa: e.target.value })}
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">
          {t('programDetail.englishProficiency') || 'English Proficiency'}
        </h3>
        
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
                <SelectItem value="cefr-b2">CEFR B2</SelectItem>
                <SelectItem value="cefr-c1">CEFR C1</SelectItem>
                <SelectItem value="none">Not taken yet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="englishScore">Level/Score</Label>
            <Input
              id="englishScore"
              placeholder="e.g., 7.0 or B2"
              value={formData.englishScore}
              onChange={(e) => updateFormData({ englishScore: e.target.value })}
              disabled={formData.englishTest === "none"}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="transcript">{t('apply.uploadTranscript')}</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="relative"
              onClick={() => document.getElementById('transcript')?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              {formData.transcript ? 'Change File' : 'Choose File'}
            </Button>
            {formData.transcript && (
              <span className="text-sm text-muted-foreground">
                {formData.transcript.name}
              </span>
            )}
            <input
              id="transcript"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleTranscriptUpload}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            PDF, DOC, or DOCX format
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademicInfoStep;
