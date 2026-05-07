## Context

The foundation change (`add-portfolio-foundation`) delivered a bootable shell with `ThemeService`, `LocaleService`, `ContentService`, typed models, curated data, and all providers configured. The page renders blank — the HomeComponent has an empty template and SiteHeader shows only the brand text. This change fills every visible surface with content.

Constraints:
- `@angular/animations` is not installed; all motion must be CSS-native.
- `NgOptimizedImage` is available from `@angular/common` — required for all `<img>` tags.
- Components: OnPush, no `standalone: true`, `inject()`, `host: {}`, class bindings, native control flow.
- Tailwind v4 only for styles. Custom tokens `--color-bg/fg/muted/accent/border` already defined in `styles.css`.
- No test files.

## Goals / Non-Goals

**Goals:**
- A complete, visually polished, publicly shareable portfolio page.
- All 8 sections functional, responsive, and bilingüal.
- SiteHeader with working navigation, locale toggle, theme toggle, and mobile menu.
- Build stays green; no regressions to foundation services.

**Non-Goals:**
- Prerender / SSR hydration — `add-portfolio-polish`.
- WCAG AA full audit — `add-portfolio-polish`.
- Lighthouse ≥ 90 — `add-portfolio-polish`.
- Contact form — decided: links only.
- Real journal posts — WritingSection uses external link.

## Decisions

### D1. Data loading: `toSignal()` over async pipe

**Choice:** Each data-consuming section uses `toSignal(contentService.get*(), { initialValue: [] })` instead of `async` pipe.

**Why:** `toSignal` integrates natively with signal-based OnPush components — no `| async`, no `ngUnsubscribe`, no nullable guards on the initial render. The `initialValue: []` means the template always has a typed array to iterate, even before the HTTP response arrives. Compatible with future `httpResource()` migration.

### D2. Section lazy-loading: `@defer (on viewport)`

**Choice:** All sections except Hero use `@defer (on viewport)` in HomeComponent.

**Why:** Angular 21's built-in viewport trigger is semantically identical to IntersectionObserver lazy-loading with zero boilerplate. Hero is above the fold — it loads eagerly and is included directly in HomeComponent's template. The `@placeholder` for each deferred section is an empty `<div>` with a min-height matching the section to prevent layout shift.

### D3. Scroll animations: CSS @keyframes at mount time

**Choice:** Add `@keyframes tm-fade-in-up` to `styles.css`. Section components carry a Tailwind utility class `animate-[tm-fade-in-up]` that fires the animation once when the element is first rendered into the DOM.

**Why:** Because `@defer (on viewport)` already ensures the section doesn't render until it's in view, the CSS animation fires at exactly the right moment — no IntersectionObserver directive needed. This is simpler (no directive lifecycle, no `disconnect()` logic) and achieves the same visual result. Card hover transitions use Tailwind `transition-all duration-200` utilities.

**Trade-off:** The animation fires only on first render — if the user scrolls back up and down, it doesn't replay. Acceptable for a portfolio.

### D4. Mobile menu: signal-based overlay, no CDK

**Choice:** `isMenuOpen = signal(false)` in SiteHeaderComponent. When true, an absolutely-positioned full-viewport overlay slides in from the top with a CSS transition. Closed by: clicking a nav link, clicking the backdrop, or pressing the close button.

**Why:** No dependencies (CDK not installed). The overlay is a simple conditional `@if (isMenuOpen())` block with a `translate-y` transition. Accessible via `aria-expanded` on the hamburger button.

### D5. Section content strategy: all copy through `t()`

**Choice:** Every user-visible string — hero tagline, about narrative paragraphs, mindset card titles and descriptions, section headings — is keyed in both `en.json` and `es.json`. The template calls `locale.t('hero.tagline')`.

**Why:** Keeps content out of templates and out of TypeScript. Switching language works instantly without re-rendering the route. The tradeoff is that `en.json` becomes the "source of truth" for English copy — all long-form text must be kept there.

**How components consume it:** Each section injects `LocaleService` as a protected property: `protected readonly locale = inject(LocaleService)`. Template calls: `{{ locale.t('hero.tagline') }}`.

### D6. Copy-to-clipboard in ContactSection

**Choice:** `navigator.clipboard.writeText(email)` + `copied = signal(false)`. On click: write to clipboard, set `copied(true)`, reset after 2 s via `setTimeout`. The button label toggles between "Copy email" and "Copied ✓" using `@if`.

**Why:** Browser-native, zero dependencies, works in all modern browsers targeting `tobiasmoreno.dev`.

### D7. NgOptimizedImage usage

Every `<img>` uses `NgOptimizedImage` (`[ngSrc]`). Hero photo (`Tobi.jpeg`) gets `priority` attribute (LCP image). Project card images and the company logo get explicit `width` and `height`. No inline base64 images.

### D8. Section structure and IDs

Each section component renders a `<section id="<name>">` root element. The anchor links in SiteHeader use `routerLink="/" fragment="<name>"` so `withInMemoryScrolling` handles the smooth scroll. This avoids manual `scrollIntoView` calls.

### D9. ProjectsSection image fallback

If a project image path is broken, the card still renders gracefully — the `<img>` element uses `NgOptimizedImage` with `fill` mode inside a fixed-aspect container, so layout doesn't break on 404.
