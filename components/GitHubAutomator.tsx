
import React, { useState, useEffect } from 'react';
import { uploadFileToGitHub } from '../services/github.ts';

const GitHubAutomator: React.FC = () => {
  const [token, setToken] = useState(() => localStorage.getItem('baseera_github_token') || '');
  const [repoPath, setRepoPath] = useState(() => localStorage.getItem('baseera_github_repo') || 'sal3023/youtube-studio-p');
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentFile, setCurrentFile] = useState('');
  const [progress, setProgress] = useState(0);

  const cleanGitHubInput = (input: string) => {
    if (input.includes('github.com/')) {
      const parts = input.split('github.com/')[1].split('/').filter(p => p !== '');
      if (parts.length >= 2) {
        return `${parts[0]}/${parts[1]}`;
      }
    }
    return input.trim().replace(/\/$/, '');
  };

  const handleRepoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanGitHubInput(e.target.value);
    setRepoPath(cleaned);
  };

  const handleSync = async () => {
    const finalRepoPath = cleanGitHubInput(repoPath);
    if (!token || !finalRepoPath.includes('/')) {
      alert("⚠️ يرجى إدخال التوكن واسم المستودع بشكل صحيح.");
      return;
    }
    
    const cleanToken = token.trim();
    const [owner, repo] = finalRepoPath.split('/');
    setStatus('syncing');
    setErrorMessage('');
    setProgress(0);

    const files = [
      {
        path: 'package.json',
        content: JSON.stringify({
          "name": "youtube-studio-p",
          "private": true,
          "version": "6.0.0",
          "type": "module",
          "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview" },
          "dependencies": { "react": "^19.0.0", "react-dom": "^19.0.0" },
          "devDependencies": { "vite": "^6.0.0", "@vitejs/plugin-react": "^4.3.0", "typescript": "^5.0.0", "tailwindcss": "^3.4.0" }
        }, null, 2)
      },
      {
        path: 'vercel.json',
        content: JSON.stringify({ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }, null, 2)
      },
      {
        path: 'README.md',
        content: `# YouTube Studio P\nDeploy: https://youtube-studio-p.vercel.app/\nSource: https://github.com/sal3023/youtube-studio-p`
      }
    ];

    try {
      for (let i = 0; i < files.length; i++) {
        setCurrentFile(files[i].path);
        await uploadFileToGitHub(cleanToken, owner, repo, files[i].path, files[i].content, `Sovereign Sync: ${finalRepoPath}`);
        setProgress(Math.round(((i + 1) / files.length) * 100));
      }
      setStatus('success');
      localStorage.setItem('baseera_github_token', cleanToken);
      localStorage.setItem('baseera_github_repo', finalRepoPath);
    } catch (e: any) {
      setStatus('error');
      setErrorMessage(e.message || 'فشل الاتصال بـ GitHub');
    }
  };

  return (
    <div className={`transition-all duration-700 p-12 text-white text-right relative overflow-hidden rounded-[3rem] mt-10 shadow-5xl border-2 ${
      status === 'success' ? 'bg-[#061d15] border-emerald-500/50' : 
      status === 'error' ? 'bg-[#1c0a0f] border-rose-500/50' : 'bg-[#0b1120] border-white/10'
    }`}>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-10">
           <div className="text-right">
              <h3 className="text-3xl font-black mb-1 italic">ربط مستودع GitHub 📂</h3>
              <p className="text-slate-500 text-sm font-bold">الهدف النشط: sal3023/youtube-studio-p</p>
           </div>
           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-2xl ${status === 'success' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
              {status === 'success' ? '✓' : '▲'}
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-right">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">GitHub Personal Token</label>
            <input 
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-blue-400 font-mono text-xs transition-all text-right"
              placeholder="ghp_..."
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest px-2">مسار المستودع</label>
            <input 
              type="text"
              value={repoPath}
              onChange={handleRepoChange}
              className="w-full bg-black border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-blue-500 text-white font-mono text-xs transition-all text-right"
              placeholder="sal3023/youtube-studio-p"
            />
          </div>
        </div>

        {status === 'syncing' && (
          <div className="mb-10 p-6 bg-blue-600/10 rounded-3xl border border-blue-500/20">
             <div className="flex justify-between items-center mb-3">
                <span className="text-[9px] font-black text-blue-400 uppercase">مزامنة الملف: {currentFile}</span>
                <span className="text-xs font-black text-blue-400">{progress}%</span>
             </div>
             <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-300 shadow-[0_0_15px_#2563eb]" style={{width: `${progress}%`}}></div>
             </div>
          </div>
        )}

        <button 
          onClick={handleSync}
          disabled={status === 'syncing'}
          className="w-full py-6 rounded-3xl font-black text-xl bg-blue-600 text-white hover:bg-emerald-600 transition-all shadow-4xl active:scale-95 disabled:opacity-30"
        >
          {status === 'syncing' ? 'جاري ضخ الكود...' : 'تحديث المستودع ونشر التعديلات 🚀'}
        </button>
      </div>
    </div>
  );
};

export default GitHubAutomator;
