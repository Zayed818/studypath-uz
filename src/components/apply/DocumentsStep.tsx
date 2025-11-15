import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ApplicationFormData } from "@/pages/Apply";
import { toast } from "@/hooks/use-toast";

interface DocumentsStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const DocumentsStep = ({ formData, updateFormData }: DocumentsStepProps) => {
  const { t } = useLanguage();

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: 'transcript' | 'englishProof' | 'passport' | 'cv' | 'recommendationLetters'
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: t('common.error'),
        description: t('apply.invalidFileType'),
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t('common.error'),
        description: t('apply.fileTooLarge'),
        variant: "destructive",
      });
      return;
    }

    updateFormData({ [field]: file });
  };

  const removeFile = (field: 'transcript' | 'englishProof' | 'passport' | 'cv' | 'recommendationLetters') => {
    updateFormData({ [field]: null });
  };

  const FileUploadButton = ({ 
    field, 
    label, 
    file 
  }: { 
    field: 'transcript' | 'englishProof' | 'passport' | 'cv' | 'recommendationLetters';
    label: string;
    file: File | null;
  }) => (
    <div className="space-y-2">
      <Label>{label} ({t('apply.optional')})</Label>
      {file ? (
        <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm flex-1 truncate">{file.name}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeFile(field)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div>
          <input
            type="file"
            id={field}
            className="hidden"
            onChange={(e) => handleFileUpload(e, field)}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById(field)?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            {t('apply.uploadFile')}
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{t('apply.documentsOptionalNote')}</p>

      <FileUploadButton
        field="transcript"
        label={t('apply.transcript')}
        file={formData.transcript}
      />

      <FileUploadButton
        field="englishProof"
        label={t('apply.englishProof')}
        file={formData.englishProof}
      />

      <FileUploadButton
        field="passport"
        label={t('apply.passport')}
        file={formData.passport}
      />

      <FileUploadButton
        field="cv"
        label={t('apply.cv')}
        file={formData.cv}
      />

      <FileUploadButton
        field="recommendationLetters"
        label={t('apply.recommendationLetters')}
        file={formData.recommendationLetters}
      />

      <div className="p-4 bg-muted/50 rounded-md">
        <p className="text-sm text-muted-foreground">
          {t('apply.documentsSupportedFormats')}: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
        </p>
      </div>
    </div>
  );
};

export default DocumentsStep;
