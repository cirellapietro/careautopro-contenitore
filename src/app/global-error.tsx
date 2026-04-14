'use client';

import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="it">
      <body className="min-h-screen bg-background">
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
          <div className="bg-destructive/10 p-4 rounded-full mb-6">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-3xl font-black italic uppercase text-primary mb-2">ERRORE CRITICO!</h2>
          <p className="text-sm text-muted-foreground uppercase font-bold mb-8">
            L'APPLICAZIONE HA RISCONTRATO UN PROBLEMA IRREVERSIBILE.
          </p>
          <button
            className="px-8 h-12 bg-primary text-white rounded-md font-black uppercase tracking-tight shadow-lg hover:brightness-110 active:scale-95 transition-all"
            onClick={() => reset()}
          >
            RICARICA APPLICAZIONE
          </button>
        </div>
      </body>
    </html>
  );
}
