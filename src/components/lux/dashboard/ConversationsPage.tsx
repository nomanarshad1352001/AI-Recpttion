import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Search, SendHorizonal, MessagesSquare, Sparkles, UserCheck } from 'lucide-react';
import { conversations as seed, LuxConversation, LuxMessage } from '../../../data/luxData';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const stateStyle: Record<string, string> = {
  live: 'text-emerald-400 bg-emerald-400/10',
  resolved: 'text-[#8a8a8a] bg-white/5',
  attention: 'text-amber-400 bg-amber-400/10',
};

export default function ConversationsPage() {
  const [items, setItems] = useLocalStorage<LuxConversation[]>('lux-conversations', seed);
  const [active, setActive] = useState<LuxConversation | null>(seed[0] ?? null);
  const [q, setQ] = useState('');
  const [draft, setDraft] = useState('');

  const filtered = items.filter(c => c.patientName.toLowerCase().includes(q.toLowerCase()));

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    const msg: LuxMessage = { id: `m${Date.now()}`, from: 'staff', content: draft.trim(), time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) };
    const next = items.map(c => c.id === active.id ? { ...c, messages: [...c.messages, msg], lastMessage: msg.content, time: 'now' } : c);
    setItems(next);
    setActive(prev => prev ? { ...prev, messages: [...prev.messages, msg] } : null);
    setDraft('');
  };

  const setState = (state: LuxConversation['state']) => {
    if (!active) return;
    const next = items.map(c => c.id === active.id ? { ...c, state } : c);
    setItems(next);
    setActive({ ...active, state });
  };

  return (
    <div className="card-lux rounded-2xl overflow-hidden h-[calc(100vh-11rem)] min-h-[540px] flex">
      {/* List */}
      <div className="w-80 flex-shrink-0 border-r border-white/5 flex-col hidden md:flex">
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a5a]" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search…" className="input-lux w-full rounded-full pl-11 pr-4 py-2.5 text-sm font-light" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={`w-full p-4 flex gap-3 text-left transition-colors border-b border-white/5 ${active?.id === c.id ? 'bg-[#c9a961]/[0.06]' : 'hover:bg-white/[0.02]'}`}
            >
              <img src={c.patientAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#c9a961]/20 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-sm text-[#f5f1e8] truncate">{c.patientName}</p>
                  <span className="text-[10px] text-[#5a5a5a] flex-shrink-0">{c.time}</span>
                </div>
                <p className="text-xs text-[#6a6a6a] truncate">{c.lastMessage}</p>
                <span className={`inline-block mt-1.5 text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full ${stateStyle[c.state]}`}>{c.state}</span>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#c9a961] text-[#0a0a0a] text-[10px] font-semibold flex items-center justify-center flex-shrink-0 self-center">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      {active ? (
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="p-4 border-b border-white/5 flex items-center gap-3 md:gap-4">
            <img src={active.patientAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#c9a961]/20" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#f5f1e8] truncate">{active.patientName}</p>
              <p className="text-[10px] text-[#6a6a6a] tracking-wide">{active.phone}</p>
            </div>
            <div className="flex gap-1.5">
              {(['live', 'resolved', 'attention'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setState(s)}
                  className={`px-3 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase transition-all ${
                    active.state === s ? 'bg-[#c9a961] text-[#0a0a0a] font-semibold' : 'border border-[#2a2a2a] text-[#6a6a6a] hover:border-[#c9a961]/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {active.messages.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className={`flex ${m.from === 'patient' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  m.from === 'patient'
                    ? 'bg-white/[0.05] border border-white/10 rounded-tl-sm'
                    : m.from === 'ai'
                    ? 'bg-[#c9a961]/10 border border-[#c9a961]/25 rounded-tr-sm'
                    : 'bg-white/[0.08] border border-white/15 rounded-tr-sm'
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    {m.from === 'ai' && (
                      <span className="flex items-center gap-1 text-[9px] tracking-[0.2em] uppercase text-[#c9a961]">
                        <Sparkles className="w-3 h-3" /> AXOTIA AI
                      </span>
                    )}
                    {m.from === 'staff' && (
                      <span className="flex items-center gap-1 text-[9px] tracking-[0.2em] uppercase text-[#a8a8a8]">
                        <UserCheck className="w-3 h-3" /> You
                      </span>
                    )}
                    {m.from === 'patient' && (
                      <span className="text-[9px] tracking-[0.2em] uppercase text-[#6a6a6a]">Patient</span>
                    )}
                  </div>
                  <p className="text-sm font-light text-[#e8e4da] leading-relaxed">{m.content}</p>
                  <p className="text-[9px] text-[#5a5a5a] mt-2 text-right">{m.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Composer */}
          <form onSubmit={send} className="p-4 border-t border-white/5 flex gap-3">
            <input
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Reply personally as staff…"
              className="input-lux flex-1 rounded-full px-5 py-3 text-sm font-light"
            />
            <button type="submit" disabled={!draft.trim()} className="btn-gold w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-40">
              <SendHorizonal className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessagesSquare className="w-12 h-12 text-[#3a3a3a] mx-auto mb-4" strokeWidth={1} />
            <p className="text-[#6a6a6a] font-light">Select a conversation</p>
          </div>
        </div>
      )}
    </div>
  );
}
