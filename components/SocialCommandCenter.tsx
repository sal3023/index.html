
import React, { useState, useEffect } from 'react';
import { Post } from '../types.ts';
import { generateSocialKit } from '../services/gemini.ts';

const SocialCommandCenter: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const [selectedPostId, setSelectedPostId] = useState(posts[0]?.id || '');
  const [loading, setLoading] = useState(false);
  const [socialKit, setSocialKit] = useState<any>(null);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [socialLinks, setSocialLinks] = useState({
    x: localStorage.getItem('social_x') || '',
    facebook: localStorage.getItem('social_facebook') || '',
    instagram: localStorage.getItem('social_instagram') || '',
    tiktok: localStorage.getItem('social_tiktok') || '',
    linkedin: localStorage.getItem('social_linkedin') || '',
  });

  useEffect(() => {
    localStorage.setItem('social_x', socialLinks.x);
    localStorage.setItem('social_facebook', socialLinks.facebook);
    localStorage.setItem('social_instagram', socialLinks.instagram);
    localStorage.setItem('social_tiktok', socialLinks.tiktok);
    localStorage.setItem('social_linkedin', socialLinks.linkedin);
  }, [socialLinks]);

  const handleGenerateCampaign = async () => {
    const post = posts.find(p => p.id === selectedPostId);
    if (!post) return;
    setLoading(true);
    const kit = await generateSocialKit(post.title, post.excerpt);
    setSocialKit(kit);
    setLoading(false);
  };

  const handleSchedule = (platform: string) => {
    setScheduledCount(prev => prev + 1);
    alert(`تمت جدولة المنشور لمنصة ${platform} بنجاح! 📅`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ المحتوى بنجاح! 🚀');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Dynamic Performance Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: 'إجمالي الوصول', value: '45.2k', color: 'text-blue-500', trend: '+14%' },
           { label: 'التفاعل النشط', value: '12.8k', color: 'text-emerald-500', trend: '+22%' },
           { label: 'المنشورات المجدولة', value: scheduledCount, color: 'text-orange-500', trend: 'نشط' },
           { label: 'صحة الانتشار', value: '98%', color: 'text-rose-500', trend: 'Optimal' }
         ].map((stat, i) => (
           <div key={i} className="bg-slate-900 border border-white/5 p-8 rounded-[2.5rem] shadow-4xl">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex justify-between items-end">
                <span className={`text-3xl font-black ${stat.color}`}>{stat.value}</span>
                <span className="text-[10px] font-black text-slate-600">{stat.trend}</span>
              </div>
           </div>
         ))}
      </div>

      {/* Social Links Vault */}
      <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 text-right shadow-5xl">
         <h3 className="text-3xl font-black text-white mb-8 italic">مركز إدارة الهوية الاجتماعية 🛡️</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.keys(socialLinks).map((key) => (
              <div key={key} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{key}</label>
                <input 
                  value={(socialLinks as any)[key]}
                  onChange={(e) => setSocialLinks({...socialLinks, [key]: e.target.value})}
                  placeholder={`رابط حساب ${key}...`}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-5 py-4 text-xs text-blue-400 outline-none focus:border-blue-500 transition-all shadow-inner"
                />
              </div>
            ))}
         </div>
      </div>

      {/* Main Campaign Engine */}
      <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 text-right space-y-12 shadow-5xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 blur-[120px] pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10">
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white italic underline decoration-rose-600 underline-offset-[10px]">رادار الانتشار العابر للقارات 🌍</h3>
            <p className="text-slate-500 font-bold max-w-xl">اختر مقالاً وسيقوم "سرب المنسقين" ببناء حملة انتشار متكاملة فوراً.</p>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-[400px]">
            <select 
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-rose-500"
            >
              {posts.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
            <button 
              onClick={handleGenerateCampaign}
              disabled={loading}
              className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-lg hover:bg-white hover:text-rose-600 transition-all shadow-4xl disabled:opacity-50"
            >
              {loading ? 'جاري بناء الحملة...' : 'إطلاق حملة الانتشار 🚀'}
            </button>
          </div>
        </div>

        {socialKit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-10">
             {[
               { id: 'x', name: '𝕏 تويتر (Viral)', content: socialKit.x, color: 'bg-black', icon: '🐦' },
               { id: 'instagram', name: '📸 إنستغرام (Story)', content: socialKit.instagram, color: 'bg-rose-600', icon: '🎨' },
               { id: 'tiktok', name: '🎵 تيك توك (Hook)', content: socialKit.tiktok, color: 'bg-slate-800', icon: '🎬' },
               { id: 'linkedin', name: '💼 لينكدإن (Pro)', content: socialKit.linkedin, color: 'bg-blue-800', icon: '💎' },
               { id: 'facebook', name: '📘 فيسبوك (Social)', content: socialKit.facebook, color: 'bg-blue-600', icon: '👥' },
               { id: 'whatsapp', name: '💬 واتساب / تليجرام', content: socialKit.whatsapp, color: 'bg-emerald-600', icon: '🗨️' },
               { id: 'pinterest', name: '📌 بينترست (Visual)', content: socialKit.pinterest, color: 'bg-rose-700', icon: '📍' }
             ].map((item) => (
               <div key={item.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 flex flex-col group hover:scale-[1.02] transition-all shadow-2xl">
                  <div className={`w-full py-3 ${item.color} text-white text-center text-[10px] font-black rounded-full uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl`}>
                     <span>{item.icon}</span> {item.name}
                  </div>
                  <div className="flex-1 text-sm text-slate-300 italic leading-relaxed whitespace-pre-wrap">
                     {item.content}
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => copyToClipboard(item.content)}
                      className="flex-1 py-4 bg-white text-black rounded-2xl text-[10px] font-black hover:bg-orange-500 hover:text-white transition-all shadow-xl"
                    >
                      نسخ 📋
                    </button>
                    <button 
                      onClick={() => handleSchedule(item.name)}
                      className="p-4 bg-white/10 rounded-2xl hover:bg-emerald-600 transition-all"
                      title="جدولة النشر"
                    >
                      📅
                    </button>
                    {(socialLinks as any)[item.id] && (
                      <a 
                        href={(socialLinks as any)[item.id]} 
                        target="_blank" 
                        className="p-4 bg-white/10 rounded-2xl hover:bg-blue-600 transition-all"
                      >
                        🔗
                      </a>
                    )}
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>

      {/* Global Audience Insights Mockup */}
      <div className="bg-white/5 border border-white/10 rounded-[4rem] p-16 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
         <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-600/10 blur-[100px] pointer-events-none"></div>
         <div className="space-y-6 lg:w-1/2">
            <h4 className="text-3xl font-black text-white italic">رادار الجمهور العالمي 📡</h4>
            <p className="text-slate-400 font-bold leading-relaxed">بناءً على تحليل السرب، هذا المنشور سيصل إلى ذروة التفاعل في المناطق التالية خلال الـ 24 ساعة القادمة.</p>
            <div className="flex gap-4">
               {['الشرق الأوسط', 'أوروبا', 'شمال أفريقيا'].map(reg => (
                 <span key={reg} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-blue-400 uppercase tracking-widest">{reg}</span>
               ))}
            </div>
         </div>
         <div className="lg:w-1/2 grid grid-cols-2 gap-8 w-full">
            <div className="p-8 bg-black/40 rounded-3xl border border-white/5 text-center space-y-2">
               <p className="text-[10px] font-black text-slate-600">Audience Quality</p>
               <p className="text-4xl font-black text-white">94%</p>
            </div>
            <div className="p-8 bg-black/40 rounded-3xl border border-white/5 text-center space-y-2">
               <p className="text-[10px] font-black text-slate-600">Viral Potential</p>
               <p className="text-4xl font-black text-emerald-500">High</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SocialCommandCenter;
