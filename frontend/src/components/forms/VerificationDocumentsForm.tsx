import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useVerificationDocumentsService
 } from '@/services/verificationDocumentsService';
 
interface DocumentFiles {
  carteNationale: File | null;
  baccalaureat: File | null;
  diplomeBac2: File | null;
  diplomeBac3: File | null;
  releveNotes: File | null;
}

interface VerificationDocumentsFormProps {
  onSubmit?: (files: DocumentFiles) => void;
}

 const documentTypes = [
    { key: 'carteNationale', label: 'Carte Nationale', required: true },
    { key: 'baccalaureat', label: 'Baccalauréat', required: true },
    { key: 'diplomeBac2', label: 'Diplôme Bac+2', required: false },
    { key: 'diplomeBac3', label: 'Diplôme Bac+3', required: false },
    { key: 'releveNotes', label: 'Relevé de notes', required: true },
  ];

function VerificationDocumentsForm(){
  const [files, setFiles] = useState<DocumentFiles>({
    carteNationale: null,
    baccalaureat: null,
    diplomeBac2: null,
    diplomeBac3: null,
    releveNotes: null,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const VerificationDocumentsService = useVerificationDocumentsService();
 
  const handleFileChange = (key: keyof DocumentFiles, file: File | null) => {
    setFiles(prev => ({ ...prev, [key]: file }));
    setErrors(prev => prev.filter(error => !error.includes(key)));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    documentTypes.forEach(doc => {
      if (doc.required && !files[doc.key as keyof DocumentFiles]) {
        newErrors.push(`${doc.label} est requis`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await VerificationDocumentsService.uploadDocuments(files);
      setFiles({
        carteNationale: null,
        baccalaureat: null,
        diplomeBac2: null,
        diplomeBac3: null,
        releveNotes: null,
      });
    } catch (error) {
      setErrors(['Erreur lors de l\'envoi des documents']);
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
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(doc.key as keyof DocumentFiles, e.target.files?.[0] || null)}
                />
                {files[doc.key as keyof DocumentFiles] && (
                  <span className="text-green-600 text-sm">
                    ✓ {files[doc.key as keyof DocumentFiles]?.name}
                  </span>
                )}
              </div>
            ))}

            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertDescription>
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              disabled={isSubmitting}
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
