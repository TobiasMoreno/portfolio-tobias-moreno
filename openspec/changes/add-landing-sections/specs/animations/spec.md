## ADDED Requirements

### Requirement: Scroll-triggered section fade-in

The system SHALL animate each section with a fade-in and slide-up effect at the moment the section first enters the viewport, using CSS `@keyframes` triggered at component mount time via Angular's `@defer (on viewport)` mechanism.

#### Scenario: Section animates on first render

- **WHEN** a deferred section enters the viewport and Angular renders it into the DOM
- **THEN** the section plays a `tm-fade-in-up` animation (opacity 0→1, translateY 20px→0) over 400ms with an ease-out curve

#### Scenario: Hero section has an entry animation

- **WHEN** the Hero section mounts (eagerly, on page load)
- **THEN** the name, tagline, and CTAs animate in with a staggered fade-in sequence

#### Scenario: Animation does not block interactivity

- **WHEN** a section is animating
- **THEN** all links, buttons, and interactive elements within the section are fully interactive during and after the animation

### Requirement: Card hover micro-interactions

The system SHALL apply hover transitions to interactive cards (project cards, mindset cards) using CSS transitions.

#### Scenario: Project card hover lifts and adds shadow

- **WHEN** the user hovers over a project card
- **THEN** the card applies a subtle upward translate and elevated shadow within 200ms

#### Scenario: Mindset card hover highlights border

- **WHEN** the user hovers over a mindset card
- **THEN** the card border transitions to the accent color within 200ms

#### Scenario: Transitions respect prefers-reduced-motion

- **WHEN** the user's OS preference is `prefers-reduced-motion: reduce`
- **THEN** all CSS animations and transitions are disabled or reduced to instant changes
