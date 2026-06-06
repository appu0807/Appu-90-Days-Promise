import React from 'react';
import { ProgramState, DailyEntry } from '../types';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen } from 'lucide-react';

interface DailyJournalProps {
  state: ProgramState;
  selectedDateStr: string;
  onSelectDate: (dateStr: string) => void;
  onUpdateEntry: (dateStr: string, entry: Partial<DailyEntry>) => void;
}

export default function DailyJournal({ state, selectedDateStr, onSelectDate, onUpdateEntry }: DailyJournalProps) {
  // Safe resolver for current day entry
  const entry: DailyEntry = state.dailyEntries[selectedDateStr] || {
    dayNum: 1,
    dateStr: selectedDateStr,
    completedHabits: {},
    health: { protein: 0, water: 0, sleep: 0, steps: 0, mood: 5, energy: 5, wristPain: 1 },
    deepWritingDone: false,
    fiveMinStoryDone: false,
    storyText: '',
    dailyReflection: '',
    tookCareOfBody: false
  };

  // Safe updates for health nested values
  const updateHealth = (key: keyof DailyEntry['health'], value: number) => {
    onUpdateEntry(selectedDateStr, {
      health: {
        ...entry.health,
        [key]: value
      }
    });
  };

  // Safe updates for other text values
  const updateText = (key: 'dailyReflection' | 'storyText', value: string) => {
    onUpdateEntry(selectedDateStr, {
      [key]: value
    });
  };

  // Get surrounding 7 days list to display horizontal slider
  const getRecentDays = () => {
    const list: { dateStr: string; dayNum: number; label: string; active: boolean }[] = [];
    const keys = Object.keys(state.dailyEntries).sort();
    const currIndex = keys.indexOf(selectedDateStr);
    
    if (currIndex === -1) return [];

    const startIdx = Math.max(0, currIndex - 3);
    const endIdx = Math.min(keys.length - 1, startIdx + 6);
    const adjustedStart = Math.max(0, endIdx - 6);

    for (let i = adjustedStart; i <= endIdx; i++) {
      const k = keys[i];
      const e = state.dailyEntries[k];
      const dObj = new Date(k);
      list.push({
        dateStr: k,
        dayNum: e.dayNum,
        label: dObj.toLocaleDateString('en-US', { weekday: 'short' }),
        active: k === selectedDateStr
      });
    }
    return list;
  };

  const timelineDays = getRecentDays();

  return (
    <div className="max-w-xl mx-auto space-y-6" id="daily-log-minimal">
      
      {/* Date Slider / Navigation Header */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-3xs" id="log-date-slider">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => {
              const keys = Object.keys(state.dailyEntries).sort();
              const idx = keys.indexOf(selectedDateStr);
              if (idx > 0) onSelectDate(keys[idx - 1]);
            }}
            className="p-1.5 px-3 text-xs font-mono border rounded-lg hover:bg-slate-50 text-slate-500 transition-all flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft size={12} /> Prev
          </button>
          
          <div className="text-center">
            <h3 className="text-xs font-bold font-mono text-[#C9A227]">
              PROGRAM DAY {entry.dayNum} OF 90
            </h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              {new Date(selectedDateStr).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <button 
            onClick={() => {
              const keys = Object.keys(state.dailyEntries).sort();
              const idx = keys.indexOf(selectedDateStr);
              if (idx < keys.length - 1) onSelectDate(keys[idx + 1]);
            }}
            className="p-1.5 px-3 text-xs font-mono border rounded-lg hover:bg-slate-50 text-slate-500 transition-all flex items-center gap-1 cursor-pointer"
          >
            Next <ChevronRight size={12} />
          </button>
        </div>

        {/* Horizontal timeline dots list */}
        <div className="grid grid-cols-7 gap-1.5">
          {timelineDays.map((d) => (
            <button
              key={d.dateStr}
              onClick={() => onSelectDate(d.dateStr)}
              className={`py-2 rounded-lg text-center flex flex-col justify-center items-center transition-all cursor-pointer ${
                d.active 
                  ? 'bg-[#EAF2F8] border border-[#5A8FBA]/30 text-[#2C5F88] font-bold' 
                  : 'bg-slate-50/50 hover:bg-slate-50 text-slate-500 text-[11px] border border-transparent'
              }`}
            >
              <span className="text-[9px] uppercase font-mono tracking-wider">{d.label.slice(0, 3)}</span>
              <span className="text-[11px] mt-0.5">{d.dayNum}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Numeric Performance Inputs Section */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4 shadow-3xs">
        <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400 border-b border-slate-50 pb-2">
          Daily Numerical Metrics (Type your results directly)
        </h3>

        <div className="grid grid-cols-2 gap-4">
          
          {/* Protein Intake Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <label className="text-[11px] font-bold text-slate-600 font-sans">Protein Intake</label>
              <span className="text-[9px] text-[#5E9B71] font-mono font-semibold">Target: {state.proteinTarget ?? 90}g</span>
            </div>
            <div className="relative">
              <input 
                type="number"
                value={entry.health.protein || ''}
                onChange={(e) => updateHealth('protein', Number(e.target.value) || 0)}
                placeholder="0"
                className="w-full text-xs font-mono font-semibold border border-slate-200/80 rounded-lg p-2.5 pr-8 bg-slate-50/55 focus:bg-white focus:outline-none focus:border-[#5E9B71] transition-all"
              />
              <span className="absolute right-3 top-2.5 text-[10px] uppercase font-mono font-semibold text-slate-400">g</span>
            </div>
          </div>

          {/* Water Intake Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <label className="text-[11px] font-bold text-slate-600 font-sans">Water Goal</label>
              <span className="text-[9px] text-[#5A8FBA] font-mono font-semibold">Target: {state.waterTarget ?? 3000}ml</span>
            </div>
            <div className="relative">
              <input 
                type="number"
                value={entry.health.water || ''}
                onChange={(e) => updateHealth('water', Number(e.target.value) || 0)}
                placeholder="0"
                className="w-full text-xs font-mono font-semibold border border-slate-200/80 rounded-lg p-2.5 pr-10 bg-slate-50/55 focus:bg-white focus:outline-none focus:border-[#5A8FBA] transition-all"
              />
              <span className="absolute right-3 top-2.5 text-[10px] uppercase font-mono font-semibold text-slate-400">ml</span>
            </div>
          </div>

          {/* Steps Counted Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <label className="text-[11px] font-bold text-slate-600 font-sans">Step Count</label>
              <span className="text-[9px] text-[#C9A227] font-mono font-semibold">Target: {state.stepsTarget ?? 7000}</span>
            </div>
            <input 
              type="number"
              value={entry.health.steps || ''}
              onChange={(e) => updateHealth('steps', Number(e.target.value) || 0)}
              placeholder="0"
              className="w-full text-xs font-mono font-semibold border border-slate-200/80 rounded-lg p-2.5 bg-slate-50/55 focus:bg-white focus:outline-none focus:border-[#C9A227] transition-all"
            />
          </div>

          {/* Sleep Hours Input */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <label className="text-[11px] font-bold text-slate-600 font-sans">Sleep hours</label>
              <span className="text-[9px] text-slate-400 font-mono font-semibold">Target: 7.5 hrs</span>
            </div>
            <div className="relative">
              <input 
                type="number"
                step="0.1"
                value={entry.health.sleep || ''}
                onChange={(e) => updateHealth('sleep', Number(e.target.value) || 0)}
                placeholder="0.0"
                className="w-full text-xs font-mono font-semibold border border-slate-200/80 rounded-lg p-2.5 pr-12 bg-slate-50/55 focus:bg-white focus:outline-none focus:border-[#5A8FBA] transition-all"
              />
              <span className="absolute right-3 top-2.5 text-[10px] uppercase font-mono font-semibold text-slate-400">hours</span>
            </div>
          </div>

        </div>
      </div>

      {/* Freeform Daily Journal Section */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 shadow-3xs" id="daily-journal-block">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
          <BookOpen size={14} className="text-slate-500" />
          <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600">
            Before Bed Daily Journal
          </h3>
        </div>
        <p className="text-[10px] text-slate-400 leading-normal">
          "Journal your daily conscious experience, release your pressure to the divine and integrate peace."
        </p>
        <textarea
          placeholder="Before going to bed, write about today's experiences, how the body felt, and your state of mind..."
          value={entry.dailyReflection || ''}
          onChange={(e) => updateText('dailyReflection', e.target.value)}
          rows={5}
          className="w-full text-xs font-sans border border-slate-150 rounded-xl p-3 bg-slate-50/40 focus:bg-white focus:outline-none focus:border-[#2C5F88] leading-relaxed transition-all"
        />
      </div>

      {/* Daily Reflection & Realizations Section */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 shadow-3xs" id="reflection-block">
        <div className="flex items-center gap-2 border-b border-slate-50 pb-2">
          <Sparkles size={14} className="text-[#C9A227]" />
          <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-600">
            Conscious Insights & Reflections
          </h3>
        </div>
        <p className="text-[10px] text-slate-400 leading-normal">
          "What became clear to me today? Any realizations on recovery, screenplay storytelling, or authentic voice?"
        </p>
        <textarea
          placeholder="Record your spiritual insights, daily wisdom, and realizations gained during today's slow return..."
          value={entry.storyText || ''}
          onChange={(e) => updateText('storyText', e.target.value)}
          rows={4}
          className="w-full text-xs font-sans border border-slate-150 rounded-xl p-3 bg-[#FAF9F6] focus:bg-white focus:outline-none focus:border-[#C9A227]/50 leading-relaxed transition-all"
        />
      </div>

      <p className="text-center text-[10px] text-slate-400 italic">
        "Saved automatically to your personal operating companion ledger."
      </p>

    </div>
  );
}
