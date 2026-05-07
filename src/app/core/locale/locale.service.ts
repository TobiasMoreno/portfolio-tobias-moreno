import { isPlatformBrowser } from '@angular/common';
import { effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Locale = 'en' | 'es';

const STORAGE_KEY = 'tm-locale';
const VALID_LOCALES = new Set<string>(['en', 'es']);

function flatten(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(acc, flatten(val as Record<string, unknown>, fullKey));
    } else {
      acc[fullKey] = String(val);
    }
    return acc;
  }, {});
}

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly http = inject(HttpClient);

  private readonly cache = new Map<Locale, Record<string, string>>();
  private readonly dict = signal<Record<string, string>>({});

  readonly locale = signal<Locale>('en');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && VALID_LOCALES.has(stored)) {
        this.locale.set(stored as Locale);
      }
    }

    effect(() => {
      this.loadDictionary(this.locale());
    });
  }

  t(key: string): string {
    return this.dict()[key] ?? key;
  }

  setLocale(next: Locale): void {
    this.locale.set(next);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, next);
    }
  }

  private loadDictionary(locale: Locale): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.cache.has(locale)) {
      this.dict.set(this.cache.get(locale)!);
      return;
    }
    this.http.get<Record<string, unknown>>(`/assets/i18n/${locale}.json`).subscribe({
      next: (raw) => {
        const flat = flatten(raw);
        this.cache.set(locale, flat);
        this.dict.set(flat);
      },
    });
  }
}
