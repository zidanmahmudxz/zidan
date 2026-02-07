
import { Settings, Skill, Project, Blog, SystemLog, User } from '../types';
import { INITIAL_SETTINGS, INITIAL_SKILLS, INITIAL_PROJECTS, INITIAL_BLOGS } from '../constants';

/**
 * RENONX KERNEL - DATABASE SERVICE
 * Current Implementation: LocalStorage (Browser Memory)
 * 
 * PRODUCTION MIGRATION NOTE:
 * To make your portfolio visible to the world, you should integrate Supabase.
 * Step 1: Create a project at supabase.com
 * Step 2: Install @supabase/supabase-js
 * Step 3: Replace these methods with supabase.from('table').select() calls.
 */

const KEYS = {
  SETTINGS: 'renonx_settings',
  SKILLS: 'renonx_skills',
  PROJECTS: 'renonx_projects',
  BLOGS: 'renonx_blogs',
  LOGS: 'renonx_logs',
  USER: 'renonx_user'
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const get = <T,>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  if (!data) return defaultValue;
  try {
    return JSON.parse(data) as T;
  } catch {
    return defaultValue;
  }
};

const set = <T,>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const db = {
  init: () => {
    if (!localStorage.getItem(KEYS.SETTINGS)) set(KEYS.SETTINGS, INITIAL_SETTINGS);
    if (!localStorage.getItem(KEYS.SKILLS)) set(KEYS.SKILLS, INITIAL_SKILLS);
    if (!localStorage.getItem(KEYS.PROJECTS)) set(KEYS.PROJECTS, INITIAL_PROJECTS);
    if (!localStorage.getItem(KEYS.BLOGS)) set(KEYS.BLOGS, INITIAL_BLOGS);
    if (!localStorage.getItem(KEYS.LOGS)) set(KEYS.LOGS, []);
    
    db.addLog('Nexus Kernel Initialized. Secure Storage Active.', 'SUCCESS');
  },

  // Settings
  getSettings: async (): Promise<Settings> => {
    await delay(200);
    return get(KEYS.SETTINGS, INITIAL_SETTINGS);
  },
  
  updateSettings: async (settings: Settings) => {
    await delay(300);
    set(KEYS.SETTINGS, settings);
    db.addLog('Global parameters re-calibrated.', 'INFO');
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    await delay(200);
    return get(KEYS.SKILLS, INITIAL_SKILLS);
  },
  
  updateSkills: async (skills: Skill[]) => {
    set(KEYS.SKILLS, skills);
  },

  addSkill: async (skill: Skill) => {
    const current = get(KEYS.SKILLS, INITIAL_SKILLS);
    set(KEYS.SKILLS, [...current, skill]);
    db.addLog(`Expertise module injected: ${skill.name}`, 'SUCCESS');
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    await delay(300);
    return get(KEYS.PROJECTS, INITIAL_PROJECTS);
  },

  addProject: async (project: Project) => {
    const current = get(KEYS.PROJECTS, INITIAL_PROJECTS);
    set(KEYS.PROJECTS, [project, ...current]);
    db.addLog(`New Archive Stored: ${project.title}`, 'SUCCESS');
  },

  deleteProject: async (id: string) => {
    const current = get(KEYS.PROJECTS, INITIAL_PROJECTS);
    set(KEYS.PROJECTS, current.filter(p => p.id !== id));
    db.addLog(`Archive Redacted: ID ${id}`, 'WARN');
  },

  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    await delay(300);
    return get(KEYS.BLOGS, INITIAL_BLOGS);
  },

  addBlog: async (blog: Blog) => {
    const current = get(KEYS.BLOGS, INITIAL_BLOGS);
    set(KEYS.BLOGS, [blog, ...current]);
    db.addLog(`Breach Log updated: ${blog.title}`, 'SUCCESS');
  },

  deleteBlog: async (id: string) => {
    const current = get(KEYS.BLOGS, INITIAL_BLOGS);
    set(KEYS.BLOGS, current.filter(b => b.id !== id));
    db.addLog(`Article purged from kernel: ID ${id}`, 'WARN');
  },

  // Logs
  getLogs: (): SystemLog[] => get(KEYS.LOGS, []),
  
  addLog: (message: string, level: SystemLog['level'] = 'INFO') => {
    const current = get<SystemLog[]>(KEYS.LOGS, []);
    const newLog: SystemLog = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      message,
      level
    };
    set(KEYS.LOGS, [newLog, ...current].slice(0, 50));
  },

  // Auth
  getUser: (): User | null => get(KEYS.USER, null),
  
  login: (email: string, pass: string): User | null => {
    if (email === 'admin@renonx.com' && pass === 'password123') {
      const user = { id: 'admin-1', email, name: 'Zidan Mahmud' };
      set(KEYS.USER, user);
      db.addLog(`Identity Verified: ROOT_ADMIN session established.`, 'SUCCESS');
      return user;
    }
    db.addLog(`Access Denied: Failed login attempt for ${email}`, 'ERROR');
    return null;
  },

  logout: () => {
    localStorage.removeItem(KEYS.USER);
    db.addLog('Session Terminated. Buffer Cleared.', 'INFO');
  }
};
