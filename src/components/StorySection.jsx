import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import villageData from '../data/villageData.json';
import documentaryImg from '../assets/Documentry.png';
import { useLanguage } from '../context/LanguageContext';

export default function StorySection() {
  const { lang, t } = useLanguage();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const stories = villageData.oral_histories;
  const currentStory = stories[activeStoryIndex];
  const videoUrl = "https://photos.app.goo.gl/TpQaVzEMCkVZyv9j9";

  const handleAudioSim = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 7000);
    }
  };

  return (
    <section 
      id="story-section" 
      className="relative min-h-screen bg-[#080c14] py-36 md:py-48 px-6 md:px-16 flex flex-col justify-center items-center border-t border-white/[0.06]"
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Spacious Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-teal-300 text-xs font-medium tracking-wide uppercase mb-4">
            {t.voices.breadcrumb}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight mb-4">
            {t.voices.title}
          </h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            {t.voices.subtitle}
          </p>
        </div>

        {/* Character Story Tabs with Generous Padding */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-20 flex-wrap">
          {stories.map((s, idx) => {
            const isSelected = idx === activeStoryIndex;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStoryIndex(idx);
                  setIsPlayingAudio(false);
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white/10 text-white border-teal-400/40 font-semibold shadow-sm'
                    : 'bg-transparent text-slate-400 border-white/[0.08] hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <span>{lang === 'bn' ? s.person_bn : s.person}</span>
                <span className="text-[11px] text-slate-500 ml-1.5 hidden sm:inline">
                  • {s.age}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Clean Video Preview Card (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div 
              className="relative group cursor-pointer rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl bg-[#0c121e]"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              onClick={() => setVideoModalOpen(true)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={documentaryImg} 
                  alt="Documentary Footage Preview"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-90" />
                
                {/* Minimalist Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:bg-teal-400 group-hover:text-slate-950 transition-all duration-200 shadow-xl">
                    <svg className="w-6 h-6 ml-1 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-5 left-6 right-6">
                  <span className="text-[10px] uppercase font-semibold text-teal-300 tracking-wider block mb-1">
                    {t.voices.watchDoc}
                  </span>
                  <h4 className="text-sm md:text-base font-semibold text-white font-serif line-clamp-1">
                    {t.voices.videoModalTitle}
                  </h4>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Spacious Literary Testimonial (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory.id + lang}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Theme Tag */}
                <span className="text-xs uppercase font-semibold tracking-wider text-amber-300/90 block">
                  {lang === 'bn' ? currentStory.tag_bn : currentStory.tag_en}
                </span>

                {/* Literary Quote in Playfair Display Serif */}
                <blockquote className="text-2xl sm:text-3xl md:text-4xl font-normal font-serif text-slate-100 leading-relaxed tracking-tight">
                  “{lang === 'bn' ? currentStory.quote_bn : currentStory.quote}”
                </blockquote>

                {/* Field Notes Context */}
                <p className="text-base text-slate-400 font-light leading-relaxed border-l border-teal-500/30 pl-5 py-1">
                  {lang === 'bn' ? currentStory.context_bn : currentStory.context}
                </p>

                {/* Author Card & Audio Testimonial Tool */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white font-serif">
                      {lang === 'bn' ? currentStory.person_bn : currentStory.person}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {lang === 'bn' ? currentStory.occupation_bn : currentStory.occupation} • Age {currentStory.age}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      📍 {lang === 'bn' ? currentStory.location_bn : currentStory.location}
                    </p>
                  </div>

                  {/* Audio Player Action Button */}
                  {/* <button
                    onClick={handleAudioSim}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium transition-all ${
                      isPlayingAudio
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <span>{isPlayingAudio ? '🔊' : '🎙️'}</span>
                    <span>{isPlayingAudio ? t.voices.playing : t.voices.listenSnippet}</span>
                    <span className="text-[10px] text-slate-500">({currentStory.audio_length})</span>
                  </button> */}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* IN-APP VIDEO LIGHTBOX MODAL */}
      <AnimatePresence>
        {videoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          >
            <div className="relative w-full max-w-4xl bg-[#0c121e] border border-white/[0.1] rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b border-white/[0.08]">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400 block mb-1">
                    {t.voices.videoModalBadge}
                  </span>
                  <h3 className="text-lg font-semibold text-white font-serif">
                    {t.voices.videoModalTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setVideoModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={documentaryImg}
                  alt="Video Stream Preview"
                  className="w-full h-full object-cover opacity-60"
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/60">
                  <p className="text-sm md:text-base text-slate-200 max-w-lg mb-8 leading-relaxed font-light">
                    {t.voices.videoDescription}
                  </p>
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-all shadow-md"
                  >
                    {t.voices.externalLink}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
