## ADDED Requirements

### Requirement: Experience bullet at Techforb/Creditú SHALL reflect end-to-end ownership

The first bullet of the Backend/Full Stack Developer role at Techforb/Creditú in `public/assets/data/experience.json` SHALL describe end-to-end ownership of backend features (spec → production → observability) instead of a vague "designed and implemented business logic" statement. Both EN (`highlights[0]`) and ES (`highlightsEs[0]`) MUST be updated coherently.

#### Scenario: EN bullet rendered

- **WHEN** the experience section is rendered with locale `en`
- **THEN** the first bullet reads "Owned end-to-end backend features in a microservices architecture, from spec definition to production deployment and post-release observability."

#### Scenario: ES bullet rendered

- **WHEN** the experience section is rendered with locale `es`
- **THEN** the first bullet reads a faithful Spanish translation of the EN version (e.g., "Llevé features de backend de punta a punta en una arquitectura de microservicios, desde la definición del spec hasta el deploy a producción y la observabilidad post-release.")

### Requirement: Canonical references to inactive domain SHALL be removed

The portfolio SHALL NOT reference `https://tobiasmoreno.dev` from any user-facing or SEO-relevant location. All such references in shipped artifacts MUST point to `https://portfolio-tobias-moreno.netlify.app` until a real custom domain is configured.

#### Scenario: og:url meta tag

- **WHEN** `src/index.html` is parsed
- **THEN** `<meta property="og:url">` content equals `https://portfolio-tobias-moreno.netlify.app`

#### Scenario: Portfolio project liveUrl

- **WHEN** the Portfolio project entry is read from `public/assets/data/projects.json`
- **THEN** its `liveUrl` field equals `https://portfolio-tobias-moreno.netlify.app`

#### Scenario: Documentation files (CLAUDE.md, README.md, openspec archives)

- **WHEN** repository markdown documentation files are inspected
- **THEN** they MAY still reference `tobiasmoreno.dev` as aspirational; this requirement does not constrain them

### Requirement: Hero SHALL expose a direct link to the Journal

The hero section SHALL render a Journal CTA button after the CV (EN) button, pointing to `https://tobias-moreno.netlify.app`, with i18n keys for label and aria-label in both EN and ES.

#### Scenario: Journal button visible

- **WHEN** the hero section is rendered
- **THEN** a button labeled "Journal" (EN) / "Journal" (ES) appears after the CV (EN) button and opens `https://tobias-moreno.netlify.app` in a new tab with `rel="noopener noreferrer"`

#### Scenario: i18n keys exist

- **WHEN** the i18n files are inspected
- **THEN** `hero.cta_journal` (label) and `hero.cta_journal_aria` (aria-label) exist in both `en.json` and `es.json`

### Requirement: Writing section copy SHALL be coherent with the journal hero

The Writing section title in ES SHALL be "Journal" (matching the destination). The subtitle/body copy in both EN and ES SHALL be aligned with the journal's own hero subtitle ("Technical learnings, professional decisions, and real mistakes. All in public, all unfiltered." / "Aprendizajes técnicos, decisiones profesionales y errores reales. Todo en público, todo sin filtro.").

#### Scenario: ES title

- **WHEN** the Writing section is rendered with locale `es`
- **THEN** the title reads "Journal" (not "Blog")

#### Scenario: Subtitle alignment

- **WHEN** the Writing section is rendered in either locale
- **THEN** the subtitle text matches the journal's hero subtitle verbatim (within locale)

### Requirement: Stack SHALL exclude technologies not used in current work or public projects

The skills data file SHALL NOT list `Vue 3` (id `vue3`) under the `frontend` category, because the user does not use it in current work nor in any public project at the time of this change.

#### Scenario: Vue 3 absent

- **WHEN** `public/assets/data/skills.json` is parsed
- **THEN** no entry with `id: "vue3"` is present
