# LocationAutocomplete Component

A location search component with autocomplete functionality for the birth form flow. Uses Nominatim API for geocoding and includes timezone detection.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onPlaceSelect` | `(place: { name: string; lat: number; lng: number; timezone?: number }) => void` | Callback function when a location is selected |
| `defaultValue` | `string` | Optional initial value for the input field |
| `error` | `string` | Optional error message to display |
| `birthDate` | `{ day: number; month: number; year: number; hour: number; minute: number }` | Optional birth date information used for timezone calculations |
| `className` | `string` | Optional additional CSS class names |

## Features

- Location search with autocomplete suggestions
- Debounced API calls to reduce network requests
- Timezone detection based on coordinates
- Loading state indication
- Error handling
- Click-outside behavior to dismiss suggestions

## Usage

```tsx
<LocationAutocomplete
  onPlaceSelect={handlePlaceSelect}
  defaultValue={locationName}
  error={locationError}
  birthDate={birthDateObject}
/>
```

## Styling

The component uses CSS modules for styling with the following classes:
- `.container`: Main container for the component
- `.inputContainer`: Container for the input field and search icon
- `.searchIcon`: Styling for the search icon
- `.loadingIndicator`: Container for the loading spinner and text
- `.spinner`: Animated loading spinner
- `.suggestionsList`: List of autocomplete suggestions
- `.suggestionItem`: Individual suggestion item

All styles follow the AstroAware Tablet Intake Style Guide. 