
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { ExternalLink, Github, Search, Filter, Shield, Terminal, Layout, Monitor } from 'lucide-react';
import { Project } from '../types';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'Web Dev' | 'Security' | 'Pentesting'>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await db.getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16 relative z-10">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase animate-pulse">Asset Retrieval Protocol</h2>
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter text-glow">SECURE ARCHIVES</h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Decrypting high-performance web applications and impenetrable security infrastructure developed for the digital frontier.
        </p>
      </div>

      {/* Filter Matrix */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {[
          { id: 'all', label: 'All Protocols', icon: Search },
          { id: 'Web Dev', label: 'Web Systems', icon: Layout },
          { id: 'Security', label: 'Cyber Defense', icon: Shield },
          { id: 'Pentesting', label: 'Infiltration', icon: Terminal },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as any)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all active:scale-95 ${
              filter === item.id 
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                : 'bg-slate-900/40 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
            }`}
          >
            <item.icon size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Project Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((project, i) => (
          <div 
            key={project.id} 
            className="group flex flex-col animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Browser Wrapper */}
            <div className="glass border border-slate-800 rounded-[2rem] overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-2 shadow-2xl flex flex-col h-full bg-slate-950/40">
              
              {/* Browser Header */}
              <div className="bg-slate-900/90 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-full border border-slate-800 max-w-[140px] md:max-w-[180px]">
                  <Monitor size={10} className="text-slate-600" />
                  <span className="text-[9px] font-mono text-slate-500 truncate lowercase">{project.link.replace('https://', '') || 'local_node'}</span>
                </div>
                <div className="w-6 h-6 flex items-center justify-center text-slate-700 group-hover:text-cyan-500/50 transition-colors">
                  <ExternalLink size={12} />
                </div>
              </div>

              {/* Viewport */}
              <div className="relative aspect-video overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Protocol Badge */}
                <div className="absolute bottom-4 left-5 flex gap-2">
                  <span className="px-3 py-1 bg-cyan-500 text-slate-950 text-[9px] font-black rounded-lg uppercase tracking-widest shadow-xl">
                    {project.category}
                  </span>
                </div>
              </div>
              
              {/* Data Panel */}
              <div className="p-8 space-y-5 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">{project.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 font-medium">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-800/60">
                  <div className="flex gap-2">
                    <a href={project.link} target="_blank" className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all shadow-inner">
                      <ExternalLink size={18} />
                    </a>
                    {project.github && (
                       <a href={project.github} target="_blank" className="p-3 bg-slate-900 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-all shadow-inner">
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-mono text-slate-600 font-bold uppercase tracking-[0.2em]">Deployment Date</span>
                    <span className="text-[11px] font-mono text-cyan-500/80 font-bold">{project.date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-32 space-y-6">
          <Terminal size={64} className="text-slate-800 mx-auto animate-pulse" />
          <p className="text-slate-500 font-mono text-lg uppercase tracking-[0.4em] italic">Search returned no matching archives...</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
