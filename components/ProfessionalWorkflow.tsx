
import React from 'react';

const ProfessionalWorkflow: React.FC = () => {
  const siteUrl = "youtube-studio-p.vercel.app";
  const repoUrl = "github.com/sal3023/youtube-studio-p";
  const bloggerId = "3419581055091564415";
  
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    // نستخدم إشعاراً مخصصاً بدلاً من الـ alert التقليدي
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-6 text-right animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Cloud Deployment Node v7.0</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] italic">
            Command <br/> <span className="text-blue-600">Center</span>
          </h1>
          <p className="text-2xl text-slate-400 font-bold max-w-2xl leading-relaxed">
            مرحباً بك في مركز إدارة المحتوى السيادي لـ <span className="text-white underline decoration-blue-500 underline-offset-8">YouTube Studio P</span>.
          </p>
        </div>
        
        <div className="flex gap-4">
           <a href={`https://github.com/sal3023/youtube-studio-p`} target="_blank" className="p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all group">
              <p className="text-[10px] font-black text-slate-500 uppercase mb-2">Source Code</p>
              <p className="text-white font-black group-hover:text-blue-400 transition-colors">sal3023/Repo ↗</p>
           </a>
           <a href={`https://youtube-studio-p.vercel.app`} target="_blank" className="p-6 bg-blue-600 text-white rounded-[2rem] hover:bg-emerald-600 transition-all shadow-4xl group">
              <p className="text-[10px] font-black opacity-60 uppercase mb-2 text-white">Live Site</p>
              <p className="font-black">Open Platform ↗</p>
           </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Step 1: GitHub */}
        <div className="bento-card p-12 rounded-[4rem] space-y-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[80px] opacity-10"></div>
           <div className="w-20 h-20 bg-black/40 rounded-3xl flex items-center justify-center text-4xl shadow-inner border border-white/5 group-hover:rotate-12 transition-transform">📂</div>
           <div className="space-y-4">
              <h3 className="text-3xl font-black text-white italic">اتصال GitHub</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed">تتم مزامنة التحديثات تلقائياً مع مستودعك الخاص لضمان استقرار الكود.</p>
           </div>
           <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Repo ID</p>
              <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                 <span className="text-xs font-mono text-slate-300">sal3023/youtube-studio-p</span>
                 <button onClick={() => copyText('sal3023/youtube-studio-p')} className="text-[10px] font-black text-blue-400 hover:text-white">COPY</button>
              </div>
           </div>
        </div>

        {/* Step 2: Vercel */}
        <div className="bento-card p-12 rounded-[4rem] space-y-10 relative overflow-hidden border-blue-500/30">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600 blur-[80px] opacity-10"></div>
           <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-4xl shadow-2xl">☁️</div>
           <div className="space-y-4">
              <h3 className="text-3xl font-black text-white italic">سحابة Vercel</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed">المنصة مستضافة على أقوى سيرفرات Vercel Edge لضمان سرعة تصفح فائقة.</p>
           </div>
           <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">Active Deployment</p>
              <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                 <span className="text-xs font-mono text-emerald-400">youtube-studio-p.vercel.app</span>
                 <button onClick={() => copyText('youtube-studio-p.vercel.app')} className="text-[10px] font-black text-emerald-400 hover:text-white">LINK</button>
              </div>
           </div>
        </div>

        {/* Step 3: Blogger */}
        <div className="bento-card p-12 rounded-[4rem] space-y-10 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 blur-[80px] opacity-10"></div>
           <div className="w-20 h-20 bg-orange-600 rounded-3xl flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 transition-transform">📝</div>
           <div className="space-y-4">
              <h3 className="text-3xl font-black text-white italic">محرك Blogger</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed">يتم سحب المحتوى ونشره عبر API جوجل الرسمي لضمان الأرشفة الفورية.</p>
           </div>
           <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-4">Target Blog ID</p>
              <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                 <span className="text-xs font-mono text-orange-300">{bloggerId}</span>
                 <button onClick={() => copyText(bloggerId)} className="text-[10px] font-black text-orange-400 hover:text-white">COPY ID</button>
              </div>
           </div>
        </div>

      </div>

      <div className="mt-20 p-16 bg-gradient-to-l from-blue-900/40 via-slate-900 to-black rounded-[5rem] border-2 border-white/5 text-center space-y-8 shadow-5xl">
         <h2 className="text-5xl font-black text-white italic">جاهز لتحديث المحتوى؟</h2>
         <p className="text-slate-500 font-bold max-w-2xl mx-auto">انتقل الآن إلى لوحة التحكم لبدء توليد مقالات احترافية مدعومة بـ Gemini 3 ونشرها بضغطة زر.</p>
         <div className="flex justify-center gap-6">
            <div className="px-12 py-5 bg-white text-black rounded-3xl font-black text-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-2xl">إدارة العمليات 🚀</div>
         </div>
      </div>
    </div>
  );
};

export default ProfessionalWorkflow;
