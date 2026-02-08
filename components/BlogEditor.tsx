
import React, { useState } from 'react';
import { Post } from '../types.ts';
import { generateImageForPost } from '../services/gemini.ts';

interface BlogEditorProps {
  postToEdit?: Post | null;
  onSave: (post: Post) => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ postToEdit, onSave, onCancel }) => {
  const [loadingImg, setLoadingImg] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    title: postToEdit?.title || '',
    category: postToEdit?.category || 'تقنية',
    content: postToEdit?.content || '',
    image: postToEdit?.image || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
    seoTitle: postToEdit?.seoTitle || '',
    seoDescription: postToEdit?.seoDescription || '',
    affiliateLink: postToEdit?.affiliateLink || ''
  });

  const handleGenerateImage = async () => {
    if (!formData.title) {
      alert("يرجى كتابة عنوان أولاً لتوليد صورة مناسبة.");
      return;
    }
    setLoadingImg(true);
    const imgData = await generateImageForPost(formData.title);
    if (imgData) setFormData({ ...formData, image: imgData });
    setLoadingImg(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("يرجى إكمال الحقول الأساسية.");
      return;
    }

    const newPost: Post = {
      ...formData,
      id: postToEdit ? postToEdit.id : Date.now().toString(),
      excerpt: formData.content.slice(0, 150) + '...',
      author: 'المسؤول الاستراتيجي',
      date: new Date().toLocaleDateString('ar-EG'),
      readTime: `${Math.ceil(formData.content.length / 500)} دقائق`,
      views: postToEdit?.views || 0
    };
    onSave(newPost);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[4rem] shadow-4xl border border-slate-100 dark:border-white/5 animate-in fade-in zoom-in duration-500 text-right">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-black">{postToEdit ? 'تعديل التدوينة' : 'صياغة رؤية جديدة'}</h2>
        <button onClick={onCancel} className="text-slate-400 font-bold hover:text-rose-500 transition-colors">إلغاء الأمر ×</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-6">
          <input 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="عنوان المقال الرئيسي..." 
            className="w-full text-4xl md:text-6xl font-black outline-none border-b-4 border-slate-50 dark:border-white/5 focus:border-blue-600 bg-transparent pb-6 transition-all"
          />
          
          <div className="flex flex-wrap gap-4 items-center">
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="px-6 py-3 rounded-2xl bg-slate-50 dark:bg-white/5 font-black text-xs outline-none border-2 border-transparent focus:border-blue-600"
            >
              <option>تقنية</option>
              <option>أعمال</option>
              <option>استراتيجية</option>
              <option>أمن سيبراني</option>
            </select>
            
            <button 
              type="button"
              onClick={handleGenerateImage}
              disabled={loadingImg}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs hover:bg-slate-900 transition-all shadow-xl disabled:opacity-50"
            >
              {loadingImg ? 'جاري التوليد الذكي...' : 'توليد صورة الغلاف (AI) ✨'}
            </button>
          </div>
        </div>

        <textarea 
          rows={12} 
          value={formData.content}
          onChange={e => setFormData({...formData, content: e.target.value})}
          placeholder="ابدأ بكتابة أفكارك هنا..." 
          className="w-full p-8 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] outline-none text-xl leading-[1.8] font-medium border-2 border-transparent focus:border-blue-600 transition-all"
        />

        <div className="pt-6 border-t border-slate-100 dark:border-white/5">
          <button 
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-3 text-sm font-black text-slate-400 hover:text-blue-600 transition-colors"
          >
            <span>{showAdvanced ? '▼' : '▶'}</span>
            تحسين محركات البحث والمعاينة الحية (SEO)
          </button>

          {showAdvanced && (
            <div className="mt-8 space-y-8 animate-in slide-in-from-top-4">
              {/* Google Preview Emulator */}
              <div className="p-8 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border-2 border-slate-100 dark:border-white/5">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">معاينة النتيجة في Google</h4>
                <div className="max-w-xl bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-white/10 text-left dir-ltr">
                  <div className="text-[#1a0dab] text-xl font-medium hover:underline cursor-pointer mb-1 truncate">
                    {formData.seoTitle || formData.title || 'عنوان المقال سيظهر هنا'}
                  </div>
                  <div className="text-[#006621] text-sm mb-1 truncate">
                    https://baseera-pro.vercel.app › post › ...
                  </div>
                  <div className="text-[#4d5156] text-sm line-clamp-2">
                    {formData.seoDescription || 'وصف المقال الذي سيجذب الزوار من محركات البحث سيظهر هنا بشكل منسق وجذاب...'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">SEO Title</label>
                    <span className={`text-[9px] font-black ${formData.seoTitle.length > 60 ? 'text-orange-500' : 'text-slate-400'}`}>
                      {formData.seoTitle.length} / 60
                    </span>
                  </div>
                  <input 
                    type="text"
                    value={formData.seoTitle}
                    onChange={e => setFormData({...formData, seoTitle: e.target.value})}
                    placeholder="العنوان البديل لنتائج البحث"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-blue-600"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">رابط الأفيليت</label>
                  <input 
                    type="text"
                    value={formData.affiliateLink}
                    onChange={e => setFormData({...formData, affiliateLink: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Meta Description</label>
                  <span className={`text-[9px] font-black ${formData.seoDescription.length > 160 ? 'text-orange-500' : 'text-slate-400'}`}>
                    {formData.seoDescription.length} / 160
                  </span>
                </div>
                <textarea 
                  rows={3}
                  value={formData.seoDescription}
                  onChange={e => setFormData({...formData, seoDescription: e.target.value})}
                  placeholder="وصف مختصر للمقال (سيظهر في Google)"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-transparent rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:border-blue-600"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-6">
          <button 
            type="submit" 
            className="flex-1 bg-slate-950 dark:bg-blue-600 text-white py-6 rounded-3xl font-black text-xl hover:scale-[1.02] transition-all shadow-3xl"
          >
            إطلاق المقال للاستراتيجية 📡
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
