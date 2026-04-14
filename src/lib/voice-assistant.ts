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
