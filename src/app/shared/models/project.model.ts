export interface Project {
  id: string;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  tech: string[];
  featured: boolean;
  year: number;
  role?: 'frontend' | 'fullstack' | 'backend';
}
