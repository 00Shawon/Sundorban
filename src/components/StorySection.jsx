import { motion } from 'framer-motion';
import villageData from '../data/villageData.json';
import documentaryImg from '../assets/Documentry.png';

function StorySection() {
  const story = villageData.story;
  const videoUrl = "https://photos.app.goo.gl/TpQaVzEMCkVZyv9j9";

  return (
    <section className="relative min-h-screen bg-slate-50 py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <motion.div 
        className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Video Placeholder - Premium Player */}
        <motion.div 
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={() => window.open(videoUrl, '_blank')}
        >
          {/* Main Card */}
          <div className="relative aspect-[16/9] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/10">
            <img 
              src={documentaryImg} 
              alt="Documentary Preview"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>
            
            {/* Play Button - Premium Glassmorphism */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative group/btn">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 group-hover:bg-white/30 transition-all duration-500"></div>
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:bg-white/20 group-hover:border-white/50 transition-all duration-500 group-hover:scale-110">
                  <svg 
                    className="w-10 h-10 md:w-14 md:h-14 ml-2 fill-current" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Video Info Overlay */}
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary/80 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase">Documentary</span>
                <span className="text-sm opacity-80">6:42 • 4K HD</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold tracking-tight">The Vanishing Sanity: Water Crisis in Dacope</h4>
            </div>
          </div>

          {/* Decorative Floating Label */}
          <div className="absolute -top-6 -right-6 hidden md:block">
            <motion.div 
              className="px-6 py-4 bg-white shadow-xl rounded-2xl border border-slate-100"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-bold text-slate-800">Watch Interview</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Story Content */}
        <motion.div 
          className="relative lg:pl-4"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Section Breadcrumb */}
          <div className="mb-8">
            <span className="text-sm font-bold text-primary tracking-[0.2em] uppercase">Human Impact</span>
            <div className="h-1 w-12 bg-primary mt-2"></div>
          </div>

          {/* Large Quote Mark */}
          <div className="absolute -top-12 -left-8 text-[12rem] text-primary/10 font-serif leading-none pointer-events-none select-none">
            "
          </div>
          
          {/* Quote */}
          <blockquote className="relative text-2xl md:text-4xl lg:text-5xl font-medium leading-[1.3] text-slate-800 mb-12">
            {story.quote}
          </blockquote>
          
          {/* Profile Card */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                {story.person}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600">
                <span className="text-lg">{story.occupation}</span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <span className="text-lg">Age {story.age}</span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                <span className="text-lg text-primary font-semibold">{story.location}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default StorySection;
