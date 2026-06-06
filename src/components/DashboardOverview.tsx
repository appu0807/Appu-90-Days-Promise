import React, { useState } from 'react';
import { ProgramState, DailyEntry } from '../types';
import { DEFAULT_HABITS, CORE_BELIEFS } from '../mockData';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardOverviewProps {
  state: ProgramState;
  onUpdateState: (updatedState: Partial<ProgramState>) => void;
  selectedDateStr: string;
  onSelectTab: (tab: string) => void;
}

export default function DashboardOverview({ state, onUpdateState, selectedDateStr, onSelectTab }: DashboardOverviewProps) {
  const [beliefIdx, setBeliefIdx] = useState<number>(() => {
    // Pick a stable random index based on today's day number to keep it consistent on page refresh
    const dayIndex = state.dailyEntries[selectedDateStr]?.dayNum || 1;
    return dayIndex % CORE_BELIEFS.length;
  });

  // Get current date's entry
  const todayEntry: DailyEntry = state.dailyEntries[selectedDateStr] || {
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

  const dayOfWeek = new Date(selectedDateStr).toLocaleDateString('en-US', { weekday: 'long' });
  const formattedDate = new Date(selectedDateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculations for program status
  const sortedKeys = Object.keys(state.dailyEntries).sort();
  const todayIndex = sortedKeys.indexOf(selectedDateStr);
  const currentDayNum = todayIndex !== -1 ? todayIndex + 1 : 1;
  const totalDays = 90;
  const daysLeft = Math.max(0, totalDays - currentDayNum);
  const progressPercent = Math.min(100, Math.round((currentDayNum / totalDays) * 100));

  // Dynamic calculations for streak
  const streak = Object.keys(state.dailyEntries)
    .sort()
    .slice(0, todayIndex + 1)
    .reduce((acc, currentKey) => {
      const e = state.dailyEntries[currentKey];
      const checkedCount = Object.values(e.completedHabits || {}).filter(Boolean).length;
      if (checkedCount >= 5 || e.tookCareOfBody) {
        return acc + 1;
      }
      return 0; // streak reset
    }, 0);

  // Filter core daily habits for beautiful checklist rendering
  const filterHabits = DEFAULT_HABITS.filter(h => h.id !== 'money-check');

  const totalHabitsCount = filterHabits.length;
  const completedHabitsCount = filterHabits.filter(h => !!todayEntry.completedHabits[h.id]).length;
  const habitCompletionPercent = totalHabitsCount > 0 ? Math.round((completedHabitsCount / totalHabitsCount) * 100) : 0;

  const nextBelief = () => {
    setBeliefIdx(curr => (curr + 1) % CORE_BELIEFS.length);
  };

  // Toggle habit directly on home page
  const handleToggleHabit = (habitId: string) => {
    const currentCompleted = { ...todayEntry.completedHabits };
    currentCompleted[habitId] = !currentCompleted[habitId];

    // Set fallback initial numeric inputs on completion if not set
    let extraHealthUpdates = {};
    if (habitId === 'protein' && currentCompleted[habitId] && (todayEntry.health.protein || 0) === 0) {
      extraHealthUpdates = { protein: state.proteinTarget || 90 };
    }
    if (habitId === 'water' && currentCompleted[habitId] && (todayEntry.health.water || 0) === 0) {
      extraHealthUpdates = { water: state.waterTarget || 3000 };
    }

    const updatedEntries = {
      ...state.dailyEntries,
      [selectedDateStr]: {
        ...todayEntry,
        completedHabits: currentCompleted,
        health: {
          ...todayEntry.health,
          ...extraHealthUpdates
        }
      }
    };
    onUpdateState({ dailyEntries: updatedEntries });
  };

  // Resolve dynamically today's single main task
  const getTodayMainTask = () => {
    // 1. Physical workout task mapping
    const workoutRoutines: Record<string, string> = {
      'Monday': 'Workout A: Wrist-Safe Upper Body & Core Alignment Focus',
      'Wednesday': 'Workout B: Lower Body Mobility & Spinal Alignment',
      'Friday': 'Workout C: Forearm-Supported Conditioning Workout',
    };

    // 2. Creative Screenplay Session mapping
    const writingRoutines: Record<string, string> = {
      'Tuesday': 'Cinema Screenplay: 1-Hour Deep Writing Session past resistance',
      'Thursday': 'Cinema Screenplay: 1-Hour Deep Writing Session past resistance',
      'Saturday': 'Cinema Screenplay: 1-Hour Deep Writing Session past resistance',
    };

    // 3. Visibility Content sequence mapping
    const visibilityRoutines: Record<string, string> = {
      'Wednesday': 'Record Content (Somatic storytelling capture)',
      'Friday': 'Refine draft video clip and metadata details',
      'Sunday': 'Publish raw video post authentically (Speak without masks)'
    };

    const taskItems: { title: string; category: string; description: string; emoji: string }[] = [];

    // Prioritize showing structured active quests for the day
    if (workoutRoutines[dayOfWeek]) {
      taskItems.push({
        category: 'Physical Integration',
        title: workoutRoutines[dayOfWeek],
        description: 'Complete with wrappers on wrists. No heavy loads on wrist joints; protect your biological temple.',
        emoji: '🌱'
      });
    }

    if (writingRoutines[dayOfWeek]) {
      taskItems.push({
        category: 'Creative Outpouring',
        title: writingRoutines[dayOfWeek],
        description: 'Sit quietly. Stay present with resistance. Write beautiful, cinematic narrative screenplay scripts.',
        emoji: '✍️'
      });
    }

    if (visibilityRoutines[dayOfWeek]) {
      taskItems.push({
        category: 'Authentic Courage',
        title: visibilityRoutines[dayOfWeek],
        description: 'Face the outer garden with absolute inner peace. Speak vulnerability cleanly without masks.',
        emoji: '👁️'
      });
    }

    // Default rests if zero specific active tasks
    if (taskItems.length === 0) {
      taskItems.push({
        category: 'Nourishing Rest & Integration',
        title: 'Somatic Healing & Restorative Flow',
        description: 'Honor the physical joints with therapeutic muscle rubs, light dynamic stretching, and silent walks in nature.',
        emoji: '🧘‍♂️'
      });
    }

    return taskItems[0]; // Display the top primary focus
  };

  const todayTask = getTodayMainTask();

  return (
    <div className="max-w-2xl mx-auto space-y-8" id="overview-minimal">
      
      {/* Date Header */}
      <div className="text-center md:text-left space-y-1 py-2" id="date-header-block">
        <p className="text-[10px] tracking-widest font-mono text-slate-400 font-bold uppercase block">
          {formattedDate}
        </p>
        <h2 className="text-3xl font-serif font-medium text-slate-800 tracking-tight">
          Welcome Home, {state.userName || "Appu"}
        </h2>
      </div>

      {/* Prominent positive affirmation block */}
      <motion.div 
        whileHover={{ y: -1 }}
        onClick={nextBelief}
        className="bg-[#FAF9F6] border border-[#D4AF37]/20 rounded-2xl p-6 md:p-8 cursor-pointer text-center relative overflow-hidden select-none"
        id="minimal-affirmation-card"
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-150 via-[#D4AF37]/50 to-amber-150" />
        <span className="text-[9px] tracking-widest font-mono text-[#C9A227] font-semibold uppercase block mb-1">
          Positive Affirmation (Tap to cycle)
        </span>
        <AnimatePresence mode="wait">
          <motion.h3 
            key={beliefIdx}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="text-base md:text-lg font-serif italic text-slate-700 leading-relaxed max-w-lg mx-auto py-1"
          >
            "{CORE_BELIEFS[beliefIdx]}"
          </motion.h3>
        </AnimatePresence>
      </motion.div>

      {/* 90-Day Challenge Countdown Stats & Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-4 shadow-3xs" id="progress-block">
        <div className="grid grid-cols-2 gap-4 text-center border-b border-slate-50 pb-4">
          <div className="space-y-0.5">
            <span className="text-[9px] tracking-wider uppercase font-mono text-slate-400 font-bold block">Journey Progress</span>
            <p className="text-lg font-serif font-semibold text-slate-800">Day {currentDayNum} of 90</p>
            <p className="text-[10px] text-[#5E9B71] font-semibold font-mono">{progressPercent}% complete</p>
          </div>
          <div className="space-y-0.5 border-l border-slate-100">
            <span className="text-[9px] tracking-wider uppercase font-mono text-slate-400 font-bold block">Remaining Scale</span>
            <p className="text-lg font-serif font-semibold text-[#C9A227]">{daysLeft} days left</p>
            <p className="text-[10px] text-slate-400 font-mono">on 90-day conscious return</p>
          </div>
        </div>

        {/* Elegant progress slider */}
        <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden" id="bar-outer">
          <div 
            style={{ width: `${progressPercent}%` }}
            className="bg-[#D4AF37]/80 h-full rounded-full transition-all duration-700"
          />
        </div>
      </div>

      {/* Habits & Today's Task Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="actions-deck">
        
        {/* Habit tracker checklist */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4 shadow-3xs">
          <div className="flex justify-between items-center border-b border-slate-50 pb-2">
            <h3 className="font-serif font-medium text-[#2C5F88] text-sm">Today's Habits</h3>
            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-sm border">
              {completedHabitsCount}/{totalHabitsCount}
            </span>
          </div>

          <div className="space-y-1.5" id="mini-checklists">
            {filterHabits.map((habit) => {
              const completed = !!todayEntry.completedHabits[habit.id];
              
              let labelExtra = '';
              if (habit.id === 'protein') labelExtra = ` (${state.proteinTarget || 90}g)`;
              if (habit.id === 'water') labelExtra = ` (${(state.waterTarget || 3000)/1000}L)`;
              if (habit.id === 'movement') labelExtra = ` (${state.stepsTarget || 7000} steps)`;

              return (
                <button
                  key={habit.id}
                  onClick={() => handleToggleHabit(habit.id)}
                  className="w-full flex items-center gap-2.5 py-1.5 px-2 rounded-lg hover:bg-slate-50 text-left transition-all cursor-pointer group"
                >
                  <div className={`shrink-0 transition-all ${completed ? 'text-[#5E9B71]' : 'text-slate-300'}`}>
                    {completed ? (
                      <CheckCircle2 size={16} className="fill-[#EEF6F1]" />
                    ) : (
                      <Circle size={16} className="text-slate-200 group-hover:text-slate-300" />
                    )}
                  </div>
                  <span className={`text-[11px] font-medium leading-tight ${completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {habit.name}{labelExtra}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onSelectTab('journal')}
            className="w-full bg-slate-50/70 border border-slate-100 hover:bg-slate-100/50 py-2 rounded-xl text-[10px] font-semibold text-slate-500 cursor-pointer flex justify-center items-center gap-1 transition-all mt-4"
          >
            Type Numeric Quantities <ArrowRight size={10} />
          </button>
        </div>

        {/* Today's Main Task focus */}
        <div className="bg-[#FAF9F6] rounded-2xl border border-slate-150/40 p-5 space-y-4 flex flex-col justify-between shadow-3xs">
          <div className="space-y-2">
            <div className="flex justify-between items-center border-b border-slate-150/20 pb-2">
              <span className="text-[9px] tracking-widest font-mono text-[#C9A227] font-semibold uppercase">
                Today's Main Task
              </span>
              <span className="text-sm">{todayTask.emoji}</span>
            </div>

            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              {todayTask.category}
            </span>
            <h4 className="text-xs font-bold text-slate-800 leading-snug">
              {todayTask.title}
            </h4>
            <p className="text-[10px] text-slate-500 leading-relaxed pt-1">
              {todayTask.description}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-200/20 mt-4 text-[9px] text-slate-400 italic">
            "Sticking strictly to today's slow somatic flow protects the long-term journey targets."
          </div>
        </div>

      </div>

    </div>
  );
}
