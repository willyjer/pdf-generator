import { NextResponse } from 'next/server';

// The TimeZoneDB API with your personal API key
const API_KEY = 'NGSLBYBLEU2H';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  
  if (!lat || !lng) {
    console.error('Missing required parameters:', { lat, lng });
    return NextResponse.json({ error: 'Missing lat/lng parameters' }, { status: 400 });
  }
  
  try {
    const response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`
    );
    
    if (!response.ok) {
      console.error('TimeZoneDB API error:', {
        status: response.status,
        statusText: response.statusText
      });
      return NextResponse.json(
        { error: `TimeZoneDB API returned status: ${response.status}` }, 
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('TimeZoneDB API error:', {
      message: error.message,
      stack: error.stack,
      rawError: error
    });
    return NextResponse.json(
      { error: 'Failed to fetch timezone data', details: error.message ?? String(error) }, 
      { status: 500 }
    );
  }
} 