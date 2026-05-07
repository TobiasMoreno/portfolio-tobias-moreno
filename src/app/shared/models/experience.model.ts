export interface Experience {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  project?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
  highlightsEs?: string[];
  stack: string[];
}
