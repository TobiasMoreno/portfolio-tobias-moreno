## ADDED Requirements

### Requirement: Two-locale catalog

The system SHALL expose a locale signal with exactly two values — `en` and `es` — and SHALL default to `en` for first-time visitors.

#### Scenario: First visit defaults to English

- **WHEN** the user visits for the first time and `tm-locale` is absent from localStorage
- **THEN** the locale signal initializes to `en`

#### Scenario: Invalid persisted locale is ignored

- **WHEN** `tm-locale` contains a value other than `en` or `es`
- **THEN** the locale signal initializes to `en` and the invalid value is overwritten on the next set

### Requirement: Locale persistence

The system SHALL persist the selected locale to `localStorage` under the key `tm-locale` and SHALL restore it on subsequent loads.

#### Scenario: Locale survives page reload

- **WHEN** the user sets the locale to `es` and reloads the page
- **THEN** the locale signal initializes to `es`

### Requirement: Lazy dictionary loading

The system SHALL fetch translation dictionaries from `/assets/i18n/{locale}.json` on demand and SHALL only load the dictionary for the active locale.

#### Scenario: English dictionary loads on first activation

- **WHEN** the locale is set to `en` for the first time in the session
- **THEN** the system fetches `/assets/i18n/en.json` exactly once and caches it in memory

#### Scenario: Switching locales fetches the new dictionary

- **GIVEN** `en.json` has been loaded
- **WHEN** the locale is changed to `es`
- **THEN** the system fetches `/assets/i18n/es.json` and the active dictionary becomes the Spanish one

#### Scenario: Switching back to a loaded locale uses cache

- **GIVEN** both `en.json` and `es.json` have been loaded in the session
- **WHEN** the locale is changed back to a previously loaded locale
- **THEN** no additional network request is issued

### Requirement: Key-based translation with key fallback

The system SHALL provide a translation function `t(key)` that returns the translated string for the active locale, and SHALL return the key string itself when the key is not present in the active dictionary.

#### Scenario: Known key returns translated string

- **GIVEN** the active locale is `en` and `nav.projects` maps to `Projects`
- **WHEN** the consumer calls `t('nav.projects')`
- **THEN** the function returns `Projects`

#### Scenario: Unknown key returns the key

- **GIVEN** the active locale is `en` and `hero.subtitle.unknown` is not present in the dictionary
- **WHEN** the consumer calls `t('hero.subtitle.unknown')`
- **THEN** the function returns `hero.subtitle.unknown`

#### Scenario: Translations refresh after locale change

- **GIVEN** a template binds to `t('nav.projects')` and the active locale is `en`
- **WHEN** the locale changes to `es`
- **THEN** the bound expression re-evaluates and reflects the Spanish translation

### Requirement: Dictionary structure parity

Both `en.json` and `es.json` SHALL contain the same set of keys at the same nesting depth so that switching locales never produces missing-key fallbacks for shipped UI.

#### Scenario: Foundation dictionaries cover nav, theme, locale, and footer keys

- **WHEN** the foundation change ships
- **THEN** both `en.json` and `es.json` contain the keys under `nav`, `theme`, `locale`, and `footer` namespaces with identical key sets

### Requirement: SSR-safe construction

The locale service SHALL NOT throw or read browser globals when instantiated outside a browser platform and SHALL fall back to the default locale with an empty dictionary.

#### Scenario: Service constructs on the server

- **WHEN** the service is instantiated under a non-browser `PLATFORM_ID`
- **THEN** it returns locale `en`, an empty dictionary, and `t(key)` returns the key string for any input
