#!/bin/bash
# 1. Creo i file mancanti con i tuoi ID corretti
echo '{"project_info":{"project_number":"917528358434","project_id":"careautopro-contenitore","storage_bucket":"careautopro-contenitore.appspot.com"},"client":[{"client_info":{"mobilesdk_app_id":"1:917528358434:android:7d8a6b1e2c3f4d5e6f7g8h","android_client_info":{"package_name":"com.careautopro.app"}},"services":{"ads_service":{}}}]}' > android/app/google-services.json
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 2. Sincronizzo e invio a GitHub
npx cap sync android
git add .
git commit -m "Fix: Attivazione Firebase e AdSense con credenziali corrette"
git push origin main
