export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  tech: string[];
  featured: boolean;
  year: number;
  role?: 'frontend' | 'fullstack' | 'backend';
}
