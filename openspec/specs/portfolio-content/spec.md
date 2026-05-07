## ADDED Requirements

### Requirement: Typed content models

The system SHALL define TypeScript interfaces for the four portfolio content entities — `Project`, `Experience`, `Skill`, and `Post` — and SHALL ensure all consumers of portfolio data depend only on these interfaces.

#### Scenario: Project model shape

- **WHEN** a consumer imports the `Project` type
- **THEN** the type exposes `id: string`, `title: string`, `description: string`, `image: string`, `tech: string[]`, `featured: boolean`, `year: number`, optional `liveUrl?: string`, optional `repoUrl?: string`, and optional `role?: 'frontend' | 'fullstack' | 'backend'`

#### Scenario: Experience model shape

- **WHEN** a consumer imports the `Experience` type
- **THEN** the type exposes `id: string`, `role: string`, `company: string`, `location: string`, `startDate: string` (ISO `YYYY-MM`), `current: boolean`, `highlights: string[]`, `stack: string[]`, optional `companyLogo?: string`, and optional `endDate?: string`

#### Scenario: Skill model shape

- **WHEN** a consumer imports the `Skill` type
- **THEN** the type exposes `id: string`, `name: string`, `category: 'backend' | 'frontend' | 'cloud' | 'testing' | 'practices'`, and optional `icon?: string`

#### Scenario: Post model shape

- **WHEN** a consumer imports the `Post` type
- **THEN** the type exposes `id: string`, `title: string`, `excerpt: string`, `url: string`, `publishedAt: string` (ISO `YYYY-MM-DD`), and `tags: string[]`

### Requirement: Curated projects dataset

The system SHALL ship a curated `projects.json` containing exactly five featured projects representative of the user's senior-target portfolio, and SHALL preserve the previously-shipped entries in a separate archive file that is not consumed by the UI.

#### Scenario: Curated set is the five featured projects

- **WHEN** the application loads `projects.json`
- **THEN** the file contains exactly five entries with titles `Think Before Prompt`, `GameDLE`, `Admin Panel Backend (NestJS)`, `Sistema de Gestion de Recursos Humanos Nexus`, and `Portafolio` (or its renamed equivalent), each conforming to the `Project` interface and each with `featured: true`

#### Scenario: Archive preserves previous entries

- **WHEN** the foundation change ships
- **THEN** `projects-archive.json` exists alongside `projects.json` and contains the eleven entries that were not selected for the curated set

#### Scenario: UI does not load the archive

- **WHEN** the application starts
- **THEN** no code path issues a fetch for `projects-archive.json`

### Requirement: Single-entry experience dataset

The system SHALL ship `experience.json` containing the user's current role at Techforb / Creditú with `current: true` and the highlights enumerated in the README.

#### Scenario: Current Techforb / Creditú entry is present

- **WHEN** the application loads `experience.json`
- **THEN** the file contains an entry with `company` matching `Techforb / Creditú`, `current: true`, `startDate` of `2025-03`, and `highlights` containing the nine impact bullets from the README

### Requirement: Categorized skills dataset

The system SHALL ship `skills.json` whose entries cover the five categories (`backend`, `frontend`, `cloud`, `testing`, `practices`) listed in the README.

#### Scenario: At least one skill per category

- **WHEN** the application loads `skills.json`
- **THEN** every category in the enum (`backend`, `frontend`, `cloud`, `testing`, `practices`) is represented by at least one entry

### Requirement: Empty posts dataset

The system SHALL ship `posts.json` as a valid empty JSON array so that consumers can render a "no posts" state without conditional file existence checks.

#### Scenario: Posts file is an empty array

- **WHEN** the application loads `posts.json`
- **THEN** the parsed value is `[]` and is assignable to `Post[]`

### Requirement: Typed content loader

The system SHALL provide a single content service in `src/app/data/` that loads each dataset over HTTP and returns observables typed against the corresponding model.

#### Scenario: Service exposes one method per dataset

- **WHEN** a consumer imports the content service
- **THEN** the service exposes `getProjects(): Observable<Project[]>`, `getExperience(): Observable<Experience[]>`, `getSkills(): Observable<Skill[]>`, and `getPosts(): Observable<Post[]>`

#### Scenario: Service does not silently swallow load errors

- **WHEN** a content fetch fails
- **THEN** the returned observable emits an error rather than an empty array, so consumers can decide how to render the failure
