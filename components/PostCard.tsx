
import React from 'react';
import { Post } from '../types.ts';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="post-card group cursor-pointer relative bg-slate-900 rounded-[2.5rem] overflow-hidden flex flex-col min-h-[480px] border border-white/5 hover:border-blue-600/40 transition-all duration-500 shadow-2xl hover:-translate-y-2"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="post-card-image-wrapper absolute inset-0 z-0">
        <img 
          src={post.image} 
          className="post-card-img w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
          alt={post.title}
        />
        <div className="post-card-overlay absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/20 opacity-90 group-hover:opacity-80 transition-opacity"></div>
      </div>

      {/* Content Area */}
      <div className="post-card-content relative z-10 p-8 md:p-10 mt-auto flex flex-col space-y-5">
        <div className="post-card-meta flex items-center gap-3">
           <span className="post-card-category px-4 py-1.5 bg-blue-600 text-white text-[8px] font-black rounded-full uppercase tracking-widest shadow-lg">
              {post.category?.split('|')[0].trim() || 'تقنية'}
           </span>
           <span className="post-card-read-time text-[8px] font-black text-slate-400 uppercase tracking-widest">{post.readTime} للقراءة</span>
        </div>
        
        <h3 className="post-card-title text-2xl md:text-3xl font-black text-white leading-[1.2] tracking-tight group-hover:text-blue-400 transition-colors italic">
          {post.title}
        </h3>

        <p className="post-card-excerpt text-slate-300 font-medium leading-relaxed line-clamp-2 text-sm md:text-base opacity-70 group-hover:opacity-100 transition-opacity">
          {post.excerpt.replace(/<[^>]*>?/gm, '')}
        </p>

        <div className="post-card-footer pt-6 flex justify-between items-center border-t border-white/10">
           <div className="post-card-author-info flex items-center gap-3">
              <div className="author-avatar w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-[10px]">👤</div>
              <span className="author-name text-[9px] font-black text-slate-400 uppercase tracking-widest">{post.author || 'إدارة توش5'}</span>
           </div>
           <div className="post-card-cta flex items-center gap-2">
              <span className="cta-text text-[10px] font-black text-blue-500">اقرأ المقال</span>
              <span className="cta-arrow text-blue-500 text-xl group-hover:translate-x-2 transition-transform">←</span>
           </div>
        </div>
      </div>

      {/* Strategic Badge */}
      <div className="post-card-badge-wrapper absolute top-6 left-6 z-20">
         <div className="strategic-score-badge w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-[10px] font-black text-emerald-400">
            {post.strategicScore || '98'}%
         </div>
      </div>
    </div>
  );
};

export default PostCard;
