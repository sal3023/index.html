
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('elite_cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('elite_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 right-8 md:left-auto md:max-w-md z-[200] animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-3xl border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-3xl">🍪</span>
          <h3 className="text-xl font-black">نحن نستخدم ملفات الارتباط</h3>
        </div>
        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-6">
          نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتقديم إعلانات مخصصة تتوافق مع اهتماماتك عبر Google AdSense.
        </p>
        <div className="flex gap-4">
          <button 
            onClick={handleAccept}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            أوافق تماماً
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="px-6 bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
