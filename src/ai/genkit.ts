'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

let ai: any;

try {
  ai = genkit({
    plugins: [googleAI()],
    model: 'googleai/gemini-2.5-flash',
  });
} catch (e: any) {
  console.warn(
    'CRITICAL: Genkit initialization failed. AI features will be disabled. Error: ' +
      (e.message || e)
  );

  // Create a mock 'ai' object that allows the app to build and run
  // but throws a user-friendly error at runtime if an AI feature is called.
  const mockRunner = (config: {name: string}) => {
    return async (input: any) => {
      console.warn(`AI flow '${config.name}' was called, but AI is disabled due to an initialization error.`);
      // This error will be caught by the try/catch blocks in the UI components
      throw new Error(
        "AI feature is disabled. The 'Generative Language API' may not be enabled in your Google Cloud project."
      );
    };
  };

  ai = {
    defineFlow: (config: any, flowLogic: any) => {
        // Return a function that will throw a controlled error when executed
        return mockRunner(config);
    },
    definePrompt: (config: any) => {
        // definePrompt returns a function that can be called. We return our runner.
        return mockRunner(config);
    },
  };
}

export { ai };
