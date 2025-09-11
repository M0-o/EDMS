import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, GraduationCap, User } from "lucide-react";
import { useVerificationDocumentsService } from "@/services/verificationDocumentsService";
import { toast } from "sonner";

interface DocumentFiles {
  carteNationale: File | null;
  baccalaureat: File | null;
  diplomeBac2: File | null;
  diplomeBac3: File | null;
  releveNotes: File | null;
}

const documentTypes = [
  { key: "carteNationale", label: "Carte Nationale", required: false, iconType: "carte_identite" },
  { key: "baccalaureat", label: "Baccalauréat", required: false, iconType: "baccalaureat" },
  { key: "diplomeBac2", label: "Diplôme Bac+2", required: false, iconType: "diplome_bac2" },
  { key: "releveNotes", label: "Relevé de notes", required: false, iconType: "releve_notes" },
  { key: "diplomeBac3", label: "Diplôme Bac+3", required: false, iconType: "diplome_bac3" },
];
function getDocumentTypeIcon(documentType: string) {
  switch (documentType) {
    case 'new_diploma':
      return <GraduationCap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
    case 'carte_identite':
      return <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    case 'baccalaureat':
      return <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
    case 'diplome_bac2':
      return <GraduationCap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
    case 'diplome_bac3':
      return <GraduationCap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
    case 'releve_notes':
      return <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
    default:
      return <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
  }
}

function getDocumentTypeBadgeColor(documentType: string) {
  switch (documentType) {
    case 'new_diploma':
      return 'bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-800'
    case 'carte_identite':
      return 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-800'
    case 'baccalaureat':
      return 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 hover:bg-purple-100 dark:hover:bg-purple-800'
    case 'diplome_bac2':
      return 'bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-100 hover:bg-indigo-100 dark:hover:bg-indigo-800'
    case 'diplome_bac3':
      return 'bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-100 hover:bg-violet-100 dark:hover:bg-violet-800'
    case 'releve_notes':
      return 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100 hover:bg-orange-100 dark:hover:bg-orange-800'
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
  }
}

function VerificationDocumentsForm({ studentId }: { studentId: string }) {
  const [files, setFiles] = useState<DocumentFiles>({
    carteNationale: null,
    baccalaureat: null,
    diplomeBac2: null,
    diplomeBac3: null,
    releveNotes: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const VerificationDocumentsService = useVerificationDocumentsService();

  // Create refs for each file input to force reset
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleFileChange = (key: keyof DocumentFiles, file: File | null) => {
    console.log(`File changed for ${key}:`, file?.name || "null"); // Debug log
    setFiles((prev) => {
      const newFiles = { ...prev, [key]: file };
      console.log("Updated files state:", newFiles); // Debug log
      return newFiles;
    });
  };

  const resetForm = () => {
    // Reset state
    setFiles({
      carteNationale: null,
      baccalaureat: null,
      diplomeBac2: null,
      diplomeBac3: null,
      releveNotes: null,
    });

    // Reset all file inputs
    Object.values(fileInputRefs.current).forEach((input) => {
      if (input) {
        input.value = "";
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasFiles = Object.values(files).some((file) => file !== null);

    if (!hasFiles) {
      toast.error("Please select at least one document to upload.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("student_id", studentId);

    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    toast.promise(
      VerificationDocumentsService.uploadDocuments(studentId, files).then(
        (res) => {
          if (res.status && res.status !== 200) {
            throw new Error(res.detail);
          } else return res;
        }
      ),
      {
        loading: "Uploading documents...",
        success: () => {
          resetForm();
          setIsSubmitting(false);
          return "Documents uploaded successfully!";
        },
        error: (err) => `Error uploading documents: ${err}`,
      }
    );
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Téléchargement des Documents de Vérification</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {documentTypes.map((doc) => (
              <div key={doc.key} className="space-y-3">
                <div className="flex items-center gap-3">
                  {getDocumentTypeIcon(doc.iconType)}
                  <Label htmlFor={doc.key} className="text-sm font-medium">
                    {doc.label}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                </div>
                <div className={`p-3 rounded-lg border-2 border-dashed transition-colors ${
                  files[doc.key as keyof DocumentFiles] 
                    ? 'border-green-700/80 bg-green-50 dark:bg-green-950/30' 
                    : 'border-gray-300 hover:border-gray-400 dark:border-zinc-700'
                }`}>
                  <Input
                    type="file"
                    id={doc.key}
                    ref={(el) => (fileInputRefs.current[doc.key] = el)}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileChange(doc.key as keyof DocumentFiles, file);
                    }}
                    className="cursor-pointer"
                  />
                  {files[doc.key as keyof DocumentFiles] && (
                    <div className="flex items-center justify-between mt-3 p-2 rounded-md bg-white dark:bg-zinc-800 border">
                      <div className="flex items-center gap-2">
                        <span className="text-green-600">
                           ✓
                        </span>
                        <span className="text-sm font-medium">{files[doc.key as keyof DocumentFiles]?.name}</span>
                        <div className={`px-2 py-1 text-xs rounded-full ${getDocumentTypeBadgeColor(doc.iconType)}`}>
                          {doc.label}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleFileChange(doc.key as keyof DocumentFiles, null);
                          if (fileInputRefs.current[doc.key]) {
                            fileInputRefs.current[doc.key]!.value = "";
                          }
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <Button
              type="submit"
              disabled={
                isSubmitting ||
                !Object.values(files).some((file) => file !== null)
              }
              className="w-full"
            >
              {isSubmitting ? "Envoi en cours..." : "Télécharger les Documents"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default VerificationDocumentsForm;
