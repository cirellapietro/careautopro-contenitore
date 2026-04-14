
# 🚀 CareAutoPro - Guida alla Configurazione Professionale

Questa guida ti spiega come trasformare il tuo prototipo in un servizio professionale con i tuoi domini e la monetizzazione.

## 1. Configurazione Domini (Aruba, Cloudflare, ecc.)

Hai registrato domini come `careautopro.it` e `careautopro.com`. Ecco come collegarli:

1.  **Entra nella Console Firebase**: Vai su [console.firebase.google.com](https://console.firebase.google.com/) e seleziona il tuo progetto.
2.  **Sezione Hosting**: Nel menu a sinistra, clicca su **Hosting**.
3.  **Aggiungi Dominio**: Clicca sul pulsante **"Aggiungi dominio personalizzato"**.
4.  **Inserimento**: Digita `www.careautopro.it` (o il dominio che preferisci).
5.  **Verifica DNS**: Firebase ti mostrerà dei record (solitamente di tipo `A` o `TXT`).
    *   Copia i valori forniti.
    *   Vai sul pannello di gestione del tuo dominio (es. Aruba o Cloudflare).
    *   Cerca la sezione **Gestione DNS** e aggiungi i record indicati da Firebase.
6.  **Attesa**: Una volta salvati i DNS, possono volere da pochi minuti a qualche ora per la propagazione. Firebase attiverà automaticamente il certificato SSL (HTTPS) gratuito.

## 2. Configurazione AdSense (Pubblicità Web/PWA)

Per guadagnare dalle visite sul sito:

1.  **Iscrizione**: Crea un account su [google.com/adsense](https://www.google.com/adsense/start/).
2.  **Aggiungi Sito**: Inserisci `https://www.careautopro.it`.
3.  **Snippet di Codice**: AdSense ti darà un codice `<script>`.
4.  **Integrazione**: Ho già predisposto un componente `AdsBanner.tsx` nel progetto. Inserisci il tuo `data-ad-client` (ID Publisher) nelle variabili d'ambiente `.env`:
    *   `NEXT_PUBLIC_ADSENSE_CLIENT_ID=pub-XXXXXXXXXXXXXXXX`

## 3. Configurazione AdMob (Pubblicità nell'APK Android)

Per la monetizzazione dell'app scaricabile:

1.  **Iscrizione**: Vai su [apps.admob.com](https://apps.admob.com/).
2.  **Crea App**: Seleziona "Aggiungi App" -> Piattaforma: Android -> L'app è pubblicata? No.
3.  **ID Applicazione**: Copia l'App ID (formato `ca-app-pub-XXXX~XXXX`).
4.  **Crea Unità Pubblicitaria**: Scegli "Banner" e copia l'Ad Unit ID (formato `ca-app-pub-XXXX/XXXX`).
5.  **Codice**: Inserisci questi ID nelle variabili d'ambiente:
    *   `NEXT_PUBLIC_ADMOB_APP_ID=ca-app-pub-XXXXXXXX~XXXXXXXX`
    *   `NEXT_PUBLIC_AD_UNIT_ID_BANNER=ca-app-pub-XXXXXXXX/XXXXXXXX`

## 4. Pubblicazione delle Modifiche

Ogni volta che modifichi il codice o aggiungi ID pubblicitari:
1.  Esegui il build: `npm run build`
2.  Invia online: `firebase deploy --only hosting`

L'APK verrà rigenerato automaticamente su GitHub Actions ad ogni caricamento (push) del codice.

---
Progetto CareAutoPro - Sviluppato per la massima libertà di movimento.
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
