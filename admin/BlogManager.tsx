
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Blog } from '../types';
import { Plus, Trash2, Edit3, Eye, Calendar, User, Search } from 'lucide-react';

const BlogManager: React.FC = () => {
  // Fix: Handle async getBlogs
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  
  const [newBlog, setNewBlog] = useState<Partial<Blog>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Zidan Mahmud',
    tags: [],
    imageUrl: 'https://picsum.photos/seed/blog/800/450'
  });

  const [tagInput, setTagInput] = useState('');

  // Fix: Initial blogs fetch
  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await db.getBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  // Fix: Handle async deleteBlog
  const handleDelete = async (id: string) => {
    await db.deleteBlog(id);
    const data = await db.getBlogs();
    setBlogs(data);
  };

  // Fix: Handle async addBlog
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const blog: Blog = {
      ...newBlog as Blog,
      id: Math.random().toString(36).substring(7),
      date: new Date().toISOString().split('T')[0]
    };
    await db.addBlog(blog);
    const data = await db.getBlogs();
    setBlogs(data);
    setIsAdding(false);
    setNewBlog({
      title: '',
      excerpt: '',
      content: '',
      author: 'Zidan Mahmud',
      tags: [],
      imageUrl: 'https://picsum.photos/seed/blog/800/450'
    });
  };

  const addTag = () => {
    if (tagInput && !newBlog.tags?.includes(tagInput)) {
      setNewBlog({...newBlog, tags: [...(newBlog.tags || []), tagInput]});
      setTagInput('');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 uppercase">Intelligence Manager</h1>
          <p className="text-slate-400">Manage publications for the Breach Log repository.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all"
        >
          {isAdding ? 'Abort' : <><Plus size={20} /> Publish Article</>}
        </button>
      </div>

      {isAdding && (
        <div className="glass p-8 rounded-2xl border border-cyan-500/30 cyan-glow">
          <form onSubmit={handleAdd} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase">Title</label>
                  <input 
                    type="text" 
                    value={newBlog.title}
                    onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                    placeholder="E.g. Zero Trust Architectures"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase">Excerpt</label>
                  <textarea 
                    rows={2}
                    value={newBlog.excerpt}
                    onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                    placeholder="Brief summary..."
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase">Tags</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-grow bg-slate-900 border border-slate-800 p-3 rounded-lg text-white"
                      placeholder="Add tag..."
                    />
                    <button type="button" onClick={addTag} className="px-4 bg-slate-800 text-white rounded-lg">+</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newBlog.tags?.map(t => (
                      <span key={t} className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] rounded uppercase border border-cyan-500/20">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-slate-400 uppercase">Article Content</label>
                  <textarea 
                    rows={8}
                    value={newBlog.content}
                    onChange={e => setNewBlog({...newBlog, content: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 p-3 rounded-lg text-white font-mono text-sm"
                    placeholder="Write article in Markdown..."
                    required
                  />
                </div>
              </div>
            </div>
            <button 
              type="submit"
              className="w-full p-4 bg-cyan-500 text-slate-950 font-bold rounded-xl mt-4"
            >
              COMMIT PUBLICATION
            </button>
          </form>
        </div>
      )}

      <div className="glass rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900/50 text-slate-500 font-mono uppercase tracking-widest border-b border-slate-800">
            <tr>
              <th className="p-4">Post Info</th>
              <th className="p-4">Author</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="p-4 max-w-md">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden shrink-0">
                      <img src={blog.imageUrl} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1 line-clamp-1">{blog.title}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <Calendar size={12} /> {blog.date}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-300">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-slate-500" />
                    {blog.author}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase border border-green-500/20">Live</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <a href={`#/blog/${blog.id}`} target="_blank" className="p-2 text-slate-500 hover:text-cyan-400 transition-colors">
                      <Eye size={18} />
                    </a>
                    <button className="p-2 text-slate-500 hover:text-purple-400 transition-colors">
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogManager;
