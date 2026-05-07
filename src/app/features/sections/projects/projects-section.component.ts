import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocaleService } from '../../../core/locale/locale.service';
import { ContentService } from '../../../data/content.service';

@Component({
  selector: 'app-projects-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
  template: `
    <section id="projects" class="section-container animate-fade-in-up">
      <div class="mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-[--color-fg] mb-3">
          {{ locale.t('projects.title') }}
        </h2>
        <p class="text-[--color-muted]">{{ locale.t('projects.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (project of projects(); track project.id) {
          <article class="group flex flex-col rounded-xl border border-[--color-border]
                          hover:-translate-y-1 hover:shadow-lg hover:border-[--color-accent]/50
                          transition-all duration-200 overflow-hidden">
            <div class="relative h-48 bg-[--color-border]">
              <img [ngSrc]="project.image" fill [alt]="project.title"
                   class="object-cover" />
            </div>
            <div class="flex flex-col gap-3 p-5 flex-1">
              <h3 class="font-semibold text-[--color-fg]">{{ project.title }}</h3>
              <p class="text-sm text-[--color-muted] leading-relaxed line-clamp-3">
                {{ project.description }}
              </p>
              <div class="flex flex-wrap gap-1.5 mt-auto pt-3">
                @for (tech of project.tech; track tech) {
                  <span class="px-2 py-0.5 rounded text-xs border border-[--color-border] text-[--color-muted]">
                    {{ tech }}
                  </span>
                }
              </div>
              @if (project.liveUrl || project.repoUrl) {
                <div class="flex gap-3 pt-2">
                  @if (project.liveUrl) {
                    <a [href]="project.liveUrl" target="_blank" rel="noopener"
                       class="text-xs font-medium text-[--color-accent] hover:underline">
                      {{ locale.t('projects.demo') }} ↗
                    </a>
                  }
                  @if (project.repoUrl) {
                    <a [href]="project.repoUrl" target="_blank" rel="noopener"
                       class="text-xs font-medium text-[--color-muted] hover:text-[--color-fg] transition-colors">
                      {{ locale.t('projects.repo') }} ↗
                    </a>
                  }
                </div>
              }
            </div>
          </article>
        }
      </div>

      <div class="mt-8 text-center">
        <a href="https://github.com/TobiasMoreno" target="_blank" rel="noopener"
           class="inline-flex items-center gap-2 text-sm text-[--color-muted] hover:text-[--color-fg] transition-colors">
          {{ locale.t('projects.view_all') }} →
        </a>
      </div>
    </section>
  `,
})
export class ProjectsSectionComponent {
  protected readonly locale = inject(LocaleService);
  private readonly content = inject(ContentService);
  protected readonly projects = toSignal(this.content.getProjects(), { initialValue: [] });
}
