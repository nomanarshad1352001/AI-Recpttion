# AXOTIA — AI Receptionist for Dental Clinics

> **Project Title:** AXOTIA — The AI Receptionist & Voice Concierge for Dental Practices
>
> **Tagline:** *"An impeccably well-mannered receptionist — available at every hour, in every tongue, for every patient."*

---

## 1. What AXOTIA Is

AXOTIA is a **B2B SaaS platform** that gives dental clinics a complete, always-on AI
receptionist. Patients contact the clinic via **WhatsApp** (or **voice**), and AXOTIA
instantly:

- answers their questions using the clinic's own knowledge base,
- checks real-time calendar availability,
- books, reschedules, or cancels appointments,
- sends reminders and follow-ups,
- and escalates to human staff only when genuinely necessary.

The clinic's team supervises everything from a single, elegant admin dashboard —
no missed messages, no missed bookings, no overtime reception shifts.

---

## 2. What This Demo Application Contains

This repository is a **fully interactive front-end demonstration** of the AXOTIA
product, built to run entirely on dummy data (no backend or database required).
It simulates the complete product experience end-to-end:

### 2.1 Luxury Landing Page
A premium marketing site in an ivory / sage / champagne-gold aesthetic:
- Cinematic hero with parallax imagery and staggered typography animation
- **Six capability highlights** (voice concierge, WhatsApp reception, live diary
  booking, clinic-trained AI, safe human handover, automated follow-up)
- Animated performance stats (2.8s response, 96% AI resolution, 0 missed enquiries)
- "Three quiet steps" operating model section
- Testimonials from dental practices with real stock-portrait photos
- Pricing/membership presentation and calls to action

### 2.2 Animated Login Page
- Split-panel layout with premium clinic imagery
- **One-click demo autofill** — credentials type themselves out
  character-by-character with a blinking typewriter cursor
- Demo account: `director@axotia.com` / `axotia2024`
- Password visibility toggle, shimmer effects, and a "preparing your dashboard"
  success transition

### 2.3 Admin Dashboard (CRM)
A complete light-theme management suite with **full CRUD** on dummy data persisted
in `localStorage`:

| Module | Capabilities |
|---|---|
| **Overview** | KPI cards, upcoming appointments, live conversation feed, practice cards |
| **Practices** | Create / edit / delete clinics with tiers (Elite / Signature / Prestige), photos, ratings, patient & visit counts |
| **Patients** | Full patient records — avatars, contact info, VIP status, lifetime value, next appointment, private notes |
| **Appointments** | Book / amend / confirm / cancel; status filters; channel badges (WhatsApp / concierge / direct); treatment values |
| **Conversations** | WhatsApp-style chat — reply personally as staff, set thread state (live / resolved / attention), unread badges, realistic AI dialogues |
| **Treatments** | Service catalogue CRUD — price, duration, category, offer/pause toggle, visible to AI |

### 2.4 Voice Chatbot Assistant (Floating + Dedicated Page)
A **browser-native voice & text copilot** built into the admin:
- **Speech-to-text input** via the Web Speech API (microphone button with
  animated voice-wave visualizer while listening)
- **Spoken replies** via Speech Synthesis (toggleable)
- **Typed chat fallback** with a clear notice when voice isn't supported by the browser
- Can perform assistant actions:
  - *"Open reports"* / *"Show appointments"* → navigates the admin
  - *"How many appointments?"* / *"Revenue?"* → reads live metrics
  - *"Find Alexandra"* → looks up patient records
  - *"Check system health"* → reports operational status

### 2.5 Seven Additional Admin Feature Modules

1. **Voice Concierge workspace** — full-page embedded assistant with suggested commands
2. **Reports & Analytics** — revenue KPIs, animated monthly chart, period
   selection (7 / 30 / 90 days), and one-click **CSV export**
3. **Knowledge Base** — manages exactly what the AI may tell patients;
   create/search/publish/unpublish/delete approved answers
