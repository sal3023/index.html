
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
          "version": "5.2.0",
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
      },
      {
        path: 'README.md',
        content: `# Baseera PRO Deployment\nConnected to www.tosh5.shop\nPowered by Gemini Flash.`
      }
    ];

    try {
      for (let i = 0; i < files.length; i++) {
        setCurrentFile(files[i].path);
        await uploadFileToGitHub(cleanToken, owner, repo, files[i].path, files[i].content, `Baseera PRO Sovereign Sync: Netlify Routing Protocol`);
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
    <div className={`transition-all duration-700 p-10 text-white text-right relative overflow-hidden rounded-[3rem] mt-10 shadow-5xl border ${
      status === 'success' ? 'bg-emerald-950/40 border-emerald-500/50' : 
      status === 'error' ? 'bg-rose-950/40 border-rose-500/50' : 'bg-[#0b1120] border-white/10'
    }`}>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10">
           <div>
              <h3 className="text-3xl font-black mb-1">تزامن المخزن (GitHub Repository) 📂</h3>
              <p className="text-slate-500 text-sm font-bold">إعدادات النشر المباشر لـ Netlify لمدونة tosh5.shop.</p>
           </div>
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-2xl ${status === 'success' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
              {status === 'success' ? '✓' : '🚀'}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">GitHub Token (الرمز الخاص)</label>
            <input 
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-black/60 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-blue-400 font-mono text-xs transition-all"
              placeholder="ghp_..."
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">اسم المخزن (User/Repo)</label>
            <input 
              type="text"
              value={repoPath}
              onChange={(e) => setRepoPath(e.target.value)}
              className="w-full bg-black/60 border border-white/5 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-white font-mono text-xs transition-all"
              placeholder="username/my-blog"
            />
          </div>
        </div>

        {status === 'syncing' && (
          <div className="mb-10 p-6 bg-blue-600/5 rounded-3xl border border-blue-500/20">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-black text-blue-400 uppercase">جاري رفع: <span className="text-white italic">{currentFile}</span></span>
                <span className="text-xs font-black text-blue-400">{progress}%</span>
             </div>
             <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 shadow-[0_0_10px_#2563eb] transition-all duration-300" style={{width: `${progress}%`}}></div>
             </div>
          </div>
        )}

        {status === 'success' && (
           <div className="mb-10 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl animate-in zoom-in">
              <p className="text-emerald-400 text-sm font-black flex items-center gap-3">
                <span>✨</span> تم تحديث مخزن GitHub بنجاح! التطبيق جاهز للإطلاق السحابي.
              </p>
           </div>
        )}

        <button 
          onClick={handleSync}
          disabled={status === 'syncing'}
          className="w-full py-6 rounded-3xl font-black text-xl bg-blue-600 text-white hover:bg-emerald-600 transition-all shadow-4xl active:scale-95 disabled:opacity-30"
        >
          {status === 'syncing' ? 'جاري المزامنة...' : 'رفع التحديثات للمخزن 📤'}
        </button>
      </div>
    </div>
  );
};

export default GitHubAutomator;
