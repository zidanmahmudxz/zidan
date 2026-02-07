
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Shield, Target, Award, Cpu, Terminal } from 'lucide-react';
import { INITIAL_SETTINGS } from '../constants';
import { Settings } from '../types';

const About: React.FC = () => {
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
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
      {/* Bio Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            Intelligence Report
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            BEHIND THE <span className="text-cyan-400">INTERFACE</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            {settings.aboutBio}
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white font-mono">{settings.yearsExperience}+</div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Years Active</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-white font-mono">100+</div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Systems Secured</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square glass rounded-3xl border border-slate-800 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-purple-500/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Terminal size={120} className="text-slate-800 animate-pulse" />
            </div>
            {/* Cyber Decorations */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-500/40 vertical-text select-none">
              SECURE_HASH_0x7F2A9
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-500/10 blur-3xl -z-10"></div>
        </div>
      </section>

      {/* Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "Proactive Defense", 
            desc: "Identifying and mitigating threats before they manifest in production environments.",
            icon: Shield,
            color: "text-cyan-400"
          },
          { 
            title: "Precision Engineering", 
            desc: "Writing lean, high-performance code that prioritizes both user experience and security.",
            icon: Target,
            color: "text-purple-400"
          },
          { 
            title: "Ethical Integrity", 
            desc: "Adhering to strict white-hat principles while exploring the limits of digital systems.",
            icon: Award,
            color: "text-green-400"
          }
        ].map((item, i) => (
          <div key={i} className="p-8 glass border border-slate-800 rounded-3xl space-y-4">
            <div className={`w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center ${item.color}`}>
              <item.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;
