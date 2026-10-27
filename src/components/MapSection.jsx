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

// Smooth Camera & Interactive Mode Controller (Fixes React-Leaflet immutable props & mobile offset)
function MapCameraController({ center, zoom, isFreeExplore, isMobile }) {
  const map = useMap();

  // Dynamically toggle map interactions when isFreeExplore changes
  useEffect(() => {
    if (isFreeExplore) {
      map.dragging.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.scrollWheelZoom.enable();
    } else {
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();
    }
  }, [isFreeExplore, map]);

  // Center camera with vertical offset on mobile so bottom HUD doesn't cover the polygon
  useEffect(() => {
    map.invalidateSize();
    if (!isFreeExplore && center?.length === 2) {
      const targetZoom = isMobile ? zoom - 1 : zoom;
      // Shift latitude slightly south on mobile so the village sits in the upper visible canvas
      const latOffset = isMobile ? -0.022 : 0;
      map.setView([center[0] + latOffset, center[1]], targetZoom, {
        animate: true,
        duration: 0.7,
      });
    }
  }, [center, zoom, isFreeExplore, isMobile, map]);

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
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport for camera offset & zoom adjustment
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

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
      badgeBg: 'bg-teal-500/15 text-teal-300 border-teal-500/30',
      label: lang === 'bn' ? currentData.status_bn : currentData.status_en,
      fillOpacity: 0.35,
    },
    {
      color: '#f59e0b', // Amber
      badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      label: lang === 'bn' ? currentData.status_bn : currentData.status_en,
      fillOpacity: 0.4,
    },
    {
      color: '#f43f5e', // Rose
      badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      label: lang === 'bn' ? currentData.status_bn : currentData.status_en,
      fillOpacity: 0.5,
    },
    {
      color: '#38bdf8', // Sky Blue
      badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
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
      className="relative h-[350vh] md:h-[400vh] bg-[#080c14] select-none"
    >
      <style>{`
        @keyframes pingSlow {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        .free-dark-tiles {
          filter: invert(100%) hue-rotate(185deg) brightness(85%) contrast(90%) saturate(120%);
        }
        .satellite-dark-tiles {
          filter: brightness(75%) contrast(110%) saturate(105%);
        }
        .leaflet-popup-content-wrapper {
          background: rgba(12, 18, 30, 0.95) !important;
          backdrop-filter: blur(12px);
          color: #f8fafc !important;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px !important;
        }
        .leaflet-popup-tip {
          background: rgba(12, 18, 30, 0.95) !important;
        }
        /* Allow smooth vertical page scrolling on mobile when map is locked */
        .map-scroll-passthrough .leaflet-container {
          touch-action: pan-y !important;
        }
      `}</style>

      {/* Sticky Fullscreen Scrollytelling Canvas (100dvh prevents mobile address bar jump) */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        
        {/* Soft Vignette Mask */}
        <div className="pointer-events-none absolute inset-0 z-[400] bg-[radial-gradient(circle_at_center,transparent_35%,rgba(8,12,20,0.85)_100%)]" />

        {/* =========================================================
            MOBILE TOP BAR (< 768px): Village Switcher + Tools Button
           ========================================================= */}
        <div className="md:hidden absolute top-16 inset-x-3 z-[1000] flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {/* Compact Village Pills */}
            <div className="flex-1 flex items-center gap-1 p-1 bg-[#0c121e]/90 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-lg overflow-x-auto">
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
                    className={`flex-1 py-1.5 px-2.5 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-teal-400 text-slate-950 font-semibold shadow-sm'
                        : 'text-slate-300'
                    }`}
                  >
                    {lang === 'bn' ? item.name_bn : item.name}
                  </button>
                );
              })}
            </div>

            {/* Mobile Map Pan Toggle */}
            <button
              onClick={() => setIsFreeExplore(!isFreeExplore)}
              className={`px-3 py-2 rounded-2xl text-xs font-medium border backdrop-blur-xl shadow-lg flex items-center gap-1 ${
                isFreeExplore
                  ? 'bg-teal-400 text-slate-950 border-teal-300 font-semibold'
                  : 'bg-[#0c121e]/90 text-slate-200 border-white/[0.08]'
              }`}
              title="Toggle Map Panning"
            >
              <span>{isFreeExplore ? '🔓' : '🔒'}</span>
            </button>

            {/* Mobile Layers & Tools Drawer Button */}
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className={`px-3 py-2 rounded-2xl text-xs font-medium border backdrop-blur-xl shadow-lg flex items-center gap-1 ${
                mobileToolsOpen
                  ? 'bg-white/20 text-white border-white/20'
                  : 'bg-[#0c121e]/90 text-slate-200 border-white/[0.08]'
              }`}
            >
              <span>⚙️</span>
            </button>
          </div>

          {/* Collapsible Mobile Utility Drawer */}
          <AnimatePresence>
            {mobileToolsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-[#0c121e]/95 backdrop-blur-2xl p-3.5 rounded-2xl border border-white/[0.1] shadow-2xl flex flex-col gap-3"
              >
                <div className="flex items-center justify-between gap-2">
                  {/* Satellite / Dark Toggle */}
                  <div className="flex flex-1 bg-white/[0.05] p-1 rounded-xl border border-white/[0.06]">
                    <button
                      onClick={() => setMapStyle('satellite')}
                      className={`flex-1 py-1 rounded-lg text-[11px] font-medium ${
                        mapStyle === 'satellite' ? 'bg-white/15 text-white font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {t.map.satelliteView}
                    </button>
                    <button
                      onClick={() => setMapStyle('dark')}
                      className={`flex-1 py-1 rounded-lg text-[11px] font-medium ${
                        mapStyle === 'dark' ? 'bg-white/15 text-white font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {t.map.darkView}
                    </button>
                  </div>

                  {/* 2000 vs 2024 Slider Trigger */}
                  <button
                    onClick={() => {
                      setShowComparisonSlider(!showComparisonSlider);
                      setMobileToolsOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-medium bg-teal-500/15 text-teal-300 border border-teal-500/30 whitespace-nowrap"
                  >
                    🛰️ 2000 vs 2024
                  </button>
                </div>

                {/* Checkboxes for Cyclones & Salinity */}
                <div className="flex items-center justify-around pt-1 border-t border-white/[0.06] text-xs text-slate-300">
                  <label className="flex items-center gap-1.5 py-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCyclones}
                      onChange={(e) => setShowCyclones(e.target.checked)}
                      className="accent-teal-400 rounded"
                    />
                    <span>Cyclones</span>
                  </label>

                  <label className="flex items-center gap-1.5 py-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showSalinity}
                      onChange={(e) => setShowSalinity(e.target.checked)}
                      className="accent-amber-400 rounded"
                    />
                    <span>Salinity Radius</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================
            MAIN HUD CARD: Bottom-Docked on Mobile, Top-Left on Desktop
           ========================================================= */}
        <div className="absolute bottom-3 inset-x-3 md:bottom-auto md:top-24 md:left-10 md:right-auto z-[1000] md:w-[420px] rounded-3xl bg-[#0c121e]/90 backdrop-blur-xl p-4 sm:p-5 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/[0.08]">
          
          {/* Desktop-Only Village Selector (Hidden on Mobile to save vertical space) */}
          <div className="hidden md:block mb-6">
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

          {/* Header Row: Year + District & Status Badge */}
          <div className="flex items-center justify-between gap-2 mb-3 md:mb-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentData.year}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-baseline gap-2.5"
              >
                <h2
                  className="text-3xl sm:text-4xl md:text-6xl font-normal font-serif tracking-tight leading-none"
                  style={{ color: activeTheme.color }}
                >
                  {currentData.year}
                </h2>
                {currentData.projection && (
                  <span className="text-[10px] md:text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-400/20">
                    {t.map.forecast}
                  </span>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col items-end gap-1">
              <span className={`text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${activeTheme.badgeBg}`}>
                {activeTheme.label}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: activeTheme.color }}
                />
                <span className="text-[11px] text-slate-400 font-medium">
                  {lang === 'bn' ? village.district_bn : village.district}
                </span>
              </div>
            </div>
          </div>

          {/* Metrics Trio */}
          <div className="grid grid-cols-3 gap-2 md:gap-3 py-2.5 md:py-4 border-y border-white/[0.08] mb-3 md:mb-6">
            <div className="text-center">
              <p className="text-[10px] md:text-[11px] text-slate-400 mb-0.5 md:mb-1">{t.map.population}</p>
              <p className="text-sm md:text-base font-semibold text-white font-serif">
                {currentData.population.toLocaleString()}
              </p>
            </div>

            <div className="text-center border-x border-white/[0.08]">
              <p className="text-[10px] md:text-[11px] text-slate-400 mb-0.5 md:mb-1">{t.map.landLoss}</p>
              <p
                className="text-sm md:text-base font-semibold font-serif"
                style={{ color: currentData.land_loss_hectares ? activeTheme.color : '#94a3b8' }}
              >
                {currentData.land_loss_hectares ? `${currentData.land_loss_hectares} ha` : '0 ha'}
              </p>
            </div>

            <div className="text-center">
              <p className="text-[10px] md:text-[11px] text-slate-400 mb-0.5 md:mb-1">{t.map.salinity}</p>
              <p className="text-sm md:text-base font-semibold text-amber-300 font-serif">
                {currentData.salinity_ppt} ppt
              </p>
            </div>
          </div>

          {/* Interactive Timeline Stepper */}
          <div className="space-y-2 md:space-y-3">
            <div className="hidden md:flex justify-between items-center text-xs text-slate-400">
              <span className="text-[11px] uppercase tracking-wider">{t.map.timelineProgress}</span>
              <span className="font-mono text-[11px]">{Math.round(scrollProgress * 100)}%</span>
            </div>

            {/* Year Click Points */}
            <div className="grid grid-cols-4 gap-1.5 md:gap-2">
              {timelineList.map((item, idx) => {
                const isActive = idx === timelineIndex;
                return (
                  <button
                    key={item.year}
                    onClick={() => setManualIndex(idx)}
                    className={`py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold shadow-inner border border-white/10'
                        : 'text-slate-400 hover:text-slate-200 bg-white/[0.02]'
                    }`}
                  >
                    {item.year}
                  </button>
                );
              })}
            </div>

            <p className="hidden md:block text-[10px] text-slate-500 text-center pt-1 font-light">
              {t.map.sliderNotice}
            </p>
          </div>
        </div>

        {/* =========================================================
            DESKTOP TOP-RIGHT UTILITY DOCK (>= 768px)
           ========================================================= */}
        <div className="hidden md:flex absolute top-24 right-10 z-[1000] flex-col gap-2.5 items-end">
          
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

        {/* =========================================================
            BEFORE/AFTER COMPARISON SLIDER OVERLAY (Mobile & Desktop)
           ========================================================= */}
        {showComparisonSlider && (
          <div className="absolute inset-x-3 top-16 bottom-4 md:inset-x-24 md:top-24 md:bottom-20 z-[1050] bg-[#0c121e]/95 backdrop-blur-2xl rounded-3xl border border-white/[0.1] p-4 md:p-6 shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-3 md:mb-4 pb-2.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-teal-400">🛰️</span>
                <h4 className="text-xs md:text-sm font-semibold text-white">
                  {t.map.comparisonNotice}
                </h4>
              </div>
              <button
                onClick={() => setShowComparisonSlider(false)}
                className="text-xs text-slate-300 hover:text-white px-3 py-1 rounded-lg bg-white/[0.08]"
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
                <div className="absolute top-3 right-3 bg-rose-500/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold text-white">
                  2024: Critical Land Loss (410 ha)
                </div>
              </div>

              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-teal-400"
                style={{ width: `${sliderPos}%` }}
              >
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/13/3565/6265')`,
                    filter: 'hue-rotate(55deg) brightness(90%) contrast(105%)',
                  }}
                >
                  <div className="absolute bottom-14 left-3 md:top-3 md:bottom-auto bg-teal-500/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold text-white whitespace-nowrap">
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
                className="absolute inset-x-0 bottom-4 w-11/12 md:w-10/12 mx-auto z-20 cursor-ew-resize accent-teal-400 opacity-95 h-6"
              />
            </div>
          </div>
        )}

        {/* =========================================================
            FULL LEAFLET MAP CANVAS
           ========================================================= */}
        <div className={`w-full h-full ${!isFreeExplore ? 'map-scroll-passthrough' : ''}`}>
          <MapContainer
            center={coordinates}
            zoom={13}
            style={{ height: '100dvh', width: '100%', background: '#080c14' }}
            className="z-0"
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
            touchZoom={false}
            attributionControl={false}
          >
            {mapStyle === 'satellite' ? (
              <TileLayer
                key="esri-sat"
                className="satellite-dark-tiles"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            ) : (
              <TileLayer
                key="osm-dark"
                className="free-dark-tiles"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}

            <MapCameraController
              center={coordinates}
              zoom={13}
              isFreeExplore={isFreeExplore}
              isMobile={isMobile}
            />

            {polygonPositions.length > 0 && (
              <Polygon
                positions={polygonPositions}
                pathOptions={{
                  color: activeTheme.color,
                  fillColor: activeTheme.color,
                  fillOpacity: activeTheme.fillOpacity,
                  weight: 2.5,
                  opacity: 0.9,
                  dashArray: timelineIndex === 3 ? '6, 6' : undefined,
                }}
              />
            )}

            {showSalinity && (
              <CircleMarker
                center={coordinates}
                radius={isMobile ? 18 + currentData.salinity_ppt * 1.1 : 24 + currentData.salinity_ppt * 1.5}
                pathOptions={{
                  color: '#f59e0b',
                  fillColor: '#f59e0b',
                  fillOpacity: 0.12,
                  weight: 1.5,
                  dashArray: '4, 4',
                }}
              />
            )}

            <Marker position={coordinates} icon={createRadarIcon(activeTheme.color)}>
              <Popup>
                <div className="p-1 text-center min-w-[130px]">
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