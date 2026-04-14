"use client";
import React, { useState } from 'react';

export default function Dashboard() {
  const [view, setView] = useState('main');
  const [useManualDate, setUseManualDate] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  
  const [vehicleData, setVehicleData] = useState({ 
    brandModel: '', 
    fullDate: today,
    day: new Date().getDate().toString(),
    month: (new Date().getMonth() + 1).toString(),
    year: new Date().getFullYear().toString(),
    km: '',
    trackGps: false,
    trackHotspot: false
  });

  const saveVehicle = () => {
    const finalDate = useManualDate 
      ? `${vehicleData.year}-${vehicleData.month.padStart(2, '0')}-${vehicleData.day.padStart(2, '0')}`
      : vehicleData.fullDate;
    
    alert("VEICOLO SALVATO: " + vehicleData.brandModel.toUpperCase());
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
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={labelStyle}>DATA IMMATRICOLAZIONE:</label>
            <button 
              onClick={() => setUseManualDate(!useManualDate)}
              style={{ fontSize: '9px', color: '#00E676', background: 'none', border: '1px solid #00E676', borderRadius: '5px', padding: '2px 5px' }}
            >
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
            <input 
              type="date" 
              value={vehicleData.fullDate} 
              style={inputStyle} 
              onChange={e => setVehicleData({...vehicleData, fullDate: e.target.value})} 
            />
          )}
          
          <label style={labelStyle}>CHILOMETRI REALI (SE VUOTO STIMA APPROSSIMATIVA):</label>
          <input type="number" style={inputStyle} onChange={e => setVehicleData({...vehicleData, km: e.target.value})} />
          
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
        <button onClick={() => alert("MOSTRA STORICO")} style={btnStyle}>🛠️ MANUTENZIONE</button>
      </div>
    </div>
  );
}

const containerStyle = { padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff', textTransform: 'uppercase' };
const headerStyle = { color: '#00E676', borderBottom: '1px solid #222', paddingBottom: '10px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' };
const inputStyle = { padding: '18px', borderRadius: '10px', border: '1px solid #333', background: '#111', color: '#fff', fontSize: '16px', textTransform: 'uppercase' };
const dateInput = { ...inputStyle, flex: 1, textAlign: 'center', padding: '15px 5px' };
const labelStyle = { fontSize: '10px', color: '#aaa', marginBottom: '-5px' };
const checkRow = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' };
const btnStyle = { padding: '20px', backgroundColor: '#151515', border: '1px solid #333', borderRadius: '15px', color: '#fff', fontWeight: 'bold' };
const saveBtn = { padding: '22px', backgroundColor: '#00E676', border: 'none', borderRadius: '10px', color: '#000', fontWeight: 'bold', fontSize: '18px' };
const cancelBtn = { background: 'none', border: 'none', color: '#888', marginTop: '10px' };
