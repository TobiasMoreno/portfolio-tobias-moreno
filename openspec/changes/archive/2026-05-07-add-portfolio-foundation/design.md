## Context

The repo was reset down to the Angular 21 CLI scaffold (`app.ts`/`app.html`/`app.css` placeholder). Tailwind v4 is already wired (`@import "tailwindcss"` in `styles.css`, `@tailwindcss/postcss` plugin). There is no `@angular/ssr`, no `@angular/localize`, no animations provider, no `HttpClient` provider. The CLI generated a Vitest harness (`vitest` dep, `app.spec.ts`, `tsconfig.spec.json`, `npm test` script), but the project intentionally does not maintain automated tests; this scaffolding is removed as part of this change. The single existing data file (`public/assets/data/projects.json`) carries 16 entries from the previous portfolio iteration — too many and partly stale for a senior-target portfolio.

Project conventions (from `.claude/CLAUDE.md`) are non-negotiable: standalone components without `standalone: true`, OnPush, signals, `inject()`, native control flow, no `ngClass`/`ngStyle`, host bindings via `host: {}` in the decorator, Tailwind only.

This change is the first OpenSpec change in the project — `openspec/specs/` is empty, so all four capabilities are net-new.

## Goals / Non-Goals

**Goals:**
- A bootable shell at `/` that renders header + main outlet + footer with no visible content yet, but with theme and locale wired so subsequent sections can read both signals immediately.
- Theme and locale state are signal-based, persisted, and SSR-friendly in shape (no direct `window` access at construction — gated by `isPlatformBrowser`).
- Curated, typed content data ready to be consumed by sections in the next change.
- Zero new runtime dependencies.

**Non-Goals:**
- Any visible section UI (Hero, About, Mindset, Experience, Projects, Stack, Writing, Contact) — that is `add-landing-sections`.
- SSR, prerender, hydration tuning — that is `add-portfolio-polish`.
- Per-route SEO — only static `/` SEO here.
- Accessibility audit, Lighthouse score targets, OG image generation.
- Real journal content (`posts.json` ships empty).
- A contact form (decided: links only, lands in the next change).

## Decisions

### D1. Translation strategy: in-house signal service over `@angular/localize` or Transloco

**Choice:** A `LocaleService` exposing `locale: Signal<'en' | 'es'>` and `t(key): string` derived from a `dictionary: Signal<Record<string, string>>` populated by fetching `/assets/i18n/{locale}.json`. Keys use dot notation (`nav.projects`, `theme.toggle.dark`); missing keys return the key itself.

**Why:**
- `@angular/localize` requires per-locale builds and a redirect/host strategy to switch — too heavy for a 2-locale portfolio and breaks the instant-toggle UX.
- Transloco/ngx-translate are extra dependencies the README explicitly discourages ("no librerías innecesarias").
- A 100-line signal service is enough and stays under our control. Components consume `t('hero.title')` as a function call inside templates wrapped by a `transloco`-style pipe is unnecessary because signals already trigger CD.

**Trade-off:** No ICU pluralization or interpolation out of the box. Acceptable for portfolio copy; if needed later, add a tiny interpolator (`t('greeting', { name })` replacing `{name}`) without breaking callers.

### D2. Theme model: tri-state with system as a true third state

**Choice:** `mode: Signal<'system' | 'light' | 'dark'>` plus a derived `resolvedTheme: Signal<'light' | 'dark'>`. The DOM toggle adds/removes the `dark` class on `document.documentElement` based on `resolvedTheme`. A `MediaQueryList` listener for `(prefers-color-scheme: dark)` is attached **only while** `mode === 'system'` and torn down otherwise.

**Why:**
- Two-state (light/dark) loses the user's OS preference signal and forces an opinion at first paint.
- Storing only the resolved value in localStorage would make "follow system" impossible across page loads. We persist `mode`, not `resolvedTheme`.
- Tailwind v4 reads `dark` via the configured variant; we set `@custom-variant dark (&:where(.dark, .dark *));` in `styles.css` so the `dark` class on `<html>` cascades.

**FOUC mitigation:** A 6-line inline `<script>` in `index.html`'s `<head>` reads `localStorage.getItem('tm-theme')`, computes the resolved theme, and writes the `dark` class onto `<html>` **before** Angular bootstraps. The Angular service is the source of truth thereafter.

### D3. SSR-safe construction

**Choice:** Both `ThemeService` and `LocaleService` are `providedIn: 'root'` and inject `PLATFORM_ID`. They guard all `window`/`document`/`localStorage`/`fetch` access behind `isPlatformBrowser(platformId)`. On the server they fall back to defaults (`mode = 'system'`, `locale = 'en'`, dictionary empty).

