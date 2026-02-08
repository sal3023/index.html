
import React, { useState, useEffect, useRef } from 'react';
import { updateNetlifyEnv, getNetlifySiteStatus, getNetlifyDeploys } from '../services/netlify.ts';

const NetlifyAutomator: React.FC = () => {
  const [token, setToken] = useState(() => localStorage.getItem('baseera_netlify_token') || '');
  const [siteId, setSiteId] = useState('tosh5-shop'); 
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [siteData, setSiteData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const startDiagnosis = async () => {
    if (!token) {
      setErrorMessage("التوكن مفقود");
      setStatus('error');
      addLog("❌ خطأ: التوكن غير موجود");
      return;
    }

    setStatus('syncing');
    setErrorMessage('');
    setLogs([]);
    addLog("🔍 بدء عملية التشخيص الاستراتيجي لـ www.tosh5.shop...");
    
    // تنظيف اسم الموقع إذا أدخل المستخدم الدومين كاملاً
    const cleanId = siteId.replace('www.', '').replace('.shop', '').replace('.com', '').trim();
    addLog(`🌐 جاري فحص هوية الموقع: ${cleanId}`);

    try {
      addLog("🔐 جاري الاتصال بخوادم Netlify المركزية...");
      const data = await getNetlifySiteStatus(token, cleanId);
      setSiteData(data);
      addLog(`✅ تم تأكيد الارتباط: ${data.name}`);
      addLog(`📁 نطاق النظام: ${data.custom_domain || 'جاري إعداد النطاق'}`);

      addLog("🤖 جاري حقن بروتوكول الذكاء الاصطناعي (API_KEY)...");
      const currentKey = process.env.API_KEY;
      if (currentKey && currentKey !== 'undefined') {
        await updateNetlifyEnv(token, data.id, 'API_KEY', currentKey);
        addLog("✨ تم حقن مفتاح التشغيل بنجاح!");
      }

      setStatus('success');
      localStorage.setItem('baseera_netlify_token', token);
      addLog("🎯 اكتمل الربط الاستراتيجي للدومين بنجاح!");
    } catch (e: any) {
      setStatus('error');
      setErrorMessage(e.message);
      addLog(`❌ فشل في بروتوكول الربط: ${e.message}`);
    }
  };

  return (
    <div className={`p-10 md:p-14 rounded-[4rem] transition-all duration-700 shadow-4xl ${
      status === 'success' ? 'bg-slate-900 ring-8 ring-emerald-500/20' : 
      status === 'error' ? 'bg-slate-900 ring-8 ring-rose-500/20' : 'bg-slate-950 border border-white/5'
    }`}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${status === 'syncing' ? 'bg-blue-500 animate-ping' : status === 'success' ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Protocol: www.tosh5.shop</span>
          </div>
          <h3 className="text-4xl font-black text-white">مركز الربط الذكي 📡</h3>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed">هنا يتم دمج موقعك فعلياً مع خوادم Netlify العالمية.</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col items-end gap-2">
           <button 
             onClick={startDiagnosis}
             disabled={status === 'syncing'}
             className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
           >
             {status === 'syncing' ? 'جاري الربط...' : 'تفعيل النطاق والتشغيل 🚀'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">Netlify Personal Access Token</label>
              <input 
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-blue-300 font-mono text-sm transition-all shadow-inner"
                placeholder="nfp_xxxx..."
              />
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">Site Name / API ID</label>
              <input 
                type="text"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-white font-mono text-sm transition-all shadow-inner"
                placeholder="tosh5-shop"
              />
           </div>

           {status === 'error' && (
             <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-rose-500 text-xs font-bold animate-shake">
                ⚠️ عذراً، لم نتمكن من الربط: {errorMessage}
             </div>
           )}

           {status === 'success' && siteData && (
             <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-emerald-500 text-sm font-bold animate-in zoom-in">
                ✅ دومينك {siteData.custom_domain || 'tosh5.shop'} مرتبط الآن بنظام بصيرة PRO!
             </div>
           )}
        </div>

        <div className="flex flex-col">
           <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-3 flex items-center gap-2">
             <span className="w-2 h-2 bg-slate-500 rounded-full"></span> تفاصيل الربط السحابي
           </label>
           <div className="flex-1 bg-black rounded-3xl p-6 font-mono text-[11px] h-[250px] overflow-y-auto border border-white/5 shadow-2xl space-y-2">
              {logs.length === 0 ? (
                <p className="text-slate-700 italic">بانتظار تفعيل الدومين...</p>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={`text-left dir-ltr ${log.includes('❌') ? 'text-rose-500' : log.includes('✅') || log.includes('✨') ? 'text-emerald-500' : 'text-blue-400'}`}>
                    {log}
                  </div>
                ))
              )}
              <div ref={logEndRef}></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NetlifyAutomator;
