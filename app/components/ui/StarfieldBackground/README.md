# StarfieldBackground Component

A component that creates an animated starfield background effect with twinkling stars.

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `className` | `string` | Optional additional CSS class names | `''` |

## Features

- Generates a field of 50 stars with randomized positions
- Stars animate with a gentle pulsing effect
- Each star has a random animation delay for natural movement
- Component is memoized to prevent unnecessary re-renders

## Usage

```tsx
// Basic usage
<StarfieldBackground />

// With custom className
<StarfieldBackground className="my-custom-starfield" />
```

## Styling

The component uses CSS modules for styling with the following classes:
- `.starfieldBg`: Container for the entire starfield (positioned absolutely)
- `.star`: Individual star styling with animation
- Custom @keyframes animation for the pulsing effect

## Accessibility

The component is marked with `aria-hidden="true"` as it is a decorative element.

All styles follow the AstroAware Tablet Intake Style Guide. 