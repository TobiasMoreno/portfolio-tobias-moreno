## ADDED Requirements

### Requirement: Tri-state theme model

The system SHALL expose a theme mode with exactly three values — `system`, `light`, and `dark` — and SHALL derive a resolved theme (`light` or `dark`) used to style the document.

#### Scenario: System mode resolves from OS preference

- **WHEN** the theme mode is `system` and the user agent reports `prefers-color-scheme: dark`
- **THEN** the resolved theme is `dark` and the `dark` class is present on `<html>`

#### Scenario: System mode resolves to light when OS prefers light

- **WHEN** the theme mode is `system` and the user agent reports `prefers-color-scheme: light` (or no preference)
- **THEN** the resolved theme is `light` and the `dark` class is absent from `<html>`

#### Scenario: Explicit dark overrides system preference

- **WHEN** the theme mode is set to `dark`
- **THEN** the resolved theme is `dark` regardless of OS preference and the `dark` class is present on `<html>`

#### Scenario: Explicit light overrides system preference

- **WHEN** the theme mode is set to `light`
- **THEN** the resolved theme is `light` regardless of OS preference and the `dark` class is absent from `<html>`

### Requirement: Theme persistence

The system SHALL persist the user's selected theme mode (not the resolved theme) to `localStorage` under the key `tm-theme` and SHALL restore it on subsequent loads.

#### Scenario: Mode survives page reload

- **WHEN** the user sets the mode to `dark` and reloads the page
- **THEN** the mode signal initializes to `dark` and the document is dark before the user interacts

#### Scenario: First visit defaults to system

- **WHEN** the user visits for the first time and `tm-theme` is absent from localStorage
- **THEN** the mode signal initializes to `system`

#### Scenario: Corrupt persisted value is ignored

- **WHEN** `tm-theme` contains a value other than `system`, `light`, or `dark`
- **THEN** the mode signal initializes to `system` and the corrupt value is overwritten on the next set

### Requirement: Reactive OS preference tracking

The system SHALL react to changes in `prefers-color-scheme` while in `system` mode and SHALL stop reacting when the user picks an explicit mode.

#### Scenario: OS theme change in system mode updates document

- **GIVEN** the mode is `system` and the document is currently `light`
- **WHEN** the OS preference changes to dark
- **THEN** the resolved theme becomes `dark` and the `dark` class is added to `<html>`

#### Scenario: OS theme change is ignored in explicit mode

- **GIVEN** the mode is `light`
- **WHEN** the OS preference changes to dark
- **THEN** the resolved theme remains `light` and the `dark` class is not added

### Requirement: First-paint theme application

The system SHALL apply the correct `dark` class to `<html>` before Angular bootstrapping completes so that the user does not see a flash of incorrect theme.

#### Scenario: Persisted dark theme is applied before Angular boots

- **GIVEN** `localStorage.tm-theme` is `dark`
- **WHEN** the page loads
- **THEN** the `dark` class is present on `<html>` before the first Angular template renders

### Requirement: SSR-safe construction

The theme service SHALL NOT throw or read browser globals (`window`, `document`, `localStorage`, `matchMedia`) when instantiated outside a browser platform.

#### Scenario: Service constructs on the server

- **WHEN** the service is instantiated under a non-browser `PLATFORM_ID`
- **THEN** it returns the default mode (`system`) and a default resolved theme (`light`) without touching browser globals
