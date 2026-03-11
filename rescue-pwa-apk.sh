#!/bin/bash

# 1. Installazione componenti Android (Risolve l'errore dell'APK)
echo "📦 Installazione librerie Android..."
npm install @capacitor/android @capacitor/core
npx cap add android || echo "Android già presente"

# 2. Build pulita dell'app
echo "🏗️ Generazione build Next.js..."
npm run build

# 3. FIX GRAFICA E 404 (Sblocca CSS e link)
echo "🚚 Ottimizzazione per GitHub Pages..."
# Il file .nojekyll dice a GitHub di NON ignorare i CSS
touch .nojekyll
# Copia i file reali nella cartella principale
cp -rv out/* .
# Il file 404.html permette ai tasti Accedi/Registra di funzionare
cp index.html 404.html

# 4. Sincronizzazione e Push finale
echo "📤 Invio correzioni a GitHub..."
npx cap sync android
git add .
git commit -m "🚨 FIX: Ripristino CSS, Rotte 404 e dipendenze Android"
git push origin main --force

echo "✅ OPERAZIONE COMPLETATA!"
