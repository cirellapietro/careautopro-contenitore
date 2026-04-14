'use client';
import { db } from '@/lib/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const fetchAndPopulateVehicleData = async (marca: string, modello: string, tipoVeicoloId: string) => {
  const modelKey = `${marca}_${modello}`.toLowerCase().replace(/\s/g, '_');
  const configRef = doc(db, 'config_controlli_periodici', modelKey);
  const snap = await getDoc(configRef);
  
  if (!snap.exists()) {
    const controlliBase = [
      { nome: 'Cambio Olio', intervalloKm: 20000, intervalloMesi: 12, sogliaPreavviso: 1000 },
      { nome: 'Assicurazione', intervalloKm: 0, intervalloMesi: 12, sogliaPreavviso: 15 },
      { nome: 'Bollo', intervalloKm: 0, intervalloMesi: 12, sogliaPreavviso: 15 }
    ];
    await setDoc(configRef, { 
        marca: marca.toUpperCase(), 
        modello: modello.toUpperCase(), 
        tipoVeicoloId, 
        controlli: controlliBase,
        dataoraaggiornamento: new Date().toISOString()
    });
  }
  return modelKey;
};
