import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, Brain, CalendarCheck, ChevronDown, Clock3, Headphones,
  Menu, MessageCircle, Mic2, Quote, ShieldCheck, Sparkles, X
} from 'lucide-react';
import { aboutImage, clinicImages, heroImage, testimonials } from '../../data/luxData';

interface LuxLandingProps {
  onSignIn: () => void;
}

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: .75, ease: [0.16, 1, 0.3, 1] as const },
};

const features = [
  { icon: Mic2, title: 'Voice concierge', copy: 'Patients can speak naturally, ask questions, and request an appointment without navigating a menu.' },
  { icon: MessageCircle, title: 'WhatsApp reception', copy: 'Every message receives a fast, considerate answer in the voice of your practice.' },
  { icon: CalendarCheck, title: 'Live diary booking', copy: 'AXOTIA checks availability, books, reschedules, and confirms without staff intervention.' },
  { icon: Brain, title: 'Clinic-trained AI', copy: 'Services, pricing, policies, and tone are grounded in your private knowledge library.' },
  { icon: ShieldCheck, title: 'Safe handover', copy: 'Sensitive, urgent, or uncertain conversations are routed to the right team member.' },
  { icon: Clock3, title: 'Automated follow-up', copy: 'Reminders, confirmations, and recovery messages reduce no-shows while staying personal.' },
];

const workflow = [
  ['01', 'Listen', 'A message or voice request arrives through the channel your patient already uses.'],
  ['02', 'Understand', 'The assistant combines conversation context with your approved clinic knowledge.'],
  ['03', 'Resolve', 'It answers, books, or hands over with a complete summary for your team.'],
];

