#!/bin/bash

# 1. Configurazione AdSense e Firebase
mkdir -p public
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 2. Build pulita dell'applicazione
echo "🏗️ Generazione build Next.js..."
npm run build

# 3. FIX CSS E 404: Spostamento e configurazione per GitHub Pages
echo "🚚 Ottimizzazione per GitHub Pages..."
# Impedisce a GitHub di bloccare le cartelle CSS/JS che iniziano con underscore
touch .nojekyll
# Copia i file reali nella root
cp -rv out/* .

# Fix per i 404: Crea copie delle pagine html per i percorsi diretti
# Se hai una pagina /login, GitHub Pages cerca login.html
cp out/index.html 404.html

# 4. Sincronizzazione Android e Push
echo "📤 Invio correzioni finali..."
npx cap sync android
git add .
git commit -m "Fix: Ripristino CSS e gestione rotte 404 PWA"
git push origin main --force

echo "✅ Operazione completata! Svuota la cache del browser per vedere il CSS."
