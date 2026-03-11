#!/bin/bash
echo "🚀 Invio modifiche in corso..."
git add .
git commit -m "Modifica da AI Studio: $(date)"
git push origin main
