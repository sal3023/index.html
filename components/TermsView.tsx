
import React from 'react';

interface TermsViewProps {
  onBack: () => void;
}

const TermsView: React.FC<TermsViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 animate-in fade-in duration-700 text-right">
      <button onClick={onBack} className="mb-8 text-blue-600 font-black flex items-center gap-2"><span>→</span> العودة</button>
      
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100">
        <header className="mb-12 pb-8 border-b">
          <h1 className="text-4xl font-black text-slate-900 mb-4">الشروط والأحكام لـ بصيرة PRO</h1>
          <p className="text-slate-500 font-medium">يرجى قراءة شروط استخدام المنصة بعناية لضمان حقوق الجميع.</p>
        </header>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-black text-blue-600 mb-4">1. قبول الشروط</h2>
            <p className="text-lg leading-relaxed text-slate-700 font-medium">
              باستخدامك لمنصة بصيرة PRO، فإنك توافق تماماً على الالتزام بهذه الشروط والأحكام والقوانين المحلية المعمول بها في مكان الاستخدام.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-blue-600 mb-4">2. الملكية الفكرية</h2>
            <p className="text-lg leading-relaxed text-slate-700 font-medium">
              كافة المحتويات المنشورة على منصة بصيرة PRO من مقالات، صور، وتصاميم هي ملكية فكرية حصرية للمنصة ولا يجوز إعادة نشرها دون إذن خطي مسبق.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-blue-600 mb-4">3. سلوك المستخدم</h2>
            <p className="text-lg leading-relaxed text-slate-700 font-medium">
              يُمنع استخدام بصيرة PRO في أي غرض غير قانوني أو نشر تعليقات مسيئة أو محاولة اختراق البنية التحتية السحابية للموقع. نحن نحتفظ بالحق في حظر أي مستخدم ينتهك هذه القواعد.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-blue-600 mb-4">4. إخلاء المسؤولية</h2>
            <p className="text-lg leading-relaxed text-slate-700 font-medium">
              المعلومات المقدمة في بصيرة PRO هي للأغراض التثقيفية فقط. نحن لا نقدم ضمانات بشأن دقة أو اكتمال المعلومات المنشورة وننصح دائماً باستشارة الخبراء المتخصصين قبل اتخاذ قرارات مالية أو تقنية.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsView;
