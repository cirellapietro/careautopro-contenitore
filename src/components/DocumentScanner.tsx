'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Webcam from 'react-webcam';
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { useToast } from '@/hooks/use-toast';

// Simulate the props for the component
interface DocumentScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanSuccess: (data: { imageUrl: string, extractedData: any }) => void; // Callback with image URL and extracted data
}

export const DocumentScanner: React.FC<DocumentScannerProps> = ({ open, onOpenChange, onScanSuccess }) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const handleUpload = async () => {
    if (!capturedImage) return;

    setIsUploading(true);
    toast({ title: 'Caricamento...', description: "L'immagine è in fase di invio a Firebase Storage." });

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `document_scans/${new Date().toISOString()}.jpg`);

      await uploadString(storageRef, capturedImage, 'data_url');

      const downloadURL = await getDownloadURL(storageRef);

      // SIMULAZIONE OCR: In un'implementazione reale, qui si attiverebbe una Cloud Function
      // per l'analisi OCR dell'immagine e l'estrazione dei dati.
      const extractedData = {
        documentType: Math.random() > 0.5 ? 'Patente' : 'Assicurazione',
        vehicle: 'Fiat Panda',
        owner: 'Mario Rossi',
        expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
      };

      toast({ title: 'Successo!', description: "Immagine caricata e dati estratti (simulato)." });

      onScanSuccess({ imageUrl: downloadURL, extractedData });
      resetScanner();
     } catch (error) {
      console.error("Errore durante il caricamento dell'immagine:", error);
      toast({ title: 'Errore', description: "Impossibile caricare l'immagine.", variant: 'destructive' });
      setIsUploading(false);
    } 
  };

  const resetScanner = () => {
    setCapturedImage(null);
    setIsUploading(false);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Scansione Documento</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video bg-black rounded-md overflow-hidden">
          {!capturedImage ? (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-full h-full object-cover"
              />
              {/* Overlay per il ritaglio */}
              <div className="absolute inset-0 border-[20px] border-white/50 box-border pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-3/5 border-2 border-dashed border-yellow-400 pointer-events-none"/>
            </>
          ) : (
            <img src={capturedImage} alt="Scansione catturata" className="w-full h-full object-contain" />
          )}
        </div>
        <DialogFooter className="mt-4">
          {!capturedImage ? (
            <Button onClick={capture}>Cattura</Button>
          ) : (
            <div className='w-full flex justify-between'>
              <Button variant="outline" onClick={() => setCapturedImage(null)} disabled={isUploading}>
                Scansiona di Nuovo
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? 'Caricamento...' : 'Invia per Analisi'}
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
