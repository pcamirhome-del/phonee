
import React, { useState, createContext } from 'react';
import { CertificatePage } from './components/Certificate';
import { ArchitectureDiagram } from './components/Architecture';
import { AgentLogicSnippet } from './components/AgentLogic';
import { PsychologyInsights } from './components/Psychology';

type Language = 'en' | 'ar';

interface TranslationContextType {
  lang: Language;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    showcase: 'The Showcase',
    architecture: 'Architecture',
    logic: 'Agent Logic',
    trust: 'Trust Factors',
    getAgent: 'Get Agent',
    goldStandard: 'Gold Standard',
    hardware: 'Hardware',
  },
  ar: {
    showcase: 'المعرض الرقمي',
    architecture: 'معمارية النظام',
    logic: 'منطق العميل',
    trust: 'عوامل الثقة',
    getAgent: 'تحميل العميل',
    goldStandard: 'المعيار الذهبي',
    hardware: 'عتاد الجهاز',
  }
};

export const LanguageContext = createContext<TranslationContextType>({
  lang: 'ar',
  t: (key) => key,
});

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cert' | 'arch' | 'logic' | 'psych'>('cert');
  const [lang, setLang] = useState<Language>('ar');

  const t = (key: string) => {
    if (!translations[lang]) return translations['en'][key] || key;
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 selection:bg-green-500/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Navigation Header */}
        <nav className="sticky top-0 z-50 glass border-b border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-black text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]">P</div>
                <span className="text-2xl font-bold tracking-tighter">PRO<span className="text-green-500">GRADE</span></span>
              </div>
              
              <div className="hidden md:flex gap-8 text-sm font-semibold">
                {(['cert', 'arch', 'logic', 'psych'] as const).map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-2 transition-all duration-300 ${activeTab === tab ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                  >
                    {t(tab === 'cert' ? 'showcase' : tab === 'arch' ? 'architecture' : tab === 'logic' ? 'logic' : 'trust')}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500 rounded-full animate-in fade-in zoom-in duration-300"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-800 transition-colors text-xs font-bold text-zinc-400 hover:text-white"
                >
                  {lang === 'en' ? 'العربية' : 'English'}
                </button>
                <button className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-green-500/10">
                  {t('getAgent')}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="transition-all duration-500 transform">
            {activeTab === 'cert' && <CertificatePage />}
            {activeTab === 'arch' && <ArchitectureDiagram />}
            {activeTab === 'logic' && <AgentLogicSnippet />}
            {activeTab === 'psych' && <PsychologyInsights />}
          </div>
        </main>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
           <div className="glass border border-zinc-800/50 p-3 rounded-2xl flex justify-around items-center shadow-2xl">
              <button onClick={() => setActiveTab('cert')} className={`p-3 rounded-xl ${activeTab === 'cert' ? 'bg-green-500/10 text-green-500' : 'text-zinc-500'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
              <button onClick={() => setActiveTab('arch')} className={`p-3 rounded-xl ${activeTab === 'arch' ? 'bg-green-500/10 text-green-500' : 'text-zinc-500'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </button>
              <button onClick={() => setActiveTab('logic')} className={`p-3 rounded-xl ${activeTab === 'logic' ? 'bg-green-500/10 text-green-500' : 'text-zinc-500'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </button>
           </div>
        </div>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
