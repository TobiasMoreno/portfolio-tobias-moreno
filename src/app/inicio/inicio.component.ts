import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  openCV() {
    window.open('https://drive.google.com/file/d/1CVj8CjdPSItd1qcKQpO7Hpu6bb98BKRB/view?usp=sharing', '_blank');
  }
}
