import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocaleService } from '../../../core/locale/locale.service';
import { ContentService } from '../../../data/content.service';

@Component({
  selector: 'app-writing-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="writing" class="section-container animate-fade-in-up">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-[--color-fg] mb-3">
          {{ locale.t('writing.title') }}
        </h2>
        <p class="text-[--color-muted] max-w-xl">{{ locale.t('writing.subtitle') }}</p>
      </div>

      @if (posts().length === 0) {
        <div class="flex flex-col items-start gap-6 py-8 px-6 rounded-xl border border-[--color-border]">
          <p class="text-[--color-muted] text-sm">
            Publico notas sobre ingeniería backend, decisiones de diseño y el oficio de construir software.
          </p>
          <a href="https://tobias-moreno.netlify.app/" target="_blank" rel="noopener"
             class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[--color-border]
                    text-sm font-medium text-[--color-fg] hover:border-[--color-accent] transition-colors">
            {{ locale.t('writing.cta') }} →
          </a>
        </div>
      } @else {
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          @for (post of posts(); track post.id) {
            <a [href]="post.url" target="_blank" rel="noopener"
               class="flex flex-col gap-3 p-5 rounded-xl border border-[--color-border]
                      hover:border-[--color-accent]/50 hover:-translate-y-0.5 transition-all duration-200">
              <h3 class="font-semibold text-[--color-fg]">{{ post.title }}</h3>
              <p class="text-sm text-[--color-muted] leading-relaxed line-clamp-2">{{ post.excerpt }}</p>
              <div class="flex flex-wrap gap-1.5 mt-auto">
                @for (tag of post.tags; track tag) {
                  <span class="px-2 py-0.5 rounded text-xs border border-[--color-border] text-[--color-muted]">
                    {{ tag }}
                  </span>
                }
              </div>
            </a>
          }
        </div>
      }
    </section>
  `,
})
export class WritingSectionComponent {
  protected readonly locale = inject(LocaleService);
  private readonly content = inject(ContentService);
  protected readonly posts = toSignal(this.content.getPosts(), { initialValue: [] });
}
