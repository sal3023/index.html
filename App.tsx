
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
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600 selection:text-white">
      
      {!hasApiKey && (
        <div className="fixed top-0 left-0 w-full z-[1000] bg-slate-900 border-b border-blue-500/30 py-4 px-8 flex justify-between items-center shadow-2xl">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-xl text-blue-500">🔑</div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">بروتوكول الوصول الاستراتيجي</p>
                 <p className="text-[11px] text-slate-400 font-bold">يرجى تفعيل مفتاح Gemini Flash المجاني للبدء.</p>
              </div>
           </div>
           <button 
             onClick={handleActivateKey}
             className="px-6 py-2 bg-blue-600 text-white rounded-xl font-black text-xs hover:bg-blue-500 transition-all border border-blue-400/50 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
           >
             تنشيط المحرك المجاني ⚡
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
        <div className="fixed top-0 left-0 w-full z-[150] h-1 bg-blue-600 shadow-[0_0_10px_#2563eb]"></div>
      )}

      {showSecurityGate && (
        <SecurityGate 
          onSuccess={() => { setIsAuthenticated(true); setShowSecurityGate(false); setView(ViewMode.DASHBOARD); }} 
          onCancel={() => setShowSecurityGate(false)} 
        />
      )}

      {showAssistant && <AIAssistant onClose={() => setShowAssistant(false)} />}

      <main className="max-w-[1600px] mx-auto relative pt-32 px-4 md:px-0">
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

      <footer className="py-20 border-t border-white/5 bg-[#020617] text-center">
        <div className="flex flex-col items-center gap-4">
           <p className="text-[10px] font-black opacity-30 tracking-[0.5em] uppercase text-white">
              Baseera PRO Strategic Engine © 2025
           </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
