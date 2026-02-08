
import React, { useState, useEffect } from 'react';
import { fetchBloggerPosts, checkDomainStatus } from '../services/blogger.ts';
import { Post } from '../types.ts';

interface BloggerImporterProps {
  onImported: (posts: Post[]) => void;
}

const BloggerImporter: React.FC<BloggerImporterProps> = ({ onImported }) => {
  const [loading, setLoading] = useState(false);
  const [blogId, setBlogId] = useState(() => localStorage.getItem('baseera_blog_id') || '3419581055091564415');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [domainLive, setDomainLive] = useState(false);

  useEffect(() => {
    const checkLive = async () => {
      const res = await checkDomainStatus("youtube-studio-p.vercel.app");
      setDomainLive(res.online);
    };
    checkLive();
  }, []);

  const handleActivate = async () => {
    setLoading(true);
    setStatus('idle');
    try {
      localStorage.setItem('baseera_blog_id', blogId);
      const posts = await fetchBloggerPosts(blogId); 
      if (posts && posts.length > 0) {
        onImported(posts);
        setStatus('success');
      } else {
        setStatus('success');
      }
    } catch (e) {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 border border-white/10 rounded-[5rem] p-16 shadow-5xl text-right group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent)]"></div>
      
      <div className="relative z-10 space-y-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
           <div className="space-y-8 flex-1">
              <div className="flex items-center gap-8">
                 <div className="w-24 h-24 rounded-[2.5rem] bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-5xl shadow-2xl">
                    🌍
                 </div>
                 <div>
                    <h3 className="text-5xl font-black text-white tracking-tighter mb-3">اتصال Blogger النشط</h3>
                    <div className="flex items-center gap-4">
                       <span className={`w-4 h-4 rounded-full shadow-[0_0_15px_#10b981] ${domainLive ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                       <p className="text-[14px] font-black text-emerald-400 uppercase tracking-widest">
                          تم الربط بمدونة ID: <span className="text-white italic">{blogId}</span>
                       </p>
                    </div>
                 </div>
              </div>
              
              <div className="p-8 bg-black/40 border border-white/5 rounded-3xl inline-block">
                <p className="text-slate-500 font-bold text-xs mb-2 uppercase tracking-widest">معرف بلوجر الحالي:</p>
                <code className="text-3xl font-black text-blue-500 font-mono tracking-widest">{blogId}</code>
              </div>
           </div>

           <div className="flex flex-col gap-6 w-full lg:w-auto shrink-0 justify-center h-full pt-10">
              <button 
                onClick={handleActivate}
                disabled={loading}
                className="group relative px-20 py-10 rounded-[3rem] font-black text-2xl bg-blue-600 text-white hover:bg-emerald-600 transition-all shadow-4xl active:scale-95 overflow-hidden border border-white/10"
              >
                <span className="relative z-10">{loading ? 'جاري الاستيراد...' : 'مزامنة محتوى بلوجر 🔄'}</span>
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { label: 'الهدف السحابي', value: 'youtube-studio-p', icon: '☁️' },
             { label: 'حالة الربط', value: 'متصل 100%', icon: '🔗' },
             { label: 'Blog ID', value: blogId, icon: '📝' },
             { label: 'تشفير المزامنة', value: 'Vercel Node', icon: '🔐' }
           ].map((item, i) => (
             <div key={i} className="bg-white/5 backdrop-blur-xl p-10 rounded-[3.5rem] border border-white/5 group hover:border-blue-500/20 transition-all">
                <div className="text-3xl mb-6 opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                <p className="text-[10px] font-black text-slate-600 uppercase mb-3 tracking-[0.3em]">{item.label}</p>
                <p className="text-white font-black text-sm truncate">{item.value}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default BloggerImporter;
