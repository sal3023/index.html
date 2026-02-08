
import React, { useState, useEffect, useRef } from 'react';
import { getVercelDeploymentStatus, cleanProjectId } from '../services/vercel.ts';

const VercelAutomator: React.FC = () => {
  const [token, setToken] = useState(() => localStorage.getItem('baseera_vercel_token') || '');
  const [projectId, setProjectId] = useState('baseera-pro'); 
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [projectData, setProjectData] = useState<any>(null);
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
      setErrorMessage("Token Vercel مطلوب");
      setStatus('error');
      addLog("❌ خطأ: لم يتم إدخال التوكن");
      return;
    }

    setStatus('syncing');
    setErrorMessage('');
    setLogs([]);
    addLog("🔍 بدء بروتوكول الربط مع Vercel لـ tosh5.shop...");

    try {
      addLog("🔐 جاري التحقق من صلاحيات الدخول...");
      const data = await getVercelDeploymentStatus(token, projectId);
      setProjectData(data);
      addLog(`✅ تم العثور على المشروع: ${data.name}`);
      addLog(`🌐 الدومين المتصل: ${data.targets?.production?.alias?.[0] || 'tosh5.shop'}`);
      
      addLog("💡 تنبيه: تأكد من إضافة API_KEY في إعدادات Vercel Dashboard.");
      
      setStatus('success');
      localStorage.setItem('baseera_vercel_token', token);
      addLog("🎯 تم اكتمال تشخيص الربط السحابي بنجاح!");
    } catch (e: any) {
      setStatus('error');
      setErrorMessage(e.message);
      addLog(`❌ فشل الاتصال: ${e.message}`);
    }
  };

  return (
    <div className={`p-10 md:p-14 rounded-[4rem] transition-all duration-700 shadow-5xl ${
      status === 'success' ? 'bg-slate-900 border-emerald-500/50' : 
      status === 'error' ? 'bg-slate-900 border-rose-500/50' : 'bg-slate-950 border border-white/10'
    } border-2`}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-lg text-xl font-black">▲</div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Cloud: Vercel Deployment</span>
          </div>
          <h3 className="text-4xl font-black text-white">مركز الربط مع فريسل 📡</h3>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed">تكامل مباشر مع بنية Vercel التحتية لنشر مدونة tosh5.shop.</p>
        </div>
        
        <button 
          onClick={startDiagnosis}
          disabled={status === 'syncing'}
          className="px-10 py-5 bg-white text-black rounded-2xl font-black text-sm shadow-xl hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
        >
          {status === 'syncing' ? 'جاري الفحص...' : 'تأكيد الربط السحابي 🚀'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
           <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">Vercel API Token</label>
              <input 
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-blue-300 font-mono text-sm transition-all shadow-inner"
                placeholder="Vercel Access Token..."
              />
           </div>
           <div className="space-y-3">
              <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">Project Name (Slug)</label>
              <input 
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-white font-mono text-sm transition-all shadow-inner"
                placeholder="project-name"
              />
           </div>

           {status === 'error' && (
             <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-rose-500 text-xs font-bold animate-shake">
                ⚠️ لم نتمكن من الربط: {errorMessage}
             </div>
           )}
        </div>

        <div className="flex flex-col">
           <div className="flex-1 bg-black rounded-3xl p-6 font-mono text-[11px] h-[250px] overflow-y-auto border border-white/5 shadow-2xl space-y-2">
              {logs.length === 0 ? (
                <p className="text-slate-700 italic">بانتظار بدء التشخيص السحابي...</p>
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

export default VercelAutomator;
