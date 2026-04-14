import { db } from './firebaseConfig';
import { collectionGroup, getDocs, updateDoc, doc, collection } from 'firebase/firestore';

export const ricalcoloGiornalieroInterventi = async () => {
  const veicoliSnapshot = await getDocs(collectionGroup(db, 'vehicles'));

  for (const veicoloDoc of veicoliSnapshot.docs) {
    const vData = veicoloDoc.data();
    if (vData.dataoraelimina) continue;

    const vehicleUUID = veicoloDoc.id;
    const ownerUUID = vData.userId;
    if (!ownerUUID) continue;

    // Calcolo KM stimati (percorrenza "fantasma" basata su media annua)
    const kmAnnui = vData.kmAnnuiPrevisti || 15000;
    const kmGiornalieriMedi = kmAnnui / 365;
    const oggi = new Date();
    const ultimoUpdate = vData.updatedAt ? new Date(vData.updatedAt) : oggi;
    const giorniPassati = Math.max(1, Math.floor((oggi.getTime() - ultimoUpdate.getTime()) / (1000 * 3600 * 24)));
    const kmStimatiAttuali = (vData.currentMileage || 0) + (kmGiornalieriMedi * giorniPassati);

    const interventiRef = collection(db, 'users', ownerUUID, 'vehicles', vehicleUUID, 'maintenanceInterventions');
    const interventiSnap = await getDocs(interventiRef);

    interventiSnap.forEach(async (intDoc) => {
      const iData = intDoc.data();
      if (iData.dataoraelimina || iData.status === 'Completato') return;

      let alertNecessario = false;
      let motivo = "";

      // 1. Controllo TEMPORALE (Bollo, Assicurazione, Revisione)
      if (iData.scheduledDate) {
        const dataScadenza = new Date(iData.scheduledDate);
        const giorniAlLimite = Math.ceil((dataScadenza.getTime() - oggi.getTime()) / (1000 * 3600 * 24));
        if (giorniAlLimite <= 15) { // Soglia default 15gg
          alertNecessario = true;
          motivo = `SCADENZA TRA ${giorniAlLimite} GIORNI`;
        }
      }

      // 2. Controllo CHILOMETRICO (Olio, Filtri, Freni)
      if (!alertNecessario && iData.scheduledMileage) {
        const kmMancanti = iData.scheduledMileage - kmStimatiAttuali;
        if (kmMancanti <= 1000) {
          alertNecessario = true;
          motivo = `MANUTENZIONE TRA CIRCA ${Math.round(kmMancanti)} KM`;
        }
      }

      if (alertNecessario) {
        await updateDoc(intDoc.ref, { 
          status: 'Richiesto', 
          urgency: 'Alta',
          notes: (iData.notes || "") + " [AUTO-GENERATO: " + motivo + "]",
          ultimaVerificaBatch: oggi.toISOString() 
        });
      }
    });
  }
};
