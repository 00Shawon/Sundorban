import { motion } from 'framer-motion';
import Drawing from './../assets/Drawning.jpeg';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToMap = () => {
    const el = document.getElementById('map-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#080c14] pt-36 pb-28 px-6 md:px-12"
    >
      {/* Background Drawing with Soft Vignette */}
      <div 
        className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity scale-100"
        style={{
          backgroundImage: `url(${Drawing})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Editorial Gradient Masks */}
      <div className="absolute inset-0 z-0 bg-radial-[circle_at_center,_transparent_30%,_#080c14_85%]" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#080c14] via-transparent to-[#080c14]" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Research Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 text-xs font-medium tracking-wide mb-10 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
          {t.hero.badge}
        </motion.div>

        {/* Solemn Headline Sequence in Playfair Display Serif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="space-y-4 md:space-y-6"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal font-serif text-slate-100 leading-[1.2] tracking-tight">
            {t.hero.line1}{' '}
            <span className="text-teal-300 font-medium">
              {t.hero.count2000}
            </span>{' '}
            {t.hero.line1Suffix}
          </h1>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal font-serif text-slate-300 tracking-tight">
            {t.hero.line2}{' '}
            <span className="text-amber-300/90 font-medium">
              {t.hero.countToday}
            </span>{' '}
            {t.hero.line2Suffix}
          </h2>

          <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal font-serif text-slate-100 pt-2 tracking-tight">
            {t.hero.line3}{' '}
            <span className="text-rose-400 font-medium italic underline decoration-rose-500/30 underline-offset-8">
              {t.hero.count2050}
            </span>
          </h3>
        </motion.div>

        {/* Narrative Context Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 md:mt-12 max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed font-light"
        >
          {t.hero.description}
        </motion.p>

        {/* Spacious Empirical Metric Rail */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 py-6 border-y border-white/[0.08] w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]"
        >
          {t.hero.stats.map((stat, idx) => (
            <div key={idx} className="px-4 text-center pt-3 md:pt-0">
              <div className="text-xl md:text-2xl font-semibold text-slate-100 tracking-tight font-serif">
                {stat.val}
              </div>
              <div className="text-[11px] text-slate-400 font-normal uppercase tracking-wider mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <button
            onClick={scrollToMap}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-colors duration-200 shadow-md"
          >
            {t.hero.exploreMap}
          </button>

          <a
            href="https://drive.google.com/file/d/1qByUt97QJQGNY883s65cx7vMofuh7cse/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 font-medium text-xs tracking-wider uppercase transition-colors duration-200 text-center"
          >
            {t.hero.viewPolicy}
          </a>
        </motion.div>

        {/* Subtle Scroll Hint */}
        <motion.div
          onClick={scrollToMap}
          className="mt-16 cursor-pointer flex flex-col items-center gap-2 group select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className="text-[11px] tracking-widest uppercase text-slate-500 group-hover:text-slate-300 transition-colors">
            {t.hero.scrollHint}
          </span>
          <span className="text-slate-500 group-hover:text-teal-300 transition-colors text-sm">
            ↓
          </span>
        </motion.div>

      </div>
    </section>
  );
}
