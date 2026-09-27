import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, Mic, MicOff, Send, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { appointments, dashboardStats, patients } from '../../../data/luxData';

type VoiceMessage = { id: number; role: 'assistant' | 'user'; text: string };

interface RecognitionResultLike {
  0: { transcript: string };
}

interface RecognitionEventLike {
  results: { 0: RecognitionResultLike };
}

interface RecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}

type RecognitionConstructor = new () => RecognitionLike;

interface VoiceAssistantProps {
  onNavigate: (page: string) => void;
  embedded?: boolean;
}

const welcome: VoiceMessage = {
  id: 1,
  role: 'assistant',
  text: 'Good day. I can open admin sections, summarise appointments, report revenue, or help find a patient. Try saying “open reports”.',
};

export default function VoiceAssistant({ onNavigate, embedded = false }: VoiceAssistantProps) {
  const [open, setOpen] = useState(embedded);
  const [messages, setMessages] = useState<VoiceMessage[]>([welcome]);
  const [draft, setDraft] = useState('');
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<RecognitionLike | null>(null);
  const messageId = useRef(2);

  useEffect(() => {
    const browserWindow = window as typeof window & {
      SpeechRecognition?: RecognitionConstructor;
      webkitSpeechRecognition?: RecognitionConstructor;
    };
    const Recognition = browserWindow.SpeechRecognition ?? browserWindow.webkitSpeechRecognition;
    if (!Recognition) {
      setSpeechSupported(false);
      return;
    }
    const recognition = new Recognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-GB';
    recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;
      setDraft(transcript);
      handlePrompt(transcript, true);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, []);

  const speak = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = .96;
    utterance.pitch = 1;
    utterance.lang = 'en-GB';
    window.speechSynthesis.speak(utterance);
  };

  const answerFor = (rawPrompt: string) => {
    const prompt = rawPrompt.toLowerCase();
    if (prompt.includes('open') || prompt.includes('show') || prompt.includes('go to')) {
      const routes: Array<[string[], string, string]> = [
        [['report', 'analytics'], 'reports', 'Opening reports. Revenue this month is £148,200, up 12.4 percent.'],
        [['appointment', 'diary', 'calendar'], 'appointments', `Opening appointments. There are ${dashboardStats.appointmentsThisWeek} bookings this week.`],
        [['patient'], 'patients', `Opening patients. There are ${patients.length} demo patient records.`],
        [['practice', 'clinic'], 'clinics', 'Opening practices. Three practices are active and one is onboarding.'],
        [['conversation', 'message'], 'conversations', 'Opening conversations. Two threads currently need attention.'],
        [['treatment', 'service'], 'services', 'Opening treatments. Five services are currently available to patients.'],
        [['knowledge'], 'knowledge', 'Opening the knowledge base, where clinic answers can be reviewed and edited.'],
        [['integration'], 'integrations', 'Opening integrations. WhatsApp and Google Calendar are connected.'],
        [['automation'], 'automations', 'Opening automations. Appointment reminders and escalation alerts are active.'],
        [['team', 'staff'], 'team', 'Opening team access and permissions.'],
        [['health', 'system'], 'health', 'Opening system health. All critical services are operational.'],
        [['voice'], 'voice', 'Opening the full voice concierge workspace.'],
      ];
      const match = routes.find(([keywords]) => keywords.some(keyword => prompt.includes(keyword)));
      if (match) {
        onNavigate(match[1]);
        return match[2];
      }
    }
    if (prompt.includes('revenue') || prompt.includes('income')) return `Revenue this month is £${dashboardStats.revenue.toLocaleString()}, up ${dashboardStats.revenueTrend} percent.`;
    if (prompt.includes('how many appointment') || prompt.includes('booking')) return `There are ${dashboardStats.appointmentsThisWeek} appointments this week. The next booking is ${appointments[0].patientName} at ${appointments[0].time}.`;
    const patient = patients.find(item => prompt.includes(item.name.split(' ')[0].toLowerCase()) || prompt.includes(item.name.split(' ')[1].toLowerCase()));
    if (patient) return `${patient.name} is a ${patient.status} patient. Their next appointment is ${patient.nextAppointment ?? 'not currently scheduled'}.`;
    if (prompt.includes('help') || prompt.includes('what can you')) return 'I can navigate the admin, read headline metrics, find patients, summarise bookings, and check system health. You can speak or type.';
    if (prompt.includes('hello') || prompt.includes('good morning') || prompt.includes('good afternoon')) return 'Good day, Doctor. The practice is operating normally. How may I assist?';
    return 'I can help with that in this demo by opening appointments, reports, patients, practices, knowledge, integrations, automations, team access, or system health.';
  };

  const handlePrompt = (value: string, fromVoice = false) => {
    const prompt = value.trim();
    if (!prompt) return;
    const userMessage: VoiceMessage = { id: messageId.current++, role: 'user', text: prompt };
    const response = answerFor(prompt);
    setMessages(current => [...current, userMessage]);
    setDraft('');
    setTimeout(() => {
      setMessages(current => [...current, { id: messageId.current++, role: 'assistant', text: response }]);
      if (fromVoice) speak(response);
    }, 320);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    handlePrompt(draft);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechSupported(false);
      setOpen(true);
      return;
    }
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const panel = (
    <div className={`${embedded ? 'h-[calc(100vh-12rem)] min-h-[560px] w-full' : 'h-[570px] w-[min(390px,calc(100vw-2rem))]'} flex flex-col overflow-hidden rounded-3xl border border-[#dcd5c8] bg-[#fffdf8] shadow-[0_24px_80px_rgba(37,54,49,.18)]`}>
      <div className="flex items-center gap-3 border-b border-[#e7e1d7] bg-[#f4f0e7] p-4">
        <div className={`flex h-11 w-11 items-center justify-center rounded-full ${listening ? 'bg-[#b58a3a] text-white' : 'bg-[#17312e] text-white'}`}>
          {listening ? <Mic className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
        </div>
        <div className="flex-1"><p className="font-serif text-lg">AXOTIA Voice</p><p className="text-[10px] uppercase tracking-[0.18em] text-[#71807b]">{listening ? 'Listening now' : 'Admin copilot'}</p></div>
        <button onClick={() => setSpeechEnabled(value => !value)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dcd5c8] text-[#71807b]" title="Toggle spoken replies">
          {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
        {!embedded && <button onClick={() => setOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dcd5c8] text-[#71807b]"><X className="h-4 w-4" /></button>}
      </div>

      {listening && (
        <div className="flex items-center justify-center gap-1.5 bg-[#17312e] py-3">
          {[15, 25, 18, 32, 22, 37, 16, 29, 18, 24].map((height, index) => <span key={index} className="voice-bar w-1 rounded-full bg-[#d8bd76]" style={{ height, animationDelay: `${index * .07}s` }} />)}
        </div>
      )}

      <div className="flex-1 space-y-3 overflow-y-auto bg-[#fbfaf6] p-4">
        {messages.map(message => (
          <motion.div key={message.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'rounded-br-sm bg-[#17312e] text-white' : 'rounded-bl-sm border border-[#e3dccf] bg-white text-[#40524d]'}`}>
              {message.role === 'assistant' && <span className="mb-1.5 flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] text-[#8b6727]"><Sparkles className="h-3 w-3" /> AXOTIA</span>}
              {message.text}
            </div>
          </motion.div>
        ))}
      </div>

      {!speechSupported && <p className="border-t border-[#e7e1d7] bg-amber-50 px-4 py-2 text-xs text-amber-800">Voice recognition is not available in this browser. Typed chat still works.</p>}
      <form onSubmit={submit} className="flex gap-2 border-t border-[#e7e1d7] bg-white p-3">
        <button type="button" onClick={toggleListening} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${listening ? 'bg-red-100 text-red-700' : 'bg-[#edf2ef] text-[#17312e]'}`} title="Speak">
          {listening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
        <input value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask or say a command…" className="input-lux min-w-0 flex-1 rounded-full px-4 text-sm" />
        <button type="submit" disabled={!draft.trim()} className="btn-gold flex h-11 w-11 shrink-0 items-center justify-center rounded-full disabled:opacity-40"><Send className="h-4 w-4" /></button>
      </form>
    </div>
  );

  if (embedded) return panel;

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-gold fixed bottom-6 right-6 z-40 flex h-14 items-center gap-3 rounded-full px-5 text-xs font-semibold uppercase tracking-[0.16em] shadow-xl">
        <Mic className="h-4 w-4" /> Ask AXOTIA
      </button>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .96 }} transition={{ duration: .28 }} className="fixed bottom-24 right-4 z-50 sm:right-6">{panel}</motion.div>}
      </AnimatePresence>
    </>
  );
}