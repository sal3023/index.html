
import React, { useState, useEffect } from 'react';
import { uploadFileToGitHub } from '../services/github.ts';

const GitHubAutomator: React.FC = () => {
  const [token, setToken] = useState(() => localStorage.getItem('baseera_github_token') || '');
  const [repoPath, setRepoPath] = useState(() => localStorage.getItem('baseera_github_repo') || '');
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentFile, setCurrentFile] = useState('');
  const [progress, setProgress] = useState(0);

  const handleSync = async () => {
    if (!token || !repoPath.includes('/')) {
      alert("⚠️ يرجى إدخال التوكن واسم المستودع بشكل صحيح.");
      return;
    }
    
    const cleanToken = token.trim();
    const [owner, repo] = repoPath.trim().split('/');
    setStatus('syncing');
    setErrorMessage('');
    setProgress(0);

    const files = [
      {
        path: 'package.json',
        content: JSON.stringify({
          "name": "baseera-pro-netlify",
          "private": true,
          "version": "4.1.0",
          "type": "module",
          "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview" },
          "dependencies": { "react": "^19.0.0", "react-dom": "^19.0.0" },
          "devDependencies": { 
            "vite": "^6.0.0", 
            "@vitejs/plugin-react": "^4.3.0", 
            "typescript": "^5.0.0", 
            "tailwindcss": "^3.4.0", 
            "autoprefixer": "^10.4.0", 
            "postcss": "^8.4.0" 
          }
        }, null, 2)
      },
      {
        path: '_redirects',
        content: '/*    /index.html   200'
      },
      {
        path: 'vite.config.ts',
        content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@google/genai', 'recharts', 'react', 'react-dom', 'react-dom/client'],
    }
  }
});`
      }
    ];

    try {
      for (let i = 0; i < files.length; i++) {
        setCurrentFile(files[i].path);
        await uploadFileToGitHub(cleanToken, owner, repo, files[i].path, files[i].content, `Netlify Integration Upgrade: SPA Routing & Core Stability`);
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      setStatus('success');
      localStorage.setItem('baseera_github_token', cleanToken);
      localStorage.setItem('baseera_github_repo', repoPath);
    } catch (e: any) {
      console.error(e);
      setStatus('error');
      setErrorMessage(e.message || 'فشل الاتصال بـ GitHub');
    }
  };

  return (
    <div className={`transition-all duration-1000 p-12 text-white text-right relative overflow-hidden rounded-[4rem] mt-10 shadow-4xl ${
      status === 'success' ? 'bg-emerald-600 ring-8 ring-emerald-500/20' : 
      status === 'error' ? 'bg-rose-950/40 border-2 border-rose-500/30' : 'bg-slate-900'
    }`}>
      {status === 'success' && (
        <div className="absolute inset-0 bg-emerald-600 flex flex-col items-center justify-center z-50 animate-in zoom-in duration-500">
           <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl mb-6 animate-bounce">🌍</div>
           <h3 className="text-4xl font-black mb-4">تم التزامن مع Netlify!</h3>
           <p className="text-emerald-100 mb-8 font-bold">تم إرسال ملفات التوجيه البرمجية إلى GitHub بنجاح.</p>
           <div className="flex gap-4">
             <button onClick={() => setStatus('idle')} className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-black text-sm transition-all">إغلاق</button>
             <a href="https://app.netlify.com/" target="_blank" className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-black text-sm shadow-xl">افتح Netlify لمتابعة النشر 🚀</a>
           </div>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
           <div>
              <h3 className="text-3xl font-black mb-2">رابط التزامن السحابي (Netlify)</h3>
              <p className="text-slate-400 text-sm">سأقوم بإعداد ملفات _redirects و package.json لتعمل مدونتك بكفاءة على Netlify.</p>
           </div>
           <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-2xl border border-emerald-500/30">⚡</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">GitHub Personal Token</label>
            <input 
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-blue-300 font-mono text-sm transition-all"
              placeholder="ghp_..."
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">Repository (User/Repo)</label>
            <input 
              type="text"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-white font-mono text-sm transition-all"
              placeholder="username/project-name"
            />
          </div>
        </div>

        {status === 'syncing' && (
          <div className="mb-10 p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20 animate-pulse">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-blue-400 uppercase">جاري التحديث: {currentFile}</span>
                <span className="text-xs font-black text-blue-400">{progress}%</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-300" style={{width: `${progress}%`}}></div>
             </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-10 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-xs font-bold">
            ❌ فشل البروتوكول: {errorMessage}
          </div>
        )}

        <button 
          onClick={handleSync}
          disabled={status === 'syncing'}
          className="w-full py-6 rounded-3xl font-black text-xl bg-blue-600 hover:bg-emerald-600 transition-all shadow-3xl disabled:opacity-50 flex items-center justify-center gap-4"
        >
          {status === 'syncing' ? 'جاري التحديث لـ Netlify...' : 'تحسين النظام ونشر التحديثات 🚀'}
        </button>
      </div>
    </div>
  );
};

export default GitHubAutomator;
