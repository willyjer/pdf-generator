# Payment Page (`app/(main)/payment`)

This folder contains the code for the payment experience in the AstroAware tablet app. Users complete their purchase after selecting readings and entering birth data.

## Structure

- **page.tsx** — Main entry point for the payment page. Handles Stripe logic, state, and orchestration.
- **PaymentForm.tsx** (in `components/`) — Stripe payment form UI and logic. Receives birth data and readings as props.
- **README.md** — This documentation file.

## Component Overview

### `PaymentForm`
- Handles Stripe Elements integration and payment confirmation.
- Receives:
  - `readingsCount`: Number of readings selected.
  - `totalAmount`: Total price for the order.
  - `birthFormData`: User's birth and contact info.

### `StarfieldBackground` (global)
- Animated cosmic background, imported from `components/ui/StarfieldBackground`.

## Data & Types
- Shared types (`BirthFormData`, `Reading`) are defined in `types/index.ts` and imported where needed.
- Query params are parsed for readings and birth data, then stored in sessionStorage for use across the payment flow.

## Usage
- Users land here after completing the birth form and selecting readings.
- Stripe Elements is used for secure payment.
- On success or cancel, the user is redirected to the appropriate page, with data passed via sessionStorage.

## Style Guide Alignment
- Typography, spacing, and color follow the AstroAware Tablet Intake Style Guide.
- All components use CSS modules for styling.
- Touch targets and accessibility attributes are included per spec.

## Extending
- Update Stripe appearance or logic in `page.tsx` as needed.
- Add new payment methods or UI blocks by extracting subcomponents.
- Add tests for payment logic and form submission if desired.

---

For questions or changes, see the main project README or contact the design/dev team. 