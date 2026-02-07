
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../services/db';
import { Settings } from '../types';
import { INITIAL_SETTINGS } from '../constants';
import { Save, ShieldCheck, Image as ImageIcon, Upload, Loader2, AlertCircle, AlertTriangle } from 'lucide-react';

const ContentManager: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await db.getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await db.updateSettings(settings);
      db.addLog('Global kernel parameters updated successfully.', 'SUCCESS');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      db.addLog('Failed to update global settings.', 'ERROR');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Show instant local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setUploading(true);

    try {
      // 2. Upload to Cloud
      const publicUrl = await db.uploadImage(file);
      
      if (publicUrl) {
        setSettings(prev => ({ ...prev, profileImageUrl: publicUrl }));
        setPreviewUrl(null); // Clear preview once uploaded
        db.addLog('New profile identity visual uploaded.', 'SUCCESS');
      } else {
        setPreviewUrl(null); // Fallback to current if failed
        alert('Upload failed. Check if bucket "renonx-assets" exists in Supabase Storage.');
      }
    } catch (err) {
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Global Configuration</h1>
          <p className="text-slate-400 font-mono text-sm tracking-tight uppercase">Master controls for identity, headlines, and mission parameters.</p>
        </div>
        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm font-mono animate-bounce bg-green-500/10 px-6 py-2 rounded-full border border-green-500/20">
            <ShieldCheck size={18} /> KERNEL_UPDATED
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 space-y-8">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
              CORE PARAMETERS
            </h3>
            
            {/* Profile Visual Section */}
            <div className="p-8 bg-slate-900/50 rounded-3xl border border-slate-800 space-y-6">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center gap-2 tracking-widest">
                <ImageIcon size={14} /> Profile Identity Visual
              </label>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative group">
                   <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl relative bg-slate-950">
                      <img 
                        src={previewUrl || settings.profileImageUrl} 
                        className={`w-full h-full object-cover transition-opacity ${uploading ? 'opacity-30' : 'opacity-100'}`} 
                        alt="Profile Preview" 
                      />
                      {uploading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/40 backdrop-blur-sm">
                           <Loader2 className="text-cyan-400 animate-spin" size={32} />
                           <span className="text-[10px] text-cyan-400 font-mono animate-pulse uppercase">Syncing...</span>
                        </div>
                      )}
                   </div>
                   {!uploading && (
                      <button 
                        type="button"
                        onClick={triggerFileInput}
                        className="absolute -bottom-3 -right-3 p-4 bg-cyan-500 text-slate-950 rounded-2xl hover:bg-cyan-400 transition-all shadow-xl hover:scale-110 active:scale-95 z-10"
                      >
                        <Upload size={20} />
                      </button>
                   )}
                </div>

                <div className="flex-grow space-y-4 w-full">
                   <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                   />
                   <div className="space-y-1">
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 block">Direct Source URL</label>
                      <input 
                        type="text" 
                        value={settings.profileImageUrl}
                        onChange={e => setSettings({...settings, profileImageUrl: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white text-sm font-mono outline-none focus:border-cyan-500 transition-all"
                        placeholder="https://..."
                      />
                   </div>
                   <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-start gap-3">
                      <AlertCircle size={16} className="text-slate-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-slate-500 font-mono leading-relaxed">
                        Security Advisory: Ensure bucket <strong>'renonx-assets'</strong> is provisioned in Supabase Storage with <strong>Public</strong> read permissions.
                      </p>
                   </div>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Site Identity</label>
                <input 
                  type="text" 
                  value={settings.siteName}
                  onChange={e => setSettings({...settings, siteName: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Operations Experience (Years)</label>
                <input 
                  type="number" 
                  value={settings.yearsExperience}
                  onChange={e => setSettings({...settings, yearsExperience: parseInt(e.target.value)})}
                  className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Hero Headline</label>
              <input 
                type="text" 
                value={settings.heroHeadline}
                onChange={e => setSettings({...settings, heroHeadline: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none transition-all font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Hero Subheadline</label>
              <textarea 
                rows={2}
                value={settings.heroSubheadline}
                onChange={e => setSettings({...settings, heroSubheadline: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white resize-none focus:border-cyan-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">About Intelligence Bio</label>
              <textarea 
                rows={5}
                value={settings.aboutBio}
                onChange={e => setSettings({...settings, aboutBio: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white resize-none focus:border-cyan-500 outline-none transition-all leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Sidebar / Socials */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 uppercase tracking-tighter">SOCIAL UPLINKS</h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Secure Contact Email</label>
                <input 
                  type="email" 
                  value={settings.contactEmail}
                  onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white text-sm outline-none focus:border-cyan-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Github Repository</label>
                <input 
                  type="text" 
                  value={settings.socialLinks.github}
                  onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, github: e.target.value}})}
                  className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white text-sm outline-none focus:border-cyan-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">LinkedIn Profile</label>
                <input 
                  type="text" 
                  value={settings.socialLinks.linkedin}
                  onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, linkedin: e.target.value}})}
                  className="w-full bg-slate-900 border border-slate-800 p-4 rounded-xl text-white text-sm outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Save Action Card */}
          <div className="p-8 glass bg-red-500/[0.03] rounded-[2.5rem] border border-red-500/10 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle size={20} className="animate-pulse" />
              <h4 className="font-bold uppercase tracking-[0.1em] text-sm">Deployment Protocol</h4>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-mono uppercase tracking-tight">
              Executing this operation will broadcast changes to the production kernel. Previous parameters will be overwritten.
            </p>
            <button 
              type="submit"
              disabled={loading || uploading}
              className="w-full py-5 bg-cyan-500 text-slate-950 font-black rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-cyan-500/20 uppercase tracking-[0.2em] text-xs active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> COMMIT_CHANGES</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContentManager;
