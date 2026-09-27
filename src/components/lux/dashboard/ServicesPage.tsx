import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Pencil, Trash2, X, Gem, Clock3, Power } from 'lucide-react';
import { services as seed, LuxService } from '../../../data/luxData';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const catStyle: Record<string, string> = {
  Signature: 'text-[#c9a961] bg-[#c9a961]/10 border-[#c9a961]/30',
  Aesthetic: 'text-purple-300 bg-purple-400/10 border-purple-400/20',
  Restorative: 'text-sky-300 bg-sky-400/10 border-sky-400/20',
  Preventive: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/20',
};

export default function ServicesPage() {
  const [items, setItems] = useLocalStorage<LuxService[]>('lux-services', seed);
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<LuxService | null>(null);
  const [form, setForm] = useState({ name: '', description: '', category: 'Signature' as LuxService['category'], duration: 60, price: 380, active: true });

  const filtered = items.filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.category.toLowerCase().includes(q.toLowerCase()));

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', description: '', category: 'Signature', duration: 60, price: 380, active: true });
    setModal(true);
  };
  const openEdit = (s: LuxService) => {
    setEditing(s);
    setForm({ name: s.name, description: s.description, category: s.category, duration: s.duration, price: s.price, active: s.active });
    setModal(true);
  };
  const save = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setItems(prev => prev.map(s => s.id === editing.id ? { ...s, ...form } : s));
    } else {
      setItems(prev => [{ id: `s${Date.now()}`, ...form }, ...prev]);
    }
    setModal(false);
  };
  const remove = (id: string) => {
    if (confirm('Remove this treatment?')) setItems(prev => prev.filter(s => s.id !== id));
  };
  const toggle = (id: string) => setItems(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl">Treatments</h2>
          <p className="text-sm text-[#6a6a6a] font-light">The menu of services your practice offers</p>
        </div>
        <button onClick={openCreate} className="btn-gold rounded-full px-6 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" /> New Treatment
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a5a]" />
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search treatments…" className="input-lux w-full rounded-full pl-11 pr-4 py-3 text-sm font-light" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            className={`card-lux rounded-2xl p-6 ${!s.active ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="w-11 h-11 rounded-full border border-[#c9a961]/25 flex items-center justify-center">
                <Gem className="w-5 h-5 text-[#c9a961]" strokeWidth={1.5} />
              </div>
              <span className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${catStyle[s.category]}`}>{s.category}</span>
            </div>
            <h3 className="font-serif text-xl mb-2">{s.name}</h3>
            <p className="text-xs text-[#8a8a8a] font-light leading-relaxed mb-6 line-clamp-2">{s.description}</p>

            <div className="flex items-center justify-between mb-5">
              <span className="flex items-center gap-1.5 text-xs text-[#6a6a6a]">
                <Clock3 className="w-3.5 h-3.5" /> {s.duration} min
              </span>
              <span className="font-serif text-2xl text-gold-gradient">£{s.price.toLocaleString()}</span>
            </div>

            <div className="hairline mb-4 opacity-40" />
            <div className="flex gap-2">
              <button onClick={() => toggle(s.id)} className={`flex-1 rounded-full py-2.5 text-[10px] tracking-[0.2em] uppercase border transition-all flex items-center justify-center gap-2 ${
                s.active ? 'border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10' : 'border-[#3a3a3a] text-[#6a6a6a] hover:border-[#6a6a6a]'
              }`}>
                <Power className="w-3.5 h-3.5" /> {s.active ? 'Offered' : 'Paused'}
              </button>
              <button onClick={() => openEdit(s)} className="w-10 h-10 rounded-full border border-[#2a2a2a] hover:border-[#c9a961]/60 hover:text-[#c9a961] transition-all flex items-center justify-center text-[#8a8a8a]">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => remove(s.id)} className="w-10 h-10 rounded-full border border-[#2a2a2a] hover:border-red-400/60 hover:text-red-400 transition-all flex items-center justify-center text-[#8a8a8a]">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="card-lux rounded-2xl p-16 text-center">
          <Gem className="w-10 h-10 text-[#3a3a3a] mx-auto mb-4" strokeWidth={1.5} />
          <p className="text-[#6a6a6a]">No treatments found</p>
        </div>
      )}

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
                <h3 className="font-serif text-2xl">{editing ? 'Refine Treatment' : 'New Treatment'}</h3>
                <button onClick={() => setModal(false)} className="text-[#6a6a6a] hover:text-[#c9a961] transition-colors"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Name</label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" placeholder="Signature Hygiene Ritual" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="input-lux w-full rounded-xl px-4 py-3 text-sm resize-none" placeholder="What the patient experiences…" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Duration</label>
                    <select value={form.duration} onChange={e => setForm({ ...form, duration: +e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm bg-[#0d0d0d]">
                      {[30, 45, 60, 90, 120].map(d => <option key={d} value={d}>{d}m</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Price £</label>
                    <input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} className="input-lux w-full rounded-xl px-4 py-3 text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-[#8a8a8a] mb-2">Category</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as LuxService['category'] })} className="input-lux w-full rounded-xl px-4 py-3 text-sm bg-[#0d0d0d]">
                      <option>Signature</option><option>Aesthetic</option><option>Restorative</option><option>Preventive</option>
                    </select>
                  </div>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} className="w-4 h-4 accent-[#c9a961]" />
                  <span className="text-sm text-[#a8a8a8] font-light">Offered to patients on WhatsApp</span>
                </label>
                <div className="flex gap-3 pt-3">
                  <button onClick={() => setModal(false)} className="flex-1 rounded-full py-3.5 text-[11px] tracking-[0.2em] uppercase border border-[#3a3a3a] hover:border-[#6a6a6a] transition-all text-[#8a8a8a]">Cancel</button>
                  <button onClick={save} className="btn-gold flex-1 rounded-full py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase">{editing ? 'Save Changes' : 'Create Treatment'}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
