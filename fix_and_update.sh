#!/bin/bash
set -e

# Funzione per aggiungere o aggiornare una traduzione
add_translation() {
  local file="src/lib/translations.ts"
  local key="$1"
  local italian_text="$2"

  # Cerca la riga di inizio dell'oggetto 'it'
  local start_line=$(grep -n "it: {" "$file" | cut -d: -f1)
  if [ -z "$start_line" ]; then
    echo "Errore: Blocco 'it: {' non trovato in translations.ts"
    exit 1
  fi

  # Trova la parentesi graffa di chiusura per l'oggetto 'it'
  local end_line=$(awk -v start=$start_line 'NR > start && /}/ {print NR; exit}' "$file")

  # Controlla se la chiave esiste già nel blocco 'it'
  if awk -v start=$start_line -v end=$end_line 'NR > start && NR < end' "$file" | grep -q "'$key':"; then
    # Aggiorna la traduzione esistente all'interno del blocco 'it'
    sed -i "/it: {/,/}/s|\'$key\' *: *\'[^\']*\'|\'$key\': \'$italian_text\'|" "$file"
    echo "Traduzione aggiornata per $key."
  else
    # Aggiunge una nuova traduzione prima della parentesi graffa di chiusura dell'oggetto 'it'
    sed -i "$((end_line-1))a\    \'$key\': \'$italian_text\'," "$file"
    echo "Traduzione aggiunta per $key."
  fi
}

# Modulo 1: Onboarding Vocale & Navigazione Dinamica
# Creazione del gestore dell'assistente vocale
mkdir -p src/lib
cat <<'EOF' > src/lib/voice-assistant.ts
import { translations } from './translations';

class VoiceAssistant {
  private static instance: VoiceAssistant;
  private speechRecognition: any | null = null;
  private isListening = false;
  private onResult: ((transcript: string) => void) | null = null;

  private constructor() {
    this.initializeSpeechRecognition();
  }

  public static getInstance(): VoiceAssistant {
    if (!VoiceAssistant.instance) {
      VoiceAssistant.instance = new VoiceAssistant();
    }
    return VoiceAssistant.instance;
  }

  private initializeSpeechRecognition() {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.continuous = false;
      this.speechRecognition.lang = 'it-IT';
      this.speechRecognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        if (this.onResult) {
          this.onResult(transcript);
        }
      };
      this.speechRecognition.onend = () => {
        this.isListening = false;
      };
    }
  }

  public startListening(onResult: (transcript: string) => void) {
    if (this.speechRecognition && !this.isListening) {
      this.onResult = onResult;
      this.speechRecognition.start();
      this.isListening = true;
    }
  }

  public stopListening() {
    if (this.speechRecognition && this.isListening) {
      this.speechRecognition.stop();
      this.isListening = false;
    }
  }

  public speak(text: string, lang: string = 'it-IT') {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    }
  }

  public handleCommand(command: string) {
    const lang = 'it';
    if (command.startsWith('portami a')) {
      const destination = command.substring('portami a'.length).trim();
      this.speak(translations[lang].navigating_to.replace('{destination}', destination));
      this.navigateTo(destination);
    } else if (command.includes('caffè')) {
      this.speak(translations[lang].finding_coffee);
      this.findOnRoute('caffè');
    } else if (command.includes('servizi')) {
      this.speak(translations[lang].finding_services);
      this.findOnRoute('servizi');
    } else if (command.includes('aiuto')) {
        this.speak(translations[lang].help_intro);
        this.speak(translations[lang].feat_track_desc);
        this.speak(translations[lang].feat_ai_desc);
    }
  }

  private navigateTo(destination: string) {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
    window.open(googleMapsUrl, '_blank');
  }

  private findOnRoute(poi: string) {
    // Funzione di geolocalizzazione per ottenere le coordinate attuali
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(poi)}&location=${latitude},${longitude}`;
        window.open(googleMapsUrl, '_blank');
      });
    } else {
      this.speak('Geolocalizzazione non supportata.');
    }
  }
}

export default VoiceAssistant;
EOF

# Creazione del componente per l'Onboarding Vocale
mkdir -p src/components/voice
cat <<'EOF' > src/components/voice/VoiceOnboarding.tsx
'use client';

import React, { useEffect, useState } from 'react';
import VoiceAssistant from '@/lib/voice-assistant';
import { translations } from '@/lib/translations';

const VoiceOnboarding: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const voiceAssistant = VoiceAssistant.getInstance();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'h' || event.key === 'H') {
        const lang = 'it';
        voiceAssistant.speak(translations[lang].help_intro);
        voiceAssistant.speak(translations[lang].feat_track_desc);
        voiceAssistant.speak(translations[lang].feat_ai_desc);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  const startVoiceCommand = () => {
    const voiceAssistant = VoiceAssistant.getInstance();
    voiceAssistant.startListening((command) => {
      voiceAssistant.handleCommand(command);
    });
  };

  return (
    <div className="voice-onboarding-fab">
      <button onClick={startVoiceCommand} className="fab">
        🎙️
      </button>
      <style jsx>{`
        .voice-onboarding-fab {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        .fab {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default VoiceOnboarding;
EOF

# Aggiornamento del layout per includere il componente di onboarding
if [ -f "src/app/layout.tsx" ]; then
    if ! grep -q "import VoiceOnboarding from '@/components/voice/VoiceOnboarding';" "src/app/layout.tsx"; then
        sed -i "/import/a import VoiceOnboarding from '@/components/voice/VoiceOnboarding';" "src/app/layout.tsx"
    fi
    if ! grep -q "<VoiceOnboarding />" "src/app/layout.tsx"; then
        sed -i "/<\/body>/i \        <VoiceOnboarding />" "src/app/layout.tsx"
    fi
fi

# Aggiunta delle nuove traduzioni
add_translation "navigating_to" "Navigazione verso {destination} avviata."
add_translation "finding_coffee" "Certo, cerco il caffè più vicino sul tuo percorso e aggiorno Maps."
add_translation "finding_services" "Certo, cerco i servizi più vicini e aggiorno la navigazione."
add_translation "help_intro" "Benvenuto in CareAutoPro. Ecco cosa posso fare per te:"

echo "Modifiche applicate con successo."

# Verifica del build (esempio per un progetto Next.js)
echo "Verifica del build in corso..."
if [ -f "package.json" ] && grep -q "\"next\"" "package.json"; then
    npm install && npm run build
else
    echo "Build non supportato o non necessario per questo progetto."
fi

# Git push
echo "Esecuzione del git push..."
git add .
git commit -m "feat: Implementazione assistenza vocale e onboarding"
git push

echo "Pipeline completata."
