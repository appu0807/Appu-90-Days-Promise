/**
 * Types and interfaces for the 90 Days Life Program "Personal Operating System"
 * Built specifically for Appu's journey.
 */

export interface Habit {
  id: string;
  name: string;
  category: 'Spiritual' | 'Health' | 'Personal Growth' | 'Money' | 'Reflection';
  description?: string;
  isDaily: boolean;
}

export interface MetricLog {
  id: string;
  timestamp: string;
  value: number;
  note?: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'Opportunity' | 'Applied' | 'Interviewing' | 'Followed Up' | 'Offered' | 'Archived';
  dateApplied: string;
  followUpDate?: string;
  notes?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'savings' | 'growth_fund';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
}

export interface CreditCard {
  id: string;
  name: string;
  limit: number;
  balance: number;
  dueDate: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  billingCycle: 'monthly' | 'yearly';
}

export interface DailyHealthMetrics {
  protein: number; // in grams
  water: number; // in ml
  sleep: number; // in hours
  steps: number;
  bloodPressure?: string; // e.g. "120/80"
  mood: number; // 1-10
  energy: number; // 1-10
  wristPain: number; // 1-10
}

export interface VisibilityWeek {
  weekNum: number;
  contentType: 'Image/Text' | 'Video';
  faceVoiceRequired: boolean;
  created: boolean;
  reviewed: boolean;
  posted: boolean;
  notes?: string;
}

export interface DailyEntry {
  dayNum: number; // 1 to 90
  dateStr: string; // YYYY-MM-DD
  completedHabits: Record<string, boolean>; // habitId -> completed
  health: DailyHealthMetrics;
  
  // Writing
  deepWritingDone: boolean; // Tuesday, Thursday, Saturday
  fiveMinStoryDone: boolean; // Optional daily story
  storyText?: string;
  
  // Reflection text
  dailyReflection: string;
  
  // Success metric
  tookCareOfBody: boolean; // "Did I become a man who lovingly took care of the body God entrusted to him?"
}

export interface WeeklyReview {
  weekNum: number; // 1 to 13
  startDate: string;
  endDate: string;
  scores: {
    health: number; // /10
    creativity: number; // /10
    visibility: number; // /10
    money: number; // /10
    spirituality: number; // /10
  };
  reflections: {
    worked: string;
    didntWork: string;
    learning: string;
    improvement: string;
  };
  isCompleted: boolean;
}

export interface ProgramState {
  version: string;
  startDate: string; // YYYY-MM-DD
  userName: string;
  dailyEntries: Record<string, DailyEntry>; // dateStr -> DailyEntry
  weeklyReviews: Record<number, WeeklyReview>; // weekNum -> WeeklyReview
  jobApplications: JobApplication[];
  transactions: Transaction[];
  bills: Bill[];
  creditCards: CreditCard[];
  subscriptions: Subscription[];
  customHabits: Habit[];
  stepsTarget?: number;
  proteinTarget?: number;
  waterTarget?: number;
}
