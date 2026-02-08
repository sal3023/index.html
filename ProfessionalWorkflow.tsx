
import React from 'react';

const ProfessionalWorkflow: React.FC = () => {
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`تم نسخ: ${text}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 text-right animate-in fade-in duration-1000 px-4">
      <div className="text-center mb-16">
         <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-full text-[10px] font-black mb-4 uppercase tracking-widest">Netlify Deployment Connected</div>
         <h1 className="text-5xl font-black mb-4 tracking-tighter">بوابة الربط مع Netlify 🌐</h1>
         <p className="text-slate-500 font-bold max-w-2xl mx-auto">
           مشروعك الآن مهيأ للعمل على <span className="text-blue-600">jolly-pixie-3b3825.netlify.app</span>. اتبع الخطوات التالية لتفعيل الذكاء الاصطناعي.
         </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-slate-900 rounded-[4rem] p-12 border-4 border-slate-900 shadow-4xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
           <h2 className="text-3xl font-black mb-8 text-slate-900 dark:text-white">إعداد متغيرات البيئة</h2>
           
           <div className="space-y-10">
             <div className="relative p-8 bg-blue-50 dark:bg-white/5 rounded-3xl border-2 border-blue-100 dark:border-white/5 group-hover:border-blue-600 transition-all">
                <span className="absolute -top-4 right-8 px-4 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase">Netlify Settings</span>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Key Name</p>
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl">
                  <span className="text-2xl font-black font-mono">API_KEY</span>
                  <button onClick={() => copyText('API_KEY')} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-lg hover:bg-blue-600 transition-colors">نسخ الاسم 📋</button>
                </div>
                <p className="mt-4 text-xs text-slate-500 font-medium leading-relaxed">
                  اذهب إلى Site Configuration > Environment variables في Netlify وأضف هذا المتغير.
                </p>
             </div>

             <div className="relative p-8 bg-slate-50 dark:bg-white/5 rounded-3xl border-2 border-slate-100 dark:border-white/5">
                <span className="absolute -top-4 right-8 px-4 py-1 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase">Google AI Studio</span>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">API Value</p>
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl">
                  <span className="text-lg font-black font-mono opacity-40">AIzaSy...xxxx</span>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black rounded-lg hover:bg-slate-900 transition-colors">احصل على المفتاح ↗</a>
                </div>
             </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-3xl">
              <h3 className="text-2xl font-black mb-10 italic border-b border-white/10 pb-6">خطوات النشر النهائي 🚀</h3>
              <div className="space-y-8">
                {[
                  { n: '1', t: 'مزامنة مستودع GitHub', d: 'تأكد من رفع آخر التحديثات لمستودعك المرتبط بـ Netlify.' },
                  { n: '2', t: 'تكوين متغيرات البيئة', d: 'أضف API_KEY في لوحة تحكم Netlify كما هو موضح على اليسار.' },
                  { n: '3', t: 'إعادة بناء الموقع', d: 'اضغط على Trigger Deploy في Netlify لتطبيق المتغيرات الجديدة.' },
                  { n: '4', t: 'التحقق من الرابط', d: 'افتح jolly-pixie-3b3825.netlify.app وتأكد من عمل المساعد الصوتي.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <span className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black shrink-0 shadow-lg">{step.n}</span>
                    <div>
                      <h4 className="font-black text-lg mb-1">{step.t}</h4>
                      <p className="text-slate-400 text-xs font-medium">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
           
           <div className="bg-emerald-600 p-8 rounded-[3rem] text-white text-center shadow-2xl">
              <p className="font-black text-sm">الحالة: متصل بـ Netlify</p>
              <p className="text-xs opacity-90 mt-2">نظام بصيرة PRO مهيأ الآن للعمل بالكامل على نطاقك الجديد.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalWorkflow;
