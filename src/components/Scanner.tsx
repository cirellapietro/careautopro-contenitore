'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { ShieldAlert, RefreshCw, Info } from 'lucide-react';

type DocumentType = 'Patente' | 'Assicurazione' | 'Libretto di Circolazione';
type PhotoSide = 'Fronte' | 'Retro';

interface ScannerProps {
    type: DocumentType;
    onScanSuccess: (docType: DocumentType) => void;
}

const documentTranslations = {
    'Patente': { en: "Driver\'s License", it: 'Patente' },
    'Assicurazione': { en: 'Insurance', it: 'Assicurazione' },
    'Libretto di Circolazione': { en: 'Vehicle Registration', it: 'Libretto di Circolazione' },
    'Fronte': { en: 'Front', it: 'Fronte' },
    'Retro': { en: 'Back', it: 'Retro' },
    'scan_front_prompt': { en: 'Now, frame the front of the', it: 'Ora, inquadra il fronte del' },
    'scan_back_prompt': { en: 'Great! Now frame the back of the', it: 'Ottimo! Ora inquadra il retro del' },
    'capture_complete': { en: 'Capture complete.', it: 'Acquisizione completata.' }
};

const getTranslatedText = (key: keyof typeof documentTranslations, lang: string) => {
    const language = lang.startsWith('it') ? 'it' : 'en';
    return documentTranslations[key]?.[language] || '';
};

export function Scanner({ type, onScanSuccess }: ScannerProps) {
  const [status, setStatus] = useState<'caricamento' | 'attivo' | 'verifica' | 'permessi'>('caricamento');
  const [photoSide, setPhotoSide] = useState<PhotoSide>('Fronte');
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null);
  const [backPhoto, setBackPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { speakFeedback } = useVoiceCommands();
  const lang = typeof navigator !== 'undefined' ? navigator.language : 'it-IT';

  const attivaCamera = useCallback(async () => {
    setStatus('caricamento');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatus('verifica');
        return;
    }

    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 1500));

    try {
        const stream = await Promise.race([
            navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }),
            timeout
        ]) as MediaStream;

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setStatus('attivo');
        }
    } catch (anomalia: any) {
        if (anomalia.name === 'NotAllowedError' || anomalia.name === 'PermissionDeniedError') {
            setStatus('permessi');
        } else {
            setStatus('verifica');
        }
    }
  }, []);

  useEffect(() => {
    attivaCamera();
    return () => {
        if (videoRef.current?.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
    };
  }, [attivaCamera]);

  useEffect(() => {
      if (status === 'attivo') {
          speakFeedback(`${getTranslatedText('scan_front_prompt', lang)} ${getTranslatedText(type, lang)}`);
      }
  }, [status, type, lang, speakFeedback]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const { videoWidth, videoHeight } = videoRef.current;
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    canvasRef.current.getContext('2d')?.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
    const dataUrl = canvasRef.current.toDataURL('image/jpeg');

    if (photoSide === 'Fronte') {
        setFrontPhoto(dataUrl);
        setPhotoSide('Retro');
        speakFeedback(`${getTranslatedText('scan_back_prompt', lang)} ${getTranslatedText(type, lang)}`);
    } else {
        setBackPhoto(dataUrl);
        if (videoRef.current?.srcObject) {
            (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
        speakFeedback(getTranslatedText('capture_complete', lang));
        onScanSuccess(type);
    }
  };

  if (status !== 'attivo') {
      const statusInfo = {
          caricamento: { icon: RefreshCw, text: 'Avvio telecamera...', color: 'text-slate-500', spin: true },
          permessi: { icon: ShieldAlert, text: 'Accesso alla fotocamera da autorizzare.', color: 'text-orange-500' },
          verifica: { icon: Info, text: 'Il sistema sta verificando i sensori video.', color: 'text-blue-400' }
      }[status] || { icon: Info, text: 'Stato dispositivo non noto.', color: 'text-gray-400' };
      const Icon = statusInfo.icon;
      return (
          <div className="flex flex-col items-center justify-center p-6 bg-slate-800 text-white min-h-[300px] rounded-2xl">
              <Icon className={`w-12 h-12 ${statusInfo.color} ${statusInfo.spin ? 'animate-spin' : ''}`} />
              <p className="text-slate-400 mt-4 text-center">{statusInfo.text}</p>
              {status === 'verifica' && (
                  <Button onClick={attivaCamera} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white">
                      <RefreshCw className="w-4 h-4 mr-2" /> Aggiorna
                  </Button>
              )}
          </div>
      );
  }

  return (
    <div className="flex flex-col items-center p-4 bg-black text-white min-h-screen w-full">
        <h3 className="text-lg mb-2 font-semibold">Inquadra: {getTranslatedText(type, lang)} - {getTranslatedText(photoSide, lang)}</h3>
        <div className="relative w-full max-w-md mb-4 border-2 border-dashed border-gray-500 rounded-lg overflow-hidden aspect-[4/3]">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" style={{ display: backPhoto ? 'none' : 'block' }} />
            <canvas ref={canvasRef} className="hidden" />
            {backPhoto && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4"/>
                    <p className="text-xl font-bold">{getTranslatedText('capture_complete', lang)}</p>
                </div>
            )}
        </div>
        <div className="flex justify-around w-full max-w-md mb-4">
            {[{'l':'Fronte', p:frontPhoto}, {'l':'Retro', p:backPhoto}].map(img => (
                <div key={img.l} className="flex flex-col items-center">
                    <p>{getTranslatedText(img.l as PhotoSide, lang)}</p>
                    <div className="w-32 h-20 bg-gray-800 rounded flex items-center justify-center overflow-hidden">
                       {img.p ? <img src={img.p} alt={img.l} className="object-contain h-full w-full" /> : <p className="text-xs text-gray-400">Preview</p>}
                    </div>
                </div>
            ))}
        </div>
        {!backPhoto && <Button onClick={handleCapture} size="lg" className="w-full max-w-md min-h-[48px] text-lg font-bold">Acquisisci {getTranslatedText(photoSide, lang)}</Button>}
    </div>
  );
}
