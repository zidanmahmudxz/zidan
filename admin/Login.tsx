
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { db } from '../services/db';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate system verification
    setTimeout(() => {
      const user = db.login(email, password);
      if (user) {
        navigate('/admin', { replace: true });
      } else {
        setError('ACCESS DENIED: Credentials Invalid.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 cyber-grid flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full -z-10"></div>

      <div className="w-full max-w-md">
        {/* Return to Home Header Button */}
        <button 
          onClick={() => navigate('/')}
          className="group mb-8 flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-all font-mono text-sm uppercase tracking-widest"
        >
          <div className="p-2 glass rounded-lg group-hover:bg-cyan-500/10 border border-slate-800 group-hover:border-cyan-500/30 transition-all">
            <ArrowLeft size={16} />
          </div>
          Return to Surface
        </button>

        <div className="text-center mb-10">
          <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl font-bold text-white font-mono uppercase tracking-tighter">CMD Center Access</h1>
          <p className="text-slate-500 mt-2 font-mono text-xs tracking-widest">LAYER 7 SECURITY PROTOCOL</p>
        </div>

        <div className="glass p-8 rounded-3xl border border-slate-800 cyan-glow relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-950/30 border border-red-500/30 text-red-400 text-sm rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Identity</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@renonx.com"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none p-4 pl-12 rounded-xl text-white transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Passkey</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none p-4 pl-12 rounded-xl text-white transition-all font-mono text-sm"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full p-4 ${loading ? 'bg-slate-800 cursor-wait' : 'bg-cyan-500 hover:bg-cyan-400'} text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest flex items-center justify-center gap-2`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Authorize Session</>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
           <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-cyan-400 uppercase tracking-[0.2em] transition-colors">
             <Home size={14} />
             System Dashboard Homepage
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
