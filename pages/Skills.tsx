
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Terminal, Cpu, Shield, Wrench } from 'lucide-react';
import { Skill } from '../types';

const Skills: React.FC = () => {
  // Fix: Handle async getSkills
  const [skills, setSkills] = useState<Skill[]>([]);
  const categories = ['Web Dev', 'Security', 'Pentesting', 'Tools'];

  useEffect(() => {
    // Fix: Fetch skills asynchronously
    const fetchSkills = async () => {
      const data = await db.getSkills();
      setSkills(data);
    };
    fetchSkills();
  }, []);

  const getIcon = (cat: string) => {
    switch(cat) {
      case 'Web Dev': return <Cpu className="text-cyan-400" size={24} />;
      case 'Security': return <Shield className="text-purple-400" size={24} />;
      case 'Pentesting': return <Terminal className="text-green-400" size={24} />;
      case 'Tools': return <Wrench className="text-slate-400" size={24} />;
      default: return <Shield className="text-slate-400" size={24} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h2 className="text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase">Expertise Mapping</h2>
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase">The Skill Matrix</h1>
        <p className="text-slate-400 text-lg leading-relaxed">
          Comprehensive inventory of technical capabilities across development and security domains. Calibrated for maximum efficiency and robust performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div key={cat} className="p-8 glass rounded-3xl border border-slate-800 hover:border-cyan-500/20 transition-all">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-slate-900 rounded-xl">
                {getIcon(cat)}
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{cat}</h3>
            </div>
            
            <div className="space-y-8">
              {skills.filter(s => s.category === cat).map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-bold text-slate-300 font-mono tracking-tight">{skill.name}</span>
                    <span className="text-xs font-mono text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ease-out ${
                        cat === 'Web Dev' ? 'bg-cyan-500 cyan-glow' : 
                        cat === 'Security' ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
                        cat === 'Pentesting' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                        'bg-slate-500'
                      }`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
