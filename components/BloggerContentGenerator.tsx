
import React, { useState, useEffect } from 'react';
import { generateFullAIPost, generateSocialKit } from '../services/gemini.ts';
import { publishPostToBlogger } from '../services/blogger.ts';

const BloggerContentGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [socialKit, setSocialKit] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem('blogger_access_token') || '');
  const [publishStatus, setPublishStatus] = useState<{success: boolean, message: string} | null>(null);

  const blogId = localStorage.getItem('baseera_blog_id') || '3419581055091564415';

  useEffect(() => {
    if (accessToken) localStorage.setItem('blogger_access_token', accessToken);
  }, [accessToken]);

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    setPublishStatus(null);
    setSocialKit(null);
    
    // توليد المقال والسوشيال كيت بالتوازي لسرعة الأداء
    const [articleResult, kitResult] = await Promise.all([
      generateFullAIPost(topic),
      generateSocialKit(topic, "مقال استراتيجي جديد")
    ]);

    if (articleResult) {
      setPostTitle(articleResult.title);
      const fullHtml = `
<div class="tosh5-article" dir="rtl" style="font-family: 'Tajawal', sans-serif; line-height: 1.8; color: #1e293b;">
  <h2 style="font-size: 32px; font-weight: 900; color: #2563eb; margin-bottom: 25px; border-right: 8px solid #2563eb; padding-right: 20px;">${articleResult.title}</h2>
  
  <div style="background: #f1f5f9; padding: 25px; border-radius: 20px; border: 1px dashed #cbd5e1; margin-bottom: 30px;">
    <p style="font-size: 18px; font-weight: 700; color: #475569; margin: 0;">ملخص استراتيجي: ${articleResult.excerpt}</p>
  </div>

  <div class="article-body" style="font-size: 19px; color: #334155; text-align: justify;">
    ${articleResult.content.split('\n').map(line => line.trim() ? `<p style="margin-bottom: 20px;">${line}</p>` : '').join('')}
  </div>

  <div style="margin-top: 50px; padding: 30px; background: #020617; border-radius: 30px; color: white; text-align: center;">
    <h4 style="font-weight: 900; margin-bottom: 10px; color: #3b82f6;">💡 نصيحة الخبير من بصيرة PRO</h4>
    <p style="font-size: 15px; opacity: 0.8;">تأكد من مشاركة هذا المقال في منصات التواصل الاجتماعي لزيادة معدل الارتباط والزحف.</p>
  </div>
</div>`;
      setHtmlContent(fullHtml);
    }
    
    if (kitResult) {
      setSocialKit(kitResult);
    }
    
    setIsGenerating(false);
  };

  const handlePublishDirectly = async () => {
    if (!accessToken) {
      setPublishStatus({ success: false, message: "يرجى إدخال Access Token للنشر المباشر" });
      return;
    }
    setIsPublishing(true);
    setPublishStatus(null);
    try {
      const response = await publishPostToBlogger(blogId, postTitle, htmlContent, accessToken);
      setPublishStatus({ success: true, message: `تم النشر بنجاح! رابط المقال: ${response.url}` });
      window.open(response.url, '_blank');
    } catch (error: any) {
      setPublishStatus({ success: false, message: error.message || "حدث خطأ غير متوقع" });
    }
    setIsPublishing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('تم نسخ المحتوى المخصص! 🚀');
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-[4rem] p-12 text-right space-y-12 shadow-5xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-10 relative z-10">
        <div className="space-y-4">
          <h3 className="text-4xl font-black text-white italic underline decoration-blue-600 underline-offset-[12px]">محرك الإطلاق الشامل 🚀</h3>
          <p className="text-slate-500 font-bold max-w-xl">أدخل فكرتك، وسيقوم السرب بصناعة المقال + حزمة الانتشار الاجتماعي لـ 7 منصات فوراً.</p>
        </div>
        
        <div className="flex gap-4 w-full lg:w-auto">
          <input 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="اكتب فكرة المقال والحملة..."
            className="flex-1 lg:w-[400px] bg-black/40 border border-white/10 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-blue-600 transition-all shadow-inner"
          />
          <button 
            onClick={handleGenerate}
            disabled={isGenerating || !topic}
            className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-4xl disabled:opacity-50"
          >
            {isGenerating ? 'جاري بناء الحملة..' : 'إطلاق السرب ✨'}
          </button>
        </div>
      </div>

      {htmlContent && (
        <div className="space-y-16 animate-in fade-in zoom-in duration-700 relative z-10">
          
          {/* Social Package View */}
          {socialKit && (
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                 <span className="w-12 h-12 bg-rose-600 rounded-2xl flex items-center justify-center text-2xl">📱</span>
                 <h4 className="text-2xl font-black text-white">حزمة الانتشار الاجتماعي الجاهزة</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { id: 'x', name: '𝕏 تويتر', content: socialKit.x, color: 'bg-black' },
                   { id: 'instagram', name: '📸 إنستغرام', content: socialKit.instagram, color: 'bg-rose-600' },
                   { id: 'tiktok', name: '🎬 تيك توك', content: socialKit.tiktok, color: 'bg-slate-800' },
                   { id: 'linkedin', name: '💼 لينكدإن', content: socialKit.linkedin, color: 'bg-blue-800' }
                 ].map(item => (
                   <div key={item.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col group hover:bg-white/10 transition-all">
                      <div className={`${item.color} text-[10px] font-black text-white px-4 py-1.5 rounded-full mb-4 text-center uppercase`}>{item.name}</div>
                      <p className="text-xs text-slate-400 italic mb-6 line-clamp-4 leading-relaxed">{item.content}</p>
                      <button onClick={() => copyToClipboard(item.content)} className="mt-auto py-3 bg-white/10 hover:bg-white hover:text-black rounded-xl text-[10px] font-black transition-all">نسخ المحتوى 📋</button>
                   </div>
                 ))}
              </div>
            </div>
          )}

          {/* Blogger Access Config & Action */}
          <div className="bg-blue-600/10 p-10 rounded-[3.5rem] border border-blue-500/20 space-y-8 shadow-4xl">
             <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div>
                   <h4 className="text-xl font-black text-white mb-2">جسر النشر السيادي 📡</h4>
                   <p className="text-blue-400 text-xs font-bold">ارفع المقال الآن إلى <span className="text-white italic">tosh5.shop</span> بلمسة واحدة.</p>
                </div>
                <div className="flex gap-4 w-full lg:w-auto">
                   <input 
                      type="password"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="Access Token..."
                      className="flex-1 lg:w-64 bg-black/60 border border-white/5 rounded-2xl px-6 py-4 text-xs text-blue-300 font-mono outline-none"
                   />
                   <button 
                     onClick={handlePublishDirectly}
                     disabled={isPublishing || !accessToken}
                     className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl disabled:opacity-50"
                   >
                     {isPublishing ? 'جاري الرفع...' : 'نشر فوري لبلوجر 🚀'}
                   </button>
                </div>
             </div>
             {publishStatus && (
               <div className={`p-6 rounded-2xl text-sm font-bold animate-pulse text-center ${publishStatus.success ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                 {publishStatus.message}
               </div>
             )}
          </div>
          
          {/* Article Code & Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-4">
                <div className="flex justify-between px-4">
                   <label className="text-[10px] font-black text-slate-500 uppercase">كود المقال الماسي (HTML)</label>
                   <button onClick={() => copyToClipboard(htmlContent)} className="text-blue-500 text-[10px] font-black hover:underline">نسخ الكود 📋</button>
                </div>
                <div className="bg-black/80 rounded-[3rem] p-10 h-[500px] overflow-y-auto font-mono text-[10px] text-blue-400/80 border border-white/5 dir-ltr shadow-inner">
                   {htmlContent}
                </div>
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-500 uppercase px-4">معاينة العرض النهائي</label>
                <div className="bg-white rounded-[3.5rem] p-12 h-[500px] overflow-y-auto border-8 border-slate-900 shadow-5xl shadow-blue-500/10">
                   <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloggerContentGenerator;
