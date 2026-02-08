
import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types.ts';
import { openKeySelector } from '../services/gemini.ts';

interface NavbarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onOpenAssistant: () => void;
  hasApiKey?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isAuthenticated, onOpenAssistant, hasApiKey }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`main-navbar-container fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-4 md:px-8 py-4 ${isScrolled ? 'translate-y-0' : 'translate-y-2'}`}>
      <header className={`main-navbar max-w-7xl mx-auto rounded-[2rem] transition-all duration-500 flex justify-between items-center px-6 md:px-10 h-20 border ${
        isScrolled 
        ? 'bg-slate-950/80 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
        : 'bg-transparent border-transparent'
      }`}>
        
        {/* Logo Section */}
        <div className="nav-logo-group flex items-center gap-4 cursor-pointer group" onClick={() => setView(ViewMode.HOME)}>
          <div className="logo-icon-wrapper relative">
             <div className="logo-box w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl md:text-2xl font-black shadow-lg group-hover:rotate-6 transition-all italic">T</div>
             <div className={`api-status-dot absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 ${hasApiKey ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
          </div>
          <div className="nav-logo-text hidden sm:flex flex-col">
            <span className="logo-brand text-xl font-black tracking-tighter text-white">TOSH5 <span className="text-blue-500 italic">PRO</span></span>
            <span className="logo-subtitle text-[7px] font-black text-slate-500 uppercase tracking-[0.4em]">Strategic Blog</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="nav-links-wrapper hidden md:flex items-center gap-10">
          <button onClick={() => setView(ViewMode.HOME)} className={`nav-link-btn text-[10px] font-black uppercase tracking-widest ${currentView === ViewMode.HOME ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}>الرئيسية</button>
          
          {isAuthenticated && (
            <>
              <button onClick={() => setView(ViewMode.WORKFLOW)} className="nav-link-btn text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest">الأتمتة</button>
              <button onClick={() => setView(ViewMode.DASHBOARD)} className="nav-link-btn text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest">لوحة التحكم</button>
            </>
          )}

          <button onClick={onOpenAssistant} className="ai-assistant-trigger px-5 py-2 bg-blue-500/10 text-blue-400 text-[9px] font-black rounded-full border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all">
            مساعد الذكاء الاصطناعي
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="nav-actions flex items-center gap-4">
          {!isAuthenticated ? (
            <button 
              onClick={() => setView(ViewMode.DASHBOARD)} 
              className="admin-login-btn px-6 md:px-8 py-3 bg-white text-black rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
            >
              دخول الإدارة
            </button>
          ) : (
            <button 
              onClick={() => setView(ViewMode.EDITOR)} 
              className="quick-editor-btn w-10 h-10 md:w-12 md:h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-xl shadow-lg hover:scale-105 transition-all"
            >
              ✍️
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
