
import React, { useContext } from 'react';
import { DeviceReport, ReportBadge } from '../types';
import { LanguageContext } from '../App';

const MOCK_REPORT: DeviceReport = {
  id: 'rep_8832a1',
  certificateId: 'PG-2024-X99-0042',
  timestamp: new Date().toISOString(),
  fingerprint: 'sha256:778f...9912',
  sellerName: 'ProTech Solutions',
  verificationStatus: 'verified',
  system: {
    manufacturer: 'Razer Inc.',
    model: 'Blade 15 Advanced (2022)',
    os: 'Windows 11 Pro 23H2',
    serial: 'BY2205P11002234',
  },
  cpu: {
    model: 'Intel Core i9-12900H',
    cores: 14,
    clockSpeed: '5.00 GHz',
    peakTemp: 78,
    healthScore: 98,
  },
  gpu: {
    model: 'NVIDIA GeForce RTX 3080 Ti',
    vram: '16 GB GDDR6X',
    driverVersion: '551.23',
    stressTestResult: 'Pass (99.2% Stability)',
  },
  memory: {
    capacity: '32 GB',
    speed: '4800 MHz',
    type: 'DDR5',
    slotUsage: '2/2 Slots Used',
  },
  storage: {
    model: 'Samsung 980 Pro 1TB',
    type: 'NVMe Gen4',
    healthPercent: 96,
    powerOnHours: 1240,
    totalWrites: '45.2 TBW',
  },
  battery: {
    designCapacity: 80000,
    fullChargeCapacity: 74200,
    wearLevel: 7.2,
    cycleCount: 142,
    status: 'Good',
  }
};

const certTranslations: Record<string, Record<string, string>> = {
  en: {
    heroTitle1: 'Hardware',
    heroTitle2: 'Gold Standard.',
    heroDesc: 'This system has been independently verified by the ProGrade Agent. No manual entries. Pure telemetry.',
    authentic: 'Authentic Certificate',
    verificationId: 'Verification ID',
    processor: 'Processor',
    graphics: 'Graphics',
    memory: 'Memory',
    storage: 'Storage',
    powerReport: 'Power Report',
    wearLevel: 'Wear Level',
    cycleCount: 'Cycle Count',
    capacity: 'Capacity',
    deviceIdentity: 'Device Identity',
    perfHealth: 'Performance Health',
    driveHealth: 'Drive Health',
  },
  ar: {
    heroTitle1: 'عتاد',
    heroTitle2: 'المعيار الذهبي.',
    heroDesc: 'تم التحقق من هذا النظام بشكل مستقل بواسطة عميل ProGrade. لا توجد إدخالات يدوية. بيانات تيليمتري حقيقية.',
    authentic: 'شهادة أصلية',
    verificationId: 'رقم التحقق',
    processor: 'المعالج',
    graphics: 'البطاقة الرسومية',
    memory: 'الذاكرة',
    storage: 'التخزين',
    powerReport: 'تقرير الطاقة',
    wearLevel: 'مستوى التآكل',
    cycleCount: 'عدد الدورات',
    capacity: 'السعة',
    deviceIdentity: 'هوية الجهاز',
    perfHealth: 'صحة الأداء',
    driveHealth: 'صحة القرص',
  }
};

