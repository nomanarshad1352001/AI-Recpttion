import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, CalendarDays, CheckCircle2, CircleSlash, Clock3 } from 'lucide-react';
import { appointments as seed, LuxAppointment, patients } from '../../../data/luxData';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const statusStyle: Record<string, string> = {
  confirmed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  pending: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  completed: 'text-[#8a8a8a] bg-white/5 border-white/10',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
};
const channelStyle: Record<string, string> = {
  whatsapp: 'text-emerald-300 bg-emerald-400/10',
  concierge: 'text-[#c9a961] bg-[#c9a961]/10',
  direct: 'text-[#a8a8a8] bg-white/5',
};

export default function AppointmentsPage() {
  const [items, setItems] = useLocalStorage<LuxAppointment[]>('lux-appointments', seed);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<LuxAppointment | null>(null);
  const [form, setForm] = useState({ patientName: '', treatment: '', date: '', time: '09:00', duration: 60, value: 380, status: 'pending' as LuxAppointment['status'] });

  const filtered = items.filter(a =>
    (filter === 'all' || a.status === filter) &&
    (a.patientName.toLowerCase().includes(q.toLowerCase()) || a.treatment.toLowerCase().includes(q.toLowerCase()))
  );

  const openCreate = () => {
    setEditing(null);
    setForm({ patientName: '', treatment: '', date: '', time: '09:00', duration: 60, value: 380, status: 'pending' });
    setModal(true);
  };
  const openEdit = (a: LuxAppointment) => {
    setEditing(a);
    setForm({ patientName: a.patientName, treatment: a.treatment, date: a.date, time: a.time, duration: a.duration, value: a.value, status: a.status });
    setModal(true);
  };
  const save = () => {
    if (!form.patientName.trim() || !form.date) return;
    const avatar = patients.find(p => p.name === form.patientName)?.avatar ?? patients[0].avatar;
    if (editing) {
      setItems(prev => prev.map(a => a.id === editing.id ? { ...a, ...form, patientAvatar: avatar } : a));
    } else {
      setItems(prev => [{ id: `a${Date.now()}`, ...form, patientAvatar: avatar, channel: 'concierge' }, ...prev]);
    }
    setModal(false);
  };
  const remove = (id: string) => {
    if (confirm('Cancel this appointment?')) setItems(prev => prev.filter(a => a.id !== id));
  };
  const setStatus = (id: string, status: LuxAppointment['status']) =>
    setItems(prev => prev.map(a => a.id === id ? { ...a, status } : a));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl">Appointments</h2>
          <p className="text-sm text-[#6a6a6a] font-light">The diary, composed and calm</p>
        </div>
        <button onClick={openCreate} className="btn-gold rounded-full px-6 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" /> Reserve Appointment
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a5a]" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search appointments…" className="input-lux w-full rounded-full pl-11 pr-4 py-3 text-sm font-light" />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase whitespace-nowrap transition-all ${
                filter === f ? 'bg-[#c9a961] text-[#0a0a0a] font-semibold' : 'border border-[#2a2a2a] text-[#8a8a8a] hover:border-[#c9a961]/50 hover:text-[#c9a961]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card-lux rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left">
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal">Patient</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal hidden lg:table-cell">Treatment</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal">When</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal hidden md:table-cell">Channel</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal hidden xl:table-cell">Value</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal">Status</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((a, i) => (
                <motion.tr key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={a.patientAvatar} alt="" className="w-9 h-9 rounded-full object-cover border border-[#c9a961]/20" />
                      <span className="text-sm text-[#f5f1e8] whitespace-nowrap">{a.patientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#a8a8a8] hidden lg:table-cell">{a.treatment}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#f5f1e8] whitespace-nowrap">{a.date}</p>
                    <p className="text-xs text-[#6a6a6a]">{a.time} · {a.duration}m</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full ${channelStyle[a.channel]}`}>{a.channel}</span>
                  </td>
                  <td className="px-6 py-4 hidden xl:table-cell"><span className="font-serif text-[#e5d5a8]">£{a.value}</span></td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${statusStyle[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1.5">
                      {a.status === 'pending' && (
                        <button onClick={() => setStatus(a.id, 'confirmed')} title="Confirm" className="w-8 h-8 rounded-full border border-[#2a2a2a] hover:border-emerald-400/60 hover:text-emerald-400 transition-all flex items-center justify-center text-[#8a8a8a]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {(a.status === 'confirmed' || a.status === 'pending') && (
                        <button onClick={() => setStatus(a.id, 'cancelled')} title="Cancel" className="w-8 h-8 rounded-full border border-[#2a2a2a] hover:border-red-400/60 hover:text-red-400 transition-all flex items-center justify-center text-[#8a8a8a]">
                          <CircleSlash className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button onClick={() => openEdit(a)} className="w-8 h-8 rounded-full border border-[#2a2a2a] hover:border-[#c9a961]/60 hover:text-[#c9a961] transition-all flex items-center justify-center text-[#8a8a8a]">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => remove(a.id)} className="w-8 h-8 rounded-full border border-[#2a2a2a] hover:border-red-400/60 hover:text-red-400 transition-all flex items-center justify-center text-[#8a8a8a]">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-16 text-center">
            <CalendarDays className="w-10 h-10 text-[#3a3a3a] mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-[#6a6a6a]">No appointments match your filters</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setModal(false)}>
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="card-lux w-full max-w-lg rounded-2xl p-8 gold-glow"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif text-2xl">{editing ? 'Amend Appointment' : 'Reserve Appointment'}</h3>
                <button onClick={() => setModal(false)} className="text-[#6a6a6a] hover:text-[#c9a961] transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Patient</label>
                  <input value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="Alexandra Whitmore" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Treatment</label>
                  <input value={form.treatment} onChange={e => setForm({ ...form, treatment: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="Signature Hygiene Ritual" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Date</label>
                    <input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="28 Mar 2025" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Time</label>
                    <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Duration</label>
                    <select value={form.duration} onChange={e => setForm({ ...form, duration: +e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm bg-[#0d0d0d]">
                      {[30, 45, 60, 90, 120].map(d => <option key={d} value={d}>{d}m</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Value £</label>
                    <input type="number" value={form.value} onChange={e => setForm({ ...form, value: +e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as LuxAppointment['status'] })} className="input-lux w-full rounded-xl px-4 py-3 text-sm bg-[#0d0d0d]">
                      <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-3">
                  <button onClick={() => setModal(false)} className="flex-1 rounded-full py-3.5 text-[11px] tracking-[0.2em] uppercase border border-[#3a3a3a] hover:border-[#6a6a6a] transition-all text-[#8a8a8a]">Cancel</button>
                  <button onClick={save} className="btn-gold flex-1 rounded-full py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                    <Clock3 className="w-4 h-4" /> {editing ? 'Save Changes' : 'Reserve'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
