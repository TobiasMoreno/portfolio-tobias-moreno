import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { PagesService } from '../data-access/pages.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent implements OnInit, AfterViewInit {
  projects: any;
  pagesService = inject(PagesService);

  ngOnInit(): void {
    this.pagesService.getProjects().subscribe((data) => {
      this.projects = { state: () => ({ projects: data }) };
    });
  }

  ngAfterViewInit() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top15%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    this.createFloatingParticles();
  }

  private createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 10%;
      pointer-events: none;
      z-index: -1;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, var(--violet), var(--red));
        border-radius: 50%;
        opacity: 0.6;
      `;

      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      });

      gsap.to(particle, {
        y: -30,
        x: '+=50',
        duration: 8 + Math.random() * 4,
        repeat: -1,
        ease: 'none',
      });

      particlesContainer.appendChild(particle);
    }
  }
}
