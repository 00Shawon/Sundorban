import { motion } from 'framer-motion';

const policies = [
  {
    num: 'I',
    title: 'Invest in Low-Bandwidth Climate Data Infrastructure',
    gap: 'Most government climate platforms require high-speed internet, desktop access, and English proficiency — excluding majority of vulnerable populations.',
    recommendations: [
      'Mandate maximum 2MB page size for all public climate information platforms',
      'Require mobile-first design for government climate services',
      'Implement progressive web app (PWA) standards for offline functionality',
    ],
    impact: '10× increase in accessibility for coastal populations',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    num: 'II',
    title: 'Bangla-First Design Standards',
    gap: 'Bangla is treated as translation afterthought rather than primary design language.',
    recommendations: [
      'Establish Bangla-language design guidelines for public digital services',
      'Require visual/icon-based navigation for low-literacy users',
      'Develop standardized Bangla climate terminology glossary',
    ],
    impact: 'Eliminate language barriers for 95% of affected population',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
      </svg>
    ),
  },
  {
    num: 'III',
    title: 'Local Developer Capacity Building',
    gap: 'Climate tech development concentrated in Dhaka; coastal regions lack technical capacity.',
    recommendations: [
      'Establish Regional Digital Climate Innovation Hubs in Khulna, Barisal, Chittagong',
      'Train local developers in climate-resilient system design',
      'Create fellowship program for coastal university graduates',
    ],
    impact: 'Sustainable local ownership of climate infrastructure',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    num: 'IV',
    title: 'Open Data Standards',
    gap: 'Climate data exists in siloed, proprietary formats across government agencies.',
    recommendations: [
      'Mandate open data standards (JSON, GeoJSON) for all climate datasets',
      'Create unified Bangladesh Climate Data API',
      'Require public documentation of all government-funded climate models',
    ],
    impact: 'Enable third-party innovation and reduce duplication',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    num: 'V',
    title: 'Integration with National Adaptation Programme',
    gap: 'Climate data platforms operate independently from national policy frameworks.',
    recommendations: [
      'Priority 1: Coastal afforestation → Platform shows vulnerable areas requiring intervention',
      'Priority 4: Early warning systems → Mobile-first approach complements existing infrastructure',
      'Priority 7: Climate-resilient housing → Platform identifies relocation pathways',
    ],
    impact: 'National rollout cost: $150K vs. traditional $4.5M',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
];

const roadmap = [
  {
    phase: 'Phase 1',
    title: 'Pilot Program',
    timeline: 'Months 1-6',
    items: ['Select 3 high-vulnerability districts (Satkhira, Barguna, Patuakhali)', 'Deploy platform with local government partnerships', 'Conduct user training sessions', 'Gather feedback and iterate'],
  },
  {
    phase: 'Phase 2',
    title: 'Expansion',
    timeline: 'Months 7-18',
    items: ['Scale to 15 coastal districts', 'Integrate with existing early warning infrastructure', 'Develop local maintenance capacity', 'Document case studies'],
  },
  {
    phase: 'Phase 3',
    title: 'National Integration',
    timeline: 'Months 19-36',
    items: ['Full Bangladesh coastal coverage', 'Integration with Bangladesh Climate Change Trust systems', 'International knowledge sharing', 'Sustainable governance model'],
  },
];

const budgetData = [
  { phase: 'Pilot (Year 1)', districts: '3 districts', cost: '$15,000' },
  { phase: 'Expansion (Year 2-3)', districts: '15 districts', cost: '$75,000' },
  { phase: 'National (Year 4-5)', districts: 'All coastal', cost: '$150,000' },
];

const metrics = {
  quantitative: [
    { label: 'Users reached', target: '1 million in Year 1' },
    { label: 'Platform uptime during cyclones', target: '95%+' },
    { label: 'Data update frequency', target: 'Weekly' },
    { label: 'Cost per user served', target: '<$0.001/year' },
  ],
  qualitative: [
    'Community feedback on usability',
    'Integration with local decision-making',
    'Government adoption rate',
    'International recognition',
  ],
};

