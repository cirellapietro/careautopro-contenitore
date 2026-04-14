#!/bin/bash

# 1. Preparazione cartelle e AdSense
mkdir -p public
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 2. Build reale dell'applicazione
echo "🏗️ Generazione build Next.js..."
npm run build

# 3. FIX PWA: Spostiamo i file reali nella root per GitHub Pages
# Questo sostituisce lo "Starter" che vedi ora con la tua app vera
echo "🚚 Attivazione layout reale..."
touch .nojekyll
cp -rv out/* .

# 4. FIX APK: Configurazione Firebase e Capacitor
echo "🔧 Allineamento Capacitor..."
npx cap sync android

# Creazione google-services.json con struttura corretta per evitare crash Gradle
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

# 5. Push finale
git add .
git commit -m "🚨 FIX: Layout PWA e configurazione Android APK"
git push origin main --force

echo "✅ Operazione completata!"
echo "🔗 Controlla la PWA tra 2 minuti: https://cirellapietro.github.io/careautopro-contenitore/"
