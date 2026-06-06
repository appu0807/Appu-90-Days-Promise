import { Habit, DailyEntry, WeeklyReview, JobApplication, Transaction, Bill, CreditCard, Subscription, ProgramState } from './types';

export const DEFAULT_HABITS: Habit[] = [
  // Spiritual
  { id: 'srf-energization', name: 'SRF Energization', category: 'Spiritual', isDaily: true, description: 'Self-Realization Fellowship tension and relaxation exercises.' },
  { id: 'meditation', name: 'Meditation', category: 'Spiritual', isDaily: true, description: 'Sit in silence, focusing on the calm presence.' },
  { id: 'prayer', name: 'Prayer', category: 'Spiritual', isDaily: true, description: 'Sincere communion and connection with God.' },
  
  // Health
  { id: 'protein', name: 'Protein Target', category: 'Health', isDaily: true, description: 'Meet daily muscle recovery and nutrition target.' },
  { id: 'water', name: 'Water Target', category: 'Health', isDaily: true, description: 'Fulfill optimal hydration goal.' },
  { id: 'movement', name: 'Movement', category: 'Health', isDaily: true, description: 'Healthy cardiovascular activity or strength building.' },
  { id: 'sleep-time', name: 'Sleep Before 10:30 PM', category: 'Health', isDaily: true, description: 'Wind down and sleep early to heal the body.' },
  
  // Personal Growth
  { id: 'gayathri', name: 'Gayathri Program (30 mins)', category: 'Personal Growth', isDaily: true, description: 'Chanting/mantra and internal focus program.' },
  { id: 'goal-journal', name: 'Goal Journaling', category: 'Personal Growth', isDaily: true, description: 'Review and capture core life ambitions.' },
  { id: 'night-script', name: 'Night Goal Script', category: 'Personal Growth', isDaily: true, description: 'Writing down affirmations or scripts before sleep.' },
  
  // Money & Reflection
  { id: 'money-check', name: 'Daily Money Check', category: 'Money', isDaily: true, description: 'Briefly review balances and conscious choices.' },
  { id: 'daily-reflection', name: 'Daily Reflection ("What did I learn?")', category: 'Reflection', isDaily: true, description: 'A brief review of lessons from this day.' }
];

export const CORE_BELIEFS = [
  "I am becoming a man who takes care of the body God entrusted to him.",
  "My progress comes from returning, not perfection.",
  "I trust myself to come back.",
  "God walks beside me as I heal.",
  "I love myself for who I am.",
  "Health is my main quest. Everything else is a side quest.",
  "I trust myself to bounce back."
];

export const NORTH_STARS = [
  "Takes care of his body with unconditional care.",
  "Stays present with discomfort, learning to listen to pain without panic.",
  "Trusts himself to adapt, recover, and grow dynamically.",
  "Trusts God to walk beside him as an active, peaceful partner in healing.",
  "Creates meaningful stories from a place of deep curiosity and focus.",
  "Allows himself to be seen, comfortable speaking and sharing without defensive masks.",
  "Manages money responsibly and plans with deep calm.",
  "Lives slowly, intentionally, and strictly protects his recovery time."
];

export const SYSTEM_RULES = [
  { ruleNum: 1, title: "Health is the Main Quest", desc: "Everything else is a side quest. Your body is the temple God entrusted to you." },
  { ruleNum: 2, title: "Never Miss Twice", desc: "If you miss once, simply return on the next day. A slip is a single event; a streak of misses is a bad design." },
  { ruleNum: 3, title: "No Catching Up", desc: "No punishment, no doubling tasks, no compensatory cycles. Continue normally with peace." },
  { ruleNum: 4, title: "Recovery Counts", desc: "Recovery is highly productive. If your body or mind needs deep rest, count it as a full-credit win." },
  { ruleNum: 5, title: "80% Consistency Wins", desc: "Perfection is never required. 80% effort over 90 days changes your biology completely." },
  { ruleNum: 6, title: "No New Systems for 90 Days", desc: "No new productivity apps, no new complicated habit formulas, no new courses, no new coaches. Follow this exact companion system." },
  { ruleNum: 7, title: "My Body Comes Before My Ego", desc: "If your body needs rest, recovery overrides any task or goal. Listening to pain is a spiritual discipline." }
];

export const WORKOUT_ROUTINE: Record<string, string> = {
  'Monday': 'Workout A (Wrist-Safe Upper Body & Core)',
  'Tuesday': 'Rest / Deep Recovery',
  'Wednesday': 'Workout B (Lower Body & Spine Mobility)',
  'Thursday': 'Rest / Deep Recovery',
  'Friday': 'Workout C (Wrist-Safe Dumbbells & Endurance)',
  'Saturday': 'Rest / Deep Recovery',
  'Sunday': 'Recovery Yoga & Full Body Oil Massage'
};

