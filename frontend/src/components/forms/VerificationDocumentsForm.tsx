import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useVerificationDocumentsService } from '@/services/verificationDocumentsService';
 
interface DocumentFiles {
  carteNationale: File | null;
  baccalaureat: File | null;
  diplomeBac2: File | null;
  diplomeBac3: File | null;
  releveNotes: File | null;
}

const documentTypes = [
  { key: 'carteNationale', label: 'Carte Nationale', required: false },
  { key: 'baccalaureat', label: 'Baccalauréat', required: false },
  { key: 'diplomeBac2', label: 'Diplôme Bac+2', required: false },
  { key: 'releveNotes', label: 'Relevé de notes', required: false },
  { key: 'diplomeBac3', label: 'Diplôme Bac+3', required: false },
];

function VerificationDocumentsForm({studentId}: {studentId: string}){
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
  const fileInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({});
 
  const handleFileChange = (key: keyof DocumentFiles, file: File | null) => {
    console.log(`File changed for ${key}:`, file?.name || 'null'); // Debug log
    setFiles(prev => {
      const newFiles = { ...prev, [key]: file };
      console.log('Updated files state:', newFiles); // Debug log
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
    Object.values(fileInputRefs.current).forEach(input => {
      if (input) {
        input.value = '';
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug: Log files before submission
    console.log('Files before submission:', files);
    
    // Check if any files are selected
    const hasFiles = Object.values(files).some(file => file !== null);
    if (!hasFiles) {
      console.warn('No files selected for upload');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create FormData and log it for debugging
      const formData = new FormData();
      formData.append('student_id', studentId);
      
      Object.entries(files).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
          console.log(`Added to FormData: ${key} = ${file.name}`);
        }
      });
      
      // Log FormData contents
      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      
      await VerificationDocumentsService.uploadDocuments(studentId, files);
      
      // Reset form after successful upload
      resetForm();
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi des documents:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Téléchargement des Documents de Vérification</CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {documentTypes.map(doc => (
              <div key={doc.key} className="space-y-2">
                <Label htmlFor={doc.key}>
                  {doc.label}
                  {doc.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <Input
                  type="file"
                  id={doc.key}
                  ref={(el) => fileInputRefs.current[doc.key] = el}
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    handleFileChange(doc.key as keyof DocumentFiles, file);
                  }}
                />
                {files[doc.key as keyof DocumentFiles] && (
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 text-sm">
                      ✓ {files[doc.key as keyof DocumentFiles]?.name}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleFileChange(doc.key as keyof DocumentFiles, null);
                        if (fileInputRefs.current[doc.key]) {
                          fileInputRefs.current[doc.key]!.value = '';
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <Button 
              type="submit" 
              disabled={isSubmitting || !Object.values(files).some(file => file !== null)}
              className="w-full"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Télécharger les Documents'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerificationDocumentsForm;