
import React, { useState, useEffect } from 'react';
import { isKeySelected, openKeySelector, testAiConnectivity, resetKeySelection } from '../services/gemini.ts';

const KeyManager: React.FC = () => {
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [testStatus, setTestStatus] = useState<{loading: boolean, result: string | null, success: boolean | null}>({
    loading: false,
    result: null,
    success: null
  });

  const checkStatus = async () => {
    setLoading(true);
    const selected = await isKeySelected();
    setHasKey(selected);
    setLoading(false);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleSelectKey = async () => {
    await openKeySelector();
    setHasKey(true);
    setTestStatus({ loading: false, result: null, success: null });
  };

  const handleDeactivate = async () => {
    if (confirm("إيقاف تفعيل المفتاح المجاني؟")) {
      await resetKeySelection();
      setHasKey(false);
      setTestStatus({
        loading: false,
        result: "تم قطع الاتصال بالمحرك المجاني.",
        success: false
      });
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const runDiagnostic = async () => {
    setTestStatus({ loading: true, result: "جاري فحص اتصال Gemini Flash...", success: null });
    const res = await testAiConnectivity();
    setTestStatus({ loading: false, result: res.message, success: res.success });
  };

  return (
    <div className="bg-slate-950 border border-white/10 rounded-[4rem] p-12 shadow-5xl text-right animate-in zoom-in duration-700 relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${hasKey ? 'from-emerald-600 via-teal-500 to-blue-500' : 'from-slate-700 via-slate-800 to-slate-700'}`}></div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        <div className="space-y-6 flex-1 text-right">
          <div className="flex items-center gap-4 justify-end">
            <h3 className="text-4xl font-black text-white italic">مركز المفتاح المجاني (Flash Core) 🔑</h3>
            <div className={`w-6 h-6 rounded-full ${hasKey ? 'bg-emerald-500 shadow-[0_0_20px_#10b981]' : 'bg-slate-700'}`}></div>
          </div>
          <p className="text-slate-500 font-bold max-w-2xl text-lg leading-relaxed">
            {hasKey 
              ? "نظام Gemini Flash المجاني متصل الآن. أنت تستخدم موديلات توفير التكلفة والسرعة الفائقة لمدونة tosh5.shop."
              : "النظام مهيأ للعمل بمفتاح Gemini المجاني. يمكنك الحصول عليه بدون تكلفة وبدء الاستخدام فوراً."
            }
          </p>
          
          <div className="flex flex-wrap items-center gap-6 pt-4 justify-end">
            {!hasKey ? (
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2"
              >
                <span>🚀</span> احصل على مفتاح Gemini مجاني
              </a>
            ) : (
              <button 
                onClick={handleDeactivate}
                className="px-6 py-3 bg-rose-600/10 border border-rose-500/30 rounded-2xl text-xs font-black text-rose-500 hover:bg-rose-600 hover:text-white transition-all flex items-center gap-2"
              >
                <span>🚫</span> إيقاف التفعيل
              </button>
            )}

            <button 
              onClick={runDiagnostic}
              disabled={testStatus.loading || !hasKey}
              className="px-6 py-3 bg-emerald-600/10 border border-emerald-500/30 rounded-2xl text-xs font-black text-white hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:opacity-30"
            >
              <span>🔍</span> فحص جاهزية الفلاش
            </button>
          </div>

          {testStatus.result && (
            <div className={`mt-6 p-6 rounded-3xl border animate-in slide-in-from-top-4 ${
              testStatus.success === true ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 
              'bg-slate-500/10 border-slate-500/30 text-slate-400'
            }`}>
              <p className="text-sm font-bold flex items-center gap-3">
                <span className="text-xl">{testStatus.success === true ? '✅' : '⚠️'}</span>
                {testStatus.result}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 min-w-[350px]">
          <button 
            onClick={handleSelectKey}
            className={`px-12 py-8 rounded-3xl font-black text-2xl transition-all shadow-5xl border-4 ${
              hasKey 
              ? 'bg-emerald-600 text-white border-emerald-400' 
              : 'bg-emerald-600 text-white hover:bg-white hover:text-black border-emerald-500'
            }`}
          >
            {hasKey ? 'تحديث المفتاح المجاني 🔄' : 'تنشيط المحرك المجاني ⚡'}
          </button>
          <div className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center">
             <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${hasKey ? 'text-emerald-500' : 'text-slate-600'}`}>
               {hasKey ? '● نظام التوفير النشط: Gemini 3 Flash' : '○ بانتظار إشارة البدء'}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyManager;
