import React from 'react';
import { StarfieldBackgroundProps } from './types';
import styles from './styles.module.css';

const NUM_STARS = 50;

export function StarfieldBackground({ className = '' }: StarfieldBackgroundProps) {
  const stars = React.useMemo(
    () =>
      Array.from({ length: NUM_STARS }).map((_, index) => {
        const delay = Math.random() * 3;
        let sizeClass = '';
        
        // Distribute star sizes
        if (index % 3 === 0) {
          sizeClass = 'small';
        } else if (index % 3 === 1) {
          sizeClass = 'medium';
        } else if (index % 3 === 2) {
          sizeClass = 'large';
        }
        
        // Further vary animation durations based on other factors
        let additionalClass = '';
        if (index % 5 === 0) additionalClass += ' five';
        if (index % 7 === 0) additionalClass += ' seven';
        if (index % 11 === 0) additionalClass += ' eleven';
        
        return {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${delay}s`,
          key: index,
          className: `${sizeClass}${additionalClass}`
        };
      }),
    []
  );
  
  return (
    <div className={`${styles.starfieldBg} ${className}`} aria-hidden="true">
      {stars.map(star => (
        <div
          key={star.key}
          className={`${styles.star} ${star.className}`}
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
    </div>
  );
} 