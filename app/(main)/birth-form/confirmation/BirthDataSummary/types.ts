import type { BirthFormData } from '../../../../../types';

export interface BirthDataSummaryProps {
  formData: BirthFormData;
  onEdit?: (section: string) => void;
} 