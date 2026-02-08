
import React from 'react';
import { Post } from '../types.ts';

interface BlogPreviewSimulatorProps {
  posts: Post[];
}

const BlogPreviewSimulator: React.FC<BlogPreviewSimulatorProps> = ({ posts }) => {
  return (
    <div className="relative mt-20 border-[12px] border-slate-800 rounded-[5rem] overflow-hidden shadow-5xl bg-slate-950 min-h-[800px] animate-in slide-in-from-bottom-20 duration-1000">
      {/* Browser Chrome UI */}
      <div className="bg-slate-900 px-10 py-4 flex items-center gap-4 border-b border-white/5">
         <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
         </div>
         <div className="flex-1 max-w-xl mx-auto bg-black/40 rounded-full py-1.5 px-6 text-[10px] text-slate-500 font-mono text-center border border-white/5">
            https://www.tosh5.shop (Sovereign Mode)
         </div>
      </div>

      {/* Content Mockup */}
      <div className="p-10 space-y-20 h-[700px] overflow-y-auto scrollbar-hide relative">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
         
         {/* Sovereign Header Mockup */}
         <header className="text-center space-y-6 pt-10">
            <div className="inline-block px-4 py-1 bg-blue-600 text-white text-[8px] font-black rounded-full uppercase tracking-widest">Diamond Theme Active</div>
            <h1 className="text-6xl font-black text-white tracking-tighter">توش5 <span className="text-blue-500 italic">بصيرة</span></h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.4em]">Intelligence & Strategy Hub</p>
         </header>

         {/* Post Grid Mockup */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.slice(0, 4).map((post, i) => (
              <div key={i} className="bg-white/5 rounded-[3rem] p-8 border border-white/5 hover:border-blue-500/30 transition-all group">
                 <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-800">
                    <img src={post.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                 </div>
                 <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest block mb-2">{post.date}</span>
                 <h3 className="text-xl font-black text-white leading-tight mb-4 group-hover:text-blue-400">{post.title}</h3>
                 <p className="text-slate-500 text-[10px] line-clamp-2 leading-relaxed">{post.excerpt.replace(/<[^>]*>?/gm, '')}</p>
                 <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[8px] font-black text-emerald-500">تحليل استراتيجي ←</span>
                    <div className="flex gap-1">
                       {[...Array(5)].map((_, j) => <div key={j} className="w-1 h-1 bg-blue-500 rounded-full opacity-30"></div>)}
                    </div>
                 </div>
              </div>
            ))}
         </div>

         {/* Overlay Message */}
         <div className="sticky bottom-10 left-0 w-full flex justify-center">
            <div className="bg-blue-600 text-white px-12 py-5 rounded-full shadow-5xl font-black text-sm flex items-center gap-4 animate-bounce">
               <span>✨ هذه هي مدونتك الحقيقية في حلتها الجديدة!</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default BlogPreviewSimulator;
