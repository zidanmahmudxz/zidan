
import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { db } from '../services/db';
import { ChevronLeft, Calendar, User, Share2, Bookmark, Loader2 } from 'lucide-react';
import { Blog } from '../types';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const blogs = await db.getBlogs();
      const found = blogs.find(b => b.id === id);
      setBlog(found || null);
      setLoading(false);
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
        <p className="text-cyan-500 font-mono text-xs tracking-[0.3em] uppercase">Decrypting Intelligence...</p>
      </div>
    );
  }

  if (!blog) return <Navigate to="/blog" />;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors uppercase font-mono text-sm tracking-widest group">
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Log Archives
      </Link>

      <header className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono border border-cyan-500/20 rounded-full uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter">
          {blog.title}
        </h1>
        <div className="flex items-center justify-between py-6 border-y border-slate-800">
          <div className="flex items-center gap-8">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold border border-cyan-500/30">ZM</div>
               <div>
                 <div className="text-sm font-bold text-white uppercase tracking-tight">{blog.author}</div>
                 <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Lead Security Analyst</div>
               </div>
             </div>
             <div className="hidden sm:block">
               <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Status: DECRYPTED</div>
               <div className="text-sm text-slate-300 flex items-center gap-2">
                 <Calendar size={14} className="text-cyan-400" /> {blog.date}
               </div>
             </div>
          </div>
          <div className="flex gap-3">
            <button className="p-3 glass rounded-xl text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800">
              <Share2 size={18} />
            </button>
            <button className="p-3 glass rounded-xl text-slate-400 hover:text-cyan-400 transition-colors border border-slate-800">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-800 animate-in zoom-in duration-700">
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none"></div>
      </div>

      <article className="max-w-none animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="p-8 glass rounded-3xl border border-slate-800 mb-10">
          <p className="text-xl text-cyan-100 font-medium leading-relaxed italic border-l-4 border-cyan-500 pl-6">
            {blog.excerpt}
          </p>
        </div>
        
        <div className="text-slate-300 text-lg leading-relaxed space-y-8 font-sans">
          <div className="whitespace-pre-wrap">
            {blog.content}
          </div>
          
          <div className="space-y-4 pt-10">
             <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Technical Analysis</h3>
             <p>
               In modern digital infrastructure, the perimeter is no longer a static line. It is a fluid boundary defined by authentication, encryption, and real-time behavioral analysis. Our research indicates that 84% of breaches could be mitigated through the implementation of strict Zero-Trust protocols and identity-aware proxies.
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-2">
                   <h4 className="font-bold text-white text-sm uppercase">Key Vulnerability</h4>
                   <p className="text-sm text-slate-400">Legacy VPN structures and hard-coded credentials in server-side scripts.</p>
                </div>
                <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-2">
                   <h4 className="font-bold text-white text-sm uppercase">Recommended Patch</h4>
                   <p className="text-sm text-slate-400">Rotational API keys and multi-factor hardware-based authentication.</p>
                </div>
             </div>
          </div>
        </div>
      </article>

      <footer className="pt-20 border-t border-slate-800">
        <div className="glass p-12 rounded-[2.5rem] text-center space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 group-hover:opacity-100 transition-opacity"></div>
          <div className="space-y-4">
            <h4 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">Join the Intelligence Network</h4>
            <p className="text-slate-400 max-w-md mx-auto">Receive encrypted field reports and security patches directly to your node.</p>
          </div>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <input 
              type="email" 
              placeholder="agent@network.com" 
              className="flex-grow bg-slate-900 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:border-cyan-500 transition-colors font-mono" 
            />
            <button className="bg-cyan-500 px-10 py-4 text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest text-sm">
              Authorize
            </button>
          </div>
          <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em]">Secure Transmission Protocol v4.2.0</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetail;
