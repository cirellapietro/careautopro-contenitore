import { db } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

/**
 * Calcola se un intervento è in scadenza basandosi sulle soglie del Caso d'Uso.
 * @param vehicleUUID ID immutabile del veicolo
 * @param tipo 'olio' | 'filtro_aria' | 'bollo' | 'assicurazione'
 * @param valoreAttuale km attuali o data odierna
 */
export const controllaScadenzaCustom = async (vehicleUUID: string, tipo: string, valoreAttuale: number | string) => {
  const configRef = doc(db, 'config_manutenzione', vehicleUUID, 'soglie', tipo);
  const snap = await getDoc(configRef);

  if (snap.exists()) {
    const { limite, sogliaAvviso } = snap.data();
    
    if (typeof valoreAttuale === 'number') {
      // Logica per KM (Olio, Filtri)
      const kmMancanti = limite - valoreAttuale;
      return kmMancanti <= (sogliaAvviso || 1000);
    } else {
      // Logica per Date (Bollo, Assicurazione)
      const oggi = new Date();
      const scadenza = new Date(valoreAttuale);
      const giorniMancanti = Math.ceil((scadenza.getTime() - oggi.getTime()) / (1000 * 3600 * 24));
      return giorniMancanti <= (sogliaAvviso || 15);
    }
  }
  return false;
};
