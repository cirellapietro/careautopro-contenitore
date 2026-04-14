
'use client';

import { useEffect } from 'react';

/**
 * Componente per la visualizzazione dei banner pubblicitari (AdSense/AdMob).
 * Utilizza le variabili d'ambiente definite nel file .env.
 */
export function AdsBanner() {
  useEffect(() => {
    try {
      // Inizializzazione per AdSense (Web/PWA)
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      // Silenzioso se l'annuncio viene bloccato o non caricato
    }
  }, []);

  // Se non è configurato un ID, mostriamo un piccolo segnaposto discreto
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <div className="w-full flex justify-center py-4 bg-muted/10 my-4 border-y overflow-hidden relative min-h-[100px]">
      {clientId && clientId !== 'pub-XXXXXXXXXXXXXXXX' ? (
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client={clientId}
             data-ad-slot="auto"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      ) : (
        <div className="flex flex-col items-center justify-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black opacity-30 italic">Spazio Pubblicitario</p>
            <p className="text-[8px] text-muted-foreground uppercase opacity-20 mt-1">Configura l'ID AdSense nel file .env</p>
        </div>
      )}
    </div>
  );
}
