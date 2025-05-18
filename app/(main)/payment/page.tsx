'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import type { Appearance } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';
import styles from './styles.module.css';
import { createPaymentIntent } from '@/actions/stripe';
import { StarfieldBackground } from '../../components/ui/StarfieldBackground';
import type { BirthFormData, Reading } from '../../../types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const appearance: Appearance = {
  theme: 'night',
  variables: {
    colorPrimary: '#CDA349',
    colorBackground: '#141414',
    colorText: '#F4F4F5',
    colorDanger: '#EF4444',
    fontFamily: 'Inter, sans-serif',
    borderRadius: '12px',
    spacingUnit: '4px',
    fontSizeBase: '16px',
    fontWeightNormal: '400',
    fontWeightMedium: '500',
    fontWeightBold: '600',
  },
  rules: {
    '.Tab': {
      border: '1px solid #2E2E2E',
      boxShadow: 'none',
    },
    '.Tab:hover': {
      border: '1px solid #CDA349',
      backgroundColor: 'rgba(205, 163, 73, 0.03)',
    },
    '.Tab--selected': {
      border: '1px solid #CDA349',
      backgroundColor: 'rgba(205, 163, 73, 0.05)',
    },
    '.Input': {
      backgroundColor: '#141414',
      border: '1px solid #2E2E2E',
    },
    '.Input:focus': {
      border: '1px solid #CDA349',
      boxShadow: '0 0 0 1px #CDA349',
    },
    '.Label': {
      color: '#9CA3AF',
      fontSize: '16px',
      letterSpacing: '0.1px',
    },
  },
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState<string>("");

  // Parse readings from query params
  const selectedReadings = searchParams.getAll('readings').map((readingParam) => {
    const [id, price] = readingParam.split(':');
    return { id, price: Number(price) };
  }) as Reading[];
  const totalPrice = selectedReadings.reduce((sum, r) => sum + (r.price || 0), 0);

  // Get birth form data from URL params
  const birthFormData = {
    firstName: searchParams.get('firstName') ?? '',
    lastName: searchParams.get('lastName') ?? '',
    date: searchParams.get('date') ?? '',
    time: searchParams.get('time') ?? null,
    birthPlace: searchParams.get('birthPlace') ?? '',
    lat: Number(searchParams.get('lat')) || 0,
    lon: Number(searchParams.get('lon')) || 0,
    timezone: searchParams.get('timezone') ?? '',
  } as BirthFormData;

  // Store birth form data in sessionStorage (persists during payment flow)
  useEffect(() => {
    sessionStorage.setItem('birthFormData', JSON.stringify(birthFormData));
    // Also store the readings
    sessionStorage.setItem('selectedReadings', JSON.stringify(selectedReadings));
  }, [birthFormData, selectedReadings]);

  useEffect(() => {
    createPaymentIntent(selectedReadings)
      .then((secret: string | null) => {
        if (secret) setClientSecret(secret);
      });
  }, [selectedReadings]);

  return (
    <div className={`${styles.container} vignette-bg`}>
      <div className={styles.content}>
        <h1 className={styles.header}>Complete Your Reading</h1>
        {clientSecret && (
          <Elements 
            stripe={stripePromise} 
            options={{
              clientSecret,
              appearance,
            }}
          >
            <PaymentForm 
              readingsCount={selectedReadings.length}
              totalAmount={totalPrice}
              birthFormData={birthFormData}
            />
          </Elements>
        )}
      </div>
      <StarfieldBackground />
    </div>
  );
} 