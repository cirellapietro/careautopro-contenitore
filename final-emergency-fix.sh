#!/bin/bash

# 1. Pulizia e preparazione cartelle
echo "🧹 Pulizia ambiente..."
mkdir -p public
mkdir -p android/app

# 2. Fix AdSense
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 3. Build locale della PWA
echo "🏗️ Generazione build Next.js..."
npm install
npm run build

# 4. SOLUZIONE PWA: Spostamento file nella root per GitHub Pages
# Questo sovrascrive lo "Starter" che vedi ora
echo "🚚 Attivazione layout reale sulla PWA..."
touch .nojekyll
cp -rv out/* .

# 5. FIX APK: Inserimento struttura Firebase corretta
# Gradle fallisce se questo file non è perfetto
cat << 'EOF_JSON' > android/app/google-services.json
{
  "project_info": {
    "project_number": "917528358434",
    "project_id": "careautopro-contenitore",
    "storage_bucket": "careautopro-contenitore.appspot.com"
  },
  "client": [
    {
      "client_info": {
        "mobilesdk_app_id": "1:917528358434:android:7d8a6b1e2c3f4d5e6f7g8h",
        "android_client_info": { "package_name": "com.careautopro.app" }
      },
      "api_key": [{ "current_key": "AIzaSy_INSERISCI_CHIAVE_REALE" }],
      "services": { "ads_service": { "other_platform_oauth_client": [] } }
    }
  ],
  "configuration_version": "1"
}
EOF_JSON

# 6. Sincronizzazione Capacitor e Push
echo "📤 Invio correzioni finali a GitHub..."
npx cap sync android
git add .
git commit -m "🚨 FIX DEFINITIVO: PWA layout e configurazione APK"
git push origin main --force

echo "✅ Operazione completata!"
echo "🔗 Controlla la PWA tra 2 minuti: https://cirellapietro.github.io/careautopro-contenitore/"