export const CertificatePage: React.FC = () => {
  const { lang } = useContext(LanguageContext);
  const ct = (key: string) => certTranslations[lang][key] || key;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl mb-8 p-8 md:p-12 border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
        <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} p-6`}>
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full text-green-500 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {ct('authentic')}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className={`flex-1 text-center ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
              {ct('heroTitle1')} <br /><span className="text-green-500">{ct('heroTitle2')}</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-8 max-w-lg">
              {ct('heroDesc')}
            </p>
            <div className={`flex flex-wrap gap-3 justify-center ${lang === 'ar' ? 'md:justify-start flex-row-reverse' : 'md:justify-start'}`}>
              <Badge type={lang === 'ar' ? 'المعيار الذهبي' : ReportBadge.GOLD} />
              <Badge type={lang === 'ar' ? 'بطارية مثالية' : ReportBadge.BATTERY_EXCELLENT} />
              <Badge type={lang === 'ar' ? 'قرص موثق' : ReportBadge.STORAGE_VERIFIED} />
            </div>
          </div>
          
          <div className="w-64 h-64 relative group">
            <div className="absolute inset-0 bg-green-500 rounded-3xl blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="relative glass rounded-3xl p-4 border border-zinc-700 h-full flex flex-col items-center justify-center text-center">
               <img 
                 src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://app.prograde.com/cert/rep_8832a1" 
                 alt="QR Code" 
                 className="w-32 h-32 mb-4 invert brightness-200"
               />
               <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{ct('verificationId')}</p>
               <p className="text-sm font-mono text-zinc-300">{MOCK_REPORT.certificateId}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Components */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SpecCard 
            title={ct('processor')} 
            value={MOCK_REPORT.cpu.model} 
            subtitle={`${MOCK_REPORT.cpu.cores} ${lang === 'ar' ? 'نواة' : 'Cores'} @ ${MOCK_REPORT.cpu.clockSpeed}`}
            icon={<CpuIcon />}
            extra={<HealthBar value={MOCK_REPORT.cpu.healthScore} label={ct('perfHealth')} />}
          />
          <SpecCard 
            title={ct('graphics')} 
            value={MOCK_REPORT.gpu.model} 
            subtitle={MOCK_REPORT.gpu.vram}
            icon={<GpuIcon />}
            extra={<div className="text-xs text-green-400 font-bold uppercase mt-2">{lang === 'ar' ? 'اجتاز (استقرار 99.2٪)' : MOCK_REPORT.gpu.stressTestResult}</div>}
          />
          <SpecCard 
            title={ct('memory')} 
            value={MOCK_REPORT.memory.capacity} 
            subtitle={`${MOCK_REPORT.memory.type} ${MOCK_REPORT.memory.speed}`}
            icon={<MemoryIcon />}
          />
          <SpecCard 
            title={ct('storage')} 
            value={MOCK_REPORT.storage.model} 
            subtitle={`${MOCK_REPORT.storage.totalWrites} ${lang === 'ar' ? 'مكتوب' : 'Written'}`}
            icon={<StorageIcon />}
            extra={<HealthBar value={MOCK_REPORT.storage.healthPercent} label={ct('driveHealth')} color="emerald" />}
          />
        </div>

        {/* Battery & System Side Panel */}
        <div className="flex flex-col gap-6">
          <div className="glass rounded-3xl p-6 border border-zinc-800">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-bold">{ct('powerReport')}</h3>
              <BatteryIcon className="text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">{ct('wearLevel')}</span>
                <span className="text-zinc-200 font-medium" dir="ltr">{MOCK_REPORT.battery.wearLevel}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">{ct('cycleCount')}</span>
                <span className="text-zinc-200 font-medium">{MOCK_REPORT.battery.cycleCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">{ct('capacity')}</span>
                <span className="text-zinc-200 font-medium" dir="ltr">74.2 / 80.0 Wh</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2">
                <div 
                  className="bg-green-500 h-1.5 rounded-full" 
                  style={{ width: `${100 - MOCK_REPORT.battery.wearLevel}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl p-6 border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-transparent">
             <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">{ct('deviceIdentity')}</h3>
             <div className="space-y-3 text-sm">
               <div className="flex flex-col">
                 <span className="text-zinc-500 text-xs">{lang === 'ar' ? 'الشركة المصنعة' : 'Manufacturer'}</span>
                 <span className="text-zinc-200 font-medium">{MOCK_REPORT.system.manufacturer}</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-zinc-500 text-xs">{lang === 'ar' ? 'معرف الموديل' : 'Model Identifier'}</span>
                 <span className="text-zinc-200 font-medium">{MOCK_REPORT.system.model}</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-zinc-500 text-xs">{lang === 'ar' ? 'بصمة النظام' : 'System Fingerprint'}</span>
                 <span className="text-zinc-400 font-mono text-[10px] break-all">{MOCK_REPORT.fingerprint}</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const SpecCard = ({ title, value, subtitle, icon, extra }: any) => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="glass rounded-3xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all group">
      <div className={`flex items-center gap-4 mb-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
        <div className="p-3 bg-zinc-800/50 rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{title}</p>
          <p className="text-lg font-bold text-zinc-100">{value}</p>
        </div>
      </div>
      <p className={`text-sm text-zinc-400 ${lang === 'ar' ? 'text-right' : ''}`}>{subtitle}</p>
      {extra && <div className="mt-4">{extra}</div>}
    </div>
  );
}

const HealthBar = ({ value, label, color = 'green' }: { value: number, label: string, color?: string }) => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="mt-2">
      <div className={`flex justify-between items-center mb-1 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
        <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">{label}</span>
        <span className={`text-xs font-bold text-${color}-500`} dir="ltr">{value}%</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-1">
        <div 
          className={`bg-${color}-500 h-1 rounded-full`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

const Badge = ({ type }: { type: string }) => (
  <span className="px-4 py-1.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs font-bold text-zinc-300">
    {type}
  </span>
);

// Icons
const CpuIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
);
const GpuIcon = () => (
  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 1.1.9 2 2 2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2zm4 3h8M8 14h4" /></svg>
);
const MemoryIcon = () => (
  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16m-16 5h16" /></svg>
);
const StorageIcon = () => (
  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
);
const BatteryIcon = ({ className }: { className?: string }) => (
  <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);
