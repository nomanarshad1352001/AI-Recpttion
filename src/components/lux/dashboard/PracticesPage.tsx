import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, Building2, Crown, Star, MapPin } from 'lucide-react';
import { clinics as seed, LuxClinic, clinicImages } from '../../../data/luxData';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const tierIcon: Record<string, typeof Crown> = { Elite: Crown, Signature: Star, Prestige: Star };
const tierStyle: Record<string, string> = {
  Elite: 'text-[#c9a961] bg-[#c9a961]/10 border-[#c9a961]/30',
  Signature: 'text-[#e5d5a8] bg-white/5 border-white/15',
  Prestige: 'text-[#a8a8a8] bg-white/5 border-white/10',
};
const statusStyle: Record<string, string> = {
  active: 'text-emerald-400 bg-emerald-400/10',
  onboarding: 'text-amber-400 bg-amber-400/10',
  paused: 'text-[#8a8a8a] bg-white/5',
};

export default function PracticesPage() {
  const [items, setItems] = useLocalStorage<LuxClinic[]>('lux-clinics', seed);
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<LuxClinic | null>(null);
  const [form, setForm] = useState({ name: '', location: '', tier: 'Signature' as LuxClinic['tier'], status: 'onboarding' as LuxClinic['status'] });

  const filtered = items.filter(c => c.name.toLowerCase().includes(q.toLowerCase()) || c.location.toLowerCase().includes(q.toLowerCase()));

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', location: '', tier: 'Signature', status: 'onboarding' });
    setModal(true);
  };
  const openEdit = (c: LuxClinic) => {
    setEditing(c);
    setForm({ name: c.name, location: c.location, tier: c.tier, status: c.status });
    setModal(true);
  };
  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setItems(prev => prev.map(c => c.id === editing.id ? { ...c, ...form } : c));
    } else {
      setItems(prev => [{
        id: `c${Date.now()}`,
        ...form,
        image: clinicImages[items.length % clinicImages.length],
        patients: 0,
        appointments: 0,
        rating: 0,
        joined: new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
      }, ...prev]);
    }
    setModal(false);
  };
  const remove = (id: string) => {
    if (confirm('Remove this practice?')) setItems(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl">Practices</h2>
          <p className="text-sm text-[#6a6a6a] font-light">Every distinguished practice under your care</p>
        </div>
        <button onClick={openCreate} className="btn-gold rounded-full px-6 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" /> Add Practice
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a5a]" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search practices…" className="input-lux w-full rounded-full pl-11 pr-4 py-3 text-sm font-light" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c, i) => {
          const TierIcon = tierIcon[c.tier];
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="card-lux rounded-2xl overflow-hidden"
            >
              <div className="relative h-36">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                <span className={`absolute top-4 right-4 text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full ${statusStyle[c.status]}`}>
                  {c.status}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="font-serif text-lg leading-tight">{c.name}</h3>
                  <span className={`flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border flex-shrink-0 ${tierStyle[c.tier]}`}>
                    <TierIcon className="w-3 h-3" /> {c.tier}
                  </span>
                </div>
                <p className="text-xs text-[#6a6a6a] flex items-center gap-1.5 mb-4">
                  <MapPin className="w-3 h-3" /> {c.location} · Joined {c.joined}
                </p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                  <div className="rounded-lg bg-white/[0.03] p-2.5 text-center">
                    <p className="font-serif text-lg text-gold-gradient">{c.patients}</p>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#6a6a6a]">Patients</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] p-2.5 text-center">
                    <p className="font-serif text-lg text-gold-gradient">{c.appointments}</p>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#6a6a6a]">Visits</p>
                  </div>
                  <div className="rounded-lg bg-white/[0.03] p-2.5 text-center">
                    <p className="font-serif text-lg text-gold-gradient">{c.rating || '—'}</p>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#6a6a6a]">Rating</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(c)} className="flex-1 rounded-full py-2.5 text-[10px] tracking-[0.2em] uppercase border border-[#3a3a3a] hover:border-[#c9a961]/60 hover:text-[#c9a961] transition-all flex items-center justify-center gap-2 text-[#a8a8a8]">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(c.id)} className="w-11 rounded-full border border-[#3a3a3a] hover:border-red-400/60 hover:text-red-400 transition-all flex items-center justify-center text-[#a8a8a8]">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="card-lux rounded-2xl p-16 text-center">
          <Building2 className="w-10 h-10 text-[#3a3a3a] mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-[#6a6a6a]">No practices match your search</p>
        </div>
      )}

      {/* Modal */}
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
                <h3 className="font-serif text-2xl">{editing ? 'Refine Practice' : 'New Practice'}</h3>
                <button onClick={() => setModal(false)} className="text-[#6a6a6a] hover:text-[#c9a961] transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Practice Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="Mayfair Smile Atelier" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Location</label>
                  <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="London, Mayfair" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Tier</label>
                    <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value as LuxClinic['tier'] })} className="input-lux w-full rounded-xl px-4 py-3 text-sm bg-[#0d0d0d]">
                      <option>Signature</option><option>Prestige</option><option>Elite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as LuxClinic['status'] })} className="input-lux w-full rounded-xl px-4 py-3 text-sm bg-[#0d0d0d]">
                      <option value="onboarding">Onboarding</option><option value="active">Active</option><option value="paused">Paused</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-3">
                  <button onClick={() => setModal(false)} className="flex-1 rounded-full py-3.5 text-[11px] tracking-[0.2em] uppercase border border-[#3a3a3a] hover:border-[#6a6a6a] transition-all text-[#8a8a8a]">
                    Cancel
                  </button>
                  <button onClick={save} className="btn-gold flex-1 rounded-full py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase">
                    {editing ? 'Save Changes' : 'Add Practice'}
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
