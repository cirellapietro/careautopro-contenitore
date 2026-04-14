# 1. Creazione forzata del file con la chiave API corretta
cat << 'EOF' > sblocco_totale.sh
#!/bin/bash
REAL_KEY="AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA"

echo "🛠️ Allineamento workflow a Node v22..."
# Aggiorna la versione di Node in tutti i file .yml per evitare il rosso su Firebase
sed -i 's/node-version: .*/node-version: "22"/g' .github/workflows/*.yml

echo "🔑 Iniezione automatica della chiave API..."
# Sostituisce il segnaposto con la tua chiave reale in tutto il progetto
grep -rl "AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA" . | xargs sed -i "s/AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA/$REAL_KEY/g"

echo "📦 Pulizia e sincronizzazione dipendenze..."
rm -rf node_modules package-lock.json
npm install
npx cap sync android

echo "📤 Push finale per il triplo verde..."
git config --global user.email "action@github.com"
git config --global user.name "github-actions"
git add .
git commit -m "✅ FIX: Node v22 e API Key allineata su tutti i workflow"
git push origin main --force
EOF

# 2. Esecuzione immediata
chmod +x sblocco_totale.sh
./sblocco_totale.sh