4. **Integrations Hub** — connect/disconnect WhatsApp Business, Google Calendar,
   Paddle billing, and Telegram alerts with status indicators
5. **Automations** — pause/resume rules: 24-hour reminders, missed-call recovery,
   human-handover alerts, lapsed-patient follow-up (with run counters)
6. **Team Access** — invite colleagues by email, assign roles
   (Owner / Manager / Reception), remove members
7. **System Health** — service-by-service status (webhook, AI service, booking
   worker, database, notifications, SSL), manual "run checks", recent activity log

---

## 3. Tech Stack

### 3.1 Technologies Used in This Demo (front-end)

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18 + TypeScript | Component architecture, type safety |
| **Build tool** | Vite | Fast dev server & single-file production build |
| **Styling** | Tailwind CSS | Utility-first responsive design system |
| **Custom design system** | Vanilla CSS variables & utilities | Luxury theme tokens (`--gold`, `--ink`, `--paper`), `.card-lux`, `.btn-gold`, `.input-lux`, `.text-gold-gradient`, glass/hairline/grain effects |
| **Animation** | Framer Motion | Page transitions, staggered reveals, parallax (`useScroll`/`useTransform`), layout animation, modal choreography |
| **Icons** | Lucide React | Consistent line-icon set (no emojis) |
| **Voice** | Web Speech API | `SpeechRecognition` (mic → text) & `speechSynthesis` (text → speech) |
| **Persistence** | Browser `localStorage` | All CRUD data survives refreshes — replaces a database for demo purposes |
| **Typography** | Google Fonts | Playfair Display (serif headings) + Jost (light UI text) |
| **Imagery** | Pexels stock photography | Clinic interiors, dentist & patient portraits |

### 3.2 Production Architecture (the product this demo represents)

The demo's design reflects AXOTIA's real-world stack (as defined in the product's
engineering brief):

- **Backend:** Python **FastAPI** — WhatsApp webhook handler, booking engine, async
  job worker, rate limiting, deduplication, blocked-user management
- **AI:** **Claude API** (Anthropic) for natural conversation, with per-clinic
  conversation memory
- **Database:** **Supabase (PostgreSQL)** with **pgvector** for semantic search over
  each clinic's knowledge base
- **Frontend (production):** **Next.js** self-service dashboard + **Supabase Auth**
- **Messaging:** **WhatsApp Business API**
- **Payments:** **Paddle** — subscriptions, activation/deactivation, access gating
- **Infrastructure:** Hetzner VPS · Docker Compose · Nginx + SSL · GitHub Actions
  CI/CD · health checks · Telegram alerting · auto-restart with graceful recovery
- **Principle:** one repo, one server, no microservices until genuinely needed —
  a system a new senior developer can understand in days, not months

---

## 4. Who Buys AXOTIA (Target Clients)

### Primary market
- **Independent and boutique dental practices** whose reception is overloaded:
  missed calls during treatments, patients lost outside working hours
- **Multi-chair and multi-location dental clinics** needing one reception layer
  across diaries and practitioners
- **Cosmetic/esthetic dental studios** where enquiries are high-value and a fast,
  polished first response directly protects conversion
- **Dental service organisations (DSOs/small chains)** standardising patient
  communication across their portfolio of clinics

### Economic profile of the ideal buyer
A single dental appointment is typically worth **£75 – £3,600+** (hygiene → implants
→ veneers). If AXOTIA rescues even **two or three bookings per month** that would
otherwise be missed after-hours, the subscription pays for itself several times over.

### Also relevant for
Orthodontists, hygiene practices, and adjacent appointment-driven healthcare
businesses (physiotherapy, aesthetic medicine) — the same pattern applies.

---

## 5. Platform Qualities

