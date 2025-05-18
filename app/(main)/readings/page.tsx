'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { ReadingCard } from './ReadingCard';
import { ArrowLeft } from 'lucide-react';
import { StarfieldBackground } from '../../components/ui/StarfieldBackground';
import PillSelector from './PillSelector';
import { readings, backDetailsMap } from './readingsData';

export default function ReadingsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(readings[0].id);
  const [cart, setCart] = useState<Set<string>>(new Set());
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  // Scroll handling is now done by the PillSelector component

  const selectedReading = readings.find(r => r.id === selected)!;
  const inCart = cart.has(selected);

  const handleCartToggle = () => {
    const newCart = new Set(cart);
    if (inCart) {
      newCart.delete(selected);
    } else {
      newCart.add(selected);
    }
    setCart(newCart);
  };

  const handleContinue = () => {
    // Convert selected readings to URL parameters as id:price
    const selectedReadings = Array.from(cart).map(id => {
      const reading = readings.find(r => r.id === id);
      if (!reading) return null;
      return `${reading.id}:${reading.price}`;
    }).filter((reading): reading is string => reading !== null);

    console.log('Readings page - Selected readings:', selectedReadings);

    const searchParams = new URLSearchParams();
    selectedReadings.forEach(readingParam => {
      searchParams.append('readings', readingParam);
    });
    
    const queryString = searchParams.toString();
    console.log('Readings page - URL query string:', queryString);
    
    router.push(`/birth-form?${queryString}`);
  };

  return (
    <main className={`${styles.readings} vignette-bg`}>
      <StarfieldBackground />
      <div className={styles.cardStack}>
        <button
          className={styles.backButton}
          onClick={() => router.push('/')}
          aria-label="Back to intro"
        >
          <ArrowLeft className={styles.backIcon} />
          Home
        </button>
        <div className={styles.content}>
          <h1 className={styles.header}>Choose a Reading Below</h1>
          <PillSelector
            readings={readings}
            selected={selected}
            onSelect={setSelected}
            pillContainerRef={pillContainerRef}
            underlineRef={underlineRef}
          />
          <div className={styles.panelArea}>
            <ReadingCard
              title={selectedReading.title}
              headline={selectedReading.headline}
              subheadline={selectedReading.subheadline}
              details={selectedReading.details.split('\n')}
              backDetails={backDetailsMap[selectedReading.id]}
              selected={inCart}
              onSelect={handleCartToggle}
            />
          </div>
          {cart.size > 0 ? (
            <button 
              className={styles.checkoutButton}
              onClick={handleContinue}
              type="button"
            >
              ✨ {cart.size} Reading{cart.size > 1 ? 's' : ''} Selected – Continue
            </button>
          ) : (
            <div className={styles.readingsPricePlaceholder}>
              All Readings Are Only $5
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 