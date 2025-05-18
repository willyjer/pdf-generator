export interface Reading {
  id: string;
  price: number;
}

export interface BirthFormData {
  firstName: string;
  lastName: string;
  date: string;
  time: string | null;
  birthPlace: string;
  lat: number;
  lon: number;
  timezone: string | number;
  unknownTime?: boolean;
  readings?: string[];
} 