
import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Shield, Server, Zap, Lock, Globe, Database } from 'lucide-react';
import { INITIAL_SETTINGS } from '../constants';
import { Settings } from '../types';

const Company: React.FC = () => {
  // Fix: Handle async getSettings
  const [settings, setSettings] = useState<Settings>(INITIAL_SETTINGS);

  useEffect(() => {
    // Fix: Fetch settings asynchronously
    const fetchSettings = async () => {
      const data = await db.getSettings();
      setSettings(data);
    };
    fetchSettings();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
      {/* Corporate Hero */}
      <section className="text-center space-y-8 py-10">
        <div className="flex justify-center mb-6">
          <Shield className="w-16 h-16 text-cyan-400 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase">
          RENON<span className="text-cyan-400">X</span> SECURITY
        </h1>
        <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
          {settings.missionStatement}
        </p>
      </section>

      {/* Services Matrix */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Managed Security",
            desc: "Full-spectrum protection for enterprise networks and cloud infrastructure.",
            icon: Server
          },
          {
            title: "Pentesting",
            desc: "Rigorous vulnerability assessments and simulated cyber attacks.",
            icon: Zap
          },
          {
            title: "SaaS Solutions",
            desc: "Bespoke software developed with a 'security-first' architecture.",
            icon: Globe
          },
          {
            title: "Data Encryption",
            desc: "Advanced cryptographic solutions for sensitive corporate assets.",
            icon: Lock
          },
          {
            title: "Intrusion Detection",
            desc: "Real-time monitoring and automated response protocols.",
            icon: Shield
          },
          {
            title: "Cloud Migration",
            desc: "Secure transitions to modern, scalable infrastructure environments.",
            icon: Database
          }
        ].map((service, i) => (
          <div key={i} className="p-10 glass border border-slate-800 rounded-3xl hover:border-cyan-500/30 transition-all group">
            <service.icon className="text-cyan-500 mb-8 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{service.desc}</p>
          </div>
        ))}
      </section>

      {/* Trust Banner */}
      <section className="glass rounded-[3rem] p-16 text-center border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Enterprise Ready</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            RenonX partners with global firms to ensure their digital perimeters are impenetrable. From startups to Fortune 500s, our protocols remain the same: Absolute Security.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 -z-10"></div>
      </section>
    </div>
  );
};

export default Company;
