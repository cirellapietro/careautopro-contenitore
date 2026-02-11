'use client';
    
import { useState, useEffect } from 'react';
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

/**
 * React hook to subscribe to a single Firestore document in real-time.
 * Handles nullable references.
 * 
 * IMPORTANT! YOU MUST MEMOIZE the inputted memoizedTargetRefOrQuery or BAD THINGS WILL HAPPEN
 * use useMemo to memoize it per React guidence.  Also make sure that it's dependencies are stable
 * references
 *
 *
 * @template T Optional type for document data. Defaults to any.
 * @param {DocumentReference<DocumentData> | null | undefined} docRef -
 * The Firestore DocumentReference. Waits if null/undefined.
 * @returns {UseDocResult<T>} Object with data, isLoading, error.
 */
export function useDoc<T = any>(
  memoizedDocRef: DocumentReference<DocumentData> | null | undefined,
): UseDocResult<T> {
  type StateDataType = WithId<T> | null;

  // A single state object to hold the result of the async operation.
  const [snapshot, setSnapshot] = useState<{ data: StateDataType, error: Error | null } | null>(null);

  useEffect(() => {
    // If there's no ref, clear the snapshot and do nothing.
    if (!memoizedDocRef) {
      setSnapshot(null);
      return;
    }

    // When the ref changes, reset the snapshot to indicate loading.
    setSnapshot(null); 

    const unsubscribe = onSnapshot(
      memoizedDocRef,
      (doc: DocumentSnapshot<DocumentData>) => {
        if (doc.exists()) {
          setSnapshot({ data: { ...(doc.data() as T), id: doc.id }, error: null });
        } else {
          // Document does not exist
          setSnapshot({ data: null, error: null });
        }
      },
      (error: FirestoreError) => {
        const contextualError = new FirestorePermissionError({
          operation: 'get',
          path: memoizedDocRef.path,
        })
        
        setSnapshot({ data: null, error: contextualError });
        errorEmitter.emit('permission-error', contextualError);
      }
    );

    return () => unsubscribe();
  }, [memoizedDocRef]);

  return {
    data: snapshot ? snapshot.data : null,
    // We are loading if a ref exists but we don't have a snapshot result yet.
    isLoading: !snapshot && !!memoizedDocRef,
    error: snapshot ? snapshot.error : null,
  };
}
