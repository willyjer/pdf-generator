# IntroHero Component

The IntroHero component displays the main headline, subheadline, and call-to-action buttons for the AstroAware tablet app's intro page.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onStart` | `() => void` | Function to trigger when the user wants to begin |
| `onLearnMore` | `() => void` | Function to show more information |

## Usage

```tsx
import IntroHero from './IntroHero';

<IntroHero 
  onStart={() => router.push('/readings')} 
  onLearnMore={() => setSection(1)} 
/>
```

## Styling

- Uses CSS modules for styling
- Typography follows the AstroAware Tablet Intake Style Guide
- Headline uses Playfair Display, serif font
- Subheadline uses Inter, sans-serif font

## Accessibility

- Buttons include appropriate aria-labels
- Color contrast meets WCAG AA standards 