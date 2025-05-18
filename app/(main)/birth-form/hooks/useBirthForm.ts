import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { birthFormSchema, validateBirthForm } from '../utils/validation';
import { BirthFormValues } from '../types';
import { useState, useEffect } from 'react';
import { useBirthFormStorage } from './useBirthFormStorage';

export interface UseBirthFormReturn {
  form: ReturnType<typeof useForm<BirthFormValues>>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  selectedReadings: string[];
}

export const useBirthForm = (): UseBirthFormReturn => {
  const router = useRouter();
  const { formData, readings, updateFormData, navigateToStep } = useBirthFormStorage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Create form instance with zod validation
  const form = useForm<BirthFormValues>({
    resolver: zodResolver(birthFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      birthDate: '',
      birthTime: '',
      birthPlace: '',
      lat: 0,
      lon: 0,
      timezone: 0,
      unknownTime: false,
    },
    mode: 'onChange',
  });

  // Sync form with storage data when it changes
  useEffect(() => {
    if (formData) {
      // Set form values from storage
      form.reset({
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        birthDate: formData.birthDate || '',
        birthTime: formData.birthTime || '',
        birthPlace: formData.birthPlace || '',
        lat: formData.lat || 0,
        lon: formData.lon || 0,
        timezone: formData.timezone || 0,
        unknownTime: formData.unknownTime || false,
      });
    }
  }, [formData, form]);

  const handleSubmit: SubmitHandler<BirthFormValues> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      console.log('--- SUBMITTING BIRTH FORM ---');
      console.log('Raw form data:', data);
      console.log('Selected readings at submit:', readings);

      // Validate with Zod schema
      const validation = validateBirthForm(data);
      console.log('Validation result:', validation);
      if (!validation.isValid) {
        console.warn('Validation failed:', validation.errors);
        setSubmissionError('Validation failed. See console for details.');
        return;
      }

      // Use the centralized storage hook to update all form data
      updateFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        birthTime: data.birthTime,
        birthPlace: data.birthPlace,
        lat: data.lat,
        lon: data.lon,
        timezone: data.timezone,
        unknownTime: data.unknownTime
      });
      
      console.log('Birth form - Data successfully stored');
      
      // Navigate to confirmation page with readings in URL
      navigateToStep('/birth-form/confirmation');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setSubmissionError(errorMessage);
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
      console.log('--- END SUBMIT ---');
    }
  };

  const formError = form.formState.errors ? Object.values(form.formState.errors)[0]?.message || null : null;
  const error = submissionError || formError;

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    isLoading: form.formState.isSubmitting || isSubmitting,
    error,
    selectedReadings: readings,
  };
}; 
}; 