'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MaintenanceAdviceInputSchema = z.object({
  vehicleType: z.string().describe('The type of the vehicle (e.g., gasoline, diesel, electric).'),
  kilometersDriven: z.number().describe('The total kilometers driven by the vehicle.'),
  lastMaintenanceDate: z.string().describe('The date of the last maintenance service (YYYY-MM-DD).'),
  maintenanceHistory: z.string().describe('A summary of the vehicle maintenance history.'),
  drivingStyle: z.string().describe('The user driving style (e.g., aggressive, moderate, conservative).'),
});

const MaintenanceAdviceOutputSchema = z.object({
  advice: z.string().describe('AI-generated advice on upcoming maintenance needs.'),
  urgency: z.string().describe('The urgency level of the advice (e.g., high, medium, low).'),
  suggestedInterventions: z.string().describe('Suggested maintenance interventions based on vehicle data.'),
});

export type MaintenanceAdviceInput = z.infer<typeof MaintenanceAdviceInputSchema>;
export type MaintenanceAdviceOutput = z.infer<typeof MaintenanceAdviceOutputSchema>;

export async function getMaintenanceAdvice(input: MaintenanceAdviceInput): Promise<MaintenanceAdviceOutput | { error: string }> {
  try {
    return await maintenanceAdviceFlow(input);
  } catch (e: any) {
    const errorMsg = e.message || String(e);
    console.error(`Genkit flow 'maintenanceAdviceFlow' failed: ${errorMsg}`);
    
    const isApiKeyError = errorMsg.includes('API_KEY_INVALID') || 
                          errorMsg.includes('not authorized') || 
                          errorMsg.includes('invalid') ||
                          errorMsg.includes('key');

    const isApiDisabledError = errorMsg.includes('Generative Language API') || 
                               errorMsg.includes('has not been used') ||
                               errorMsg.includes('disabled') ||
                               errorMsg.includes('non è attiva') ||
                               errorMsg.includes('403') ||
                               errorMsg.includes('activation');

    if (isApiDisabledError) {
        return { error: "L'API Generative Language non è attiva nel tuo progetto Google Cloud. Abilitala su: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com" };
    }

    if (isApiKeyError) {
        return { error: "La chiave API per Gemini non è valida o è scaduta. Controlla la configurazione nel file .env." };
    }
    
    return { error: "Si è verificato un problema durante la comunicazione con l'assistente AI. Per favore assicurati di aver abilitato l'API Generative Language nella tua console Google Cloud." };
  }
}

const prompt = ai.definePrompt({
  name: 'maintenanceAdvicePrompt',
  input: {schema: MaintenanceAdviceInputSchema},
  output: {schema: MaintenanceAdviceOutputSchema},
  prompt: `You are an expert automotive maintenance advisor. Based on the following information about the vehicle, provide advice on upcoming maintenance needs, the urgency of the advice, and suggest specific maintenance interventions.

Vehicle Type: {{{vehicleType}}}
Kilometers Driven: {{{kilometersDriven}}}
Last Maintenance Date: {{{lastMaintenanceDate}}}
Maintenance History: {{{maintenanceHistory}}}
Driving Style: {{{drivingStyle}}}

Respond in a professional and helpful manner.
Consider common issues for the vehicle type and driving style.

Make sure to include suggestedInterventions based on vehicle data.
`,
});

const maintenanceAdviceFlow = ai.defineFlow(
  {
    name: 'maintenanceAdviceFlow',
    inputSchema: MaintenanceAdviceInputSchema,
    outputSchema: MaintenanceAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) throw new Error("The AI did not produce any output.");
    return output;
  }
);
