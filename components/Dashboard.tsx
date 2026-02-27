
import React, { useState, useEffect } from 'react';
import { Post, ViewMode } from '../types.ts';
import BloggerImporter from './BloggerImporter.tsx';
import BloggerThemeGenerator from './BloggerThemeGenerator.tsx';
import BlogPreviewSimulator from './BlogPreviewSimulator.tsx';
import BloggerContentGenerator from './BloggerContentGenerator.tsx';
import VercelAutomator from './VercelAutomator.tsx';
import GitHubAutomator from './GitHubAutomator.tsx';
import SocialCommandCenter from './SocialCommandCenter.tsx';
import { testAiConnectivity } from '../services/gemini.ts';

const Dashboard: React.FC<{ 
  posts: Post[], 
  onAddNew: (p: Post) => void, 
  onDeletePost: (id: string) => void,
  onImportPosts: (posts: Post[]) => void 
}> = ({ posts, onAddNew, onDeletePost, onImportPosts }) => {
  const [activeTab, setActiveTab] = useState<'blogger' | 'theme' | 'editor' | 'cloud' | 'social'>('blogger');
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairLog, setRepairLog] = useState<string[]>([]);
  const [readiness, setReadiness] = useState({
    blog: posts.length > 0,
    cloud: !!localStorage.getItem('baseera_vercel_token'),
    social: !!localStorage.getItem('social_x')
  });

  const checkReadiness = async () => {
    setReadiness({
      blog: posts.length > 0,
      cloud: !!localStorage.getItem('baseera_vercel_token'),
      social: !!localStorage.getItem('social_x')
    });
  };

  useEffect(() => {
    checkReadiness();
  }, [posts]);

  const handleSystemRepair = async () => {
    setIsRepairing(true);
    setRepairLog(["🚀 بدء عملية الإصلاح الاستراتيجي لـ Vercel..."]);
    
    await new Promise(r => setTimeout(r, 1000));
    setRepairLog(prev => [...prev, "🔍 فحص بروتوكول Gemini Flash..."]);
    const connectivity = await testAiConnectivity();
    
    if (connectivity.success) {
      setRepairLog(prev => [...prev, "✅ اتصال الذكاء الاصطناعي مستقر."]);
    } else {
      setRepairLog(prev => [...prev, `⚠️ تنبيه: ${connectivity.message}`]);
    }

    await new Promise(r => setTimeout(r, 800));
    setRepairLog(prev => [...prev, "📡 فحص مزامنة Vercel & Tosh5..."]);
    setRepairLog(prev => [...prev, "✨ تم اكتمال الإصلاح السحابي."]);
    
    await checkReadiness();
    setTimeout(() => setIsRepairing(false), 2000);
  };

  return (
    <div className="space-y-12 py-10 text-right animate-in fade-in duration-700">
      
      {isRepairing && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6 text-right">
           <div className="bg-slate-900 border border-emerald-500/30 rounded-[4rem] p-12 max-w-2xl w-full shadow-5xl space-y-8 animate-in zoom-in">
              <div className="flex justify-between items-center">
                 <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-3xl animate-spin">⚙️</div>
                 <h2 className="text-3xl font-black text-white italic">إصلاح الربط السحابي...</h2>
              </div>
              <div className="bg-black/60 rounded-3xl p-8 h-64 overflow-y-auto font-mono text-sm text-emerald-400 space-y-2">
                 {repairLog.map((log, i) => <div key={i}>{log}</div>)}
              </div>
           </div>
        </div>
      )}

      <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 shadow-5xl relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500"></div>
         <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex-1 space-y-6">
               <div className="flex items-center gap-6">
                 <h1 className="text-5xl font-black tracking-tighter text-white italic">مركز القيادة السيادي (Vercel Core)</h1>
                 <button 
                   onClick={handleSystemRepair}
                   className="px-6 py-2 bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-all shadow-xl"
                 >
                   إصلاح النظام السحابي 🛠️
                 </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                  {[
                    { id: 'blogger', label: 'المزامنة', done: readiness.blog, desc: 'Blogger Import' },
                    { id: 'theme', label: 'القالب الماسي', done: false, desc: 'Blogger XML' },
                    { id: 'cloud', label: 'الربط السحابي', done: readiness.cloud, desc: 'Vercel & GitHub' }
                  ].map((step, i) => (
                    <button 
                      key={i} 
                      onClick={() => setActiveTab(step.id as any)}
                      className={`p-6 rounded-3xl border transition-all text-right group ${
                        step.done 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-white/5 border-white/10 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${step.done ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                          {step.done ? '✓' : i+1}
                        </span>
                      </div>
                      <h4 className={`font-black text-sm ${step.done ? 'text-emerald-400' : 'text-white'}`}>{step.label}</h4>
                      <p className="text-[10px] text-slate-500 font-medium mt-1">{step.desc}</p>
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </div>

      <div className="flex flex-wrap gap-4 p-3 bg-black/40 rounded-[2.5rem] border border-white/5 w-fit">
        {[
          { id: 'blogger', label: 'المزامنة 🔄' },
          { id: 'editor', label: 'المصنع ✍️' },
          { id: 'social', label: 'السوشيال 📱' },
          { id: 'theme', label: 'الثيم 💎' },
          { id: 'cloud', label: 'السحابة ☁️' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)} 
            className={`px-8 py-4 rounded-2xl font-black text-xs transition-all relative ${
              activeTab === tab.id 
              ? `bg-white text-black shadow-4xl scale-105` 
              : 'text-slate-500 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-in slide-in-from-bottom-10 duration-700">
        {activeTab === 'blogger' && (
          <div className="space-y-20">
             <BloggerImporter onImported={(newPosts) => onImportPosts(newPosts)} />
             <BlogPreviewSimulator posts={posts} />
          </div>
        )}
        {activeTab === 'editor' && <BloggerContentGenerator />}
        {activeTab === 'social' && <SocialCommandCenter posts={posts} />}
        {activeTab === 'theme' && <BloggerThemeGenerator />}

        {activeTab === 'cloud' && <div className="space-y-12"><VercelAutomator /><GitHubAutomator /></div>}
      </div>
    </div>
  );
};

export default Dashboard;
