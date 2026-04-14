#!/bin/bash
echo "📦 Building e Push in corso..."
npm install && npm run build
git add .
git commit -m "Fix: Ripristino Care Auto Pro via terminale mobile"
git push origin main
echo "✨ Tutto Online!"
