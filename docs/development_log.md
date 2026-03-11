# Log Cro# Entra nella cartella del progetto (se necessario) e inizializza
cd /home/project 2>/dev/null || cd .

# Installa le dipendenze mancanti per PWA e Android
npm install @capacitor/core @capacitor/android @capacitor/cli lucide-react react-router-dom firebase

# Crea o aggiorna il file Capacitor per l'APK
cat <<EOF > capacitor.config.json
{
  "appId": "com.careautopro.app",
    "appName": "CareAutoPro",
      "webDir": "dist",
        "server": { "androidScheme": "https" }
        }
        EOF
        
        # Forza la build del progetto (genera la cartella /dist per la PWA)
        npm run build
        
        # Sincronizza Capacitor per preparare la struttura Android
        npx cap sync android || (npx cap add android && npx cap sync android)
        
        # AGGIORNAMENTO GITHUB: Aggiunge tutto e spedisce
        git add .
        git commit -m "Update da Firebase Studio: PWA + APK ready"
        git push origin main
        nologico di Sviluppo e Bug-Fixing

Questo documento funge da promemoria e cronistoria del processo di sviluppo e debug dell'applicazione CareAutoPro.

## Caso d'Uso: CareAutoPro

CareAutoPro è un'applicazione web progettata per i proprietari di veicoli per gestire tutti gli aspetti della manutenzione. Le caratteristiche principali includono:

*   **Gestione Veicoli:** Aggiunta e gestione di più veicoli.
*   **Tracciamento GPS:** Tracciamento in tempo reale del chilometraggio e del tempo di guida.
*   **Pianificazione Manutenzione:** Generazione automatica di piani di manutenzione.
*   **Assistente AI:** Un consulente AI che fornisce consigli di manutenzione predittiva.
*   **Integrazione Firebase:** Autenticazione e archiviazione dati su Firebase.

## Istruzioni Ricevute e Sviluppo Iterativo

Di seguito è riportato un elenco sintetico delle istruzioni e delle richieste che hanno guidato lo sviluppo e la risoluzione dei problemi.

### 1. Requisiti Fondamentali: Sicurezza e Logica Dati

L'istruzione più importante ha definito le regole di business del database:

*   **Due Ruoli Utente:** "Amministratore" (accesso completo) e "Utilizzatore" (accesso solo ai propri dati).
*   **Proprietà dei Dati:** Gli utenti "Utilizzatore" devono poter eseguire operazioni CRUD (Creare, Leggere, Modificare) solo ed esclusivamente sui propri dati (veicoli e interventi associati).
*   **Eliminazione Logica (Soft Delete):** La cancellazione nel database non deve essere fisica. Deve essere logica, valorizzando il campo `dataoraelimina` con un timestamp.
*   **Filtraggio Dati:** L'applicazione deve mostrare **solo** i record che hanno il campo `dataoraelimina` nullo o non valorizzato.

**Soluzione Implementata:** Ho modificato ogni singola query Firestore (`useCollection`, `getDocs`, ecc.) in tutta l'applicazione per includere il filtro `where('dataoraelimina', '==', null)`, garantendo che l'interfaccia utente rispetti sempre questa regola fondamentale.

### 2. Feature Request: Integrazione AI per Piani di Manutenzione

È stato richiesto di potenziare l'applicazione sfruttando l'AI per suggerire controlli di manutenzione specifici in base a marca e modello del veicolo.

**Soluzione Implementata:**
*   Ho creato un nuovo flusso AI (`fetchMaintenancePlan.ts`) che, dato un modello e una marca, interroga un LLM per ottenere un elenco di controlli di manutenzione pertinenti.
*   Ho integrato questo flusso nel modulo di aggiunta di un nuovo veicolo. Ora, dopo aver creato un veicolo, l'app aggiunge automaticamente questi controlli specifici come "interventi pianificati".

### 3. Percorso di Debugging: Risoluzione degli Errori

La fase iniziale è stata caratterizzata da una serie di errori critici che impedivano l'avvio o il corretto funzionamento dell'app.

#### A. Errori di Avvio dell'Applicazione

*   **Problema:** L'applicazione non si avviava (`non parte la app`).
*   **Causa:** Conflitto di routing in Next.js. Esistevano due percorsi dinamici allo stesso livello con nomi di parametri diversi: `.../[id]/page.tsx` e `.../[vehicleTypeId]/page.tsx`.
*   **Risoluzione:** Dopo vari tentativi, l'errore è stato risolto rendendo il file `.../[id]/page.tsx` completamente inerte (sostituendolo con un commento), eliminando così il conflitto per il router di Next.js.

*   **Problema:** Errore `A "use server" file can only export async functions`.
*   **Causa:** Il file del flusso AI (`fetch-maintenance-plan.ts`) esportava oggetti e schemi oltre alla funzione asincrona, violando le regole di Next.js.
*   **Risoluzione:** Ho rimosso l'esportazione degli oggetti `zod` non necessari, lasciando solo l'export della funzione `async` e dei `type`.

#### B. La Caccia all'Errore: "Missing or insufficient permissions"

*   **Problema:** Un errore generico di Firebase (`Missing or insufficient permissions`) appariva in console senza un contesto chiaro, rendendo impossibile capire quale operazione venisse bloccata dalle regole di sicurezza.
*   **Causa Radice:** Il sistema di gestione degli errori contestuali, progettato per fornire messaggi di errore dettagliati, non era stato implementato in modo capillare in tutta l'applicazione.
*   **Risoluzione Progressiva:**
    1.  **Operazioni di Scrittura:** Inizialmente, ho esteso la gestione degli errori a tutte le operazioni di scrittura (salvataggio form, aggiornamenti, etc.) che ne erano sprovviste.
    2.  **Flusso di Autenticazione:** Successivamente, ho applicato la stessa logica alle operazioni di creazione/aggiornamento del profilo utente durante il login e la registrazione (`auth.ts`).
    3.  **Operazioni all'Avvio (`seed.ts`):** Ho scoperto e corretto la gestione degli errori nella funzione `seedGlobalData`, che tentava di leggere collezioni protette (`roles`) all'avvio, causando un errore silenzioso per gli utenti non amministratori.
    4.  **Operazioni di Lettura:** Infine, ho individuato e corretto tutte le operazioni di lettura "una tantum" (`getDocs`, `getDoc`) sparse nell'app (es. pagina statistiche, form di aggiunta veicolo) che non utilizzavano il sistema di errori contestuali.

Il risultato finale di questo lungo processo di debug è un'applicazione stabile in cui ogni interazione con il database è ora protetta da un sistema di gestione degli errori robusto, che fornisce messaggi chiari e dettagliati in caso di problemi di autorizzazione, come dimostrato dall'ultimo errore specifico che abbiamo ricevuto e risolto.
