#!/bin/bash

# 1. Assicuriamoci che i file siano buildati correttamente
echo "🏗️ Generazione build statica da Firebase Studio..."
npm run build

# 2. Pulizia e preparazione della root per GitHub Pages
# Copiamo il contenuto di 'out' (il vero sito) nella cartella principale
echo "🚚 Spostamento file per il deploy..."
cp -r out/* .

# 3. Creazione del file .nojekyll (Fondamentale per Next.js su GitHub)
# Senza questo, GitHub ignora le cartelle che iniziano con underscore (come _next)
touch .nojekyll

# 4. Push dei file corretti
echo "📤 Caricamento del nuovo layout su GitHub..."
git add .
git commit -m "Fix PWA: Spostamento file da out a root e aggiunta .nojekyll"
git push origin main

echo "✅ Fatto! Tra 60 secondi ricarica il link della PWA."
echo "🔗 URL: https://cirellapietro.github.io/careautopro-contenitore/"
