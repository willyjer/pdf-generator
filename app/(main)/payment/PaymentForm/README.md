# PaymentForm Component

The PaymentForm component handles the Stripe payment integration for the AstroAware tablet app. It displays an order summary, payment methods, and provides a secure checkout experience.

## Props

| Prop | Type | Description |
|------|------|-------------|
| `readingsCount` | `number` | Number of readings in the current order |
| `totalAmount` | `number` | Total price of the order |
| `birthFormData` | `BirthFormData` | User's birth and contact information |

## Usage

```tsx
<PaymentForm 
  readingsCount={selectedReadings.length}
  totalAmount={totalPrice}
  birthFormData={birthFormData}
/>
```

Note: This component must be used within a Stripe `Elements` provider that has been initialized with a client secret.

## Features

- Order summary with reading count and total amount
- Stripe Elements integration with customized styling
- Error handling and validation
- Processing state management
- Secure payment submission
- Branded footer with Stripe attribution

## Stripe Integration

The component uses the following Stripe Elements features:
- Payment Element for flexible payment method selection
- Accordion layout for payment methods
- Custom styling to match AstroAware design system
- Automatic redirect to success/failure pages

## Error Handling

Payment errors are:
- Captured and displayed to the user
- Formatted in a consistent error message style
- Cleared when retrying payment

## Styling

- All styles follow the AstroAware Tablet Intake Style Guide
- CSS Modules for style encapsulation
- Custom styling for Stripe Elements using global selectors
- Responsive design for tablet display

## Accessibility

- Form elements properly labeled
- Error states clearly indicated
- Interactive elements have appropriate focus states
- Processing states prevent duplicate submissions 