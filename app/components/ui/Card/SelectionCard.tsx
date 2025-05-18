'use client';

import React from 'react';
import styles from './styles.module.css';
import { SelectionCardProps } from './types';
import { Card } from './Card';

export function SelectionCard({
  title,
  description,
  icon,
  isSelected = false,
  onClick,
  disabled = false,
  className,
  children,
}: SelectionCardProps) {
  return (
    <Card
      className={`
        ${styles.selectionCard}
        ${isSelected ? styles.selected : ''}
        ${disabled ? styles.disabled : ''}
        ${className || ''}
      `}
    >
      <button
        className={styles.selectionButton}
        onClick={onClick}
        disabled={disabled}
        type="button"
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          {children}
        </div>
        {isSelected && (
          <svg 
            className={styles.checkIcon} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M20 6L9 17L4 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </Card>
  );
} 