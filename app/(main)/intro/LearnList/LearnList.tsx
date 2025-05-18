import React from 'react';
import styles from './styles.module.css';
import { LearnListProps } from './types';

const LearnList: React.FC<LearnListProps> = () => (
  <ul className={styles.learnList}>
    <li className={styles.learnItem}>
      <span className={styles.learnIcon} role="img" aria-label="Compass">🧭</span>
      <div className={styles.learnTextBlock}>
        <div className={styles.learnHeading}>Complete Chart Insight</div>
        <div className={styles.learnBody}>We begin with your full birth chart—interpreting placements, aspects, houses, and patterns just like a seasoned astrologer.</div>
      </div>
    </li>
    <li className={styles.learnItem}>
      <span className={styles.learnIcon} role="img" aria-label="Sparkles">✨</span>
      <div className={styles.learnTextBlock}>
        <div className={styles.learnHeading}>Symbolic & Structured</div>
        <div className={styles.learnBody}>No generic templates—your reading follows real astrological principles to reveal themes, tensions, and true meaning.</div>
      </div>
    </li>
    <li className={styles.learnItem}>
      <span className={styles.learnIcon} role="img" aria-label="Document">📄</span>
      <div className={styles.learnTextBlock}>
        <div className={styles.learnHeading}>Beautiful PDF Delivery</div>
        <div className={styles.learnBody}>Arrives straight to your inbox in a clean, journal-ready format for reflection or sharing.</div>
      </div>
    </li>
  </ul>
);

export default LearnList; 