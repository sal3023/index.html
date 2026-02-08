
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// معالج أخطاء متطور لمنع انهيار الواجهة
window.onerror = function(message, source, lineno, colno, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 60px; text-align: center; font-family: 'Tajawal', sans-serif; direction: rtl; background: #010204; min-height: 100vh; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="width: 100px; height: 100px; background: #e11d48; border-radius: 30px; display: flex; align-items: center; justify-content: center; font-size: 50px; margin-bottom: 30px; box-shadow: 0 0 50px rgba(225,29,72,0.4);">⚠️</div>
        <h1 style="font-size: 40px; font-weight: 900; margin-bottom: 15px; color: #fff;">بروتوكول تعليق النظام</h1>
        <p style="color: #94a3b8; font-size: 18px; max-width: 500px; line-height: 1.6; margin-bottom: 40px;">اكتشفنا عطلاً في الربط السحابي لـ Vercel أو مفتاح API. يرجى إعادة محاولة التحميل.</p>
        
        <div style="background: #0f172a; padding: 25px; border-radius: 25px; border: 1px solid rgba(255,255,255,0.1); font-size: 11px; text-align: left; direction: ltr; overflow: auto; width: 90%; max-width: 600px; font-family: monospace; color: #64748b; margin-bottom: 40px;">
          ${message}
        </div>

        <div style="display: flex; gap: 15px;">
           <button onclick="location.reload()" style="background: #2563eb; color: white; border: none; padding: 18px 40px; border-radius: 20px; cursor: pointer; font-weight: 900; font-size: 14px; box-shadow: 0 10px 30px rgba(37,99,235,0.3);">إعادة تحميل النظام 🚀</button>
           <button onclick="localStorage.clear(); location.reload();" style="background: rgba(255,255,255,0.05); color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); padding: 18px 40px; border-radius: 20px; cursor: pointer; font-weight: 900; font-size: 14px;">تصفير التخزين 🛠️</button>
        </div>
      </div>
    `;
  }
  return false;
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
