"use client";
import React, { useState } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('main');
  const [useManualDate, setUseManualDate] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  const [vehicleData, setVehicleData] = useState({ 
    brandModel: '', fullDate: today, day: '', month: '', year: '', km: '', trackGps: true 
  });

  const saveVehicle = () => {
    alert("VEICOLO " + vehicleData.brandModel.toUpperCase() + " SALVATO CON SUCCESSO!");
    setView('main');
  };

  if (view === 'add_vehicle') {
    return (
      <div style={containerStyle}>
        <h3 style={headerStyle}>NUOVO VEICOLO</h3>
        <div style={formStyle}>
          <input placeholder="MARCA E MODELLO VEICOLO" style={inputStyle} onChange={e => setVehicleData({...vehicleData, brandModel: e.target.value.toUpperCase()})} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={labelStyle}>DATA IMMATRICOLAZIONE:</label>
            <button onClick={() => setUseManualDate(!useManualDate)} style={toggleBtn}>
              {useManualDate ? "USA CALENDARIO" : "INSERIMENTO MANUALE"}
            </button>
          </div>
          {useManualDate ? (
            <div style={{ display: 'flex', gap: '5px' }}>
              <input type="number" placeholder="GG" style={dateInput} onChange={e => setVehicleData({...vehicleData, day: e.target.value})} />
              <input type="number" placeholder="MM" style={dateInput} onChange={e => setVehicleData({...vehicleData, month: e.target.value})} />
              <input type="number" placeholder="AAAA" style={{...dateInput, flex: 2}} onChange={e => setVehicleData({...vehicleData, year: e.target.value})} />
            </div>
          ) : (
            <input type="date" value={vehicleData.fullDate} style={inputStyle} onChange={e => setVehicleData({...vehicleData, fullDate: e.target.value})} />
          )}
          <label style={labelStyle}>CHILOMETRI REALI (STIMA SE VUOTO):</label>
          <input type="number" style={inputStyle} onChange={e => setVehicleData({...vehicleData, km: e.target.value})} />
          <button onClick={saveVehicle} style={saveBtn}>SALVA</button>
          <button onClick={() => setView('main')} style={cancelBtn}>ANNULLA</button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <header style={{marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px'}}>
        <h2 style={{ color: '#00E676', margin: 0 }}>CARE AUTO PRO</h2>
        <span style={{fontSize: '10px', color: '#666'}}>DOMINIO: REGISTER.IT | ADS ATTIVE</span>
      </header>

      <div style={gridStyle}>
        <button onClick={() => setView('add_vehicle')} style={cardStyle}>
          <span style={iconStyle}>🚗</span>
          <br/>GESTISCI VEICOLO
        </button>
        
        <button onClick={() => window.open('https://www.google.com/maps', '_blank')} style={cardStyle}>
          <span style={iconStyle}>📍</span>
          <br/>NAVIGATORE
        </button>

        <button onClick={() => alert("MANUTENZIONE AUTOMATICA GENERATA")} style={cardStyle}>
          <span style={iconStyle}>🛠️</span>
          <br/>MANUTENZIONE
        </button>

        <button onClick={() => alert("ACCESSO PROFILO")} style={{...cardStyle, backgroundColor: '#FF5722'}}>
          <span style={iconStyle}>👤</span>
          <br/>IL MIO PROFILO
        </button>
      </div>

      <div style={adSpace}>AREA PUBBLICITARIA ADMOB / ADSENSE</div>
    </div>
  );
}

// STILI OTTIMIZZATI PER TUTTI I DISPOSITIVI
const containerStyle = { padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff', textTransform: 'uppercase', fontFamily: 'sans-serif' };
const headerStyle = { color: '#00E676', marginBottom: '20px' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' };
const cardStyle = { padding: '30px 10px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '15px', color: '#fff', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', textAlign: 'center' };
const iconStyle = { fontSize: '24px', marginBottom: '10px', display: 'block' };
const inputStyle = { padding: '18px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff', fontSize: '16px', marginBottom: '10px', width: '100%' };
const dateInput = { padding: '15px 5px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff', flex: 1, textAlign: 'center' };
const labelStyle = { fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '5px' };
const saveBtn = { padding: '20px', backgroundColor: '#00E676', border: 'none', borderRadius: '10px', color: '#000', fontWeight: 'bold', width: '100%', marginTop: '10px' };
const cancelBtn = { background: 'none', border: 'none', color: '#888', width: '100%', marginTop: '15px' };
const toggleBtn = { fontSize: '9px', color: '#00E676', background: 'none', border: '1px solid #00E676', borderRadius: '5px', padding: '5px' };
const adSpace = { marginTop: '30px', padding: '15px', background: '#080808', border: '1px dashed #333', textAlign: 'center', fontSize: '10px', color: '#444' };
const formStyle = { display: 'flex', flexDirection: 'column' };
