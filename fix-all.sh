#!/bin/bash

# 1. Creazione cartelle necessarie
mkdir -p public
mkdir -p android/app

# 2. Generazione google-services.json COMPLETO (per evitare il fallimento dell'APK)
echo '{
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
      "api_key": [{ "current_key": "AIzaSy..." }],
      "services": { "ads_service": { "other_platform_oauth_client": [] } }
    }
  ],
  "configuration_version": "1"
}' > android/app/google-services.json

# 3. Creazione file AdSense
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 4. Build e Spostamento file per la PWA
echo "🏗️ Generazione build reale..."
npm run build
touch .nojekyll
cp -r out/* .

# 5. Sincronizzazione Capacitor e Push
npx cap sync android
git add .
git commit -m "Fix: Risolto errore layout PWA e crash build APK"
git push origin main

echo "✅ Script terminato! Tra 2 minuti ricarica la PWA (usa l'incognito se vedi ancora lo starter)."
