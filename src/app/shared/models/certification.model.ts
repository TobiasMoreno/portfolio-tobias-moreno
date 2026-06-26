export type CertificationType = 'ai-dev' | 'agents' | 'professional' | 'academic';

export interface Certification {
  id: string;
  code: string;
  type: CertificationType;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  url?: string;
}
