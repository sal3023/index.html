
import React, { useState } from 'react';

interface ContactViewProps {
  onBack: () => void;
}

const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in duration-700">
      <button onClick={onBack} className="mb-8 text-blue-600 font-black flex items-center gap-2"><span>→</span> العودة</button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl">
          <h2 className="text-3xl font-black mb-6">تواصل مع إدارة بصيرة PRO</h2>
          <p className="text-slate-400 mb-10 font-medium leading-relaxed">
            نحن هنا للرد على استفساراتكم المتعلقة بالشراكات الاستراتيجية، الاقتراحات التقنية، أو الدعم الفني للمنصة.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">📧</div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">البريد الإلكتروني</p>
                <p className="font-bold text-blue-400">admin@baseera.pro</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">📍</div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">المقر</p>
                <p className="font-bold">التوسع السحابي العالمي</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
          {status === 'sent' ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mb-6">✓</div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">تم الإرسال بنجاح!</h3>
              <p className="text-slate-500 font-medium">سيقوم فريق بصيرة PRO بالرد عليك قريباً.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">الاسم بالكامل</label>
                <input required type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 transition-all font-bold" placeholder="أدخل اسمك..." />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">البريد الإلكتروني</label>
                <input required type="email" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 transition-all font-bold" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">الرسالة</label>
                <textarea required rows={4} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 transition-all font-medium" placeholder="كيف يمكن لـ بصيرة PRO مساعدتك؟"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:bg-slate-200"
              >
                {status === 'sending' ? 'جاري الإرسال...' : 'إرسال الرسالة السحابية'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactView;
