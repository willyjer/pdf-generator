# BirthDataSummary Component

A component that displays the user's birth data information in a formatted section for the confirmation page.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `formData` | `BirthFormData` | The birth form data object containing user's information |

## Features

- Displays the user's name (or "No name provided" if none)
- Shows birth date in localized format
- Shows birth time (or appropriate message if unknown/not provided)
- Displays formatted birth location

## Usage

```tsx
<BirthDataSummary formData={formData} />
```

## Styling

The component uses CSS modules for styling with the following classes:
- `.section`: Container for the entire section with background and border styling
- `.sectionHeader`: Header area containing the section title
- `.sectionTitle`: Styling for the "Personal Information" heading
- `.sectionContent`: Container for the content area
- `.subsection`: Container for subsections (name/date and location)
- `.nameRow`: Row layout for name and date/time display
- `.value`: Styling for primary text values
- `.dateValue`: Styling for date/time display
- `.emptyValue`: Styling for placeholder text when data is missing

All styles follow the AstroAware Tablet Intake Style Guide. 