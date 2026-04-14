import { useCallback } from 'react';

export const useVoiceCommands = () => {
  const speakFeedback = useCallback((text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(text);
      msg.lang = navigator.language || 'it-IT';
      window.speechSynthesis.speak(msg);
    }
  }, []);

  return { speakFeedback };
};
