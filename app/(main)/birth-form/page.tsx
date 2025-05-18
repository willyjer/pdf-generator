'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BirthFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Preserve readings parameters when redirecting
    const readings = searchParams.getAll('readings');
    const params = new URLSearchParams();
    readings.forEach(reading => {
      params.append('readings', reading);
    });
    
    const queryString = params.toString();
    const redirectPath = queryString ? `/birth-form/name?${queryString}` : '/birth-form/name';
    
    router.push(redirectPath);
  }, [router, searchParams]);

  return null;
}