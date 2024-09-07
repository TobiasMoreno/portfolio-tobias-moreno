import { Component, inject } from '@angular/core';
import { PagesStateService } from '../../data-access/pages-status.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
  providers: [PagesStateService]
})
export class ProjectListComponent {
  projects = inject(PagesStateService)

}
