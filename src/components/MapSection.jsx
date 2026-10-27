import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { useScrollProgress } from '../hooks/useScrollProgress';
import villageData from '../data/villageData.json';
import { useLanguage } from '../context/LanguageContext';
import 'leaflet/dist/leaflet.css';

// Subtle radar pin for active village
const createRadarIcon = (color) =>
  L.divIcon({
    className: 'custom-radar-marker',
    html: `
      <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
        <span style="position: absolute; width: 100%; height: 100%; border-radius: 9999px; background: ${color}; opacity: 0.35; animation: pingSlow 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
        <span style="position: relative; width: 12px; height: 12px; border-radius: 9999px; background: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 0 14px ${color};"></span>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

// Cyclone landfall storm marker
const createCycloneIcon = () =>
  L.divIcon({
    className: 'cyclone-marker',
    html: `
      <div style="background: rgba(244, 63, 94, 0.9); border: 2px solid white; border-radius: 9999px; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px rgba(244, 63, 94, 0.6); font-size: 13px;">
        🌀
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });

// Smooth Camera Controller
function MapCameraController({ center, zoom, isFreeExplore }) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    if (!isFreeExplore) {
      map.setView(center, zoom, {
        animate: true,
        duration: 0.8,
      });
    }
  }, [center, zoom, isFreeExplore, map]);

  return null;
}

