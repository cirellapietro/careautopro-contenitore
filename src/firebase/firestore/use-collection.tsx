'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Utility type to add an 'id' field to a given type T. */
export type WithId<T> = T & { id: string };

/**
 * Interface for the return value of the useCollection hook.
 * @template T Type of the document data.
 */
export interface UseCollectionResult<T> {
  data: WithId<T>[] | null; // Document data with ID, or null.
  isLoading: boolean;       // True if loading.
  error: FirestoreError | Error | null; // Error object, or null.
}

export interface InternalQuery extends Query<DocumentData> {
  _query: {
    path: {
      canonicalString(): string;
    }
  }
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
 * React hook to subscribe to a Firestore collection or query in real-time.
 * It remains in a loading state until the query is provided and the data is fetched.
 *
 * IMPORTANT! The inputted query MUST be memoized (e.g., with useMemo) to prevent infinite loops.
 * 
 * @template T Optional type for document data. Defaults to any.
 * @param {CollectionReference<DocumentData> | Query<DocumentData> | null | undefined} query -
 * The memoized Firestore CollectionReference or Query. The hook will wait if this is null/undefined.
 * @returns {UseCollectionResult<T>} Object with data, isLoading, and error.
 */
export function useCollection<T = any>(
    query: CollectionReference<DocumentData> | Query<DocumentData> | null | undefined,
): UseCollectionResult<T> {
  const [state, setState] = useState<UseCollectionResult<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  const queryKeyRef = useRef<string | null>(null);
  
  useEffect(() => {
    // This is a safe way to get a stable key from a Firestore query object.
    const newQueryKey = query ? (query as unknown as InternalQuery)._query.path.canonicalString() : null;

    if (!query || !newQueryKey) {
        if (queryKeyRef.current !== null) {
            setState({ data: null, isLoading: true, error: null });
            queryKeyRef.current = null;
        }
        return;
    }

    if (newQueryKey === queryKeyRef.current && !state.isLoading) {
        return;
    }

    queryKeyRef.current = newQueryKey;
    
    // Set loading state but preserve old data to prevent UI flickering
    setState(prevState => ({ ...prevState, isLoading: true }));

    const unsubscribe = onSnapshot(
      query,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        if (queryKeyRef.current === newQueryKey) {
          const results: WithId<T>[] = querySnapshot.docs.map(doc => ({ ...(doc.data() as T), id: doc.id }));
          
          setState(prevState => {
              if (stableStringify(prevState.data) === stableStringify(results) && !prevState.isLoading) {
                  return prevState;
              }
              return { data: results, isLoading: false, error: null };
          });
        }
      },
      (err: FirestoreError) => {
        const path: string = (query as unknown as InternalQuery)._query.path.canonicalString();

        const contextualError = new FirestorePermissionError({
          operation: 'list',
          path,
        });
        
        if (queryKeyRef.current === newQueryKey) {
          setState({ data: null, isLoading: false, error: contextualError });
          errorEmitter.emit('permission-error', contextualError);
        }
      }
    );

    return () => unsubscribe();
  }, [query]);

  return state;
}
