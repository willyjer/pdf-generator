'use client';

import React from 'react';
import styles from './styles.module.css';
import { BaseCardProps } from './types';

export function Card({ children, className }: BaseCardProps) {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      {children}
    </div>
  );
} 