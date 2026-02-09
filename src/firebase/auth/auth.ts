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
import { getFirestore, doc, setDoc, Firestore, getDoc } from 'firebase/firestore';
import { getFirebaseApp } from '../config';

// Lazy initialization for Firebase services
let auth: Auth;
let db: Firestore;

const getFirebaseAuth = () => {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
};

const getFirebaseDb = () => {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
};

const googleProvider = new GoogleAuthProvider();

async function createUserDocument(uid: string, email: string | null, displayName: string | null, photoURL: string | null) {
  const firestore = getFirebaseDb();
  const userRef = doc(firestore, 'users', uid);
  const userData = {
    uid: uid,
    email: email,
    displayName: displayName,
    photoURL: photoURL,
    role: 'Utente',
  };
  await setDoc(userRef, userData);
}

export async function signInWithEmail(email: string, password: string): Promise<void> {
  const authInstance = getFirebaseAuth();
  await signInWithEmailAndPassword(authInstance, email, password);
}

export async function signUpWithEmail(email: string, password: string, displayName: string): Promise<void> {
  const authInstance = getFirebaseAuth();
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  const user = userCredential.user;
  await updateProfile(user, { displayName });
  await createUserDocument(user.uid, user.email, displayName, user.photoURL);
}

export async function signInWithGoogle(): Promise<void> {
  const authInstance = getFirebaseAuth();
  const result = await signInWithPopup(authInstance, googleProvider);
  const user = result.user;
  
  const firestore = getFirebaseDb();
  const userRef = doc(firestore, 'users', user.uid);
  const docSnap = await getDoc(userRef);
  
  if (!docSnap.exists()) {
    await createUserDocument(user.uid, user.email, user.displayName, user.photoURL);
  }
}

export async function signOut(): Promise<void> {
  const authInstance = getFirebaseAuth();
  await firebaseSignOut(authInstance);
}
