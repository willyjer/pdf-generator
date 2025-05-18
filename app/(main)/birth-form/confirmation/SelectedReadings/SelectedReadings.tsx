import React from 'react';
import styles from './styles.module.css';
import { Pencil } from 'lucide-react';

export function SelectedReadings({ selectedReadings, totalPrice, onChange }: {
  selectedReadings: { id: string; price: number }[];
  totalPrice: number;
  onChange: () => void;
}) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Selected Readings</h2>
        <button
          className={styles.editButton}
          type="button"
          onClick={onChange}
          aria-label="Edit selected readings"
        >
          <Pencil size={16} style={{marginRight: 2}} /> Edit
        </button>
      </div>
      <div className={styles.sectionContent}>
        <div className={styles.readingsList}>
          {selectedReadings.map(({ id, price }) => (
            <div key={id} className={styles.readingRow}>
              <span className={styles.readingName}>
                {id === 'daily' ? 'Daily Reading' :
                 id === 'manifestation' ? 'Manifestation Reading' :
                 id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
              <span className={styles.readingPrice}>${price}</span>
            </div>
          ))}
        </div>
        <hr className={styles.readingsDivider} />
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalPrice}>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
} 