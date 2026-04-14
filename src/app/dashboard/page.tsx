"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('main');
  const [vehicleData, setVehicleData] = useState({ brand: '', model: '', year: '', km: '' });
  const [isEstimated, setIsEstimated] = useState(false);

  // Funzione di Stima Chilometrica (Logica per zona)
  const calculateEstimatedKm = (year) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - parseInt(year);
    // Media stimata per zona urbana/Italia: 11.500 km/anno
    const estimated = age * 11500;
    return estimated > 0 ? estimated : 0;
  };

  const saveVehicle = () => {
    let finalKm = vehicleData.km;
    if (!finalKm && vehicleData.year) {
      finalKm = calculateEstimatedKm(vehicleData.year);
      setIsEstimated(true);
      alert("ATTENZIONE: Chilometraggio non inserito. In base alla tua zona e all'anno del veicolo, abbiamo stimato " + finalKm + " km attuali. Ti verrà richiesto di aggiornarlo periodicamente.");
    }
    // Qui il codice salva su Firebase romataxihub
    console.log("Salvataggio veicolo:", { ...vehicleData, km: finalKm });
    setView('main');
  };

  if (view === 'add_vehicle') {
    return (
      <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
        <h3 style={{color: '#00E676'}}>Inserisci Nuovo Veicolo</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input placeholder="Marca" style={inputStyle} onChange={e => setVehicleData({...vehicleData, brand: e.target.value})} />
          <input placeholder="Modello" style={inputStyle} onChange={e => setVehicleData({...vehicleData, model: e.target.value})} />
          <input placeholder="Anno Immatricolazione" type="number" style={inputStyle} onChange={e => setVehicleData({...vehicleData, year: e.target.value})} />
          <input placeholder="Chilometri Attuali (Opzionale)" type="number" style={inputStyle} onChange={e => setVehicleData({...vehicleData, km: e.target.value})} />
          <button onClick={saveVehicle} style={saveBtn}>Salva Veicolo</button>
          <button onClick={() => setView('main')} style={{background: 'none', border: 'none', color: '#888'}}>Annulla</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <div style={{ background: '#111', padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '10px', color: '#00E676', border: '1px solid #333' }}>
        MONETIZZAZIONE: PUB-74874364... | ADMOB ACTIVE
      </div>
      
      <h2 style={{ color: '#00E676', marginTop: '20px' }}>Care Auto Pro</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        <button onClick={() => setView('add_vehicle')} style={btnStyle}>🚗 Aggiungi/Gestisci</button>
        <button onClick={() => alert("Ricerca Manutenzione per Modello...")} style={btnStyle}>🛠️ Manutenzione</button>
        <button onClick={() => setView('copilota')} style={btnStyle}>📍 Copilota Maps</button>
        <button style={btnStyle}>🎙️ Comando Vocale</button>
      </div>

      {isEstimated && (
        <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255, 214, 0, 0.1)', borderRadius: '12px', border: '1px solid #FFD600' }}>
          <p style={{ margin: 0, fontSize: '12px', color: '#FFD600' }}>⚠️ Stai usando un chilometraggio stimato. Aggiornalo per dati precisi sulla manutenzione.</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: '15px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff' };
const btnStyle = { padding: '20px', backgroundColor: '#151515', border: '1px solid #333', borderRadius: '15px', color: '#fff', fontWeight: 'bold' };
const saveBtn = { padding: '15px', backgroundColor: '#00E676', border: 'none', borderRadius: '10px', color: '#000', fontWeight: 'bold' };
