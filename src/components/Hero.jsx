import { motion } from 'framer-motion';

function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1600)',
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
