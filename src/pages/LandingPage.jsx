import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Fingerprint, Activity, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <section className="text-center space-y-6">
        <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">
          AI‑Powered Government <br />
          <span className="text-government-600">Ghost Worker Detection</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Modernizing civil service payroll through biometric verification and AI‑driven attendance anomaly analysis.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            to="/verify" 
            className="bg-government-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-government-700 transition-colors flex items-center gap-2 shadow-lg"
          >
            Start Verification <ArrowRight size={20} />
          </Link>
          <Link 
            to="/dashboard" 
            className="bg-white text-government-600 border-2 border-government-600 px-8 py-3 rounded-full font-semibold hover:bg-government-50 transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-government-100 p-3 rounded-xl w-fit text-government-600 mb-4">
            <Fingerprint size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Biometric Verification</h3>
          <p className="text-slate-600 text-sm">
            Powered by Squad API to detect duplicates and verify real‑world presence.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-government-100 p-3 rounded-xl w-fit text-government-600 mb-4">
            <Activity size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Anomaly Analysis</h3>
          <p className="text-slate-600 text-sm">
            AI detects impossible attendance patterns and flags potential ghost workers.
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-government-100 p-3 rounded-xl w-fit text-government-600 mb-4">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Secure & Compliant</h3>
          <p className="text-slate-600 text-sm">
            Built for government standards with full audit trails and data privacy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
