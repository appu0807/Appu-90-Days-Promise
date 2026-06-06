import React, { useState } from 'react';
import { ProgramState, Transaction, Bill, CreditCard, Subscription } from '../types';
import { Landmark, ArrowUpRight, ArrowDownRight, FileText, Calendar, CreditCard as CardIcon, RefreshCw, Plus, CheckCircle, Trash2, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MoneyDashboardProps {
  state: ProgramState;
  onUpdateState: (updatedState: Partial<ProgramState>) => void;
}

export default function MoneyDashboard({ state, onUpdateState }: MoneyDashboardProps) {
  // Local state for transaction inputs
  const [txType, setTxType] = useState<'income' | 'expense' | 'savings' | 'growth_fund'>('expense');
  const [txAmount, setTxAmount] = useState<string>('');
  const [txCategory, setTxCategory] = useState<string>('');
  const [txDesc, setTxDesc] = useState<string>('');

  // Local state for bills inputs
  const [billName, setBillName] = useState<string>('');
  const [billAmount, setBillAmount] = useState<string>('');
  const [billDueDate, setBillDueDate] = useState<string>('');

  // Local state for cards inputs
  const [cardName, setCardName] = useState<string>('');
  const [cardLimit, setCardLimit] = useState<string>('');
  const [cardBalance, setCardBalance] = useState<string>('');
  const [cardDueDate, setCardDueDate] = useState<string>('');

  // Local state for subscription inputs
  const [subName, setSubName] = useState<string>('');
  const [subAmount, setSubAmount] = useState<string>('');
  const [subCycle, setSubCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Calculated totals
  const totalIncome = state.transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalSavings = state.transactions
    .filter(t => t.type === 'savings')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalGrowth = state.transactions
    .filter(t => t.type === 'growth_fund')
    .reduce((acc, t) => acc + t.amount, 0);

  // Manage Transactions
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txAmount || isNaN(Number(txAmount))) return;

    const newTx: Transaction = {
      id: 'tx-' + Date.now(),
      type: txType,
      amount: Number(txAmount),
      category: txCategory || 'General',
      description: txDesc || 'Logged transaction',
      date: new Date().toISOString().split('T')[0]
    };

    onUpdateState({
      transactions: [newTx, ...state.transactions]
    });

    // Reset Form
    setTxAmount('');
    setTxCategory('');
    setTxDesc('');
  };

  const handleDeleteTransaction = (id: string) => {
    onUpdateState({
      transactions: state.transactions.filter(t => t.id !== id)
    });
  };

  // Manage Bills
  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billName || !billAmount || isNaN(Number(billAmount))) return;

    const newBill: Bill = {
      id: 'bill-' + Date.now(),
      name: billName,
      amount: Number(billAmount),
      dueDate: billDueDate || new Date().toISOString().split('T')[0],
      isPaid: false
    };

    onUpdateState({
      bills: [...state.bills, newBill]
    });

    setBillName('');
    setBillAmount('');
    setBillDueDate('');
  };

  const toggleBillPaid = (id: string) => {
    onUpdateState({
      bills: state.bills.map(b => b.id === id ? { ...b, isPaid: !b.isPaid } : b)
    });
  };

  const handleDeleteBill = (id: string) => {
    onUpdateState({
      bills: state.bills.filter(b => b.id !== id)
    });
  };

  // Manage Credit Cards
  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardLimit || isNaN(Number(cardLimit))) return;

    const newCard: CreditCard = {
      id: 'card-' + Date.now(),
      name: cardName,
      limit: Number(cardLimit),
      balance: Number(cardBalance) || 0,
      dueDate: cardDueDate || '25th'
    };

    onUpdateState({
      creditCards: [...state.creditCards, newCard]
    });

    setCardName('');
    setCardLimit('');
    setCardBalance('');
    setCardDueDate('');
  };

  const updateCardBalance = (id: string, amount: number) => {
    onUpdateState({
      creditCards: state.creditCards.map(c => c.id === id ? { ...c, balance: Math.max(0, amount) } : c)
    });
  };

  const handleDeleteCard = (id: string) => {
    onUpdateState({
      creditCards: state.creditCards.filter(c => c.id !== id)
    });
  };

  // Manage Subscriptions
  const handleAddSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName || !subAmount || isNaN(Number(subAmount))) return;

    const newSub: Subscription = {
      id: 'sub-' + Date.now(),
      name: subName,
      amount: Number(subAmount),
      billingCycle: subCycle
    };

    onUpdateState({
      subscriptions: [...state.subscriptions, newSub]
    });

    setSubName('');
    setSubAmount('');
  };

  const handleDeleteSub = (id: string) => {
    onUpdateState({
      subscriptions: state.subscriptions.filter(s => s.id !== id)
    });
  };

  return (
    <div className="space-y-10" id="money-dashboard-wrapper">
      
      {/* Dynamic Headers Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="balances-cards">
        
        {/* Income Card */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-3xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Total Income</span>
            <h3 className="text-xl font-mono font-bold text-[#5E9B71] mt-1">${totalIncome}</h3>
          </div>
          <div className="p-2 bg-[#EEF6F1] text-[#5E9B71] rounded-lg">
            <ArrowUpRight size={18} />
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-3xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Total Outgoing</span>
            <h3 className="text-xl font-mono font-bold text-[#5A8FBA] mt-1">${totalExpenses}</h3>
          </div>
          <div className="p-2 bg-[#EAF2F8] text-[#5A8FBA] rounded-lg">
            <ArrowDownRight size={18} />
          </div>
        </div>

        {/* Savings Card */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-3xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Total Savings</span>
            <h3 className="text-xl font-mono font-bold text-[#C9A227] mt-1">${totalSavings}</h3>
          </div>
          <div className="p-2 bg-[#FDF8E7] text-[#C9A227] rounded-lg">
            <Landmark size={18} />
          </div>
        </div>

        {/* Growth Fund */}
        <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-3xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Growth Fund</span>
            <h3 className="text-xl font-mono font-bold text-slate-700 mt-1">${totalGrowth}</h3>
          </div>
          <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
            <ArrowUpRight size={18} />
          </div>
        </div>

      </div>

      {/* Grid: Adding Operations & Active Ledger lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="operations-grid">
        
        {/* Ledger & Add Transaction Forms (Left Columns) */}
        <div className="lg:col-span-4 space-y-6" id="add-tx-panels">
          
          {/* Quick transaction logger */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
            <h3 className="text-sm font-sans font-medium text-slate-800 border-b border-slate-55 pb-2.5 mb-4">Log Financial Entry</h3>
            
            <form onSubmit={handleAddTransaction} className="space-y-4 text-xs font-sans">
              <div className="flex bg-slate-50 border p-1 rounded-lg gap-1 border-slate-150/50">
                {(['expense', 'income', 'savings', 'growth_fund'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTxType(type)}
                    className={`flex-1 py-1 text-[10px] capitalize font-mono font-bold rounded-md transition-all cursor-pointer text-center ${
                      txType === type 
                        ? 'bg-[#EAF2F8] text-[#5A8FBA] border border-[#5A8FBA]/10' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Amount ($)</label>
                <input 
                  type="text" 
                  value={txAmount}
                  onChange={(e) => setTxAmount(e.target.value)}
                  placeholder="0.00" 
                  className="w-full border border-slate-150 rounded-lg p-2 font-mono bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Category</label>
                <input 
                  type="text" 
                  value={txCategory}
                  onChange={(e) => setTxCategory(e.target.value)}
                  placeholder="e.g. Food, Rent, Medical" 
                  className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Description</label>
                <input 
                  type="text" 
                  value={txDesc}
                  onChange={(e) => setTxDesc(e.target.value)}
                  placeholder="Additional context notes..." 
                  className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#5A8FBA] hover:bg-[#467BA6] text-white py-2.5 rounded-lg font-mono font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer"
              >
                Submit Entry Ledger
              </button>
            </form>
          </div>

          {/* Quick Credit Cards Adder */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs">
            <h3 className="text-sm font-sans font-medium text-slate-800 border-b border-slate-55 pb-2.5 mb-4">Register Credit Card</h3>
            <form onSubmit={handleAddCard} className="space-y-3.5 text-xs font-sans">
              <input 
                type="text" value={cardName} onChange={(e) => setCardName(e.target.value)}
                placeholder="Card Issuer Name..." className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input 
                  type="text" value={cardLimit} onChange={(e) => setCardLimit(e.target.value)}
                  placeholder="Credit Limit ($)" className="w-full border border-slate-150 rounded-lg p-2 font-mono bg-slate-50 focus:bg-white focus:outline-none"
                />
                <input 
                  type="text" value={cardBalance} onChange={(e) => setCardBalance(e.target.value)}
                  placeholder="Curr Balance ($)" className="w-full border border-slate-150 rounded-lg p-2 font-mono bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>
              <input 
                type="text" value={cardDueDate} onChange={(e) => setCardDueDate(e.target.value)}
                placeholder="Payment Due Date (e.g. 25th)" className="w-full border border-slate-150 rounded-lg p-2 bg-slate-50 focus:bg-white focus:outline-none"
              />
              <button type="submit" className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-lg font-mono text-[10px] tracking-wider uppercase cursor-pointer">
                Attach Card
              </button>
            </form>
          </div>

        </div>

        {/* Dynamic lists (Right/Mid Columns) */}
        <div className="lg:col-span-8 space-y-6" id="dashboard-lists">
          
          {/* Recent ledger transactions */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs" id="ledger-history">
            <h3 className="text-sm font-sans font-medium text-slate-800 border-b border-slate-50 pb-3 mb-4">Interactive Financial Ledger</h3>
            
            <div className="overflow-y-auto max-h-60 space-y-2.5 text-xs">
              {state.transactions.length === 0 ? (
                <div className="py-8 text-center text-slate-400 italic font-sans text-xs">No transactions registered yet. Use form to create one.</div>
              ) : (
                state.transactions.map((t) => {
                  let badgeColor = 'bg-slate-100 text-slate-700';
                  let symbol = '-';
                  if (t.type === 'income') {
                    badgeColor = 'bg-[#EEF6F1] text-[#5E9B71]';
                    symbol = '+';
                  } else if (t.type === 'savings') {
                    badgeColor = 'bg-[#FDF8E7] text-[#C9A227]';
                  }

                  return (
                    <div key={t.id} className="flex justify-between items-center p-3 border border-slate-50 hover:bg-slate-50/50 rounded-xl transition-all" id={`tx-item-${t.id}`}>
                      <div className="flex gap-3 items-center">
                        <span className={`px-2 py-0.5 font-mono text-[9px] uppercase font-bold rounded-md ${badgeColor}`}>
                          {t.type.replace('_', ' ')}
                        </span>
                        <div>
                          <h4 className="font-semibold text-slate-700">{t.description}</h4>
                          <span className="text-[10px] text-slate-400 font-mono italic">{t.date} • {t.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`font-mono font-bold text-sm ${t.type === 'income' ? 'text-[#5E9B71]' : 'text-slate-800'}`}>
                          {symbol}${t.amount}
                        </span>
                        <button 
                          onClick={() => handleDeleteTransaction(t.id)}
                          className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Upcoming Bills panel */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs" id="bills-ledger">
              <div className="border-b border-slate-50 pb-2.5 mb-4">
                <h3 className="text-sm font-sans font-medium text-slate-800">Conscious Bill Schedules</h3>
                <p className="text-[10px] text-slate-400 leading-normal">Satisfyingly toggle payment state.</p>
              </div>

              {/* Bills quick logger inline */}
              <form onSubmit={handleAddBill} className="grid grid-cols-3 gap-2 border-b border-dashed border-slate-100 pb-3 mb-3">
                <input 
                  type="text" value={billName} onChange={(e) => setBillName(e.target.value)}
                  placeholder="Bill Name" className="col-span-1 border border-slate-150 p-1.5 text-[10px] rounded"
                />
                <input 
                  type="text" value={billAmount} onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="Amount ($)" className="col-span-1 border border-slate-150 p-1.5 text-[10px] font-mono rounded"
                />
                <button type="submit" className="col-span-1 bg-[#5A8FBA] text-white font-mono text-[9px] uppercase font-bold rounded cursor-pointer">
                  + Add Bill
                </button>
              </form>

              <div className="space-y-2 max-h-52 overflow-y-auto">
                {state.bills.map((b) => (
                  <div key={b.id} className="flex justify-between items-center p-2.5 border rounded-lg text-xs hover:bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <button onClick={() => toggleBillPaid(b.id)} className={`p-0.5 border rounded ${b.isPaid ? 'border-[#5E9B71] text-[#5E9B71]' : 'border-slate-300 text-slate-300'} hover:border-[#5E9B71] transition-all`}>
                        <CheckCircle size={14} className={b.isPaid ? 'fill-emerald-50' : ''} />
                      </button>
                      <div>
                        <h4 className={`font-semibold ${b.isPaid ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{b.name}</h4>
                        <span className="text-[10px] text-slate-400 font-mono">Due: {b.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold">${b.amount}</span>
                      <button onClick={() => handleDeleteBill(b.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscriptions & Cards list */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs" id="subscriptions-ledger">
              <div className="border-b border-slate-50 pb-2.5 mb-4">
                <h3 className="text-sm font-sans font-medium text-slate-800">Card Limits & Subscriptions</h3>
                <p className="text-[10px] text-slate-400 leading-normal">Keep a clean pulse on active liabilities.</p>
              </div>

              {/* Subscriptions simplified view */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">Recurring Subscriptions</h4>
                  
                  <form onSubmit={handleAddSub} className="grid grid-cols-3 gap-2 border-b border-dashed border-slate-100 pb-2.5 mb-2.5">
                    <input 
                      type="text" value={subName} onChange={(e) => setSubName(e.target.value)}
                      placeholder="e.g. WriterDuet" className="col-span-1 border border-slate-150 p-1.5 text-[10px] rounded"
                    />
                    <input 
                      type="text" value={subAmount} onChange={(e) => setSubAmount(e.target.value)}
                      placeholder="Cost ($)" className="col-span-1 border border-slate-150 p-1.5 text-[10px] font-mono rounded"
                    />
                    <button type="submit" className="col-span-1 bg-slate-700 text-white font-mono text-[9px] uppercase font-bold rounded cursor-pointer">
                      + Add Sub
                    </button>
                  </form>

                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {state.subscriptions.map((s) => (
                      <div key={s.id} className="flex justify-between items-center text-xs p-1.5 border border-slate-50 rounded">
                        <span className="font-semibold text-slate-600">{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-700">${s.amount}/mo</span>
                          <button onClick={() => handleDeleteSub(s.id)} className="text-slate-300 hover:text-rose-500 transition-colors p-0.5">
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Credit Cards list inside */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">My Credit Cards</h4>
                  <div className="space-y-2 max-h-36 overflow-y-auto">
                    {state.creditCards.map((c) => {
                      const balanceRatio = c.limit > 0 ? (c.balance / c.limit) * 100 : 0;
                      return (
                        <div key={c.id} className="border border-slate-50 p-2.5 rounded-lg text-xs space-y-1 bg-slate-50/20">
                          <div className="flex justify-between items-center font-semibold text-slate-700">
                            <span>{c.name}</span>
                            <button onClick={() => handleDeleteCard(c.id)} className="text-slate-300 hover:text-rose-500 transition-colors">
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                            <span>Limit: ${c.limit}</span>
                            <span>Due: {c.dueDate}</span>
                          </div>
                          
                          {/* Inner level tracker */}
                          <div className="flex items-center gap-2.5">
                            <input 
                              type="range" min="0" max={c.limit} 
                              value={c.balance} 
                              onChange={(e) => updateCardBalance(c.id, Number(e.target.value))}
                              className="flex-1 h-1 bg-slate-200 accent-[#C9A227] rounded-full appearance-none cursor-pointer"
                            />
                            <span className="font-mono text-[10px] font-bold text-slate-700">${c.balance}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
