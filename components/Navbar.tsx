
import React from 'react';
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
  return (
    <div className="fixed top-8 left-0 w-full z-[100] px-8">
      <header className="max-w-7xl mx-auto bg-slate-950/60 backdrop-blur-3xl rounded-[2.5rem] h-24 px-12 flex justify-between items-center border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
        
        <div className="flex items-center gap-6 cursor-pointer group" onClick={() => setView(ViewMode.HOME)}>
          <div className="relative">
             <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-[0_0_30px_rgba(37,99,235,0.4)] group-hover:rotate-12 transition-all italic">T</div>
             <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 animate-pulse ${hasApiKey ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white">TOSH5 <span className="text-blue-500 italic">PRO</span></span>
            <div className="flex items-center gap-2">
               <span className="text-[7px] font-black text-slate-500 uppercase tracking-[0.5em]">Command Hub</span>
               {!hasApiKey && <button onClick={() => openKeySelector()} className="text-[6px] text-rose-500 font-black underline uppercase tracking-widest">Key Required!</button>}
            </div>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-12">
          {[
            { id: ViewMode.HOME, label: 'لوحة القيادة' },
            { id: ViewMode.WORKFLOW, label: 'أتمتة السحابة' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setView(item.id)}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-2 ${
                currentView === item.id ? 'text-white' : 'text-slate-500 hover:text-white'
              }`}
            >
              {item.label}
              {currentView === item.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"></span>}
            </button>
          ))}
          <button onClick={onOpenAssistant} className="flex items-center gap-3 text-[11px] font-black text-blue-400 uppercase tracking-widest group bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20">
             <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
             مساعد الذكاء الاستراتيجي
          </button>
        </nav>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView(ViewMode.DASHBOARD)} 
            className={`px-12 py-4 rounded-2xl text-[11px] font-black transition-all border border-white/5 ${
              isAuthenticated 
              ? 'bg-emerald-600 text-white shadow-3xl' 
              : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-2xl active:scale-95'
            }`}
          >
            {isAuthenticated ? 'مركز العمليات' : 'دخول السيادة'}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
