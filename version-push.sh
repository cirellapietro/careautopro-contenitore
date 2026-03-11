#!/bin/bash

# Chiede all'utente la versione (es. 1.0.1)
echo "Inserisci il numero di versione (es. 1.1.0):"
read VERSION

# Chiede una breve descrizione delle modifiche
echo "Descrivi brevemente cosa hai modificato:"
read MESSAGE

# Esegue i comandi Git
git add .
git commit -m "v$VERSION: $MESSAGE"
git tag -a "v$VERSION" -m "$MESSAGE"
git push origin main
git push origin --tags

echo "✅ Versione $VERSION inviata con successo a GitHub e Vercel!"
