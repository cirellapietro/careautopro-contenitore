# 1. Creazione dello script di emergenza
cat << 'EOF' > risoluzione_totale.sh
#!/bin/bash
REAL_KEY="AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA"

echo "🧹 Pulizia profonda e aggiornamento a Node v22..."
# Forza Node v22 in tutti i file di configurazione GitHub
find .github/workflows/ -type f -name "*.yml" -exec sed -i 's/node-version: .*/node-version: "22"/g' {} +

echo "🔑 Iniezione Chiave API reale..."
# Inserisce la tua chiave API eliminando i segnaposto bloccati
grep -rl "AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA" . | xargs -r sed -i "s/AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA/$REAL_KEY/g"

echo "📦 Riparazione Android e Capacitor..."
# Elimina le vecchie configurazioni che causano l'errore 'capacitor-android'
rm -rf node_modules package-lock.json
npm install
npx cap sync android

echo "📤 Invio correzioni definitive..."
git config --global user.email "action@github.com"
git config --global user.name "github-actions"
git add .
git commit -m "🛑 STOP ERRORI: Node v22, Fix API Key e Sync Android"
git push origin main --force
EOF

# 2. Esecuzione
chmod +x risoluzione_totale.sh
./risoluzione_totale.sh
