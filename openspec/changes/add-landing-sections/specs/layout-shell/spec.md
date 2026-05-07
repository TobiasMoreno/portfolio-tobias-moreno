## ADDED Requirements

### Requirement: Site header navigation

The system SHALL render navigation links in the site header for all 8 landing sections, using translated labels from `LocaleService` and routing to in-page anchors.

#### Scenario: Nav links use translated labels

- **WHEN** the header renders with the active locale set to `en`
- **THEN** the nav links display "About", "Experience", "Projects", "Stack", "Writing", "Contact"

#### Scenario: Nav links scroll to section anchors

- **WHEN** the user clicks a nav link (e.g., "Projects")
- **THEN** the router navigates to `/#projects` and the viewport scrolls to the element with `id="projects"`

### Requirement: Site header locale and theme toggles

The system SHALL render a locale toggle button (`EN` / `ES`) and a theme toggle button in the site header that call `LocaleService.setLocale()` and `ThemeService.setMode()` respectively.

#### Scenario: Locale toggle switches language

- **WHEN** the user clicks the locale toggle button while locale is `en`
- **THEN** `LocaleService.setLocale('es')` is called and the button updates to reflect the new locale

#### Scenario: Theme toggle cycles through modes

- **WHEN** the user clicks the theme toggle button
- **THEN** the theme mode advances through `light → dark → system` (or equivalent cycle) and the resolved theme updates immediately

### Requirement: Mobile navigation menu

The system SHALL render a hamburger button in the site header on mobile viewports that opens a full-screen overlay menu with all navigation links, locale toggle, and theme toggle.

#### Scenario: Hamburger button is visible on mobile

- **WHEN** the viewport width is below the mobile breakpoint
- **THEN** the desktop nav links are hidden and the hamburger button is visible

#### Scenario: Overlay opens and closes

- **WHEN** the user taps the hamburger button
- **THEN** the overlay menu appears with all nav links visible

#### Scenario: Overlay closes on nav link tap

- **WHEN** the overlay is open and the user taps a nav link
- **THEN** the overlay closes and the viewport scrolls to the target section

#### Scenario: Hamburger has correct ARIA state

- **WHEN** the overlay is closed
- **THEN** the hamburger button has `aria-expanded="false"`; when open, `aria-expanded="true"`

### Requirement: Home page composes all 8 sections

The system SHALL render all 8 landing sections within HomeComponent in document order, with Hero loading eagerly and the remaining 7 sections deferred until their viewport entry.

#### Scenario: Hero renders immediately

- **WHEN** the home page loads
- **THEN** the Hero section is present in the DOM without any user interaction

#### Scenario: Deferred sections load on scroll

- **WHEN** the user scrolls to a deferred section for the first time
- **THEN** the section is rendered into the DOM and its entry animation plays

#### Scenario: Section order is consistent

- **WHEN** the home page renders
- **THEN** sections appear in order: Hero → About → Mindset → Experience → Projects → Stack → Writing → Contact

### Requirement: Site footer with social links and translations

The system SHALL render a site footer with translated text via `t()`, links to GitHub and LinkedIn, and a copyright line.

#### Scenario: Footer text is translated

- **WHEN** the locale switches to `es`
- **THEN** the footer copyright and "built with" strings update to Spanish

#### Scenario: Footer contains social links

- **WHEN** the footer renders
- **THEN** links to GitHub (`https://github.com/TobiasMoreno`) and LinkedIn (`https://www.linkedin.com/in/tobiasmoreno/`) are present

## MODIFIED Requirements

### Requirement: Application shell composition

The system SHALL render a top-level shell composed of a header, a main content region with a router outlet, and a footer, in that DOM order, on every page. The header SHALL contain brand identity, navigation links, locale toggle, and theme toggle. The footer SHALL contain social links and translated text.

#### Scenario: Shell renders three regions

- **WHEN** the application bootstraps
- **THEN** the rendered DOM contains a `<header>` element followed by a `<main>` element containing a `<router-outlet>`, followed by a `<footer>` element

#### Scenario: Shell removes the Angular CLI placeholder

- **WHEN** the application bootstraps
- **THEN** none of the placeholder Angular CLI markup (Angular logo SVG, "Hello, portfolio-tobias-moreno", pill links to `angular.dev`) is present anywhere in the DOM

#### Scenario: Header contains navigation and controls

- **WHEN** the application bootstraps
- **THEN** the header contains nav links to all 8 sections, a locale toggle, and a theme toggle
