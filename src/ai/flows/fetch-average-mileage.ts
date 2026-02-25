'use server';

/**
 * @fileOverview An AI-powered flow to fetch the average annual vehicle mileage for a city.
 *
 * - fetchAverageMileage - A function that returns the average mileage.
 * - FetchAverageMileageInput - The input type for the fetchAverageMileage function.
 * - FetchAverageMileageOutput - The return type for the fetchAverageMileage function.
 */

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

export async function fetchAverageMileage(input: FetchAverageMileageInput): Promise<FetchAverageMileageOutput> {
  return fetchAverageMileageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fetchAverageMileagePrompt',
  input: { schema: FetchAverageMileageInputSchema },
  output: { schema: FetchAverageMileageOutputSchema },
  prompt: `Qual è la stima del chilometraggio medio annuo per un'auto a {{city}}, {{country}}?
  Fornisci la risposta in chilometri.
  Rispondi SOLO con un oggetto JSON con la chiave "averageMileage".
  Non includere altro testo, spiegazioni o formattazione markdown.
  Esempio:
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
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (e: any) {
        // Log the detailed error on the server for debugging
        console.error(`Genkit flow 'fetchAverageMileageFlow' failed: ${e.message}`);
        // Throw a simpler, client-safe error to prevent server crashes and be caught by the UI
        if (e.message?.includes('Generative Language API has not been used')) {
            throw new Error("Generative Language API not enabled.");
        }
        throw new Error('An unexpected error occurred while fetching the average mileage.');
    }
  }
);
