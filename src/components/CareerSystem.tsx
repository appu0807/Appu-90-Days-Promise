import React, { useState } from 'react';
import { ProgramState, JobApplication } from '../types';
import { Briefcase, Landmark, Bookmark, FileStack, Flame, CalendarCheck2, ArrowRightCircle, Plus, Trash2, Edit } from 'lucide-react';

interface CareerSystemProps {
  state: ProgramState;
  onUpdateState: (updatedState: Partial<ProgramState>) => void;
}

export default function CareerSystem({ state, onUpdateState }: CareerSystemProps) {
  // Local state for Job App inputs
  const [company, setCompany] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [status, setStatus] = useState<JobApplication['status']>('Opportunity');
  const [dateApplied, setDateApplied] = useState<string>('');
  const [followUpDate, setFollowUpDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !position) return;

    const newApp: JobApplication = {
      id: 'app-' + Date.now(),
      company,
      position,
      status,
      dateApplied: dateApplied || new Date().toISOString().split('T')[0],
      followUpDate: followUpDate || undefined,
      notes: notes || undefined
    };

    onUpdateState({
      jobApplications: [newApp, ...state.jobApplications]
    });

    // Reset Form
    setCompany('');
    setPosition('');
    setStatus('Opportunity');
    setDateApplied('');
    setFollowUpDate('');
    setNotes('');
  };

  const handleDeleteApplication = (id: string) => {
    onUpdateState({
      jobApplications: state.jobApplications.filter(a => a.id !== id)
    });
  };

  const handleUpdateStatus = (id: string, newStatus: JobApplication['status']) => {
    onUpdateState({
      jobApplications: state.jobApplications.map(a => a.id === id ? { ...a, status: newStatus } : a)
    });
  };

  // Group applications for pipeline counts
  const appsByStatus = (currStatus: JobApplication['status']) => {
    return state.jobApplications.filter(a => a.status === currStatus);
  };

  return (
    <div className="space-y-10" id="career-system-wrapper">
      
      {/* Intro Routine Display */}
      <div className="bg-[#EAF2F8] border border-[#5A8FBA]/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between" id="career-routine-intro">
        <div className="space-y-2 text-center md:text-left max-w-xl">
          <span className="text-[10px] tracking-widest font-mono text-[#5A8FBA] bg-white px-3 py-1 rounded-full border border-[#5A8FBA]/10 font-bold uppercase">
            Consistency Rhythm
          </span>
          <h2 className="text-xl md:text-2xl font-serif italic text-slate-800">
            "30-Minute Tuesday & Thursday Job Focus"
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-sans">
            Steady, calm applications defeat erratic sprint stress. Set your alarm, spend exactly 30 minutes searching or reaching out on Tuesdays and Thursdays, then close your laptop with complete peace of mind.
          </p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-center shrink-0 border-slate-100 hidden sm:block">
          <Briefcase size={28} className="text-[#5A8FBA] mx-auto mb-1" />
          <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Tues/Thurs Routine</span>
          <p className="text-xs font-bold text-slate-700 mt-0.5">30 Min Hyper-focussed</p>
        </div>
      </div>

      {/* Grid: Forms & Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="career-pipeline-grid">
        
        {/* Applications Adder Form (Left 4 cols) */}
        <div className="lg:col-span-4" id="log-app-wrapper">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs">
            <h3 className="text-sm font-sans font-medium text-slate-800 border-b border-slate-55 pb-2.5 mb-4">
              Add Job Venture
            </h3>
            
            <form onSubmit={handleAddApplication} className="space-y-4 text-xs font-sans">
              
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Company Name</label>
                <input 
                  type="text" required value={company} onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Netflix Creative, BBC" className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Position / Job Title</label>
                <input 
                  type="text" required value={position} onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Assistant Story Creator" className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Initial Pipeline Stage</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value as JobApplication['status'])}
                  className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none"
                >
                  <option value="Opportunity">Opportunity (Idea / Prep)</option>
                  <option value="Applied">Applied (Sent CV)</option>
                  <option value="Interviewing">Interviewing (Active chat)</option>
                  <option value="Followed Up">Followed Up</option>
                  <option value="Offered">Offered (Under review)</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">Date Applied</label>
                  <input 
                    type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)}
                    className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">Follow-Up Target</label>
                  <input 
                    type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Contact / Notes</label>
                <textarea 
                  value={notes} onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add details about interviewers, correspondence dates, portfolio links..." rows={3}
                  className="w-full border border-slate-150 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:outline-none leading-relaxed"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#5A8FBA] hover:bg-[#467BA6] text-white py-2.5 rounded-lg font-mono font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
              >
                Log New Application
              </button>
            </form>
          </div>
        </div>

        {/* Notion-Style Active Table Pipe (Right 8 cols) */}
        <div className="lg:col-span-8 space-y-6" id="job-pipeline-board">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-2xs">
            <div className="flex justify-between items-center border-b border-slate-50 pb-3 mb-4">
              <div>
                <h3 className="font-sans font-medium text-slate-800">Job Progression Outbox</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage opportunities and ongoing correspondence with ease.</p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border">
                {state.jobApplications.length} Active Lines
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-mono tracking-wider uppercase text-slate-400 bg-slate-50/50">
                    <th className="py-2.5 px-3 font-medium">Position / Employer</th>
                    <th className="py-2.5 px-3 font-medium">Stage</th>
                    <th className="py-2.5 px-3 font-medium">Applied</th>
                    <th className="py-2.5 px-3 font-medium">Follow Up Target</th>
                    <th className="py-2.5 px-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {state.jobApplications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 italic font-sans text-xs">
                        No applications logged. Input CV details to fill table.
                      </td>
                    </tr>
                  ) : (
                    state.jobApplications.map((app) => {
                      let statusBadge = 'bg-slate-100 text-slate-600';
                      if (app.status === 'Interviewing') statusBadge = 'bg-indigo-50 text-indigo-600 border border-indigo-100';
                      else if (app.status === 'Applied') statusBadge = 'bg-[#EAF2F8] text-[#5A8FBA] border border-[#5A8FBA]/25';
                      else if (app.status === 'Offered') statusBadge = 'bg-[#EEF6F1] text-[#5E9B71] border border-[#5E9B71]/25';
                      else if (app.status === 'Opportunity') statusBadge = 'bg-[#FAF9F6] text-amber-600 border border-amber-250/20';

                      return (
                        <React.Fragment key={app.id}>
                          <tr className="hover:bg-slate-50/20 transition-colors">
                            <td className="py-3 px-3">
                              <div>
                                <h4 className="font-semibold text-slate-700">{app.position}</h4>
                                <span className="text-[10px] text-slate-400 font-medium">{app.company}</span>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <select
                                value={app.status}
                                onChange={(e) => handleUpdateStatus(app.id, e.target.value as JobApplication['status'])}
                                className={`text-[10px] font-mono px-2 py-0.5 rounded cursor-pointer ${statusBadge}`}
                              >
                                <option value="Opportunity">Opportunity</option>
                                <option value="Applied">Applied</option>
                                <option value="Interviewing">Interviewing</option>
                                <option value="Followed Up">Followed Up</option>
                                <option value="Offered">Offered</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{app.dateApplied || 'Not yet'}</td>
                            <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{app.followUpDate || '—'}</td>
                            <td className="py-3 px-3 text-right">
                              <button 
                                onClick={() => handleDeleteApplication(app.id)}
                                className="text-slate-350 hover:text-rose-500 transition-colors p-1"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                          
                          {/* Inner details row */}
                          {app.notes && (
                            <tr className="bg-slate-50/10">
                              <td colSpan={5} className="px-3 pb-2.5">
                                <div className="text-[10px] text-slate-400 font-sans leading-relaxed p-2 bg-slate-50/50 rounded-lg">
                                  <strong>Status Log:</strong> {app.notes}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
