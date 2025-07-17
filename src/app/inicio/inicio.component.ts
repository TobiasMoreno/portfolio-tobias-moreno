import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements AfterViewInit {
  title = 'Tobias Emiliano Moreno';
  titleLetters = this.title.split('');

  openCV() {
    window.open('https://drive.google.com/file/d/1CVj8CjdPSItd1qcKQpO7Hpu6bb98BKRB/view?usp=sharing', '_blank');
  }

  ngAfterViewInit() {
    // Stagger animation para el título
    gsap.from('#stagger-title span', {
      opacity: 0,
      y: 40,
      stagger: 0.05,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2
    });

    // Parallax para la imagen
    gsap.to('#parallax-img', {
      y: 80,
      ease: 'none',
      scrollTrigger: {
        trigger: '#inicio',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}