**Why:** Even though SSR isn't installed in this change, designing services that *would crash* under SSR locks us out of `add-portfolio-polish`. Cheap insurance.

### D4. Folder structure

```
src/app/
├── core/                          # singletons, no UI
│   ├── theme/theme.service.ts
│   ├── locale/locale.service.ts
│   └── seo/seo.service.ts
├── shared/
│   ├── components/                # reusable UI atoms (header/footer live here)
│   │   ├── site-header/
│   │   └── site-footer/
│   └── models/
│       ├── project.model.ts
│       ├── experience.model.ts
│       ├── skill.model.ts
│       └── post.model.ts
├── features/
│   ├── home/
│   │   └── home.component.ts      # placeholder; sections plug in next change
│   └── sections/                  # empty in this change
└── data/                          # typed JSON loaders (HttpClient wrappers)
    └── content.service.ts         # getProjects(), getExperience(), getSkills(), getPosts()
```

**Why:** The README's suggested structure (`features/home`, `features/sections`, `data/`) is preserved verbatim. `core/` houses singletons that should not be re-imported. `shared/components/` is reserved for atoms; section components will land in `features/sections/` in change 2.

### D5. Curating `projects.json`

**Choice:** Keep 5 entries (Think Before Prompt, GameDLE, Admin Panel NestJS, HR Nexus, this Portfolio) in `projects.json` reshaped into the new `Project` model. Move the other 11 to `projects-archive.json` with the original shape — no UI consumes it yet, but it stays under version control.

**Why:** Quality over quantity for a senior-target audience. The archive file is a compromise: history preserved, but the application contract is the curated 5.

**New `Project` shape** (shared/models/project.model.ts):
```ts
export interface Project {
  id: string;
  title: string;
  description: string;     // EN copy; ES variant resolved via i18n key map in change 2
  image: string;           // path under /assets/img/
  liveUrl?: string;
  repoUrl?: string;
  tech: string[];          // tags shown as pills
  featured: boolean;       // true for all 5 in this change; gates filtering later
  year: number;
  role?: 'frontend' | 'fullstack' | 'backend';
}
```

The current JSON uses `path`/`github`/`develop` — the loader maps `path → liveUrl`, `github → repoUrl`, `develop → featured` during the curation step (manual edit, not runtime).

### D6. Routing and lazy loading

**Choice:** Single route `''` resolves to a lazy-loaded `HomeComponent`. Even with one route today, `loadComponent: () => import(...)` establishes the pattern for routed sections (e.g., `/projects/:id`) when they appear later. `withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })` gives smooth-scroll-to-anchor on `/#projects`-style links.

### D7. Tailwind v4 theming

**Choice:** Define design tokens via Tailwind v4 `@theme` in `styles.css`:
```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-bg: oklch(99% 0 0);
  --color-fg: oklch(20% 0.02 270);
  --color-muted: oklch(60% 0.02 270);
  --color-accent: oklch(62% 0.18 250);
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}

.dark {
  --color-bg: oklch(15% 0.01 270);
  --color-fg: oklch(96% 0.005 270);
  --color-muted: oklch(70% 0.02 270);
  --color-accent: oklch(72% 0.16 250);
}
```
Components consume tokens via Tailwind utilities (`bg-[--color-bg]`, `text-[--color-fg]`) — no inline styles, no `ngStyle`.

### D8. Inter font loading

Preconnect + `<link rel="stylesheet">` to Google Fonts in `index.html` for `Inter` (weights 400/500/600/700). No self-hosted font in this change to keep diff small; revisit in polish if performance budget demands.

## Risks / Trade-offs

- **Risk:** FOUC if the inline theme bootstrap script is forgotten or breaks. → **Mitigation:** dedicated task with a manual smoke test (open in browser with `tm-theme=dark` in localStorage; confirm no flash). Script is also kept tiny (no JSON parsing, just string compare).
- **Risk:** Translation keys drift between `en.json` and `es.json`. → **Mitigation:** keep both files structurally identical from day one and rely on the `t()` key-as-fallback contract so a missing translation degrades visibly (the literal key) rather than silently — making drift easy to spot in manual review.
- **Risk:** Curation deletes a project that the user actually wants featured. → **Mitigation:** archive file preserves the original 11 entries, fully restorable by moving an entry back into `projects.json` and reshaping.
- **Trade-off:** No SSR-safe `transferState` for the i18n dictionary fetch. Acceptable while CSR-only; revisit in polish change with prerender.
- **Trade-off:** `t()` is a function call inside templates and Angular's lint may complain ("no method calls in templates"). Signals make it cheap (no zone tick), and our convention (`@if`/`@for`/signals) tolerates it. If lint becomes an issue, expose `t = computed(() => ...)` per-key in components instead of a global function.
