import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../../shared/interface';
import { BaseHttpService } from '../../shared/data-access/base-http.service';

@Injectable({providedIn: 'root'})
export class PagesService extends BaseHttpService{

  getProjects() : Observable<IProject[]>{
    return this.http.get<IProject[]>(this.dataUrl);
  }
  
}
