import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark via-dark-light to-dark text-white py-20 px-5">
      <div className="max-w-6xl mx-auto">
        
        {/* Research Call to Action */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Climate data must serve those<br />most affected by the crisis.
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-primary font-semibold mb-6">
            This research proposes a path forward.
          </h3>
          <p className="text-base md:text-lg opacity-70 max-w-2xl mx-auto mb-12 leading-relaxed">
            A field-research-based analysis of climate information accessibility in coastal Bangladesh, with policy recommendations for digital public infrastructure.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a 
              href="https://www.ipcc.ch/report/ar6/wg1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-primary text-dark px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-transparent hover:border-2 hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto max-w-xs text-center"
            >
              <span className="inline-block group-hover:scale-105 transition-transform">
                IPCC AR6 Source Data →
              </span>
            </a>
            <a 
              href="http://www.bmd.gov.bd/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group border-2 border-secondary text-secondary px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-secondary hover:text-white transition-all duration-300 w-full sm:w-auto max-w-xs text-center"
            >
              <span className="inline-block group-hover:scale-105 transition-transform">
                Bangladesh Meteorological Data →
              </span>
            </a>
          </div>
        </motion.div>

        {/* Attribution Section */}
        <motion.div 
          className="text-center pt-16 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Decorative Line */}
          <div className="w-16 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          
          {/* Research Title */}
          <h4 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            The Drowning Village
          </h4>
          <p className="text-sm md:text-base opacity-60 mb-3 italic">
            Research Paper & Policy Brief
          </p>
          <p className="text-base md:text-lg opacity-80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Digital Public Infrastructure for Climate-Displaced Communities: A Field Research Study on Information Accessibility in the Sundarbans, Bangladesh
          </p>
          
          {/* Principal Researcher */}
          <div className="mb-8 space-y-1">
            <p className="text-xs uppercase tracking-widest opacity-50 mb-2">Principal Researcher</p>
            <p className="text-lg md:text-xl font-semibold">
              Sm. Mehedi Hassan Shawon
            </p>
            <p className="text-sm md:text-base opacity-80">
              M.A., Mass Commuication and Journalism
            </p>
            <p className="text-sm md:text-base opacity-80">
              Khulna University, Bangladesh
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center items-center mb-8 flex-wrap">
            <a 
              href="https://github.com/00Shawon" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-secondary transition-colors duration-300 text-sm md:text-base font-medium"
            >
              GitHub
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="https://www.linkedin.com/in/mehedishawon1/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-secondary transition-colors duration-300 text-sm md:text-base font-medium"
            >
              LinkedIn
            </a>
            <span className="text-white/30">•</span>
            <a 
              href="mailto:mehedishawon121@gmail.com" 
              className="text-primary hover:text-secondary transition-colors duration-300 text-sm md:text-base font-medium"
            >
              Email
            </a>
          </div>

          {/* Research Methodology */}
          <div className="mb-8 pt-8 border-t border-white/10">
            <h5 className="text-sm md:text-base font-semibold mb-3 uppercase tracking-wider opacity-70">
              Research Methodology
            </h5>
            <div className="flex flex-wrap gap-4 justify-center text-xs md:text-sm opacity-60">
              <span>Field Interviews (n=15+)</span>
              <span>•</span>
              <span>Geospatial Analysis</span>
              <span>•</span>
              <span>Policy Framework Analysis</span>
              <span>•</span>
              <span>Community-Based Participatory Research</span>
            </div>
          </div>

          {/* Data Sources & Citations */}
          <div className="mb-8 pt-8 border-t border-white/10">
            <h5 className="text-sm md:text-base font-semibold mb-3 uppercase tracking-wider opacity-70">
              Data Sources & Citations
            </h5>
            <div className="flex flex-wrap gap-4 justify-center text-xs md:text-sm opacity-60">
              <span>Bangladesh Meteorological Department</span>
              <span>•</span>
              <span>IPCC AR6 Climate Report (2021)</span>
              <span>•</span>
              <span>NOAA IBTrACS</span>
              <span>•</span>
              <span>Bangladesh Bureau of Statistics</span>
              <span>•</span>
              <span>National Adaptation Programme of Action (NAPA)</span>
            </div>
          </div>

          {/* Platform & Copyright */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-xs md:text-sm opacity-50">
              Interactive research platform built with React, Tailwind CSS v4, Framer Motion, Leaflet.js & Chart.js
            </p>
            <p className="text-xs opacity-40 mt-2">
              © 2026 Sm. Mehedi Hassan Shawon. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
