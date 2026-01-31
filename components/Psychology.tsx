
import React, { useContext } from 'react';
import { LanguageContext } from '../App';

const psychTranslations: Record<string, Record<string, string>> = {
  en: {
    mainTitle: 'Engineered for',
    mainTitleAccent: 'Instant Trust.',
    t1Title: 'Tamper-Proof Timestamp',
    t1Desc: 'The certificate displays a clear "Scan Date" that is cryptographically linked to the hardware ID. Buyers know the report wasn\'t generated months ago and reused.',
    t2Title: 'Manufacturer Benchmarking',
    t2Desc: 'We don\'t just show stats; we compare them. "This CPU is performing in the 95th percentile of all i9-12900Hs" provides a frame of reference that builds confidence.',
    t3Title: 'Verification Badges',
    t3Desc: 'Visual cues like "Gold Standard" and "Verified SSD" trigger a psychological shortcut. They categorize complex technical data into simple "Trust Tiers".',
    quote: '"ProGrade transforms \'Trust me, I took care of it\' into \'The hardware proves itself\'."'
  },
  ar: {
    mainTitle: 'مصمم لتعزيز',
    mainTitleAccent: 'الثقة الفورية.',
    t1Title: 'طابع زمني مقاوم للتلاعب',
    t1Desc: 'تعرض الشهادة "تاريخ فحص" واضح مرتبط كودياً بهوية العتاد. يعلم المشترون أن التقرير لم يتم إنشاؤه قبل أشهر وإعادة استخدامه.',
    t2Title: 'مقارنة معايير المصنع',
    t2Desc: 'نحن لا نعرض الإحصائيات فحسب، بل نقارنها. "هذا المعالج يعمل بكفاءة أعلى من ٩٥٪ من فئته" يوفر مرجعاً يبني الثقة.',
    t3Title: 'شارات التحقق الرقمي',
    t3Desc: 'الإشارات المرئية مثل "المعيار الذهبي" تعمل كاختصار نفسي. فهي تصنف البيانات التقنية المعقدة إلى "مستويات ثقة" بسيطة.',
    quote: '"ProGrade يحول عبارة \'ثق بي، لقد اعتنيت به\' إلى \'العتاد يثبت نفسه بنفسه\'."'
  }
};

export const PsychologyInsights: React.FC = () => {
  const { lang } = useContext(LanguageContext);
  const pt = (key: string) => psychTranslations[lang][key] || key;

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <h2 className="text-3xl font-bold mb-8 text-center">{pt('mainTitle')} <span className="text-green-500">{pt('mainTitleAccent')}</span></h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-3xl border border-zinc-800 hover:neon-border transition-all">
          <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-4">{pt('t1Title')}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {pt('t1Desc')}
          </p>
        </div>

        <div className="glass p-8 rounded-3xl border border-zinc-800 hover:neon-border transition-all">
          <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-4">{pt('t2Title')}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {pt('t2Desc')}
          </p>
        </div>

        <div className="glass p-8 rounded-3xl border border-zinc-800 hover:neon-border transition-all">
          <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-xl font-bold mb-4">{pt('t3Title')}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {pt('t3Desc')}
          </p>
        </div>
      </div>

      <div className="mt-12 glass p-8 rounded-3xl border border-zinc-800 bg-gradient-to-r from-green-500/5 to-transparent text-center">
        <p className="text-zinc-300 italic">
          {pt('quote')}
        </p>
      </div>
    </div>
  );
};
