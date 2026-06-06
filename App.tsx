import React, { useState, useEffect } from 'react';
import { ProgramState, DailyEntry } from './types';
import { getInitialState, DEFAULT_HABITS } from './mockData';

// Component imports
import DashboardOverview from './components/DashboardOverview';
import DailyJournal from './components/DailyJournal';
import VisibilityPipeline from './components/VisibilityPipeline';
import WeeklyReviewTab from './components/WeeklyReviewTab';
import CoreBeliefs from './components/CoreBeliefs';

// Icon imports
import { 
  Home, BookOpen, Eye, Award, Sparkles, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [state, setState] = useState<ProgramState>(() => {
    const saved = localStorage.getItem('appu_90_days_state');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback to default */ }
    }
    return getInitialState();
  });

  // Pick today's date or clamp to first/last index ranges of program
  const getTodayDateStr = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (state.dailyEntries[todayStr]) {
      return todayStr;
    }
    // Fallback: use first day of program
    const keys = Object.keys(state.dailyEntries).sort();
    return keys[0] || todayStr;
  };

  const [selectedDateStr, setSelectedDateStr] = useState<string>(getTodayDateStr);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('appu_90_days_state', JSON.stringify(state));
  }, [state]);

  // Update specific daily entry key
  const handleUpdateEntry = (dateStr: string, updatedFields: Partial<DailyEntry>) => {
    setState((prev) => {
      const currentEntry = prev.dailyEntries[dateStr] || {
        dayNum: 1,
        dateStr,
        completedHabits: {},
        health: { protein: 0, water: 0, sleep: 0, steps: 0, mood: 5, energy: 5, wristPain: 1 },
        deepWritingDone: false,
        fiveMinStoryDone: false,
        storyText: '',
        dailyReflection: '',
        tookCareOfBody: false
      };

      const updatedEntries = {
        ...prev.dailyEntries,
        [dateStr]: {
          ...currentEntry,
          ...updatedFields
        }
      };

      return {
        ...prev,
        dailyEntries: updatedEntries
      };
    });
  };

  const handleUpdateState = (updatedFields: Partial<ProgramState>) => {
    setState((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };

  // State reset/wipe
  const handleWipeState = () => {
    if (window.confirm("Are you sure you want to completely clear your logs? This will reset all habit counts, application records, and transactions back to zero.")) {
      const fresh = getInitialState();
      setState(fresh);
      setSelectedDateStr(getTodayDateStr());
      setShowSettings(false);
    }
  };

  const handleSetStartDate = (newDateStr: string) => {
    if (!newDateStr) return;
    const fresh = getInitialState(newDateStr);
    setState(fresh);
    setSelectedDateStr(newDateStr);
    setShowSettings(false);
  };

  // Nav categories mapping
  const tabs = [
    { id: 'overview', name: 'Home', icon: Home },
    { id: 'journal', name: 'Daily Log', icon: BookOpen },
    { id: 'visibility', name: 'Visibility', icon: Eye },
    { id: 'review', name: 'Weekly Plan', icon: Award },
    { id: 'beliefs', name: 'Wisdom', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-800 font-sans pb-24 md:pb-8 flex flex-col md:flex-row" id="app-root-shell">
      
      {/* Sidebar Navigation - Left Rail on desktop */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-slate-100/80 flex-col justify-between shrink-0 h-screen sticky top-0" id="desktop-sidebar">
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Logo Brand info */}
          <div className="flex items-center gap-3">
            <span className="text-xl">☀️</span>
            <div>
              <h1 className="text-sm font-bold font-mono tracking-wider text-slate-800 uppercase">90 Days life</h1>
              <p className="text-[10px] text-[#C9A227] font-sans font-semibold">"Personal Operating System"</p>
            </div>
          </div>

          {/* Sibling navigation list */}
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#EAF2F8] text-[#2C5F88]' 
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <IconComp size={16} className={isActive ? 'text-[#5A8FBA]' : 'text-slate-400'} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Profile / Bottom actions settings trigger */}
        <div className="p-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FDF8E7] border border-[#D4AF37]/30 flex items-center justify-center text-xs">
              🧔
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700">{state.userName}</h4>
              <span className="text-[9px] font-mono text-slate-400">Day {state.dailyEntries[selectedDateStr]?.dayNum || 1} of 90</span>
            </div>
          </div>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded-lg transition-all"
          >
            <Settings size={16} />
          </button>
        </div>
      </aside>

      {/* Top Banner on Mobile, Profile header */}
      <header className="md:hidden bg-white border-b border-slate-100 p-4 sticky top-0 z-30 flex justify-between items-center" id="mobile-header">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">☀️</span>
          <div>
            <h1 className="text-xs font-bold font-mono tracking-wider text-slate-800 uppercase">90 Days life</h1>
            <p className="text-[9px] text-[#C9A227] font-semibold">Day {state.dailyEntries[selectedDateStr]?.dayNum || 1} of 90</p>
          </div>
        </div>

        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="p-1.5 hover:bg-slate-50 text-slate-400 rounded-lg"
        >
          <Settings size={16} />
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full transition-all duration-300" id="main-canvas">
        
        {/* Dynamic active screen render */}
        <div className="min-h-[70vh] pb-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'overview' && (
                <DashboardOverview 
                  state={state} 
                  onUpdateState={handleUpdateState} 
                  selectedDateStr={selectedDateStr}
                  onSelectTab={setActiveTab}
                />
              )}
              {activeTab === 'journal' && (
                <DailyJournal 
                  state={state} 
                  selectedDateStr={selectedDateStr}
                  onSelectDate={setSelectedDateStr}
                  onUpdateEntry={handleUpdateEntry}
                />
              )}
              {activeTab === 'visibility' && (
                <VisibilityPipeline />
              )}
              {activeTab === 'review' && (
                <WeeklyReviewTab state={state} />
              )}
              {activeTab === 'beliefs' && (
                <CoreBeliefs />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Floating settings overlay menu */}
        {showSettings && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="settings-overlay">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl border p-6 max-w-md w-full space-y-6 text-xs text-slate-600 shadow-xl"
            >
              <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚙️</span>
                  <h3 className="text-sm font-sans font-medium text-slate-800">Operating System Setup</h3>
                </div>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="p-1 hover:bg-slate-50 text-slate-400 hover:text-slate-800 rounded-sm"
                >
                  ✕
                </button>
              </div>

              {/* Start Date Modifier config */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Project Start Date</h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Modifying the start date will regenerate all 90 days log dates starting at the customized marker. (This preserves your entry indexes, but recalculates calendar calendar markers).
                </p>
                <input 
                  type="date"
                  defaultValue={state.startDate}
                  onChange={(e) => handleSetStartDate(e.target.value)}
                  className="w-full border p-2 bg-slate-50 rounded-lg focus:outline-none focus:bg-white font-mono"
                />
              </div>

              {/* Username config */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-700">Custom Companion Name</h4>
                <input 
                  type="text"
                  value={state.userName}
                  onChange={(e) => handleUpdateState({ userName: e.target.value })}
                  className="w-full border p-2 bg-slate-50 rounded-lg focus:outline-none focus:bg-white text-xs"
                />
              </div>

              {/* Editable Health Goals Targets */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-semibold text-slate-700">Global Tracker Targets</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-medium">Protein (grams)</label>
                    <input 
                      type="number"
                      value={state.proteinTarget ?? 90}
                      onChange={(e) => handleUpdateState({ proteinTarget: Number(e.target.value) })}
                      className="w-full border p-2 bg-slate-50 rounded-lg focus:outline-none focus:bg-white text-center font-mono text-xs font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-medium">Water (milliliters)</label>
                    <input 
                      type="number"
                      value={state.waterTarget ?? 3000}
                      onChange={(e) => handleUpdateState({ waterTarget: Number(e.target.value) })}
                      className="w-full border p-2 bg-slate-50 rounded-lg focus:outline-none focus:bg-white text-center font-mono text-xs font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-medium">Daily Steps</label>
                    <input 
                      type="number"
                      value={state.stepsTarget ?? 7000}
                      onChange={(e) => handleUpdateState({ stepsTarget: Number(e.target.value) })}
                      className="w-full border p-2 bg-slate-50 rounded-lg focus:outline-none focus:bg-white text-center font-mono text-xs font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Factory reset controls */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="font-semibold text-rose-600">Database Clearance</h4>
                <p className="text-[10px] text-slate-400 font-normal">Wipe off progress tracker to clean initial zeroes. This clears local storage history.</p>
                <button
                  onClick={handleWipeState}
                  className="w-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 p-2.5 rounded-lg font-mono font-medium tracking-wider text-center cursor-pointer transition-colors"
                >
                  Clear Platform History
                </button>
              </div>
            </motion.div>
          </div>
        )}

      </main>

      {/* Mobile Fixed Bottom Navigation bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-2 z-40 flex justify-between items-center" id="mobile-nav-bar">
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col justify-center items-center py-1 transition-all text-slate-400 group cursor-pointer"
            >
              <IconComp size={18} className={isActive ? 'text-[#5A8FBA]' : 'text-slate-400 group-hover:text-slate-600'} />
              <span className={`text-[9px] mt-0.5 tracking-tight ${isActive ? 'text-[#2C5F88] font-bold' : 'text-slate-400'}`}>
                {tab.name}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
