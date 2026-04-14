'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FetchAverageMileageInputSchema = z.object({
  city: z.string().describe('The city name.'),
  country: z.string().describe('The country name.'),
});
export type FetchAverageMileageInput = z.infer<typeof FetchAverageMileageInputSchema>;

const FetchAverageMileageOutputSchema = z.object({
  averageMileage: z.number().describe('The average annual mileage in kilometers.'),
});
export type FetchAverageMileageOutput = z.infer<typeof FetchAverageMileageOutputSchema>;

export async function fetchAverageMileage(input: FetchAverageMileageInput): Promise<FetchAverageMileageOutput | { error: string }> {
  try {
    return await fetchAverageMileageFlow(input);
  } catch (e: any) {
    const errorMsg = e.message || String(e);
    console.error(`Genkit flow 'fetchAverageMileage' failed: ${errorMsg}`);
    
    const isApiError = errorMsg.includes('Generative Language API') || 
                       errorMsg.includes('has not been used') ||
                       errorMsg.includes('disabled') ||
                       errorMsg.includes('non è attiva') ||
                       errorMsg.includes('403');

    if (isApiError) {
        return { error: "L'API Generative Language non è attiva nel tuo progetto Google Cloud. Abilitala su: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com" };
    }
    return { error: "Impossibile recuperare il chilometraggio medio tramite IA. Verifica l'abilitazione dell'API Generative Language." };
  }
}

const prompt = ai.definePrompt({
  name: 'fetchAverageMileagePrompt',
  input: { schema: FetchAverageMileageInputSchema },
  output: { schema: FetchAverageMileageOutputSchema },
  prompt: `What is the estimated average annual car mileage in {{city}}, {{country}}?
  Provide the answer in kilometers.
  Respond ONLY with a JSON object with the key "averageMileage".
  Do not include any other text, explanations, or markdown formatting.
  Example:
  {
    "averageMileage": 11500
  }
  `,
});

const fetchAverageMileageFlow = ai.defineFlow(
  {
    name: 'fetchAverageMileageFlow',
    inputSchema: FetchAverageMileageInputSchema,
    outputSchema: FetchAverageMileageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
