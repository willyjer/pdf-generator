'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Button } from '../../../components/ui/Button';
import { BirthDataSummary } from './BirthDataSummary';
import { useBirthFormStorage } from '../hooks/useBirthFormStorage';
import type { BirthFormData, Reading } from '../../../../types';
import { SelectedReadings } from './SelectedReadings/SelectedReadings';
import IntroFooter from '../../intro/IntroFooter/IntroFooter';

export default function ConfirmationPage() {
  const router = useRouter();
  const { formData, readings, navigateToStep, clearFormData } = useBirthFormStorage();
  const [selectedReadings, setSelectedReadings] = React.useState<Reading[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [stars, setStars] = useState<{ top: number; left: number }[]>([]);

  // Convert our internal formData to the expected BirthFormData format
  const adaptedFormData: BirthFormData = formData ? {
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    date: formData.birthDate || '',
    time: formData.birthTime || null,
    birthPlace: formData.birthPlace || '',
    lat: formData.lat || 0,
    lon: formData.lon || 0,
    timezone: formData.timezone || 0,
    unknownTime: formData.unknownTime,
    readings
  } : {} as BirthFormData;

  React.useEffect(() => {
    console.log('Confirmation page - Starting data load');
    
    if (formData) {
      console.log('Confirmation page - Using formData from centralized hook:', formData);
      
      // Convert readings strings to Reading objects
      const parsedReadings = readings.map((param: string) => {
        console.log('Confirmation page - Processing reading:', param);
        const [id, price] = param.split(':');
        return { id, price: Number(price) };
      });
      
      console.log('Confirmation page - Parsed readings:', parsedReadings);
      setSelectedReadings(parsedReadings);
    }
  }, [formData, readings]);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
    }));
    setStars(newStars);
  }, []);

  const handleSubmit = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    setError('');

    try {
      console.log('Submitting birth data:', { ...adaptedFormData, readings: selectedReadings });
      
      const response = await fetch('/api/birth-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...adaptedFormData,
          readings: selectedReadings
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Birth data submission failed:', errorData);
        throw new Error(errorData.error || 'Failed to submit birth data');
      }

      console.log('Birth data submitted successfully');

      // Clear form data
      clearFormData();
      
      // Navigate to payment with all form data and readings
      const paymentParams = new URLSearchParams();
      
      // Add all form data
      if (formData.firstName) paymentParams.append('firstName', formData.firstName);
      if (formData.lastName) paymentParams.append('lastName', formData.lastName);
      if (formData.birthDate) paymentParams.append('date', formData.birthDate);
      if (formData.birthTime) paymentParams.append('time', formData.birthTime);
      if (formData.birthPlace) paymentParams.append('birthPlace', formData.birthPlace);
      if (typeof formData.lat === 'number') paymentParams.append('lat', formData.lat.toString());
      if (typeof formData.lon === 'number') paymentParams.append('lon', formData.lon.toString());
      if (formData.timezone) paymentParams.append('timezone', formData.timezone.toString());
      
      // Add readings
      selectedReadings.forEach(({ id, price }) => {
        paymentParams.append('readings', `${id}:${price}`);
      });
      
      const paymentUrl = `/payment?${paymentParams.toString()}`;
      console.log('Navigating to payment:', paymentUrl);
      
      router.push(paymentUrl);
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit birth data. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigateToStep('/birth-form/location');
  };

  const handleEdit = (section: string) => {
    switch (section) {
      case 'name':
        navigateToStep('/birth-form/name');
        break;
      case 'date':
        navigateToStep('/birth-form/date');
        break;
      case 'location':
        navigateToStep('/birth-form/location');
        break;
    }
  };

  const handleGoToReading = async () => {
    if (!formData) return;
    // Parse date string directly without creating a Date object
    const [year, month, day] = formData.birthDate.split('-').map(Number);
    const [hour, min] = formData.unknownTime || !formData.birthTime
      ? [0, 0]
      : formData.birthTime.split(':').map(Number);
    const lat = formData.lat || 0;
    const lon = formData.lon || 0;
    const tzone = formData.timezone || 0;
    const unknownTime = !!formData.unknownTime;

    // Prepare payload
    const payload: any = {
      day,
      month,
      year,
      hour,
      min,
      lat,
      lon,
      tzone,
    };
    if (unknownTime) payload.unknownTime = true;

    // Map reading IDs to webhook URLs
    const webhookMap: Record<string, { withTime: string; noTime: string }> = {
      vocation: {
        withTime: 'http://localhost:5678/webhook-test/lifeandvocation',
        noTime: 'http://localhost:5678/webhook-test/lifeandvocationnobt',
      },
      coreWound: {
        withTime: 'http://localhost:5678/webhook-test/corewound',
        noTime: 'http://localhost:5678/webhook-test/corewoundnobt',
      },
      manifestation: {
        withTime: 'http://localhost:5678/webhook-test/manifestationandblocks',
        noTime: 'http://localhost:5678/webhook-test/manifestationandblocksnobt',
      },
    };

    // Send all webhooks in parallel
    await Promise.all(
      selectedReadings.map(({ id }) => {
        const urls = webhookMap[id];
        if (!urls) return Promise.resolve();
        const url = unknownTime ? urls.noTime : urls.withTime;
        return fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      })
    );
    router.push('/payment/success');
  };

  if (!formData) {
    return (
      <div className={styles.container}>
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
          <p className={styles.loading}>Loading...</p>
        </div>
      </div>
    );
  }

  const totalPrice = selectedReadings.reduce((sum, r) => sum + r.price, 0);

  return (
    <div className={styles.container}>
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
        <h1 className={styles.title}>Confirm Your Order</h1>
        
        <div className={styles.form}>
          <BirthDataSummary formData={adaptedFormData} onEdit={handleEdit} />

          <SelectedReadings
            selectedReadings={selectedReadings}
            totalPrice={totalPrice}
            onChange={() => navigateToStep('/readings')}
          />

          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.buttons}>
          <Button
            variant="secondary"
            size="md"
            onClick={handleBack}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleGoToReading}
            isLoading={isSubmitting}
          >
            Take Me to My Reading
          </Button>
        </div>
      </div>
      <IntroFooter />
    </div>
  );
} 