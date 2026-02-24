import { motion } from 'framer-motion';

const findings = [
  {
    stat: '73%',
    title: 'Lack Digital Access',
    desc: 'Most residents rely on word-of-mouth or traditional radio broadcasts that fail during power outages',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M15.536 8.464a5 5 0 010 7.072M8.464 15.536a5 5 0 010-7.072M12 12h.01" />
      </svg>
    ),
  },
  {
    stat: '89%',
    title: 'Mobile-First Reality',
    desc: 'Households access internet exclusively via mobile phones — desktop platforms are functionally inaccessible',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    stat: 'Bangla',
    title: 'Language Barriers',
    desc: 'English-language climate data is incomprehensible — Bangla translation alone is insufficient for low-literacy contexts',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
      </svg>
    ),
  },
  {
    stat: '2-5 Mbps',
    title: 'Bandwidth Constraints',
    desc: 'Image-heavy platforms take 15-20 seconds to load, rendering them unusable for time-sensitive warnings',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

const priorities = [
  { num: '01', label: 'Visual, map-based information rather than text-heavy reports' },
  { num: '02', label: 'Offline functionality for areas with intermittent connectivity' },
  { num: '03', label: 'Voice-based interfaces for users with limited literacy' },
  { num: '04', label: 'Integration with existing community networks (village councils, religious institutions)' },
];

const designPrinciples = [
  {
    title: 'Simplification over Comprehensiveness',
    desc: 'Community members requested focused, actionable information rather than exhaustive climate reports.',
    items: ['When will flooding reach my village?', 'Which areas will be submerged first?', 'Where can displaced families relocate?'],
    icon: '🎯',
  },
  {
    title: 'Trust through Transparency',
    desc: 'Data sources (Bangladesh Meteorological Dept, IPCC AR6) are clearly cited and explained in accessible language.',
    items: ['Projection ranges visualized', 'Best case / worst case scenarios', 'Uncertainty acknowledged openly'],
    icon: '🤝',
  },
  {
    title: 'Community Ownership',
    desc: 'Platform designed to be maintained by local organizations with minimal technical expertise.',
    items: ['Data update process documented in Bangla', 'Step-by-step maintenance guides', 'Local admin training included'],
    icon: '🏘️',
  },
];

const scalability = [
  {
    phase: 'Immediate',
    timeline: '0-2 years',
    color: '#4ecdc4',
    items: ['15 coastal districts facing similar displacement patterns', '700+ villages requiring localized climate projections', 'Estimated reach: 5-7 million coastal residents'],
  },
  {
    phase: 'National',
    timeline: '3-5 years',
    color: '#f5a623',
    items: ['Integration with Bangladesh Climate Change Trust early warning systems', 'Adaptation for char lands and drought-prone northwest', 'Potential reach: 15+ million people across climate hotspots'],
  },
  {
    phase: 'Regional',
    timeline: '5-10 years',
    color: '#ff6b6b',
    items: ['Methodology applicable to climate-vulnerable deltas globally (Mekong, Nile, Ganges-Brahmaputra)', 'Partnership opportunities with regional climate adaptation networks', 'South-South knowledge transfer potential'],
  },
];

function CommunityImpact() {
  return (
    <section id="community-impact" className="relative bg-slate-50 py-24 px-6 md:px-12 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-primary/40"></div>
            <span className="text-sm font-bold text-primary tracking-[0.25em] uppercase">Research & Engagement</span>
            <div className="h-[1px] w-12 bg-primary/40"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Community Impact<br />
            <span className="text-primary">& Engagement</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Insights from 15+ field interviews with residents of Gabura, Padmapukur, and surrounding coastal villages
          </p>
        </motion.div>

        {/* Field Research Banner */}
        <motion.div
          className="mb-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 md:p-12 border border-primary/10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0 w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Field Research (2025)</h3>
              <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                Conducted 15+ interviews in Bangla with residents of Gabura, Padmapukur, and surrounding coastal villages to understand lived experiences of climate displacement and information access challenges.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Research Findings */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">Key Research Findings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {findings.map((f, i) => (
              <motion.div
                key={i}
                className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">{f.stat}</div>
                <h4 className="text-lg font-semibold text-primary mb-3">{f.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community-Identified Priorities */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">Community-Identified Priorities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {priorities.map((p, i) => (
              <motion.div
                key={i}
                className="group flex items-start gap-5 bg-white rounded-2xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="flex-shrink-0 text-3xl font-bold text-primary/20 group-hover:text-primary/60 transition-colors">{p.num}</span>
                <p className="text-slate-700 text-base md:text-lg leading-relaxed pt-1">{p.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 text-center">Design Principles from Community Feedback</h3>
          <p className="text-slate-500 text-center mb-10 max-w-2xl mx-auto">Informed by direct conversations with the people most affected</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designPrinciples.map((dp, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-5">{dp.icon}</div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{dp.title}</h4>
                <p className="text-slate-500 text-sm mb-5 leading-relaxed">{dp.desc}</p>
                <ul className="space-y-2">
                  {dp.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-primary mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scalability Analysis */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">Scalability Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scalability.map((s, i) => (
              <motion.div
                key={i}
                className="relative bg-white rounded-3xl p-8 border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Color accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: s.color }}></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }}></div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: s.color }}>{s.timeline}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-5">{s.phase} Applicability</h4>
                <ul className="space-y-3">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: s.color }}></span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cost-Benefit Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 text-center">Cost-Benefit Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
            {/* Traditional */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900">Traditional Early Warning</h4>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Installation cost</span>
                  <span className="font-semibold text-slate-900">$150K - $300K / district</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Annual maintenance</span>
                  <span className="font-semibold text-slate-900">$20K - $40K</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500">Power dependency</span>
                  <span className="font-semibold text-secondary">Fails during cyclones</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500">Cost per person</span>
                  <span className="font-bold text-slate-900 text-lg">$15-30</span>
                </div>
              </div>
            </div>

            {/* DPI Approach */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 border-2 border-primary/30 shadow-sm relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wider">Recommended</span>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900">DPI Approach</h4>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="text-slate-600">Development cost</span>
                  <span className="font-semibold text-slate-900">$5,000 (one-time)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="text-slate-600">Annual maintenance</span>
                  <span className="font-semibold text-slate-900">$500</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/10">
                  <span className="text-slate-600">Works offline</span>
                  <span className="font-semibold text-primary">Mobile + Offline ✓</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-600">Cost per person</span>
                  <span className="font-bold text-primary text-lg">$0.0003/year</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Highlight */}
          <motion.div
            className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl py-8 px-6 max-w-3xl mx-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-5xl md:text-6xl font-bold text-primary">50,000×</span>
            <p className="text-slate-600 text-lg mt-2">More cost-effective while reaching a broader population</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CommunityImpact;
