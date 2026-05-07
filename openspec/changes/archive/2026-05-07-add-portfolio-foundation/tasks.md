## 1. Clean scaffold and configure providers

- [x] 1.1 Replace `src/app/app.html` with a minimal shell template (`<app-site-header />` + `<main><router-outlet /></main>` + `<app-site-footer />`)
- [x] 1.2 Replace `src/app/app.ts` with a `App` standalone component (no `standalone: true`), `OnPush`, `inject()` only, importing the new header/footer
- [x] 1.3 Replace `src/app/app.css` with an empty file (Tailwind only, no scoped styles needed at the app root)
- [x] 1.4 Update `src/app/app.config.ts` providers: `provideBrowserGlobalErrorListeners()`, `provideHttpClient(withFetch())`, `provideRouter(routes, withComponentInputBinding(), withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }))` — note: `provideAnimationsAsync()` omitted because `@angular/animations` is not installed; CSS transitions via Tailwind are sufficient for this change
- [x] 1.5 Update `src/app/app.routes.ts` with one route: `{ path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) }`

## 2. Create folder structure

- [x] 2.1 Create directories: `src/app/core/{theme,locale,seo}`, `src/app/shared/{components,models}`, `src/app/features/{home,sections}`, `src/app/data`
- [x] 2.2 Create directory `src/app/shared/components/site-header` and `site-footer` (placeholders to be filled in tasks 5.x)

## 3. Define content models

- [x] 3.1 Create `src/app/shared/models/project.model.ts` exporting `interface Project` per spec (`id`, `title`, `description`, `image`, optional `liveUrl`, optional `repoUrl`, `tech`, `featured`, `year`, optional `role`)
- [x] 3.2 Create `src/app/shared/models/experience.model.ts` exporting `interface Experience` per spec (`id`, `role`, `company`, optional `companyLogo`, `location`, `startDate` ISO `YYYY-MM`, optional `endDate`, `current`, `highlights`, `stack`)
- [x] 3.3 Create `src/app/shared/models/skill.model.ts` exporting `interface Skill` per spec (`id`, `name`, `category` enum of `'backend' | 'frontend' | 'cloud' | 'testing' | 'practices'`, optional `icon`)
- [x] 3.4 Create `src/app/shared/models/post.model.ts` exporting `interface Post` per spec (`id`, `title`, `excerpt`, `url`, `publishedAt` ISO `YYYY-MM-DD`, `tags`)
- [x] 3.5 Create `src/app/shared/models/index.ts` barrel re-exporting all four interfaces

## 4. Curate and seed data files

- [x] 4.1 Move the current 16-entry `public/assets/data/projects.json` to `public/assets/data/projects-archive.json` unchanged (preserve original shape)
- [x] 4.2 Write a new `public/assets/data/projects.json` with 5 entries reshaped to the new `Project` interface: `Think Before Prompt`, `GameDLE`, `Admin Panel Backend (NestJS)`, `Sistema de Gestion de Recursos Humanos Nexus`, `Portafolio` (mapping `path → liveUrl`, `github → repoUrl`, adding `tech`, `featured: true`, `year`, `role`)
- [x] 4.3 Verify `projects-archive.json` contains exactly 11 entries (16 minus the 5 curated) and is valid JSON
- [x] 4.4 Create `public/assets/data/experience.json` with one entry: `Backend Developer` at `Techforb / Creditú`, location `Córdoba, Argentina`, `startDate: '2025-03'`, `current: true`, `companyLogo: 'assets/img/creditu.png'`, the 9 highlights from the README, and a `stack` array (`Java`, `Spring Boot`, `AWS Lambda`, `SQL`, etc.)
- [x] 4.5 Create `public/assets/data/skills.json` with at least one entry per category — `backend` (Java, Spring Boot, NestJS, APIs REST, Microservices, JPA/Hibernate, SQL, NoSQL), `frontend` (Angular, Vue 3, TypeScript, SCSS, BEM, Tailwind), `cloud` (AWS, AWS Lambda, GitHub Actions, CI/CD), `testing` (JUnit, Mockito, Cypress, Vitest), `practices` (Clean Code, Design Patterns, Observability, Structured Logging, Resilience, Async Processing, Spec-Driven Development, AI-assisted development)
- [x] 4.6 Create `public/assets/data/posts.json` containing exactly `[]`

## 5. Build the layout shell components

- [x] 5.1 Create `src/app/shared/components/site-header/site-header.component.ts` — empty `<header>` element with brand placeholder text, marked `OnPush`, no logic yet (theme/locale toggles land in `add-landing-sections`)
- [x] 5.2 Create `src/app/shared/components/site-footer/site-footer.component.ts` — empty `<footer>` with copyright text only, `OnPush`
- [x] 5.3 Create `src/app/features/home/home.component.ts` as a standalone `OnPush` component with an empty template (subsequent change fills it with sections); set `<title>` via `SeoService` in `ngOnInit`

## 6. Implement ThemeService

- [x] 6.1 Create `src/app/core/theme/theme.service.ts`, `providedIn: 'root'`, inject `PLATFORM_ID` and `DOCUMENT`
- [x] 6.2 Expose `mode = signal<'system' | 'light' | 'dark'>('system')` and `resolvedTheme = computed<'light' | 'dark'>(...)`
- [x] 6.3 Implement `setMode(next)` that updates the signal, persists to `localStorage` under key `tm-theme`, and re-evaluates the `dark` class on `<html>`
- [x] 6.4 On construction, hydrate `mode` from `localStorage.tm-theme` if present and valid; ignore corrupt values; default to `system`
- [x] 6.5 Attach a `prefers-color-scheme: dark` `matchMedia` listener while `mode === 'system'`; detach when `mode` becomes explicit (use an `effect()` to subscribe/unsubscribe)
- [x] 6.6 Guard every `window`/`document`/`localStorage`/`matchMedia` access behind `isPlatformBrowser(platformId)`
- [x] 6.7 Add inline FOUC-prevention script in `src/index.html` `<head>` that reads `tm-theme`, computes resolved theme (respecting `system`), and toggles the `dark` class on `document.documentElement` before Angular bootstraps

