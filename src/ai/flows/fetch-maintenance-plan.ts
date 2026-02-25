'use server';

/**
 * @fileOverview An AI-powered flow to fetch standard maintenance plans for a vehicle model.
 *
 * - fetchMaintenancePlan - A function that returns a list of maintenance checks.
 * - MaintenancePlanInput - The input type for the fetchMaintenancePlan function.
 * - MaintenancePlanOutput - The return type for the fetchMaintenancePlan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MaintenancePlanInputSchema = z.object({
  make: z.string().describe('The make of the vehicle (e.g., Fiat).'),
  model: z.string().describe('The model of the vehicle (e.g., Panda).'),
});
export type MaintenancePlanInput = z.infer<typeof MaintenancePlanInputSchema>;

const MaintenanceCheckSchema = z.object({
    description: z.string().describe("Description of the maintenance check."),
    intervalMileage: z.number().optional().describe("Mileage interval in km for the check."),
    intervalTime: z.number().optional().describe("Time interval in months for the check."),
});

const MaintenancePlanOutputSchema = z.array(MaintenanceCheckSchema);
export type MaintenancePlanOutput = z.infer<typeof MaintenancePlanOutputSchema>;


export async function fetchMaintenancePlan(input: MaintenancePlanInput): Promise<MaintenancePlanOutput> {
  return fetchMaintenancePlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fetchMaintenancePlanPrompt',
  input: { schema: MaintenancePlanInputSchema },
  output: { schema: MaintenancePlanOutputSchema },
  prompt: `You are an expert car mechanic. For a '{{make}} {{model}}', provide a standard maintenance plan based on general automotive knowledge.
List the most common and important maintenance checks.
Respond in Italian.
Provide ONLY a JSON array of objects with the keys "description", "intervalMileage", and "intervalTime".
If an interval is not applicable, omit the key. Do not include any other text, explanation, or markdown formatting.

Example for a generic car:
[
  {
    "description": "Cambio olio e filtro olio",
    "intervalMileage": 15000,
    "intervalTime": 12
  },
  {
    "description": "Controllo pneumatici e pressione",
    "intervalTime": 3
  },
  {
    "description": "Sostituzione cinghia di distribuzione",
    "intervalMileage": 120000,
    "intervalTime": 72
  }
]
`,
});

const fetchMaintenancePlanFlow = ai.defineFlow(
  {
    name: 'fetchMaintenancePlanFlow',
    inputSchema: MaintenancePlanInputSchema,
    outputSchema: MaintenancePlanOutputSchema,
  },
  async (input) => {
    try {
        const { output } = await prompt(input);
        // The model might sometimes return an empty array or null if it can't find info.
        // We'll return an empty array in that case to prevent errors downstream.
        return output || [];
    } catch (e: any) {
        // Log the detailed error on the server for debugging
        console.error(`Genkit flow 'fetchMaintenancePlanFlow' failed: ${e.message}`);
        // Throw a simpler, client-safe error to prevent server crashes and be caught by the UI
        if (e.message?.includes('Generative Language API has not been used')) {
            throw new Error("Generative Language API not enabled.");
        }
        throw new Error('An unexpected error occurred while fetching the maintenance plan.');
    }
  }
);
