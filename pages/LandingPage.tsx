import React from 'react';
import { ShieldCheck, Database, Smartphone, Lock, Globe, Users } from 'lucide-react';
import { AppView } from '../types';

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-purple-200 tracking-tight mb-6 font-serif">
              Every Book Has a Secret.<br/>Securely Unlocked.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-400">
              LuminaPage is the world's first cryptographically secure smart-tag system for physical books. 
              Prevent counterfeits while unlocking exclusive author content.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button 
                onClick={onGetStarted}
                className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25"
              >
                Try the Reader App
              </button>
              <button className="px-8 py-3 rounded-full bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition-all border border-slate-700">
                For Bookstores
              </button>
            </div>
          </div>
        </div>
        
        {/* Abstract Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
             <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-[100px]"></div>
             <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"></div>
        </div>
      </div>

      {/* Problem & Solution Grid */}
      <div className="bg-slate-900/50 py-24 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                        <Lock className="text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Anti-Counterfeit</h3>
                    <p className="text-slate-400">
                        Counterfeit books cost the industry billions. Our tamper-proof smart identifiers are cryptographically bound to a single physical volume and disabled if cloned.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                        <Smartphone className="text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Digital Companion</h3>
                    <p className="text-slate-400">
                        Scanning a verified book unlocks exclusive content: author greetings, character backstories, and AR experiences hosted on our secure cloud.
                    </p>
                </div>
                <div className="space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                        <Database className="text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Sales Analytics</h3>
                    <p className="text-slate-400">
                        Publishers gain real-time insight into where physical books are actually being read, resale velocity, and reader engagement metrics.
                    </p>
                </div>
            </div>
        </div>
      </div>

      {/* Architecture Section */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="md:w-1/2 relative z-10">
                  <h2 className="text-3xl font-bold text-white font-serif mb-6">Built on Gemini & Secure Cloud</h2>
                  <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                          <ShieldCheck className="text-indigo-400 shrink-0 mt-1" />
                          <p className="text-slate-300"><strong className="text-white">Layer 1:</strong> Physical smart-tag with non-clonable micro-texture.</p>
                      </li>
                      <li className="flex items-start gap-3">
                          <Globe className="text-indigo-400 shrink-0 mt-1" />
                          <p className="text-slate-300"><strong className="text-white">Layer 2:</strong> Real-time blockchain verification of ownership history.</p>
                      </li>
                      <li className="flex items-start gap-3">
                          <Users className="text-indigo-400 shrink-0 mt-1" />
                          <p className="text-slate-300"><strong className="text-white">Layer 3:</strong> Generative AI (Gemini) creates dynamic, personalized author interactions for every reader.</p>
                      </li>
                  </ul>
              </div>
              
              {/* Decorative diagram simulation */}
              <div className="hidden md:block absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/50 to-transparent">
                  <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 border border-indigo-500/30 rounded-full flex items-center justify-center animate-pulse">
                          <div className="w-48 h-48 border border-purple-500/30 rounded-full flex items-center justify-center">
                               <span className="text-indigo-200 font-mono text-xs">VERIFIED</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      
      <footer className="bg-slate-900 py-12 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>&copy; 2024 LuminaPage Inc. Securing knowledge, one page at a time.</p>
      </footer>
    </div>
  );
};

export default LandingPage;