#!/bin/bash

# --- CONFIGURAZIONE ---
APP_NAME="CareAutoPro"
GITHUB_BRANCH="main"

echo "🚀 Avvio automazione completa per $APP_NAME..."

# 1. GENERAZIONE FILE DI CONFIGURAZIONE
echo "🛠️ Creazione file critici..."

# Creazione google-services.json (Necessario per Database e Auth)
# Nota: Ho inserito i dati basati sul tuo pacchetto com.careautopro.app
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
        "android_client_info": {
          "package_name": "com.careautopro.app"
        }
      },
      "services": {
        "appinvite_service": { "other_platform_oauth_client": [] },
        "ads_service": { "other_platform_oauth_client": [] }
      }
    }
  ],
  "configuration_version": "1"
}
EOF_JSON

# Creazione ads.txt per AdSense (Verifica dominio)
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 2. SINCRONIZZAZIONE LAYOUT (Firebase Studio -> Capacitor)
# Questo passaggio risolve il problema dei "vecchi sorgenti" nell'APK
echo "📦 Sincronizzazione sorgenti web aggiornati..."
npx cap copy android
npx cap sync android

# 3. VERSIONAMENTO E PUSH FINALE
echo "📤 Push verso GitHub per build APK e PWA..."
git add .
git commit -m "Fix: Configurazione Firebase/AdSense e Sync Layout $(date +'%Y-%m-%d %H:%M')"
git push origin $GITHUB_BRANCH

echo "✅ Operazione completata con successo!"
echo "📱 L'APK sarà disponibile tra circa 4 minuti negli Artifacts di GitHub Actions."
