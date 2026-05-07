## Why

The repo currently boots into the default Angular CLI placeholder — every prior section component (`inicio`, `sobre-mi`, `recorrido`, `projects`, `form-contactanos`, `header`, `footer`, `ai-sidebar`) was deleted, leaving only the scaffolded `app.ts`/`app.html`/`app.css`. Before any visible portfolio work can happen, we need a foundation that resolves the cross-cutting concerns the README demands once and centrally — bilingual content (EN/ES), light/dark theming with system fallback, typed content models, curated data, and a layout shell — so that subsequent changes only have to focus on building sections, not re-deciding architecture.

## What Changes

- **BREAKING**: Replace the Angular CLI placeholder in `src/app/app.ts`, `app.html`, `app.css` with a minimal layout shell (`<header>` + `<main>` + `<footer>`) that hosts a single `/` route.
- Introduce signal-based `ThemeService` with three modes (`system` | `light` | `dark`), `localStorage` persistence under key `tm-theme`, application of a `dark` class on `<html>`, and a `prefers-color-scheme` media query listener active only in `system` mode.
- Introduce signal-based `LocaleService` with two locales (`en` default, `es`), `localStorage` persistence under key `tm-locale`, lazy fetch of dictionaries from `/assets/i18n/{en,es}.json`, and a `t(key)` translator that falls back to the key string when a translation is missing.
- Establish the project folder structure: `core/` (singleton services), `shared/{components,models}`, `features/{home,sections}`, `data/` (typed JSON loaders).
- Define typed content models in `shared/models/`: `Project`, `Experience`, `Skill`, `Post`.
- Curate `public/assets/data/projects.json` to the 5 featured projects (Think Before Prompt, GameDLE, Admin Panel NestJS, HR Nexus, this Portfolio); move the remaining 11 entries to `projects-archive.json` (preserved, not consumed by the UI).
- Seed `public/assets/data/experience.json` with the Techforb / Creditú entry from the README, `skills.json` with the five-category skill grouping, and `posts.json` as an empty array.
- Seed `public/assets/i18n/en.json` and `es.json` with keys for nav, theme toggle, locale toggle, and footer only — section copy is deferred to the next change.
- Configure `app.config.ts` with `provideHttpClient(withFetch())`, `provideAnimationsAsync()`, `withComponentInputBinding()`, and `withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })` for smooth anchor scrolling.
- Update `src/index.html` and `src/styles.css`: SEO/OG meta, Inter font preconnect/load, Tailwind v4 `@theme` tokens for surface/foreground/accent, and a `dark` variant strategy bound to the `dark` class on `<html>`.
- Add `core/seo/seo.service.ts` with static title and description for `/` (per-section dynamic SEO is deferred to the polish change).
- Wire `app.routes.ts` to a single lazy route loading `HomeComponent` (placeholder that imports nothing yet — sections arrive in the next change).

## Capabilities

### New Capabilities

- `theming`: tri-state theme model (`system` | `light` | `dark`), persistence, OS-preference reactivity, and DOM application strategy (`dark` class on `<html>`).
- `localization`: bilingual content delivery (`en` | `es`), persistence, JSON dictionary loading, and key-based translation with key-as-fallback semantics.
- `portfolio-content`: shape and source-of-truth for typed portfolio data — `Project`, `Experience`, `Skill`, `Post` — and the curated JSON files that feed them.
- `layout-shell`: top-level application shell (header / main outlet / footer), single-route `/` mounting, and the providers it depends on (router, http, animations, scrolling).

### Modified Capabilities

<!-- None — this is the first OpenSpec change in the project; openspec/specs/ is empty. -->

## Impact

- **Files replaced**: `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/app/app.config.ts`, `src/app/app.routes.ts`, `src/index.html`, `src/styles.css`.
- **Files deleted**: `src/app/app.spec.ts`, `tsconfig.spec.json` (project does not maintain tests; CLI-generated test harness is removed).
- **Scripts removed**: `npm test` from `package.json`.
- **Files added**: `src/app/core/theme/theme.service.ts`, `src/app/core/locale/locale.service.ts`, `src/app/core/seo/seo.service.ts`, `src/app/shared/models/{project,experience,skill,post}.model.ts`, `src/app/features/home/home.component.ts`, plus placeholder header/footer components under `src/app/shared/components/`.
- **Data files added/curated**: `public/assets/data/projects.json` (curated to 5), `public/assets/data/projects-archive.json` (the previous 11), `public/assets/data/experience.json`, `public/assets/data/skills.json`, `public/assets/data/posts.json`, `public/assets/i18n/en.json`, `public/assets/i18n/es.json`.
- **Dependencies**: no new runtime dependencies; uses Angular 21 stdlib only (`@angular/common/http`, `@angular/platform-browser/animations`, `@angular/router`, `@angular/platform-browser`).
- **Out of scope**: visual section content, animations, micro-interactions, prerender/SSR, full WCAG audit, Lighthouse pass, real journal posts, contact form (none — links only, in next change).
- **Downstream**: unblocks `add-landing-sections` (sections plug into the shell, consume models/data, and read translations) and `add-portfolio-polish` (SSG, accessibility, Lighthouse, dynamic SEO).
