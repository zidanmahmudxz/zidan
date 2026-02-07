
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutBio: string;
  yearsExperience: number;
  missionStatement: string;
  contactEmail: string;
  profileImageUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: 'Web Dev' | 'Security' | 'Pentesting' | 'Tools';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Web Dev' | 'Security' | 'Pentesting';
  imageUrl: string;
  link: string;
  github?: string;
  date: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  imageUrl: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}
