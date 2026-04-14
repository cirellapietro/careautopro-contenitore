import React, { useEffect } from 'react';

const AdTestWidget = () => {
  useEffect(() => {
    try {
      // Inizializza l'annuncio solo nel browser
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Errore AdSense:", e);
    }
  }, []);

  return (
    <div style={{ 
      margin: '20px auto', 
      textAlign: 'center', 
      border: '2px dashed #4285F4', 
      padding: '10px',
      maxWidth: '728px',
      minHeight: '90px',
      backgroundColor: '#f8f9fa'
    }}>
      <small style={{ color: '#4285F4', fontWeight: 'bold' }}>Sorgente: ID TEST GOOGLE</small>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
           data-ad-slot="1234567890"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdTestWidget;
