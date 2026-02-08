
import React, { useState } from 'react';
import { generateCustomBloggerTheme } from '../services/gemini.ts';

const BloggerThemeGenerator: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentXml, setCurrentXml] = useState(`<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:css='false' b:defaultmessages='false' b:layoutsVersion='3' b:responsive='true' dir='rtl' lang='ar' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/schemas/b/dt/2.0' xmlns:data='http://www.google.com/schemas/b/dt/2.0' xmlns:expr='http://www.google.com/schemas/b/dt/2.0'>
  <head>
    <meta content='width=device-width, initial-scale=1' name='viewport'/>
    <title><data:blog.pageTitle/></title>
    <link href='https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&amp;display=swap' rel='stylesheet'/>
    <script src='https://cdn.tailwindcss.com'></script>
    <b:skin><![CDATA[
      :root { --accent: #3b82f6; --bg: #020617; }
      body { background-color: var(--bg); color: #f8fafc; font-family: 'Tajawal', sans-serif; margin: 0; overflow-x: hidden; scroll-behavior: smooth; }
      .glass-card { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 40px; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
      .glass-card:hover { border-color: var(--accent); transform: translateY(-10px); box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.4); }
      .hero-gradient { background: radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.1) 0%, transparent 50%); }
    ]]></b:skin>
  </head>
  <body class='hero-gradient'>
    <div class='max-w-6xl mx-auto px-6 py-20'>
      
      <!-- Sovereign Nav -->
      <nav class='flex justify-between items-center mb-32 bg-slate-900/50 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/5'>
        <div class='text-2xl font-black tracking-tighter'>TOSH5 <span class='text-blue-500 italic'>BASIRA</span></div>
        <div class='flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500'>
          <span>Home</span>
          <span>Sovereign Link</span>
          <span>Contact Node</span>
        </div>
      </nav>

      <header class='mb-40 text-right'>
        <h1 class='text-8xl font-black tracking-tighter mb-6'><data:blog.pageTitle/></h1>
        <div class='h-2 w-40 bg-blue-600 rounded-full'></div>
      </header>

      <b:section id='main' showaddelement='yes'>
        <b:widget id='Blog1' locked='true' title='Main Posts' type='Blog'>
          <b:includable id='main'>
            <div class='grid grid-cols-1 md:grid-cols-2 gap-12'>
              <b:loop values='data:posts' var='post'>
                <article class='glass-card p-10 flex flex-col group'>
                  <span class='text-[10px] font-black text-blue-500 mb-6 uppercase tracking-[0.3em]'><data:post.dateHeader/></span>
                  <h2 class='text-3xl font-black mb-6 group-hover:text-blue-400 transition-colors'>
                    <a expr:href='data:post.url'><data:post.title/></a>
                  </h2>
                  <div class='text-slate-400 leading-relaxed mb-10 line-clamp-3 text-lg'>
                    <data:post.snippet/>
                  </div>
                  <div class='mt-auto flex justify-between items-center pt-8 border-t border-white/5'>
                    <a expr:href='data:post.url' class='text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors'>Read Analysis →</a>
                    <div class='flex gap-1'>
                       <div class='w-1 h-1 bg-blue-500 rounded-full'></div>
                       <div class='w-1 h-1 bg-blue-500 rounded-full opacity-50'></div>
                    </div>
                  </div>
                </article>
              </b:loop>
            </div>
          </b:includable>
        </b:widget>
      </b:section>

      <footer class='mt-60 pt-20 border-t border-white/5 text-center'>
        <p class='text-[10px] font-black text-slate-700 uppercase tracking-[1em]'>Tosh5 Sovereign Platform © 2025</p>
      </footer>
    </div>
  </body>
</html>`);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateCustom = async () => {
    if (!customPrompt) return;
    setIsGenerating(true);
    const newXml = await generateCustomBloggerTheme(customPrompt);
    if (newXml) {
      // تنظيف الـ XML من علامات markdown المحتملة
      const cleanXml = newXml.replace(/```xml/g, '').replace(/```/g, '').trim();
      setCurrentXml(cleanXml);
    }
    setIsGenerating(false);
  };

  return (
    <div className="bg-slate-900 border-4 border-blue-500/20 rounded-[5rem] p-16 shadow-5xl text-right animate-in zoom-in duration-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500"></div>
      
      <div className="relative z-10 space-y-16">
        
        {/* Header and Call to Action */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
           <div className="space-y-6">
              <h2 className="text-6xl font-black text-white tracking-tighter italic">إدارة المظهر الماسي 💎</h2>
              <p className="text-2xl text-slate-400 font-medium max-w-2xl leading-relaxed">
                هذا الكود هو "الروح البصرية" لمدونتك. قم بنسخه الآن واستبدال قالب بلوجر القديم لتنتقل إلى مستوى العالمية.
              </p>
           </div>
           
           <div className="flex flex-col gap-4">
              <button 
                onClick={handleCopy}
                className={`px-16 py-8 rounded-[3rem] font-black text-2xl transition-all shadow-5xl border-4 ${
                  copied ? 'bg-emerald-600 text-white border-emerald-400 animate-pulse' : 'bg-white text-black hover:bg-blue-600 hover:text-white border-white/20'
                }`}
              >
                {copied ? '✅ تم نسخ كود القالب' : 'نسخ الكود الكامل 📋'}
              </button>
              <p className="text-[10px] text-slate-500 font-black text-center uppercase tracking-widest">ثم اذهب إلى Blogger > Theme > Edit HTML</p>
           </div>
        </div>

        {/* AI Customization Prompt */}
        <div className="bg-white/5 border border-white/10 rounded-[3.5rem] p-10 space-y-8 shadow-4xl">
           <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl">🪄</span>
              <h3 className="text-2xl font-black text-white">تخصيص القالب بالذكاء الاصطناعي</h3>
           </div>
           <div className="flex flex-col md:flex-row gap-6">
              <input 
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="مثلاً: قالب بلمسة ذهبية داكنة، خطوط كوفية، عرض الصور بشكل أكبر..."
                className="flex-1 bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-blue-500 transition-all"
              />
              <button 
                onClick={handleGenerateCustom}
                disabled={isGenerating || !customPrompt}
                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-emerald-600 transition-all shadow-xl disabled:opacity-50"
              >
                {isGenerating ? 'جاري الصهر...' : 'توليد القالب المخصص ✨'}
              </button>
           </div>
        </div>

        {/* Code Preview Area */}
        <div className="space-y-4">
           <div className="flex justify-between items-center px-8">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Blogger Theme XML Source</label>
              <button onClick={handleCopy} className="text-blue-500 text-xs font-black hover:underline transition-all">نسخ سريع 📋</button>
           </div>
           <div className="bg-black/60 rounded-[4rem] p-12 h-[500px] overflow-y-auto font-mono text-[10px] text-blue-400/60 dir-ltr border border-white/5 shadow-inner">
              <pre className="whitespace-pre-wrap">{currentXml}</pre>
           </div>
        </div>

        {/* Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
           {[
             { t: 'تحسين SEO', d: 'أرشفة فورية في محركات البحث.', i: '🚀' },
             { t: 'Bento Grid', d: 'أحدث صيحات التصميم العالمية.', i: '📦' },
             { t: 'سرعة البرق', d: 'تحميل فائق السرعة لزيادة الأرباح.', i: '⚡' }
           ].map((item, i) => (
             <div key={i} className="bg-white/5 p-10 rounded-[3rem] border border-white/5 group hover:border-blue-500/30 transition-all">
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{item.i}</div>
                <h4 className="text-white font-black text-xl mb-2">{item.t}</h4>
                <p className="text-slate-500 text-sm font-bold">{item.d}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default BloggerThemeGenerator;
