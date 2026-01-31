
import React, { useState, createContext, useContext } from 'react';
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
  lang: 'en',
  t: (key) => key,
});

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cert' | 'arch' | 'logic' | 'psych'>('cert');
  const [lang, setLang] = useState<Language>('ar');

  const t = (key: string) => translations[lang][key] || key;

  return (
    <LanguageContext.Provider value={{ lang, t }}>
      <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {/* Navigation Header */}
        <nav className="sticky top-0 z-50 glass border-b border-zinc-800/50 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black text-black">P</div>
                <span className="text-xl font-bold tracking-tighter">PRO<span className="text-green-500">GRADE</span></span>
              </div>
              <div className="hidden md:flex gap-6 text-sm font-medium">
                <button 
                  onClick={() => setActiveTab('cert')}
                  className={`transition-colors ${activeTab === 'cert' ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                >
                  {t('showcase')}
                </button>
                <button 
                  onClick={() => setActiveTab('arch')}
                  className={`transition-colors ${activeTab === 'arch' ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                >
                  {t('architecture')}
                </button>
                <button 
                  onClick={() => setActiveTab('logic')}
                  className={`transition-colors ${activeTab === 'logic' ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                >
                  {t('logic')}
                </button>
                <button 
                  onClick={() => setActiveTab('psych')}
                  className={`transition-colors ${activeTab === 'psych' ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
                >
                  {t('trust')}
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                  className="text-xs font-bold border border-zinc-700 px-3 py-1 rounded-md hover:bg-zinc-800 transition-colors"
                >
                  {lang === 'en' ? 'العربية' : 'English'}
                </button>
                <button className="bg-zinc-100 text-black px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-white transition-all shadow-lg shadow-green-500/10">
                  {t('getAgent')}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'cert' && <CertificatePage />}
          {activeTab === 'arch' && <ArchitectureDiagram />}
          {activeTab === 'logic' && <AgentLogicSnippet />}
          {activeTab === 'psych' && <PsychologyInsights />}
        </main>

        {/* Footer Mobile Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-zinc-800 p-4 flex justify-around">
          <button onClick={() => setActiveTab('cert')} className={activeTab === 'cert' ? 'text-green-500' : 'text-zinc-400'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          <button onClick={() => setActiveTab('arch')} className={activeTab === 'arch' ? 'text-green-500' : 'text-zinc-400'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </button>
          <button onClick={() => setActiveTab('logic')} className={activeTab === 'logic' ? 'text-green-500' : 'text-zinc-400'}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </button>
        </div>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;
