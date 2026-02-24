'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/predictive-maintenance-advisor.ts';
import '@/ai/flows/fetch-maintenance-plan.ts';
import '@/ai/flows/reverse-geocode.ts';
import '@/ai/flows/fetch-average-mileage.ts';
