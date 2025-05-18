'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles.module.css';
import type { BirthFormData } from '../../../../types';

export default function CancelPage() {
  const router = useRouter();
  const [birthFormData, setBirthFormData] = useState<BirthFormData | null>(null);
  const [stars, setStars] = useState<{ top: string; left: string; delay: string }[]>([]);

  useEffect(() => {
    // Get birth form data from sessionStorage
    const storedData = sessionStorage.getItem('birthFormData');
    if (storedData) {
      setBirthFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random().toString(),
    }));
    setStars(newStars);
  }, []);

  const handleRetry = () => {
    // If we have birth form data, reconstruct the payment URL
    if (birthFormData) {
      const paymentParams = new URLSearchParams();
      
      // Add all form data back to URL
      if (birthFormData.firstName) paymentParams.append('firstName', birthFormData.firstName);
      if (birthFormData.lastName) paymentParams.append('lastName', birthFormData.lastName);
      if (birthFormData.date) paymentParams.append('date', birthFormData.date);
      if (birthFormData.time) paymentParams.append('time', birthFormData.time);
      if (birthFormData.birthPlace) paymentParams.append('birthPlace', birthFormData.birthPlace);
      if (typeof birthFormData.lat === 'number') paymentParams.append('lat', birthFormData.lat.toString());
      if (typeof birthFormData.lon === 'number') paymentParams.append('lon', birthFormData.lon.toString());
      if (birthFormData.timezone) paymentParams.append('timezone', birthFormData.timezone);
      
      router.push(`/payment?${paymentParams.toString()}`);
    } else {
      router.push('/readings');
    }
  };

  return (
    <div className={styles.container}>
      <div className="starfield-bg">
        {stars.map((star, index) => (
          <div
            key={index}
            className="star"
            style={{ top: star.top, left: star.left, '--delay': star.delay } as React.CSSProperties}
          />
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.cancelMessage}>
          <h1>Payment Cancelled</h1>
          {birthFormData ? (
            <p>Hi {birthFormData.firstName}, your payment was cancelled. Would you like to try again?</p>
          ) : (
            <p>Your payment was cancelled. Would you like to try again?</p>
          )}
          <button onClick={handleRetry} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 