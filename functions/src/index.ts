
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

/**
 * Daily vehicle synchronization task.
 * Runs every day at 3:00 AM to check for maintenance deadlines and send multi-channel notifications.
 */
export const dailyVehicleSync = functions.pubsub
  .schedule('0 3 * * *')
  .timeZone('Europe/Rome')
  .onRun(async (context) => {
    const veicoliSnapshot = await db.collectionGroup('vehicles').get();
    const oggi = new Date();

    for (const veicoloDoc of veicoliSnapshot.docs) {
      const vData = veicoloDoc.data();
      const adminId = vData.userId;
      const driverEmail = vData.driverEmail;
      if (!adminId) continue;

      // 1. Recupero Dati Amministratore Veicoli e sue preferenze
      const adminDoc = await db.collection('users').doc(adminId).get();
      const adminData = adminDoc.exists ? adminDoc.data() : null;
      const adminChannels = adminData?.notificationChannels || ['app', 'email'];

      // 2. Recupero Dati Conducente (se esistente) e sue preferenze
      let driverData: any = null;
      if (driverEmail) {
          const driverSnap = await db.collection('users').where('email', '==', driverEmail).limit(1).get();
          if (!driverSnap.empty) {
              driverData = driverSnap.docs[0].data();
          }
      }

      // Calcolo KM stimati per avvisi chilometrici (simulazione)
      const kmAnnui = vData.kmAnnuiPrevisti || 15000;
      const kmGiornalieriMedi = kmAnnui / 365;
      const ultimoUpdate = vData.updatedAt ? new Date(vData.updatedAt) : oggi;
      const giorniPassati = Math.max(1, Math.floor((oggi.getTime() - ultimoUpdate.getTime()) / (1000 * 3600 * 24)));
      const kmStimati = (vData.currentMileage || 0) + (kmGiornalieriMedi * giorniPassati);

      const interventiRef = veicoloDoc.ref.collection('maintenanceInterventions');
      const interventiSnap = await interventiRef.where('dataoraelimina', '==', null).get();

      for (const intDoc of interventiSnap.docs) {
        const iData = intDoc.data();
        if (iData.status === 'Completato') continue;

        let isInScadenza = false;
        let motivo = "";
        
        // Controllo scadenze temporali basate sul preavviso dell'admin
        if (iData.scheduledDate) {
          const scadenza = new Date(iData.scheduledDate);
          const giorniMancanti = Math.ceil((scadenza.getTime() - oggi.getTime()) / (1000 * 3600 * 24));
          if (giorniMancanti <= (adminData?.notificationReminderTime || 15)) {
              isInScadenza = true;
              motivo = `SCADENZA TRA ${giorniMancanti} GIORNI`;
          }
        }

        // Controllo scadenze chilometriche
        if (!isInScadenza && iData.scheduledMileage) {
            const kmMancanti = iData.scheduledMileage - kmStimati;
            if (kmMancanti <= 1000) {
                isInScadenza = true;
                motivo = `TRA CIRCA ${Math.round(kmMancanti)} KM`;
            }
        }

        if (isInScadenza) {
          const message = `CAREAUTOPRO: MANUTENZIONE "${iData.description.toUpperCase()}" PER ${vData.name.toUpperCase()}. ${motivo}.`;
          
          // NOTIFICA ALL'AMMINISTRATORE (Secondo i suoi canali: App, Email, WhatsApp, SMS)
          await db.collection('users').doc(adminId).collection('alerts').add({
              userId: adminId,
              message,
              type: 'maintenance',
              timestamp: oggi.toISOString(),
              isRead: false,
              dataoraelimina: null,
              sentTo: adminChannels // Canali scelti dall'admin
          });

          // NOTIFICA AL CONDUCENTE (Secondo i suoi canali preferiti)
          if (driverData) {
              const driverChannels = driverData.notificationChannels || ['app', 'email'];
              await db.collection('users').doc(driverData.id).collection('alerts').add({
                  userId: driverData.id,
                  message: `${message} (VEICOLO ASSEGNATO)`,
                  type: 'maintenance',
                  timestamp: oggi.toISOString(),
                  isRead: false,
                  dataoraelimina: null,
                  sentTo: driverChannels // Canali scelti dal conducente
              });
          }

          // Aggiornamento stato intervento sul veicolo
          await intDoc.ref.update({ status: 'Richiesto', urgency: 'Alta' });
        }
      }
    }
    return null;
  });
