# Intro Page (`app/(main)/intro`)

This folder contains the code for the AstroAware tablet app's intro (landing) experience. It introduces users to the brand, explains the reading process, and provides a call-to-action to begin their journey.

## Structure

- **page.tsx** — Main entry point for the intro page. Handles section state and high-level layout.
- **IntroHero.tsx** — Hero section with headline, subheadline, and primary/secondary CTA buttons.
- **LearnList.tsx** — "What You'll Experience" feature list with icons and descriptions.
- **IntroFooter.tsx** — Footer with copyright and navigation links.
- **README.md** — This documentation file.

## Component Overview

### `IntroHero`
- Displays the main headline and subheadline.
- Contains "Tap to Begin" and "Learn More" buttons.
- Props:
  - `onStart`: Function to trigger when the user wants to begin.
  - `onLearnMore`: Function to show more information.

### `LearnList`
- Shows a list of key features/benefits with icons.
- Used in the "Learn More" section.

### `IntroFooter`
- Displays copyright and navigation links.
- Used at the bottom of the intro page.

## Usage

- The intro page is the first screen users see.
- Section state toggles between the hero and the learn-more view.
- The starfield background is provided by the global `StarfieldBackground` component (`components/ui/StarfieldBackground`).

## Style Guide Alignment
- Typography, spacing, and color follow the AstroAware Tablet Intake Style Guide.
- All components use CSS modules for styling.
- Touch targets and accessibility attributes are included per spec.

## Extending
- To add more sections, create new components and update the section state logic in `page.tsx`.
- To update the starfield, edit the global component in `components/ui/StarfieldBackground.tsx`.

---

For questions or changes, see the main project README or contact the design/dev team. 