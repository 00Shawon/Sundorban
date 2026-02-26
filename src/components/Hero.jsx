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
        
        {/* CTA Button */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/1Xct2rn1e_d7IKZA-6XgXoUqIiT50HygyQN_dx6k6b68/edit?usp=sharing"
            className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold hover:border-secondary hover:text-secondary transition-all duration-300 text-center text-sm tracking-widest backdrop-blur-sm bg-white/5 hover:bg-white/10"
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
