import { inject, Injectable } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { PagesService } from './pages.service';
import { BehaviorSubject, catchError, map, Subject, switchMap } from 'rxjs';
import { IProject } from '../../../shared/interface';

interface State {
  projects: IProject[];
  status: 'Loading' | 'Success' | 'Error';
}
@Injectable()
export class PagesStateService {
  private pagesService = inject(PagesService);

  private _state: State = {
    projects: [],
    status: 'Loading' as const,
  };

  pages$ = new BehaviorSubject<State>({
    projects : [],
    status: 'Loading' as const
  });

  loadPages$ = this.pages$.pipe(
    switchMap(() => this.pagesService.getProjects()),
    map((projects) => ({ projects, status: 'Success' as const })),
    catchError(() => {
      return [{ projects: [], status: 'Error' as const }];
    })
  );

  state = signalSlice({
    initialState: this._state,
    sources: [
      this.pages$.pipe(
        map((project) => ({ project, status: 'Loading' as const }))
      ),
      this.loadPages$,
    ],
  });
}
