'use server';

import { getMaintenanceAdvice } from '@/ai/flows/predictive-maintenance-advisor';
import { z } from 'zod';

const MaintenanceAdviceSchema = z.object({
  vehicleType: z.string().min(1, 'Il tipo di veicolo è obbligatorio.'),
  kilometersDriven: z.coerce.number(),
  lastMaintenanceDate: z.string().min(1, 'La data di ultima manutenzione è obbligatoria.'),
  maintenanceHistory: z.string().min(1, 'La cronologia della manutenzione è obbligatoria.'),
  drivingStyle: z.string().min(1, 'Lo stile di guida è obbligatorio.'),
});

type State = {
  advice: {
    advice: string;
    urgency: string;
    suggestedInterventions: string;
  } | null;
  error: string | null;
};

export async function generateMaintenanceAdvice(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = MaintenanceAdviceSchema.safeParse({
    vehicleType: formData.get('vehicleType'),
    kilometersDriven: formData.get('kilometersDriven'),
    lastMaintenanceDate: formData.get('lastMaintenanceDate'),
    maintenanceHistory: formData.get('maintenanceHistory'),
    drivingStyle: formData.get('drivingStyle'),
  });

  if (!validatedFields.success) {
    return {
      advice: null,
      error: 'Dati non validi. Controlla i campi e riprova.',
    };
  }

  try {
    const result = await getMaintenanceAdvice(validatedFields.data);
    return {
      advice: result,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      advice: null,
      error: "Si è verificato un errore durante la comunicazione con l'assistente AI.",
    };
  }
}