const partners = {
  government: ['Bangladesh Climate Change Trust', 'ICT Division', 'Bangladesh Meteorological Department', 'Local Government Engineering Department'],
  ngo: ['BRAC', 'UNDP Bangladesh', 'Practical Action', 'ICCAD'],
  academic: ['Khulna University', 'BUET', 'Asian University for Women'],
};

function PolicyRecommendations() {
  return (
    <section id="policy-recommendations" className="relative min-h-screen bg-gradient-to-br from-dark via-dark-light to-dark py-24 px-6 md:px-12 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

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
            <span className="text-sm font-bold text-primary tracking-[0.25em] uppercase">Policy & Governance</span>
            <div className="h-[1px] w-12 bg-primary/40"></div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Policy<br />
            <span className="text-primary">Recommendations</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
            Prepared for Bangladesh Climate Change Trust, ICT Division, and Ministry of Environment
          </p>
        </motion.div>

        {/* Policy Cards */}
        <div className="space-y-6 mb-24">
          {policies.map((p, i) => (
            <motion.div
              key={i}
              className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left: Number + Title */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                      {p.icon}
                    </div>
                    <span className="text-primary/40 text-2xl font-bold">{p.num}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">{p.title}</h3>
                  <div className="bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-3 mt-4">
                    <p className="text-xs font-bold text-secondary/80 uppercase tracking-wider mb-1">Current Gap</p>
                    <p className="text-sm text-white/70 leading-relaxed">{p.gap}</p>
                  </div>
                </div>

                {/* Right: Recommendations + Impact */}
                <div className="lg:w-2/3">
                  <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Recommendation</h4>
                  <ul className="space-y-3 mb-6">
                    {p.recommendations.map((rec, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/80">
                        <span className="text-primary mt-1 flex-shrink-0">→</span>
                        <span className="leading-relaxed">{rec}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm font-semibold text-primary">Expected Impact: {p.impact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Budget Allocation */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Budget Allocation Recommendation</h3>
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 max-w-3xl mx-auto">
            <div className="space-y-0">
              {budgetData.map((b, i) => (
                <div key={i} className={`flex flex-col sm:flex-row justify-between items-start sm:items-center py-5 ${i < budgetData.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <div>
                    <span className="text-white font-semibold text-lg">{b.phase}</span>
                    <span className="text-white/40 text-sm ml-3">{b.districts}</span>
                  </div>
                  <span className="text-primary font-bold text-xl mt-2 sm:mt-0">{b.cost}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <p className="text-white/50 text-sm">Traditional early warning expansion for same coverage: <span className="text-secondary font-semibold">$4.5 million</span></p>
            </div>
          </div>
        </motion.div>

        {/* Implementation Roadmap */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Implementation Roadmap</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roadmap.map((r, i) => (
              <motion.div
                key={i}
                className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Phase badge */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full uppercase tracking-wider">{r.phase}</span>
                  <span className="text-white/40 text-sm">{r.timeline}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-5">{r.title}</h4>
                <ul className="space-y-3">
                  {r.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Connector arrow on larger screens */}
                {i < roadmap.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary/40 text-2xl z-10">→</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Metrics */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Success Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Quantitative */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" />
                </svg>
                Quantitative
              </h4>
              <div className="space-y-4">
                {metrics.quantitative.map((m, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <span className="text-white/60 text-sm">{m.label}</span>
                    <span className="text-white font-semibold text-sm">{m.target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Qualitative */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Qualitative
              </h4>
              <ul className="space-y-4">
                {metrics.qualitative.map((m, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0"></div>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Partnership Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">Partnership Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Government */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-5">Government Agencies</h4>
              <ul className="space-y-3">
                {partners.government.map((p, i) => (
                  <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                    <span className="text-primary/60 mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* NGO */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-5">NGO / Development Partners</h4>
              <ul className="space-y-3">
                {partners.ngo.map((p, i) => (
                  <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                    <span className="text-secondary/60 mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <div className="w-12 h-12 bg-[#f5a623]/20 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#f5a623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white mb-5">Academic Institutions</h4>
              <ul className="space-y-3">
                {partners.academic.map((p, i) => (
                  <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                    <span className="text-[#f5a623]/60 mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PolicyRecommendations;