export default function LuxLanding({ onSignIn }: LuxLandingProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f4ed] text-[#17312e] grain-overlay">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b border-[#ded7ca]/80 bg-[#fbfaf6]/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b58a3a]/50 bg-white">
              <Mic2 className="h-[18px] w-[18px] text-[#9a722b]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-serif text-lg tracking-[0.22em]">AXOTIA</p>
              <p className="text-[9px] uppercase tracking-[0.31em] text-[#9a722b]">AI Reception</p>
            </div>
          </a>

          <nav className="hidden items-center gap-9 text-[11px] uppercase tracking-[0.2em] text-[#6e7773] md:flex">
            <a href="#features" className="transition-colors hover:text-[#9a722b]">Features</a>
            <a href="#workflow" className="transition-colors hover:text-[#9a722b]">How it works</a>
            <a href="#stories" className="transition-colors hover:text-[#9a722b]">Stories</a>
          </nav>

          <button onClick={onSignIn} className="btn-gold hidden rounded-full px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] md:block">
            Open demo
          </button>
          <button onClick={() => setMenuOpen(v => !v)} className="text-[#17312e] md:hidden" aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-[#e4ded2] bg-[#fbfaf6] px-6 py-6 md:hidden">
            <div className="space-y-4 text-xs uppercase tracking-[0.2em] text-[#6e7773]">
              <a className="block" href="#features" onClick={() => setMenuOpen(false)}>Features</a>
              <a className="block" href="#workflow" onClick={() => setMenuOpen(false)}>How it works</a>
              <a className="block" href="#stories" onClick={() => setMenuOpen(false)}>Stories</a>
              <button onClick={onSignIn} className="btn-gold w-full rounded-full py-3">Open demo</button>
            </div>
          </motion.div>
        )}
      </motion.header>

      <main>
        <section id="top" ref={heroRef} className="relative flex min-h-screen items-end overflow-hidden pt-20">
          <motion.div style={{ y: imageY }} className="absolute inset-0">
            <motion.img
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              src={heroImage}
              alt="Refined dental treatment room"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7f4ed]/95 via-[#f7f4ed]/76 to-[#f7f4ed]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ed] via-transparent to-[#f7f4ed]/30" />
          </motion.div>

          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 pb-20 pt-28 lg:grid-cols-12 lg:px-10 lg:pb-28">
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .8 }} className="mb-7 flex items-center gap-4">
                <span className="h-px w-14 bg-[#b58a3a]" />
                <span className="text-[11px] uppercase tracking-[0.36em] text-[#8b6727]">Voice and WhatsApp concierge</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4, duration: 1, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl font-serif text-6xl leading-[.98] sm:text-7xl lg:text-[6.3rem]">
                AXOTIA makes every patient feel <em className="text-gold-gradient">expected.</em>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .65, duration: .8 }} className="mt-8 max-w-xl text-lg font-light leading-relaxed text-[#576762]">
                A calm AI receptionist that listens, answers, and books around the clock, while your team remains in control.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8, duration: .8 }} className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button onClick={onSignIn} className="btn-gold flex items-center justify-center gap-3 rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.22em]">
                  Explore the admin <ArrowRight className="h-4 w-4" />
                </button>
                <a href="#features" className="flex items-center justify-center gap-3 rounded-full border border-[#cfc7b8] bg-white/55 px-9 py-4 text-xs uppercase tracking-[0.22em] text-[#40524d] transition hover:border-[#b58a3a]">
                  See capabilities <ChevronDown className="h-4 w-4" />
                </a>
              </motion.div>
            </div>

            <motion.aside initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .85, duration: .9 }} className="hidden self-end lg:col-span-4 lg:block">
              <div className="rounded-3xl border border-white/80 bg-white/78 p-6 shadow-[0_25px_80px_rgba(42,63,56,.16)] backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17312e] text-white"><Headphones className="h-5 w-5" /></div>
                    <div><p className="font-serif text-lg">Voice concierge</p><p className="text-xs text-[#71807b]">Live and ready</p></div>
                  </div>
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-emerald-700"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-600" />Listening</span>
                </div>
                <div className="rounded-2xl bg-[#edf2ef] p-4 text-sm leading-relaxed text-[#40524d]">“I can help you find a suitable hygiene appointment. Would Friday morning or Tuesday afternoon suit you?”</div>
                <div className="mt-5 flex items-end gap-1.5">
                  {[12, 24, 17, 32, 22, 38, 16, 27, 12, 20].map((h, i) => <span key={i} className="voice-bar w-1.5 rounded-full bg-[#b58a3a]" style={{ height: h, animationDelay: `${i * .08}s` }} />)}
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="border-y border-[#e4ded2] bg-[#fffdf8]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 lg:grid-cols-4 lg:px-10">
            {[['2.8s', 'Average reply'], ['96%', 'Resolved by AI'], ['34', 'Bookings this week'], ['0', 'Missed enquiries']].map(([value, label]) => (
              <motion.div key={label} {...reveal} className="text-center">
                <p className="font-serif text-4xl text-[#8b6727] lg:text-5xl">{value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[#7c8783]">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <motion.div {...reveal} className="mb-16 max-w-2xl">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#8b6727]">Six essential capabilities</p>
            <h2 className="font-serif text-5xl leading-tight">More capable, never more complicated.</h2>
            <p className="mt-5 font-light leading-relaxed text-[#64736e]">A focused system for the work that matters most at reception. Every capability has one clear purpose.</p>
          </motion.div>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.article key={feature.title} {...reveal} transition={{ ...reveal.transition, delay: index * .06 }} className="border-t border-[#dcd5c8] pt-6">
                <feature.icon className="mb-7 h-6 w-6 text-[#9a722b]" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl">{feature.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#64736e]">{feature.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="workflow" className="border-y border-[#dfe4e0] bg-[#eaf0ec]">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 lg:grid-cols-2 lg:px-10">
            <motion.div {...reveal} className="relative overflow-hidden rounded-[2rem]">
              <img src={aboutImage} alt="Dental team caring for a patient" className="aspect-[4/5] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17312e]/45 to-transparent" />
              <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/50 bg-white/85 p-5 backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8b6727]">Human when it matters</p>
                <p className="mt-2 font-serif text-xl">Every handover includes context, intent, and a recommended next action.</p>
              </div>
            </motion.div>
            <div>
              <motion.div {...reveal}>
                <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#8b6727]">A simple operating model</p>
                <h2 className="font-serif text-5xl leading-tight">One conversation. Three quiet steps.</h2>
              </motion.div>
              <div className="mt-12 space-y-0">
                {workflow.map(([number, title, copy], index) => (
                  <motion.div key={number} {...reveal} transition={{ ...reveal.transition, delay: index * .1 }} className="grid grid-cols-[56px_1fr] gap-5 border-t border-[#ccd7d1] py-7">
                    <span className="font-serif text-2xl italic text-[#9a722b]">{number}</span>
                    <div><h3 className="font-serif text-2xl">{title}</h3><p className="mt-2 text-sm font-light leading-relaxed text-[#64736e]">{copy}</p></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="stories" className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
          <motion.div {...reveal} className="mb-14 text-center">
            <p className="mb-5 text-[11px] uppercase tracking-[0.35em] text-[#8b6727]">From the reception desk</p>
            <h2 className="font-serif text-5xl">Trusted by considered practices.</h2>
          </motion.div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((story, index) => (
              <motion.figure key={story.name} {...reveal} transition={{ ...reveal.transition, delay: index * .08 }} className="card-lux rounded-3xl p-8">
                <Quote className="h-7 w-7 text-[#b58a3a]" strokeWidth={1.3} />
                <blockquote className="my-7 font-serif text-xl leading-relaxed text-[#334944]">{story.quote}</blockquote>
                <figcaption className="flex items-center gap-4 border-t border-[#e4ded2] pt-5">
                  <img src={story.avatar} alt={story.name} className="h-11 w-11 rounded-full object-cover" />
                  <div className="flex-1"><p className="text-sm font-medium">{story.name}</p><p className="text-xs text-[#7c8783]">{story.clinic}</p></div>
                  <span className="text-[9px] uppercase tracking-[0.16em] text-[#8b6727]">{story.metric}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
          <motion.div {...reveal} className="relative overflow-hidden rounded-[2rem] bg-[#17312e] px-8 py-20 text-center text-white md:px-16">
            <img src={clinicImages[3]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#17312e] via-[#17312e]/90 to-[#17312e]/70" />
            <div className="relative">
              <Sparkles className="mx-auto mb-6 h-6 w-6 text-[#d8bd76]" />
              <h2 className="mx-auto max-w-3xl font-serif text-5xl leading-tight md:text-6xl">Give your team a quieter day.</h2>
              <p className="mx-auto mt-6 max-w-xl font-light text-[#d4dfda]">Autofill the demo credentials, enter the light admin panel, and try the working voice assistant.</p>
              <button onClick={onSignIn} className="btn-gold mt-10 inline-flex items-center gap-3 rounded-full px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em]">Open interactive demo <ArrowRight className="h-4 w-4" /></button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-[#e4ded2] bg-[#fffdf8]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-xs text-[#7c8783] md:flex-row lg:px-10">
          <p className="font-serif text-lg tracking-[0.22em] text-[#17312e]">AXOTIA</p>
          <p>AI reception for modern dental practices.</p>
          <p>© {new Date().getFullYear()} AXOTIA LLC</p>
        </div>
      </footer>
    </div>
  );
}