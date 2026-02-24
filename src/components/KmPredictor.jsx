import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const KmPredictor = ({ veicoloId, utenteId }) => {
  const [stima, setStima] = useState(0);
  const [veicolo, setVeicolo] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data: v } = await supabase
        .from('veicoli')
        .select('*, tipoveicoli(*, controlliperiodici(*))')
        .eq('veicolo_id', veicoloId)
        .single();

      if (v) {
        setVeicolo(v);
        const calcolato = calcolaKM(v);
        setStima(calcolato);
        checkAndNotify(v, calcolato);
      }
    };
    init();
  }, [veicoloId]);

  const calcolaKM = (v) => {
    const oggi = new Date();
    const dataRif = v.kmeffettividataorainserimento ? new Date(v.kmeffettividataorainserimento) : new Date();
    const giorni = Math.max(1, Math.floor((oggi - dataRif) / (1000 * 60 * 60 * 24)));
    
    const media365 = (v.kmanno || 15000) / 365;
    const mediaGPS = v.kmdagps ? (v.kmdagps / giorni) : media365;
    const ponderata = (mediaGPS * 0.7) + (media365 * 0.3);

    return Math.round((v.kmeffettivi || 0) + (ponderata * giorni));
  };

  const checkAndNotify = async (v, km) => {
    const { data: pref } = await supabase.from('tipo_notifica').select('*').eq('utente_id', v.utente_id);
    if (!pref || pref.length === 0) return;

    for (const ctrl of v.tipoveicoli.controlliperiodici) {
      const residuo = ctrl.frequenzakm - (km % ctrl.frequenzakm);
      if (residuo < 1000) {
        await supabase.from('avviso_notifiche').upsert({
          veicolo_id: v.veicolo_id,
          utente_id: v.utente_id,
          descrizione: `${ctrl.descrizione}: necessario tra ${residuo} km`,
          stato: residuo < 200 ? 'URGENTE' : 'NECESSARIO',
          data_ora: new Date().toISOString()
        }, { onConflict: 'veicolo_id,descrizione' });
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-[2rem] shadow-xl border border-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-black text-gray-800">{stima.toLocaleString()} <span className="text-sm font-normal text-gray-400">KM</span></h2>
        <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">Stima Predittiva Attiva</p>
      </div>
      <button 
        onClick={async () => {
          await supabase.from('veicoli').update({ kmeffettivi: stima, kmeffettividataorainserimento: new Date().toISOString() }).eq('veicolo_id', veicoloId);
          alert("Dati Sincronizzati");
        }}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
      >
        CONFERMA KM ATTUALI
      </button>
    </div>
  );
};

export default KmPredictor;
