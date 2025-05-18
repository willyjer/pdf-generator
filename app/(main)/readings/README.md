# Readings Page (`app/(main)/readings`)

This folder contains the code for the "Choose a Reading" experience in the AstroAware tablet app. Users select one or more astrology readings to purchase before proceeding to the intake flow.

## Structure

- **page.tsx** — Main entry point for the readings page. Handles UI logic, state, and orchestration.
- **PillSelector.tsx** — Pill navigation component for switching between reading types. Handles scroll and underline animation.
- **readingsData.ts** — Contains the `Reading` type, the `readings` array, and the `backDetailsMap` for reading details. Easy to extend as new readings are added.
- **README.md** — This documentation file.

## Component Overview

### `PillSelector`
- Renders horizontally scrollable pills for each reading type.
- Animates underline and centers the active pill.
- Props:
  - `readings`: Array of reading objects (id, title).
  - `selected`: Currently selected reading id.
  - `onSelect`: Callback to change selection.
  - `pillContainerRef`, `underlineRef`: For scroll/animation control.

### `ReadingCard` (imported)
- Displays the details for the selected reading.
- Handles selection (add/remove from cart).

### `StarfieldBackground` (global)
- Animated cosmic background, imported from `components/ui/StarfieldBackground`.

## Data
- All readings and their details are defined in `readingsData.ts`.
- To add a new reading, simply add an entry to the `readings` array and update `backDetailsMap`.

## Usage
- Users select one or more readings, which are added to a cart.
- The "Continue" button passes selected readings to the next step via URL parameters.
- The pill selector and card stack provide a modern, touch-friendly UI.

## Style Guide Alignment
- Typography, spacing, and color follow the AstroAware Tablet Intake Style Guide.
- All components use CSS modules for styling.
- Touch targets and accessibility attributes are included per spec.

## Extending
- Add new readings in `readingsData.ts`.
- Extract additional subcomponents as needed for maintainability.
- Add tests for UI logic and state if desired.

---

For questions or changes, see the main project README or contact the design/dev team. 