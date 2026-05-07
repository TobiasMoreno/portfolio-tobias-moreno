import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocaleService } from '../../../core/locale/locale.service';
import { ContentService } from '../../../data/content.service';
import type { Experience } from '../../../shared/models';

@Component({
  selector: 'app-experience-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <section id="experience" class="section-container animate-fade-in-up">
      <h2 class="text-3xl font-bold tracking-tight text-[--color-fg] mb-12">
        {{ locale.t('experience.title') }}
      </h2>

      <div class="flex flex-col gap-12">
        @for (item of items(); track item.id) {
          <div class="relative pl-8 border-l-2 border-[--color-border]">
            <div class="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[--color-accent]"></div>

            <div class="flex flex-col gap-5">

              <!-- Header -->
              <div class="flex flex-wrap items-start gap-4">
                @if (item.companyLogo) {
                  <div class="flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-[--color-border] bg-white flex items-center justify-center">
                    <img [ngSrc]="item.companyLogo" width="40" height="40" [alt]="item.company" class="object-contain" />
                  </div>
                }
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="text-lg font-semibold text-[--color-fg]">{{ item.role }}</h3>
                    @if (item.current) {
                      <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-[--color-accent]/10 text-[--color-accent] border border-[--color-accent]/20">
                        {{ locale.t('experience.current_badge') }}
                      </span>
                    }
                  </div>
                  <p class="text-sm font-medium text-[--color-muted]">{{ item.company }}</p>
                  @if (item.project) {
                    <p class="text-xs text-[--color-muted] mt-0.5 italic">{{ item.project }}</p>
                  }
                  <p class="text-xs text-[--color-muted] mt-1">
                    {{ item.startDate }} — {{ item.current ? locale.t('experience.present') : item.endDate }}
                    · {{ item.location }}
                  </p>
                </div>
              </div>

              <!-- Highlights -->
              <div>
                <p class="text-xs font-semibold text-[--color-muted] uppercase tracking-wider mb-3">
                  {{ locale.t('experience.highlights_title') }}
                </p>
                <ul class="flex flex-col gap-2">
                  @for (highlight of getHighlights(item); track $index) {
                    <li class="flex gap-2 text-sm text-[--color-muted] leading-relaxed">
                      <span class="text-[--color-accent] flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
                      {{ highlight }}
                    </li>
                  }
                </ul>
              </div>

              <!-- Stack -->
              <div>
                <p class="text-xs font-semibold text-[--color-muted] uppercase tracking-wider mb-3">
                  {{ locale.t('experience.stack_title') }}
                </p>
                <div class="flex flex-wrap gap-2">
                  @for (tech of item.stack; track tech) {
                    <span class="px-2.5 py-1 rounded text-xs border border-[--color-border] text-[--color-muted]">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>

            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class ExperienceSectionComponent {
  protected readonly locale = inject(LocaleService);
  private readonly content = inject(ContentService);
  protected readonly items = toSignal(this.content.getExperience(), { initialValue: [] });

  protected getHighlights(item: Experience): string[] {
    return this.locale.locale() === 'es'
      ? (item.highlightsEs ?? item.highlights)
      : item.highlights;
  }
}
