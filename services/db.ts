
import { createClient } from '@supabase/supabase-js';
import { Settings, Skill, Project, Blog, SystemLog, User } from '../types';
import { INITIAL_SETTINGS } from '../constants';

/**
 * RENONX SUPABASE UPLINK
 * Fill in your credentials from Supabase Project Settings > API
 */
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const KEYS = {
  USER: 'renonx_user',
  LOGS: 'renonx_logs'
};

export const db = {
  init: () => {
    db.addLog('Supabase Kernel Connected. Global Data Sync Active.', 'SUCCESS');
  },

  // Settings
  getSettings: async (): Promise<Settings> => {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();
    
    if (error || !data) return INITIAL_SETTINGS;
    
    return {
      siteName: data.site_name,
      siteDescription: '', // Add columns to SQL if needed
      heroHeadline: data.hero_headline,
      heroSubheadline: data.hero_subheadline,
      aboutBio: data.about_bio,
      yearsExperience: data.years_experience,
      missionStatement: data.mission_statement,
      contactEmail: data.contact_email,
      socialLinks: INITIAL_SETTINGS.socialLinks
    };
  },
  
  updateSettings: async (settings: Settings) => {
    const { error } = await supabase
      .from('settings')
      .update({
        site_name: settings.siteName,
        hero_headline: settings.heroHeadline,
        hero_subheadline: settings.heroSubheadline,
        about_bio: settings.aboutBio,
        years_experience: settings.yearsExperience,
        mission_statement: settings.missionStatement,
        contact_email: settings.contactEmail
      })
      .eq('id', 1);
    
    if (error) db.addLog(`Settings Update Failed: ${error.message}`, 'ERROR');
    else db.addLog('Global parameters re-calibrated via Supabase.', 'SUCCESS');
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    const { data, error } = await supabase.from('skills').select('*').order('name');
    return data || [];
  },

  addSkill: async (skill: Skill) => {
    const { error } = await supabase.from('skills').insert([skill]);
    if (!error) db.addLog(`Expertise module injected: ${skill.name}`, 'SUCCESS');
  },

  updateSkills: async (skills: Skill[]) => {
    // Basic implementation for bulk updates if needed
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) return [];
    return data.map(p => ({
      ...p,
      imageUrl: p.image_url
    }));
  },

  addProject: async (project: Project) => {
    const { error } = await supabase.from('projects').insert([{
      title: project.title,
      description: project.description,
      category: project.category,
      image_url: project.imageUrl,
      link: project.link,
      github: project.github,
      date: project.date
    }]);
    if (!error) db.addLog(`New Archive Stored in Cloud: ${project.title}`, 'SUCCESS');
  },

  deleteProject: async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) db.addLog(`Archive Redacted from Cloud: ID ${id}`, 'WARN');
  },

  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) return [];
    return data.map(b => ({
      ...b,
      imageUrl: b.image_url
    }));
  },

  addBlog: async (blog: Blog) => {
    const { error } = await supabase.from('blogs').insert([{
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      tags: blog.tags,
      image_url: blog.imageUrl,
      date: blog.date
    }]);
    if (!error) db.addLog(`Breach Log updated via Cloud: ${blog.title}`, 'SUCCESS');
  },

  deleteBlog: async (id: string) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (!error) db.addLog(`Article purged from Cloud: ID ${id}`, 'WARN');
  },

  // Logs (Keeping Logs local for performance, but syncable)
  getLogs: (): SystemLog[] => {
    const data = localStorage.getItem(KEYS.LOGS);
    return data ? JSON.parse(data) : [];
  },
  
  addLog: (message: string, level: SystemLog['level'] = 'INFO') => {
    const current = db.getLogs();
    const newLog: SystemLog = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      message,
      level
    };
    localStorage.setItem(KEYS.LOGS, JSON.stringify([newLog, ...current].slice(0, 50)));
  },

  // Auth
  getUser: (): User | null => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  
  login: (email: string, pass: string): User | null => {
    // NOTE: In production, use Supabase Auth for real security.
    // For now, keeping your simple logic.
    if (email === 'admin@renonx.com' && pass === 'password123') {
      const user = { id: 'admin-1', email, name: 'Zidan Mahmud' };
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
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
