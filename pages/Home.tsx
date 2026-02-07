
import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, ShieldCheck, Terminal as TerminalIcon, Cpu, Globe, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../services/db';
import { INITIAL_SETTINGS } from '../constants';
import { Settings } from '../types';

const Home: React.FC = () => {
  // Fix: Handle async getSettings
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
  const [typedText, setTypedText] = useState('');
  const fullText = "Scanning environment... [OK]\nInitializing security protocols... [OK]\nBypassing limitations... [SUCCESS]\nWelcome to the Nexus of Security.";

  useEffect(() => {
    // Fix: Fetch settings asynchronously
    const fetchSettings = async () => {
      const data = await db.getSettings();
      setSettings(data);
    };
    fetchSettings();

    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative px-6 pt-16 md:pt-32 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase">
              <ShieldCheck size={14} className="animate-pulse" />
              System Secure
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
              {settings.heroHeadline.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 0 ? '' : 'text-cyan-400'}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              {settings.heroSubheadline}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/portfolio" className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 uppercase tracking-widest text-sm">
                Explore Archives
                <ChevronRight size={20} />
              </Link>
              <Link to="/contact" className="px-8 py-4 glass border border-slate-700 hover:border-cyan-500/50 text-white font-bold rounded-xl transition-all uppercase tracking-widest text-sm">
                Initiate Contact
              </Link>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in duration-1000">
            {/* Identity Profile + Terminal Stack */}
            <div className="flex flex-col gap-6">
              {/* Identity Card */}
              <div className="glass p-4 rounded-2xl border border-slate-800 flex items-center gap-6 relative overflow-hidden group">
                <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden border-2 border-cyan-500/30 cyan-glow">
                  {/* Subject Image Placeholder - User should replace with their own photo */}
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400" 
                    alt="Zidan Mahmud" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 animate-scanline"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-mono tracking-tighter uppercase">Zidan Mahmud</h3>
                    <UserCheck className="text-cyan-400" size={16} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-cyan-500/60 font-bold uppercase tracking-widest">Primary Identity: ETHICAL_HACKER</span>
                    <span className="text-[10px] font-mono text-purple-500/60 font-bold uppercase tracking-widest">Secondary: FULLSTACK_DEV</span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">
                      <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                      STATUS: ACTIVE
                    </span>
                    <span className="text-[9px] font-mono text-slate-500">LEVEL: ROOT_ADMIN</span>
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-5">
                  <Shield size={120} />
                </div>
              </div>

              {/* Visual Terminal */}
              <div className="relative z-10 w-full glass rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono font-bold tracking-widest uppercase">SECURE_TERMINAL_V3</div>
                  <div className="w-12"></div>
                </div>
                <div className="p-6 font-mono text-xs md:text-sm h-48 overflow-y-auto">
                  <div className="text-cyan-400 mb-2 font-bold">root@renonx:~# <span className="text-slate-300 font-normal">./initialize_interface.sh</span></div>
                  <pre className="text-slate-400 whitespace-pre-wrap leading-relaxed">
                    {typedText}
                    <span className="w-2 h-4 bg-cyan-400 inline-block align-middle ml-1 animate-pulse"></span>
                  </pre>
                </div>
              </div>
            </div>

            {/* Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 blur-[100px] opacity-20 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: 'Vulnerabilities Fixed', val: '400+', icon: Shield },
            { label: 'Global Clients', val: '24', icon: Globe },
            { label: 'Security Tools', val: '15', icon: Cpu },
            { label: 'Lines of Secure Code', val: '500k', icon: TerminalIcon },
          ].map((stat, i) => (
            <div key={i} className="p-8 glass rounded-2xl border border-slate-800 text-center hover:border-cyan-500/30 transition-all hover:-translate-y-1">
              <stat.icon className="mx-auto text-cyan-500 mb-4" size={32} />
              <div className="text-4xl font-bold text-white mb-2">{stat.val}</div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Areas */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-10 glass border border-slate-800 rounded-3xl group transition-all hover:bg-slate-900/50">
          <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-8 group-hover:scale-110 transition-transform">
            <Cpu size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Web Engineering</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            Architecting modern, scalable, and blindingly fast web applications using React, Next.js, and Node.
          </p>
          <Link to="/skills" className="text-cyan-400 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-widest">
            Review Matrix <ChevronRight size={18} />
          </Link>
        </div>
        <div className="p-10 glass border border-slate-800 rounded-3xl group transition-all hover:bg-slate-900/50">
          <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-8 group-hover:scale-110 transition-transform">
            <Shield size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Cyber Defense</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            Implementing ironclad security protocols and intrusion detection systems to protect critical assets.
          </p>
          <Link to="/company" className="text-purple-400 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-widest">
            Company Profile <ChevronRight size={18} />
          </Link>
        </div>
        <div className="p-10 glass border border-slate-800 rounded-3xl group transition-all hover:bg-slate-900/50">
          <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-8 group-hover:scale-110 transition-transform">
            <TerminalIcon size={28} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Ethical Hacking</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            Proactive penetration testing and vulnerability assessments to identify weaknesses before they're exploited.
          </p>
          <Link to="/portfolio" className="text-green-400 font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-widest">
            View Archives <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
