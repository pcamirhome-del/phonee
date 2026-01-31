
import React, { useContext } from 'react';
import { LanguageContext } from '../App';

// Fix: Update type definition to allow values to be either string or string[]
const archTranslations: Record<string, Record<string, string | string[]>> = {
  en: {
    title: 'System Architecture:',
    subtitle: 'The Trust Bridge',
    step1Title: '1. Local Agent (Tauri/Rust)',
    step1Desc: 'Lightweight binary runs directly on the machine. Executes ring-0 diagnostics via PowerShell & WMIC. Generates a unique Hardware Fingerprint hash.',
    step2Title: '2. Secure API Gateway',
    step2Desc: 'Vercel Edge Functions authenticate the request using a one-time signing key. Validates the hardware hash to ensure the JSON wasn\'t tampered with mid-transit.',
    step3Title: '3. Public Ledger',
    step3Desc: 'Data is persisted in Supabase. A unique, immutable Vercel URL is generated. The QR code links directly to this "Source of Truth" for potential buyers.',
    whyTauri: 'Why Tauri + Rust?',
    whyTauriItems: [
      'Tiny Binary: ~5MB executable for instant download.',
      'No Bloat: Uses native OS webviews instead of Chromium.',
      'Low Level Access: Rust can interface directly with system drivers for accurate thermals.'
    ],
    zeroTrust: 'Zero-Trust Data Pipeline',
    zeroTrustItems: [
      'Hardware Signing: Each report is HMAC-signed by the agent.',
      'Rate Limiting: Prevents bots from flooding the certificate registry.',
      'Expiration: Certificates expire after 90 days to maintain data freshness.'
    ]
  },
  ar: {
    title: 'معمارية النظام:',
    subtitle: 'جسر الثقة الرقمي',
    step1Title: '١. عميل محلي (Tauri/Rust)',
    step1Desc: 'برنامج خفيف يعمل مباشرة على الجهاز. ينفذ تشخيصات من المستوى صفر (ring-0) عبر PowerShell. يولد بصمة عتاد فريدة.',
    step2Title: '٢. بوابة API آمنة',
    step2Desc: 'وظائف Vercel Edge تتحقق من الطلب باستخدام مفتاح توقيع لمرة واحدة. تضمن عدم التلاعب بالبيانات أثناء النقل.',
    step3Title: '٣. السجل العام',
    step3Desc: 'يتم حفظ البيانات في Supabase. يتم إنشاء رابط Vercel فريد وغير قابل للتغيير. رمز QR يربط مباشرة بـ "مصدر الثقة".',
    whyTauri: 'لماذا تقنية Tauri + Rust؟',
    whyTauriItems: [
      'حجم صغير: ملف تنفيذي بحجم ٥ ميجابايت للتحميل السريع.',
      'بدون إضافات: يستخدم محركات عرض النظام الأصلية بدلاً من Chromium.',
      'وصول منخفض المستوى: تتوصل Rust مباشرة مع تعريفات النظام لقياس حراري دقيق.'
    ],
    zeroTrust: 'خط بيانات "انعدام الثقة"',
    zeroTrustItems: [
      'توقيع العتاد: كل تقرير موقع كودياً بواسطة العميل.',
      'تحديد المعدل: يمنع الروبوتات من إغراق سجل الشهادات.',
      'تاريخ الصلاحية: تنتهي الشهادات بعد ٩٠ يوماً لضمان حداثة البيانات.'
    ]
  }
};

export const ArchitectureDiagram: React.FC = () => {
  const { lang } = useContext(LanguageContext);
  // Fix: Explicitly cast to string for the 'at' helper to satisfy JSX types
  const at = (key: string) => (archTranslations[lang][key] as string) || key;
  // Fix: The 'list' helper already handled casting but can now rely on the union type
  const list = (key: string) => archTranslations[lang][key] as unknown as string[];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="glass rounded-3xl p-8 border border-zinc-800 mb-12">
        <h2 className="text-3xl font-bold mb-8">{at('title')} <span className="text-green-500">{at('subtitle')}</span></h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center relative">
          {/* Step 1: Local Agent */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/10">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-bold text-xl mb-2">{at('step1Title')}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {at('step1Desc')}
            </p>
          </div>

          {/* Connector 1 */}
          <div className={`hidden lg:block absolute ${lang === 'ar' ? 'right-1/3 rotate-180' : 'left-1/3'} top-10 w-1/4 h-px bg-gradient-to-r from-green-500/50 to-transparent`}></div>

          {/* Step 2: Secure Tunnel */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-500/20 border border-blue-500/40 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="font-bold text-xl mb-2">{at('step2Title')}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {at('step2Desc')}
            </p>
          </div>

          {/* Connector 2 */}
          <div className={`hidden lg:block absolute ${lang === 'ar' ? 'left-1/3 rotate-180' : 'right-1/3'} top-10 w-1/4 h-px bg-gradient-to-l from-green-500/50 to-transparent`}></div>

          {/* Step 3: Global Registry */}
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-purple-500/20 border border-purple-500/40 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/10">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            </div>
            <h3 className="font-bold text-xl mb-2">{at('step3Title')}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {at('step3Desc')}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-6 rounded-3xl border border-zinc-800">
          <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {at('whyTauri')}
          </h4>
          <ul className={`space-y-3 text-sm text-zinc-400 ${lang === 'ar' ? 'text-right' : ''}`}>
            {list('whyTauriItems').map((item, i) => <li key={i}>• {item}</li>)}
          </ul>
        </div>
        <div className="glass p-6 rounded-3xl border border-zinc-800">
          <h4 className={`text-lg font-bold mb-4 flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {at('zeroTrust')}
          </h4>
          <ul className={`space-y-3 text-sm text-zinc-400 ${lang === 'ar' ? 'text-right' : ''}`}>
            {list('zeroTrustItems').map((item, i) => <li key={i}>• {item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
