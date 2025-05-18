'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import { ReadingCardProps } from './types';
import { Card } from '@/components/ui/Card';
import { Button } from '../../../components/ui/Button';

export function ReadingCard({
  title,
  headline,
  subheadline,
  details,
  backDetails,
  selected = false,
  onSelect,
}: ReadingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      className={`
        ${styles.readingCard}
        ${selected ? styles.selected : ''}
        ${isFlipped ? styles.flipped : ''}
      `}
    >
      <div className={styles.cardInner}>
        {/* Front of card */}
        <div className={styles.cardFront}>
          <div className={styles.content}>
            <div className={styles.descRow}>
              <h3 className={styles.headline}>{headline}</h3>
              <p className={styles.subheadline}>{subheadline}</p>
            </div>
            <ul className={styles.details}>
              {details.map((detail, index) => (
                <li key={index} className={styles.detail}>
                  {detail}
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <div className={styles.buttonGroup}>
                <Button
                  variant="cart"
                  onClick={onSelect}
                >
                  {selected ? 'Remove From Cart' : 'Add to Cart'}
                </Button>
                <span className={styles.buttonSeparator}>-or-</span>
                <Button
                  variant="learn"
                  onClick={handleLearnMore}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className={styles.cardBack}>
          <div className={styles.content}>
            <div className={styles.backTitle}>
              {(() => {
                if (title === 'Manifestation') return 'How We Decode Your Chart';
                if (title === 'Daily Cosmic Guidance') return 'How Your Daily Reading Works';
                if (title === 'Relationship Insights') return 'How We Analyze Your Connections';
                if (title === 'Career & Purpose') return 'How We Uncover Your Path';
                return 'How This Reading Is Crafted';
              })()}
            </div>
            <ul className={styles.backDetails}>
              {backDetails.map((detail, index) => (
                <li key={index} className={styles.backDetail}>
                  {detail}
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <div className={styles.buttonGroup}>
                <Button
                  variant="cart"
                  onClick={onSelect}
                >
                  {selected ? 'Remove From Cart' : 'Add to Cart'}
                </Button>
                <span className={styles.buttonSeparator}>-or-</span>
                <Button
                  variant="learn"
                  onClick={handleLearnMore}
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 