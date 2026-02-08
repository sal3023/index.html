
import React, { useState, useEffect } from 'react';
import { ViewMode, Post } from './types.ts';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import PostDetail from './components/PostDetail.tsx';
import BlogEditor from './components/BlogEditor.tsx';
import Dashboard from './components/Dashboard.tsx';
import ProfessionalWorkflow from './components/ProfessionalWorkflow.tsx';
import SecurityGate from './components/SecurityGate.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import { fetchBloggerPosts } from './services/blogger.ts';
import { isKeySelected, openKeySelector } from './services/gemini.ts';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.HOME);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSecurityGate, setShowSecurityGate] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);

  useEffect(() => {
    const checkKey = async () => {
      const selected = await isKeySelected();
      setHasApiKey(selected);
    };

    const initApp = async () => {
      setIsSyncing(true);
      const saved = localStorage.getItem('baseera_pro_posts_v6');
      if (saved) {
        setPosts(JSON.parse(saved));
      }

      const blogId = localStorage.getItem('baseera_blog_id');
      const freshPosts = await fetchBloggerPosts(blogId || undefined);
      
      if (freshPosts && freshPosts.length > 0) {
        setPosts(freshPosts);
        localStorage.setItem('baseera_pro_posts_v6', JSON.stringify(freshPosts));
      }
      setIsSyncing(false);
    };

    checkKey();
    initApp();
    
    const keyInterval = setInterval(checkKey, 10000);
    document.documentElement.classList.add('dark');
    return () => clearInterval(keyInterval);
  }, []);

  const handleNavigate = (v: ViewMode) => {
    if ((v === ViewMode.DASHBOARD || v === ViewMode.EDITOR) && !isAuthenticated) {
      setShowSecurityGate(true);
    } else {
      setView(v);
      window.scrollTo(0, 0);
    }
  };

  const handleAddPost = (p: Post) => {
    const updated = [p, ...posts];
    setPosts(updated);
    localStorage.setItem('baseera_pro_posts_v6', JSON.stringify(updated));
  };

  const handleActivateKey = async () => {
    await openKeySelector();
    setHasApiKey(true);
  };

  return (
    <div className="min-h-screen bg-[#010204] text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {!hasApiKey && (
        <div className="fixed top-0 left-0 w-full z-[1000] bg-[#0b1120] border-b-2 border-emerald-500/50 py-4 px-10 flex justify-between items-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-in slide-in-from-top duration-500">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-emerald-600/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-2xl text-emerald-500 animate-pulse">🔑</div>
              <div className="text-right">
                 <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">تنبيه المزامنة السحابية</p>
                 <p className="text-[12px] text-slate-300 font-bold">بانتظار تنشيط المحرك المجاني لمدونة <span className="text-white italic">tosh5.shop</span>.</p>
              </div>
           </div>
           <button 
             onClick={handleActivateKey}
             className="px-10 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs hover:bg-emerald-500 transition-all border border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95"
           >
             تنشيط المحرك المجاني الآن ⚡
           </button>
        </div>
      )}

      <Navbar 
        currentView={view} 
        setView={handleNavigate} 
        isAuthenticated={isAuthenticated} 
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenAssistant={() => setShowAssistant(true)}
        hasApiKey={hasApiKey}
      />
      
      {(isSyncing || !hasApiKey) && (
        <div className="fixed top-0 left-0 w-full z-[150] h-1.5 bg-blue-600 shadow-[0_0_20px_#2563eb]"></div>
      )}

      {showSecurityGate && (
        <SecurityGate 
          onSuccess={() => { setIsAuthenticated(true); setShowSecurityGate(false); setView(ViewMode.DASHBOARD); }} 
          onCancel={() => setShowSecurityGate(false)} 
        />
      )}

      {showAssistant && <AIAssistant onClose={() => setShowAssistant(false)} />}

      <main className="max-w-[1500px] mx-auto relative pt-40 px-6 md:px-0">
        {view === ViewMode.HOME && <Home posts={posts} onPostClick={(id) => { setSelectedPostId(id); setView(ViewMode.POST); }} setView={handleNavigate} />}
        {view === ViewMode.DASHBOARD && (
          <Dashboard 
            posts={posts} 
            onAddNew={handleAddPost} 
            onDeletePost={(id) => setPosts(posts.filter(p => p.id !== id))} 
            onImportPosts={(newP) => {
               setPosts(newP);
               localStorage.setItem('baseera_pro_posts_v6', JSON.stringify(newP));
            }}
          />
        )}
        {view === ViewMode.EDITOR && (
          <BlogEditor 
            onSave={(p) => { 
              handleAddPost(p);
              setView(ViewMode.HOME); 
            }} 
            onCancel={() => setView(ViewMode.HOME)} 
            postToEdit={selectedPostId ? posts.find(p => p.id === selectedPostId) : null}
          />
        )}
        {view === ViewMode.WORKFLOW && <ProfessionalWorkflow />}
        {view === ViewMode.POST && posts.find(p => p.id === selectedPostId) && (
          <PostDetail post={posts.find(p => p.id === selectedPostId)!} allPosts={posts} onBack={() => setView(ViewMode.HOME)} onPostNavigate={(id) => setSelectedPostId(id)} />
        )}
      </main>

      <CookieConsent />

      <footer className="py-24 border-t border-white/5 bg-[#010204] text-center">
        <div className="flex flex-col items-center gap-5">
           <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 font-black border border-white/5 italic">T</div>
           <p className="text-[10px] font-black opacity-40 tracking-[0.6em] uppercase text-white">
              Sovereign Vercel Infrastructure © 2025
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
