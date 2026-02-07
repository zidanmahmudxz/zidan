
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Lock } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: 'Intelligence', path: '/about' },
    { label: 'Matrix', path: '/skills' },
    { label: 'RenonX', path: '/company' },
    { label: 'Archives', path: '/portfolio' },
    { label: 'Breach Log', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className={`w-8 h-8 text-cyan-400 transition-transform group-hover:scale-110 ${scrolled ? 'scale-90' : ''}`} />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-white font-mono leading-none">RENON<span className="text-cyan-400">X</span></span>
            <span className="text-[10px] text-cyan-500/60 font-mono font-bold tracking-[0.2em]">SECURE_PROTOCOL</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-cyan-400 ${
                location.pathname === link.path ? 'text-cyan-400 cyan-text-glow' : 'text-slate-400'
              }`}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
          <Link 
            to="/login" 
            className="flex items-center gap-2 px-4 py-2 border border-cyan-500/30 rounded-full text-xs font-bold text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition-all"
          >
            <Lock size={14} />
            CMD CENTER
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-6">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-slate-300 hover:text-cyan-400"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 font-bold"
            >
              <Lock size={18} />
              COMMAND CENTER
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
