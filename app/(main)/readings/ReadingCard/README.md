# ReadingCard Component

The ReadingCard component displays information about an astrology reading offering, with a flippable card interface that shows more details on the back.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Title of the reading |
| `headline` | `string` | Main headline displayed on the card front |
| `subheadline` | `string` | Secondary text displayed below the headline |
| `details` | `string[]` | Array of bullet points for the front of the card |
| `backDetails` | `string[]` | Array of additional details for the back of the card |
| `selected` | `boolean` | Whether this reading is currently selected (in cart) |
| `onSelect` | `() => void` | Callback function when the Add/Remove button is clicked |

## Usage

```tsx
<ReadingCard
  title="Natal Chart"
  headline="Complete Birth Chart"
  subheadline="Your cosmic blueprint"
  details={[
    "Full planet positions & aspects",
    "House placements & interpretations",
    "Core personality traits"
  ]}
  backDetails={[
    "Delivered as a beautiful PDF",
    "In-depth planet interpretations",
    "Compatible with astrology software",
    "Includes personalized insights"
  ]}
  selected={isInCart}
  onSelect={handleToggleSelection}
/>
```

## Features

- Interactive flip animation between front and back
- Selection indicator with check icon
- Consistent styling with the design system
- Add to cart / remove from cart functionality
- Responsive layout for tablet display

## Accessibility

- Proper contrast for text readability
- Focus management for keyboard navigation
- Semantic HTML structure

## Styling

- Uses CSS modules for style encapsulation
- Card design follows the AstroAware Tablet Intake Style Guide
- Smooth transitions for interactive elements 