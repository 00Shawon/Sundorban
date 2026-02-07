import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark via-dark-light to-dark text-white py-20 px-5">
      <div className="max-w-6xl mx-auto">
        
        {/* Call to Action Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            This is not a distant future.
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-primary font-semibold mb-12">
            This is happening now.
          </h3>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a 
              href="https://www.ipcc.ch/report/ar6/wg1/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-primary text-dark px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-transparent hover:border-2 hover:border-primary hover:text-primary transition-all duration-300 w-full sm:w-auto max-w-xs text-center"
            >
              <span className="inline-block group-hover:scale-105 transition-transform">
                IPCC Climate Report →
              </span>
            </a>
            <a 
              href="http://www.bmd.gov.bd/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group border-2 border-secondary text-secondary px-8 py-4 rounded-full font-semibold text-base md:text-lg hover:bg-secondary hover:text-white transition-all duration-300 w-full sm:w-auto max-w-xs text-center"
            >
              <span className="inline-block group-hover:scale-105 transition-transform">
                Bangladesh Met Data →
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
          
          {/* Project Title */}
          <h4 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            The Drowning Village
          </h4>
          <p className="text-base md:text-lg opacity-80 mb-8 max-w-2xl mx-auto leading-relaxed">
            An interactive storytelling prototype documenting climate displacement 
            in the Sundarbans region of Bangladesh
          </p>
          
          {/* Creator Info */}
          <div className="mb-8 space-y-1">
            <p className="text-lg md:text-xl font-semibold">
              Sm. Mehedi Hassan Shawon
            </p>
            <p className="text-sm md:text-base opacity-80">
              M.A. Candidate in Emerging Media Design & Development
            </p>
            <p className="text-sm md:text-base opacity-80">
              Ball State University, 2026
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

          {/* Data Sources */}
          <div className="mb-8 pt-8 border-t border-white/10">
            <h5 className="text-sm md:text-base font-semibold mb-3 uppercase tracking-wider opacity-70">
              Data Sources
            </h5>
            <div className="flex flex-wrap gap-4 justify-center text-xs md:text-sm opacity-60">
              <span>Bangladesh Meteorological Department</span>
              <span>•</span>
              <span>IPCC AR6 Climate Report</span>
              <span>•</span>
              <span>NOAA IBTrACS</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-8 border-t border-white/10">
            <p className="text-xs md:text-sm opacity-50">
              Built with React, Tailwind CSS v4, Framer Motion, Leaflet.js & Chart.js
            </p>
            <p className="text-xs opacity-40 mt-2">
              © 2026 Mehedi Hassan Shawon. Created for EMDD Graduate Assistantship Application.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