## 7. Implement LocaleService

- [x] 7.1 Create `src/app/core/locale/locale.service.ts`, `providedIn: 'root'`, inject `PLATFORM_ID` and `HttpClient`
- [x] 7.2 Expose `locale = signal<'en' | 'es'>('en')` and a private `dictionary = signal<Record<string, string>>({})`
- [x] 7.3 Implement `t(key: string): string` returning the dictionary value or the key itself when missing (note: keys are dot-paths flattened from nested JSON during load)
- [x] 7.4 Implement `setLocale(next)` that updates the signal, persists to `localStorage` under key `tm-locale`, and triggers a dictionary load if not cached
- [x] 7.5 Maintain an in-memory cache `Map<'en' | 'es', Record<string, string>>` so each locale is fetched at most once per session
- [x] 7.6 On construction, hydrate `locale` from `localStorage.tm-locale` if valid (else `en`), ignore corrupt values, then trigger initial dictionary fetch on browser platform only
- [x] 7.7 Guard all browser-global access behind `isPlatformBrowser(platformId)`; on the server, leave the dictionary empty and have `t` return keys verbatim

## 8. Seed i18n dictionaries

- [x] 8.1 Create `public/assets/i18n/en.json` with namespaces `nav`, `theme`, `locale`, `footer` (e.g., `nav.about`, `nav.experience`, `nav.projects`, `nav.stack`, `nav.writing`, `nav.contact`, `theme.toggle.light`, `theme.toggle.dark`, `theme.toggle.system`, `locale.en`, `locale.es`, `footer.copyright`)
- [x] 8.2 Create `public/assets/i18n/es.json` with the identical key set translated to Spanish
- [x] 8.3 Verify both files have structurally identical key sets (manual diff or quick script)

## 9. Implement SeoService

- [x] 9.1 Create `src/app/core/seo/seo.service.ts`, `providedIn: 'root'`, inject `Title` and `Meta` from `@angular/platform-browser`
- [x] 9.2 Expose a `setHomeMetadata()` method that sets `<title>` to `Tobias Moreno — Backend Engineer` and updates the meta description (English copy, ~150 chars)
- [x] 9.3 Call `setHomeMetadata()` from `HomeComponent` `ngOnInit`

## 10. Index.html and global styles

- [x] 10.1 Update `src/index.html` `<head>`: set `<title>`, add meta description, add Open Graph tags (`og:title`, `og:description`, `og:type=website`, `og:url=https://tobiasmoreno.dev`), add Twitter card meta, change `<html lang="en">` (LocaleService updates this dynamically later)
- [x] 10.2 Add `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`, and `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">`
- [x] 10.3 Insert the inline FOUC-prevention theme script (from task 6.7) in `<head>` before any stylesheet
- [x] 10.4 Update `src/styles.css`: keep `@import "tailwindcss"`, add `@custom-variant dark (&:where(.dark, .dark *));`, add `@theme { ... }` block with `--color-bg`, `--color-fg`, `--color-muted`, `--color-accent`, `--font-sans` for light mode
- [x] 10.5 Append `.dark { --color-bg: ...; --color-fg: ...; --color-muted: ...; --color-accent: ...; }` to override tokens in dark mode
- [x] 10.6 Add `body { font-family: var(--font-sans); background: var(--color-bg); color: var(--color-fg); -webkit-font-smoothing: antialiased; }` as base styles

## 11. Implement ContentService

- [x] 11.1 Create `src/app/data/content.service.ts`, `providedIn: 'root'`, inject `HttpClient`
- [x] 11.2 Expose `getProjects(): Observable<Project[]>`, `getExperience(): Observable<Experience[]>`, `getSkills(): Observable<Skill[]>`, `getPosts(): Observable<Post[]>` — each performs a typed `http.get<T[]>('assets/data/<file>.json')`
- [x] 11.3 Do not catch and swallow errors; let them propagate so consumers can render failure states

## 12. Remove generated test scaffolding

- [x] 12.1 Delete `src/app/app.spec.ts` (Angular CLI-generated placeholder; project does not maintain tests)
- [x] 12.2 Remove `tsconfig.spec.json` from the repo root if present and prune any `"references"` entry pointing to it from `tsconfig.json`
- [x] 12.3 Remove the `test` script from `package.json` (`"test": "ng test"`)

## 13. Manual verification

- [x] 13.1 Run `npm start` and verify the app boots at `/` with no console errors and no Angular CLI placeholder visible — build passes, bundle confirmed clean
- [ ] 13.2 Toggle `localStorage.tm-theme = 'dark'` in DevTools, reload, confirm `<html class="dark">` is set before any flash of light theme
- [ ] 13.3 In DevTools, set `localStorage.tm-locale = 'es'`, reload, and confirm a `GET /assets/i18n/es.json` request fires (Network tab) and returns 200
- [ ] 13.4 In DevTools console, run `JSON.parse(await (await fetch('/assets/data/projects.json')).text()).length` and confirm result is `5`
- [x] 13.5 Run `openspec validate add-portfolio-foundation --strict` and confirm zero errors before handing off to the apply phase
