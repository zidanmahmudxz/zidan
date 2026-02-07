
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { SystemLog, Blog, Project, Skill } from '../types';
import { Shield, BookOpen, Briefcase, Terminal, Activity, CheckCircle, AlertCircle, Plus, Loader2, ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>(db.getLogs());
  const [data, setData] = useState<{blogs: Blog[], projects: Project[], skills: Skill[]}>({ blogs: [], projects: [], skills: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await db.getBlogs();
      const projects = await db.getProjects();
      const skills = await db.getSkills();
      setData({ blogs, projects, skills });
      setLoading(false);
    };
    fetchData();

    const interval = setInterval(() => {
      setLogs(db.getLogs());
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
          <Shield className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400" size={24} />
        </div>
        <div className="space-y-2 text-center">
          <p className="text-cyan-500 font-mono text-xs tracking-[0.4em] uppercase animate-pulse">Establishing Secure Uplink</p>
          <p className="text-slate-600 font-mono text-[10px]">AUTH_TOKEN: 0x7F...9A2</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Intelligence Posts', count: data.blogs.length, icon: BookOpen, color: 'text-cyan-400', path: '/admin/blogs' },
    { label: 'Secure Archives', count: data.projects.length, icon: Briefcase, color: 'text-purple-400', path: '/admin/projects' },
    { label: 'Expertise Matrix', count: data.skills.length, icon: Terminal, color: 'text-green-400', path: '/admin/skills' },
    { label: 'System Uptime', count: '99.9%', icon: Zap, color: 'text-yellow-400', path: '/admin/content' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-900 pb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-tighter flex items-center gap-3">
            <Shield className="text-cyan-400" />
            CMD_DASHBOARD
          </h1>
          <div className="flex items-center gap-4">
             <span className="text-slate-500 text-[10px] font-mono tracking-tight uppercase">Security Clearance: <span className="text-green-500">LEVEL_04_ROOT</span></span>
             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" target="_blank" className="px-4 py-2 glass border border-slate-800 rounded-xl text-[10px] font-mono font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all flex items-center gap-2 uppercase tracking-widest">
            Surface View <ArrowUpRight size={14} />
          </Link>
          <div className="text-right px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-xl">
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">Session Local</p>
            <p className="text-xs font-mono text-cyan-400">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.path} className="group glass p-6 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 bg-slate-900 rounded-2xl ${stat.color} shadow-xl shadow-black/40 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-mono text-green-500/80 bg-green-500/5 px-2 py-0.5 rounded-full border border-green-500/10 mb-1">LIVE</span>
                <span className="text-[8px] font-mono text-slate-700">0x{Math.floor(Math.random()*1000)}</span>
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-1 font-mono tracking-tighter">{stat.count}</div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-mono font-bold text-white flex items-center gap-2 tracking-[0.3em] uppercase">
              <Activity className="text-cyan-400" size={14} />
              KERNEL_EVENT_STREAM
            </h3>
            <span className="text-[10px] text-slate-600 font-mono font-bold">NODE_ID: 0x724-AX</span>
          </div>
          <div className="glass rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="max-h-[500px] overflow-y-auto font-mono text-[11px] scrollbar-thin scrollbar-thumb-cyan-500">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-slate-900/90 backdrop-blur-md text-slate-500 uppercase tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="p-5 font-bold">Timestamp</th>
                    <th className="p-5 font-bold">Protocol</th>
                    <th className="p-5 font-bold">Data Payload</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-20 text-center text-slate-600 italic uppercase tracking-widest">No intelligence gathered in current session...</td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-cyan-500/[0.03] transition-colors group">
                        <td className="p-5 text-slate-500 whitespace-nowrap group-hover:text-slate-300 transition-colors">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-5">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold border ${
                            log.level === 'SUCCESS' ? 'bg-green-500/5 text-green-400 border-green-500/20' :
                            log.level === 'ERROR' ? 'bg-red-500/5 text-red-400 border-red-500/20' :
                            log.level === 'WARN' ? 'bg-yellow-500/5 text-yellow-400 border-yellow-500/20' :
                            'bg-cyan-500/5 text-cyan-400 border-cyan-500/20'
                          }`}>
                            {log.level}
                          </span>
                        </td>
                        <td className="p-5 text-slate-400 font-medium group-hover:text-white transition-colors">{log.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-slate-800 bg-cyan-500/[0.02] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Shield size={80} />
            </div>
            <h3 className="text-xs font-mono font-bold text-white mb-8 tracking-widest uppercase flex items-center gap-2">
              <Plus size={14} className="text-cyan-400" />
              Quick Injection
            </h3>
            <div className="space-y-3">
              <Link to="/admin/blogs" className="w-full flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-cyan-500 transition-all group/btn">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover/btn:bg-cyan-500 group-hover/btn:text-slate-950 transition-all">
                    <BookOpen size={16} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover/btn:text-white uppercase font-bold tracking-widest">Publish Blog</span>
                </div>
                <ArrowUpRight size={14} className="text-slate-600 group-hover/btn:text-cyan-400" />
              </Link>
              <Link to="/admin/projects" className="w-full flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-purple-500 transition-all group/btn">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400 group-hover/btn:bg-purple-500 group-hover/btn:text-slate-950 transition-all">
                    <Briefcase size={16} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 group-hover/btn:text-white uppercase font-bold tracking-widest">Inject Project</span>
                </div>
                <ArrowUpRight size={14} className="text-slate-600 group-hover/btn:text-purple-400" />
              </Link>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-slate-800">
            <h3 className="text-xs font-mono font-bold text-white mb-8 tracking-widest uppercase">Kernel Resources</h3>
            <div className="space-y-6">
              {[
                { label: 'CPU_IDLE_THREAD', val: '92%', color: 'bg-green-500' },
                { label: 'BUFFER_CACHE', val: '42%', color: 'bg-purple-500' },
                { label: 'THREAT_WALL', val: '100%', color: 'bg-cyan-500' }
              ].map((res, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span className="font-bold tracking-widest">{res.label}</span>
                    <span className="text-white">{res.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className={`h-full ${res.color} transition-all duration-1000 shadow-[0_0_10px_rgba(34,211,238,0.4)]`} style={{ width: res.val }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 glass rounded-3xl border border-red-500/10 flex items-start gap-5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1 h-full bg-red-500/20"></div>
             <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
               <AlertCircle size={24} />
             </div>
             <div>
               <h4 className="text-xs font-bold text-white uppercase mb-2 tracking-widest">Security Advisory</h4>
               <p className="text-[10px] text-slate-500 leading-relaxed font-mono">Kernel core update 7.4.1 detected. Deployment recommended to maintain high-level encryption standards.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
