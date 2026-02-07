
import React, { useState, useEffect } from 'react';
import { ChevronRight, Shield, ShieldCheck, Terminal as TerminalIcon, Cpu, Globe, UserCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../services/db';
import { INITIAL_SETTINGS } from '../constants';
import { Settings } from '../types';

const Home: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);
  const [typedText, setTypedText] = useState('');
  const fullText = "Scanning environment... [OK]\nInitializing security protocols... [OK]\nBypassing limitations... [SUCCESS]\nWelcome to the Nexus of Security.";

  useEffect(() => {
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
      <section className="relative px-6 pt-16 md:pt-32 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></div>
              Uplink Protocol v4.0 Active
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] text-glow">
              {settings.heroHeadline.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 0 ? '' : 'text-cyan-400'}>
                  {word}<br className="hidden md:block" />
                </span>
              ))}
            </h1>
            
            <p className="text-xl text-slate-200 max-w-xl leading-relaxed font-medium">
              {settings.heroSubheadline}
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link to="/portfolio" className="group px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,211,238,0.3)] uppercase tracking-widest text-xs">
                Explore Archives
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="px-8 py-4 glass border border-cyan-500/30 hover:border-cyan-400 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-xs hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                Initiate Contact
              </Link>
            </div>
          </div>

          <div className="relative animate-in fade-in zoom-in duration-1000">
            {/* Visual Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-cyan-500/20 blur-[150px] rounded-full -z-10 animate-pulse"></div>
            
            <div className="flex flex-col gap-8 relative z-10">
              {/* Profile Card */}
              <div className="glass p-6 rounded-[2.5rem] border border-cyan-500/30 flex items-center gap-8 relative overflow-hidden group shadow-2xl cyan-glow-border transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
                
                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-3xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <img 
                    src={settings.profileImageUrl} 
                    alt="Zidan Mahmud" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-cyan-500/10 pointer-events-none"></div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-2xl font-black text-white font-mono tracking-tighter uppercase">Zidan Mahmud</h3>
                      <UserCheck className="text-cyan-400" size={20} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
                        ROOT_ETHICAL_HACKER
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-[0.2em]">
                        ACCESS_LVL: 04_ADMIN
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-[9px] font-mono text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/30 font-bold tracking-widest shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                      CONNECTED
                    </span>
                  </div>
                </div>
              </div>

              {/* Terminal */}
              <div className="relative w-full glass rounded-[2rem] overflow-hidden border border-cyan-500/20 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] hover:border-cyan-500/40 transition-all">
                <div className="bg-slate-900/90 px-6 py-4 border-b border-cyan-500/10 flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                  </div>
                  <div className="text-[9px] text-cyan-400 font-mono font-bold tracking-[0.3em] uppercase">SYSTEM_CORE_SHELL</div>
                  <div className="w-10"></div>
                </div>
                <div className="p-8 font-mono text-xs md:text-sm h-52 overflow-y-auto bg-slate-950/60 scrollbar-thin scrollbar-thumb-cyan-500/20">
                  <div className="text-cyan-400 mb-3 font-bold">root@renonx:~# <span className="text-white font-medium">./initialize_interface.sh</span></div>
                  <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {typedText}
                    <span className="w-2.5 h-4.5 bg-cyan-400 inline-block align-middle ml-2 animate-pulse shadow-[0_0_10px_#22d3ee]"></span>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            { label: 'Threats Neutralized', val: '400+', icon: Shield, color: 'text-cyan-400' },
            { label: 'Global Nodes', val: '24', icon: Globe, color: 'text-purple-400' },
            { label: 'Active Modules', val: '15', icon: Cpu, color: 'text-green-400' },
            { label: 'Secure Protocols', val: '500k', icon: TerminalIcon, color: 'text-yellow-400' },
          ].map((stat, i) => (
            <div key={i} className="group p-10 glass rounded-[2rem] border border-slate-800 text-center hover:border-cyan-500/40 transition-all hover:-translate-y-2 shadow-xl cyan-glow-border">
              <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-slate-900 shadow-inner group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon size={32} />
              </div>
              <div className="text-5xl font-black text-white mb-2 tracking-tighter text-glow">{stat.val}</div>
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {[
          { title: "Web Engineering", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "hover:border-cyan-500/40", desc: "Architecting modern, scalable, and blindingly fast web applications using React 19 and robust backends." },
          { title: "Cyber Defense", icon: Shield, color: "text-purple-400", bg: "bg-purple-500/10", border: "hover:border-purple-500/40", desc: "Implementing ironclad security protocols and intrusion detection systems to protect mission-critical assets." },
          { title: "Ethical Hacking", icon: TerminalIcon, color: "text-green-400", bg: "bg-green-500/10", border: "hover:border-green-500/40", desc: "Proactive penetration testing to identify and patch system vulnerabilities before they are exploited." },
        ].map((area, i) => (
          <div key={i} className="p-12 glass border border-slate-800 rounded-[3rem] group transition-all hover:bg-slate-900/40 cyan-glow-border shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 ${area.bg} blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`w-14 h-14 ${area.bg} rounded-2xl flex items-center justify-center ${area.color} mb-10 group-hover:scale-110 transition-transform shadow-lg`}>
              <area.icon size={28} />
            </div>
            <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">{area.title}</h3>
            <p className="text-slate-300 leading-relaxed mb-10 text-lg">
              {area.desc}
            </p>
            <Link to="/contact" className={`${area.color} font-black flex items-center gap-2 hover:gap-4 transition-all text-[10px] uppercase tracking-[0.2em] group-hover:text-white`}>
              Inquire Strategy <ChevronRight size={16} />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
