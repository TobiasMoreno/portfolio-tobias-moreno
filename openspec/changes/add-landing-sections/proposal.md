## Why

The portfolio shell (`add-portfolio-foundation`) boots cleanly but renders a blank page — every capability (theming, i18n, typed data, lazy routing) is wired but has nothing to display. This change fills that gap: it builds the 8 landing sections and completes the SiteHeader and SiteFooter so the portfolio is a fully working, publicly shareable artifact at `tobiasmoreno.dev`.

## What Changes

- **BREAKING (visual)**: `HomeComponent` template is replaced — the blank page becomes a full landing page composed of 8 sections.
- **BREAKING (visual)**: `SiteHeaderComponent` is replaced — the brand-only placeholder becomes a complete navbar with navigation links, locale toggle, theme toggle, and a mobile hamburger menu.
- `SiteFooterComponent` updated with social links, translated text via `t()`, and a dynamic year.
- 8 new section components created under `src/app/features/sections/`:
  - `HeroSectionComponent` — name, tagline, description, CTAs, social links, photo; loads eagerly.
  - `AboutSectionComponent` — personal narrative, value chips; `@defer`.
  - `MindsetSectionComponent` — 5 product engineering principles as cards; `@defer`.
  - `ExperienceSectionComponent` — vertical timeline with one entry (Techforb / Creditú), highlights list, stack chips; `@defer`.
  - `ProjectsSectionComponent` — 2-col grid of project cards fed by `ContentService`; `@defer`.
  - `StackSectionComponent` — skill pills grouped by category fed by `ContentService`; `@defer`.
  - `WritingSectionComponent` — journal CTA + future post cards from `ContentService`; `@defer`.
  - `ContactSectionComponent` — email with copy-to-clipboard, social links, location; `@defer`.
- New `FadeInDirective` (IntersectionObserver) added to `shared/components/` for scroll-triggered fade-in on all sections.
- `public/assets/i18n/en.json` and `es.json` expanded with keys for every section (`hero.*`, `about.*`, `mindset.*`, `experience.*`, `projects.*`, `stack.*`, `writing.*`, `contact.*`). Both files keep identical key sets.

## Capabilities

### New Capabilities

- `sections`: All 8 landing sections — their visual structure, content contracts, layout, and responsive behavior.
- `animations`: Scroll-triggered fade-in + slide-up via `FadeInDirective` (IntersectionObserver) and CSS `@keyframes`. Hover micro-interactions on cards (scale, shadow, border-color transitions).

### Modified Capabilities

- `layout-shell`: SiteHeader gains nav links, locale toggle, theme toggle, and mobile menu. SiteFooter gains social links and translated text. HomeComponent gains the 8-section template with `@defer` boundaries. These are requirement-level changes to the layout-shell capability — the shell spec now covers what is rendered within the header/footer, not just their structural presence.
- `localization`: i18n dictionaries expand from 4 namespaces (`nav`, `theme`, `locale`, `footer`) to 12 (adding one per section). The parity requirement (both files must have identical key sets) is unchanged — it extends to the new namespaces.

## Impact

- **Files modified**: `src/app/features/home/home.component.ts`, `src/app/shared/components/site-header/site-header.component.ts`, `src/app/shared/components/site-footer/site-footer.component.ts`, `public/assets/i18n/en.json`, `public/assets/i18n/es.json`.
- **Files created**: 8 section components under `src/app/features/sections/`, `src/app/shared/components/fade-in.directive.ts`.
- **Dependencies**: No new runtime packages. `NgOptimizedImage` from `@angular/common` (already available). `Clipboard API` via `navigator.clipboard` (browser-native, no polyfill needed for the target audience).
- **Data consumed**: `ContentService.getProjects()`, `getSkills()`, `getPosts()` called from the respective sections using `async` pipe over `toSignal()` pattern.
- **Downstream**: Unblocks `add-portfolio-polish` (prerender, Lighthouse, OG image, WCAG).
