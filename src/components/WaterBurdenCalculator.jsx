import { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function WaterBurdenCalculator() {
  const { t } = useLanguage();
  const householdInputId = useId();
  const distanceInputId = useId();

  // State
  const [householdSize, setHouseholdSize] = useState(5);
  const [distanceKm, setDistanceKm] = useState(3.5);

  // Calculations
  const totalLitersNeeded = householdSize * 20;
  const pitcherCapacity = 15;
  const tripsNeeded = Math.ceil(totalLitersNeeded / pitcherCapacity);
  const totalWalkedKm = tripsNeeded * (distanceKm * 2);
  const hoursSpentDaily = (totalWalkedKm / 3.2).toFixed(1);
  const monthlyHoursLost = Math.round(Number(hoursSpentDaily) * 30);

  // Health risk tier
  let healthRisk = t.calculator.healthModerate;
  let badgeColor = 'bg-amber-500/10 text-amber-300 border-amber-500/20';

  if (distanceKm > 4 || householdSize >= 6) {
    healthRisk = t.calculator.healthSevere;
    badgeColor = 'bg-rose-500/10 text-rose-300 border-rose-500/20';
  } else if (distanceKm > 2) {
    healthRisk = t.calculator.healthHigh;
    badgeColor = 'bg-amber-500/10 text-amber-300 border-amber-500/20';
  }

  return (
    <section 
      id="calculator-section" 
      className="relative min-h-screen bg-[#080c14] py-36 md:py-48 px-6 md:px-16 flex flex-col justify-center items-center border-t border-white/[0.06]"
    >
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Spacious Section Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-teal-300 text-xs font-medium tracking-wide uppercase mb-4">
            {t.calculator.breadcrumb}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal font-serif text-white tracking-tight mb-4">
            {t.calculator.title}
          </h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Spacious 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Inputs (5 cols) */}
          <div className="lg:col-span-5 bg-[#0c121e]/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/[0.08] shadow-xl space-y-10">
            <h3 className="text-lg font-serif font-normal text-white border-b border-white/[0.06] pb-4">
              Household Variables
            </h3>

            {/* Slider 1: Household Members */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label htmlFor={householdInputId} className="text-xs text-slate-300 font-medium">
                  {t.calculator.familyMembers}
                </label>
                <span className="text-base font-serif font-semibold text-teal-300">
                  {householdSize} persons
                </span>
              </div>
              <input
                id={householdInputId}
                type="range"
                min="2"
                max="10"
                step="1"
                value={householdSize}
                onChange={(e) => setHouseholdSize(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-light">
                <span>Small (2)</span>
                <span>Average (5)</span>
                <span>Extended (10)</span>
              </div>
            </div>

            {/* Slider 2: Walking Distance */}
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <label htmlFor={distanceInputId} className="text-xs text-slate-300 font-medium">
                  {t.calculator.walkingDistance}
                </label>
                <span className="text-base font-serif font-semibold text-teal-300">
                  {distanceKm} km
                </span>
              </div>
              <input
                id={distanceInputId}
                type="range"
                min="0.5"
                max="8.0"
                step="0.5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-light">
                <span>0.5 km (Near)</span>
                <span>3.5 km (Typical)</span>
                <span>8.0 km (Extreme)</span>
              </div>
            </div>

            {/* Context Note */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-400 leading-relaxed font-light">
              💡 <strong>Field Observation:</strong> Over 88% of water harvesting in Dacope is performed by women carrying heavy 15-liter metal pitchers in tropical humidity.
            </div>
          </div>

          {/* Right Column: Calculated Outputs (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c121e]/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-white/[0.08] shadow-xl space-y-8">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <h3 className="text-lg font-serif font-normal text-white">
                {t.calculator.calcResultsTitle}
              </h3>
              <span className={`text-[11px] font-medium px-3 py-0.5 rounded-full border ${badgeColor}`}>
                {healthRisk}
              </span>
            </div>

            {/* 4 Metric Tiles with Playfair Display Numbers */}
            <div className="grid grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-3xl sm:text-4xl font-normal font-serif text-rose-400 mb-1">
                  {hoursSpentDaily} <span className="text-sm font-sans text-slate-400">hrs</span>
                </div>
                <div className="text-xs text-slate-400 font-light">
                  {t.calculator.hoursWalking}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-3xl sm:text-4xl font-normal font-serif text-teal-300 mb-1">
                  {totalLitersNeeded} <span className="text-sm font-sans text-slate-400">L</span>
                </div>
                <div className="text-xs text-slate-400 font-light">
                  {t.calculator.litersCarried} ({tripsNeeded} round trips)
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-3xl sm:text-4xl font-normal font-serif text-amber-300 mb-1">
                  {totalWalkedKm.toFixed(1)} <span className="text-sm font-sans text-slate-400">km</span>
                </div>
                <div className="text-xs text-slate-400 font-light">
                  Total Distance Traveled Daily
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                <div className="text-3xl sm:text-4xl font-normal font-serif text-slate-200 mb-1">
                  ~{monthlyHoursLost} <span className="text-sm font-sans text-slate-400">hrs</span>
                </div>
                <div className="text-xs text-slate-400 font-light">
                  {t.calculator.economicImpact}
                </div>
              </div>

            </div>

            {/* Takeaway Insight */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <strong className="text-teal-300 block mb-1">Academic Takeaway:</strong>
              {t.calculator.takeaway}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
