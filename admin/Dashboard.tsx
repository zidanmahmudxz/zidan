
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { SystemLog, Blog, Project, Skill } from '../types';
import { Shield, BookOpen, Briefcase, Terminal, Activity, CheckCircle, AlertCircle, Plus, Loader2, ArrowUpRight } from 'lucide-react';
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
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        <p className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase animate-pulse">Establishing Secure Uplink...</p>
      </div>
    );
  }

  const stats = [
    { label: 'Intelligence Posts', count: data.blogs.length, icon: BookOpen, color: 'text-cyan-400', path: '/admin/blogs' },
    { label: 'Secure Archives', count: data.projects.length, icon: Briefcase, color: 'text-purple-400', path: '/admin/projects' },
    { label: 'Skill Matrix', count: data.skills.length, icon: Terminal, color: 'text-green-400', path: '/admin/skills' },
    { label: 'System Uptime', count: '99.9%', icon: Shield, color: 'text-blue-400', path: '/admin/content' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 uppercase tracking-tighter flex items-center gap-3">
            <Shield className="text-cyan-400" />
            CMD_DASHBOARD
          </h1>
          <p className="text-slate-400 text-sm font-mono tracking-tight uppercase">Security Clearance: LEVEL_04_ADMIN_ROOT</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xs font-mono font-bold text-slate-500 hover:text-cyan-400 transition-colors flex items-center gap-1 uppercase tracking-widest">
            Surface Site <ArrowUpRight size={14} />
          </Link>
          <div className="text-right px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg">
            <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Local Session Time</p>
            <p className="text-sm font-mono text-cyan-400">{new Date().toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.path} className="group glass p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 bg-slate-900 rounded-xl ${stat.color} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <span className="text-[9px] font-mono text-green-500/80 bg-green-500/5 px-2 py-0.5 rounded-full border border-green-500/10">ACTIVE</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1 font-mono tracking-tighter">{stat.count}</div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2 tracking-[0.2em] uppercase">
              <Activity className="text-cyan-400" size={16} />
              SYSTEM_EVENT_LOGS
            </h3>
            <span className="text-[10px] text-slate-600 font-mono font-bold">NODE_IDX: 724-AX</span>
          </div>
          <div className="glass rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            <div className="max-h-[450px] overflow-y-auto font-mono text-[11px] scrollbar-thin scrollbar-thumb-cyan-500">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-slate-900 text-slate-500 uppercase tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Level</th>
                    <th className="p-4">Event Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="p-10 text-center text-slate-600 italic">No events recorded in current cycle...</td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-cyan-500/[0.02] transition-colors">
                        <td className="p-4 text-slate-500 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                            log.level === 'SUCCESS' ? 'bg-green-500/5 text-green-400 border-green-500/20' :
                            log.level === 'ERROR' ? 'bg-red-500/5 text-red-400 border-red-500/20' :
                            log.level === 'WARN' ? 'bg-yellow-500/5 text-yellow-400 border-yellow-500/20' :
                            'bg-cyan-500/5 text-cyan-400 border-cyan-500/20'
                          }`}>
                            {log.level}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300 font-medium">{log.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-slate-800 bg-cyan-500/[0.02]">
            <h3 className="text-xs font-mono font-bold text-white mb-6 tracking-widest uppercase flex items-center gap-2">
              <Activity size={14} className="text-cyan-400" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link to="/admin/blogs" className="w-full flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500 transition-all group">
                <div className="flex items-center gap-3">
                  <Plus size={16} className="text-cyan-400" />
                  <span className="text-xs font-mono text-slate-300 group-hover:text-white uppercase">New Article</span>
                </div>
                <ArrowUpRight size={14} className="text-slate-600 group-hover:text-cyan-400" />
              </Link>
              <Link to="/admin/projects" className="w-full flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-purple-500 transition-all group">
                <div className="flex items-center gap-3">
                  <Briefcase size={16} className="text-purple-400" />
                  <span className="text-xs font-mono text-slate-300 group-hover:text-white uppercase">Inject Project</span>
                </div>
                <ArrowUpRight size={14} className="text-slate-600 group-hover:text-purple-400" />
              </Link>
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-mono font-bold text-white mb-6 tracking-widest uppercase">System Metrics</h3>
            <div className="space-y-5">
              {[
                { label: 'CPU_KERNEL_LOAD', val: '14%', color: 'bg-cyan-500' },
                { label: 'MEMORY_USAGE', val: '42%', color: 'bg-purple-500' },
                { label: 'THREAT_MITIGATION', val: '100%', color: 'bg-green-500' }
              ].map((res, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span className="font-bold">{res.label}</span>
                    <span className="text-white">{res.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${res.color} transition-all duration-1000 shadow-[0_0_8px_rgba(34,211,238,0.3)]`} style={{ width: res.val }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 glass rounded-2xl border border-red-500/10 flex items-start gap-4">
             <div className="p-2 bg-red-500/10 rounded-lg text-red-400">
               <AlertCircle size={20} />
             </div>
             <div>
               <h4 className="text-xs font-bold text-white uppercase mb-1">Security Alert</h4>
               <p className="text-[10px] text-slate-500 leading-relaxed font-mono">Kernel version 6.2.0 is available for deployment. Patching required.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
