
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Blog } from '../types';

const BlogList: React.FC = () => {
  // Fix: Handle async getBlogs
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Fix: Fetch blogs asynchronously
    const fetchBlogs = async () => {
      const data = await db.getBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase">Intelligence Stream</h2>
        <h1 className="text-4xl md:text-6xl font-bold text-white">THE BREACH LOG</h1>
        <p className="text-slate-400">
          Deep dives into security protocols, vulnerability research, and modern development paradigms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogs.map((blog, i) => (
          <article 
            key={blog.id} 
            className="group glass border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-cyan-500/40 transition-all animate-in fade-in slide-in-from-bottom duration-500"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="h-64 overflow-hidden relative">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-900/90 text-cyan-400 text-[10px] font-mono border border-cyan-500/20 rounded-full flex items-center gap-1 uppercase">
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-10 space-y-6 flex-grow flex flex-col">
              <div className="flex items-center gap-6 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-2 uppercase tracking-widest"><User size={14} /> {blog.author}</div>
                <div className="flex items-center gap-2 uppercase tracking-widest"><Calendar size={14} /> {blog.date}</div>
              </div>
              
              <h3 className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">
                {blog.title}
              </h3>
              
              <p className="text-slate-400 leading-relaxed line-clamp-3 mb-6">
                {blog.excerpt}
              </p>
              
              <div className="mt-auto">
                <Link 
                  to={`/blog/${blog.id}`} 
                  className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all"
                >
                  Decrypt Full Article <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
