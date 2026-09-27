import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LuxLanding from './components/lux/LuxLanding';
import LoginPage from './components/lux/LoginPage';
import LuxShell from './components/lux/dashboard/LuxShell';
import OverviewPage from './components/lux/dashboard/OverviewPage';
import PracticesPage from './components/lux/dashboard/PracticesPage';
import PatientsPage from './components/lux/dashboard/PatientsPage';
import AppointmentsPage from './components/lux/dashboard/AppointmentsPage';
import ConversationsPage from './components/lux/dashboard/ConversationsPage';
import ServicesPage from './components/lux/dashboard/ServicesPage';
import {
  AutomationsPage,
  IntegrationsPage,
  KnowledgePage,
  ReportsPage,
  SystemHealthPage,
  TeamPage,
  VoiceAgentPage,
} from './components/lux/dashboard/AdminFeaturePages';

type View = 'landing' | 'login' | 'dashboard';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [page, setPage] = useState('overview');

  const renderPage = () => {
    switch (page) {
      case 'overview': return <OverviewPage />;
      case 'clinics': return <PracticesPage />;
      case 'patients': return <PatientsPage />;
      case 'appointments': return <AppointmentsPage />;
      case 'conversations': return <ConversationsPage />;
      case 'services': return <ServicesPage />;
      case 'voice': return <VoiceAgentPage onNavigate={setPage} />;
      case 'reports': return <ReportsPage />;
      case 'knowledge': return <KnowledgePage />;
      case 'integrations': return <IntegrationsPage />;
      case 'automations': return <AutomationsPage />;
      case 'team': return <TeamPage />;
      case 'health': return <SystemHealthPage />;
      default: return <OverviewPage />;
    }
  };

  return (
    <div className="light-app">
    <AnimatePresence mode="wait">
      {view === 'landing' && (
        <motion.div key="landing" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <LuxLanding onSignIn={() => setView('login')} />
        </motion.div>
      )}

      {view === 'login' && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LoginPage onLogin={() => setView('dashboard')} onBack={() => setView('landing')} />
        </motion.div>
      )}

      {view === 'dashboard' && (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LuxShell page={page} onNavigate={setPage} onLogout={() => setView('landing')}>
            {renderPage()}
          </LuxShell>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
