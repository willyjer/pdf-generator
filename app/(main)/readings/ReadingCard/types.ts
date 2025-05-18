import React from 'react';

export interface ReadingCardProps {
  title: string;
  headline: string;
  subheadline: string;
  details: string[];
  backDetails: string[];
  selected?: boolean;
  onSelect?: () => void;
} 