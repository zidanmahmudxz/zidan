
import React, { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, Twitter, MapPin, Send, ShieldCheck, Phone } from 'lucide-react';
import { db } from '../services/db';
import { INITIAL_SETTINGS } from '../constants';
import { Settings } from '../types';

const Contact: React.FC = () => {
  // Fix: Handle async getSettings
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);

  useEffect(() => {
    // Fix: Fetch settings asynchronously
    const fetchSettings = async () => {
      const data = await db.getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase">Communication Node</h2>
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase">Initiate Contact</h1>
        <p className="text-slate-400">
          Secure channel open. Leave a message for consultations, penetration tests, or development inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl border border-slate-800 space-y-10">
            <h3 className="text-2xl font-bold text-white">SYSTEM ENDPOINTS</h3>
            
            <div className="space-y-6">
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase font-bold tracking-widest mb-1">Electronic Mail</h4>
                  <p className="text-lg text-white font-medium">{settings.contactEmail}</p>
                </div>
              </div>
              
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase font-bold tracking-widest mb-1">Encrypted Line</h4>
                  <p className="text-lg text-white font-medium">+1 (555) 732-8732</p>
                </div>
              </div>
              
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase font-bold tracking-widest mb-1">Geographical Node</h4>
                  <p className="text-lg text-white font-medium">Remote Intelligence / Global</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <h4 className="text-sm font-mono text-slate-500 uppercase font-bold tracking-widest mb-4">Social Uplink</h4>
              <div className="flex gap-4">
                <a href={settings.socialLinks.github} className="p-4 bg-slate-900 rounded-2xl text-slate-400 hover:text-cyan-400 transition-all hover:scale-110">
                  <Github size={24} />
                </a>
                <a href={settings.socialLinks.linkedin} className="p-4 bg-slate-900 rounded-2xl text-slate-400 hover:text-cyan-400 transition-all hover:scale-110">
                  <Linkedin size={24} />
                </a>
                <a href={settings.socialLinks.twitter} className="p-4 bg-slate-900 rounded-2xl text-slate-400 hover:text-cyan-400 transition-all hover:scale-110">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="p-8 glass bg-cyan-500/5 rounded-3xl border border-cyan-500/20 flex items-center gap-6">
            <div className="w-16 h-16 shrink-0 bg-cyan-500/20 rounded-full flex items-center justify-center">
              <ShieldCheck className="text-cyan-400" size={32} />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Guaranteed Secure Routing</p>
              <p className="text-slate-400 text-sm">All messages are end-to-end encrypted before entering our data kernel.</p>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-3xl border border-slate-800 relative">
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Subject Identity</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none p-4 rounded-xl text-white" 
                  placeholder="Full Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Secure Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none p-4 rounded-xl text-white" 
                  placeholder="name@domain.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Protocol / Subject</label>
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none p-4 rounded-xl text-white" 
                placeholder="E.g. Penetration Testing Request"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest ml-1">Data Payload</label>
              <textarea 
                rows={6}
                className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none p-4 rounded-xl text-white resize-none" 
                placeholder="Transmission details..."
              ></textarea>
            </div>
            <button className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-xl shadow-cyan-500/20 uppercase tracking-widest">
              Transmit Message
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
