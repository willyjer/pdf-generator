'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import { Input } from '../../../../components/ui/Input';
import { Search } from 'lucide-react';
import styles from './styles.module.css';
import { LocationAutocompleteProps } from './types';

export function LocationAutocomplete({
  onPlaceSelect,
  defaultValue = '',
  error,
  birthDate,
  className = '',
}: LocationAutocompleteProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Array<{
    name: string;
    lat: number;
    lng: number;
    id: string;
  }>>([]);
  const [loading, setLoading] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close suggestions when clicking outside the component
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search for places using Nominatim
  const searchPlaces = async (query: string) => {
    if (!query || query.length < 3 || userSelected) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch locations: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      const formattedSuggestions = data.slice(0, 5).map((place: any) => ({
        name: place.display_name,
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        id: `${place.place_id}-${place.osm_id}`,
      }));
      
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Error searching places:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce function to limit API calls
  useEffect(() => {
    if (userSelected) {
      return;
    }

    const timer = setTimeout(() => {
      searchPlaces(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, userSelected]);

  // Calculate timezone offset using Luxon
  const calculateTimezoneOffset = (timezoneId: string, birthDate?: {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
  }): number | undefined => {
    try {
      if (!birthDate) {
        return undefined;
      }
      
      const dt = DateTime.fromObject({
        year: birthDate.year,
        month: birthDate.month,
        day: birthDate.day,
        hour: birthDate.hour ?? 0,
        minute: birthDate.minute ?? 0,
      }, { zone: timezoneId });
      
      if (!dt.isValid) {
        return undefined;
      }
      
      const offsetInMinutes = dt.offset;
      const offsetInHours = offsetInMinutes / 60;
      
      return offsetInHours;
    } catch (error) {
      console.error('Error calculating timezone offset:', error);
      return undefined;
    }
  };

  // Handle selecting a place
  const handleSelectPlace = async (place: { name: string; lat: number; lng: number }) => {
    setUserSelected(true);
    setInputValue(place.name);
    setSuggestions([]);
    
    try {
      const response = await fetch(
        `/api/timezone?lat=${place.lat}&lng=${place.lng}`
      );
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      let timezone: number | undefined = undefined;
      
      if (data.status === 'OK' && data.zoneName) {
        if (birthDate) {
          timezone = calculateTimezoneOffset(data.zoneName, birthDate);
        }
        
        if (timezone === undefined && data.gmtOffset !== undefined) {
          timezone = data.gmtOffset / 3600;
        }
        
        if (timezone !== undefined) {
          timezone = Math.round(timezone * 2) / 2;
        }
      }
      
      onPlaceSelect({
        name: place.name,
        lat: place.lat,
        lng: place.lng,
        timezone,
      });
    } catch (error) {
      console.error('Error in handleSelectPlace:', error);
      onPlaceSelect({
        name: place.name,
        lat: place.lat,
        lng: place.lng,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Find if the value matches a suggestion exactly
    const selectedPlace = suggestions.find(place => place.name === value);
    if (selectedPlace) {
      handleSelectPlace(selectedPlace);
    } else {
      setUserSelected(false);
    }
  };

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      <div className={styles.inputContainer}>
        <Input
          type="text"
          placeholder="Enter your birth city"
          value={inputValue}
          onChange={handleInputChange}
          className={styles.input}
          error={error}
          fullWidth
        />
        <div className={styles.searchIcon}>
          <Search size={18} color="#9CA3AF" />
        </div>
      </div>

      {loading && (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinner}></div>
          <span>Searching...</span>
        </div>
      )}
      
      {!loading && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((place) => (
            <li
              key={place.id}
              className={styles.suggestionItem}
              onClick={() => handleSelectPlace(place)}
            >
              {place.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 