'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DateTime } from 'luxon';
import styles from '../styles.module.css';
import type { BirthFormData, Reading } from '../../../../types';

export default function SuccessPage() {
  const [status, setStatus] = useState<string>('loading');
  const [birthFormData, setBirthFormData] = useState<BirthFormData | null>(null);
  const [selectedReadings, setSelectedReadings] = useState<Reading[]>([]);
  const [stars, setStars] = useState<{ top: string; left: string; delay: string }[]>([]);
  const searchParams = useSearchParams();
  const redirectStatus = searchParams.get('redirect_status');

  useEffect(() => {
    // Get birth form data from sessionStorage
    const storedData = sessionStorage.getItem('birthFormData');
    if (storedData) {
      setBirthFormData(JSON.parse(storedData));
      // Clear the data after retrieving it
      sessionStorage.removeItem('birthFormData');
    }

    // Get readings from sessionStorage
    const storedReadings = sessionStorage.getItem('selectedReadings');
    if (storedReadings) {
      setSelectedReadings(JSON.parse(storedReadings));
      // Clear the data after retrieving it
      sessionStorage.removeItem('selectedReadings');
    }

    // Payment Intent flow returns the status directly in the URL
    if (!redirectStatus || redirectStatus === 'succeeded') {
      setStatus('complete');
    } else {
      setStatus('error');
    }

    const newStars = Array.from({ length: 50 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random().toString(),
    }));
    setStars(newStars);
  }, [redirectStatus]);

  if (status === 'loading') {
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
          <div className={styles.successMessage}>
            <h1>Processing payment...</h1>
            <p>Please wait while we confirm your payment.</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
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
          <div className={styles.errorMessage}>
            <h1>Payment Error</h1>
            <p>There was a problem processing your payment. Please try again.</p>
          </div>
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
            style={{ top: star.top, left: star.left, '--delay': star.delay } as React.CSSProperties}
          />
        ))}
      </div>
      <div className={styles.content}>
        <div className={styles.successMessage}>
          <h1>Payment Successful!</h1>
          {birthFormData ? (
            <>
              <p>Thank you, {birthFormData.firstName}! Your reading will be delivered within 24 hours.</p>
              <div className={styles.birthDetails}>
                <p>Birth Details:</p>
                <ul>
                  <li>Date: {DateTime.fromISO(birthFormData.date).toLocaleString(DateTime.DATE_FULL)}</li>
                  {birthFormData.unknownTime ? (
                    <li>Time: Unknown</li>
                  ) : (
                    birthFormData.time && (
                      <li>Time: {new Date(`2000-01-01T${birthFormData.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                    )
                  )}
                  <li>Location: {birthFormData.birthPlace}</li>
                  <li>Coordinates: {birthFormData.lat.toFixed(4)}°, {birthFormData.lon.toFixed(4)}°</li>
                  <li>Timezone: {birthFormData.timezone}</li>
                </ul>
              </div>
              
              {selectedReadings.length > 0 && (
                <div className={styles.readingsSection}>
                  <p>Selected Readings:</p>
                  <div className={styles.readingsList}>
                    {selectedReadings.map(({ id, price }) => (
                      <div key={id} className={styles.readingRow}>
                        <span className={styles.readingName}>
                          {id.split('-').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </span>
                        <span className={styles.readingPrice}>${price}</span>
                      </div>
                    ))}
                    <div className={styles.totalRow}>
                      <span className={styles.totalLabel}>Total</span>
                      <span className={styles.totalPrice}>${totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p>Thank you for your purchase. Your reading will be delivered within 24 hours.</p>
          )}
        </div>
      </div>
    </div>
  );
} 