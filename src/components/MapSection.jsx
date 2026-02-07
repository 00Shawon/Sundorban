import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useScrollProgress } from '../hooks/useScrollProgress';
import villageData from '../data/villageData.json';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map center when timeline changes
function MapUpdater({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 0.5
    });
  }, [center, zoom, map]);
  
  return null;
}

function MapSection() {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const [mapKey, setMapKey] = useState(0);
  
  // Determine timeline index based on scroll progress
  const getTimelineIndex = () => {
    if (progress < 0.25) return 0; // 2000
    if (progress < 0.5) return 1;  // 2010
    if (progress < 0.75) return 2; // 2024
    return 3; // 2050
  };
  
  const currentIndex = getTimelineIndex();
  const currentData = villageData.village.timeline[currentIndex];
  const coordinates = villageData.village.coordinates;

  // Get polygon color based on timeline
  const getPolygonColor = () => {
    const colors = [
      '#4ecdc4', // 2000: Teal (healthy)
      '#95e1d3', // 2010: Light teal (declining)
      '#ff6b6b', // 2024: Red (critical)
      '#4a90e2'  // 2050: Blue (underwater)
    ];
    return colors[currentIndex];
  };

  const getPolygonOpacity = () => {
    // 2050 more transparent (underwater effect)
    return currentIndex === 3 ? 0.7 : 0.4;
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[400vh] bg-dark"
    >
      <div className="sticky top-0 h-screen w-full">
        
        {/* Info Overlay - Responsive positioning */}
        <div className="absolute top-5 left-5 right-5 md:top-10 md:left-10 md:right-auto z-[1000] bg-black/90 backdrop-blur-md p-6 md:p-8 rounded-2xl md:max-w-sm shadow-2xl border-2 border-primary/30">
          <motion.h2
            key={currentData.year}
            className="text-4xl md:text-5xl font-bold text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentData.year}
          </motion.h2>
          
          <motion.p
            key={`pop-${currentData.year}`}
            className="text-lg md:text-xl text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Population: <span className="font-semibold">{currentData.population.toLocaleString()}</span>
          </motion.p>
          
          {currentData.land_loss_hectares && (
            <motion.p 
              className="text-base md:text-lg text-secondary font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Land Lost: {currentData.land_loss_hectares} hectares
            </motion.p>
          )}
          
          {currentData.projection && (
            <motion.span 
              className="inline-block mt-3 bg-secondary text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Projection
            </motion.span>
          )}
          
          {/* Progress Bar */}
          <div className="mt-6 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* Leaflet Map Container */}
        <motion.div 
          className="w-full h-full"
          key={currentIndex}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <MapContainer
            center={coordinates}
            zoom={12}
            className="h-full w-full z-0"
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            attributionControl={true}
          >
            {/* Dark mode tile layer */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            
            {/* Map updater component */}
            <MapUpdater center={coordinates} zoom={12} />
            
            {/* Coastline polygon */}
            <Polygon
              positions={currentData.coastline.coordinates[0].map(coord => [coord[1], coord[0]])}
              pathOptions={{
                color: getPolygonColor(),
                fillColor: getPolygonColor(),
                fillOpacity: getPolygonOpacity(),
                weight: 3,
                opacity: 0.8,
              }}
            />
            
            {/* Village marker */}
            <Marker position={coordinates}>
              <Popup>
                <div className="text-center">
                  <strong className="text-primary text-lg block mb-1">
                    {villageData.village.name}
                  </strong>
                  <p className="text-sm mb-1">
                    Year: <strong>{currentData.year}</strong>
                  </p>
                  <p className="text-sm">
                    Population: <strong>{currentData.population.toLocaleString()}</strong>
                  </p>
                  {currentData.projection && (
                    <p className="text-xs text-secondary mt-2 font-semibold">
                      (Projected data)
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </div>
    </section>
  );
}

export default MapSection;
