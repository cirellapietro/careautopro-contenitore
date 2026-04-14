#!/bin/bash

# 1. Configurazione AdSense e Firebase
mkdir -p public
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 2. Reinstallazione dipendenze (Risolve i problemi dell'APK)
echo "📦 Installazione dipendenze Capacitor..."
npm install
npm install @capacitor/android

# 3. Build pulita dell'applicazione
echo "🏗️ Generazione build Next.js..."
npm run build

# 4. FIX PWA: CSS e Navigazione 404
echo "🚚 Ottimizzazione per GitHub Pages..."
# Il file .nojekyll è fondamentale per caricare i CSS
touch .nojekyll

# Copia i file buildati nella root per renderli visibili
cp -rv out/* .

# Fix per i 404: facciamo in modo che GitHub rimandi sempre alla index
# così il router di Next.js può gestire Accedi e Registra
cp index.html 404.html

# 5. Sincronizzazione Android e Push
echo "📤 Invio correzioni finali..."
npx cap sync android
git add .
git commit -m "Fix: Ripristino CSS, gestione 404 PWA e dipendenze Capacitor"
git push origin main --force

echo "✅ Fatto! Tra 2 minuti ricarica la PWA in INCOGNITO."
