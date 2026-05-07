import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Experience, Post, Project, Skill } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/assets/data/projects.json');
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>('/assets/data/experience.json');
  }

  getSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>('/assets/data/skills.json');
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('/assets/data/posts.json');
  }
}
