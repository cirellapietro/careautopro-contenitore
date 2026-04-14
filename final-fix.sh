#!/bin/bash
# 1. Prepariamo i file
mkdir -p public
echo "google.com, pub-6510375971465228, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 2. Build pulita
npm run build

# 3. Spostamento per GitHub Pages (Risolve la PWA)
touch .nojekyll
cp -rv out/* .

# 4. Invio a GitHub
git add .
git commit -m "Fix: Forzatura layout PWA e asset statici"
git push origin main
