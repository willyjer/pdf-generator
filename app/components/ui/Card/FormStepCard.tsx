'use client';

import React from 'react';
import styles from './styles.module.css';
import { FormStepCardProps } from './types';
import { Card } from './Card';

export function FormStepCard({
  title,
  description,
  stepNumber,
  isActive = false,
  isCompleted = false,
  className,
  children,
}: FormStepCardProps) {
  return (
    <Card
      className={`
        ${styles.formStepCard}
        ${isActive ? styles.active : ''}
        ${isCompleted ? styles.completed : ''}
        ${className || ''}
      `}
    >
      <div className={styles.header}>
        <div className={styles.stepIndicator}>
          {isCompleted ? (
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
          ) : (
            <span>{stepNumber}</span>
          )}
        </div>
        <div className={styles.titleArea}>
          <h3 className={styles.title}>{title}</h3>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
        </div>
      </div>
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </Card>
  );
} 