import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, X } from "lucide-react";
import { ApplicationFormData } from "@/pages/Apply";
import { Button } from "@/components/ui/button";

interface DocumentSelectionStepProps {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
}

const documents = [
  { key: "transcript", label: "Academic Transcript", required: true },
  { key: "passport", label: "Passport Copy", required: true },
  { key: "cv", label: "CV / Resume", required: true },
  { key: "motivationLetter", label: "Motivation Letter", required: false },
  { key: "englishCertificate", label: "English Test Certificate", required: false },
  { key: "recommendationLetter", label: "Recommendation Letter", required: false },
];

const DocumentSelectionStep = ({ formData, updateFormData }: DocumentSelectionStepProps) => {
  const handleFileChange = (key: string, file: File | null) => {
    updateFormData({
      selectedDocuments: {
        ...formData.selectedDocuments,
        [key]: file,
      },
    });
  };

  const handleFileRemove = (key: string) => {
    handleFileChange(key, null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Upload Documents</h2>
        <p className="text-muted-foreground">
          Upload your supporting documents (PDF, DOC, DOCX, JPG, PNG - max 5MB each)
        </p>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const file = formData.selectedDocuments[doc.key as keyof typeof formData.selectedDocuments];
          
          return (
            <div key={doc.key} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <Label htmlFor={doc.key} className="text-base">
                    {doc.label}
                  </Label>
                  {doc.required && (
                    <Badge variant="secondary" className="ml-2">
                      Required
                    </Badge>
                  )}
                </div>
              </div>

              {file ? (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-md">
                  <FileText className="h-8 w-8 text-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleFileRemove(doc.key)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    id={doc.key}
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file && file.size <= 5 * 1024 * 1024) {
                        handleFileChange(doc.key, file);
                      } else if (file) {
                        alert("File size must be less than 5MB");
                      }
                    }}
                    className="cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">Choose file or drag and drop</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-600" />
          Document Guidelines
        </h4>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• All documents must be in English or have certified translations</li>
          <li>• Scanned copies must be clear and legible</li>
          <li>• File formats: PDF, DOC, DOCX, JPG, PNG</li>
          <li>• Maximum file size: 5MB per document</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentSelectionStep;
