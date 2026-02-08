
import React from 'react';

interface PoliciesViewProps {
  onBack: () => void;
}

const PoliciesView: React.FC<PoliciesViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in duration-700">
      <button onClick={onBack} className="mb-8 text-blue-600 font-black flex items-center gap-2"><span>→</span> العودة</button>
      
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
        <header className="mb-12 pb-8 border-b">
          <h1 className="text-4xl font-black text-slate-900 mb-4">سياسة الخصوصية لـ بصيرة PRO</h1>
          <p className="text-slate-500 font-medium">هذه الصفحة ضرورية لاستيفاء شروط Google AdSense وبرامج الإعلانات العالمية.</p>
        </header>

        <div className="prose prose-slate max-w-none space-y-8 text-right">
          <section>
            <h2 className="text-2xl font-black text-blue-600 mb-4">1. جمع المعلومات</h2>
            <p className="text-lg leading-relaxed text-slate-700 font-medium">
              نحن في بصيرة PRO نجمع معلومات معينة تلقائياً عند زيارتك للمدونة، بما في ذلك عنوان IP الخاص بك، نوع المتصفح، والصفحات التي قمت بزيارتها. نستخدم هذه البيانات لتحسين تجربة المستخدم وتحليل الأداء.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-blue-600 mb-4">2. ملفات تعريف الارتباط (Cookies)</h2>
            <p className="text-lg leading-relaxed text-slate-700 font-medium">
              تستخدم منصة بصيرة PRO ملفات تعريف الارتباط لتخزين تفضيلات الزوار، وتسجيل معلومات المستخدم حول الصفحات التي يزورها، وتخصيص محتوى صفحة الويب بناءً على نوع متصفح الزوار أو معلومات أخرى.
            </p>
          </section>

          <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <h2 className="text-2xl font-black text-blue-600 mb-4">3. إعلانات Google AdSense</h2>
            <p className="text-lg leading-relaxed text-slate-700 font-medium italic">
              "تستخدم جهات خارجية، بما في ذلك Google، ملفات تعريف الارتباط لعرض الإعلانات بناءً على زيارات المستخدم السابقة لـ بصيرة PRO أو لمواقع إلكترونية أخرى على الإنترنت."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-blue-600 mb-4">4. حقوق المستخدم</h2>
            <p className="text-lg leading-relaxed text-slate-700 font-medium">
              لك الحق في الوصول إلى بياناتك الشخصية المخزنة في بصيرة PRO أو طلب تصحيحها أو حذفها في أي وقت عبر مراسلتنا من خلال صفحة "اتصل بنا".
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliciesView;
