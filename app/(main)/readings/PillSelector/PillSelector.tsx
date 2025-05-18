import React, { useRef, useLayoutEffect } from 'react';
import styles from './styles.module.css';
import { PillSelectorProps } from './types';

const PillSelector: React.FC<PillSelectorProps> = ({
  readings,
  selected,
  onSelect,
  pillContainerRef,
  underlineRef,
}) => {
  // Center active pill and animate underline
  useLayoutEffect(() => {
    const pills = pillContainerRef.current?.querySelectorAll<HTMLButtonElement>(`.${styles.pill}`);
    const activeIdx = readings.findIndex(r => r.id === selected);
    const active = pills?.[activeIdx];
    const container = pillContainerRef.current;
    const underline = underlineRef.current;
    if (active && container && underline) {
      // Center scroll
      const offset = (active.offsetLeft + active.offsetWidth / 2) - container.clientWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
      // Move underline (subtract border-radius from both sides)
      const borderRadius = 16; // px, matches pill border-radius
      underline.style.left = `${active.offsetLeft + borderRadius}px`;
      underline.style.width = `${active.offsetWidth - borderRadius * 2}px`;
    }
  }, [selected, readings, pillContainerRef, underlineRef]);

  const handleScrollClick = (direction: 'left' | 'right') => {
    const container = pillContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.pillContainer} ref={pillContainerRef}>
      <button
        className={`${styles.scrollArrow} ${styles.scrollArrowLeft}`}
        onClick={() => handleScrollClick('left')}
        type="button"
        aria-label="Scroll left"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>
      {readings.map((reading) => (
        <button
          key={reading.id}
          className={
            styles.pill + (selected === reading.id ? ' ' + styles.active : '')
          }
          onClick={() => onSelect(reading.id)}
          type="button"
        >
          {reading.title}
        </button>
      ))}
      <button
        className={`${styles.scrollArrow} ${styles.scrollArrowRight}`}
        onClick={() => handleScrollClick('right')}
        type="button"
        aria-label="Scroll right"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
      <div className={styles.underline} ref={underlineRef} />
    </div>
  );
};

export default PillSelector; 