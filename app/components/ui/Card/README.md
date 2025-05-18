# Card Components

A collection of card components that follow our design system guidelines.

## Components

### Card

The base card component that provides the foundation for all other card variants.

```tsx
import { Card } from '@/components/ui/Card';

// Basic usage
<Card>
  <p>Card content</p>
</Card>

// With custom class
<Card className="custom-class">
  <p>Custom styled card</p>
</Card>
```

### SelectionCard

A card component for selectable options, with support for icons, selection state, and disabled state.

```tsx
import { SelectionCard } from '@/components/ui/Card';

// Basic usage
<SelectionCard
  title="Option Title"
  description="Option description"
  icon={<Icon />}
  onClick={() => {}}
/>

// Selected state
<SelectionCard
  title="Selected Option"
  description="This option is selected"
  isSelected
  onClick={() => {}}
/>

// Disabled state
<SelectionCard
  title="Disabled Option"
  description="This option is not available"
  disabled
  onClick={() => {}}
/>
```

### FormStepCard

A card component for displaying form steps with progress indication.

```tsx
import { FormStepCard } from '@/components/ui/Card';

// Basic usage
<FormStepCard
  title="Step Title"
  description="Step description"
  stepNumber={1}
>
  <p>Step content</p>
</FormStepCard>

// Active state
<FormStepCard
  title="Current Step"
  description="This step is active"
  stepNumber={2}
  isActive
>
  <p>Current step content</p>
</FormStepCard>

// Completed state
<FormStepCard
  title="Completed Step"
  description="This step is done"
  stepNumber={1}
  isCompleted
>
  <p>Completed step content</p>
</FormStepCard>
```

## Props

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | required | Content to be rendered inside the card |
| className | string | undefined | Additional CSS class name |

### SelectionCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Title of the card |
| description | string | undefined | Optional description text |
| icon | ReactNode | undefined | Icon to be displayed in the card |
| isSelected | boolean | false | Whether the card is currently selected |
| onClick | () => void | undefined | Callback when the card is clicked |
| disabled | boolean | false | Whether the card is disabled |
| className | string | undefined | Additional CSS class name |
| children | ReactNode | undefined | Additional content to render |

### FormStepCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | Title of the form step |
| description | string | undefined | Optional description of the step |
| stepNumber | number | required | The step number |
| isActive | boolean | false | Whether this is the currently active step |
| isCompleted | boolean | false | Whether this step has been completed |
| className | string | undefined | Additional CSS class name |
| children | ReactNode | undefined | Content to be rendered in the step |

## Design System Compliance

- Follows our color system using CSS variables
- Implements proper hover and active states
- Maintains consistent spacing and sizing
- Supports dark mode through CSS variables
- Implements proper focus states for accessibility

## Accessibility

- SelectionCard uses proper button semantics
- FormStepCard uses proper heading hierarchy
- Clear visual indicators for states (selected, active, completed)
- Proper focus management for interactive cards
- Disabled states are properly communicated

## Best Practices

1. Use SelectionCard for mutually exclusive options
2. Keep card titles concise and descriptive
3. Use icons to enhance meaning, not replace text
4. Consider touch targets for mobile (min 48px)
5. Use FormStepCard for multi-step forms
6. Keep step descriptions clear and actionable 