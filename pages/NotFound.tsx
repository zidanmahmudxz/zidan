
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Terminal } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="relative">
        <ShieldAlert size={120} className="text-red-500/20 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-black text-red-500 font-mono tracking-tighter">404</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">ACCESS_DENIED</h1>
        <p className="text-slate-500 font-mono text-sm max-w-md mx-auto">
          The requested memory address is invalid or the session has been terminated by the kernel.
        </p>
      </div>

      <div className="p-4 glass rounded-xl border border-red-500/20 max-w-sm w-full font-mono text-[10px] text-red-400/60 text-left">
        <p>ERROR_CODE: 0x00000194</p>
        <p>REASON: NODE_NOT_FOUND</p>
        <p>SOURCE: {window.location.href}</p>
      </div>

      <Link to="/" className="flex items-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest text-xs">
        <ArrowLeft size={16} /> Return to Home Base
      </Link>
    </div>
  );
};

export default NotFound;
