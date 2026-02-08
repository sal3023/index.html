
import React, { useState, useEffect } from 'react';
import { Post, ViewMode } from '../types.ts';
import PostCard from './PostCard.tsx';
import { getStrategicSearchResponse, fetchTrendingTopics } from '../services/gemini.ts';

interface HomeProps {
  posts: Post[];
  onPostClick: (id: string) => void;
  setView: (v: ViewMode) => void;
}

const Home: React.FC<HomeProps> = ({ posts, onPostClick, setView }) => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<{text: string, chunks: any[]}>({text: '', chunks: []});
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [trends, setTrends] = useState<string>('');

  useEffect(() => {
    fetchTrendingTopics().then(setTrends);
  }, []);

  const handleAiAsk = async () => {
    if (!aiPrompt) return;
    setIsAiLoading(true);
    const result = await getStrategicSearchResponse(aiPrompt);
    setAiResponse(result);
    setIsAiLoading(false);
  };

  const aiSquad = [
    { name: 'وكيل المحتوى', role: 'صياغة المقالات', status: 'جاهز للنشر', icon: '✍️', color: 'blue' },
    { name: 'وكيل التصميم', role: 'القالب الماسي', status: 'مُحدث v2.0', icon: '💎', color: 'emerald' },
    { name: 'محلل الـ SEO', role: 'رادار الترندات', status: 'يراقب جوجل', icon: '📡', color: 'orange' },
    { name: 'خبير الأمان', role: 'تشفير السيادة', status: 'نشط 100%', icon: '🛡️', color: 'rose' }
  ];

  return (
    <div className="space-y-32 pb-60 animate-in fade-in duration-1000 text-right overflow-x-hidden">
      
      {/* Cinematic Hero Section */}
      <section className="relative pt-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            
            {/* Right Side: Identity */}
            <div className="flex-1 space-y-12 order-2 lg:order-1">
              <div className="inline-flex items-center gap-4 px-6 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                <span className="w-2 h-2 bg-blue-500 animate-ping rounded-full"></span>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Sovereign Node: 3419581055091564415</span>
              </div>
              
              <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-[0.8] text-white">
                توش5 <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-emerald-400">بصيرة PRO</span>
              </h1>

              <p className="text-2xl md:text-4xl text-slate-400 font-light max-w-2xl leading-relaxed">
                هنا "مركز قيادة السرب" الخاص بك. مجموعة من المساعدين الأذكياء يعملون معاً لإدارة <span className="text-white font-black italic underline decoration-blue-500">إمبراطوريتك المعرفية</span>.
              </p>

              <div className="flex flex-wrap gap-8 pt-10">
                <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex-1 min-w-[200px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-2">حالة الدومين</p>
                  <p className="text-2xl font-black text-emerald-400">TOSH5.SHOP ✅</p>
                </div>
                <div className="p-8 bg-blue-600/10 backdrop-blur-3xl border border-blue-500/20 rounded-[2.5rem] flex-1 min-w-[200px]">
                  <p className="text-[10px] font-black text-slate-500 uppercase mb-2">محرك البحث</p>
                  <p className="text-2xl font-black text-blue-400 italic">Gemini Squad</p>
                </div>
              </div>
            </div>

            {/* Left Side: AI Command Input */}
            <div className="w-full lg:w-[450px] order-1 lg:order-2">
              <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-12 rounded-[5rem] shadow-5xl space-y-10 relative overflow-hidden group">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600 blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                
                <div className="relative z-10 space-y-8 text-center">
                  <h3 className="text-2xl font-black text-white italic border-r-4 border-blue-500 pr-4 text-right">أمر القائد الموحد</h3>
                  
                  <textarea 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="اطلب من السرب تحليل أو كتابة أي شيء..."
                    className="w-full h-40 bg-black/40 border border-white/10 rounded-3xl p-6 text-white text-lg font-bold outline-none focus:border-blue-500 transition-all placeholder:text-slate-700 text-right"
                  />

                  <button 
                    onClick={handleAiAsk}
                    disabled={isAiLoading}
                    className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-emerald-600 transition-all shadow-4xl active:scale-95 disabled:opacity-50"
                  >
                    {isAiLoading ? 'السرب يتحرك..' : 'توجيه السرب ⚡'}
                  </button>

                  {aiResponse.text && (
                    <div className="p-6 bg-blue-500/5 rounded-2xl border border-white/5 animate-in slide-in-from-top-4 text-right">
                       <p className="text-blue-300 text-sm italic leading-relaxed">{aiResponse.text.substring(0, 300)}...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Influence Section */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="bg-slate-900/60 border border-white/10 rounded-[4rem] p-16 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <h2 className="text-5xl font-black text-white tracking-tighter">تأثيرك العالمي الآن</h2>
                  <p className="text-slate-400 text-xl font-medium leading-relaxed">
                     بفضل "القالب الماسي" و "سرب المساعدين"، مدونة <span className="text-blue-500">tosh5.shop</span> مهيأة الآن للانتشار في القارات الخمس بجودة عالية وتوافق كامل مع المعايير الدولية.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-6 bg-white/5 rounded-3xl">
                        <p className="text-3xl font-black text-white">12+ms</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">سرعة الاستجابة</p>
                     </div>
                     <div className="p-6 bg-white/5 rounded-3xl">
                        <p className="text-3xl font-black text-emerald-500">100%</p>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">جاهزية AdSense</p>
                     </div>
                  </div>
               </div>
               <div className="relative">
                  {/* Visual World Map Mockup */}
                  <div className="aspect-video bg-blue-600/10 rounded-3xl border border-blue-500/20 flex items-center justify-center overflow-hidden">
                     <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping left-[30%] top-[40%]"></div>
                     <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping left-[60%] top-[60%] delay-300"></div>
                     <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping left-[80%] top-[20%] delay-700"></div>
                     <p className="text-blue-400 font-black text-xs uppercase tracking-[0.5em] animate-pulse">Global Node Distribution</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* AI Squad Section */}
      <section className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-black text-white tracking-tighter">سرب مساعدي Tosh5</h2>
          <p className="text-slate-500 font-bold uppercase tracking-[0.4em] text-xs">أربعة مساعدين متخصصين تحت إمرتك 24/7</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiSquad.map((agent, i) => (
            <div key={i} className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-10 rounded-[3rem] group hover:border-blue-500/50 transition-all">
              <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500 inline-block">{agent.icon}</div>
              <h3 className="text-xl font-black text-white mb-1">{agent.name}</h3>
              <p className="text-slate-500 text-xs font-bold mb-6">{agent.role}</p>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/5">
                <span className={`w-1.5 h-1.5 rounded-full bg-${agent.color}-500 animate-pulse`}></span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{agent.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Content Stream */}
      <section className="max-w-7xl mx-auto px-6 space-y-24">
        <div className="flex justify-between items-end">
          <div className="space-y-4 text-right">
            <h2 className="text-5xl font-black text-white tracking-tighter">أرشيف السيادة</h2>
            <div className="w-24 h-2 bg-blue-600 rounded-full mr-0 ml-auto"></div>
          </div>
          <button onClick={() => setView(ViewMode.DASHBOARD)} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">إدارة الأرشيف ⚙️</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.length > 0 ? (
            posts.map(post => (
              <PostCard key={post.id} post={post} onClick={() => onPostClick(post.id)} />
            ))
          ) : (
            <div className="col-span-full py-40 text-center bg-slate-900/40 rounded-[4rem] border border-white/5">
              <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-8"></div>
              <p className="text-2xl font-black text-slate-500">جاري مزامنة بيانات Tosh5...</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
