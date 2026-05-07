export type SkillCategory = 'backend' | 'frontend' | 'cloud' | 'testing' | 'practices';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon?: string;
}
