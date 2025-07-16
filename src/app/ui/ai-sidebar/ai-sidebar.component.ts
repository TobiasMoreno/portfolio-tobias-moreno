import { Component, inject, OnInit } from '@angular/core';
import {
  AiAssistantService,
  AIResponse,
} from '../../shared/services/ai-assistant.service';

@Component({
  selector: 'app-ai-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './ai-sidebar.component.html',
  styleUrls: ['./ai-sidebar.component.css'],
})
export class AiSidebarComponent implements OnInit {
  isOpen = false;
  prompts: AIResponse[] = [];
  selectedResponse: AIResponse | null = null;
  private readonly aiService = inject(AiAssistantService);

  ngOnInit(): void {
    this.prompts = this.aiService.getResponses();
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.selectedResponse = null;
    }
  }

  selectPrompt(prompt: AIResponse): void {
    this.selectedResponse = prompt;
  }

  closeSidebar(): void {
    this.isOpen = false;
    this.selectedResponse = null;
  }

  formatAnswer(answer: string): string {
    return answer.replace(/\n/g, '<br>');
  }
}
