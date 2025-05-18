'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/Button';
import styles from './page.module.css';
import { LocationAutocomplete } from './LocationAutocomplete';
import { useBirthFormStorage } from '../hooks/useBirthFormStorage';

export default function LocationPage() {
  const { formData, updateFormData, navigateToStep } = useBirthFormStorage();
  const [location, setLocation] = React.useState({
    name: formData.birthPlace || '',
    lat: formData.lat || 0,
    lon: formData.lon || 0,
    timezone: formData.timezone || 0
  });
  const [error, setError] = React.useState('');
  const [stars, setStars] = useState<{ top: number; left: number }[]>([]);

  // Update local state when formData changes
  useEffect(() => {
    if (formData) {
      setLocation({
        name: formData.birthPlace || '',
        lat: formData.lat || 0,
        lon: formData.lon || 0,
        timezone: formData.timezone || 0
      });
    }
  }, [formData]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setStars(newStars);
  }, []);

  // Get birth date from formData for timezone calculation
  const getBirthDate = () => {
    if (formData.birthDate) {
      const date = new Date(formData.birthDate);
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: 0,
        minute: 0
      };
    }
    return undefined;
  };

  const handleNext = () => {
    if (!location.name || location.lat === 0 || location.lon === 0) {
      setError('Please select a valid location');
      return;
    }

    // Update centralized storage
    updateFormData({
      birthPlace: location.name,
      lat: location.lat,
      lon: location.lon,
      timezone: location.timezone
    });
    
    // Navigate to the next step
    navigateToStep('/birth-form/confirmation');
  };

  const handleBack = () => {
    navigateToStep('/birth-form/date');
  };

  return (
    <div className={`${styles.container} vignette-bg`}>
      <div className="starfield-bg">
        {stars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{ top: `${star.top}%`, left: `${star.left}%` }}
          />
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Where were you born?</h1>
          <div className={styles.decorativeLine} />
          <div className={styles.subheadline}>Begin typing your city — autocomplete ensures an accurate match.</div>
        </div>
        <div className={styles.form}>
          <div className={styles.fieldGroup}>
            <LocationAutocomplete
              onPlaceSelect={(place) => {
                setLocation({
                  name: place.name,
                  lat: place.lat,
                  lon: place.lng,
                  timezone: place.timezone || 0
                });
                setError('');
              }}
              error={error}
              birthDate={getBirthDate()}
              className={styles.locationWrapper}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.backLink}
            onClick={handleBack}
          >
            <span aria-hidden="true" style={{marginRight: '6px'}}>&larr;</span>Back
          </button>
          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 