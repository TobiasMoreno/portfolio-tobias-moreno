# Portfolio — Tobias Moreno

You are pair-programming on **Tobias Moreno's personal portfolio**, a static-deployed Angular 21 site (Netlify) at `https://tobiasmoreno.dev`. This file is the source of truth for *how to work in this repo*.

## Project context

This portfolio is a **job-search artifact**, not a hobby site. It's the first thing a recruiter or hiring manager will read about Tobias. Every change — content, structure, copy, performance — should be evaluated through the eyes of a hiring manager at a top-tier LatAm tech company (Mercado Libre is the lead example; also Globant, Despegar, Rappi, Nubank, Ualá).

**Tobias's profile** — Backend / Product Engineer in fintech (Techforb / Creditú). Java + Spring Boot, NestJS, Angular, AWS Lambda, microservices, REST APIs, Resilience4j, structured logging, CI/CD. Works with AI agents through a Spec-Driven Development workflow.

**Narrative the site must communicate** (without ever saying it explicitly — show, don't tell):
1. Backend depth — APIs, microservices, integrations, performance.
2. Product mindset — thinks in user problems, not tickets.
3. Measurable impact — concrete metrics, not adjectives ("response time reduced ~45%", not "fast").
4. Engineering judgment — names trade-offs, picks deliberately.
5. AI as accelerator — uses agents and SDD as a force multiplier, not a crutch.

## Audience-fit principles ("MELI ADN", encoded as engineering values)

When writing copy, choosing what to surface, or evaluating a change, optimize for these — they are what top LatAm tech orgs look for:

- **Customer / user obsession.** Frame work as user impact, not as "I built X". Replace "Implemented Y" with "Improved Z for users by W".
- **Excellence and ownership.** Show end-to-end ownership of outcomes (design → ship → observe → iterate), not just task completion.
- **Data-driven.** Quantify. Numbers, percentages, before/after. If a claim has no metric, ask whether it should.
- **Scale and resilience.** Surface the parts of the work that show comfort with production reality: retries, timeouts, async processing, observability, edge cases.
- **Execution velocity with quality.** Iterative over perfect; ship small, verify, improve. Don't over-engineer the portfolio either — the site should embody the same values it claims.
- **Simplicity over cleverness.** A clear sentence beats a buzzword. A boring solution that ships beats a clever one that doesn't.
- **Sober, confident tone.** No "I build the future", no "passionate ninja", no emoji-stuffing in copy. Match the voice of Linear / Vercel / Stripe career pages adapted to a personal site.

These are values, not a checklist to recite — never name MELI (or any company) in the site copy. The point is to *be* the profile they look for, not to advertise that you're trying to be it.

## Architecture map

Single-page Angular 21 app, signal-first, content-driven from JSON.

```
src/
├── app/
│   ├── app.ts                     // Bootstraps ThemeService at root
│   ├── app.config.ts              // Router (anchorScrolling), HttpClient(withFetch), error listeners
│   ├── app.routes.ts              // Single lazy route → HomeComponent
│   ├── core/                      // Cross-cutting singletons (providedIn: 'root')
│   │   ├── theme/theme.service.ts     // light | dark | system, signals + effect, persists to localStorage('tm-theme')
│   │   ├── locale/locale.service.ts   // en | es, flattens i18n JSON to dot-keys, t(key) lookup
│   │   └── seo/seo.service.ts         // Title + meta tags
│   ├── data/
│   │   └── content.service.ts     // HTTP loaders for /assets/data/{projects,experience,skills,posts}.json
│   ├── shared/
│   │   ├── components/site-header,site-footer/
│   │   └── models/                // Project, Experience, Skill (+ SkillCategory), Post
│   └── features/
│       ├── home/home.component.ts          // Composes all sections, @defer (on viewport) for non-hero
│       └── sections/{hero,about,mindset,experience,projects,stack,writing,contact}/
├── index.html                     // Inline FOUC-prevention script reads tm-theme before bootstrap
├── main.ts
└── styles.css                     // Tailwind v4 (@import "tailwindcss"), oklch tokens, .dark variant
public/
├── assets/
│   ├── data/{projects,experience,skills,posts,projects-archive}.json   // Editable content
│   ├── i18n/{en,es}.json           // UI copy — must stay structurally in sync
│   └── img/                        // Static images (PNG/JPG/SVG)
└── favicon.ico
```

Build: `@angular/build:application`. Dev: `npm start` (ng serve). Build: `npm run build`. No tests written yet (Vitest is installed; if you add tests, use it). Tailwind via PostCSS (`.postcssrc.json`).

## Content & copy rules

- **Content lives in JSON, not in components.** New projects/experience/skills/posts → edit `public/assets/data/*.json`. Don't hardcode content in templates.
- **i18n is mandatory and keys must be in sync.** Any new UI string must be added to **both** `public/assets/i18n/en.json` and `public/assets/i18n/es.json` under the same dot-path. The locale service will fall back to the raw key if missing — that's a bug, not a feature.
- **Models are typed.** Adding a content field means updating the matching interface in `src/app/shared/models/*.model.ts`.
- **Tone for English copy:** sober, technical, outcome-oriented. Use active voice, past-tense for shipped work, present-tense for current ownership.
- **Tone for Spanish copy:** rioplatense neutro, profesional. No traducciones literales del inglés.
- **No claims without backing.** If you write a metric ("45%", "p99 < 100ms"), it must be defensible in an interview. If it can't be defended, soften it.
- **Don't add filler sections.** A new section must earn its place by communicating one of the five narrative pillars above.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes (and `@defer (on viewport)` for below-the-fold sections — see `home.component.ts`)
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.
- Decorative SVG icons get `aria-hidden="true"`. Interactive icon-only buttons get `aria-label` (see `site-header.component.ts` for the pattern).
- Honor `prefers-reduced-motion` — already handled globally in `styles.css`.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components (this repo does so everywhere except `app.ts`)
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Convert observables (HTTP) to signals via `toSignal(...)` with an `initialValue` (see `projects-section.component.ts`)
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like `new Date()` are available
- Do not write arrow functions in templates (they are not supported)

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
- HTTP via `provideHttpClient(withFetch())` (configured in `app.config.ts`)

## Styling

- Tailwind v4 via PostCSS. Tokens are CSS custom properties (`--color-bg`, `--color-fg`, `--color-muted`, `--color-accent`, `--color-border`) defined in `styles.css` using `oklch()`.
- Dark mode is a `.dark` class on `<html>`, applied pre-bootstrap by an inline script in `index.html` to prevent FOUC.
- Both light and dark must look right. When you tweak a color or layout, verify both themes.
- Use `class="bg-[--color-bg] text-[--color-fg]"` style token references — don't hardcode hex/oklch outside `styles.css`.
- The `section-container` utility class sets the standard section width / padding — reuse it, don't reinvent.

## Routing & SEO

- Single route `''` lazy-loads `HomeComponent`. Anchor scrolling is enabled (`withInMemoryScrolling`), so navigation uses `[routerLink]="'/'" [fragment]="'projects'"`.
- `SeoService.setHomeMetadata()` runs in `HomeComponent.ngOnInit`. Update it (and `index.html` Open Graph / Twitter tags) when the headline pitch changes.

## Operational notes

- Deployed on Netlify (`netlify.toml`). Production build budget: initial ≤ 1 MB (warning at 500 kB), per-component CSS ≤ 8 kB.
- The repo includes an OpenSpec / OPSX workflow under `openspec/` for spec-driven changes — use it for non-trivial features (skills: `openspec-explore`, `openspec-propose`, `openspec-apply`, `openspec-archive`).
- Don't add features, refactors, or abstractions beyond what the task requires. The portfolio should embody "impact over unnecessary complexity" — that's literally one of its mindset cards (`features/sections/mindset`).

## When in doubt

Ask: *would a senior engineer at a top LatAm tech company read this and think "this person gets it"?* If not, simplify the copy, sharpen the metric, or cut the section.
