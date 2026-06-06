import React from 'react';
import { CORE_BELIEFS, NORTH_STARS, SYSTEM_RULES } from '../mockData';
import { Heart, Compass, Shield, Award, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function CoreBeliefs() {
  return (
    <div className="space-y-12" id="core-beliefs-container">
      {/* Introduction Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto py-6"
        id="beliefs-intro"
      >
        <span className="text-xs tracking-widest font-mono text-[#D4AF37] uppercase bg-[#FDF8E7] px-3 py-1 rounded-full">
          Identity & Foundation
        </span>
        <h1 className="text-3xl font-sans font-medium tracking-tight text-slate-800 mt-3">
          My Sacred Companion For The Next 90 Days
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
          "I am loving the body God entrusted to me. This operating system is a trusted companion, designed to cultivate self-trust, spiritual growth, and sustainable progress."
        </p>
      </motion.div>

      {/* Grid: Core Beliefs & North Star */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Core Beliefs Board */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 md:p-8 space-y-6 flex flex-col justify-between"
          id="beliefs-card"
        >
          <div>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="p-2 bg-[#FDF8E7] text-[#C9A227] rounded-lg">
                <Heart size={20} />
              </div>
              <div>
                <h2 className="font-sans font-medium text-lg text-slate-800">Core Beliefs</h2>
                <p className="text-xs text-slate-400">Prominent values for daily return</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {CORE_BELIEFS.map((belief, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="text-[#D4AF37] text-xs font-mono mt-1 font-semibold">0{idx + 1}.</span>
                  <p className="text-sm text-slate-700 italic font-sans leading-relaxed">
                    "{belief}"
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-100/80 bg-[#FAF9F6] p-4 rounded-xl text-xs text-center text-slate-500 italic">
            "My progress comes from returning, not perfection."
          </div>
        </motion.div>

        {/* North Star Board */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 md:p-8 space-y-6 flex flex-col justify-between"
          id="north-stars-card"
        >
          <div>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="p-2 bg-[#EAF2F8] text-[#5A8FBA] rounded-lg">
                <Compass size={20} />
              </div>
              <div>
                <h2 className="font-sans font-medium text-lg text-slate-800">My North Star</h2>
                <p className="text-xs text-slate-400">Aim for these standards over the next 90 days</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {NORTH_STARS.map((star, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5A8FBA] mt-2 block shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase font-mono tracking-wider">
                      Dimension 0{idx + 1}
                    </h4>
                    <p className="text-sm text-slate-700 font-sans mt-0.5 leading-relaxed">
                      {star}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-[#EAF2F8]/30 p-4 rounded-xl text-xs text-[#5A8FBA] space-y-1 flex items-center gap-3">
            <Sparkles size={16} className="text-[#5A8FBA] shrink-0" />
            <p className="italic">Become the man who lovingly takes care of the beautiful path ahead.</p>
          </div>
        </motion.div>
      </div>

      {/* System Rules Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto"
        id="system-rules-card"
      >
        <div className="bg-[#FAF9F6] border border-[#D4AF37]/25 rounded-2xl p-6 md:p-8 shadow-xs">
          <div className="flex items-center gap-3 border-b border-[#D4AF37]/10 pb-4 mb-6">
            <div className="p-2 bg-[#FDF8E7] text-[#C9A227] rounded-lg">
              <Shield size={22} className="stroke-[1.5]" />
            </div>
            <div>
              <h2 className="font-sans font-medium text-xl text-slate-800">The System Rules</h2>
              <p className="text-xs text-slate-500">Protect this system, prevent performance burnout, and align with slow progress</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SYSTEM_RULES.map((rule) => {
              // Icon coloring based on rules
              let iconTheme = 'bg-[#FDF8E7] text-[#C9A227]';
              if (rule.ruleNum === 1 || rule.ruleNum === 7) {
                iconTheme = 'bg-[#EEF6F1] text-[#5E9B71]';
              } else if (rule.ruleNum === 2 || rule.ruleNum === 3) {
                iconTheme = 'bg-[#EAF2F8] text-[#5A8FBA]';
              }

              return (
                <div 
                  key={rule.ruleNum} 
                  className="bg-white rounded-xl p-5 border border-slate-100 flex flex-col justify-between hover:border-[#D4AF37]/30 transition-all duration-300 shadow-2xs"
                  id={`rule-${rule.ruleNum}`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-semibold font-mono tracking-wider rounded-md px-2 py-0.5 uppercase ${iconTheme}`}>
                        Rule {rule.ruleNum}
                      </span>
                      {rule.ruleNum === 1 && (
                        <span className="text-[10px] font-mono font-medium text-[#5E9B71] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5E9B71] animate-pulse" />
                          Main Quest
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-sans font-medium text-sm text-slate-800">
                      {rule.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-slate-150/40 pt-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <AlertCircle size={14} />
              Commit to this exact operating system. No new hacks or dashboards.
            </p>
            <span className="text-xs font-mono font-medium text-[#C9A227] italic bg-[#FDF8E7] px-3 py-1 rounded-sm border border-[#D4AF37]/15">
              "My body comes before my ego."
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
