
import React from 'react';
import { ShieldAlert, FileText, Lock, Scale } from 'lucide-react';

const Legal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-xs font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase">Compliance Department</h2>
        <h1 className="text-4xl md:text-6xl font-bold text-white uppercase">Legal Protocols</h1>
      </div>

      <div className="space-y-12">
        <section className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 text-cyan-400">
            <Lock size={24} />
            <h3 className="text-2xl font-bold uppercase tracking-tight">Privacy Protocol</h3>
          </div>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              At RenonX Security, we prioritize the integrity of your digital footprint. Our data collection is limited to strictly necessary engagement parameters.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm font-mono">
              <li>End-to-end encryption for all communication payloads.</li>
              <li>Zero-log policy for unauthorized access attempts.</li>
              <li>Metadata obfuscation for third-party network requests.</li>
            </ul>
          </div>
        </section>

        <section className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 text-purple-400">
            <Scale size={24} />
            <h3 className="text-2xl font-bold uppercase tracking-tight">Terms of Engagement</h3>
          </div>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              By accessing the RenonX Nexus, you agree to the following operational guidelines. Any attempt to breach our core kernel will result in automated counter-measures.
            </p>
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-xs font-mono">
              [SYSTEM_NOTICE]: Unauthorized penetration testing of this domain without written clearance is strictly prohibited under the Digital Defense Act.
            </div>
          </div>
        </section>

        <section className="glass p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 text-red-400">
            <ShieldAlert size={24} />
            <h3 className="text-2xl font-bold uppercase tracking-tight">Disclaimer</h3>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm">
            All security research published in the Breach Log is for educational purposes only. Zidan Mahmud and RenonX are not responsible for any misuse of the information provided within this intelligence stream.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
