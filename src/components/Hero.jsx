import { motion } from 'framer-motion';
import Drawing from './../assets/Drawning.jpeg';

function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${Drawing})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-4xl px-5 text-center text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          In 2000, Gabura had 12,000 people.
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-normal mb-4 opacity-90">
          Today, it has 7,800.
        </h2>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mt-8 text-secondary">
          By 2050, it may have none.
        </h2>
        
        {/* CTA Button */}
        <motion.div
          className="mt-10 flex gap-5 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/1AAdNpy062D9JYnmDp9hC2PNkA-lt83pa/view?usp=sharing"
            className="px-8 py-4 border-2 border-white/30 text-white bg-black rounded-2xl font-bold transition-all duration-300 text-center text-sm tracking-widest backdrop-blur-sm hover:bg-white/10"
          >
            VIEW POLICY BRIEF
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://drive.google.com/file/d/16-S70b48NDjeVdtzMvjAAX-zhnMd4-Q7/view?usp=sharing"
            className="px-8 py-4 border-2 border-white/30 text-white hover:bg-black rounded-2xl font-bold transition-all duration-300 text-center text-sm tracking-widest backdrop-blur-sm bg-white/10"
          >
            VIEW POLICY PAPER
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="mt-16 flex flex-col items-center text-2xl"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-4xl">↓</span>
          <p className="text-xs sm:text-sm mt-2 uppercase tracking-widest">
            Scroll to explore
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
