import { FormEvent, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, AtSign, Eye, EyeOff, KeyRound, Loader2, Mic2, ShieldCheck, Sparkles } from 'lucide-react';
import { DEMO_CREDENTIALS, loginImage } from '../../data/luxData';

interface LoginPageProps {
  onLogin: () => void;
  onBack?: () => void;
}

export default function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [filling, setFilling] = useState(false);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const typeValue = async (value: string, setter: (value: string) => void, speed: number) => {
    for (let index = 0; index <= value.length; index += 1) {
      setter(value.slice(0, index));
      await new Promise(resolve => setTimeout(resolve, speed));
    }
  };

  const autofill = async () => {
    if (filling) return;
    setFilling(true);
    setReady(false);
    setEmail('');
    setPassword('');
    await typeValue(DEMO_CREDENTIALS.email, setEmail, 30);
    await new Promise(resolve => setTimeout(resolve, 180));
    await typeValue(DEMO_CREDENTIALS.password, setPassword, 45);
    setReady(true);
    setFilling(false);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setTimeout(onLogin, 1150);
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#f7f4ed] text-[#17312e] grain-overlay">
      <motion.section initial={{ x: '-8%', opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="relative hidden w-[46%] overflow-hidden lg:block">
        <img src={loginImage} alt="Refined dental clinic" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17312e]/75 via-[#17312e]/8 to-[#f7f4ed]/15" />
        <div className="absolute bottom-14 left-12 right-12 text-white">
          <div className="mb-7 h-px bg-gradient-to-r from-[#d8bd76] to-transparent" />
          <p className="max-w-lg font-serif text-3xl leading-snug">“Your reception desk, attentive before the first patient arrives.”</p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-[#ead9aa]">The AXOTIA standard</p>
        </div>
      </motion.section>

      <section className="relative z-10 flex flex-1 items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#b58a3a]/40 bg-white"><Mic2 className="h-5 w-5 text-[#9a722b]" /></div>
              <div><p className="font-serif text-xl tracking-[0.2em]">AXOTIA</p><p className="text-[9px] uppercase tracking-[0.3em] text-[#9a722b]">Private access</p></div>
            </div>
            {onBack && <button onClick={onBack} className="flex items-center gap-2 text-xs text-[#71807b] transition hover:text-[#8b6727]"><ArrowLeft className="h-4 w-4" /> Home</button>}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .7 }}>
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[#8b6727]">Welcome back</p>
            <h1 className="font-serif text-5xl leading-tight">Your day,<br />already in order.</h1>
            <p className="mt-4 text-sm font-light text-[#71807b]">Sign in to the interactive concierge dashboard.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .7 }} className="relative my-8 overflow-hidden rounded-2xl border border-[#d9ccaa] bg-[#fffaf0] p-4">
            <div className="animate-shimmer pointer-events-none absolute inset-0" />
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#efe3c2]"><Sparkles className="h-4 w-4 text-[#8b6727]" /></div>
                <div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b6727]">Demo credentials</p><p className="truncate text-xs text-[#71807b]">One click types both fields</p></div>
              </div>
              <button onClick={autofill} disabled={filling} className="btn-gold shrink-0 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] disabled:opacity-50">{filling ? 'Typing…' : 'Autofill'}</button>
            </div>
            <AnimatePresence>{ready && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="relative mt-3 flex items-center gap-1.5 text-xs text-emerald-700"><ShieldCheck className="h-3.5 w-3.5" /> Ready to enter.</motion.p>}</AnimatePresence>
          </motion.div>

          <motion.form onSubmit={submit} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .36, duration: .7 }} className="space-y-5">
            <div>
              <label className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-[#71807b]">Email address</label>
              <div className="relative"><AtSign className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa29f]" /><input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" placeholder="you@clinic.com" className="input-lux w-full rounded-xl py-3.5 pl-11 pr-4 text-sm" /></div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between"><label className="text-[10px] uppercase tracking-[0.22em] text-[#71807b]">Password</label><button type="button" className="text-xs text-[#8b6727]">Forgot password?</button></div>
              <div className="relative"><KeyRound className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa29f]" /><input type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" placeholder="Your password" className="input-lux w-full rounded-xl py-3.5 pl-11 pr-12 text-sm" /><button type="button" onClick={() => setShowPassword(value => !value)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#85918d]">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
            </div>
            <button type="submit" disabled={loading || !email || !password} className="btn-gold flex w-full items-center justify-center gap-3 rounded-xl py-4 text-xs font-semibold uppercase tracking-[0.22em] disabled:cursor-not-allowed disabled:opacity-50">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Preparing dashboard</> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
            </button>
          </motion.form>

          <p className="mt-8 text-center text-[10px] uppercase tracking-[0.17em] text-[#949d99]">Demo only · no database · local dummy data</p>
        </div>
      </section>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f4ed]">
            <motion.div initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .35 }} className="text-center">
              <div className="gold-glow-strong mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#b58a3a]/40 bg-white"><Mic2 className="h-7 w-7 text-[#9a722b]" /></div>
              <p className="font-serif text-2xl">Good day, {DEMO_CREDENTIALS.name.split(' ')[1]}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.26em] text-[#8b6727]">Preparing your reception desk</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}