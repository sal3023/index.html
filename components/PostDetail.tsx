
import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../types.ts';
import { generatePostSummary, deepStrategicAnalysis, generateSocialKit } from '../services/gemini.ts';

interface PostDetailProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onPostNavigate: (id: string) => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const [summary, setSummary] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [socialKit, setSocialKit] = useState<any>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.id]);

  const handleMagicAnalysis = async () => {
    setLoading(true);
    const summaryRes = await generatePostSummary(post.content);
    const analysisRes = await deepStrategicAnalysis(post.content);
    const kit = await generateSocialKit(post.title, post.excerpt);
    setSummary(summaryRes || '');
    setAnalysis(analysisRes || '');
    setSocialKit(kit);
    setLoading(false);
  };

  const getPlatformUrl = (platform: string, content: string) => {
    const url = encodeURIComponent(`https://www.tosh5.shop`);
    const text = encodeURIComponent(content);

    switch(platform) {
      case 'x': return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
      case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'linkedin': return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      case 'whatsapp': return `https://api.whatsapp.com/send?text=${text}%20${url}`;
      case 'telegram': return `https://t.me/share/url?url=${url}&text=${text}`;
      case 'pinterest': return `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
      case 'instagram': return `https://www.instagram.com/`; 
      case 'tiktok': return `https://www.tiktok.com/upload`; 
      default: return '#';
    }
  };

  const handleShare = (platform: string) => {
    const content = socialKit ? (socialKit[platform] || post.title) : post.title;
    const shareUrl = getPlatformUrl(platform, content);
    if (shareUrl !== '#') window.open(shareUrl, '_blank');
  };

  const handleBroadcastAll = async () => {
    setIsBroadcasting(true);
    let currentKit = socialKit;
    
    // تأكد من وجود المحتوى المولد قبل البدء
    if (!currentKit) {
      currentKit = await generateSocialKit(post.title, post.excerpt);
      setSocialKit(currentKit);
    }

    if (currentKit) {
      // كافة المنصات الـ 8 المطلوبة
      const platforms = ['x', 'facebook', 'linkedin', 'whatsapp', 'telegram', 'pinterest', 'instagram', 'tiktok'];
      
      platforms.forEach((p, index) => {
        // نستخدم تأخير زمني بسيط لتفادي حظر النوافذ المنبثقة التلقائي في بعض المتصفحات
        setTimeout(() => {
          const content = currentKit[p] || post.title;
          const url = getPlatformUrl(p, content);
          window.open(url, '_blank');
        }, index * 500);
      });

      alert('🚀 تم تفعيل بروتوكول البث الشامل! يتم الآن فتح 8 منصات اجتماعية بنصوص مخصصة.');
    } else {
      alert('❌ فشل في توليد حزمة البث. يرجى المحاولة لاحقاً.');
    }
    
    setIsBroadcasting(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-32 animate-in fade-in duration-1000 text-right">
      <div className="fixed top-0 left-0 w-full h-2 z-[200] bg-slate-100 dark:bg-white/10">
        <div className="h-full bg-blue-600 transition-all duration-100 shadow-[0_0_15px_#2563eb]" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <button onClick={onBack} className="mb-16 text-slate-400 font-black flex items-center gap-6 hover:text-blue-600 transition-all group">
        <span className="group-hover:translate-x-3 transition-transform">→</span> العودة للقيادة المركزية
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-16">
          <header className="space-y-8">
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-4">
               <button 
                 onClick={handleMagicAnalysis} 
                 disabled={loading} 
                 className="px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl hover:bg-slate-950 transition-all shadow-xl active:scale-95 disabled:opacity-50"
               >
                 {loading ? 'جاري استدعاء السرب...' : '✨ تفعيل تحليل السرب'}
               </button>
               
               <button 
                 onClick={handleBroadcastAll} 
                 disabled={isBroadcasting} 
                 className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-4xl active:scale-95 disabled:opacity-50 flex items-center gap-3"
               >
                 {isBroadcasting ? 'جاري البث الشامل...' : '📡 البث السيادي الشامل (8 منصات)'}
               </button>
            </div>
          </header>

          <div className="rounded-[4rem] overflow-hidden aspect-[16/9] shadow-4xl border-[12px] border-white dark:border-slate-800">
            <img src={post.image} className="w-full h-full object-cover" alt="" />
          </div>

          <div className="prose prose-2xl dark:prose-invert max-w-none">
             <div className="text-2xl md:text-3xl leading-[2] text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap">
               {post.content}
             </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-12">
           <div className="sticky top-32 space-y-8">
              {/* Omni-Social Broadcast Block */}
              <div className="bg-slate-900 border border-white/10 rounded-[3rem] p-10 space-y-8 shadow-4xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[80px] opacity-20"></div>
                 <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">مركز البث الموحد 📡</h4>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleShare('x')} className="py-4 bg-black text-white rounded-2xl font-black text-[10px] flex items-center justify-center gap-2 border border-white/5 hover:bg-slate-800 transition-all">𝕏 X</button>
                    <button onClick={() => handleShare('facebook')} className="py-4 bg-[#1877F2] text-white rounded-2xl font-black text-[10px] hover:opacity-90 transition-all">Facebook</button>
                    <button onClick={() => handleShare('linkedin')} className="py-4 bg-[#0077B5] text-white rounded-2xl font-black text-[10px] hover:opacity-90 transition-all">LinkedIn</button>
                    <button onClick={() => handleShare('whatsapp')} className="py-4 bg-[#25D366] text-white rounded-2xl font-black text-[10px] hover:opacity-90 transition-all">WhatsApp</button>
                    <button onClick={() => handleShare('telegram')} className="py-4 bg-[#26A5E4] text-white rounded-2xl font-black text-[10px] hover:opacity-90 transition-all">Telegram</button>
                    <button onClick={() => handleShare('pinterest')} className="py-4 bg-[#BD081C] text-white rounded-2xl font-black text-[10px] hover:opacity-90 transition-all">Pinterest</button>
                    <button onClick={() => handleShare('instagram')} className="py-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white rounded-2xl font-black text-[10px] hover:opacity-90 transition-all">Instagram</button>
                    <button onClick={() => handleShare('tiktok')} className="py-4 bg-black text-white rounded-2xl font-black text-[10px] border border-white/20 hover:opacity-90 transition-all">TikTok</button>
                 </div>

                 <button 
                   onClick={handleBroadcastAll}
                   disabled={isBroadcasting}
                   className="w-full py-5 bg-white text-black rounded-2xl font-black text-xs hover:bg-blue-600 hover:text-white transition-all shadow-xl disabled:opacity-50"
                 >
                   إطلاق البث الشامل لـ 8 منصات 🚀
                 </button>

                 {socialKit && (
                   <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5 animate-in fade-in">
                      <p className="text-[10px] text-slate-500 font-bold mb-3 uppercase tracking-widest">حالة الذكاء الاصطناعي:</p>
                      <p className="text-xs text-blue-300 italic leading-relaxed">"تم تجهيز 8 نصوص فريدة لهويتك الرقمية."</p>
                   </div>
                 )}
              </div>

              {/* AI Summary Block */}
              {summary && (
                <div className="bg-blue-600 rounded-[3rem] p-10 text-white shadow-4xl animate-in slide-in-from-right-10">
                   <h4 className="text-xs font-black uppercase mb-4 opacity-70 tracking-widest">ملخص بصيرة الاستراتيجي</h4>
                   <p className="text-lg font-bold italic leading-relaxed">{summary}</p>
                </div>
              )}

              {/* Strategic Analysis Block */}
              {analysis && (
                <div className="bg-slate-800 rounded-[3rem] p-10 text-white shadow-4xl animate-in slide-in-from-right-15 border border-white/5">
                   <h4 className="text-xs font-black uppercase mb-4 opacity-70 tracking-widest text-emerald-400">تحليل العمق الاستراتيجي</h4>
                   <p className="text-sm font-medium opacity-80 leading-loose whitespace-pre-wrap">{analysis}</p>
                </div>
              )}
           </div>
        </aside>
      </div>
    </div>
  );
};

export default PostDetail;
