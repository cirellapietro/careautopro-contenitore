"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function KmPredictor({ veicoloId, utenteId }) {
  const [stima, setStima] = useState(0);

  useEffect(() => {
    const fetchPredict = async () => {
      const { data: v } = await supabase
        .from('veicoli')
        .select('*, tipoveicoli(*, controlliperiodici(*))')
        .eq('veicolo_id', veicoloId)
        .single();

      if (v) {
        const oggi = new Date();
        const dataRif = v.kmeffettividataorainserimento ? new Date(v.kmeffettividataorainserimento) : oggi;
        const giorni = Math.max(1, Math.floor((oggi - dataRif) / (1000 * 60 * 60 * 24)));
        const media365 = (v.kmanno || 15000) / 365;
        const mediaGPS = v.kmdagps ? (v.kmdagps / giorni) : media365;
        const ponderata = (mediaGPS * 0.7) + (media365 * 0.3);
        setStima(Math.round((v.kmeffettivi || 0) + (ponderata * giorni)));
      }
    };
    fetchPredict();
  }, [veicoloId]);

  const updateKm = async () => {
    await supabase.from('veicoli').update({ 
      kmeffettivi: stima, 
      kmeffettividataorainserimento: new Date().toISOString(),
      kmattuali: stima 
    }).eq('veicolo_id', veicoloId);
    alert("Kilometraggio sincronizzato!");
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-md border text-center">
      <h2 className="text-4xl font-black text-slate-800 my-2">{stima.toLocaleString()} km</h2>
      <button onClick={updateKm} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-4">
        CONFERMA REALE
      </button>
    </div>
  );
}
