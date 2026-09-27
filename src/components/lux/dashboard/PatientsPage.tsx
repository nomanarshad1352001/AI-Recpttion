import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, Crown, Phone, Mail, Users } from 'lucide-react';
import { patients as seed, LuxPatient, patientAvatars } from '../../../data/luxData';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const statusStyle: Record<string, string> = {
  vip: 'text-[#c9a961] bg-[#c9a961]/10 border-[#c9a961]/30',
  active: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  inactive: 'text-[#8a8a8a] bg-white/5 border-white/10',
};

export default function PatientsPage() {
  const [items, setItems] = useLocalStorage<LuxPatient[]>('lux-patients', seed);
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<LuxPatient | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '', status: 'active' as LuxPatient['status'] });

  const filtered = items.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.email.toLowerCase().includes(q.toLowerCase()));

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', email: '', phone: '', notes: '', status: 'active' });
    setModal(true);
  };
  const openEdit = (p: LuxPatient) => {
    setEditing(p);
    setForm({ name: p.name, email: p.email, phone: p.phone, notes: p.notes, status: p.status });
    setModal(true);
  };
  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setItems(prev => prev.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      setItems(prev => [{
        id: `p${Date.now()}`,
        ...form,
        avatar: patientAvatars[items.length % patientAvatars.length],
        lastVisit: '—',
        nextAppointment: null,
        lifetimeValue: 0,
      }, ...prev]);
    }
    setModal(false);
  };
  const remove = (id: string) => {
    if (confirm('Remove this patient record?')) setItems(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl">Patients</h2>
          <p className="text-sm text-[#6a6a6a] font-light">Your valued clientele, perfectly remembered</p>
        </div>
        <button onClick={openCreate} className="btn-gold rounded-full px-6 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" /> Add Patient
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a5a]" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search patients…" className="input-lux w-full rounded-full pl-11 pr-4 py-3 text-sm font-light" />
      </div>

      <div className="card-lux rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5 text-left">
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal">Patient</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal hidden md:table-cell">Contact</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal hidden lg:table-cell">Last Visit</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal">Lifetime</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal">Status</th>
                <th className="px-6 py-4 text-[10px] tracking-[0.25em] uppercase text-[#6a6a6a] font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={p.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-[#c9a961]/20" />
                        {p.status === 'vip' && <Crown className="absolute -top-1.5 -right-1.5 w-4 h-4 text-[#c9a961]" />}
                      </div>
                      <div>
                        <p className="text-sm text-[#f5f1e8]">{p.name}</p>
                        {p.nextAppointment && <p className="text-[10px] text-[#c9a961]">Next: {p.nextAppointment}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-xs text-[#a8a8a8] flex items-center gap-1.5"><Mail className="w-3 h-3" /> {p.email}</p>
                    <p className="text-xs text-[#6a6a6a] flex items-center gap-1.5 mt-0.5"><Phone className="w-3 h-3" /> {p.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#a8a8a8] hidden lg:table-cell">{p.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className="font-serif text-[#e5d5a8]">£{p.lifetimeValue.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${statusStyle[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-full border border-[#2a2a2a] hover:border-[#c9a961]/60 hover:text-[#c9a961] transition-all flex items-center justify-center text-[#8a8a8a]">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => remove(p.id)} className="w-8 h-8 rounded-full border border-[#2a2a2a] hover:border-red-400/60 hover:text-red-400 transition-all flex items-center justify-center text-[#8a8a8a]">
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
            <Users className="w-10 h-10 text-[#3a3a3a] mx-auto mb-4" strokeWidth={1.5} />
            <p className="text-[#6a6a6a]">No patients found</p>
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
                <h3 className="font-serif text-2xl">{editing ? 'Edit Patient' : 'New Patient'}</h3>
                <button onClick={() => setModal(false)} className="text-[#6a6a6a] hover:text-[#c9a961] transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Full Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="Alexandra Whitmore" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Email</label>
                    <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="name@email.com" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Phone</label>
                    <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="+41 79 000 0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Standing</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as LuxPatient['status'] })} className="input-lux w-full rounded-xl px-4 py-3 text-sm bg-[#0d0d0d]">
                    <option value="active">Active</option><option value="vip">VIP</option><option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Private Notes</label>
                  <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3} className="input-lux w-full rounded-xl px-4 py-3 text-sm resize-none" placeholder="Preferences, allergies, arrangements…" />
                </div>
                <div className="flex gap-3 pt-3">
                  <button onClick={() => setModal(false)} className="flex-1 rounded-full py-3.5 text-[11px] tracking-[0.2em] uppercase border border-[#3a3a3a] hover:border-[#6a6a6a] transition-all text-[#8a8a8a]">Cancel</button>
                  <button onClick={save} className="btn-gold flex-1 rounded-full py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase">{editing ? 'Save Changes' : 'Add Patient'}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
