
import React, { useState } from 'react';

interface SecurityGateProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const SecurityGate: React.FC<SecurityGateProps> = ({ onSuccess, onCancel }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2025') {
      onSuccess();
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[500] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6 text-right">
      <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 max-w-sm w-full shadow-3xl text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-full mx-auto mb-8 flex items-center justify-center text-3xl shadow-2xl animate-bounce">🔑</div>
        <h2 className="text-2xl font-black text-white mb-2">رمز العبور الآمن</h2>
        <p className="text-slate-500 text-xs mb-8 font-bold">للدخول إلى بصيرة PRO، استخدم الرمز السنوي:</p>
        
        <div className="bg-blue-500/10 p-6 rounded-3xl mb-8 border border-blue-500/20">
          <p className="text-[10px] text-blue-400 mb-1 font-black uppercase tracking-widest">الرمز السري الحالي</p>
          <p className="text-white font-black text-4xl tracking-[0.2em]">2025</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="password" 
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            autoFocus
            className={`w-full bg-slate-800 border-2 ${error ? 'border-red-500 animate-shake' : 'border-white/5'} rounded-2xl py-5 text-center text-white text-4xl font-black focus:border-blue-500 outline-none transition-all shadow-inner`}
            placeholder="ـ ـ ـ ـ"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-blue-700 active:scale-95 transition-all">تأكيد الدخول ✅</button>
          <button type="button" onClick={onCancel} className="text-slate-500 text-xs font-bold hover:text-white transition-colors">إغلاق النافذة</button>
        </form>
      </div>
    </div>
  );
};

export default SecurityGate;
