"use client";
import React, { useState } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('main');
  const today = new Date().toISOString().split('T')[0];
  
  const [vehicleData, setVehicleData] = useState({ 
    brandModel: '', 
    year: today, 
    km: '',
    trackGps: false,
    trackHotspot: false
  });

  const [settings, setSettings] = useState({ hideMaintWarning: false });

  // Funzione per generare interventi automatici (Simulazione ricerca internet)
  const generateMaintenance = (model, km) => {
    alert("RICERCA INTERVENTI PERIODICI PER " + model.toUpperCase() + " IN CORSO...");
    const baseKm = parseInt(km) || 0;
    const interventi = [
      { tipo: "CAMBIO OLIO", km: baseKm + 15000 },
      { tipo: "CINGHIA DISTRIBUZIONE", km: baseKm + 100000 },
      { tipo: "FILTRO ABITACOLO", km: baseKm + 20000 }
    ];
    return interventi;
  };

  const saveVehicle = () => {
    const finalKm = vehicleData.km || "STIMATI";
    const interventi = generateMaintenance(vehicleData.brandModel, vehicleData.km);
    
    alert("INTERVENTI GENERATI AUTOMATICAMENTE PER " + vehicleData.brandModel.toUpperCase());
    
    if (!settings.hideMaintWarning) {
      const check = confirm("HO GENERATO GLI INTERVENTI AUTOMATICI. VUOI AGGIORNARE EVENTUALI LAVORI GIÀ EFFETTUATI A KM DIVERSI?\n\n(OK PER AGGIORNARE / ANNULLA PER PROSEGUIRE)");
      if (check) {
        alert("APERTURA STORICO INTERVENTI...");
      }
    }
    setView('main');
  };

  if (view === 'add_vehicle') {
    return (
      <div style={containerStyle}>
        <h3 style={headerStyle}>NUOVO VEICOLO</h3>
        <div style={formStyle}>
          <input 
            placeholder="MARCA E MODELLO VEICOLO" 
            style={inputStyle} 
            value={vehicleData.brandModel.toUpperCase()}
            onChange={e => setVehicleData({...vehicleData, brandModel: e.target.value.toUpperCase()})} 
          />
          
          <label style={labelStyle}>DATA IMMATRICOLAZIONE:</label>
          <input 
            type="date" 
            value={vehicleData.year} 
            style={inputStyle} 
            onChange={e => setVehicleData({...vehicleData, year: e.target.value})} 
          />
          
          <label style={labelStyle}>CHILOMETRI REALI (STIMA SE VUOTO):</label>
          <input 
            type="number" 
            style={inputStyle} 
            onChange={e => setVehicleData({...vehicleData, km: e.target.value})} 
          />
          
          <div style={checkRow}>
            <input type="checkbox" id="gps" onChange={e => setVehicleData({...vehicleData, trackGps: e.target.checked})} />
            <label htmlFor="gps">ATTIVA TRACKING GPS</label>
          </div>

          <div style={checkRow}>
            <input type="checkbox" id="hotspot" onChange={e => setVehicleData({...vehicleData, trackHotspot: e.target.checked})} />
            <label htmlFor="hotspot">ATTIVA HOTSPOT (CAREAUTO_PRO)</label>
          </div>
          
          <button onClick={saveVehicle} style={saveBtn}>SALVA</button>
          <button onClick={() => setView('main')} style={cancelBtn}>ANNULLA</button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#00E676' }}>CARE AUTO PRO</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
        <button onClick={() => setView('add_vehicle')} style={btnStyle}>🚗 GESTISCI VEICOLO</button>
        <button onClick={() => alert("MOSTRA STORICO INTERVENTI GENERATI")} style={btnStyle}>🛠️ MANUTENZIONE</button>
      </div>
    </div>
  );
}

// STILI IN MAIUSCOLO E OTTIMIZZATI
const containerStyle = { padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff', textTransform: 'uppercase' };
const headerStyle = { color: '#00E676', borderBottom: '1px solid #222', paddingBottom: '10px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' };
const inputStyle = { padding: '15px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff', fontSize: '16px', textTransform: 'uppercase' };
const labelStyle = { fontSize: '11px', color: '#aaa', marginBottom: '-5px' };
const checkRow = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' };
const btnStyle = { padding: '20px', backgroundColor: '#151515', border: '1px solid #333', borderRadius: '15px', color: '#fff', fontWeight: 'bold', fontSize: '12px' };
const saveBtn = { padding: '20px', backgroundColor: '#00E676', border: 'none', borderRadius: '10px', color: '#000', fontWeight: 'bold', fontSize: '16px' };
const cancelBtn = { background: 'none', border: 'none', color: '#888', marginTop: '10px' };
