import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import villageData from '../data/villageData.json';
import { useLanguage } from '../context/LanguageContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ChartSection() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('sea-level');

  const seaData = villageData.sea_level_data;
  const salinityData = villageData.salinity_comparison;
  const cycloneData = villageData.cyclones;
  const migrationData = villageData.migration_flow;

  // TAB 1: Sea Level Rise Chart
  const seaLevelChartData = {
    labels: seaData.map((d) => d.year),
    datasets: [
      {
        label: lang === 'bn' ? 'আবহাওয়া অধিদপ্তর রেকর্ড (+সেমি)' : 'Observed Records (BMD)',
        data: seaData.map((d) => d.historical),
        borderColor: '#2dd4bf',
        backgroundColor: 'rgba(45, 212, 191, 0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#2dd4bf',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.35,
        fill: true,
      },
      {
        label: lang === 'bn' ? 'IPCC SSP2-4.5 (চলমান গতিপথ)' : 'IPCC SSP2-4.5 (Current Trend)',
        data: seaData.map((d) => d.ssp2),
        borderColor: '#38bdf8',
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        borderDash: [6, 4],
        pointRadius: 4,
        pointBackgroundColor: '#38bdf8',
        tension: 0.35,
      },
      {
        label: lang === 'bn' ? 'IPCC SSP5-8.5 (চরম ক্ষয়)' : 'IPCC SSP5-8.5 (High Emissions)',
        data: seaData.map((d) => d.ssp5),
        borderColor: '#f43f5e',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderDash: [4, 4],
        pointRadius: 3,
        pointBackgroundColor: '#f43f5e',
        tension: 0.35,
      },
    ],
  };

  // TAB 2: Salinity Bar Chart
  const salinityChartData = {
    labels: salinityData.map((d) => d.location),
    datasets: [
      {
        label: lang === 'bn' ? 'লবণাক্ততা (পিপিটি)' : 'Salinity (Parts per Thousand - ppt)',
        data: salinityData.map((d) => d.salinity_ppt),
        backgroundColor: salinityData.map((d) => {
          if (d.status === 'safe') return '#14b8a6';
          if (d.status === 'moderate') return '#f59e0b';
          if (d.status === 'severe') return '#f97316';
          return '#f43f5e';
        }),
        borderRadius: 6,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: { size: 12, family: "'Inter', sans-serif" },
          padding: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(12, 18, 30, 0.95)',
        titleColor: '#2dd4bf',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 11, family: "'Inter', sans-serif" } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b', font: { size: 11, family: "'Inter', sans-serif" } },
      },
    },
  };

  return (
    <section 
      id="chart-section" 
      className="relative min-h-screen bg-[#080c14] py-36 md:py-48 px-6 md:px-16 flex flex-col justify-center items-center border-t border-white/[0.06]"
    >
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Spacious Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-teal-300 text-xs font-medium tracking-wide uppercase mb-4">
            {t.chart.breadcrumb}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight mb-4">
            {t.chart.title}
          </h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            {t.chart.subtitle}
          </p>
        </div>

        {/* Calm Dashboard Tab Selectors */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 flex-wrap">
          {[
            { id: 'sea-level', label: t.chart.tabSeaLevel, icon: '🌊' },
            { id: 'salinity', label: t.chart.tabSalinity, icon: '🧂' },
            { id: 'cyclones', label: t.chart.tabCyclones, icon: '🌀' },
            { id: 'migration', label: t.chart.tabMigration, icon: '🚶' },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                  isSelected
                    ? 'bg-white/10 text-white border-teal-400/40 font-semibold shadow-sm'
                    : 'bg-transparent text-slate-400 border-white/[0.08] hover:text-slate-200 hover:border-white/20'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Dashboard Card with Ample Breathing Room */}
        <div className="bg-[#0c121e]/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/[0.08] shadow-2xl mb-16">
          
          <AnimatePresence mode="wait">
            {/* TAB 1: Sea Level Rise */}
            {activeTab === 'sea-level' && (
              <motion.div
                key="sea-level"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 pb-4 border-b border-white/[0.06]">
                  <h3 className="text-lg font-serif font-normal text-white">
                    Historical Observations & IPCC Projections (2000–2050)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Comparison between observed local tidal gauge metrics and global shared socioeconomic pathways.
                  </p>
                </div>

                <div className="h-[380px] md:h-[440px]">
                  <Line data={seaLevelChartData} options={commonOptions} />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2 border-t border-white/[0.06] pt-4 font-light">
                  <span>Elevation change relative to year 2000 base level</span>
                  <span className="text-teal-300">{t.chart.sourceCitation}</span>
                </div>
              </motion.div>
            )}

            {/* TAB 2: Groundwater Salinity */}
            {activeTab === 'salinity' && (
              <motion.div
                key="salinity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 pb-4 border-b border-white/[0.06]">
                  <h3 className="text-lg font-serif font-normal text-white">
                    Groundwater Salinity vs. Health Thresholds
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-light">
                    Measuring parts per thousand (ppt) against World Health Organization drinking safety standards.
                  </p>
                </div>

                <div className="h-[380px] md:h-[440px]">
                  <Bar data={salinityChartData} options={commonOptions} />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2 border-t border-white/[0.06] pt-4 font-light">
                  <span className="text-amber-400 font-medium">
                    ⚠️ Salinity exceeding 1.0 ppt induces chronic maternal hypertension and kidney failure.
                  </span>
                  <span>Source: WHO Guidelines & Coastal Water Quality Lab</span>
                </div>
              </motion.div>
            )}

            {/* TAB 3: Cyclones */}
            {activeTab === 'cyclones' && (
              <motion.div
                key="cyclones"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2"
              >
                {cycloneData.map((cyc, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-base font-serif font-medium text-white flex items-center gap-2">
                        <span>{lang === 'bn' ? cyc.name_bn : cyc.name}</span>
                        <span className="text-xs text-slate-500">({cyc.year})</span>
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                        {cyc.surge_meters}m Surge
                      </span>
                    </div>
                    <p className="text-xs text-teal-300 font-medium mb-2">{cyc.category}</p>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">{cyc.impact}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 4: Migration Pipeline */}
            {activeTab === 'migration' && (
              <motion.div
                key="migration"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="py-2 space-y-6"
              >
                <p className="text-sm text-slate-300 leading-relaxed font-light max-w-2xl">
                  When riverbank erosion washes away agricultural lands, climate refugees follow a predictable chain of urban relocation:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {migrationData.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between"
                    >
                      <div className="text-2xl font-serif font-semibold text-teal-300 mb-2">{step.count}</div>
                      <div className="text-sm font-semibold text-white mb-1">{step.stage}</div>
                      <div className="text-xs text-slate-400 font-light">{step.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* 3 Spacious Insight Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.chart.statCards.map((card, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center"
            >
              <h3 className="text-3xl sm:text-4xl font-normal font-serif text-teal-300 mb-2">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
