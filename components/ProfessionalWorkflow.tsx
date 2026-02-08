
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
            Cloud Sovereignty Protocol
         </div>
         <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter text-white">دليل التفعيل السحابي 🌐</h1>
         <p className="text-slate-500 font-bold max-w-3xl mx-auto text-xl leading-relaxed">
           اتبع هذه البروتوكولات الثلاثة لربط مدونتك <span className="text-blue-500 underline">{siteUrl}</span> بالسحابة العالمية وتفعيل قوة الذكاء الاصطناعي الكاملة.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
         {[
           {
             title: '1. بروتوكول GitHub',
             desc: 'تخزين الكود الماسي بشكل آمن وتفعيل المزامنة التلقائية.',
             icon: '📂',
             link: 'https://github.com/new',
             action: 'إنشاء مستودع جديد'
           },
           {
             title: '2. بروتوكول Netlify',
             desc: 'نشر الموقع عالمياً وربطه بالدومين الخاص بك tosh5.shop.',
             icon: '🚀',
             link: 'https://app.netlify.com/start',
             action: 'بدء النشر السحابي'
           },
           {
             title: '3. بروتوكول Gemini',
             desc: 'تفعيل عقل المنصة الاستراتيجي عبر مفتاح API_KEY.',
             icon: '🧠',
             link: 'https://aistudio.google.com/app/apikey',
             action: 'استخراج مفتاح الذكاء'
           }
         ].map((step, i) => (
           <div key={i} className="bg-slate-900 border border-white/5 p-10 rounded-[3.5rem] hover:border-blue-500/50 transition-all group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{step.icon}</div>
              <h3 className="text-2xl font-black text-white mb-4">{step.title}</h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">{step.desc}</p>
              <a href={step.link} target="_blank" className="block text-center py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-blue-400 hover:bg-blue-600 hover:text-white transition-all">
                 {step.action} ↗
              </a>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 border-4 border-slate-900 shadow-4xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
           <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">إعداد متغيرات البيئة (Netlify)</h2>
           
           <div className="space-y-10">
             <div className="relative p-8 bg-blue-50 dark:bg-white/5 rounded-3xl border-2 border-blue-100 dark:border-white/5 group-hover:border-blue-600 transition-all">
                <span className="absolute -top-4 right-8 px-4 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase">Step 1: Key Name</span>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">اسم المتغير</p>
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                  <span className="text-2xl font-black font-mono text-blue-600">API_KEY</span>
                  <button onClick={() => copyText('API_KEY')} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-lg hover:bg-blue-600 transition-colors">نسخ الاسم 📋</button>
                </div>
             </div>

             <div className="relative p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-slate-100 dark:border-white/5">
                <span className="absolute -top-4 right-8 px-4 py-1 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase">Step 2: Value</span>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">قيمة المفتاح</p>
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                  <span className="text-lg font-black font-mono opacity-40">AIzaSy...xxxx</span>
                  <p className="text-[10px] text-slate-500 font-bold max-w-[150px]">الصق مفتاحك الذي حصلت عليه من Google AI Studio هنا.</p>
                </div>
             </div>
           </div>
           
           <div className="mt-10 p-6 bg-blue-600 text-white rounded-3xl font-bold text-sm leading-relaxed">
             💡 نصيحة تقنية: بدون هذه الخطوة، لن يتمكن موقعك المباشر من استخدام ميزات "بصيرة" وسيعطيك خطأ في الاتصال.
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-3xl border border-white/5">
              <h3 className="text-2xl font-black mb-10 italic border-b border-white/10 pb-6 flex items-center gap-4">
                 <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-xs not-italic">✓</span>
                 التأكد من جاهزية النشر
              </h3>
              <div className="space-y-8">
                {[
                  { n: '١', t: 'مزامنة GitHub', d: 'هل قمت بالضغط على "تحديث النظام" في تبويب GitHub Automator؟' },
                  { n: '٢', t: 'ربط Netlify', d: 'هل قمت باختيار المستودع الصحيح في لوحة تحكم Netlify؟' },
                  { n: '٣', t: 'حقن المفتاح', d: 'هل أضفت الـ API_KEY في إعدادات الموقع على Netlify؟' },
                  { n: '٤', t: 'اختبار النطاق', d: `افتح ${siteUrl} وتأكد من أن القالب الماسي يعمل بكفاءة.` }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <span className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black shrink-0 shadow-lg group-hover:bg-blue-600 transition-colors">{step.n}</span>
                    <div>
                      <h4 className="font-black text-lg mb-1">{step.t}</h4>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           
           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <p className="font-black text-lg mb-2">الحالة السحابية: جاهز للتفويض</p>
              <p className="text-xs opacity-90 leading-relaxed font-medium">نظام "بصيرة PRO" مهيأ الآن للامتداد السحابي. بمجرد إتمام هذه الخطوات، ستصبح مدونتك منصة ذكاء اصطناعي عالمية ومستقلة تماماً.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalWorkflow;
