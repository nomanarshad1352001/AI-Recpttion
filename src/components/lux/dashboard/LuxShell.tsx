import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, BarChart3, Bell, BookOpen, Bot, Building2, CalendarDays,
  ChevronLeft, ChevronRight, Gem, LayoutDashboard, Link2, LogOut,
  MessagesSquare, Search, Users, Workflow
} from 'lucide-react';
import { DEMO_CREDENTIALS } from '../../../data/luxData';
import VoiceAssistant from './VoiceAssistant';

interface LuxShellProps {
  page: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  children: ReactNode;
}

const primaryNav = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'clinics', label: 'Practices', icon: Building2 },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays },
  { id: 'conversations', label: 'Conversations', icon: MessagesSquare },
  { id: 'services', label: 'Treatments', icon: Gem },
];

const intelligenceNav = [
  { id: 'voice', label: 'Voice agent', icon: Bot },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
  { id: 'integrations', label: 'Integrations', icon: Link2 },
  { id: 'automations', label: 'Automations', icon: Workflow },
  { id: 'team', label: 'Team access', icon: Users },
  { id: 'health', label: 'System health', icon: Activity },
];

const allNav = [...primaryNav, ...intelligenceNav];

export default function LuxShell({ page, onNavigate, onLogout, children }: LuxShellProps) {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 900);

  const NavGroup = ({ label, items }: { label: string; items: typeof primaryNav }) => (
    <div className="mb-5">
      {!collapsed && <p className="mb-2 px-3 text-[9px] uppercase tracking-[0.24em] text-[#9aa29f]">{label}</p>}
      <div className="space-y-1">
        {items.map(item => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 transition ${collapsed ? 'justify-center' : ''} ${active ? 'border-[#c9b47d] bg-[#f2ead5] text-[#76561c]' : 'border-transparent text-[#64736e] hover:bg-[#f2efe8] hover:text-[#17312e]'}`}
            >
              <item.icon className={`h-[18px] w-[18px] shrink-0 ${active ? 'text-[#8b6727]' : 'group-hover:text-[#8b6727]'}`} strokeWidth={1.6} />
              {!collapsed && <span className="whitespace-nowrap text-[13px]">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="light-app flex min-h-screen bg-[#f7f4ed] text-[#17312e]">
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#e3ddd2] bg-[#fffdf8] transition-all duration-300 ${collapsed ? 'w-[76px]' : 'w-64'}`}
      >
        <div className="flex h-20 items-center border-b border-[#e7e1d7] px-[18px]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b58a3a]/45 bg-white"><Bot className="h-[18px] w-[18px] text-[#8b6727]" strokeWidth={1.6} /></div>
          {!collapsed && <div className="ml-3 overflow-hidden"><p className="whitespace-nowrap font-serif text-sm tracking-[0.2em]">AXOTIA</p><p className="whitespace-nowrap text-[8px] uppercase tracking-[0.28em] text-[#8b6727]">Admin suite</p></div>}
          <button onClick={() => setCollapsed(value => !value)} className="ml-auto text-[#8d9894] transition hover:text-[#8b6727]" aria-label="Toggle sidebar">{collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}</button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 pt-5">
          <NavGroup label="Workspace" items={primaryNav} />
          <NavGroup label="Intelligence" items={intelligenceNav} />
        </nav>

        <div className="border-t border-[#e7e1d7] p-3">
          <button onClick={onLogout} title={collapsed ? 'Sign out' : undefined} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[#71807b] transition hover:bg-red-50 hover:text-red-700 ${collapsed ? 'justify-center' : ''}`}><LogOut className="h-[18px] w-[18px]" />{!collapsed && <span className="text-[13px]">Sign out</span>}</button>
        </div>
      </motion.aside>

      <div className={`admin-main flex min-w-0 flex-1 flex-col transition-all duration-300 ${collapsed ? 'ml-[76px]' : 'ml-64'}`}>
        <motion.header initial={{ y: -55, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .65 }} className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#e3ddd2] bg-[#f9f7f2]/90 px-5 backdrop-blur-xl sm:px-8">
          <div>
            <p className="text-[9px] uppercase tracking-[0.24em] text-[#8b6727]">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <h1 className="font-serif text-xl">{allNav.find(item => item.id === page)?.label ?? 'Overview'}</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="relative hidden lg:block"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa29f]" /><input placeholder="Search the admin..." className="input-lux w-64 rounded-full py-2.5 pl-11 pr-4 text-sm" /></div>
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#ddd7cc] bg-white text-[#71807b]"><Bell className="h-4 w-4" /><span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-[#b58a3a]" /></button>
            <div className="flex items-center gap-3 border-l border-[#ddd7cc] pl-3 sm:pl-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17312e] font-serif text-sm text-white">{DEMO_CREDENTIALS.name.split(' ').map(name => name[0]).join('')}</div>
              <div className="hidden xl:block"><p className="text-sm font-medium">{DEMO_CREDENTIALS.name}</p><p className="text-[9px] uppercase tracking-[0.16em] text-[#8b9290]">{DEMO_CREDENTIALS.role}</p></div>
            </div>
          </div>
        </motion.header>

        <main className="flex-1 p-4 sm:p-8">
          <motion.div key={page} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>
        </main>
      </div>

      {page !== 'voice' && <VoiceAssistant onNavigate={onNavigate} />}
    </div>
  );
}