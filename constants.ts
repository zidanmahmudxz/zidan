
import { Settings, Skill, Project, Blog } from './types';

export const INITIAL_SETTINGS: Settings = {
  siteName: "RenonX",
  siteDescription: "Elite Cyber Security & Web Solutions",
  heroHeadline: "SYSTEMS BREACHED. SECURITY RESTORED.",
  heroSubheadline: "Hi, I'm Zidan Mahmud. I build high-performance web applications and dismantle vulnerabilities.",
  aboutBio: "I am an Ethical Hacker and Full-Stack Developer with over 5 years of experience in securing digital environments. My mission is to build robust systems that stand the test of time and malicious intent.",
  yearsExperience: 5,
  missionStatement: "To revolutionize digital safety through proactive defense and elegant engineering.",
  contactEmail: "contact@renonx.com",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};

export const INITIAL_SKILLS: Skill[] = [
  { id: '1', name: 'React/Next.js', level: 95, category: 'Web Dev' },
  { id: '2', name: 'Node.js/TypeScript', level: 90, category: 'Web Dev' },
  { id: '3', name: 'Penetration Testing', level: 85, category: 'Security' },
  { id: '4', name: 'Network Security', level: 88, category: 'Security' },
  { id: '5', name: 'Vulnerability Assessment', level: 92, category: 'Pentesting' },
  { id: '6', name: 'Metasploit/Nmap', level: 80, category: 'Pentesting' },
  { id: '7', name: 'Docker/K8s', level: 75, category: 'Tools' }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'SecureGate Firewall',
    description: 'A custom-built application-layer firewall with real-time packet inspection.',
    category: 'Security',
    imageUrl: 'https://picsum.photos/seed/sec/800/450',
    link: '#',
    date: '2023-10-12'
  },
  {
    id: 'p2',
    title: 'Nexus eCommerce',
    description: 'High-performance React marketplace with integrated Stripe and high security.',
    category: 'Web Dev',
    imageUrl: 'https://picsum.photos/seed/web/800/450',
    link: '#',
    date: '2023-08-05'
  },
  {
    id: 'p3',
    title: 'AuthBypass Scanner',
    description: 'Automated script to detect insecure authentication implementation in legacy systems.',
    category: 'Pentesting',
    imageUrl: 'https://picsum.photos/seed/pen/800/450',
    link: '#',
    date: '2024-01-20'
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'b1',
    title: 'The Future of Zero Trust Architecture',
    excerpt: 'Why traditional perimeter defenses are failing and how Zero Trust saves enterprises.',
    content: 'Full article content about Zero Trust...',
    author: 'Zidan Mahmud',
    date: '2024-02-15',
    tags: ['Security', 'Cloud'],
    imageUrl: 'https://picsum.photos/seed/blog1/800/450'
  },
  {
    id: 'b2',
    title: 'React 19 Security Best Practices',
    excerpt: 'Deep dive into server actions and data sanitization in the latest React version.',
    content: 'Full article content about React security...',
    author: 'Zidan Mahmud',
    date: '2024-03-01',
    tags: ['Web Dev', 'React'],
    imageUrl: 'https://picsum.photos/seed/blog2/800/450'
  }
];
