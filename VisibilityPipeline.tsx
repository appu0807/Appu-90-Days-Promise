import React, { useState, useEffect } from 'react';
import { Eye, Film, FileText, CheckCircle2, Circle, AlertCircle, HelpCircle, Shield, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

// Default schema structure for the 13 Visibility Weeks matching Slide 10
interface PipelineWeek {
  weekNum: number;
  contentType: 'Image/Text' | 'Video';
  faceVoiceRequired: 'Optional' | 'Required';
  created: boolean;
  reviewed: boolean;
  posted: boolean;
  notes: string;
}

export default function VisibilityPipeline() {
  const [weeks, setWeeks] = useState<PipelineWeek[]>(() => {
    const saved = localStorage.getItem('appu_visibility_pipeline');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    
    // Generate default weeks according to slide 10's alternating structure
    const defaultList: PipelineWeek[] = [];
    for (let w = 1; w <= 13; w++) {
      const isEven = w % 2 === 0;
      defaultList.push({
        weekNum: w,
        contentType: isEven ? 'Video' : 'Image/Text',
        faceVoiceRequired: isEven ? 'Required' : 'Optional',
        created: w === 1, // sample completion for week 1
        reviewed: w === 1,
        posted: w === 1,
        notes: w === 1 ? 'Created an audio-visual summary about slowing down in acting.' : ''
      });
    }
    return defaultList;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('appu_visibility_pipeline', JSON.stringify(weeks));
  }, [weeks]);

  const toggleLevel = (weekNum: number, field: 'created' | 'reviewed' | 'posted') => {
    setWeeks(prev => prev.map(w => {
      if (w.weekNum === weekNum) {
        return { ...w, [field]: !w[field] };
      }
      return w;
    }));
  };

  const updateNotes = (weekNum: number, notesStr: string) => {
    setWeeks(prev => prev.map(w => {
      if (w.weekNum === weekNum) {
        return { ...w, notes: notesStr };
      }
      return w;
    }));
  };

  const RULES = [
    { title: "One piece of content released every week", desc: "No excuses. Consistency is about establishing visibility rhythm over raw reach stats." },
    { title: "No consecutive image/text weeks", desc: "You are NOT allowed to post image-only or text-only content two weeks in a row to prevent hiding." },
    { title: "Face/Voice requirements", desc: "Every second week (even weeks) must include: My face OR My voice OR Me speaking directly to camera OR Me visibly present in the content." },
    { title: "Visibility over perfection", desc: "Perfection is a defense mechanism. Release before you feel fully ready." },
    { title: "The Courage Manifesto", desc: "I allow myself to be seen before I feel ready. Courage is acting in the presence of hesitation." }
  ];

  return (
    <div className="space-y-10" id="visibility-pipeline-wrapper">
      
      {/* Intro Courage Banner */}
      <div className="bg-[#FAF9F6] border border-[#C9A227]/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between" id="courage-banner">
        <div className="space-y-2.5 text-center md:text-left max-w-xl">
          <span className="text-[10px] tracking-widest font-mono text-[#C9A227] bg-[#FDF8E7] px-3 py-1 rounded-full font-bold uppercase">
            The Visibility Quest
          </span>
          <h2 className="text-xl md:text-2xl font-serif text-slate-800 italic">
            "I allow myself to be seen before I feel ready."
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            This module is specifically designed to bypass the friction of performance anxiety and fear of exposure. The goal is simple, plain, honest visibility.
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center shrink-0 border-slate-100 hidden sm:block">
          <span className="text-2xl block">🎬</span>
          <p className="text-[10px] font-mono font-medium text-slate-400 uppercase mt-1">Goal Status</p>
          <span className="text-xs font-bold text-slate-700">1 Content / Week</span>
        </div>
      </div>

      {/* Grid: Rules & Creation Cycle */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8" id="visibility-rules-container">
        
        {/* Rules Board */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-slate-101 p-6 space-y-6 shadow-2xs" id="visibility-rules-left">
          <div>
            <div className="flex items-center gap-2 border-b border-slate-50 pb-3 mb-3">
              <Shield size={16} className="text-[#C9A227]" />
              <h3 className="font-sans font-medium text-slate-800 leading-tight">Visibility Standards</h3>
            </div>
            <p className="text-xs text-slate-400">Rules designed to block backsliding</p>
          </div>

          <div className="space-y-4">
            {RULES.map((rule, idx) => (
              <div key={idx} className="flex gap-2.5 items-start">
                <span className="text-[#C9A227] text-xs font-mono font-bold mt-0.5">Rule {idx + 1}</span>
                <div>
                  <h4 className="text-xs font-semibold text-slate-700">{rule.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF9F6] border border-slate-100 p-4 rounded-xl text-[10px] text-slate-500 flex gap-2">
            <AlertCircle size={14} className="text-[#C9A227] shrink-0 mt-0.5" />
            <p className="leading-snug">
              **The Golden Constraint**: Wednesday = Create, Friday = Review, Sunday = Post. *Strictly forbid creating and posting on the exact same day* to prevent frantic rushing or high stress.
            </p>
          </div>
        </div>

        {/* Content Pipeline Grid */}
        <div className="md:col-span-7 bg-white rounded-2xl border border-slate-101 p-6 shadow-2xs flex flex-col justify-between" id="visibility-pipeline-right">
          <div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
              <div>
                <h3 className="font-sans font-medium text-slate-800">13 Weeks Visibility Pipeline</h3>
                <p className="text-xs text-slate-400 mt-0.5">Alternating types mapping 90 days total.</p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {weeks.filter(w => w.posted).length} / 13 Done
              </span>
            </div>

            {/* Scrolling List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-mono tracking-wider uppercase text-slate-400 bg-slate-50/50">
                    <th className="py-2.5 px-2 font-medium">Week</th>
                    <th className="py-2.5 px-2 font-medium">Type</th>
                    <th className="py-2.5 px-2 font-medium">Face/Voice</th>
                    <th className="py-2.5 px-2 text-center font-medium">Created (W)</th>
                    <th className="py-2.5 px-2 text-center font-medium">Reviewed (F)</th>
                    <th className="py-2.5 px-2 text-center font-medium">Posted (Su)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {weeks.map((w) => (
                    <React.Fragment key={w.weekNum}>
                      <tr className="hover:bg-slate-50/30 transition-colors">
                        <td className="py-3 px-2 font-mono font-semibold text-slate-700">Week {w.weekNum}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-sm font-semibold text-[10px] ${
                            w.contentType === 'Video' 
                              ? 'bg-rose-50 text-rose-600 border border-rose-100/30' 
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-100/30'
                          }`}>
                            {w.contentType}
                          </span>
                        </td>
                        <td className="py-3 px-2 font-medium text-[11px] text-slate-500">
                          {w.faceVoiceRequired}
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button onClick={() => toggleLevel(w.weekNum, 'created')} className="mx-auto block text-slate-400 hover:text-[#5E9B71] transition-colors">
                            {w.created ? <CheckCircle2 size={16} className="text-[#5E9B71]" /> : <Circle size={16} className="text-slate-350" />}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button onClick={() => toggleLevel(w.weekNum, 'reviewed')} className="mx-auto block text-slate-400 hover:text-[#5E9B71] transition-colors">
                            {w.reviewed ? <CheckCircle2 size={16} className="text-[#5E9B71]" /> : <Circle size={16} className="text-slate-350" />}
                          </button>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <button onClick={() => toggleLevel(w.weekNum, 'posted')} className="mx-auto block text-slate-400 hover:text-[#C9A227] transition-colors">
                            {w.posted ? <CheckCircle2 size={16} className="text-[#C9A227]" /> : <Circle size={16} className="text-slate-350" />}
                          </button>
                        </td>
                      </tr>
                      {/* Sub-row for notes */}
                      <tr className="bg-slate-50/20">
                        <td colSpan={6} className="px-2 pb-2.5">
                          <input 
                            type="text" 
                            placeholder="Draft content theme or title of post..." 
                            value={w.notes}
                            onChange={(e) => updateNotes(w.weekNum, e.target.value)}
                            className="w-full text-[11px] font-sans bg-transparent border-b border-dotted border-slate-200 focus:border-slate-400 focus:outline-none py-1 text-slate-500"
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
