import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'tm-theme';
const VALID_MODES = new Set<string>(['system', 'light', 'dark']);

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly doc = inject(DOCUMENT);
  private readonly osDark = signal(false);

  readonly mode = signal<ThemeMode>('system');
  readonly resolvedTheme = computed<'light' | 'dark'>(() =>
    this.mode() === 'dark' || (this.mode() === 'system' && this.osDark()) ? 'dark' : 'light'
  );

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID_MODES.has(stored)) {
        this.mode.set(stored as ThemeMode);
      }
      this.osDark.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.doc.documentElement.classList.toggle('dark', this.resolvedTheme() === 'dark');
      }
    });

    effect((onCleanup) => {
      if (!isPlatformBrowser(this.platformId) || this.mode() !== 'system') return;
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => this.osDark.set(e.matches);
      mql.addEventListener('change', handler);
      onCleanup(() => mql.removeEventListener('change', handler));
    });
  }

  setMode(next: ThemeMode): void {
    this.mode.set(next);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }
}
