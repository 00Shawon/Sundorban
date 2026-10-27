import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { toggleAmbientSound } from '../utils/soundEngine';

export default function Navbar() {
  const { lang, toggleLang, t, soundEnabled, setSoundEnabled } = useLanguage();
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollPercent(progress);

      const sections = ['hero', 'map-section', 'story-section', 'chart-section', 'calculator-section', 'framework-section', 'policy-section'];
      const scrollPos = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const nextState = !soundEnabled;
    const ok = toggleAmbientSound(nextState);
    if (ok !== false) {
      setSoundEnabled(nextState);
    }
  };

  const navLinks = [
    { id: 'hero', label: t.nav.genesis },
    { id: 'map-section', label: t.nav.spatial },
    { id: 'story-section', label: t.nav.voices },
    { id: 'chart-section', label: t.nav.data },
    { id: 'calculator-section', label: t.nav.calculator },
    { id: 'framework-section', label: t.nav.framework },
    { id: 'policy-section', label: t.nav.policy },
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Precision Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.04] z-[9999] pointer-events-none">
        <motion.div
          className="h-full bg-teal-400"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Floating Header */}
      <header className="fixed top-4 inset-x-0 z-[1100] px-4 md:px-8 max-w-7xl mx-auto pointer-events-none">
        <div className="bg-[#0c121e]/90 backdrop-blur-md border border-white/[0.08] rounded-full px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-between pointer-events-auto">
          
          {/* Brand Logo & Research Title */}
          <div 
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400/80 group-hover:bg-teal-300 transition-colors shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-teal-300 transition-colors font-serif">
                {t.nav.title}
              </span>
              <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">
                / {t.nav.subtitle}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-xs px-3.5 py-1.5 rounded-full transition-all duration-200 font-medium ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Mute ambient sound' : 'Enable ambient soundscape'}
              className={`flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                soundEnabled
                  ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                  : 'bg-white/[0.03] text-slate-400 border-white/[0.08] hover:text-slate-200 hover:bg-white/[0.06]'
              }`}
            >
              <span className="text-xs">{soundEnabled ? '🔊' : '🔇'}</span>
              <span className="hidden sm:inline font-medium">
                {soundEnabled ? t.nav.soundOn : t.nav.soundOff}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <span>{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* Policy Brief Link */}
            <a
              href="https://drive.google.com/file/d/1qByUt97QJQGNY883s65cx7vMofuh7cse/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex text-xs font-semibold px-4 py-1.5 rounded-full bg-white text-slate-950 hover:bg-teal-300 transition-colors shadow-sm"
            >
              {t.nav.policyBriefBtn}
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
              aria-label="Toggle Navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 bg-[#0c121e]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 shadow-xl pointer-events-auto space-y-1"
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="w-full text-left px-3 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-white/[0.06]">
                <a
                  href="https://drive.google.com/file/d/1qByUt97QJQGNY883s65cx7vMofuh7cse/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs font-semibold py-2 rounded-xl bg-teal-400 text-slate-950"
                >
                  {t.nav.policyBriefBtn} (PDF)
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
