# Button Components

A collection of button components that follow our design system guidelines.

## Components

### Button

The main button component with support for variants, sizes, icons, and loading states.

```tsx
import { Button } from '@/components/ui/Button';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// With icons
<Button leftIcon={<Icon />}>With Left Icon</Button>
<Button rightIcon={<Icon />}>With Right Icon</Button>

// Loading state
<Button isLoading>Loading</Button>

// Full width
<Button fullWidth>Full Width</Button>
```

### IconButton

A button that displays only an icon, with proper accessibility support.

```tsx
import { IconButton } from '@/components/ui/Button';

// Basic usage
<IconButton icon={<Icon />} label="Close" />

// With variants
<IconButton icon={<Icon />} label="Close" variant="primary" />
<IconButton icon={<Icon />} label="Close" variant="secondary" />
<IconButton icon={<Icon />} label="Close" variant="tertiary" />

// With sizes
<IconButton icon={<Icon />} label="Close" size="sm" />
<IconButton icon={<Icon />} label="Close" size="md" />
<IconButton icon={<Icon />} label="Close" size="lg" />

// Loading state
<IconButton icon={<Icon />} label="Close" isLoading />
```

## Props

### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' | 'primary' | Visual style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the button |
| isLoading | boolean | false | Whether the button is in a loading state |
| leftIcon | ReactNode | undefined | Icon to be rendered before the content |
| rightIcon | ReactNode | undefined | Icon to be rendered after the content |
| fullWidth | boolean | false | Whether the button should take up the full width |
| className | string | undefined | Additional CSS class name |
| disabled | boolean | false | Whether the button is disabled |

### IconButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'tertiary' | 'primary' | Visual style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Size of the button |
| isLoading | boolean | false | Whether the button is in a loading state |
| icon | ReactNode | required | Icon to be rendered inside the button |
| label | string | required | Accessible label for the button |
| className | string | undefined | Additional CSS class name |
| disabled | boolean | false | Whether the button is disabled |

## Design System Compliance

- Follows our color system using CSS variables
- Implements proper hover and active states
- Maintains consistent spacing and sizing
- Supports dark mode through CSS variables
- Implements proper focus states for accessibility

## Accessibility

- Proper ARIA attributes for loading states
- Icon buttons include required labels
- Focus states are clearly visible
- Disabled states are properly communicated
- Loading states are properly announced

## Best Practices

1. Always provide a label for IconButton
2. Use loading states for async actions
3. Choose appropriate variants based on hierarchy
4. Consider touch targets for mobile (min 48px)
5. Use fullWidth sparingly and only when needed 