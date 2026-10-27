import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function TheoreticalFramework() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('chakrabarty');

  const pillars = [
    {
      id: 'chakrabarty',
      scholar: 'Dipesh Chakrabarty',
      concept: 'Planetary Disconnect',
      title: t.framework.chakrabartyTitle,
      desc: t.framework.chakrabartyDesc,
      icon: '🌍',
      citation: 'Chakrabarty, D. (2021). The Climate of History in a Planetary Age. Univ. of Chicago Press.',
      insight:
        'Western climate narratives center global emission targets while treating marginalized tropical delta communities as collateral damage. This research models spatial inequality by centering those who emit least but suffer earliest.',
    },
    {
      id: 'craps',
      scholar: 'Stef Craps',
      concept: 'Climate Witnessing',
      title: t.framework.crapsTitle,
      desc: t.framework.crapsDesc,
      icon: '👁️',
      citation: 'Craps, S. (2020). Climate Witnessing and the Limits of Representation. Cambridge Journal.',
      insight:
        'Traditional journalism covers abrupt disasters like cyclones but fails to represent the slow violence of gradual soil salinization. Scrollytelling maps time over decades to make gradual displacement visible and felt.',
    },
    {
      id: 'dpi',
      scholar: 'Digital Public Goods',
      concept: 'Epistemic & Data Justice',
      title: t.framework.dpiTitle,
      desc: t.framework.dpiDesc,
      icon: '📡',
      citation: 'Digital Public Infrastructure for Climate Action (DPGA & UNDP Policy Compendium, 2024).',
      insight:
        'A digital system cannot achieve climate justice if it requires high-speed internet and English literacy. Information architecture must be designed for mobile-first 2G/3G connectivity and Bangla-native vernaculars.',
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activeTab) || pillars[0];

  return (
    <section 
      id="framework-section" 
      className="relative min-h-screen bg-[#080c14] py-36 md:py-48 px-6 md:px-16 flex flex-col justify-center items-center border-t border-white/[0.06]"
    >
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Spacious Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-teal-300 text-xs font-medium tracking-wide uppercase mb-4">
            {t.framework.breadcrumb}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight mb-4">
            {t.framework.title}
          </h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            {t.framework.subtitle}
          </p>
        </div>

        {/* 3 Pillar Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar) => {
            const isSelected = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id)}
                className={`p-7 rounded-3xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#0c121e] border-teal-400/40 shadow-xl'
                    : 'bg-transparent border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="text-2xl mb-4">{pillar.icon}</div>
                <div className="text-[11px] uppercase font-semibold tracking-wider text-teal-300 mb-1">
                  {pillar.scholar}
                </div>
                <div className="text-base font-serif font-medium text-white tracking-tight">
                  {pillar.concept}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Concept Panel with Ample Padding */}
        <div className="bg-[#0c121e]/80 backdrop-blur-xl rounded-3xl p-8 md:p-14 border border-white/[0.08] shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPillar.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentPillar.icon}</span>
                <h3 className="text-xl md:text-2xl font-serif font-normal text-white">
                  {currentPillar.title}
                </h3>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                {currentPillar.desc}
              </p>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-sm text-slate-300 leading-relaxed font-light">
                <strong className="text-teal-300 block mb-1">Methodological Synthesis:</strong>
                {currentPillar.insight}
              </div>

              <div className="pt-4 border-t border-white/[0.06] text-xs text-slate-500 italic font-light">
                📚 {currentPillar.citation}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
