"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('main');
  const today = new Date().toISOString().split('T')[0];
  
  const [vehicleData, setVehicleData] = useState({ 
    brand: '', 
    model: '', 
    year: today, 
    km: '' 
  });

  const [settings, setSettings] = useState({
    hideKmWarning: false,
    hideDateWarning: false
  });

  const [isEstimated, setIsEstimated] = useState(false);

  // Funzione per salvare il veicolo con gestione pop-up
  const saveVehicle = () => {
    let finalKm = vehicleData.km;
    
    // Controllo Data Immatricolazione
    if (vehicleData.year === today && !settings.hideDateWarning) {
      const confirmDate = confirm("Hai lasciato la data di oggi come immatricolazione. È corretto?\n\n[Ok per confermare / Annulla per correggere]");
      if (!confirmDate) return;
    }

    // Controllo Chilometri e Stima
    if (!finalKm && !settings.hideKmWarning) {
      const currentYear = new Date().getFullYear();
      const vehicleYear = new Date(vehicleData.year).getFullYear();
      const age = Math.max(1, currentYear - vehicleYear);
      finalKm = age * 11500; // Stima media
      
      const confirmKm = confirm("Chilometri non inseriti. Stimo " + finalKm + " km in base all'età del veicolo?\n\n(Puoi spuntare 'Non chiedermelo più' nella dashboard)");
      if (confirmKm) {
        setIsEstimated(true);
      } else {
        return;
      }
    }

    console.log("Veicolo salvato in romataxihub:", { ...vehicleData, km: finalKm });
    setView('main');
  };

  if (view === 'add_vehicle') {
    return (
      <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <h3 style={{color: '#00E676'}}>Nuovo Veicolo</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input placeholder="Marca" style={inputStyle} onChange={e => setVehicleData({...vehicleData, brand: e.target.value})} />
          <input placeholder="Modello" style={inputStyle} onChange={e => setVehicleData({...vehicleData, model: e.target.value})} />
          
          <label style={{fontSize: '12px', color: '#888'}}>Data Immatricolazione:</label>
          <input type="date" value={vehicleData.year} style={inputStyle} onChange={e => setVehicleData({...vehicleData, year: e.target.value})} />
          
          <input placeholder="Chilometri reali (lascia vuoto per stima)" type="number" style={inputStyle} onChange={e => setVehicleData({...vehicleData, km: e.target.value})} />
          
          <button onClick={saveVehicle} style={saveBtn}>Salva e Attiva Tracking</button>
          <button onClick={() => setView('main')} style={{background: 'none', border: 'none', color: '#888', marginTop: '10px'}}>Annulla</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <div style={{ background: '#111', padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '10px', color: '#00E676', border: '1px solid #333', marginBottom: '15px' }}>
        MONETIZZAZIONE ATTIVA (PWA/APK)
      </div>

      <h2 style={{ color: '#00E676' }}>Care Auto Pro</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        <button onClick={() => setView('add_vehicle')} style={btnStyle}>🚗 Gestisci Veicolo</button>
        <button onClick={() => alert("Calcolo manutenzione su dati " + (isEstimated ? "STIMATI" : "REALI"))} style={btnStyle}>🛠️ Manutenzione</button>
      </div>

      {(isEstimated && !settings.hideKmWarning) && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#1a1a00', borderRadius: '12px', border: '1px solid #ffd600' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#ffd600' }}>⚠️ Stai usando chilometri stimati.</p>
          <div style={{marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px'}}>
             <input type="checkbox" onChange={() => setSettings({...settings, hideKmWarning: true})} />
             <span style={{fontSize: '11px'}}>Non chiedermelo più</span>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: '15px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff' };
const btnStyle = { padding: '20px', backgroundColor: '#151515', border: '1px solid #333', borderRadius: '15px', color: '#fff', fontWeight: 'bold' };
const saveBtn = { padding: '15px', backgroundColor: '#00E676', border: 'none', borderRadius: '10px', color: '#000', fontWeight: 'bold', marginTop: '10px' };
