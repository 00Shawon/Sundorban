import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#080c14] text-white py-32 px-6 md:px-16 border-t border-white/[0.08] overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        
        {/* Research Call to Action Banner */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold block mb-4">
            Graduate Capstone Demonstration
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal font-serif mb-6 leading-tight tracking-tight">
            {t.footer.title}
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            {t.footer.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://www.ipcc.ch/report/ar6/wg1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 w-full sm:w-auto text-center shadow-md"
            >
              IPCC AR6 Working Group I →
            </a>
            <a 
              href="http://www.bmd.gov.bd/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-white/30 text-slate-200 font-medium text-xs uppercase tracking-wider transition-all duration-200 w-full sm:w-auto text-center"
            >
              Bangladesh Meteorological Dept →
            </a>
          </div>
        </motion.div>

        {/* Researcher Attribution & Credentials with Generous Spacing */}
        <div className="pt-16 border-t border-white/[0.06] text-center space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold block mb-1">
              Principal Researcher
            </span>
            <h3 className="text-xl md:text-2xl font-serif font-normal text-white tracking-tight">
              {t.footer.authorName}
            </h3>
            <p className="text-xs text-teal-300 mt-1 font-light">
              {t.footer.authorBio}
            </p>
            <p className="text-xs text-slate-400 font-light">
              {t.footer.authorOrigin}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center items-center flex-wrap text-xs text-slate-400 font-medium">
            <a 
              href="https://github.com/00Shawon" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-teal-300 transition-colors"
            >
              GitHub (00Shawon)
            </a>
            <span className="text-white/10">•</span>
            <a 
              href="https://www.linkedin.com/in/mehedishawon1/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-teal-300 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-white/10">•</span>
            <a 
              href="mailto:mehedishawon121@gmail.com" 
              className="hover:text-teal-300 transition-colors"
            >
              mehedishawon121@gmail.com
            </a>
          </div>

          {/* Methodological Badges */}
          <div className="pt-6 border-t border-white/[0.04] max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2.5 justify-center text-[10px] text-slate-400 font-light">
              <span className="px-3 py-1 rounded-full bg-white/[0.03]">Field Interviews (n=15+ in Dacope & Gabura)</span>
              <span className="px-3 py-1 rounded-full bg-white/[0.03]">Geospatial Satellite Analysis</span>
              <span className="px-3 py-1 rounded-full bg-white/[0.03]">IPCC AR6 Projections</span>
              <span className="px-3 py-1 rounded-full bg-white/[0.03]">National Adaptation Plans (NAPA)</span>
            </div>
          </div>

          {/* Copyright and Back to Top */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-light">
            <p>{t.footer.copyright}</p>
            <button
              onClick={scrollToTop}
              className="text-teal-400 hover:text-teal-300 transition-colors font-medium flex items-center gap-1"
            >
              {t.footer.backToTop}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
