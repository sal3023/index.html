
import React from 'react';
import { Post } from '../types.ts';

interface PostCardProps {
  post: Post;
  onClick: () => void;
  featured?: boolean;
  square?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick, featured, square }) => {
  return (
    <div 
      onClick={onClick}
      className={`group cursor-pointer bento-luxury rounded-[3.5rem] overflow-hidden flex flex-col transition-all duration-700 ${
        featured ? 'min-h-[550px] lg:flex-row' : square ? 'aspect-square' : 'min-h-[450px]'
      }`}
    >
      {/* Visual Identity Core */}
      <div className={`relative overflow-hidden ${
        featured ? 'lg:w-3/5 h-[320px] lg:h-auto' : 'h-[250px]'
      }`}>
        <div className="absolute top-8 right-8 z-20 flex flex-col items-end gap-2">
           <span className="px-6 py-2.5 bg-black/40 backdrop-blur-xl text-white text-[9px] font-black rounded-full uppercase tracking-widest border border-white/10 shadow-2xl">
              {post.category}
           </span>
           <span className="px-4 py-1.5 bg-emerald-500/80 backdrop-blur-xl text-white text-[7px] font-black rounded-full uppercase tracking-widest animate-pulse">
              Live from Tosh5
           </span>
        </div>
        <img 
          src={post.image} 
          className="w-full h-full object-cover transition-transform duration-[2.5s] group-hover:scale-110" 
          alt={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
      </div>

      {/* Strategic Content Core */}
      <div className={`p-10 lg:p-14 flex flex-col justify-center space-y-6 ${
        featured ? 'lg:w-2/5' : ''
      }`}>
        <div className="flex items-center gap-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
           <span>{post.date}</span>
           <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></span>
           <span className="text-blue-500">{post.readTime}</span>
        </div>
        
        <h3 className={`font-black text-white group-hover:text-emerald-400 transition-colors leading-[1.15] tracking-tighter ${
          featured ? 'text-4xl lg:text-5xl' : 'text-2xl'
        } line-clamp-2`}>
          {post.title}
        </h3>

        {!square && (
          <p className="text-slate-400 font-medium leading-relaxed line-clamp-2 text-sm opacity-70">
            {post.excerpt.replace(/<[^>]*>?/gm, '')}
          </p>
        )}

        <div className="pt-6 flex items-center justify-between border-t border-white/5 mt-auto">
           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest group-hover:translate-x-[-10px] transition-transform flex items-center gap-2">
             تحليل البيانات <span>←</span>
           </span>
           <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-[8px] font-black text-slate-700 uppercase">Strategic Unit Connected</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
