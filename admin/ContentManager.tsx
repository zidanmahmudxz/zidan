
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Settings } from '../types';
import { INITIAL_SETTINGS } from '../constants';
import { Save, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';

const ContentManager: React.FC = () => {
  // Fix: Handle async getSettings
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fix: Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      const data = await db.getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Fix: Handle async updateSettings
    const update = async () => {
      await db.updateSettings(settings);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    };
    update();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 uppercase">Global Configuration</h1>
          <p className="text-slate-400">Master controls for identity, headlines, and mission parameters.</p>
        </div>
        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm font-mono animate-bounce">
            <ShieldCheck size={18} /> KERNEL_UPDATED
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Identity & Mission */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">CORE PARAMETERS</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase">Site Name</label>
                <input 
                  type="text" 
                  value={settings.siteName}
                  onChange={e => setSettings({...settings, siteName: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase">Years of Exp</label>
                <input 
                  type="number" 
                  value={settings.yearsExperience}
                  onChange={e => setSettings({...settings, yearsExperience: parseInt(e.target.value)})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase">Hero Headline</label>
              <input 
                type="text" 
                value={settings.heroHeadline}
                onChange={e => setSettings({...settings, heroHeadline: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase">Hero Subheadline</label>
              <textarea 
                rows={2}
                value={settings.heroSubheadline}
                onChange={e => setSettings({...settings, heroSubheadline: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase">About Bio</label>
              <textarea 
                rows={4}
                value={settings.aboutBio}
                onChange={e => setSettings({...settings, aboutBio: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase">Mission Statement</label>
              <textarea 
                rows={2}
                value={settings.missionStatement}
                onChange={e => setSettings({...settings, missionStatement: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* Social & Contact */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4">SOCIAL UPLINKS</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase">Contact Email</label>
                <input 
                  type="email" 
                  value={settings.contactEmail}
                  onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase">Github URL</label>
                <input 
                  type="text" 
                  value={settings.socialLinks.github}
                  onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, github: e.target.value}})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase">LinkedIn URL</label>
                <input 
                  type="text" 
                  value={settings.socialLinks.linkedin}
                  onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, linkedin: e.target.value}})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                />
              </div>
            </div>
          </div>

          <div className="p-8 glass bg-red-500/5 rounded-3xl border border-red-500/20 space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle size={20} />
              <h4 className="font-bold">DANGER ZONE</h4>
            </div>
            <p className="text-xs text-slate-500">Updates here affect the public-facing kernel immediately. Proceed with caution.</p>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-cyan-500 text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <><Save size={20} /> COMMIT CHANGES</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContentManager;
