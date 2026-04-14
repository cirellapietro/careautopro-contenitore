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
