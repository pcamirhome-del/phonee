
import React, { useContext } from 'react';
import { LanguageContext } from '../App';

const logicTranslations: Record<string, Record<string, string>> = {
  en: {
    title: 'The Local Agent',
    accent: 'Engine',
    desc: 'Extracting ground-truth data using native system commands.',
    filename: 'diagnostic_service.js',
    cmdLabel: 'Command Used',
    secLabel: 'Security',
    secDesc: 'Uses Hardware-bound UUIDs to prevent report spoofing.',
    intLabel: 'Integrations',
    intDesc: 'Connects to HWInfo API for deep thermal monitoring.'
  },
  ar: {
    title: 'محرك العميل',
    accent: 'المحلي',
    desc: 'استخراج البيانات الحقيقية باستخدام أوامر النظام الأصلية.',
    filename: 'خدمة_التشخيص.js',
    cmdLabel: 'الأمر المستخدم',
    secLabel: 'الأمان',
    secDesc: 'استخدام معرفات UUID المرتبطة بالعتاد لمنع تزييف التقارير.',
    intLabel: 'التكاملات',
    intDesc: 'الاتصال بـ HWInfo API لمراقبة حرارية عميقة.'
  }
};

export const AgentLogicSnippet: React.FC = () => {
  const { lang } = useContext(LanguageContext);
  const lt = (key: string) => logicTranslations[lang][key] || logicTranslations['en'][key] || key;

  const code = `
// ProGrade Local Agent Logic (Node.js/Electron Example)
// Extracts Battery Health directly from Windows Shell

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function getBatteryReport() {
  try {
    // 1. Query WMIC for capacity data
    const { stdout } = await execPromise(
      'wmic path win32_battery get designcapacity, fullchargecapacity /format:list'
    );
    
    // 2. Parse the output
    const design = parseInt(stdout.match(/DesignCapacity=(\\d+)/)[1]);
    const full = parseInt(stdout.match(/FullChargeCapacity=(\\d+)/)[1]);
    
    // 3. Calculate Wear Level
    const wearLevel = ((design - full) / design * 100).toFixed(2);
    
    // 4. Send to Vercel API
    await fetch('https://app.prograde.com/api/cert/submit', {
      method: 'POST',
      body: JSON.stringify({
        deviceId: await getHWID(),
        battery: { design, full, wearLevel },
        timestamp: Date.now()
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('Cert Generated Successfully!');
  } catch (err) {
    console.error('Diagnostic Failed', err);
  }
}
  `.trim();

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-3">{lt('title')} <span className="text-green-500">{lt('accent')}</span></h2>
        <p className="text-zinc-400 text-lg">{lt('desc')}</p>
      </div>
      
      <div className="glass rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
        <div className={`bg-zinc-800/50 px-6 py-4 border-b border-zinc-700/50 flex justify-between items-center ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500/50 rounded-full"></div>
          </div>
          <span className="text-xs font-mono text-zinc-500 tracking-wider">{lt('filename')}</span>
        </div>
        <div className="p-1 overflow-hidden">
          <pre className="p-6 text-sm md:text-base font-mono leading-relaxed overflow-x-auto text-zinc-300 custom-scrollbar" dir="ltr">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-colors">
          <p className="text-green-500 font-bold text-xs uppercase mb-3 tracking-widest">{lt('cmdLabel')}</p>
          <code className="text-[11px] text-zinc-400 bg-black/50 p-3 rounded-xl block border border-zinc-800/50">wmic path win32_battery...</code>
        </div>
        <div className="p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-colors">
          <p className="text-blue-500 font-bold text-xs uppercase mb-3 tracking-widest">{lt('secLabel')}</p>
          <p className="text-sm text-zinc-400 leading-relaxed">{lt('secDesc')}</p>
        </div>
        <div className="p-6 bg-zinc-900/50 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-colors">
          <p className="text-purple-500 font-bold text-xs uppercase mb-3 tracking-widest">{lt('intLabel')}</p>
          <p className="text-sm text-zinc-400 leading-relaxed">{lt('intDesc')}</p>
        </div>
      </div>
    </div>
  );
};
