import { Injectable } from "@angular/core";

export interface SubmitForm{
    nombre: string;
    email: string;
    mensaje: string;
}

@Injectable({
    providedIn: 'root'
})
export class FormService {

    submit(){
        
    }
}