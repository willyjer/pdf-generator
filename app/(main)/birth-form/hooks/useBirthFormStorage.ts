import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BirthFormValues } from '../types';

// Define a consistent storage key
const STORAGE_KEY = 'birthForm';

/**
 * Check if localStorage is available
 * @returns True if localStorage can be used
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Custom hook for managing birth form data persistence
 * Centralizes localStorage interactions and URL parameter handling
 */
export function useBirthFormStorage() {
  // Initialize state with all possible form fields
  const [formData, setFormData] = useState<Partial<BirthFormValues>>({});
  const [readings, setReadings] = useState<string[]>([]);
  const [storageAvailable, setStorageAvailable] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Check localStorage availability on mount
  useEffect(() => {
    setStorageAvailable(isLocalStorageAvailable());
  }, []);
  
  // Load data from localStorage and URL on mount
  useEffect(() => {
    // Get readings from URL
    const urlReadings = searchParams.getAll('readings');
    setReadings(urlReadings);
    
    // Get form data from localStorage if available
    if (storageAvailable) {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            setFormData(parsedData);
            console.log('Loaded form data from storage:', parsedData);
          } catch (e) {
            console.error('Error parsing stored form data:', e);
            // Remove corrupted data
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        console.error('Error accessing localStorage:', e);
        setStorageAvailable(false);
      }
    }
  }, [searchParams, storageAvailable]);
  
  /**
   * Update form data (partial updates supported)
   * @param updates Partial form data to merge with existing data
   * @returns The updated form data
   */
  const updateFormData = (updates: Partial<BirthFormValues>) => {
    const newData = { ...formData, ...updates, readings };
    
    // Always ensure readings are included
    if (!newData.readings) {
      newData.readings = readings;
    }
    
    setFormData(newData);
    
    // Persist to localStorage if available
    if (storageAvailable) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        console.log('Updated form data in storage:', newData);
      } catch (e) {
        console.error('Error saving to localStorage:', e);
        
        // Try to save without readings which could be large
        try {
          const { readings: _, ...essentialData } = newData;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(essentialData));
        } catch (innerE) {
          console.error('Failed to save even minimal data to localStorage:', innerE);
          setStorageAvailable(false);
        }
      }
    }
    
    return newData;
  };
  
  /**
   * Clear form data from state and localStorage
   */
  const clearFormData = () => {
    if (storageAvailable) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Error clearing localStorage:', e);
      }
    }
    
    setFormData({});
    console.log('Cleared form data from storage');
  };
  
  /**
   * Navigate to a step while preserving readings in the URL
   * @param path The path to navigate to
   */
  const navigateToStep = (path: string) => {
    const params = new URLSearchParams();
    readings.forEach(reading => {
      params.append('readings', reading);
    });
    const queryString = params.toString();
    const nextPath = queryString ? `${path}?${queryString}` : path;
    console.log(`Navigating to: ${nextPath}`);
    router.push(nextPath);
  };
  
  return {
    formData,
    readings,
    storageAvailable,
    updateFormData,
    clearFormData,
    navigateToStep
  };
} 