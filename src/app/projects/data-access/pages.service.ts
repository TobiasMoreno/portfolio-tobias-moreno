import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '../../../shared/data-access/base-http.service';
import { IProject } from '../../../shared/interface';

@Injectable({providedIn: 'root'})
export class PagesService extends BaseHttpService{

  getProjects() : Observable<IProject[]>{
    return this.http.get<IProject[]>(this.dataUrl);
  }
  
}
