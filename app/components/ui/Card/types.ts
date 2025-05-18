import { ReactNode } from 'react';

/**
 * Base props for all card components
 */
export interface BaseCardProps {
  /** Content to be rendered inside the card */
  children: ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Props for the SelectionCard component
 * Used for selectable options in lists or forms
 */
export interface SelectionCardProps extends BaseCardProps {
  /** Title of the card */
  title: string;
  /** Optional description text */
  description?: string;
  /** Icon to be displayed in the card */
  icon?: ReactNode;
  /** Whether the card is currently selected */
  isSelected?: boolean;
  /** Callback when the card is clicked */
  onClick?: () => void;
  /** Whether the card is disabled */
  disabled?: boolean;
}

/**
 * Props for the FormStepCard component
 * Used to display form steps with progress indication
 */
export interface FormStepCardProps extends BaseCardProps {
  /** Title of the form step */
  title: string;
  /** Optional description of the step */
  description?: string;
  /** The step number */
  stepNumber: number;
  /** Whether this is the currently active step */
  isActive?: boolean;
  /** Whether this step has been completed */
  isCompleted?: boolean;
} 