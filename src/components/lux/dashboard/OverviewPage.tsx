import { motion } from 'framer-motion';
import { 
  TrendingUp, CalendarDays, MessagesSquare, Clock, 
  ArrowUpRight, Star, Crown
} from 'lucide-react';
import { dashboardStats, appointments, conversations, clinics } from '../../../data/luxData';

const statCards = [
  { 
    label: 'Revenue This Month', 
    value: `£${dashboardStats.revenue.toLocaleString()}`, 
    trend: `+${dashboardStats.revenueTrend}%`,
    icon: TrendingUp 
  },
  { 
    label: 'Appointments This Week', 
    value: dashboardStats.appointmentsThisWeek.toString(), 
    trend: '91% occupancy',
    icon: CalendarDays 
  },
  { 
    label: 'Conversations Resolved', 
    value: `${dashboardStats.conversationsResolved}%`, 
    trend: 'without staff',
    icon: MessagesSquare 
  },
  { 
    label: 'Mean Response', 
    value: `${dashboardStats.responseTime}s`, 
    trend: 'around the clock',
    icon: Clock 
  },
];

const statusStyle: Record<string, string> = {
  confirmed: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  pending: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  completed: 'text-[#8a8a8a] bg-white/5 border-white/10',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/20',
};

const convStateStyle: Record<string, string> = {
  live: 'text-emerald-400 bg-emerald-400/10',
  resolved: 'text-[#8a8a8a] bg-white/5',
  attention: 'text-amber-400 bg-amber-400/10',
};

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative rounded-2xl overflow-hidden gold-glow">
        <div className="absolute inset-0 bg-gradient-to-r from-[#c9a961]/15 via-[#c9a961]/5 to-transparent" />
        <div className="absolute inset-0 border border-[#c9a961]/20 rounded-2xl" />
        <div className="relative p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9a961] mb-2">Good Evening</p>
            <h2 className="font-serif text-3xl mb-1">The practice is in fine order</h2>
            <p className="text-sm text-[#8a8a8a] font-light">
              34 appointments this week · 96% of enquiries resolved without staff assistance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="card-lux rounded-xl px-5 py-3 text-center">
              <p className="font-serif text-2xl text-gold-gradient">0</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a]">Escalations</p>
            </div>
            <div className="card-lux rounded-xl px-5 py-3 text-center">
              <p className="font-serif text-2xl text-gold-gradient">12</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a]">Booked Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="card-lux rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-full border border-[#c9a961]/25 flex items-center justify-center">
                <s.icon className="w-4.5 h-4.5 w-[18px] h-[18px] text-[#c9a961]" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] tracking-[0.15em] uppercase text-emerald-400 flex items-center gap-1">
                {s.trend} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <p className="font-serif text-3xl text-[#f5f1e8] mb-1">{s.value}</p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#6a6a6a]">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Upcoming appointments */}
        <div className="lg:col-span-3 card-lux rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="font-serif text-lg">Upcoming Appointments</h3>
            <button className="text-[11px] tracking-[0.2em] uppercase text-[#c9a961] hover:text-[#e5d5a8] transition-colors flex items-center gap-1.5">
              View diary <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {appointments.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <img src={a.patientAvatar} alt="" className="w-11 h-11 rounded-full object-cover border border-[#c9a961]/20" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#f5f1e8] truncate">{a.patientName}</p>
                  <p className="text-xs text-[#6a6a6a] truncate">{a.treatment}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-[#c5c0b5]">{a.date}</p>
                  <p className="text-xs text-[#6a6a6a]">{a.time} · {a.duration}m</p>
                </div>
                <span className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1 rounded-full border ${statusStyle[a.status]}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live conversations */}
        <div className="lg:col-span-2 card-lux rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between p-6 pb-4">
            <h3 className="font-serif text-lg">Conversations</h3>
            <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> AI Live
            </span>
          </div>
          <div className="divide-y divide-white/5">
            {conversations.map(c => (
              <div key={c.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-start gap-3">
                  <img src={c.patientAvatar} alt="" className="w-9 h-9 rounded-full object-cover border border-[#c9a961]/20" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-sm text-[#f5f1e8] truncate">{c.patientName}</p>
                      <span className="text-[10px] text-[#5a5a5a] flex-shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-[#6a6a6a] truncate mb-1.5">{c.lastMessage}</p>
                    <span className={`text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full ${convStateStyle[c.state]}`}>
                      {c.state}
                    </span>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#c9a961] text-[#0a0a0a] text-[10px] font-semibold flex items-center justify-center flex-shrink-0">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Practices strip */}
      <div className="card-lux rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg">Your Practices</h3>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#6a6a6a]">{clinics.filter(c => c.status === 'active').length} active</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {clinics.filter(c => c.status === 'active').map(c => (
            <div key={c.id} className="group relative rounded-xl overflow-hidden">
              <img src={c.image} alt={c.name} className="w-full h-32 object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
              <div className="light-image-copy absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-serif text-sm text-[#f5f1e8]">{c.name}</p>
                    <p className="text-[10px] text-[#8a8a8a] tracking-wide">{c.location}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#c9a961] text-xs">
                    {c.tier === 'Elite' ? <Crown className="w-3.5 h-3.5" /> : <Star className="w-3.5 h-3.5 fill-current" />}
                    {c.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
