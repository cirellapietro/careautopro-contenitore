#!/bin/bash

# Script per la configurazione automatica delle chiavi SSH
# Utile per abilitare il push su GitHub senza inserire ogni volta le credenziali.

EMAIL="cirellapietro@gmail.com"
SSH_DIR="$HOME/.ssh"
KEY_FILE="$SSH_DIR/id_rsa"

echo "🛠️  CONFIGURAZIONE SSH PER CAREAUTOPRO"

if [ ! -d "$SSH_DIR" ]; then
  mkdir -p "$SSH_DIR"
  chmod 700 "$SSH_DIR"
fi

if [ ! -f "$KEY_FILE" ]; then
  echo "🔑 Generazione di una nuova chiave SSH..."
  ssh-keygen -t rsa -b 4096 -C "$EMAIL" -f "$KEY_FILE" -N ""
  echo "✅ Chiave generata con successo."
else
  echo "⚠️  Esiste già una chiave SSH in $KEY_FILE. Salto la generazione."
fi

echo ""
echo "📋 COPIA LA CHIAVE PUBBLICA QUI SOTTO E AGGIUNGILA AL TUO ACCOUNT GITHUB:"
echo "🔗 Vai su: https://github.com/settings/keys"
echo "------------------------------------------------------------------"
cat "${KEY_FILE}.pub"
echo "------------------------------------------------------------------"
echo ""

# Assicuriamoci che l'agente sia attivo e la chiave caricata
eval "$(ssh-agent -s)"
ssh-add "$KEY_FILE"

echo "🚀 Configurazione terminata. Una volta aggiunta la chiave su GitHub,"
echo "puoi testare la connessione con: ssh -T git@github.com"
