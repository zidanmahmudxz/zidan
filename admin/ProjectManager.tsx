
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Project } from '../types';
import { Plus, Trash2, ExternalLink, Globe, Briefcase } from 'lucide-react';

const ProjectManager: React.FC = () => {
  // Fix: Handle async getProjects
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: 'Web Dev',
    link: '#',
    imageUrl: 'https://picsum.photos/seed/renonx/800/450'
  });

  // Fix: Initial projects fetch
  useEffect(() => {
    const fetchProjects = async () => {
      const data = await db.getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // Fix: Handle async deleteProject
  const handleDelete = async (id: string) => {
    await db.deleteProject(id);
    const data = await db.getProjects();
    setProjects(data);
  };

  // Fix: Handle async addProject
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const project: Project = {
      ...newProject as Project,
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString().split('T')[0]
    };
    await db.addProject(project);
    const data = await db.getProjects();
    setProjects(data);
    setIsAdding(false);
    setNewProject({
      title: '',
      description: '',
      category: 'Web Dev',
      link: '#',
      imageUrl: 'https://picsum.photos/seed/renonx/800/450'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 uppercase">Secure Archives</h1>
          <p className="text-slate-400">Manage the technical assets and projects in the kernel.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all"
        >
          {isAdding ? 'Abort' : <><Plus size={20} /> Inject Asset</>}
        </button>
      </div>

      {isAdding && (
        <div className="glass p-8 rounded-2xl border border-cyan-500/30 cyan-glow">
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase">Title</label>
                <input 
                  type="text" 
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                  placeholder="E.g. Nexus Firewall"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase">Category</label>
                <select 
                  value={newProject.category}
                  onChange={e => setNewProject({...newProject, category: e.target.value as any})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                >
                  <option value="Web Dev">Web Development</option>
                  <option value="Security">Cyber Security</option>
                  <option value="Pentesting">Pentesting</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase">URL / Link</label>
                <input 
                  type="text" 
                  value={newProject.link}
                  onChange={e => setNewProject({...newProject, link: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase">Description</label>
                <textarea 
                  rows={4}
                  value={newProject.description}
                  onChange={e => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                  placeholder="System details..."
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full p-4 bg-cyan-500 text-slate-950 font-bold rounded-xl mt-4"
              >
                COMMIT INJECTION
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass p-5 rounded-2xl border border-slate-800 flex flex-col group">
            <div className="relative h-48 rounded-xl overflow-hidden mb-4">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-3 left-3 px-3 py-1 bg-slate-900/90 text-cyan-400 text-[10px] font-mono border border-cyan-500/20 rounded-full">
                {project.category.toUpperCase()}
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-2">{project.description}</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <a href={project.link} className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={18} />
                </a>
              </div>
              <button 
                onClick={() => handleDelete(project.id)}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
