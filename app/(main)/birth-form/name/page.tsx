'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { NameForm } from './NameForm';
import { useBirthFormStorage } from '../hooks/useBirthFormStorage';

export default function NamePage() {
  const { formData, updateFormData, navigateToStep } = useBirthFormStorage();
  const [firstName, setFirstName] = React.useState(formData.firstName || '');
  const [lastName, setLastName] = React.useState(formData.lastName || '');

  // Update local state when formData changes
  useEffect(() => {
    if (formData) {
      setFirstName(formData.firstName || '');
      setLastName(formData.lastName || '');
    }
  }, [formData]);

  // Starfield state
  const [stars, setStars] = useState<{ top: number; left: number }[]>([]);
  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setStars(newStars);
  }, []);

  const handleNext = () => {
    // Use the centralized storage hook to update form data
    updateFormData({
      firstName: firstName.trim(),
      lastName: lastName.trim()
    });

    // Navigate to the next step using our helper
    navigateToStep('/birth-form/date');
  };

  const handleBack = () => {
    navigateToStep('/readings');
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
          <h1 className={styles.title}>Let's start with your name</h1>
          <div className={styles.decorativeLine} />
          <span className={styles.subtitle}>Optional: This name will appear on your PDF</span>
        </div>
        
        <NameForm
          firstName={firstName}
          lastName={lastName}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onNext={handleNext}
          onBack={handleBack}
        />
      </div>
    </div>
  );
} 