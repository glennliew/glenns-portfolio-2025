export interface Project {
  id: string;
  title: string;
  role?: string;
  description?: string;
  highlights?: string[];
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
  date?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  highlights?: string[];
}

export enum SkillCategory {
  LANGUAGES = 'Languages',
  FRAMEWORKS = 'Frameworks',
  BACKEND = 'Backend & Database',
  CLOUD = 'Cloud & DevOps',
  TOOLS = 'Tools & Platforms'
}