## MODIFIED Requirements

### Requirement: Dictionary structure parity

Both `en.json` and `es.json` SHALL contain the same set of keys at the same nesting depth so that switching locales never produces missing-key fallbacks for shipped UI. This requirement is extended to cover all 12 namespaces: `nav`, `theme`, `locale`, `footer`, `hero`, `about`, `mindset`, `experience`, `projects`, `stack`, `writing`, and `contact`.

#### Scenario: Foundation dictionaries cover nav, theme, locale, and footer keys

- **WHEN** the foundation change ships
- **THEN** both `en.json` and `es.json` contain the keys under `nav`, `theme`, `locale`, and `footer` namespaces with identical key sets

#### Scenario: Sections dictionaries cover all 8 section namespaces

- **WHEN** the landing-sections change ships
- **THEN** both `en.json` and `es.json` contain keys under `hero`, `about`, `mindset`, `experience`, `projects`, `stack`, `writing`, and `contact` namespaces with identical key sets

#### Scenario: Switching locale renders no raw key strings in the UI

- **WHEN** the user switches from `en` to `es` while any section is visible
- **THEN** no visible text in the UI displays a raw dot-notation key string (e.g., `hero.tagline`) — every key has a corresponding translation in both files