| Quality | What it means in practice |
|---|---|
| **Always available** | Replies at 3 a.m., weekends, holidays — zero missed enquiries |
| **Human-quality conversation** | Claude-powered, trained on the clinic's own services, prices, policies and tone — patients often can't tell |
| **Reliable booking engine** | Reads live calendar availability; confirms instantly; dedup and rate-limit protections keep the diary clean |
| **Grounded & safe by design** | Answers only from the approved per-clinic knowledge base; uncertain or urgent topics escalate to humans automatically |
| **Stable over feature-count** | A deliberately focused system: few features that work flawlessly rather than many that need constant intervention |
| **Maintainable** | Single repo, single server, clear structure — understandable to a new senior developer in days |
| **Upgrade-safe** | Additive modules and per-clinic isolation mean updates never break existing clients |
| **Self-service** | A clinic connects its number, calendar and services and goes live without a support call |
| **Discreet & secure** | Encrypted handling of patient correspondence, healthcare privacy standards, access tied to subscription status |
| **Measurable** | Reports on response time, resolution rate, bookings and revenue — not vanity metrics |

---

## 6. Feature Index (Complete)

### Patient-facing
1. WhatsApp conversational reception (24/7)
2. Voice concierge — speak instead of type
3. Clinic-trained Q&A (services, prices, hours, policies)
4. Live appointment booking, rescheduling, cancellation
5. Automatic confirmations and 24-hour reminders
6. Graceful handover to human staff when needed

### Clinic admin
7. Overview dashboard with live KPIs
8. Practices management (multi-clinic CRUD)
9. Patient CRM with VIP tiers and lifetime value
10. Appointment diary with statuses, channels and values
11. Conversation inbox with staff replies and thread states
12. Treatment catalogue visible to the AI
13. Knowledge base editor — controls what the AI is allowed to say
14. Reports & analytics with CSV export
15. Integrations hub (WhatsApp, Google Calendar, Paddle, Telegram)
16. Automation rules with one-tap pause/resume
17. Team access with roles and invitations
18. System health monitoring and alerting

### Experience details
19. Animated login with one-click demo autofill
20. Floating voice assistant accessible on every admin screen
21. Voice commands that navigate and query the admin
23. Full localStorage persistence (demo runs with no database)
24. Responsive layout from mobile to widescreen
25. Luxury light-theme design system throughout

---

## 7. Demo Access

```
URL (demo):      served from dist/index.html after `npm run build`
Email:           director@axotia.com
Password:        axotia2024
One-click login: Use the "Autofill" button on the login page.
Voice assistant: Click "Ask AXOTIA" (bottom-right) or open
                 the "Voice agent" section in the admin sidebar.
```

---

## 8. Repository Map

```
src/
├── App.tsx                        # App state machine: landing → login → dashboard
├── data/luxData.ts                # All dummy data (clinics, patients, appointments,
│                                  #   conversations, services, testimonials)
├── hooks/useLocalStorage.ts       # Persistence hook (replaces a database)
├── index.css                      # Light luxury design system + compatibility layer
└── components/lux/
    ├── LuxLanding.tsx             # Marketing site (light theme)
    ├── LoginPage.tsx              # Animated login with typewriter autofill
    └── dashboard/
        ├── LuxShell.tsx           # Admin layout: sidebar, topbar, navigation
        ├── OverviewPage.tsx       # KPIs + feeds
        ├── PracticesPage.tsx      # Clinic CRUD
        ├── PatientsPage.tsx       # Patient CRM CRUD
        ├── AppointmentsPage.tsx   # Diary CRUD + status actions
        ├── ConversationsPage.tsx  # Inbox + chat
        ├── ServicesPage.tsx       # Treatment catalogue CRUD
        ├── AdminFeaturePages.tsx  # Reports, Knowledge, Integrations,
        │                          #   Automations, Team, System Health, Voice page
        └── VoiceAssistant.tsx     # Voice + text copilot (Web Speech API)
```

---

*AXOTIA — fewer features, flawlessly executed. Built for the practices that answer every patient.*
