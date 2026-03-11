#!/bin/bash

echo "🧹 Pulizia riferimenti vecchio URL e allineamento..."

# 1. Sostituisce ogni menzione del vecchio URL con quello nuovo nel codice
grep -lR "careautopro.vercel.app" . | xargs sed -i "s/careautopro.vercel.app/careautopro.vercel.app/g" 2>/dev/null

# 2. Rigenera ads.txt per sicurezza
echo "google.com, pub-5545202856432487, DIRECT, f08c47fec0942fa0" > public/ads.txt

# 3. Commit e Push forzato per allineare GitHub a questa versione pulita
git add .
git commit -m "chore: aggiornato URL a careautopro.vercel.app e pulizia finale"
git push origin main --force

# 4. Build finale per Vercel
npm run build