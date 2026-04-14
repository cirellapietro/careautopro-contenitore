import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

let ai: any;

try {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey && typeof window === 'undefined') {
      console.warn('ATTENZIONE: Nessuna chiave API trovata per Google GenAI. Le funzioni IA saranno disabilitate.');
  }

  ai = genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.0-flash',
  });
} catch (e: any) {
  const errorMsg = e.message || String(e);
  console.error(
    'ERRORE CRITICO: Inizializzazione Genkit fallita. ' + errorMsg
  );

  const mockRunner = (config: {name: string}) => {
    return async (input: any) => {
      console.warn(`Il flusso IA '${config.name}' è stato chiamato, ma l'IA è disabilitata.`);
      throw new Error(
        "Servizio IA non configurato. Abilita la 'Generative Language API' nella Console Google Cloud: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com"
      );
    };
  };

  ai = {
    defineFlow: (config: any, flowLogic: any) => mockRunner(config),
    definePrompt: (config: any) => mockRunner(config),
  };
}

export { ai };
