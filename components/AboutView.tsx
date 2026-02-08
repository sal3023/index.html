
import React from 'react';

interface AboutViewProps {
  onBack: () => void;
}

const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-6xl mx-auto py-10 text-right animate-in fade-in duration-1000">
      <button onClick={onBack} className="mb-16 text-slate-400 font-black flex items-center gap-4 hover:text-blue-600 transition-colors group">
        <span className="group-hover:-translate-x-2 transition-transform">→</span> العودة للمنصة الرئيسية
      </button>
      
      <div className="space-y-32">
        <header className="text-center">
          <div className="inline-flex p-4 rounded-[3rem] bg-blue-50 border border-blue-100 mb-12 shadow-inner">
            <div className="w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-4xl text-white shadow-3xl">⌘</div>
          </div>
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 mb-8 tracking-tighter">بصيرة PRO</h1>
          <p className="text-3xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed italic">
            "المعرفة ليست مجرد بيانات، بل هي القدرة على استشراف المستقبل وتحويله إلى واقع ملموس."
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-slate-950 rounded-[4.5rem] p-16 md:p-24 text-white shadow-3xl relative overflow-hidden group border border-white/5">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] -mr-48 -mt-48 opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <h2 className="text-4xl font-black mb-10 relative z-10 flex items-center gap-6">
              <span className="text-emerald-500">🛡️</span> العقيدة الأمنية
            </h2>
            <p className="text-slate-400 text-2xl leading-[1.8] font-medium relative z-10 opacity-90">
              في بصيرة PRO، نؤمن بأن خصوصية فكرك هي أصل سيادي. نستخدم أقوى تقنيات التشفير والتحقق الفيدرالي لضمان بقاء بياناتك تحت سيطرتك الكاملة والوحيدة.
            </p>
          </div>

          <div className="bg-white rounded-[4.5rem] p-16 md:p-20 border border-slate-100 shadow-3xl">
            <h2 className="text-4xl font-black mb-12 flex items-center gap-6 text-blue-600">
              <span className="text-blue-600">🚀</span> خارطة طريق 2030
            </h2>
            <div className="space-y-12">
              {[
                { year: '2024', title: 'التأسيس السحابي', desc: 'إرساء القواعد التقنية وبناء البنية التحتية المشفرة.' },
                { year: '2025', title: 'عصر Gemini', desc: 'دمج الذكاء الاصطناعي التوليدي لتحويل المقالات إلى تجارب متعددة الوسائط.' },
                { year: '2030', title: 'الريادة الرقمية', desc: 'التحول إلى نظام تشغيل معرفي عالمي يقود التحول الرقمي في المنطقة.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 items-start relative group">
                  <span className="text-blue-600 font-black text-sm pt-2 bg-blue-50 px-3 py-1 rounded-lg">{item.year}</span>
                  <div>
                    <h4 className="font-black text-slate-900 text-2xl mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="bg-blue-600 rounded-[5rem] p-16 md:p-32 text-white text-center relative overflow-hidden shadow-3xl">
           <div className="absolute inset-0 bg-slate-950 opacity-10 mesh-bg"></div>
           <div className="relative z-10">
             <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight">نحن لا نكتب التاريخ، نحن نصممه.</h2>
             <p className="text-blue-100 text-2xl md:text-3xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed">
               انضم إلى نخبة المفكرين الاستراتيجيين الذين اختاروا بصيرة PRO لتكون منصتهم للعالم.
             </p>
             <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="px-12 py-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                   <p className="text-4xl font-black">99.9%</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">System Uptime</p>
                </div>
                <div className="px-12 py-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
                   <p className="text-4xl font-black">AES-256</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-blue-200">Military Grade Security</p>
                </div>
             </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default AboutView;
