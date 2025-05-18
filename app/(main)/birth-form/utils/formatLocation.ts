interface LocationParts {
  city?: string;
  state?: string;
  country?: string;
}

export function parseLocationString(fullLocation: string): LocationParts {
  const parts = fullLocation.split(', ');
  const result: LocationParts = {};

  // Handle USA format
  if (parts[parts.length - 1] === 'United States') {
    // Usually format is: City, County, State, USA
    // or: City, State, USA
    const stateIndex = parts.length >= 3 ? parts.length - 2 : -1;
    if (stateIndex >= 0) {
      result.city = parts[0];
      result.state = parts[stateIndex];
      result.country = 'USA';
    }
  }
  // Handle UK format
  else if (parts[parts.length - 1] === 'United Kingdom') {
    result.city = parts[0];
    if (parts.length >= 3) {
      result.state = parts[parts.length - 2];
    }
    result.country = 'UK';
  }
  // Handle other countries
  else {
    result.city = parts[0];
    result.country = parts[parts.length - 1];
  }

  return result;
}

export function formatLocation(fullLocation: string): string {
  const parts = parseLocationString(fullLocation);
  
  // USA format: City, State, USA
  if (parts.country === 'USA') {
    if (parts.city && parts.state) {
      return `${parts.city}, ${parts.state}`;
    }
  }
  
  // UK format: City, UK
  if (parts.country === 'UK') {
    if (parts.city) {
      return `${parts.city}, UK`;
    }
  }
  
  // Default format for other countries: City, Country
  if (parts.city && parts.country) {
    return `${parts.city}, ${parts.country}`;
  }
  
  // Fallback if we can't parse it properly
  const lastCommaIndex = fullLocation.lastIndexOf(',');
  if (lastCommaIndex > 0) {
    return fullLocation.substring(0, lastCommaIndex).trim();
  }
  
  return fullLocation;
} 