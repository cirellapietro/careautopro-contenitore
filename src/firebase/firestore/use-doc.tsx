'use client';
    
import { useState, useEffect, useRef } from 'react';
import {
  DocumentReference,
  onSnapshot,
  DocumentData,
  FirestoreError,
  DocumentSnapshot,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useDoc hook.
 * @template T Type of the document data.
 */
export interface UseDocResult<T> {
  data: WithId<T> | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

// Helper to create a stable string representation of an object for comparison.
const stableStringify = (obj: any): string => {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (typeof obj !== 'object') {
    return JSON.stringify(obj);
  }

  if (Array.isArray(obj)) {
    return `[${obj.map(stableStringify).join(',')}]`;
  }

  const keys = Object.keys(obj).sort();
  const kvPairs = keys.map(key => {
    const value = obj[key];
    if(value === undefined) return ''; // Omit undefined values
    return `${JSON.stringify(key)}:${stableStringify(value)}`;
  }).filter(Boolean);
  return `{${kvPairs.join(',')}}`;
};


/**
 * React hook to subscribe to a single Firestore document in real-time.
 * It remains in a loading state until the document reference is provided and the data is fetched.
 *
 * IMPORTANT! The inputted docRef MUST be memoized (e.g., with useMemo) to prevent infinite loops.
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef -
 * The memoized Firestore DocumentReference. The hook will wait if this is null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, and error.
 */
export function useDoc<T = any>(
  docRef: DocumentReference<DocumentData> | null | undefined,
): UseDocResult<T> {
  const [state, setState] = useState<UseDocResult<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const pathRef = useRef<string | null>(null);

  useEffect(() => {
    const newPath = docRef?.path || null;

    if (!docRef || !newPath) {
      if (pathRef.current !== null) { 
        setState({ data: null, isLoading: true, error: null });
        pathRef.current = null;
      }
      return;
    }

    if (newPath === pathRef.current && !state.isLoading) {
      return;
    }
    
    pathRef.current = newPath;
    
    // Set loading state but preserve old data to prevent UI flickering
    setState(prevState => ({ ...prevState, isLoading: true }));

    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot: DocumentSnapshot<DocumentData>) => {
        if (pathRef.current === newPath) {
          const docData = docSnapshot.exists() ? { ...(docSnapshot.data() as T), id: docSnapshot.id } : null;
          
          setState(prevState => {
              // Only update state if data has actually changed to prevent infinite loops
              if (stableStringify(prevState.data) === stableStringify(docData) && !prevState.isLoading) {
                  return prevState;
              }
              return { data: docData, isLoading: false, error: null };
          });
        }
      },
      (err: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: docRef.path,
        });
        
        if (pathRef.current === newPath) {
          setState({ data: null, isLoading: false, error: contextualError });
          errorEmitter.emit('permission-error', contextualError);
        }
      }
    );

    return () => unsubscribe();
  }, [docRef]); // Dependency on the memoized reference is correct.

  return state;
}
