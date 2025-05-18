import React, { InputHTMLAttributes } from 'react';

/**
 * Base props shared across all form field components
 */
export interface BaseFieldProps {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Props for the DateFields component
 */
export interface DateFieldProps extends BaseFieldProps {
  /** Field name for form control */
  name: string;
  /** Current date value in YYYY-MM-DD format */
  value?: string;
  /** Callback when date value changes */
  onChange?: (value: string) => void;
  /** Minimum allowed date in YYYY-MM-DD format */
  min?: string;
  /** Maximum allowed date in YYYY-MM-DD format */
  max?: string;
}

/**
 * Props for the NameFields component
 */
export interface NameFieldProps extends BaseFieldProps {
  /** Current first name value */
  firstName?: string;
  /** Current last name value */
  lastName?: string;
  /** Callback when first name changes */
  onFirstNameChange?: (value: string) => void;
  /** Callback when last name changes */
  onLastNameChange?: (value: string) => void;
}

/**
 * Props for the TimeFields component
 */
export interface TimeFieldProps extends BaseFieldProps {
  /** Field name for form control */
  name: string;
  /** Current time value in HH:mm format */
  value?: string;
  /** Callback when time value changes */
  onChange?: (value: string) => void;
  /** Step interval in seconds (default: 60) */
  step?: number;
}

/**
 * Props for the LocationFields component
 */
export interface LocationFieldProps extends BaseFieldProps {
  /** Field name for form control */
  name: string;
  /** Birth date information for timezone calculation */
  birthDate?: {
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
  };
} 