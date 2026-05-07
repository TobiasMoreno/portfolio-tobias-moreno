import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocaleService } from '../../../core/locale/locale.service';
import { ContentService } from '../../../data/content.service';
import type { SkillCategory } from '../../../shared/models';

const CATEGORY_ORDER: SkillCategory[] = ['backend', 'frontend', 'cloud', 'testing', 'practices'];

function groupBy<T>(arr: T[], key: (item: T) => string): Map<string, T[]> {
  return arr.reduce((map, item) => {
    const k = key(item);
    const group = map.get(k) ?? [];
    group.push(item);
    map.set(k, group);
    return map;
  }, new Map<string, T[]>());
}

@Component({
  selector: 'app-stack-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="stack" class="section-container animate-fade-in-up">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-[--color-fg] mb-3">
          {{ locale.t('stack.title') }}
        </h2>
        <p class="text-[--color-muted]">{{ locale.t('stack.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (category of categoryOrder; track category) {
          @if (groups().get(category); as skillsInCategory) {
            <div class="flex flex-col gap-4">
              <h3 class="text-xs font-semibold text-[--color-muted] uppercase tracking-widest">
                {{ locale.t('stack.' + category) }}
              </h3>
              <div class="flex flex-wrap gap-2">
                @for (skill of skillsInCategory; track skill.id) {
                  <span class="px-3 py-1.5 rounded-lg text-sm border border-[--color-border]
                               bg-[--color-border]/30 text-[--color-fg]">
                    {{ skill.name }}
                  </span>
                }
              </div>
            </div>
          }
        }
      </div>
    </section>
  `,
})
export class StackSectionComponent {
  protected readonly locale = inject(LocaleService);
  private readonly content = inject(ContentService);
  private readonly skills = toSignal(this.content.getSkills(), { initialValue: [] });
  protected readonly groups = computed(() => groupBy(this.skills(), (s) => s.category));
  protected readonly categoryOrder = CATEGORY_ORDER;
}
