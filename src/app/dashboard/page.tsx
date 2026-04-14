"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('main');
  const today = new Date().toISOString().split('T')[0];
  
  // Stato Hardware simulato (in produzione useremo le API Web/Capacitor)
  const [hasGps, setHasGps] = useState(true); 
  const [hasHotspot, setHasHotspot] = useState(true);
  const [hotspotName, setHotspotName] = useState("CareAuto_Hotspot_Default");

  const [vehicleData, setVehicleData] = useState({ 
    brandModel: '', 
    year: today, 
    km: '',
    trackGps: false,
    trackHotspot: false
  });

  const [settings, setSettings] = useState({
    hideKmWarning: false,
    hideDateWarning: false
  });

  const saveVehicle = () => {
    let finalKm = vehicleData.km;
    
    if (vehicleData.year === today && !settings.hideDateWarning) {
      const confirmDate = confirm("Hai lasciato la data di oggi come immatricolazione. È corretto?");
      if (!confirmDate) return;
    }

    if (!finalKm) {
      const age = Math.max(1, new Date().getFullYear() - new Date(vehicleData.year).getFullYear());
      finalKm = age * 11500;
      alert("Chilometri non indicati: verranno considerati da una stima approssimativa di " + finalKm + " km.");
    }

    console.log("Salvataggio in romataxihub:", { ...vehicleData, km: finalKm });
    setView('main');
  };

  if (view === 'add_vehicle') {
    return (
      <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <h3 style={{color: '#00E676', borderBottom: '1px solid #222', paddingBottom: '10px'}}>Nuovo Veicolo</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          
          {/* 1. Marca e Modello unico campo */}
          <input 
            placeholder="Marca e modello veicolo" 
            style={inputStyle} 
            onChange={e => setVehicleData({...vehicleData, brandModel: e.target.value})} 
          />
          
          <label style={labelStyle}>Data Immatricolazione:</label>
          <input type="date" value={vehicleData.year} style={inputStyle} onChange={e => setVehicleData({...vehicleData, year: e.target.value})} />
          
          {/* 2. Nuova label Chilometri */}
          <label style={labelStyle}>Chilometri reali (se non indicati saranno considerati da una stima approssimativa):</label>
          <input type="number" style={inputStyle} onChange={e => setVehicleData({...vehicleData, km: e.target.value})} />
          
          {/* 3. Check GPS (Visibile solo se presente hardware) */}
          {hasGps && (
            <div style={checkRow}>
              <input type="checkbox" id="gps" onChange={e => setVehicleData({...vehicleData, trackGps: e.target.checked})} />
              <label htmlFor="gps">Attiva tracking GPS</label>
            </div>
          )}

          {/* 4. Check Hotspot (Visibile solo se presente hardware) */}
          {hasHotspot && (
            <div style={checkRow}>
              <input type="checkbox" id="hotspot" onChange={e => setVehicleData({...vehicleData, trackHotspot: e.target.checked})} />
              <label htmlFor="hotspot">Attiva hotspot ({hotspotName})</label>
            </div>
          )}
          
          {/* Tasto rinominato in Salva */}
          <button onClick={saveVehicle} style={saveBtn}>Salva</button>
          <button onClick={() => setView('main')} style={{background: 'none', border: 'none', color: '#888'}}>Annulla</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <h2 style={{ color: '#00E676' }}>Care Auto Pro</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        <button onClick={() => setView('add_vehicle')} style={btnStyle}>🚗 Gestisci Veicolo</button>
        <button onClick={() => alert("Funzione Manutenzione")} style={btnStyle}>🛠️ Manutenzione</button>
      </div>
    </div>
  );
}

const inputStyle = { padding: '15px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff' };
const labelStyle = { fontSize: '12px', color: '#aaa', marginBottom: '-10px' };
const checkRow = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', padding: '5px 0' };
const btnStyle = { padding: '20px', backgroundColor: '#151515', border: '1px solid #333', borderRadius: '15px', color: '#fff', fontWeight: 'bold' };
const saveBtn = { padding: '15px', backgroundColor: '#00E676', border: 'none', borderRadius: '10px', color: '#000', fontWeight: 'bold', marginTop: '20px' };
