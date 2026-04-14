#!/bin/bash

# 1. Definizione della Chiave Reale
REAL_KEY="AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA"

echo "🔄 Avvio forzatura sincronizzazione Firebase..."

# 2. Sostituzione massiva della chiave in tutto il progetto
# Cerca ogni occorrenza della chiave temporanea e la sostituisce con quella reale
grep -rl "AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA" . | xargs sed -i "s/AIzaSyA8EwPnJ98V4C6d71b5faUjjDtc_dBJoQA/$REAL_KEY/g"

# 3. Pulizia e Build Next.js
echo "🏗️ Generazione build pulita..."
npm install
npm run build

# 4. Preparazione per GitHub Pages (PWA)
echo "🚚 Spostamento file per la pubblicazione..."
touch .nojekyll
cp -rv out/* .
cp index.html 404.html

# 5. Push finale su GitHub
echo "📤 Invio modifiche al repository..."
git config --global user.email "action@github.com"
git config --global user.name "github-actions"
git add .
git commit -m "🚨 FIX: Forzata sincronizzazione con API Key reale"
git push origin main --force

echo "✅ OPERAZIONE COMPLETATA!"
