import { z } from 'zod';
import { BirthFormValues } from '../types';

// Zod Schema
export const birthFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthDate: z.string().min(1, 'Birth date is required'),
  birthTime: z.string(),
  birthPlace: z.string().min(1, 'Birth place is required'),
  lat: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
  lon: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
  timezone: z.number(),
  unknownTime: z.boolean().default(false),
}).refine((data) => {
  // Only require birth time if unknownTime is false
  if (!data.unknownTime) {
    return data.birthTime.length > 0;
  }
  return true;
}, {
  message: "Birth time is required when known",
  path: ["birthTime"]
});

// Validation Helpers
export const validateBirthForm = (data: BirthFormValues) => {
  try {
    const result = birthFormSchema.parse(data);
    return {
      isValid: true,
      data: result
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.errors.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      };
    }
    return {
      isValid: false,
      errors: [{ field: 'unknown', message: 'An unexpected error occurred' }]
    };
  }
};

export const getFieldError = (errors: { field: string; message: string }[], fieldName: keyof BirthFormValues) => {
  return errors.find(error => error.field === fieldName)?.message;
};

export const validateDate = (date: string) => {
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
};

export const validateTime = (time: string) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

export const validateTimezone = (timezone: string) => {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch (e) {
    return false;
  }
}; 