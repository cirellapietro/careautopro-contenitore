'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function usePersistentState<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    const storedValue = window.localStorage.getItem(key);
    if (storedValue === null) {
        return defaultValue;
    }

    try {
      // Try to parse the stored value as JSON
      return JSON.parse(storedValue);
    } catch (error) {
      // If parsing fails, it's likely a raw string stored by a previous version.
      // We return the raw value. On the next state change, useEffect will correctly
      // store it as a JSON string.
      console.warn(`Value for key "${key}" in localStorage is not valid JSON. Falling back to raw value.`);
      return storedValue as any;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(`Error writing to localStorage key “${key}”:`, error);
        }
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
