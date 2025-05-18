# Birth Form (`app/(main)/birth-form`)

This folder contains the multi-step birth data intake flow for the AstroAware tablet app. Users enter their personal and birth details, which are validated and passed to the payment and reading generation flows.

## Structure

- **page.tsx** — Entry point for the birth form flow (may redirect or orchestrate steps).
- **name/** — Step for entering name and basic info.
- **date/** — Step for entering birth date and time.
- **location/** — Step for entering birth location (with autocomplete subcomponent).
- **confirmation/** — Step for reviewing and confirming all entered data before payment.
- **utils/** — Shared utility functions (validation, formatting, etc.).
- **hooks/** — Custom React hooks for form state and submission logic.
- **types/** — TypeScript types for form values, API data, and field props.
- **README.md** — This documentation file.

## Component Overview

### Step Pages (`name/`, `date/`, `location/`, `confirmation/`)
- Each step is a self-contained folder with its own `page.tsx` and styles.
- Steps use shared hooks and types for consistency.

### `LocationAutocomplete`
- Modular autocomplete component for birth location entry.
- Handles search, selection, and validation.

### Hooks & Utils
- **`useBirthForm`**: Manages form state, validation, and navigation between steps.
- **`useFormSubmission`**: Handles API submission and error state.
- **`validation.ts`**: Zod schema and validation helpers.
- **`formatters.ts`**: Formatting helpers for dates, times, and API data.

### Types
- **`BirthFormValues`**: Inferred from Zod schema, used for form state.
- **`BirthFormData`** (shared): User-facing, passed to payment and confirmation.
- **`BirthFormApiData`**: Internal/API shape, used for backend submission.

## Data Flow
- Users progress through each step, with validation at each stage.
- On confirmation, data is formatted and submitted to the backend.
- Data is passed to payment and reading flows as needed.

## Style Guide Alignment
- Typography, spacing, and color follow the AstroAware Tablet Intake Style Guide.
- All components use CSS modules for styling.
- Touch targets and accessibility attributes are included per spec.

## Extending
- Add new steps by creating a new folder and updating the step config.
- Update validation or formatting in `utils/` as needed.
- Add new fields to the Zod schema and update types accordingly.

## Birth Form Module

## Overview

The Birth Form module provides a multi-step form for collecting birth information from users, which is required for generating personalized astrological readings. The module is designed with a centralized state management approach to maintain consistent data across all steps.

## Key Components

- **Form Steps**: Name, Date/Time, Location, Confirmation
- **Storage Hook**: Centralized state management via `useBirthFormStorage`
- **Validation**: Schema-based validation with Zod

## State Management

We use a centralized state management approach with these key features:

1. **Single Source of Truth**: The `useBirthFormStorage` hook serves as the central repository for form data.
2. **Persistence**: Form data is automatically saved to localStorage to preserve progress.
3. **URL Parameters**: Reading selections are maintained in URL parameters across navigation.
4. **Error Handling**: Robust error handling for localStorage failures with in-memory fallback.

### How to Use the Storage Hook

```tsx
const { 
  formData,         // Current form data
  readings,         // Selected readings
  storageAvailable, // Whether localStorage is available
  updateFormData,   // Function to update form data
  clearFormData,    // Function to clear all form data
  navigateToStep    // Function to navigate between steps
} = useBirthFormStorage();
```

## Form Data Schema

The form collects the following information:

- **Name**: firstName, lastName (optional)
- **Birth Date**: birthDate (required)
- **Birth Time**: birthTime (required unless unknownTime is true)
- **Birth Location**: birthPlace, lat, lon, timezone (all required)

## Navigation Flow

1. **Readings Selection** → **Name** → **Date/Time** → **Location** → **Confirmation** → **Payment**

Each step maintains its own component state but syncs with the centralized storage.

## Best Practices

- Always use `updateFormData()` to modify form data
- Use `navigateToStep()` instead of direct router navigation to preserve readings
- Check `formData` for existing values when initializing component state
- Clear form data with `clearFormData()` after successful submission

## Error Handling

The module includes comprehensive error handling:

- LocalStorage availability detection
- Fallback for when storage is unavailable
- Data corruption recovery
- Form validation with user-friendly error messages

---

For questions or changes, see the main project README or contact the design/dev team. 