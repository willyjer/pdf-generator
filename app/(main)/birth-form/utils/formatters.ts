import { BirthFormValues } from '../types';
import { BirthFormApiData } from '../types';
import { DateTime } from 'luxon';

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time: string): string => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export const formatFormData = (data: BirthFormValues): BirthFormApiData => {
  const [year, month, day] = data.birthDate.split('-');
  const [hour, min] = data.birthTime.split(':');

  const formattedData: BirthFormApiData = {
    firstName: data.firstName,
    lastName: data.lastName || '',
    birthDate: formatDate(data.birthDate),
    birthTime: formatTime(data.birthTime),
    birthPlace: data.birthPlace,
    lat: data.lat,
    lon: data.lon,
    day: parseInt(day),
    month: parseInt(month),
    year: parseInt(year),
    hour: parseInt(hour),
    min: parseInt(min),
    tzone: data.timezone,
    unknownTime: data.unknownTime
  };

  return formattedData;
};

export const getTimezoneOffset = (timezone: string): number => {
  try {
    const dt = DateTime.now().setZone(timezone);
    return dt.offset / 60;
  } catch (error) {
    return 0;
  }
};

export const getCurrentTimezone = (): string => {
  return DateTime.now().zoneName;
};

export const validateTimezone = (timezone: string): boolean => {
  try {
    DateTime.now().setZone(timezone);
    return true;
  } catch (error) {
    return false;
  }
};

export const formatTimezoneName = (timezone: string): string => {
  console.log('=== TIMEZONE NAME FORMATTING DEBUG ===');
  console.log('Input timezone:', {
    timezone,
    timestamp: new Date().toISOString()
  });

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'long',
    });
    const result = formatter.formatToParts().find(part => part.type === 'timeZoneName')?.value || timezone;
    
    console.log('Formatted timezone name:', {
      input: timezone,
      result,
      timestamp: new Date().toISOString()
    });
    
    return result;
  } catch (e) {
    console.error('Error formatting timezone name:', {
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
      timestamp: new Date().toISOString()
    });
    return timezone;
  }
}; 