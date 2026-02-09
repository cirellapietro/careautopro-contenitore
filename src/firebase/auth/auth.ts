'use client';
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseApp } from '../config';

const auth: Auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

async function createUserDocument(uid: string, email: string, displayName: string) {
  const userRef = doc(db, 'users', uid);
  const userData = {
    id: uid,
    email,
    name: displayName,
    avatarUrl: null,
    role: 'Utente',
  };
  await setDoc(userRef, userData);
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email: string, password: string, displayName: string): Promise<void> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await updateProfile(user, { displayName });
  await createUserDocument(user.uid, email, displayName);
}

export async function signInWithGoogle(): Promise<void> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  // Check if user document already exists, if not create it
  const userRef = doc(db, 'users', user.uid);
  const { getDoc } = await import('firebase/firestore');
  const docSnap = await getDoc(userRef);
  if (!docSnap.exists()) {
    await createUserDocument(user.uid, user.email!, user.displayName!);
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}
