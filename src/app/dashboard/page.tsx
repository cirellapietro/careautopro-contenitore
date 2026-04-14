"use client";
import React, { useState } from 'react';

export default function Dashboard() {
  const [status, setStatus] = useState({ id: null, gps: false, hotspot: false });
  const [view, setView] = useState('main');
  const ads = { pubId: "pub-74874364...", slot: "880bd" };

  const handleSync = (vId) => {
    setStatus({ id: vId, gps: true, hotspot: true });
    alert("Sincronizzazione OK con romataxihub.");
  };

  if (view === 'copilota') {
    return (
      <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <button onClick={() => setView('main')} style={{color: '#00E676', background: 'none', border: 'none', marginBottom: '20px'}}>← Indietro</button>
        <h3>Copilota Maps</h3>
        <button onClick={() => window.open('https://www.google.com/maps/search/caffe+vicino+a+me')} style={actionBtn}>☕ Cerca Caffè</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#111', padding: '10px', marginBottom: '20px', borderRadius: '8px', textAlign: 'center', fontSize: '10px', color: '#00E676', border: '1px solid #333' }}>
        ADSENSE ATTIVO: {ads.pubId}
      </div>
      <h2 style={{ color: '#00E676' }}>Care Auto Pro</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        <button onClick={() => handleSync("VEICOLO_01")} style={btnStyle}>🚗 Veicoli</button>
        <button onClick={() => setView('copilota')} style={btnStyle}>�� Copilota</button>
      </div>
      {status.gps && <div style={{marginTop: '20px', color: '#00E676'}}>✓ GPS e Hotspot Ripristinati</div>}
    </div>
  );
}

const btnStyle = { padding: '20px', backgroundColor: '#151515', border: '1px solid #333', borderRadius: '15px', color: '#fff' };
const actionBtn = { width: '100%', padding: '15px', backgroundColor: '#111', border: '1px solid #00E676', color: '#fff', borderRadius: '10px' };