export const WRITING_ROUTINE: Record<string, string> = {
  'Tuesday': '1 Hour Feature Film Screenplay: Deep Writing Session',
  'Thursday': '1 Hour Feature Film Screenplay: Deep Writing Session',
  'Saturday': '1 Hour Feature Film Screenplay: Deep Writing Session'
};

export const VISIBILITY_WORKFLOW: Record<string, string> = {
  'Wednesday': 'Create Stage - Shoot or capture content (No creating & posting on the same day)',
  'Friday': 'Review Stage - Polishing, reviewing specs, preparing metadata',
  'Sunday': 'Post Stage - Post onto platforms (Face/Voice rules applied)'
};

export const CAREER_ROUTINE: Record<string, string> = {
  'Tuesday': '30 Minutes Dedicated Job Search',
  'Thursday': '30 Minutes Dedicated Job Search'
};

// Help generate initial state
export function getInitialState(startDateStr = '2026-06-01'): ProgramState {
  const customHabits: Habit[] = [];
  
  // Job Applications
  const jobApplications: JobApplication[] = [
    {
      id: 'app-1',
      company: 'Creative Media Ltd',
      position: 'Staff Screenwriter & Director',
      status: 'Interviewing',
      dateApplied: '2026-06-02',
      followUpDate: '2026-06-08',
      notes: 'Initial chat went well. Follow-up interview scheduled for next Monday.'
    },
    {
      id: 'app-2',
      company: 'Interactive Arts group',
      position: 'Narrative Designer',
      status: 'Applied',
      dateApplied: '2026-06-04',
      notes: 'Submitted customized portfolio centering on character dialogue and emotional arcs.'
    },
    {
      id: 'app-3',
      company: 'Starlight Productions',
      position: 'Assistant Story Producer',
      status: 'Opportunity',
      dateApplied: '',
      notes: 'Spoke to their head of creative on LinkedIn. They are expanding their streaming slate.'
    }
  ];

  // Transactions
  const transactions: Transaction[] = [
    { id: 't-1', type: 'income', amount: 3200, category: 'Freelance Design', description: 'Screenplay Consulting & Layout contract payout', date: '2026-06-01' },
    { id: 't-2', type: 'expense', amount: 89, category: 'Health', description: 'Wrist Recovery Braces & Medical Tape', date: '2026-06-02' },
    { id: 't-3', type: 'expense', amount: 120, category: 'Subscriptions', description: 'Narrative Film Craft Academy Annual Subscription', date: '2026-06-03' },
    { id: 't-4', type: 'savings', amount: 500, category: 'Monthly Saving Target', description: 'Transferred to High Yield Savings', date: '2026-06-05' },
    { id: 't-5', type: 'growth_fund', amount: 200, category: 'Vanguard Index', description: 'Recurring auto-investment into growth index', date: '2026-06-05' }
  ];

  // Bills
  const bills: Bill[] = [
    { id: 'b-1', name: 'Apartment Rent', amount: 1500, dueDate: '2026-06-01', isPaid: true },
    { id: 'b-2', name: 'Health Insurance', amount: 180, dueDate: '2026-06-15', isPaid: false },
    { id: 'b-3', name: 'Electricity Metric', amount: 75, dueDate: '2026-06-20', isPaid: false }
  ];

  // Credit Cards
  const creditCards: CreditCard[] = [
    { id: 'c-1', name: 'Chase Sage', limit: 8000, balance: 450, dueDate: '2026-06-25' },
    { id: 'c-2', name: 'Amex Gold', limit: 15000, balance: 120, dueDate: '2026-06-28' }
  ];

  // Subscriptions
  const subscriptions: Subscription[] = [
    { id: 's-1', name: 'WriterDuet Screenwriting Pro', amount: 19, billingCycle: 'monthly' },
    { id: 's-2', name: 'IMDbPro Professional Account', amount: 15, billingCycle: 'monthly' },
    { id: 's-3', name: 'Gym & Recovery Spa Access', amount: 95, billingCycle: 'monthly' }
  ];

  // Daily entries generation for 90 days starting at startDateStr
  const dailyEntries: Record<string, DailyEntry> = {};
  const baseDate = new Date(startDateStr);
  
  for (let i = 0; i < 90; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.toLocaleDateString('en-US', { weekday: 'long' });
    
    // Determine default mock values for the first 5 days that are "in the past" (June 1st to June 5th)
    // to give beautiful dashboards. Days 6+ are empty by default.
    const isPast = i < 5;
    
    const completedHabits: Record<string, boolean> = {};
    if (isPast) {
      // Completed most things, let's say 85% compliance
      DEFAULT_HABITS.forEach(h => {
        completedHabits[h.id] = Math.random() > 0.15;
      });
    } else {
      DEFAULT_HABITS.forEach(h => {
        completedHabits[h.id] = false;
      });
    }

    // Health metrics
    const proteinVal = isPast ? Math.floor(110 + Math.random() * 40) : 0;
    const waterVal = isPast ? Math.floor(1800 + Math.random() * 1200) : 0;
    const sleepVal = isPast ? Number((6.5 + Math.random() * 2).toFixed(1)) : 0;
    const stepsVal = isPast ? Math.floor(6000 + Math.random() * 7000) : 0;
    const moodVal = isPast ? Math.floor(6 + Math.random() * 4) : 5;
    const energyVal = isPast ? Math.floor(6 + Math.random() * 4) : 5;
    const painVal = isPast ? Math.floor(2 + Math.random() * 4) : 3;

    // Writing conditions
    const hasDeepWriting = dayOfWeek === 'Tuesday' || dayOfWeek === 'Thursday' || dayOfWeek === 'Saturday';
    const deepWritingDone = isPast && hasDeepWriting ? Math.random() > 0.2 : false;
    const fiveMinStoryDone = isPast ? Math.random() > 0.4 : false;
    
    let storyText = '';
    if (deepWritingDone) {
      storyText = `Completed 1-hour session of feature film. Focused on the transition from Act I to Act II, setting up the key psychological shifts. Handled resistance nicely.`;
    }

    // Reflection Text
    let dailyReflection = '';
    if (isPast) {
      const positiveReflections = [
        "A quiet day. Focussed heavily on treating my wrist carefully during keyboard writing.",
        "Ensured I drank full glass of water every hour. Sleep was excellent.",
        "Felt deep spiritual connection during morning SRF energization. It feels good to slow down.",
        "A bit fatigued in afternoon, but respected my body. Stopped work early to read screenplays.",
        "Focussed on conscious eating. Registered how blood pressure feels fully stable."
      ];
      dailyReflection = positiveReflections[i % positiveReflections.length];
    }

    dailyEntries[dateStr] = {
      dayNum: i + 1,
      dateStr,
      completedHabits,
      health: {
        protein: proteinVal,
        water: waterVal,
        sleep: sleepVal,
        steps: stepsVal,
        bloodPressure: isPast ? `${Math.floor(118 + Math.random()*8)}/${Math.floor(76 + Math.random()*6)}` : '',
        mood: moodVal,
        energy: energyVal,
        wristPain: painVal
      },
      deepWritingDone,
      fiveMinStoryDone,
      storyText,
      dailyReflection,
      tookCareOfBody: isPast ? (painVal <= 4 && sleepVal >= 7) : false
    };
  }

  // Generate 13 Weekly Reviews
  const weeklyReviews: Record<number, WeeklyReview> = {};
  for (let w = 1; w <= 13; w++) {
    const wBase = new Date(baseDate);
    wBase.setDate(baseDate.getDate() + (w - 1) * 7);
    const startStr = wBase.toISOString().split('T')[0];
    
    const wEnd = new Date(wBase);
    wEnd.setDate(wBase.getDate() + 6);
    const endStr = wEnd.toISOString().split('T')[0];
    
    // Pre-complete Week 1 review since it corresponds to Days 1-7, and today is Day 6 (almost done).
    // Let's mark it as incomplete by default, but let the user fills it easily.
    weeklyReviews[w] = {
      weekNum: w,
      startDate: startStr,
      endDate: endStr,
      scores: {
        health: w === 1 ? 8 : 0,
        creativity: w === 1 ? 7 : 0,
        visibility: w === 1 ? 6 : 0,
        money: w === 1 ? 8 : 0,
        spirituality: w === 1 ? 9 : 0
      },
      reflections: {
        worked: w === 1 ? "Slowing down works wonders. The wrist brace combined with heat packs and strict movement targets reduced raw wrist fatigue by half. Daily prayer is restoring absolute calmness." : "",
        didntWork: w === 1 ? "Pushed too fast on Tuesday movie thinking, which slightly tensed my hand. I need to use vocal dictation or relax physical keystrokes." : "",
        learning: w === 1 ? "Success is literally defined by loving caretaker attitude to my body, not page counts or application numbers." : "",
        improvement: w === 1 ? "Incorporate a soft timer for screenplay typing, stopping strictly every 20 minutes for gentle wrist flexes." : ""
      },
      isCompleted: w === 1
    };
  }

  return {
    version: '1.0.0',
    startDate: startDateStr,
    userName: 'Appu',
    dailyEntries,
    weeklyReviews,
    jobApplications,
    transactions,
    bills,
    creditCards,
    subscriptions,
    customHabits,
    stepsTarget: 7000,
    proteinTarget: 90,
    waterTarget: 3000
  };
}
