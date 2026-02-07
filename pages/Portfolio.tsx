
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { ExternalLink, Github, Search, Filter, Shield, Terminal, Layout } from 'lucide-react';
import { Project } from '../types';

const Portfolio: React.FC = () => {
  // Fix: Handle async getProjects
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<'all' | 'Web Dev' | 'Security' | 'Pentesting'>('all');

  useEffect(() => {
    // Fix: Fetch projects asynchronously
    const fetchProjects = async () => {
      const data = await db.getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase">Asset Retrieval</h2>
        <h1 className="text-4xl md:text-6xl font-bold text-white">SECURE ARCHIVES</h1>
        <p className="text-slate-400">
          Decrypting my portfolio of high-end web applications and security infrastructure projects.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {[
          { id: 'all', label: 'All Protocols', icon: Search },
          { id: 'Web Dev', label: 'Web Dev', icon: Layout },
          { id: 'Security', label: 'Security', icon: Shield },
          { id: 'Pentesting', label: 'Pentesting', icon: Terminal },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
              filter === item.id 
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]' 
                : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <item.icon size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((project, i) => (
          <div 
            key={project.id} 
            className="group glass border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-2 animate-in fade-in zoom-in duration-500"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative h-56 overflow-hidden">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[50%] group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 bg-slate-950/90 border border-slate-700 text-[10px] font-mono font-bold text-cyan-400 rounded-full">
                  {project.category.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
              
              <div className="pt-6 flex items-center justify-between border-t border-slate-800">
                <div className="flex gap-4">
                  <a href={project.link} className="text-slate-500 hover:text-cyan-400 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                  <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors">
                    <Github size={20} />
                  </a>
                </div>
                <div className="text-[10px] font-mono text-slate-600 font-bold uppercase tracking-widest">
                  DECRYPTED: {project.date}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-mono text-lg italic">Search returned no matching archives...</p>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
