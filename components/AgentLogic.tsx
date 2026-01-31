
import React from 'react';

export const AgentLogicSnippet: React.FC = () => {
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
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">The Local Agent <span className="text-green-500">Engine</span></h2>
        <p className="text-zinc-400">Extracting ground-truth data using native system commands.</p>
      </div>
      
      <div className="glass rounded-3xl overflow-hidden border border-zinc-800">
        <div className="bg-zinc-800/50 px-6 py-3 border-b border-zinc-700 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-xs font-mono text-zinc-500">diagnostic_service.js</span>
        </div>
        <pre className="p-6 text-sm md:text-base font-mono leading-relaxed overflow-x-auto text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
          <p className="text-green-500 font-bold text-xs uppercase mb-2">Command Used</p>
          <code className="text-xs text-zinc-400 bg-black p-2 rounded block">wmic path win32_battery...</code>
        </div>
        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
          <p className="text-blue-500 font-bold text-xs uppercase mb-2">Security</p>
          <p className="text-xs text-zinc-400">Uses Hardware-bound UUIDs to prevent report spoofing.</p>
        </div>
        <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
          <p className="text-purple-500 font-bold text-xs uppercase mb-2">Integrations</p>
          <p className="text-xs text-zinc-400">Connects to HWInfo API for deep thermal monitoring.</p>
        </div>
      </div>
    </div>
  );
};
