
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Project } from '../types';
import { Plus, Trash2, ExternalLink, RefreshCw, Loader2, Image as ImageIcon, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [newProjectSyncing, setNewProjectSyncing] = useState(false);
  
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    category: 'Web Dev',
    link: '',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  });

  const fetchProjects = async () => {
    const data = await db.getProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Permanently redact this asset from archives?')) {
      await db.deleteProject(id);
      fetchProjects();
    }
  };

  // Logic to sync preview for an EXISTING project
  const handleSyncExisting = async (project: Project) => {
    if (!project.link || !project.link.startsWith('http')) {
      alert('Project has no valid target link to sync.');
      return;
    }

    setSyncingId(project.id);
    const screenshotUrl = `https://api.microlink.io?url=${encodeURIComponent(project.link)}&screenshot=true&embed=screenshot.url`;
    
    try {
      await db.updateProject(project.id, { imageUrl: screenshotUrl });
      await fetchProjects();
      db.addLog(`Archives synchronized for node: ${project.title}`, 'SUCCESS');
    } catch (err) {
      db.addLog('Failed to synchronize archive visual.', 'ERROR');
    } finally {
      setSyncingId(null);
    }
  };

  // Logic to sync preview for the NEW project being added
  const handleSyncNew = () => {
    if (!newProject.link || !newProject.link.startsWith('http')) {
      alert('Enter a valid URL first (e.g., https://renonx.com)');
      return;
    }
    
    setNewProjectSyncing(true);
    const screenshotUrl = `https://api.microlink.io?url=${encodeURIComponent(newProject.link)}&screenshot=true&embed=screenshot.url`;
    
    // Simulate slight delay for effect
    setTimeout(() => {
      setNewProject(prev => ({ ...prev, imageUrl: screenshotUrl }));
      setNewProjectSyncing(false);
      db.addLog('Visual recon data captured for new project.', 'SUCCESS');
    }, 1000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const project: Project = {
      ...newProject as Project,
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString().split('T')[0]
    };
    await db.addProject(project);
    await fetchProjects();
    setLoading(false);
    setIsAdding(false);
    setNewProject({
      title: '',
      description: '',
      category: 'Web Dev',
      link: '',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Secure Archives</h1>
          <p className="text-slate-400 font-mono text-sm tracking-tight uppercase">Index and manage technical deployment assets.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className={`flex items-center gap-2 px-8 py-4 ${isAdding ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-cyan-500 text-slate-950'} font-bold rounded-2xl transition-all border shadow-xl hover:scale-105 active:scale-95`}
        >
          {isAdding ? 'Abort Injection' : <><Plus size={20} /> Inject Asset</>}
        </button>
      </div>

      {isAdding && (
        <div className="glass p-8 rounded-3xl border border-cyan-500/30 animate-in slide-in-from-top-4 duration-300">
          <form onSubmit={handleAdd} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Project Identification</label>
                <input 
                  type="text" 
                  value={newProject.title}
                  onChange={e => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500 transition-all"
                  placeholder="E.g. Nexus Core Dashboard"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Protocol Type</label>
                  <select 
                    value={newProject.category}
                    onChange={e => setNewProject({...newProject, category: e.target.value as any})}
                    className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500 appearance-none"
                  >
                    <option value="Web Dev">Web Development</option>
                    <option value="Security">Cyber Security</option>
                    <option value="Pentesting">Pentesting</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Target Link</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={newProject.link}
                      onChange={e => setNewProject({...newProject, link: e.target.value})}
                      className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500 pl-10"
                      placeholder="https://..."
                    />
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Intelligence Summary</label>
                <textarea 
                  rows={4}
                  value={newProject.description}
                  onChange={e => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-white resize-none outline-none focus:border-cyan-500"
                  placeholder="System architectural details..."
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Visual Recon (Preview)</label>
                  <button 
                    type="button" 
                    onClick={handleSyncNew}
                    disabled={newProjectSyncing}
                    className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all"
                  >
                    {newProjectSyncing ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                    Sync Live Preview
                  </button>
                </div>
                
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-slate-800 bg-slate-950 flex items-center justify-center">
                   <img src={newProject.imageUrl} className={`w-full h-full object-cover transition-opacity ${newProjectSyncing ? 'opacity-20' : 'opacity-60'}`} alt="Preview" />
                   {newProjectSyncing && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <Loader2 size={32} className="text-cyan-400 animate-spin" />
                        <span className="text-[10px] font-mono text-cyan-400 animate-pulse uppercase tracking-[0.2em]">Syncing...</span>
                     </div>
                   )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading || newProjectSyncing}
                className="w-full p-5 bg-cyan-500 text-slate-950 font-black rounded-2xl transition-all hover:bg-cyan-400 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-xl shadow-cyan-500/20"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={20} /> Commit Archive Injection</>}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="glass rounded-[2rem] border border-slate-800 flex flex-col group overflow-hidden hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-2xl">
            {/* Mock Browser Header */}
            <div className="bg-slate-900/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30 group-hover:bg-red-500/60 transition-colors"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30 group-hover:bg-yellow-500/60 transition-colors"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/30 group-hover:bg-green-500/60 transition-colors"></div>
              </div>
              <div className="text-[9px] font-mono text-slate-600 group-hover:text-cyan-500/50 transition-colors truncate px-4 max-w-[150px]">
                {project.link.replace('https://', '') || 'localhost'}
              </div>
              <div className="w-8"></div>
            </div>

            <div className="relative aspect-video overflow-hidden">
              <img src={project.imageUrl} alt={project.title} className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${syncingId === project.id ? 'opacity-20 blur-sm' : 'opacity-100'}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
              <div className="absolute top-3 right-3 px-3 py-1 bg-slate-950/90 text-cyan-400 text-[9px] font-mono border border-cyan-500/20 rounded-full uppercase tracking-widest font-bold shadow-lg">
                {project.category}
              </div>
              
              {syncingId === project.id && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                   <Loader2 size={24} className="text-cyan-400 animate-spin" />
                   <span className="text-[10px] text-cyan-400 font-mono animate-pulse uppercase">Syncing...</span>
                </div>
              )}
            </div>

            <div className="p-6 flex-grow flex flex-col gap-4">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">{project.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                <div className="flex gap-2">
                  <a href={project.link} target="_blank" className="p-2 text-slate-500 hover:text-cyan-400 transition-colors bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-800">
                    <ExternalLink size={18} />
                  </a>
                  <button 
                    onClick={() => handleSyncExisting(project)}
                    disabled={syncingId !== null}
                    title="Sync Website Preview"
                    className="p-2 text-slate-500 hover:text-green-400 transition-colors bg-slate-900 rounded-xl hover:bg-slate-800 border border-slate-800 disabled:opacity-30"
                  >
                    <RefreshCw size={18} className={syncingId === project.id ? 'animate-spin' : ''} />
                  </button>
                </div>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-2 text-slate-600 hover:text-red-500 transition-colors hover:bg-red-500/10 rounded-xl"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
