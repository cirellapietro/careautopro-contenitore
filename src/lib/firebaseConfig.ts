'use client';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirebaseApp } from '@/firebase/config';

/**
 * Singleton per l'accesso ai servizi Firebase all'interno dei file di utilità (non-componenti).
 * Per i componenti React, preferire l'uso degli hook forniti in @/firebase.
 */
const app = getFirebaseApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
