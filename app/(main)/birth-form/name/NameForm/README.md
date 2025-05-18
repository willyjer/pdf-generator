# NameForm Component

A form component for collecting user's first and last name in the birth form flow.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `firstName` | `string` | Current value of the first name field |
| `lastName` | `string` | Current value of the last name field |
| `onFirstNameChange` | `(value: string) => void` | Handler for first name changes |
| `onLastNameChange` | `(value: string) => void` | Handler for last name changes |
| `onNext` | `() => void` | Handler for the Next button click |
| `onBack` | `() => void` | Handler for the Back button click |

## Usage

```tsx
<NameForm 
  firstName={firstName}
  lastName={lastName}
  onFirstNameChange={setFirstName}
  onLastNameChange={setLastName}
  onNext={handleNext}
  onBack={handleBack}
/>
```

## Styling

The component uses CSS modules for styling with the following classes:
- `.form`: Container for the entire form with column layout
- `.nameRow`: Row layout for the first and last name inputs
- `.buttons`: Container for the navigation buttons with space-between alignment

All styles follow the AstroAware Tablet Intake Style Guide. 