
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Linkedin, Twitter, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-cyan-400 w-10 h-10" />
              <span className="text-2xl font-bold tracking-tighter text-white font-mono">RENON<span className="text-cyan-400">X</span></span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6 leading-relaxed">
              Leading the digital frontier through ethical exploitation and ironclad development. Securing the world, one line of code at a time.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-900 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
              <Terminal size={18} className="text-cyan-400" />
              Navigation
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">Intelligence Brief</Link></li>
              <li><Link to="/skills" className="hover:text-cyan-400 transition-colors">Expertise Matrix</Link></li>
              <li><Link to="/portfolio" className="hover:text-cyan-400 transition-colors">Secure Archives</Link></li>
              <li><Link to="/blog" className="hover:text-cyan-400 transition-colors">The Breach Log</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">System Status</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                <span className="text-[11px] text-slate-300 font-mono tracking-widest uppercase">Kernel: OPERATIONAL</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>
                <span className="text-[11px] text-slate-300 font-mono tracking-widest uppercase">Firewall: ACTIVE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
                <span className="text-[11px] text-slate-300 font-mono tracking-widest uppercase">Payload: ENCRYPTED</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          <p>© 2024 RENONX SECURITY CORP. ROOT_ACCESS_GRNTD.</p>
          <div className="flex gap-6">
            <Link to="/legal" className="hover:text-white transition-colors">Privacy Protocol</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Terms of Engagement</Link>
            <Link to="/legal" className="hover:text-white transition-colors">Legal Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
