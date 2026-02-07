
import { createClient } from '@supabase/supabase-js';
import { Settings, Skill, Project, Blog, SystemLog, User } from '../types';
import { INITIAL_SETTINGS } from '../constants';

/**
 * RENONX SUPABASE UPLINK
 * IMPORTANT: Replace YOUR_SUPABASE_ANON_KEY with your actual 'anon' key from Supabase Dashboard.
 */
const SUPABASE_URL = 'https://maxuwumvpyqqijxhmrvd.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1heHV3dW12cHlxcWlqeGhtcnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NzE1OTMsImV4cCI6MjA4NjA0NzU5M30.j4O6UGjBnBlYGCnaODLJsUAF3jA93Vgl76JvOKVNbuY'; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const KEYS = {
  USER: 'renonx_user',
  LOGS: 'renonx_logs'
};

export const db = {
  init: async () => {
    try {
      const { error } = await supabase.from('settings').select('id').limit(1);
      if (error) {
        db.addLog(`Kernel Link Error: ${error.message}`, 'ERROR');
      } else {
        db.addLog('Nexus Uplink Established. Cloud Database Syncing...', 'SUCCESS');
      }
    } catch (err) {
      db.addLog('Kernel Initialization Failed.', 'ERROR');
    }
  },

  getSettings: async (): Promise<Settings> => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (error || !data) return INITIAL_SETTINGS;
      
      return {
        siteName: data.site_name,
        siteDescription: '', 
        heroHeadline: data.hero_headline,
        heroSubheadline: data.hero_subheadline,
        aboutBio: data.about_bio,
        years_experience: data.years_experience,
        mission_statement: data.mission_statement,
        contact_email: data.contact_email,
        profile_image_url: data.profile_image_url || INITIAL_SETTINGS.profileImageUrl,
        socialLinks: INITIAL_SETTINGS.socialLinks
      } as any;
    } catch (e) {
      return INITIAL_SETTINGS;
    }
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
        contact_email: settings.contactEmail,
        profile_image_url: settings.profileImageUrl
      })
      .eq('id', 1);
    
    if (error) db.addLog(`Settings Update Failed: ${error.message}`, 'ERROR');
    else db.addLog('Global parameters re-calibrated via Supabase.', 'SUCCESS');
  },

  uploadImage: async (file: File): Promise<string | null> => {
    try {
      if (!file.type.startsWith('image/')) throw new Error('Not an image.');
      const fileExt = file.name.split('.').pop();
      const fileName = `profile_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      const { data, error } = await supabase.storage.from('renonx-assets').upload(filePath, file);
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from('renonx-assets').getPublicUrl(filePath);
      return publicUrl;
    } catch (err: any) {
      db.addLog(`Upload Failed: ${err.message}`, 'ERROR');
      return null;
    }
  },

  getSkills: async (): Promise<Skill[]> => {
    const { data } = await supabase.from('skills').select('*').order('name');
    return data || [];
  },

  addSkill: async (skill: Skill) => {
    await supabase.from('skills').insert([skill]);
  },

  deleteSkill: async (id: string) => {
    await supabase.from('skills').delete().eq('id', id);
  },

  getProjects: async (): Promise<Project[]> => {
    const { data } = await supabase.from('projects').select('*').order('date', { ascending: false });
    return (data || []).map(p => ({ ...p, imageUrl: p.image_url }));
  },

  addProject: async (project: Project) => {
    await supabase.from('projects').insert([{
      title: project.title,
      description: project.description,
      category: project.category,
      image_url: project.imageUrl,
      link: project.link,
      github: project.github,
      date: project.date
    }]);
  },

  updateProject: async (id: string, updates: Partial<Project>) => {
    const payload: any = {};
    if (updates.title) payload.title = updates.title;
    if (updates.description) payload.description = updates.description;
    if (updates.imageUrl) payload.image_url = updates.imageUrl;
    if (updates.link) payload.link = updates.link;
    if (updates.category) payload.category = updates.category;

    const { error } = await supabase.from('projects').update(payload).eq('id', id);
    if (!error) db.addLog(`Project ${id} updated in database.`, 'SUCCESS');
  },

  deleteProject: async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
  },

  getBlogs: async (): Promise<Blog[]> => {
    const { data } = await supabase.from('blogs').select('*').order('date', { ascending: false });
    return (data || []).map(b => ({ ...b, imageUrl: b.image_url }));
  },

  addBlog: async (blog: Blog) => {
    await supabase.from('blogs').insert([{
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      tags: blog.tags,
      image_url: blog.imageUrl,
      date: blog.date
    }]);
  },

  deleteBlog: async (id: string) => {
    await supabase.from('blogs').delete().eq('id', id);
  },

  getLogs: (): SystemLog[] => {
    const data = localStorage.getItem(KEYS.LOGS);
    return data ? JSON.parse(data) : [];
  },
  
  addLog: (message: string, level: SystemLog['level'] = 'INFO') => {
    const current = db.getLogs();
    const newLog: SystemLog = { id: Math.random().toString(36).substring(7), timestamp: new Date().toISOString(), message, level };
    localStorage.setItem(KEYS.LOGS, JSON.stringify([newLog, ...current].slice(0, 50)));
  },

  getUser: (): User | null => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  
  login: (email: string, pass: string): User | null => {
    if (email === 'admin@renonx.com' && pass === 'password123') {
      const user = { id: 'admin-1', email, name: 'Zidan Mahmud' };
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => localStorage.removeItem(KEYS.USER)
};
