import React from 'react';
import { ProgramState } from '../types';
import { Calendar, Download, Sparkles } from 'lucide-react';

interface WeeklyReviewTabProps {
  state: ProgramState;
}

export default function WeeklyReviewTab({ state }: WeeklyReviewTabProps) {
  // Construct and download standard iCal calendar file (.ics)
  const handleDownloadCalendar = () => {
    const startDate = new Date(state.startDate || '2026-06-01');
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//90 Days Life//Personal Operating System//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    const formatDateToICal = (date: Date, hours: number, minutes: number) => {
      const d = new Date(date);
      d.setHours(hours, minutes, 0, 0);
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    // Generate calendar alerts for 90 days traversal
    for (let i = 0; i < 90; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
      const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      // 1. Daily Morning Meditation
      icsContent.push(
        'BEGIN:VEVENT',
        `UID:daily-alignment-day-${i + 1}@90dayslife`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${formatDateToICal(currentDate, 7, 0)}`,
        `DTEND:${formatDateToICal(currentDate, 7, 45)}`,
        `SUMMARY:Morning Alignment (SRF Energization & Meditation)`,
        `DESCRIPTION:Daily conscious centering with God. SRF Tension/relaxation exercises followed by silent stillness. Day ${i + 1} of 90.`,
        'END:VEVENT'
      );

      // 2. Tuesday, Thursday, Saturday deep writing
      if (dayOfWeek === 'Tuesday' || dayOfWeek === 'Thursday' || dayOfWeek === 'Saturday') {
        icsContent.push(
          'BEGIN:VEVENT',
          `UID:deep-writing-day-${i + 1}@90dayslife`,
          `DTSTAMP:${stamp}`,
          `DTSTART:${formatDateToICal(currentDate, 9, 0)}`,
          `DTEND:${formatDateToICal(currentDate, 10, 0)}`,
          `SUMMARY:1-Hour Cinema Screenplay Deep Session`,
          `DESCRIPTION:Observe screenwriting resistance. Draft screenplay script without distraction. Day ${i + 1} of 90.`,
          'END:VEVENT'
        );
      }

      // 3. Monday, Wednesday, Friday physical workout
      if (dayOfWeek === 'Monday' || dayOfWeek === 'Wednesday' || dayOfWeek === 'Friday') {
        let wt = "Wrist-Safe Workout A (Upper/Core)";
        if (dayOfWeek === 'Wednesday') wt = "Wrist-Safe Workout B (Spine/Lower)";
        if (dayOfWeek === 'Friday') wt = "Wrist-Safe Workout C (Conditions/Forearm support)";

        icsContent.push(
          'BEGIN:VEVENT',
          `UID:physical-workout-day-${i + 1}@90dayslife`,
          `DTSTAMP:${stamp}`,
          `DTSTART:${formatDateToICal(currentDate, 8, 0)}`,
          `DTEND:${formatDateToICal(currentDate, 8, 45)}`,
          `SUMMARY:${wt}`,
          `DESCRIPTION:Honoring your biological temple with custom workouts. Keep wrists wrapped. Day ${i + 1} of 90.`,
          'END:VEVENT'
        );
      }

      // 4. Wednesday, Friday, Sunday visibility flow
      if (dayOfWeek === 'Wednesday' || dayOfWeek === 'Friday' || dayOfWeek === 'Sunday') {
        let vt = "Create Visibility Content — Shoot Stage";
        if (dayOfWeek === 'Friday') vt = "Review & Polish Visibility Draft";
        if (dayOfWeek === 'Sunday') vt = "Publish Video Authentically (Without Masks)";

        icsContent.push(
          'BEGIN:VEVENT',
          `UID:visibility-flow-day-${i + 1}@90dayslife`,
          `DTSTAMP:${stamp}`,
          `DTSTART:${formatDateToICal(currentDate, 11, 0)}`,
          `DTEND:${formatDateToICal(currentDate, 11, 45)}`,
          `SUMMARY:${vt}`,
          `DESCRIPTION:Courageously allowing yourself to be seen on media channels. Day ${i + 1} of 90.`,
          'END:VEVENT'
        );
      }
    }

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'appu_90_days_life_sacred_schedule.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const weeklySchedule = [
    { day: 'Monday', title: 'Physical Integration Day', details: '🧘‍♂️ Morning Meditation • 🏃‍♂️ Wrist-Safe Workout A (Upper Body & Core Focus)', focus: 'Tendon rest & recovery focus' },
    { day: 'Tuesday', title: 'Creative Connection Day', details: '🧘‍♂️ Morning Meditation • ✍️ Screenplay Deep Work (1-Hour Cinema writing)', focus: 'Write past narrative doubt' },
    { day: 'Wednesday', title: 'Somatic Focus & Media Raw', details: '🧘‍♂️ Morning Meditation • 🏃‍♂️ Workout B (Lower spine mobility) • 👁️ Creative Content Shoot Stage', focus: 'Gather raw dialog captures' },
    { day: 'Thursday', title: 'Creative Connection Day', details: '🧘‍♂️ Morning Meditation • ✍️ Screenplay Deep Work (1-Hour Cinema writing)', focus: 'Stay still alongside screenplay plot' },
    { day: 'Friday', title: 'Conditioning & Media Polish', details: '🧘‍♂️ Morning Meditation • 🏃‍♂️ Workout C (Strength support) • 👁️ Polish Draft Media calm', focus: 'Edit clips & refine metadata limits' },
    { day: 'Saturday', title: 'Creative Connection Day', details: '🧘‍♂️ Morning Meditation • ✍️ Screenplay Deep Work (1-Hour Cinema writing)', focus: 'Design scene configurations' },
    { day: 'Sunday', title: 'Sacred Rest, Massage & Post', details: '🧘‍♂️ Morning Meditation • 🏡 Recovery Yoga Practice & Full Body Oil Rub • 👁️ Authentic Publish', focus: 'Publish post transparency' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8" id="weekly-plan-minimal">
      
      {/* Schedule Core Header */}
      <div className="space-y-1 text-center md:text-left">
        <h2 className="text-2xl font-serif font-medium text-slate-800">
          My Quiet Weekly Schedule
        </h2>
        <p className="text-xs text-slate-400">
          A slow, healthy timeline that protects rest margins and preserves recovery boundaries.
        </p>
      </div>

      {/* Grid of days */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="weekly-plan-grid">
        {weeklySchedule.map((item, idx) => {
          const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }) === item.day;
          
          return (
            <div 
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                isToday 
                  ? 'bg-[#EAF2F8]/70 border-[#5A8FBA]/30 ring-1 ring-[#5A8FBA]/20' 
                  : 'bg-white border-slate-100/80 hover:border-slate-200'
              }`}
            >
              <div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-1.5 mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                    {item.day}
                  </span>
                  {isToday && (
                    <span className="text-[8px] font-sans font-bold text-[#2C5F88] bg-[#EAF2F8] px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                      Active Today
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-755 tracking-wide leading-tight font-sans">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-normal leading-relaxed pt-1 font-sans">
                  {item.details}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-50 text-[10px] text-[#5E9B71] font-serif italic leading-snug">
                🌿 Focus: {item.focus}
              </div>
            </div>
          );
        })}
      </div>

      {/* Minimal Calendar Sync Invitation Card */}
      <div className="bg-[#FDF8E7] border border-[#D4AF37]/20 rounded-2xl p-5 space-y-4 flex flex-col sm:flex-row gap-4 justify-between items-center" id="ics-syncer">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <Calendar size={13} className="text-[#C9A227]" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#C9A227] uppercase">
              Calendar Sync Engine
            </span>
          </div>
          <h4 className="text-xs font-bold text-slate-800">
            Export Schedule to Google/Apple Calendar
          </h4>
          <p className="text-[10px] text-slate-500 max-w-sm leading-relaxed">
            Download your customized 90-day `.ics` schedule file. Direct integration into Google Calendar, Outlook, and Apple Calendar.
          </p>
        </div>
        <button
          onClick={handleDownloadCalendar}
          className="bg-slate-850 hover:bg-slate-900 border border-transparent shadow-xs text-white px-4 py-2.5 rounded-xl text-[10px] uppercase font-mono tracking-wider font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5"
          id="btn-ical-downloader"
        >
          <Download size={12} className="stroke-[2.5]" /> Sync Calendar (.ics)
        </button>
      </div>

    </div>
  );
}