export default function MapSection() {
  const { lang, t } = useLanguage();
  const sectionRef = useRef(null);
  const scrollProgress = useScrollProgress(sectionRef);

  // States
  const [selectedVillageKey, setSelectedVillageKey] = useState('gabura');
  const [mapStyle, setMapStyle] = useState('satellite'); // 'satellite' | 'dark'
  const [isFreeExplore, setIsFreeExplore] = useState(false);
  const [manualIndex, setManualIndex] = useState(null);
  const [showCyclones, setShowCyclones] = useState(false);
  const [showSalinity, setShowSalinity] = useState(false);
  const [showComparisonSlider, setShowComparisonSlider] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);

  const village = villageData.villages[selectedVillageKey] || villageData.villages.gabura;
  const timelineList = village.timeline;

  // Timeline Index Calculation
  const timelineIndex = useMemo(() => {
    if (manualIndex !== null) return manualIndex;
    if (scrollProgress < 0.25) return 0; // 2000
    if (scrollProgress < 0.5) return 1;  // 2010
    if (scrollProgress < 0.75) return 2; // 2024
    return 3;                            // 2050
  }, [scrollProgress, manualIndex]);

  const currentData = timelineList[timelineIndex];
  const coordinates = village.coordinates;

  // Stage Themes
  const statusThemes = [
    {
      color: '#2dd4bf', // Teal
      badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
      label: lang === 'bn' ? currentData.status_bn : currentData.status_en,
      fillOpacity: 0.35,
    },
    {
      color: '#f59e0b', // Amber
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      label: lang === 'bn' ? currentData.status_bn : currentData.status_en,
      fillOpacity: 0.4,
    },
    {
      color: '#f43f5e', // Rose
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      label: lang === 'bn' ? currentData.status_bn : currentData.status_en,
      fillOpacity: 0.5,
    },
    {
      color: '#38bdf8', // Sky Blue
      badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
      label: lang === 'bn' ? currentData.status_bn : currentData.status_en,
      fillOpacity: 0.65,
    },
  ];

  const activeTheme = statusThemes[timelineIndex];

  // Convert GeoJSON [lng, lat] to Leaflet [lat, lng]
  const polygonPositions = currentData?.coastline?.coordinates?.[0]
    ? currentData.coastline.coordinates[0].map((coord) => [coord[1], coord[0]])
    : [];

  useEffect(() => {
    if (manualIndex !== null) {
      const timer = setTimeout(() => {
        setManualIndex(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [scrollProgress, manualIndex]);

  const cyclonePoints = [
    { name: 'Sidr (2007)', lat: 21.85, lng: 89.25, surge: '5.2m' },
    { name: 'Aila (2009)', lat: 21.90, lng: 89.15, surge: '4.1m' },
    { name: 'Amphan (2020)', lat: 21.82, lng: 89.20, surge: '4.8m' },
    { name: 'Remal (2024)', lat: 21.92, lng: 89.28, surge: '3.7m' },
  ];

  return (
    <section 
      id="map-section" 
      ref={sectionRef} 
      className="relative h-[400vh] bg-[#080c14] select-none"
    >
      <style>{`
        .free-dark-tiles {
          filter: invert(100%) hue-rotate(185deg) brightness(85%) contrast(90%) saturate(120%);
        }
        .satellite-dark-tiles {
          filter: brightness(75%) contrast(110%) saturate(105%);
        }
      `}</style>

      {/* Sticky Fullscreen Scrollytelling Canvas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Soft Vignette Mask */}
        <div className="pointer-events-none absolute inset-0 z-[400] bg-[radial-gradient(circle_at_center,transparent_40%,rgba(8,12,20,0.85)_100%)]" />

        {/* ELEGANT, UN-CONGESTED HUD CARD (Left Side) */}
        <div className="absolute top-24 left-4 md:left-10 z-[1000] w-[calc(100%-32px)] sm:w-[420px] rounded-3xl bg-[#0c121e]/90 backdrop-blur-xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/[0.08]">
          
          {/* Section Breadcrumb & Village Selector */}
          <div className="mb-6">
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase block mb-2.5">
              {t.map.selectVillage}
            </span>
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-2xl border border-white/[0.06]">
              {Object.keys(villageData.villages).map((vKey) => {
                const item = villageData.villages[vKey];
                const isSelected = selectedVillageKey === vKey;
                return (
                  <button
                    key={vKey}
                    onClick={() => {
                      setSelectedVillageKey(vKey);
                      setIsFreeExplore(false);
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-teal-400 text-slate-950 font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {lang === 'bn' ? item.name_bn : item.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location Subtitle & Status Badge */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeTheme.color }}
              />
              <span className="text-xs text-slate-400 font-medium">
                {lang === 'bn' ? village.district_bn : village.district}
              </span>
            </div>

            <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${activeTheme.badgeBg}`}>
              {activeTheme.label}
            </span>
          </div>

          {/* Temporal Year Heading in Serif */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentData.year}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-baseline gap-3 mb-6"
            >
              <h2
                className="text-5xl md:text-6xl font-normal font-serif tracking-tight"
                style={{ color: activeTheme.color }}
              >
                {currentData.year}
              </h2>
              {currentData.projection && (
                <span className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-400/20">
                  {t.map.forecast}
                </span>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Metrics Trio with Generous Spacing */}
          <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/[0.08] mb-6">
            <div className="text-center">
              <p className="text-[11px] text-slate-400 mb-1">{t.map.population}</p>
              <p className="text-base font-semibold text-white font-serif">
                {currentData.population.toLocaleString()}
              </p>
            </div>

            <div className="text-center border-x border-white/[0.08]">
              <p className="text-[11px] text-slate-400 mb-1">{t.map.landLoss}</p>
              <p
                className="text-base font-semibold font-serif"
                style={{ color: currentData.land_loss_hectares ? activeTheme.color : '#94a3b8' }}
              >
                {currentData.land_loss_hectares ? `${currentData.land_loss_hectares} ha` : '0 ha'}
              </p>
            </div>

            <div className="text-center">
              <p className="text-[11px] text-slate-400 mb-1">{t.map.salinity}</p>
              <p className="text-base font-semibold text-amber-300 font-serif">
                {currentData.salinity_ppt} ppt
              </p>
            </div>
          </div>

          {/* Interactive Timeline Stepper */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="text-[11px] uppercase tracking-wider">{t.map.timelineProgress}</span>
              <span className="font-mono text-[11px]">{Math.round(scrollProgress * 100)}%</span>
            </div>

            {/* Year Click Points */}
            <div className="grid grid-cols-4 gap-2">
              {timelineList.map((item, idx) => {
                const isActive = idx === timelineIndex;
                return (
                  <button
                    key={item.year}
                    onClick={() => setManualIndex(idx)}
                    className={`py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold shadow-inner'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    {item.year}
                  </button>
                );
              })}
            </div>

            <p className="text-[10px] text-slate-500 text-center pt-1 font-light">
              {t.map.sliderNotice}
            </p>
          </div>
        </div>

        {/* TOP-RIGHT CLEAN UTILITY DOCK */}
        <div className="hidden sm:flex absolute top-24 right-4 md:right-10 z-[1000] flex-col gap-2.5 items-end">
          
          {/* Satellite vs Dark Vector Switch */}
          <div className="bg-[#0c121e]/90 backdrop-blur-md p-1 rounded-2xl border border-white/[0.08] shadow-lg flex items-center gap-1">
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                mapStyle === 'satellite'
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.map.satelliteView}
            </button>
            <button
              onClick={() => setMapStyle('dark')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                mapStyle === 'dark'
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.map.darkView}
            </button>
          </div>

          {/* Action Pills: Free Explore & Comparison Slider */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowComparisonSlider(!showComparisonSlider)}
              className="px-3.5 py-1.5 rounded-2xl text-xs font-medium bg-[#0c121e]/90 backdrop-blur-md border border-white/[0.08] text-slate-300 hover:text-white transition-all shadow-md flex items-center gap-1.5"
            >
              <span>🛰️</span>
              <span>{showComparisonSlider ? 'Close Slider' : '2000 vs 2024'}</span>
            </button>

            <button
              onClick={() => setIsFreeExplore(!isFreeExplore)}
              className={`px-3.5 py-1.5 rounded-2xl text-xs font-medium border backdrop-blur-md transition-all shadow-md flex items-center gap-1.5 ${
                isFreeExplore
                  ? 'bg-teal-400 text-slate-950 border-teal-300 font-semibold'
                  : 'bg-[#0c121e]/90 text-slate-300 border-white/[0.08] hover:text-white'
              }`}
            >
              <span>{isFreeExplore ? '🔓' : '🔒'}</span>
              <span>{isFreeExplore ? t.map.freeExplore : t.map.lockScroll}</span>
            </button>
          </div>

          {/* Layer Checkboxes */}
          <div className="bg-[#0c121e]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/[0.08] shadow-lg flex items-center gap-4 text-xs text-slate-300">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={showCyclones}
                onChange={(e) => setShowCyclones(e.target.checked)}
                className="accent-teal-400 rounded"
              />
              <span>Cyclones</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={showSalinity}
                onChange={(e) => setShowSalinity(e.target.checked)}
                className="accent-amber-400 rounded"
              />
              <span>Salinity Radius</span>
            </label>
          </div>
        </div>

        {/* BEFORE/AFTER COMPARISON SLIDER OVERLAY */}
        {showComparisonSlider && (
          <div className="absolute inset-x-4 md:inset-x-24 top-24 bottom-20 z-[1050] bg-[#0c121e]/95 backdrop-blur-2xl rounded-3xl border border-white/[0.1] p-6 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-teal-400">🛰️</span>
                <h4 className="text-sm font-semibold text-white">
                  {t.map.comparisonNotice}
                </h4>
              </div>
              <button
                onClick={() => setShowComparisonSlider(false)}
                className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-lg bg-white/[0.05]"
              >
                ✕ Close
              </button>
            </div>

            <div className="relative flex-1 rounded-2xl overflow-hidden border border-white/[0.08] select-none">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/13/3565/6265')`,
                  filter: 'contrast(115%) saturate(110%)',
                }}
              >
                <div className="absolute top-4 right-4 bg-rose-500/80 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-semibold text-white">
                  2024: Critical Land Loss (410 ha)
                </div>
              </div>

              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-teal-400"
                style={{ width: `${sliderPos}%` }}
              >
                <div 
                  className="absolute inset-0 w-[100vw] max-w-none bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/13/3565/6265')`,
                    filter: 'hue-rotate(55deg) brightness(90%) contrast(105%)',
                  }}
                >
                  <div className="absolute top-4 left-4 bg-teal-500/80 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-semibold text-white">
                    2000: Equilibrium Mangrove Shore
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="5"
                max="95"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="absolute inset-x-0 bottom-4 w-10/12 mx-auto z-20 cursor-ew-resize accent-teal-400 opacity-90"
              />
            </div>
          </div>
        )}

        {/* FULL LEAFLET MAP CANVAS */}
        <div className="w-full h-full">
          <MapContainer
            center={coordinates}
            zoom={13}
            style={{ height: '100vh', width: '100%', background: '#080c14' }}
            className="z-0"
            zoomControl={isFreeExplore}
            dragging={isFreeExplore}
            scrollWheelZoom={isFreeExplore}
            doubleClickZoom={isFreeExplore}
            touchZoom={isFreeExplore}
            attributionControl={true}
          >
            {mapStyle === 'satellite' ? (
              <TileLayer
                key="esri-sat"
                className="satellite-dark-tiles"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution="Tiles &copy; Esri, Maxar"
              />
            ) : (
              <TileLayer
                key="osm-dark"
                className="free-dark-tiles"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
              />
            )}

            <MapCameraController
              center={coordinates}
              zoom={13}
              isFreeExplore={isFreeExplore}
            />

            {polygonPositions.length > 0 && (
              <Polygon
                positions={polygonPositions}
                pathOptions={{
                  color: activeTheme.color,
                  fillColor: activeTheme.color,
                  fillOpacity: activeTheme.fillOpacity,
                  weight: 3,
                  opacity: 0.9,
                  dashArray: timelineIndex === 3 ? '6, 6' : undefined,
                }}
              />
            )}

            {showSalinity && (
              <CircleMarker
                center={coordinates}
                radius={24 + currentData.salinity_ppt * 1.5}
                pathOptions={{
                  color: '#f59e0b',
                  fillColor: '#f59e0b',
                  fillOpacity: 0.1,
                  weight: 1.5,
                  dashArray: '4, 4',
                }}
              />
            )}

            <Marker position={coordinates} icon={createRadarIcon(activeTheme.color)}>
              <Popup>
                <div className="p-1 text-center min-w-[140px]">
                  <strong className="text-sm font-serif font-bold block mb-1" style={{ color: activeTheme.color }}>
                    {lang === 'bn' ? village.name_bn : village.name}
                  </strong>
                  <p className="text-xs text-slate-300">
                    Year: <strong>{currentData.year}</strong>
                  </p>
                  <p className="text-xs text-slate-300">
                    Population: <strong>{currentData.population.toLocaleString()}</strong>
                  </p>
                </div>
              </Popup>
            </Marker>

            {showCyclones &&
              cyclonePoints.map((cyc, idx) => (
                <Marker
                  key={idx}
                  position={[cyc.lat, cyc.lng]}
                  icon={createCycloneIcon()}
                >
                  <Popup>
                    <div className="p-1 text-center">
                      <strong className="text-xs text-rose-400 block font-semibold">
                        {cyc.name}
                      </strong>
                      <p className="text-[11px] text-slate-300">
                        Surge: <strong>{cyc.surge}</strong>
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>

      </div>
    </section>
  );
}