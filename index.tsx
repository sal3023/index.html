
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// معالج أخطاء بسيط لضمان عدم بقاء الشاشة بيضاء في حال حدوث خطأ فادح
window.onerror = function(message, source, lineno, colno, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: sans-serif; direction: rtl;">
        <h1 style="color: #e11d48;">⚠️ حدث خطأ تقني</h1>
        <p style="color: #475569;">التطبيق واجه مشكلة في التشغيل. يرجى المحاولة لاحقاً.</p>
        <pre style="background: #f1f5f9; padding: 20px; border-radius: 12px; font-size: 12px; text-align: left; direction: ltr; overflow: auto;">
          ${message}
        </pre>
        <button onclick="location.reload()" style="background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: bold;">
          إعادة تحميل التطبيق
        </button>
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
