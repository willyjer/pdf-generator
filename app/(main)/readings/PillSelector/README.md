# PillSelector Component

The PillSelector component provides a horizontally scrollable list of pill-shaped buttons for selecting different reading types in the AstroAware tablet app.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `readings` | `Reading[]` | Array of reading objects with id and title |
| `selected` | `string` | ID of the currently selected reading |
| `onSelect` | `(id: string) => void` | Callback function when a pill is selected |
| `pillContainerRef` | `React.RefObject<HTMLDivElement>` | Ref for the container element |
| `underlineRef` | `React.RefObject<HTMLDivElement>` | Ref for the animated underline element |

## Usage

```tsx
// In a parent component:
const pillContainerRef = useRef<HTMLDivElement>(null);
const underlineRef = useRef<HTMLDivElement>(null);

// Then in JSX:
<PillSelector 
  readings={readings}
  selected={selectedReading}
  onSelect={handleSelectReading}
  pillContainerRef={pillContainerRef}
  underlineRef={underlineRef}
/>
```

## Features

- Horizontally scrollable pills for reading selection
- Automatic centering of selected pill
- Animated underline that follows the selected pill
- Left/right scroll buttons for easier navigation
- Responsive design for tablet screens
- Touch-friendly interactions

## Accessibility

- Scroll buttons include proper aria-labels
- Focus management for keyboard navigation
- High contrast between text and background

## Styling

- Uses CSS modules for style encapsulation
- All styling follows the AstroAware Tablet Intake Style Guide
- Visual feedback on hover, focus, and active states 