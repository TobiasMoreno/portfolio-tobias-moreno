import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { LocaleService } from '../../../core/locale/locale.service';
import { ThemeMode, ThemeService } from '../../../core/theme/theme.service';

const NAV_ITEMS = [
  { key: 'nav.about', fragment: 'about' },
  { key: 'nav.experience', fragment: 'experience' },
  { key: 'nav.projects', fragment: 'projects' },
  { key: 'nav.stack', fragment: 'stack' },
  { key: 'nav.writing', fragment: 'writing' },
  { key: 'nav.contact', fragment: 'contact' },
] as const;

const THEME_CYCLE: Record<ThemeMode, ThemeMode> = { light: 'dark', dark: 'system', system: 'light' };

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 h-14 border-b border-[--color-border] bg-[--color-bg]/80 backdrop-blur-sm">
      <div class="mx-auto flex h-full max-w-5xl items-center justify-between px-6">

        <a [routerLink]="'/'" aria-label="Tobias Moreno — home" class="flex items-center hover:opacity-80 transition-opacity">
          <img [ngSrc]="theme.resolvedTheme() === 'dark' ? 'assets/img/logo-dark.png' : 'assets/img/logo-light.jpg'"
               width="32" height="32" alt="TM logo" class="rounded-sm" priority />
        </a>

        <nav class="hidden md:flex items-center gap-6" aria-label="Main navigation">
          @for (item of navItems; track item.fragment) {
            <a [routerLink]="'/'" [fragment]="item.fragment"
               class="text-sm text-[--color-muted] hover:text-[--color-fg] transition-colors duration-150">
              {{ locale.t(item.key) }}
            </a>
          }
        </nav>

        <div class="hidden md:flex items-center gap-2">
          <button (click)="toggleLocale()"
                  [attr.aria-label]="locale.t('locale.label')"
                  class="text-xs font-medium text-[--color-muted] hover:text-[--color-fg] transition-colors px-2.5 py-1 rounded border border-[--color-border] hover:border-[--color-accent]">
            {{ locale.locale() === 'en' ? 'ES' : 'EN' }}
          </button>
          <button (click)="cycleTheme()"
                  [attr.aria-label]="locale.t('theme.toggle.label')"
                  class="text-[--color-muted] hover:text-[--color-fg] transition-colors p-1.5 rounded hover:bg-[--color-border]">
            @if (theme.resolvedTheme() === 'dark') {
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            }
          </button>
        </div>

        <button (click)="isMenuOpen.set(true)"
                [attr.aria-expanded]="isMenuOpen()"
                aria-controls="mobile-menu"
                aria-label="Open menu"
                class="md:hidden text-[--color-muted] hover:text-[--color-fg] p-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </header>

    @if (isMenuOpen()) {
      <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu"
           class="fixed inset-0 z-50 flex flex-col bg-[--color-bg] px-6 pt-5 pb-8 md:hidden">
        <div class="flex items-center justify-between mb-10">
          <img [ngSrc]="theme.resolvedTheme() === 'dark' ? 'assets/img/logo-dark.png' : 'assets/img/logo-light.jpg'"
               width="32" height="32" alt="TM logo" class="rounded-sm" />
          <button (click)="isMenuOpen.set(false)" aria-label="Close menu"
                  class="text-[--color-muted] hover:text-[--color-fg] p-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <nav class="flex flex-col gap-7" aria-label="Mobile navigation">
          @for (item of navItems; track item.fragment) {
            <a [routerLink]="'/'" [fragment]="item.fragment"
               (click)="isMenuOpen.set(false)"
               class="text-2xl font-medium text-[--color-fg] hover:text-[--color-accent] transition-colors">
              {{ locale.t(item.key) }}
            </a>
          }
        </nav>
        <div class="mt-auto flex items-center gap-3 pt-8 border-t border-[--color-border]">
          <button (click)="toggleLocale()"
                  class="text-sm font-medium text-[--color-muted] hover:text-[--color-fg] transition-colors px-3 py-1.5 rounded border border-[--color-border]">
            {{ locale.locale() === 'en' ? 'ES' : 'EN' }}
          </button>
          <button (click)="cycleTheme()"
                  [attr.aria-label]="locale.t('theme.toggle.label')"
                  class="text-[--color-muted] hover:text-[--color-fg] transition-colors p-2 rounded">
            @if (theme.resolvedTheme() === 'dark') {
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            }
          </button>
        </div>
      </div>
    }
  `,
})
export class SiteHeaderComponent {
  protected readonly locale = inject(LocaleService);
  protected readonly theme = inject(ThemeService);
  protected readonly isMenuOpen = signal(false);
  protected readonly navItems = NAV_ITEMS;

  protected toggleLocale(): void {
    this.locale.setLocale(this.locale.locale() === 'en' ? 'es' : 'en');
  }

  protected cycleTheme(): void {
    this.theme.setMode(THEME_CYCLE[this.theme.mode()]);
  }
}
