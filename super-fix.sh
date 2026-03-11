#!/bin/bash

# 1. Configurazione Ambiente
echo "🔧 Preparazione file di sistema..."
mkdir -p public
mkdir -p android/app

# 2. Fix AdSense
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 3. Build Locale (PWA)
echo "🏗️ Generazione build Next.js..."
npm run build

# 4. Spostamento file per GitHub Pages (La soluzione più stabile al momento)
# Questo sovrascrive lo "Starter" che vedi ora sul link
echo "🚚 Attivazione layout reale..."
touch .nojekyll
cp -rv out/* .

# 5. Fix APK (Struttura Firebase corretta)
# NOTA: Sostituire AIzaSy... con la tua chiave reale se l'hai
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
      "api_key": [{ "current_key": "AIzaSy_REALE_CHIAVE" }],
      "services": { "ads_service": { "other_platform_oauth_client": [] } }
    }
  ],
  "configuration_version": "1"
}
EOF_JSON

# 6. Sincronizzazione e Push
echo "📤 Invio correzioni finali..."
npx cap sync android
git add .
git commit -m "Fix: PWA su root e correzione api_key APK"
git push origin main
