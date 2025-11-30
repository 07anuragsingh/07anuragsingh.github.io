export interface Project {
  title: string;
  role: string;
  date: string;
  description: string[];
  tech: string[];
  github?: string;
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  date: string;
  type: string;
  location?: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  date: string;
  score: string;
  location: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
