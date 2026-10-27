import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const policies = [
  {
    num: 'I',
    category: 'infra',
    title: 'Invest in Low-Bandwidth Climate Infrastructure',
    title_bn: 'স্বল্প-ব্যান্ডউইথ জলবায়ু তথ্য অবকাঠামো',
    gap: 'Most national platforms require high-speed broadband and desktop viewports, excluding the 89% of coastal residents who rely on 2G/3G mobile connections.',
    gap_bn: 'অধিকাংশ জাতীয় পোর্টাল উচ্চগতির ইন্টারনেটভিত্তিক, যা মোবাইল ব্যবহারকারী প্রান্তিক উপকূলীয় জনগোষ্ঠীকে তথ্যবঞ্চিত রাখে।',
    recommendations: [
      'Mandate strict <2MB page sizes for all public early warning services',
      'Deploy offline Progressive Web App (PWA) client caching',
      'Optimize vector maps for intermittent delta connectivity',
    ],
    impact: '10× increase in emergency climate advisory access for frontline communities',
    icon: '📡',
  },
  {
    num: 'II',
    category: 'language',
    title: 'Bangla-First Design Standards',
    title_bn: 'বাংলা-প্রথম ইন্টারফেস নীতিমালা',
    gap: 'English and Latin-script data dominate climate communications, while direct translations often use unreadable academic jargon.',
    gap_bn: 'ইংরেজি ও বিদেশি ভাষাভিত্তিক তথ্য কাঠামোর কারণে প্রান্তিক জনগোষ্ঠীর মাঝে তথ্য পৌঁছায় না।',
    recommendations: [
      'Adopt iconographic and voice-guided interfaces for low-literacy users',
      'Standardize participatory Bengali dialect terms for climate risks',
      'Co-design interfaces directly with local women water harvesters',
    ],
    impact: 'Eliminates linguistic exclusion for over 95% of affected households',
    icon: '🗣️',
  },
  {
    num: 'III',
    category: 'capacity',
    title: 'Local Developer Capacity Building',
    title_bn: 'স্থানীয় প্রকৌশলী ও তরুণদের সক্ষমতা বৃদ্ধি',
    gap: 'Technology funding remains centralized in metropolitan Dhaka; coastal regions lack subsidized developer labs and fellowships.',
    gap_bn: 'প্রযুক্তিগত গবেষণা মূলত রাজধানীতে সীমাবদ্ধ, যেখানে উপকূলীয় এলাকায় সক্ষমতা তৈরি হয় না।',
    recommendations: [
      'Establish Climate Innovation Labs at Khulna and Barisal universities',
      'Fund annual engineering fellowships for coastal graduates',
      'Provide open-source seed grants for grassroots early warning apps',
    ],
    impact: 'Ensures long-term local ownership and maintenance of digital systems',
    icon: '💻',
  },
  {
    num: 'IV',
    category: 'data',
    title: 'Open Data Standards & Unified Coastal API',
    title_bn: 'উন্মুক্ত উপাত্ত ও সমন্বিত উপকূলীয় এপিআই',
    gap: 'Hydrological and meteorological datasets remain trapped in proprietary spreadsheets and static PDF reports across agencies.',
    gap_bn: 'গুরুত্বপূর্ণ জলবায়ু উপাত্ত বিভিন্ন সংস্থার কাছে পিডিএফ আকারে আটকে থাকে, যা গবেষকদের কাজে আসে না।',
    recommendations: [
      'Mandate open JSON and GeoJSON formats for river salinity and tidal levels',
      'Build a public, real-time Coastal Geospatial Data API',
      'Standardize sensor logging across vulnerable river embankments',
    ],
    impact: 'Fosters rapid civic disaster innovation and reduces institutional duplication',
    icon: '🔓',
  },
  {
    num: 'V',
    category: 'infra',
    title: 'Integration with National Adaptation Plans (NAPA)',
    title_bn: 'জাতীয় অভিযোজন কর্মসূচির (NAPA) সাথে সমন্বয়',
    gap: 'Grassroots digital tools operate in isolation from official embankment repair budgets and ministerial disaster workflows.',
    gap_bn: 'নাগরিক ডিজিটাল উদ্ভাবনসমূহ প্রায়শই সরকারি জাতীয় কর্মপরিকল্পনা থেকে বিচ্ছিন্ন থাকে।',
    recommendations: [
      'Connect community erosion alerts directly to the Climate Change Trust Fund',
      'Equip Union Parishad disaster committees with automated mobile alerts',
      'Integrate citizen breach reporting with Water Development Board engineers',
    ],
    impact: 'Reduces national system rollout costs from $4.5M to $150K via DPI architecture',
    icon: '🏛️',
  },
];

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Field Usability & Pilot',
    title_bn: 'মাঠপর্যায়ে পাইলট ও পরীক্ষণ',
    timeline: 'Months 1–6',
    items: [
      'Deploy low-bandwidth prototype across Shyamnagar and Dacope',
      'Conduct usability interviews with 50+ local families and local council leaders',
      'Optimize offline caching on entry-level Android devices',
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Regional Delta Scale-Up',
    title_bn: 'আঞ্চলিক উপকূলীয় বিস্তার',
    timeline: 'Months 7–18',
    items: [
      'Scale tracking to 15 coastal districts across Khulna and Barisal',
      'Train local student maintainer squads at Khulna University',
      'Integrate SMS and voice notifications for breach warnings',
    ],
  },
  {
    phase: 'Phase 3',
    title: 'National Integration',
    title_bn: 'জাতীয় অন্তর্ভুক্তি ও উন্মুক্ত মডেল',
    timeline: 'Months 19–36',
    items: [
      'Link API directly into Meteorological Department alert systems',
      'Share framework with international delta networks (Mekong, Nile)',
      'Submit comprehensive policy brief to Ministry of Environment',
    ],
  },
];

