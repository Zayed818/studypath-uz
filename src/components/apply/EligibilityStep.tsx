import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { ApplicationFormData } from "@/pages/Apply";
import { Checkbox } from "@/components/ui/checkbox";

interface EligibilityStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const EligibilityStep = ({ formData, updateFormData }: EligibilityStepProps) => {
  const { t } = useLanguage();

  const budgetRanges = [
    { value: "0-5000", label: "$0 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-20000", label: "$10,000 - $20,000" },
    { value: "20000-30000", label: "$20,000 - $30,000" },
    { value: "30000+", label: "$30,000+" },
  ];

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{t('apply.eligibilityOptionalNote')}</p>

      {/* Highest Completed Education */}
      <div className="space-y-2">
        <Select
          value={formData.currentEducationLevel}
          onValueChange={(value) => updateFormData({ currentEducationLevel: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('apply.selectQualification')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high-school">{t('apply.highSchool')}</SelectItem>
            <SelectItem value="bachelor">{t('apply.bachelor')}</SelectItem>
            <SelectItem value="master">{t('apply.master')}</SelectItem>
            <SelectItem value="phd">{t('apply.phd')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* GPA / Average Score */}
      <div className="space-y-2">
        <Label htmlFor="gpa">{t('apply.gpa')} ({t('apply.optional')})</Label>
        <Input
          id="gpa"
          type="text"
          value={formData.gpa}
          onChange={(e) => updateFormData({ gpa: e.target.value })}
          placeholder="3.5 / 4.0"
        />
      </div>

      {/* English Proficiency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>{t('apply.englishTest')} ({t('apply.optional')})</Label>
          <Select
            value={formData.englishTest}
            onValueChange={(value) => updateFormData({ englishTest: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('apply.selectTest')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ielts">IELTS</SelectItem>
              <SelectItem value="toefl">TOEFL</SelectItem>
              <SelectItem value="duolingo">Duolingo</SelectItem>
              <SelectItem value="pte">PTE</SelectItem>
              <SelectItem value="not-taken">{t('apply.notTaken')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="englishScore">{t('apply.score')} ({t('apply.optional')})</Label>
          <Input
            id="englishScore"
            type="text"
            value={formData.englishScore}
            onChange={(e) => updateFormData({ englishScore: e.target.value })}
            placeholder="7.0"
            disabled={formData.englishTest === 'not-taken'}
          />
        </div>
      </div>

      {/* Budget Range */}
      <div className="space-y-2">
        <Label>{t('apply.budgetRange')} ({t('apply.optional')})</Label>
        <Select
          value={formData.budgetRange}
          onValueChange={(value) => updateFormData({ budgetRange: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('apply.selectBudget')} />
          </SelectTrigger>
          <SelectContent>
            {budgetRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Scholarship Interest */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="scholarshipInterest"
          checked={formData.scholarshipInterest}
          onCheckedChange={(checked) => 
            updateFormData({ scholarshipInterest: checked as boolean })
          }
        />
        <Label 
          htmlFor="scholarshipInterest" 
          className="text-sm font-normal cursor-pointer"
        >
          {t('apply.scholarshipInterest')}
        </Label>
      </div>
    </div>
  );
};

export default EligibilityStep;
