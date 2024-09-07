import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../app/environments/enviroment";

@Injectable({
    providedIn: 'root',
  })
  export class BaseHttpService {
    http = inject(HttpClient);
    dataUrl = environment.DATA_URL;
  }