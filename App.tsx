
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, useLocation, Outlet } from 'react-router-dom';
import { Shield, LayoutDashboard, Terminal, Briefcase, User, BookOpen, Mail, Settings, LogOut, ShieldAlert } from 'lucide-react';
import { db } from './services/db';
import { User as UserType } from './types';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Company from './pages/Company';
import Portfolio from './pages/Portfolio';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';

// Admin Pages
import Login from './admin/Login';
import Dashboard from './admin/Dashboard';
import BlogManager from './admin/BlogManager';
import ProjectManager from './admin/ProjectManager';
import SkillManager from './admin/SkillManager';
import ContentManager from './admin/ContentManager';

const App: React.FC = () => {
  useEffect(() => {
    db.init();
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-400">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/skills" element={<Layout><Skills /></Layout>} />
          <Route path="/company" element={<Layout><Company /></Layout>} />
          <Route path="/portfolio" element={<Layout><Portfolio /></Layout>} />
          <Route path="/blog" element={<Layout><BlogList /></Layout>} />
          <Route path="/blog/:id" element={<Layout><BlogDetail /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/legal" element={<Layout><Legal /></Layout>} />
          
          {/* Admin Routes */}
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="blogs" element={<BlogManager />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="skills" element={<SkillManager />} />
            <Route path="content" element={<ContentManager />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </div>
    </HashRouter>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-20 cyber-grid min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

const AdminLayout: React.FC = () => {
  const [user] = useState<UserType | null>(db.getUser());
  const location = useLocation();

  const handleLogout = () => {
    db.logout();
    const targetUrl = window.location.origin + window.location.pathname + '#/';
    window.location.href = targetUrl;
    window.location.reload(); 
  };

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { label: 'Blogs', icon: BookOpen, path: '/admin/blogs' },
    { label: 'Projects', icon: Briefcase, path: '/admin/projects' },
    { label: 'Skills', icon: Terminal, path: '/admin/skills' },
    { label: 'Settings', icon: Settings, path: '/admin/content' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 hidden md:flex flex-col glass fixed h-full z-40">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <Shield className="text-cyan-400 w-8 h-8" />
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-white uppercase font-mono text-glow">Kernel</span>
            <span className="text-[10px] text-cyan-500/50 font-mono font-bold tracking-widest leading-none">ROOT_ACCESS</span>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 mb-4 bg-slate-900/50 rounded-xl border border-slate-800">
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-xs font-bold text-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              ZM
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest">Level 4</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition-colors font-mono text-xs uppercase tracking-widest group"
          >
            <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
            SHUTDOWN_SESSION
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow md:ml-64 p-4 md:p-8 min-h-screen bg-slate-950 cyber-grid overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
