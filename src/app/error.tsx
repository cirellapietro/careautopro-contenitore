'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log dell'errore per il debugging in console
    console.error('App Runtime Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background">
      <div className="bg-destructive/10 p-4 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <h2 className="text-2xl font-black italic uppercase text-primary mb-2">SI È VERIFICATO UN ERRORE!</h2>
      <p className="text-sm text-muted-foreground uppercase font-bold mb-8 max-w-md">
        {error.message || "UN ERRORE IMPREVISTO HA INTERROTTO L'ESECUZIONE DELL'APPLICAZIONE."}
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.location.href = '/dashboard'} className="uppercase font-bold">
          TORNA ALLA DASHBOARD
        </Button>
        <Button onClick={() => reset()} className="uppercase font-bold shadow-md">
          RIPROVA
        </Button>
      </div>
    </div>
  );
}
