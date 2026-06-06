import React, { useState } from 'react';
import { ProgramState, DailyEntry } from '../types';
import { WORKOUT_ROUTINE } from '../mockData';
import { Heart, Activity, Sliders, TrendingUp, Sparkles, Plus, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface HealthDashboardProps {
  state: ProgramState;
  onUpdateState: (updatedState: Partial<ProgramState>) => void;
}

export default function HealthDashboard({ state, onUpdateState }: HealthDashboardProps) {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'ninety'>('weekly');

  const HEALTH_AFFIRMATION = "I am becoming a man who lovingly takes care of the body God entrusted to him.";

  const HEALTH_GOALS = [
    "Heal wrist injury with slow exercises",
    "Build strength safely (No back-to-pack workouts)",
    "Improve mobility & spine alignment",
    "Regulate blood pressure & stay hydrated",
    "Improve sleep regularity by sleeping before 10:30 PM",
    "Calm physical and mental nervous system",
    "Eat consciously with balanced protein target",
    "Feel connected to body and mind in daily meditation",
    "Trust my body & learn to slow down"
  ];

  // Helper to resolve daily entries in chronological order
  const getSortedEntries = (): DailyEntry[] => {
    return Object.keys(state.dailyEntries)
      .sort()
      .map(k => state.dailyEntries[k]);
  };

  const sortedEntries = getSortedEntries();

  // Helper to slice data based on selected timeframe
  const getFilteredEntries = (): DailyEntry[] => {
    const todayIndex = sortedEntries.findIndex(e => e.dateStr === new Date().toISOString().split('T')[0]);
    // If today is not mapped yet (e.g. out of ranges), use all past days with entries up to the current Day
    const activeIndex = todayIndex !== -1 ? todayIndex : 5; // default to day 6 in dummy
    
    if (timeframe === 'weekly') {
      // Last 7 days
      return sortedEntries.slice(Math.max(0, activeIndex - 6), activeIndex + 1);
    } else if (timeframe === 'monthly') {
      // Last 30 days
      return sortedEntries.slice(Math.max(0, activeIndex - 29), activeIndex + 1);
    } else {
      // 90-day progress
      return sortedEntries.slice(0, activeIndex + 1);
    }
  };

  const filteredEntries = getFilteredEntries();

  // Render a custom minimal trend SVG line
  const renderTrendSVG = (
    label: string, 
    valueExtractor: (e: DailyEntry) => number, 
    color: string, 
    unit: string,
    targetVal?: number
  ) => {
    const dataPoints = filteredEntries.map(e => ({
      day: e.dayNum,
      val: valueExtractor(e)
    }));

    const maxVal = Math.max(...dataPoints.map(p => p.val), targetVal || 1) || 120;
    const minVal = 0; // standard floor
    
    // Width & height of responsive SVG
    const width = 500;
    const height = 120;
    const padding = 20;

    // Map points to SVG coordinates
    const pointsSVG = dataPoints.map((p, idx) => {
      const x = padding + (idx / Math.max(1, dataPoints.length - 1)) * (width - padding * 2);
      const ratio = (p.val - minVal) / Math.max(1, maxVal - minVal);
      const y = height - padding - ratio * (height - padding * 2);
      return { x, y, ...p };
    });

    // Create path string
    let pathD = '';
    if (pointsSVG.length > 0) {
      pathD = `M ${pointsSVG[0].x} ${pointsSVG[0].y}`;
      for (let i = 1; i < pointsSVG.length; i++) {
        pathD += ` L ${pointsSVG[i].x} ${pointsSVG[i].y}`;
      }
    }

    // Calculate current average
    const average = dataPoints.length > 0 
      ? Math.round(dataPoints.reduce((acc, p) => acc + p.val, 0) / dataPoints.length)
      : 0;

    const latestValue = dataPoints.length > 0 ? dataPoints[dataPoints.length - 1].val : 0;

    return (
      <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between" id={`chart-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-xs font-semibold text-slate-500 font-sans uppercase tracking-wider">{label}</h4>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg font-mono font-bold text-slate-800">{latestValue}</span>
              <span className="text-[10px] text-slate-400">{unit}</span>
            </div>
          </div>
          <div className="text-right text-[10px] font-mono text-slate-400">
            <span className="block font-semibold">AVG</span>
            <span className="text-slate-600">{average} {unit}</span>
          </div>
        </div>

        {/* The SVG element */}
        <div className="relative w-full h-24 my-2">
          {dataPoints.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs italic">
              No entries logged for this timeframe
            </div>
          ) : (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
              {/* Target Line if provided */}
              {targetVal && (
                <line 
                  x1={padding} 
                  y1={height - padding - ((targetVal - minVal) / (maxVal - minVal)) * (height - padding * 2)} 
                  x2={width - padding} 
                  y2={height - padding - ((targetVal - minVal) / (maxVal - minVal)) * (height - padding * 2)} 
                  stroke="#d4af37" 
                  strokeWidth="1" 
                  strokeDasharray="4,4" 
                  opacity="0.8"
                />
              )}
              {/* Core trend line path */}
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Highlight Data circles for smaller ranges */}
              {timeframe === 'weekly' && pointsSVG.map((p, idx) => (
                <g key={idx} className="group">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4.5"
                    fill="white"
                    stroke={color}
                    strokeWidth="2"
                    className="cursor-pointer hover:r-6 transition-all duration-150"
                  />
                  <title>{`Day ${p.day}: ${p.val}${unit}`}</title>
                </g>
              ))}
            </svg>
          )}
        </div>
        
        {targetVal && (
          <div className="text-[9px] text-[#C9A227] font-sans flex items-center gap-1 mt-1">
            <ShieldCheck size={10} /> Target: {targetVal} {unit}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-10" id="health-dashboard-wrapper">
      
      {/* Upper header section */}
      <div className="bg-[#EEF6F1] border border-[#5E9B71]/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between shadow-3xs" id="health-affirmation-box">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-xs tracking-widest font-mono text-[#5E9B71] uppercase bg-white px-3 py-1 rounded-full border border-[#5E9B71]/10 font-bold">
            The Main Quest
          </span>
          <h2 className="text-xl md:text-2xl font-serif italic text-slate-800 leading-snug">
            "{HEALTH_AFFIRMATION}"
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Success is not defined by instant healing, muscle gain, or high metrics. Success is defined by the tender caregiver loyalty you establish with your unique biological body over these 90 days.
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4 w-full md:w-auto text-center shrink-0 border-slate-100">
          <Heart size={32} className="text-[#5E9B71] mx-auto animate-pulse stroke-[1.5]" />
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase mt-2">Recovery Focus</h4>
          <span className="text-sm font-semibold text-slate-700">Wrist Care + Sleep</span>
        </div>
      </div>

      {/* Routine schedule displays */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="routines-grid">
        
        {/* Workout Routine Card */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col justify-between shadow-2xs" id="weekly-workout-system">
          <div>
            <div className="flex items-center gap-3 border-b border-slate-50 pb-3 mb-4">
              <Activity size={18} className="text-[#5E9B71]" />
              <h3 className="font-sans font-medium text-slate-800 leading-tight">Workout Routine</h3>
            </div>
            
            <p className="text-xs text-slate-400 mb-4 font-sans leading-relaxed">
              No back-to-back workouts. Continuous rest ensures tendon repair and blood pressure regulation.
            </p>

            <div className="space-y-2.5">
              {Object.entries(WORKOUT_ROUTINE).map(([day, routine]) => {
                const isRest = routine.includes('Rest');
                return (
                  <div key={day} className="flex justify-between items-center py-2 px-3 border border-transparent rounded-lg text-xs font-sans hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-500 font-mono w-20">{day}</span>
                    <span className={`text-right ${isRest ? 'text-slate-400 italic font-normal' : 'text-slate-700 font-bold'}`}>
                      {routine.split(' (')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 mt-6 bg-[#EEF6F1]/40 p-3 rounded-lg text-[10px] text-slate-500 flex gap-2">
            <span className="text-sm">⚠️</span>
            <p className="leading-snug">
              **Wrist alert**: Avoid weighted curls, heavy pushups, or extreme wrist extension. Rely on forearm supports or bodyweight alignment.
            </p>
          </div>
        </div>

        {/* Goals List Card */}
        <div className="md:col-span-8 bg-white rounded-2xl border border-slate-100 p-6 shadow-2xs" id="health-goals-tracker">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-4 mb-6">
            <div>
              <h3 className="font-sans font-medium text-slate-800">My Healing Goals</h3>
              <p className="text-xs text-slate-400 mt-0.5">Physical dimensions being loved daily.</p>
            </div>
            
            {/* Timeframe switchers */}
            <div className="flex bg-slate-50 border p-1 rounded-lg gap-1 border-slate-150/50">
              {(['weekly', 'monthly', 'ninety'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md transition-all cursor-pointer font-bold ${
                    timeframe === t 
                      ? 'bg-[#EEF6F1] text-[#5E9B71] border border-[#5E9B71]/10 font-semibold' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {t === 'weekly' ? 'Weekly' : t === 'monthly' ? 'Monthly' : '90 Days'}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Goals checklist render */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6" id="goals-grid-internal">
            {HEALTH_GOALS.map((goal, index) => (
              <div key={index} className="flex gap-2.5 items-start p-2.5 border border-slate-50 hover:bg-[#FAF9F6] rounded-xl transition-all">
                <span className="text-[#5E9B71] text-xs font-mono font-bold mt-0.5">0{index + 1}.</span>
                <span className="text-xs text-slate-600 font-sans leading-relaxed">{goal}</span>
              </div>
            ))}
          </div>

          {/* Minimalist target modification card */}
          <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs">⚙️</span>
              <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Adjust Daily Healing Intention Targets</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">Protein (grams)</label>
                <input 
                  type="number"
                  value={state.proteinTarget ?? 90}
                  onChange={(e) => onUpdateState({ proteinTarget: Number(e.target.value) || 0 })}
                  className="w-full text-xs font-mono font-bold text-slate-800 bg-white border border-slate-150 p-2 rounded-lg focus:outline-none focus:border-[#5E9B71]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">Water (milliliters)</label>
                <input 
                  type="number"
                  value={state.waterTarget ?? 3000}
                  onChange={(e) => onUpdateState({ waterTarget: Number(e.target.value) || 0 })}
                  className="w-full text-xs font-mono font-bold text-slate-800 bg-white border border-slate-150 p-2 rounded-lg focus:outline-none focus:border-[#5A8FBA]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">Steps Target</label>
                <input 
                  type="number"
                  value={state.stepsTarget ?? 7000}
                  onChange={(e) => onUpdateState({ stepsTarget: Number(e.target.value) || 0 })}
                  className="w-full text-xs font-mono font-bold text-slate-800 bg-white border border-slate-150 p-2 rounded-lg focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>
          </div>

          {/* Render trend lines in bento layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="graphs-grid">
            {renderTrendSVG('Protein Intake', e => e.health.protein || 0, '#5E9B71', 'g', state.proteinTarget ?? 90)}
            {renderTrendSVG('Water Goal', e => e.health.water || 0, '#5A8FBA', 'ml', state.waterTarget ?? 3000)}
            {renderTrendSVG('Sleep Quantity', e => e.health.sleep || 0, '#7C3AED', 'h', 7.5)}
            {renderTrendSVG('Step Metric', e => e.health.steps || 0, '#10B981', 'steps', state.stepsTarget ?? 7000)}
            {renderTrendSVG('Wrist Pain index', e => e.health.wristPain || 0, '#EF4444', '/10')}
            {renderTrendSVG('Energy status', e => e.health.energy || 5, '#F59E0B', '/10')}
          </div>
        </div>

      </div>

    </div>
  );
}
