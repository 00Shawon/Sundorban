import { motion } from 'framer-motion';
import villageData from '../data/villageData.json';

function StorySection() {
  const story = villageData.story;

  return (
    <section className="relative min-h-screen bg-white py-20 px-5 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Video Placeholder */}
        <div 
          className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl cursor-pointer group"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl md:text-4xl mb-4 group-hover:bg-white/50 group-hover:scale-110 transition-all duration-300">
              <span className="ml-1">▶</span>
            </div>
            <p className="text-lg md:text-xl font-semibold mb-1 drop-shadow-lg">Documentary Interview</p>
            <small className="text-sm opacity-90 drop-shadow-md">Video player integration on Day 5</small>
          </div>
        </div>
        
        {/* Story Content */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Large Quote Mark */}
          <div className="absolute -top-8 md:-top-10 -left-4 md:-left-5 text-[6rem] md:text-[8rem] text-primary opacity-20 font-serif leading-none pointer-events-none">
            "
          </div>
          
          {/* Quote */}
          <blockquote className="text-xl md:text-2xl leading-relaxed text-gray-800 italic pl-8 md:pl-10 border-l-4 border-primary mb-8">
            {story.quote}
          </blockquote>
          
          {/* Attribution */}
          <div className="pl-8 md:pl-10">
            <h3 className="text-xl md:text-2xl font-bold text-dark mb-1">
              {story.person}
            </h3>
            <p className="text-base md:text-lg text-gray-600 mb-1">
              {story.occupation}, Age {story.age}
            </p>
            <p className="text-base md:text-lg text-primary font-semibold">
              Gabura, Bangladesh
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default StorySection;
