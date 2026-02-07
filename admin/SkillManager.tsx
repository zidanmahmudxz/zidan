
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Skill } from '../types';
import { Plus, Trash2, Cpu, Shield, Terminal, Settings } from 'lucide-react';

const SkillManager: React.FC = () => {
  // Fix: Handle async getSkills
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: '',
    level: 80,
    category: 'Web Dev'
  });

  // Fix: Initial skills fetch
  useEffect(() => {
    const fetchSkills = async () => {
      const data = await db.getSkills();
      setSkills(data);
    };
    fetchSkills();
  }, []);

  // Fix: Handle async deleteSkill
  const handleDelete = async (id: string) => {
    // Corrected to use db.deleteSkill as db.updateSkills does not exist
    await db.deleteSkill(id);
    const data = await db.getSkills();
    setSkills(data);
  };

  // Fix: Handle async addSkill
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const skill: Skill = {
      ...newSkill as Skill,
      id: Math.random().toString(36).substring(7)
    };
    await db.addSkill(skill);
    const data = await db.getSkills();
    setSkills(data);
    setIsAdding(false);
    setNewSkill({ name: '', level: 80, category: 'Web Dev' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 uppercase">Expertise Matrix</h1>
          <p className="text-slate-400">Calibrate technical capabilities and security proficiency levels.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all"
        >
          {isAdding ? 'Abort' : <><Plus size={20} /> New Protocol</>}
        </button>
      </div>

      {isAdding && (
        <div className="glass p-8 rounded-2xl border border-cyan-500/30 cyan-glow max-w-2xl mx-auto">
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase">Skill Name</label>
              <input 
                type="text" 
                value={newSkill.name}
                onChange={e => setNewSkill({...newSkill, name: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                placeholder="E.g. Rust / WebAssembly"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase">Category</label>
                <select 
                  value={newSkill.category}
                  onChange={e => setNewSkill({...newSkill, category: e.target.value as any})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                >
                  <option value="Web Dev">Web Dev</option>
                  <option value="Security">Security</option>
                  <option value="Pentesting">Pentesting</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase">Level ({newSkill.level}%)</label>
                <input 
                  type="range" 
                  min="0" max="100"
                  value={newSkill.level}
                  onChange={e => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                  className="w-full h-10 accent-cyan-500"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full p-4 bg-cyan-500 text-slate-950 font-bold rounded-xl"
            >
              INITIALIZE SKILL
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {['Web Dev', 'Security', 'Pentesting', 'Tools'].map(cat => (
          <div key={cat} className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-[0.2em] px-2">{cat}</h3>
            <div className="space-y-2">
              {skills.filter(s => s.category === cat).map(skill => (
                <div key={skill.id} className="glass p-4 rounded-xl border border-slate-800 flex items-center justify-between group">
                  <div>
                    <div className="text-sm font-bold text-white">{skill.name}</div>
                    <div className="text-[10px] text-cyan-500 font-mono">{skill.level}% Optimized</div>
                  </div>
                  <button 
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 text-slate-700 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
