## ADDED Requirements

### Requirement: Hero section

The system SHALL render a Hero section as the first and eagerly-loaded section of the home page, containing the user's name, professional tagline, a brief description, primary CTAs, social links, and a photo.

#### Scenario: Hero renders above the fold

- **WHEN** the user navigates to `/`
- **THEN** the Hero section is visible without scrolling and contains the name "Tobias Moreno", a tagline, two CTA buttons ("View Projects" and "Get in touch"), and links to GitHub, LinkedIn, CV ES, and CV EN

#### Scenario: Hero photo uses NgOptimizedImage with priority

- **WHEN** the Hero section renders
- **THEN** the profile photo is rendered via `NgOptimizedImage` with the `priority` attribute set, marking it as the LCP image

#### Scenario: Hero CTAs scroll to sections

- **WHEN** the user clicks "View Projects"
- **THEN** the viewport scrolls to the element with `id="projects"`

#### Scenario: Hero renders correctly in both locales

- **WHEN** the locale is switched between `en` and `es`
- **THEN** the tagline, description, and CTA labels update to the active locale's translations

### Requirement: About section

The system SHALL render an About section with a personal narrative about the user's engineering profile and a set of value chips.

#### Scenario: About section is deferred until viewport

- **WHEN** the page loads and the About section is not yet in the viewport
- **THEN** the About section component is not yet rendered in the DOM

#### Scenario: About section renders on scroll

- **WHEN** the viewport reaches the About section's scroll position
- **THEN** the section renders with the profile narrative and at least 4 value chips

### Requirement: Product Engineering Mindset section

The system SHALL render a Mindset section with exactly 5 principle cards covering product engineering values.

#### Scenario: Mindset renders 5 cards

- **WHEN** the Mindset section is in view
- **THEN** exactly 5 cards are rendered, each with a title and description

#### Scenario: Mindset card content is translated

- **WHEN** the locale is `es`
- **THEN** the 5 card titles and descriptions are rendered in Spanish

### Requirement: Experience section

The system SHALL render an Experience section as a vertical timeline with at least one entry sourced from `experience.json`.

#### Scenario: Current role is marked

- **WHEN** the Experience section renders
- **THEN** the Techforb / Creditú entry displays a "Current" badge and the start date "March 2025"

#### Scenario: Highlights are listed

- **WHEN** the Experience section renders
- **THEN** all highlights from `experience.json` are displayed as a list

#### Scenario: Company logo renders via NgOptimizedImage

- **WHEN** the Experience section renders
- **THEN** the company logo is rendered using `NgOptimizedImage`

### Requirement: Projects section

The system SHALL render a Projects section as a responsive grid of project cards, loading data from `ContentService.getProjects()`.

#### Scenario: Projects grid renders 5 cards

- **WHEN** the Projects section is in view and data has loaded
- **THEN** exactly 5 project cards are rendered in a grid layout

#### Scenario: Each project card shows key metadata

- **WHEN** a project card renders
- **THEN** it displays the project title, a truncated description, tech chips, and at least one link (live demo or repo)

#### Scenario: Project card images use NgOptimizedImage

- **WHEN** a project card renders
- **THEN** the project image is rendered via `NgOptimizedImage`

### Requirement: Stack section

The system SHALL render a Stack section grouping skills by category, loading data from `ContentService.getSkills()`.

#### Scenario: All 5 categories are rendered

- **WHEN** the Stack section is in view and data has loaded
- **THEN** 5 category groups are visible: Backend, Frontend, Cloud/DevOps, Testing, and Practices

#### Scenario: Skills render as pills

- **WHEN** a skill category renders
- **THEN** each skill is displayed as a pill/badge with the skill name

### Requirement: Writing section

The system SHALL render a Writing section with a prominent CTA linking to the external journal when no posts are available, and SHALL render post cards when `ContentService.getPosts()` returns a non-empty array.

#### Scenario: External CTA renders when posts are empty

- **WHEN** the Writing section is in view and `getPosts()` returns `[]`
- **THEN** a CTA button/link labeled "Read my journal →" is rendered linking to `https://tobias-moreno.netlify.app/`

#### Scenario: Post cards render when posts exist

- **WHEN** the Writing section is in view and `getPosts()` returns at least one post
- **THEN** each post is rendered as a card with title, excerpt, and a link to the post URL

### Requirement: Contact section

The system SHALL render a Contact section with the user's email (copy-to-clipboard), social links, location, and a brief availability statement.

#### Scenario: Email copy-to-clipboard works

- **WHEN** the user clicks the copy email button
- **THEN** `tobiasmoreno.tm.21@gmail.com` is written to the clipboard and the button label changes to a confirmation state

#### Scenario: Confirmation resets after 2 seconds

- **WHEN** the clipboard copy confirmation state is active
- **THEN** after 2 seconds the button returns to its default label

#### Scenario: Social links are present

- **WHEN** the Contact section renders
- **THEN** links to GitHub (`https://github.com/TobiasMoreno`) and LinkedIn (`https://www.linkedin.com/in/tobiasmoreno/`) are present

### Requirement: All sections have scroll anchors

The system SHALL assign an `id` attribute to each section's root element matching the navigation anchor target.

#### Scenario: Section IDs match nav anchors

- **WHEN** any section renders
- **THEN** the root element has `id` equal to one of: `hero`, `about`, `mindset`, `experience`, `projects`, `stack`, `writing`, `contact`
