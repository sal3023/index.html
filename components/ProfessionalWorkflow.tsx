
import React from 'react';

const ProfessionalWorkflow: React.FC = () => {
  const siteUrl = "www.tosh5.shop";
  
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`تم نسخ: ${text}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 text-right animate-in fade-in duration-1000 px-4">
      <div className="text-center mb-16 space-y-6">
         <div className="inline-block px-6 py-2 bg-blue-600/10 text-blue-500 border border-blue-500/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">
            Vercel Sovereign Protocol
         </div>
         <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter text-white">دليل التفعيل عبر Vercel 🌐</h1>
         <p className="text-slate-500 font-bold max-w-3xl mx-auto text-xl leading-relaxed">
           اتبع هذه البروتوكولات لربط مدونتك <span className="text-blue-500 underline">{siteUrl}</span> بسحابة فريسل العالمية وتفعيل قوة الذكاء الاصطناعي.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
         {[
           {
             title: '1. بروتوكول GitHub',
             desc: 'رفع الكود الماسي لمستودعك لتفعيل التحديث التلقائي.',
             icon: '▲',
             link: 'https://github.com/new',
             action: 'إنشاء مستودع GitHub'
           },
           {
             title: '2. بروتوكول Vercel',
             desc: 'ربط المستودع بـ Vercel وتوصيل الدومين tosh5.shop.',
             icon: '🚀',
             link: 'https://vercel.com/new',
             action: 'بدء النشر عبر فريسل'
           },
           {
             title: '3. بروتوكول Gemini',
             desc: 'إضافة API_KEY في إعدادات البيئة (Environment Variables).',
             icon: '🧠',
             link: 'https://aistudio.google.com/app/apikey',
             action: 'استخراج مفتاح الفلاش'
           }
         ].map((step, i) => (
           <div key={i} className="bg-slate-900 border border-white/10 p-10 rounded-[3.5rem] hover:border-blue-500/50 transition-all group border-2">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{step.icon}</div>
              <h3 className="text-2xl font-black text-white mb-4">{step.title}</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{step.desc}</p>
              <a href={step.link} target="_blank" className="block text-center py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                 {step.action} ↗
              </a>
           </div>
         ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 border-4 border-slate-900 shadow-4xl relative overflow-hidden group">
         <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
         <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">إعداد متغيرات البيئة في Vercel</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="relative p-8 bg-blue-50 dark:bg-white/5 rounded-3xl border-2 border-blue-100 dark:border-white/5">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Variable Name (اسم المتغير)</p>
              <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="text-2xl font-black font-mono text-blue-600">API_KEY</span>
                <button onClick={() => copyText('API_KEY')} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-lg hover:bg-blue-600 transition-colors">نسخ 📋</button>
              </div>
           </div>

           <div className="relative p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-slate-100 dark:border-white/5">
              <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Variable Value (القيمة)</p>
              <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200">
                <span className="text-lg font-black font-mono opacity-40 italic">الصق مفتاحك هنا</span>
              </div>
           </div>
         </div>
      </div>
    </div>
  );
};

export default ProfessionalWorkflow;
