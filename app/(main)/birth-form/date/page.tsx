'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { DateTimeForm } from './DateTimeForm/index';
import { useBirthFormStorage } from '../hooks/useBirthFormStorage';

export default function DatePage() {
  const { formData, updateFormData, navigateToStep } = useBirthFormStorage();
  const [date, setDate] = React.useState(formData.birthDate || '');
  const [time, setTime] = React.useState(formData.birthTime || '');
  const [dontKnowTime, setDontKnowTime] = React.useState(formData.unknownTime || false);
  const [error, setError] = React.useState('');
  const [stars, setStars] = useState<{ top: number; left: number }[]>([]);

  // Update local state when formData changes
  useEffect(() => {
    if (formData) {
      setDate(formData.birthDate || '');
      setTime(formData.birthTime || '');
      setDontKnowTime(formData.unknownTime || false);
    }
  }, [formData]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setStars(newStars);
  }, []);

  const handleNext = () => {
    if (!date) {
      setError('Please select a date');
      return;
    }

    // Validate date is not in the future
    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate > today) {
      setError('Birth date cannot be in the future');
      return;
    }

    // Validate time if not marked as unknown
    if (!dontKnowTime && !time) {
      setError('Please select a time or check "I don\'t know my birth time"');
      return;
    }

    // Update centralized storage with consistent field names
    updateFormData({
      birthDate: date,
      birthTime: dontKnowTime ? '' : time,
      unknownTime: dontKnowTime
    });
    
    // Navigate to the next step
    navigateToStep('/birth-form/location');
  };

  const handleBack = () => {
    // Save current values before navigating
    updateFormData({
      birthDate: date,
      birthTime: dontKnowTime ? '' : time,
      unknownTime: dontKnowTime
    });
    
    navigateToStep('/birth-form/name');
  };

  const handleDontKnowTimeChange = (checked: boolean) => {
    setDontKnowTime(checked);
    if (checked) {
      setTime('');
    }
    setError('');
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
          <h1 className={styles.title}>When were you born?</h1>
          <div className={styles.decorativeLine} />
          <p className={styles.helpText}>For the most accurate readings, please enter your birth time.</p>
        </div>
        
        <DateTimeForm
          date={date}
          time={time}
          dontKnowTime={dontKnowTime}
          error={error}
          onDateChange={(value) => {
            setDate(value);
            setError('');
          }}
          onTimeChange={(value) => {
            setTime(value);
            setError('');
          }}
          onDontKnowTimeChange={handleDontKnowTimeChange}
          onNext={handleNext}
          onBack={handleBack}
          hideDefaultHelpText
        />
      </div>
    </div>
  );
} 