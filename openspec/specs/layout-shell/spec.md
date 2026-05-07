## ADDED Requirements

### Requirement: Application shell composition

The system SHALL render a top-level shell composed of a header, a main content region with a router outlet, and a footer, in that DOM order, on every page.

#### Scenario: Shell renders three regions

- **WHEN** the application bootstraps
- **THEN** the rendered DOM contains a `<header>` element followed by a `<main>` element containing a `<router-outlet>`, followed by a `<footer>` element

#### Scenario: Shell removes the Angular CLI placeholder

- **WHEN** the application bootstraps
- **THEN** none of the placeholder Angular CLI markup (Angular logo SVG, "Hello, portfolio-tobias-moreno", pill links to `angular.dev`) is present anywhere in the DOM

### Requirement: Single-route home

The system SHALL register a single route `''` that lazy-loads the home component, and SHALL render the home component into the main router outlet.

#### Scenario: Root URL renders home

- **WHEN** the user navigates to `/`
- **THEN** the home component is rendered inside the router outlet

#### Scenario: Home is lazy-loaded

- **WHEN** the application is built
- **THEN** the home component is bundled into a separate JavaScript chunk, not the initial bundle

### Requirement: Application providers

The system SHALL configure `provideHttpClient(withFetch())`, animation providers via `provideAnimationsAsync()`, router with `withComponentInputBinding()`, and `withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })`.

#### Scenario: HttpClient is available for content loading

- **WHEN** any service injects `HttpClient`
- **THEN** the injection succeeds and uses the Fetch backend

#### Scenario: Anchor links smooth-scroll within home

- **GIVEN** the home component contains an element with `id="projects"`
- **WHEN** the user navigates to `/#projects`
- **THEN** the viewport scrolls so the `#projects` element is in view

### Requirement: Static SEO metadata

The system SHALL set the document `<title>` to `Tobias Moreno — Backend Engineer`, a meta description appropriate for the home page, and Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`) referencing `https://tobiasmoreno.dev`.

#### Scenario: Document title on home

- **WHEN** the home component activates
- **THEN** `document.title` equals `Tobias Moreno — Backend Engineer`

#### Scenario: Open Graph tags are present

- **WHEN** the application bootstraps
- **THEN** the document head contains `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:type" content="website">`, and `<meta property="og:url" content="https://tobiasmoreno.dev">`

### Requirement: Tailwind theming tokens

The system SHALL define design tokens (`--color-bg`, `--color-fg`, `--color-muted`, `--color-accent`, `--font-sans`) via Tailwind v4 `@theme` in `src/styles.css`, and SHALL provide overrides for the `dark` class.

#### Scenario: Tokens are available to utility classes

- **WHEN** a component uses `class="bg-[--color-bg] text-[--color-fg]"`
- **THEN** the rendered element resolves the colors from the active theme tokens

#### Scenario: Dark mode swaps token values

- **WHEN** the `dark` class is added to `<html>`
- **THEN** elements consuming `--color-bg` and `--color-fg` reflect the dark-mode token values
