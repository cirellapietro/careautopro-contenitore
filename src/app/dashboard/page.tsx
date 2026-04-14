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
    alert("VEICOLO " + vehicleData.brandModel.toUpperCase() + " SALVATO!");
    setView('main');
  };

  // SCHERMATA: I MIEI VEICOLI
  if (view === 'add_vehicle') {
    return (
      <div style={containerStyle}>
        <h3 style={headerStyle}>I MIEI VEICOLI</h3>
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
          <button onClick={() => setView('main')} style={cancelBtn}>← TORNA ALLA DASHBOARD</button>
        </div>
      </div>
    );
  }

  // SCHERMATA: COPILOTA / NAVIGATORE
  if (view === 'copilota') {
    return (
      <div style={containerStyle}>
        <h3 style={headerStyle}>COPILOTA / NAVIGATORE</h3>
        <div style={gridStyle}>
          <button onClick={() => window.open('https://maps.google.com/?q=caffe+vicino+a+me', '_blank')} style={cardStyle}>☕ CERCA CAFFÈ</button>
          <button onClick={() => window.open('https://maps.google.com/?q=bagni+pubblici', '_blank')} style={cardStyle}>🚾 CERCA BAGNO</button>
          <button onClick={() => window.open('https://maps.google.com/?q=benzinaio', '_blank')} style={cardStyle}>⛽ RIFORNIMENTO</button>
          <button onClick={() => window.open('https://maps.google.com/?q=ristorante', '_blank')} style={cardStyle}>🍴 RISTORANTE</button>
        </div>
        <button onClick={() => setView('main')} style={cancelBtn}>← TORNA ALLA DASHBOARD</button>
      </div>
    );
  }

  // SCHERMATA: MANUTENZIONE
  if (view === 'manutenzione') {
    return (
      <div style={containerStyle}>
        <h3 style={headerStyle}>STORICO MANUTENZIONE</h3>
        <div style={{ padding: '20px', background: '#111', borderRadius: '10px', textAlign: 'center', border: '1px dashed #333' }}>
          <p style={{ color: '#aaa', fontSize: '12px' }}>NESSUN VEICOLO SELEZIONATO O DATI MANCANTI.</p>
        </div>
        <button onClick={() => setView('main')} style={cancelBtn}>← TORNA ALLA DASHBOARD</button>
      </div>
    );
  }

  // SCHERMATA: PROFILO
  if (view === 'profilo') {
    return (
      <div style={containerStyle}>
        <h3 style={headerStyle}>IL MIO PROFILO</h3>
        <div style={{ padding: '20px', background: '#111', borderRadius: '10px', border: '1px solid #333' }}>
          <p style={{ margin: '5px 0', fontSize: '14px' }}>AUTISTA: <span style={{color:'#00E676'}}>ADMIN</span></p>
          <p style={{ margin: '5px 0', fontSize: '12px', color: '#aaa' }}>DB: ROMATAXIHUB</p>
        </div>
        <button onClick={() => setView('main')} style={cancelBtn}>← TORNA ALLA DASHBOARD</button>
      </div>
    );
  }

  // DASHBOARD PRINCIPALE
  return (
    <div style={containerStyle}>
      <header style={{marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px'}}>
        <h2 style={{ color: '#00E676', margin: 0 }}>CARE AUTO PRO</h2>
        <span style={{fontSize: '10px', color: '#666'}}>DOMINIO: REGISTER.IT | ADS ATTIVE</span>
      </header>

      <div style={gridStyle}>
        <button onClick={() => setView('add_vehicle')} style={cardStyle}>
          <span style={iconStyle}>🚗</span>
          <br/>I MIEI VEICOLI
        </button>
        
        <button onClick={() => setView('copilota')} style={cardStyle}>
          <span style={iconStyle}>📍</span>
          <br/>COPILOTA / NAVIGATORE
        </button>

        <button onClick={() => setView('manutenzione')} style={cardStyle}>
          <span style={iconStyle}>🛠️</span>
          <br/>MANUTENZIONE
        </button>

        <button onClick={() => setView('profilo')} style={cardStyle}>
          <span style={iconStyle}>👤</span>
          <br/>IL MIO PROFILO
        </button>
      </div>

      <div style={adSpace}>AREA PUBBLICITARIA ADMOB / ADSENSE</div>
    </div>
  );
}

// STILI OTTIMIZZATI
const containerStyle = { padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff', textTransform: 'uppercase', fontFamily: 'sans-serif' };
const headerStyle = { color: '#00E676', marginBottom: '20px', borderBottom: '1px solid #222', paddingBottom: '10px' };
const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' };
const cardStyle = { padding: '30px 10px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '15px', color: '#fff', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer', textAlign: 'center' };
const iconStyle = { fontSize: '24px', marginBottom: '10px', display: 'block' };
const inputStyle = { padding: '18px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff', fontSize: '16px', marginBottom: '10px', width: '100%', boxSizing: 'border-box', textTransform: 'uppercase' };
const dateInput = { padding: '15px 5px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff', flex: 1, textAlign: 'center' };
const labelStyle = { fontSize: '10px', color: '#aaa', display: 'block', marginBottom: '5px' };
const saveBtn = { padding: '20px', backgroundColor: '#00E676', border: 'none', borderRadius: '10px', color: '#000', fontWeight: 'bold', width: '100%', marginTop: '10px', fontSize: '16px' };
const cancelBtn = { padding: '15px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '10px', color: '#aaa', width: '100%', marginTop: '20px', fontSize: '12px', cursor: 'pointer' };
const toggleBtn = { fontSize: '9px', color: '#00E676', background: 'none', border: '1px solid #00E676', borderRadius: '5px', padding: '5px' };
const adSpace = { marginTop: '30px', padding: '15px', background: '#080808', border: '1px dashed #333', textAlign: 'center', fontSize: '10px', color: '#444' };
const formStyle = { display: 'flex', flexDirection: 'column' };
