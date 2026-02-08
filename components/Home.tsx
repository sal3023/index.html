
import React, { useState, useEffect } from 'react';
import { Post, ViewMode } from '../types.ts';
import PostCard from './PostCard.tsx';
import { testAiConnectivity } from '../services/gemini.ts';

interface HomeProps {
  posts: Post[];
  onPostClick: (id: string) => void;
  setView: (v: ViewMode) => void;
}

const Home: React.FC<HomeProps> = ({ posts, onPostClick, setView }) => {
  const [systemStatus, setSystemStatus] = useState<{success: boolean, message: string} | null>(null);

  useEffect(() => {
    const check = async () => {
      const res = await testAiConnectivity();
      setSystemStatus(res);
    };
    check();
  }, []);

  return (
    <div className="home-view-container pb-40 animate-in fade-in duration-1000 text-right">
      
      {/* Refined Hero Section */}
      <section className="hero-section relative pt-20 md:pt-40 pb-20 overflow-hidden">
        <div className="hero-content max-w-7xl mx-auto px-6 text-center space-y-10">
          <div className="system-status-indicator inline-flex items-center gap-3 px-4 py-2 bg-blue-500/5 border border-blue-500/10 rounded-full mx-auto">
             <div className={`status-dot w-2 h-2 rounded-full ${systemStatus?.success ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
             <span className="status-text text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">
               {systemStatus?.success ? 'System Operational' : 'Syncing Engine...'}
             </span>
          </div>

          <h1 className="hero-main-title text-6xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-white italic">
            مدونتي <br/> <span className="text-blue-600">الذكية</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-3xl text-slate-400 font-bold max-w-3xl mx-auto leading-relaxed">
            استكشف عالم <span className="text-white">الذكاء الاصطناعي</span> والاستراتيجيات الرقمية من منظور مستقبلي فريد.
          </p>

          <div className="hero-decoration flex justify-center gap-4 pt-10">
             <div className="decor-line-long h-1 w-20 bg-blue-600 rounded-full"></div>
             <div className="decor-line-short h-1 w-8 bg-blue-600/30 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="blog-posts-grid-section max-w-7xl mx-auto px-6 mt-20">
         <div className="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {posts.length > 0 ? (
              posts.map(post => (
                <PostCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
              ))
            ) : (
              <div className="loading-state col-span-full py-40 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
                 <div className="spinner w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                 <p className="loading-text text-xl font-black text-slate-500 italic">جاري جلب أحدث المقالات الاستراتيجية...</p>
              </div>
            )}
         </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="newsletter-cta-section max-w-5xl mx-auto px-6 mt-40">
         <div className="cta-box bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[4rem] p-12 md:p-20 text-center space-y-8 shadow-4xl relative overflow-hidden">
            <div className="cta-glow absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32"></div>
            <h2 className="cta-title text-4xl md:text-6xl font-black text-white italic leading-tight">ابقَ في طليعة <br/> التطور التقني</h2>
            <p className="cta-description text-white/70 text-lg font-bold">اشترك في نشرتنا الإستراتيجية لتصلك أحدث المقالات فور صدورها.</p>
            <div className="cta-form flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
               <input placeholder="بريدك الإلكتروني..." className="cta-input flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all text-right" />
               <button className="cta-submit-btn px-10 py-4 bg-white text-blue-900 rounded-2xl font-black hover:scale-105 transition-all">اشترك الآن</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
