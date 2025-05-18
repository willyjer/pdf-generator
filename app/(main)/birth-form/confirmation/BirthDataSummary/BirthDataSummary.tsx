import React from 'react';
import { formatLocation } from '../../utils/formatLocation';
import styles from './styles.module.css';
import { BirthDataSummaryProps } from './types';
import { Pencil } from 'lucide-react';

export function BirthDataSummary({ formData, onEdit }: BirthDataSummaryProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Personal Information</h2>
        {onEdit && (
          <button 
            className={styles.editButton}
            onClick={() => onEdit('name')}
            aria-label="Edit personal information"
          >
            <Pencil size={16} style={{marginRight: 2}} /> Edit
          </button>
        )}
      </div>
      <div className={styles.sectionContent}>
        {/* Name */}
        <div className={styles.subsection}>
          <div className={styles.row}>
            <p className={styles.value}>
              {formData.firstName || formData.lastName
                ? [formData.firstName, formData.lastName].filter(Boolean).join(' ')
                : <span className={styles.emptyValue}>No name provided</span>
              }
            </p>
          </div>
          <div className={styles.row}>
            <p className={styles.value}>
              {new Date(formData.date + 'T12:00:00').toLocaleDateString()}
              {formData.unknownTime ? ' · Unknown Time' : 
                (formData.time ? ` · ${new Date(`2000-01-01T${formData.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ' · Time not provided')}
            </p>
          </div>
        </div>

        {/* Birth Location */}
        <div className={styles.subsection}>
          <div className={styles.row}>
            <p className={styles.value}>
              {formatLocation(formData.birthPlace)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 