export default function PolicyRecommendations() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [copied, setCopied] = useState(false);

  const filteredPolicies = policies.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleCopySummary = () => {
    const text = `POLICY BRIEF SUMMARY: The Drowning Village (Sundarbans Climate Crisis)
Author: Sm. Mehedi Hassan Shawon (Ball State University / Khulna University)
Core Recommendations:
1. Low-Bandwidth Infrastructure: Mandate <2MB page sizes and offline PWA capability for coastal disaster platforms.
2. Bangla-First Design: Eliminate language barriers for 95% of frontline residents with visual and voice navigation.
3. Local Capacity: Create Climate Innovation Labs in Khulna & Barisal to train regional developers.
4. Open Data: Implement unified GeoJSON / REST APIs for BMD and BWDB datasets.
5. NAPA Integration: Bridge grassroots embankment monitoring directly into national disaster response workflows.
Full brief: https://drive.google.com/file/d/1qByUt97QJQGNY883s65cx7vMofuh7cse/view?usp=sharing`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <section 
      id="policy-section" 
      className="relative min-h-screen bg-[#080c14] py-36 md:py-48 px-6 md:px-16 flex flex-col justify-center items-center border-t border-white/[0.06]"
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Spacious Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-teal-300 text-xs font-medium tracking-wide uppercase mb-4">
            {t.policy.breadcrumb}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight mb-4">
            {t.policy.title}
          </h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            {t.policy.subtitle}
          </p>

          {/* Action Row */}
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={handleCopySummary}
              className="px-6 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-2"
            >
              <span>{copied ? '✓' : '📋'}</span>
              <span>{copied ? t.policy.copied : t.policy.copySummary}</span>
            </button>

            <a
              href="https://drive.google.com/file/d/1qByUt97QJQGNY883s65cx7vMofuh7cse/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
            >
              Download Full Policy Paper (PDF) →
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-14 flex-wrap">
          {[
            { id: 'all', label: t.policy.filterAll },
            { id: 'infra', label: t.policy.filterInfra },
            { id: 'language', label: t.policy.filterLanguage },
            { id: 'capacity', label: t.policy.filterCapacity },
            { id: 'data', label: t.policy.filterData },
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  isSelected
                    ? 'bg-white/10 text-white border-teal-400/40 font-semibold'
                    : 'bg-transparent text-slate-400 border-white/[0.08] hover:text-slate-200 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Policy Grid with Generous Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence>
            {filteredPolicies.map((pol) => (
              <motion.div
                key={pol.num}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0c121e]/80 backdrop-blur-xl rounded-3xl p-8 border border-white/[0.08] shadow-xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-serif text-teal-300 font-semibold">
                      {pol.num}
                    </span>
                    <span className="text-xl opacity-75">{pol.icon}</span>
                  </div>

                  <h3 className="text-base font-serif font-normal text-white leading-snug tracking-tight">
                    {lang === 'bn' ? pol.title_bn : pol.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-light p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <strong className="text-slate-300">Gap:</strong> {lang === 'bn' ? pol.gap_bn : pol.gap}
                  </p>

                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-teal-300">
                      {t.policy.recommendationsTag}
                    </div>
                    {pol.recommendations.map((rec, rIdx) => (
                      <div key={rIdx} className="text-xs text-slate-300 flex items-start gap-2 font-light">
                        <span className="text-teal-400 mt-0.5">•</span>
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                    {t.policy.impactTag}
                  </span>
                  <p className="text-xs font-medium text-emerald-300/90 font-light">
                    {pol.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 3-Phase National Roadmap Banner */}
        <div className="bg-[#0c121e]/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/[0.08] shadow-2xl">
          <h3 className="text-xl md:text-2xl font-serif font-normal text-white mb-8 text-center">
            {t.policy.roadmapTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roadmap.map((stage, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-teal-300">
                    {stage.phase}
                  </span>
                  <span className="text-[11px] text-slate-400 font-light px-2.5 py-0.5 rounded-full bg-white/[0.04]">
                    {stage.timeline}
                  </span>
                </div>

                <h4 className="text-sm font-serif font-normal text-white">
                  {lang === 'bn' ? stage.title_bn : stage.title}
                </h4>

                <ul className="space-y-2.5 text-xs text-slate-400 font-light">
                  {stage.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2">
                      <span className="text-teal-400">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
