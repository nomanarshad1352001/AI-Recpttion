import { FormEvent, ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, AlertTriangle, BarChart3, BookOpen, CalendarCheck, Check,
  CheckCircle2, Cloud, Download, FileText, Globe2, Link2, Mail, MessageCircle,
  Plus, RefreshCw, Search, ShieldCheck, Trash2, UserPlus, Webhook, Workflow
} from 'lucide-react';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import VoiceAssistant from './VoiceAssistant';

const SectionHeader = ({ eyebrow, title, copy, action }: { eyebrow: string; title: string; copy: string; action?: ReactNode }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="mb-2 text-[10px] uppercase tracking-[0.28em] text-[#8b6727]">{eyebrow}</p>
      <h2 className="font-serif text-3xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm font-light text-[#71807b]">{copy}</p>
    </div>
    {action}
  </div>
);

export function VoiceAgentPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Feature 1" title="Voice concierge" copy="Speak naturally to the admin copilot. It can read metrics, find patients, and navigate the application." />
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <VoiceAssistant embedded onNavigate={onNavigate} />
        <div className="space-y-4">
          <div className="card-lux rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b6727]">Try saying</p>
            <div className="mt-4 space-y-2">
              {['Open reports', 'How many appointments?', 'Find Alexandra', 'Check system health', 'Open the knowledge base'].map(command => (
                <button key={command} className="w-full rounded-xl border border-[#e4ded2] bg-white px-3 py-2.5 text-left text-sm text-[#52635e] transition hover:border-[#b58a3a]" onClick={() => navigator.clipboard?.writeText(command)}>{command}</button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-[#17312e] p-5 text-white">
            <ShieldCheck className="h-5 w-5 text-[#d8bd76]" />
            <p className="mt-4 font-serif text-xl">Browser-native demo</p>
            <p className="mt-2 text-sm font-light leading-relaxed text-[#cfdbd6]">Voice recognition and spoken replies use browser APIs. Typed chat remains available when microphone support is unavailable.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const reportBars = [42, 55, 48, 68, 72, 61, 83, 78, 91, 86, 96, 88];

export function ReportsPage() {
  const [range, setRange] = useState('30 days');
  const exportCsv = () => {
    const rows = ['metric,value', 'Revenue,148200', 'Appointments,142', 'Conversion rate,38.6', 'No-show rate,4.2'];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'axotia-report.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Feature 2" title="Reports" copy="A simple view of bookings, response quality, and revenue. No vanity metrics." action={<button onClick={exportCsv} className="btn-gold flex w-fit items-center gap-2 rounded-full px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]"><Download className="h-4 w-4" /> Export CSV</button>} />
      <div className="flex gap-2">{['7 days', '30 days', '90 days'].map(item => <button key={item} onClick={() => setRange(item)} className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.16em] ${range === item ? 'bg-[#17312e] text-white' : 'border border-[#ddd7cc] bg-white text-[#71807b]'}`}>{item}</button>)}</div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[['Revenue', 'GBP 148,200', '+12.4%'], ['Appointments', '142', '+18'], ['Lead conversion', '38.6%', '+4.1%'], ['No-show rate', '4.2%', '-2.8%']].map(([label, value, change]) => (
          <div key={label} className="card-lux rounded-2xl p-6"><p className="text-[10px] uppercase tracking-[0.2em] text-[#7c8783]">{label}</p><p className="mt-4 font-serif text-3xl">{value}</p><p className="mt-2 text-xs text-emerald-700">{change} vs previous period</p></div>
        ))}
      </div>
      <div className="card-lux rounded-3xl p-7">
        <div className="flex items-center justify-between"><div><h3 className="font-serif text-xl">Booked value</h3><p className="text-xs text-[#7c8783]">Monthly trend, {range}</p></div><BarChart3 className="h-5 w-5 text-[#9a722b]" /></div>
        <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4">{reportBars.map((bar, index) => <motion.div key={index} initial={{ height: 0 }} animate={{ height: `${bar}%` }} transition={{ delay: index * .04, duration: .55 }} className="group relative flex-1 rounded-t-lg bg-gradient-to-t from-[#17312e] to-[#7f9b91]"><span className="absolute -top-7 left-1/2 hidden -translate-x-1/2 text-[10px] text-[#52635e] group-hover:block">{bar}k</span></motion.div>)}</div>
        <div className="mt-3 grid grid-cols-12 text-center text-[9px] uppercase text-[#9aa29f]">{['A','M','J','J','A','S','O','N','D','J','F','M'].map((month, index) => <span key={`${month}-${index}`}>{month}</span>)}</div>
      </div>
    </div>
  );
}

type Article = { id: string; title: string; category: string; answer: string; published: boolean };
const initialArticles: Article[] = [
  { id: 'k1', title: 'Weekend opening hours', category: 'Opening hours', answer: 'Saturday appointments are available from 09:00 to 14:00 by reservation.', published: true },
  { id: 'k2', title: 'Veneer consultation price', category: 'Pricing', answer: 'The consultation is GBP 150 and is credited toward accepted treatment.', published: true },
  { id: 'k3', title: 'Emergency handover', category: 'Safety', answer: 'Urgent swelling, trauma, or uncontrolled bleeding must be escalated to staff immediately.', published: true },
];

export function KnowledgePage() {
  const [articles, setArticles] = useLocalStorage<Article[]>('lux-knowledge', initialArticles);
  const [query, setQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'General', answer: '' });
  const add = (event: FormEvent) => {
    event.preventDefault();
    if (!form.title || !form.answer) return;
    setArticles(current => [{ id: `k${Date.now()}`, ...form, published: true }, ...current]);
    setForm({ title: '', category: 'General', answer: '' });
    setFormOpen(false);
  };
  const visible = articles.filter(article => article.title.toLowerCase().includes(query.toLowerCase()) || article.category.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="space-y-6">
      <SectionHeader eyebrow="Feature 3" title="Knowledge base" copy="Control exactly what the AI may tell patients. Every answer is visible and editable." action={<button onClick={() => setFormOpen(value => !value)} className="btn-gold flex w-fit items-center gap-2 rounded-full px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em]"><Plus className="h-4 w-4" /> New answer</button>} />
      {formOpen && <form onSubmit={add} className="card-lux grid gap-4 rounded-2xl p-6 md:grid-cols-2"><input className="input-lux rounded-xl px-4 py-3 text-sm" placeholder="Patient question or topic" value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} /><select className="input-lux rounded-xl px-4 py-3 text-sm" value={form.category} onChange={event => setForm({ ...form, category: event.target.value })}><option>General</option><option>Pricing</option><option>Opening hours</option><option>Safety</option></select><textarea className="input-lux rounded-xl px-4 py-3 text-sm md:col-span-2" rows={3} placeholder="Approved answer" value={form.answer} onChange={event => setForm({ ...form, answer: event.target.value })} /><button className="btn-gold w-fit rounded-full px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em]">Publish answer</button></form>}
      <div className="relative max-w-md"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa29f]" /><input className="input-lux w-full rounded-full py-3 pl-11 pr-4 text-sm" placeholder="Search approved answers" value={query} onChange={event => setQuery(event.target.value)} /></div>
      <div className="space-y-3">{visible.map(article => <article key={article.id} className="card-lux flex gap-4 rounded-2xl p-5"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf2ef]"><BookOpen className="h-4 w-4 text-[#17312e]" /></div><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-serif text-lg">{article.title}</h3><span className="rounded-full bg-[#f1ead8] px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[#8b6727]">{article.category}</span></div><p className="mt-2 text-sm leading-relaxed text-[#64736e]">{article.answer}</p></div><div className="flex flex-col gap-2"><button onClick={() => setArticles(current => current.map(item => item.id === article.id ? { ...item, published: !item.published } : item))} className={`rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] ${article.published ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{article.published ? 'Live' : 'Draft'}</button><button onClick={() => setArticles(current => current.filter(item => item.id !== article.id))} className="self-end text-[#a5aca9] hover:text-red-600"><Trash2 className="h-4 w-4" /></button></div></article>)}</div>
    </div>
  );
}

type Integration = { id: string; name: string; description: string; connected: boolean; icon: string };
const initialIntegrations: Integration[] = [
  { id: 'whatsapp', name: 'WhatsApp Business', description: 'Receives and replies to patient messages.', connected: true, icon: 'message' },
  { id: 'calendar', name: 'Google Calendar', description: 'Reads availability and writes confirmed bookings.', connected: true, icon: 'calendar' },
  { id: 'paddle', name: 'Paddle', description: 'Synchronises subscription access and billing state.', connected: false, icon: 'link' },
  { id: 'telegram', name: 'Telegram alerts', description: 'Sends critical system and handover notifications.', connected: true, icon: 'webhook' },
];

export function IntegrationsPage() {
  const [items, setItems] = useLocalStorage<Integration[]>('lux-integrations', initialIntegrations);
  const [busy, setBusy] = useState<string | null>(null);
  const toggle = (id: string) => {
    setBusy(id);
    setTimeout(() => { setItems(current => current.map(item => item.id === id ? { ...item, connected: !item.connected } : item)); setBusy(null); }, 650);
  };
  const icons = { message: MessageCircle, calendar: CalendarCheck, link: Link2, webhook: Webhook };
  return <div className="space-y-6"><SectionHeader eyebrow="Feature 4" title="Integrations" copy="The few connections AXOTIA needs, with their status visible at a glance." /><div className="grid gap-5 md:grid-cols-2">{items.map(item => { const Icon = icons[item.icon as keyof typeof icons]; return <div key={item.id} className="card-lux rounded-2xl p-6"><div className="flex items-start gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2ef]"><Icon className="h-5 w-5 text-[#17312e]" /></div><div className="flex-1"><h3 className="font-serif text-xl">{item.name}</h3><p className="mt-1 text-sm font-light text-[#71807b]">{item.description}</p></div><span className={`h-2.5 w-2.5 rounded-full ${item.connected ? 'bg-emerald-600' : 'bg-slate-300'}`} /></div><div className="mt-6 flex items-center justify-between border-t border-[#e7e1d7] pt-4"><span className="text-[10px] uppercase tracking-[0.18em] text-[#7c8783]">{item.connected ? 'Connected' : 'Not connected'}</span><button onClick={() => toggle(item.id)} disabled={busy === item.id} className={`rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.16em] ${item.connected ? 'border border-[#d9d2c6] text-[#64736e]' : 'bg-[#17312e] text-white'}`}>{busy === item.id ? 'Working...' : item.connected ? 'Disconnect' : 'Connect'}</button></div></div>; })}</div></div>;
}

type Automation = { id: string; name: string; description: string; active: boolean; runs: number };
const initialAutomations: Automation[] = [
  { id: 'auto1', name: '24-hour appointment reminder', description: 'WhatsApp reminder with confirm and reschedule actions.', active: true, runs: 284 },
  { id: 'auto2', name: 'Missed-call recovery', description: 'Sends a helpful WhatsApp message within two minutes.', active: true, runs: 61 },
  { id: 'auto3', name: 'Human handover alert', description: 'Notifies the clinic when confidence is low or risk is detected.', active: true, runs: 18 },
  { id: 'auto4', name: 'Lapsed patient follow-up', description: 'Invites patients overdue by six months to book.', active: false, runs: 0 },
];

export function AutomationsPage() {
  const [items, setItems] = useLocalStorage<Automation[]>('lux-automations', initialAutomations);
  return <div className="space-y-6"><SectionHeader eyebrow="Feature 5" title="Automations" copy="A short list of dependable rules. Each can be paused instantly and its activity is visible." /><div className="space-y-3">{items.map(item => <div key={item.id} className="card-lux flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}><Workflow className="h-5 w-5" /></div><div className="flex-1"><h3 className="font-serif text-lg">{item.name}</h3><p className="text-sm font-light text-[#71807b]">{item.description}</p></div><div className="text-right"><p className="text-xs text-[#7c8783]">{item.runs} runs</p><button onClick={() => setItems(current => current.map(rule => rule.id === item.id ? { ...rule, active: !rule.active } : rule))} className={`mt-2 h-7 w-12 rounded-full p-1 transition ${item.active ? 'bg-[#17312e]' : 'bg-[#d8dcd9]'}`}><span className={`block h-5 w-5 rounded-full bg-white shadow transition ${item.active ? 'translate-x-5' : ''}`} /></button></div></div>)}</div></div>;
}

type TeamMember = { id: string; name: string; email: string; role: 'Owner' | 'Manager' | 'Reception'; active: boolean };
const initialTeam: TeamMember[] = [
  { id: 't1', name: 'Dr. Victor Ashford', email: 'director@axotia.com', role: 'Owner', active: true },
  { id: 't2', name: 'Amelia Grant', email: 'amelia@mayfairsmile.com', role: 'Manager', active: true },
  { id: 't3', name: 'James Bell', email: 'james@mayfairsmile.com', role: 'Reception', active: true },
];

export function TeamPage() {
  const [team, setTeam] = useLocalStorage<TeamMember[]>('lux-team', initialTeam);
  const [email, setEmail] = useState('');
  const invite = (event: FormEvent) => {
    event.preventDefault();
    if (!email.includes('@')) return;
    setTeam(current => [...current, { id: `t${Date.now()}`, name: email.split('@')[0].replace('.', ' '), email, role: 'Reception', active: false }]);
    setEmail('');
  };
  return <div className="space-y-6"><SectionHeader eyebrow="Feature 6" title="Team access" copy="Invite only the people who need access and keep roles easy to understand." /><form onSubmit={invite} className="card-lux flex flex-col gap-3 rounded-2xl p-5 sm:flex-row"><div className="relative flex-1"><Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa29f]" /><input value={email} onChange={event => setEmail(event.target.value)} placeholder="colleague@clinic.com" className="input-lux w-full rounded-full py-3 pl-11 pr-4 text-sm" /></div><button className="btn-gold flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.16em]"><UserPlus className="h-4 w-4" /> Send invite</button></form><div className="card-lux overflow-hidden rounded-2xl"><div className="divide-y divide-[#e7e1d7]">{team.map(member => <div key={member.id} className="flex items-center gap-4 p-5"><div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17312e] font-serif text-sm text-white">{member.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}</div><div className="flex-1"><p className="text-sm font-medium capitalize">{member.name}</p><p className="text-xs text-[#7c8783]">{member.email}</p></div><select value={member.role} onChange={event => setTeam(current => current.map(item => item.id === member.id ? { ...item, role: event.target.value as TeamMember['role'] } : item))} className="input-lux rounded-full px-3 py-2 text-xs"><option>Owner</option><option>Manager</option><option>Reception</option></select>{member.role !== 'Owner' && <button onClick={() => setTeam(current => current.filter(item => item.id !== member.id))} className="text-[#a5aca9] hover:text-red-600"><Trash2 className="h-4 w-4" /></button>}</div>)}</div></div></div>;
}

const services = [
  { name: 'WhatsApp webhook', detail: 'Last event 18 seconds ago', icon: Webhook },
  { name: 'Claude response service', detail: '2.8s mean response', icon: Cloud },
  { name: 'Booking worker', detail: 'Queue depth 0', icon: CalendarCheck },
  { name: 'Supabase and pgvector', detail: '18ms query latency', icon: FileText },
  { name: 'Notification channel', detail: 'Telegram verified', icon: AlertTriangle },
  { name: 'Public application', detail: 'SSL valid for 71 days', icon: Globe2 },
];

export function SystemHealthPage() {
  const [checking, setChecking] = useState(false);
  const [checkedAt, setCheckedAt] = useState('just now');
  const check = () => { setChecking(true); setTimeout(() => { setChecking(false); setCheckedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); }, 900); };
  return <div className="space-y-6"><SectionHeader eyebrow="Feature 7" title="System health" copy="The operational view needed to spot trouble quickly, without a wall of infrastructure noise." action={<button onClick={check} disabled={checking} className="flex w-fit items-center gap-2 rounded-full border border-[#d9d2c6] bg-white px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-[#52635e]"><RefreshCw className={`h-4 w-4 ${checking ? 'animate-spin' : ''}`} /> Run checks</button>} /><div className="rounded-3xl bg-[#17312e] p-7 text-white"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-[10px] uppercase tracking-[0.22em] text-[#d8bd76]">Operational status</p><h3 className="mt-2 font-serif text-3xl">All critical services are healthy</h3><p className="mt-2 text-sm font-light text-[#cbd8d3]">Last checked {checkedAt}</p></div><div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/15"><CheckCircle2 className="h-8 w-8 text-emerald-300" /></div></div></div><div className="grid gap-4 md:grid-cols-2">{services.map((service, index) => <motion.div key={service.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }} className="card-lux flex items-center gap-4 rounded-2xl p-5"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50"><service.icon className="h-5 w-5 text-emerald-700" /></div><div className="flex-1"><h3 className="font-serif text-lg">{service.name}</h3><p className="text-xs text-[#7c8783]">{service.detail}</p></div><span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.16em] text-emerald-700"><Check className="h-3.5 w-3.5" /> Healthy</span></motion.div>)}</div><div className="card-lux rounded-2xl p-5"><div className="flex items-center gap-3"><Activity className="h-5 w-5 text-[#9a722b]" /><div><h3 className="font-serif text-lg">Recent activity</h3><p className="text-xs text-[#7c8783]">No errors requiring intervention in the last 24 hours.</p></div></div><div className="mt-5 space-y-3">{['Webhook duplicate ignored safely', 'Calendar token renewed', 'Nightly knowledge index completed'].map((item, index) => <div key={item} className="flex items-center gap-3 text-sm text-[#64736e]"><span className="h-2 w-2 rounded-full bg-emerald-600" /><span className="flex-1">{item}</span><span className="text-xs text-[#9aa29f]">{index + 1}h ago</span></div>)}</div></div></div>;
}