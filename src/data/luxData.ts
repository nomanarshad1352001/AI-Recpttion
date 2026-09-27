// Dummy data with real stock imagery — no database needed

export const heroImage = 'https://images.pexels.com/photos/4269268/pexels-photo-4269268.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1600';
export const loginImage = 'https://images.pexels.com/photos/5355858/pexels-photo-5355858.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900';
export const marbleTexture = 'https://images.pexels.com/photos/6634140/pexels-photo-6634140.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200';
export const aboutImage = 'https://images.pexels.com/photos/19879746/pexels-photo-19879746.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200';

export const clinicImages = [
  'https://images.pexels.com/photos/5355863/pexels-photo-5355863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  'https://images.pexels.com/photos/4269277/pexels-photo-4269277.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  'https://images.pexels.com/photos/6629415/pexels-photo-6629415.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  'https://images.pexels.com/photos/5355920/pexels-photo-5355920.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
  'https://images.pexels.com/photos/6502543/pexels-photo-6502543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=300&w=500',
];

export const patientAvatars = [
  'https://images.pexels.com/photos/31043311/pexels-photo-31043311.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160',
  'https://images.pexels.com/photos/36456130/pexels-photo-36456130.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160',
  'https://images.pexels.com/photos/16052900/pexels-photo-16052900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160',
  'https://images.pexels.com/photos/26728098/pexels-photo-26728098.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160',
  'https://images.pexels.com/photos/20451153/pexels-photo-20451153.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160',
  'https://images.pexels.com/photos/17086419/pexels-photo-17086419.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160',
];

export const testimonialAvatars = [
  'https://images.pexels.com/photos/31043312/pexels-photo-31043312.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  'https://images.pexels.com/photos/6627836/pexels-photo-6627836.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
  'https://images.pexels.com/photos/37458054/pexels-photo-37458054.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
];

// ---- Dummy credentials for login ----
export const DEMO_CREDENTIALS = {
  email: 'director@axotia.com',
  password: 'axotia2024',
  name: 'Dr. Victor Ashford',
  role: 'Managing Director',
};

// ---- Clinics ----
export interface LuxClinic {
  id: string;
  name: string;
  location: string;
  image: string;
  tier: 'Signature' | 'Prestige' | 'Elite';
  status: 'active' | 'onboarding' | 'paused';
  patients: number;
  appointments: number;
  rating: number;
  joined: string;
}

export const clinics: LuxClinic[] = [
  {
    id: 'c1',
    name: 'Mayfair Smile Atelier',
    location: 'London, Mayfair',
    image: clinicImages[0],
    tier: 'Elite',
    status: 'active',
    patients: 428,
    appointments: 2140,
    rating: 4.9,
    joined: 'Jan 2024',
  },
  {
    id: 'c2',
    name: 'The Kensington Dental Lounge',
    location: 'London, Kensington',
    image: clinicImages[1],
    tier: 'Signature',
    status: 'active',
    patients: 356,
    appointments: 1823,
    rating: 4.8,
    joined: 'Feb 2024',
  },
  {
    id: 'c3',
    name: 'Beverly Hills Esthetics',
    location: 'Los Angeles, CA',
    image: clinicImages[2],
    tier: 'Elite',
    status: 'active',
    patients: 512,
    appointments: 2967,
    rating: 5.0,
    joined: 'Nov 2023',
  },
  {
    id: 'c4',
    name: 'Avenue Montaigne Dental',
    location: 'Paris, 8ème',
    image: clinicImages[3],
    tier: 'Prestige',
    status: 'onboarding',
    patients: 0,
    appointments: 0,
    rating: 0,
    joined: 'Mar 2025',
  },
  {
    id: 'c5',
    name: 'Zürich Smile Gallery',
    location: 'Zürich, Bahnhofstrasse',
    image: clinicImages[4],
    tier: 'Signature',
    status: 'paused',
    patients: 289,
    appointments: 1456,
    rating: 4.7,
    joined: 'Dec 2023',
  },
];

// ---- Patients ----
export interface LuxPatient {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  lastVisit: string;
  nextAppointment: string | null;
  lifetimeValue: number;
  status: 'active' | 'vip' | 'inactive';
  notes: string;
}

export const patients: LuxPatient[] = [
  {
    id: 'p1',
    name: 'Alexandra Whitmore',
    avatar: patientAvatars[0],
    phone: '+41 79 555 0114',
    email: 'a.whitmore@private.ch',
    lastVisit: '12 Mar 2025',
    nextAppointment: '28 Mar 2025',
    lifetimeValue: 12400,
    status: 'vip',
    notes: 'Prefers morning appointments. Whitening every 6 months.',
  },
  {
    id: 'p2',
    name: 'Isabelle Fontaine',
    avatar: patientAvatars[1],
    phone: '+33 6 44 20 18 92',
    email: 'isabelle.f@outlook.fr',
    lastVisit: '08 Mar 2025',
    nextAppointment: '15 Apr 2025',
    lifetimeValue: 8900,
    status: 'vip',
    notes: 'Veneers consultation follow-up scheduled.',
  },
  {
    id: 'p3',
    name: 'Victoria Sterling',
    avatar: patientAvatars[2],
    phone: '+44 7700 900 123',
    email: 'v.sterling@gmail.com',
    lastVisit: '01 Mar 2025',
    nextAppointment: null,
    lifetimeValue: 4200,
    status: 'active',
    notes: 'Regular hygiene appointments.',
  },
  {
    id: 'p4',
    name: 'Mei-Ling Chen',
    avatar: patientAvatars[3],
    phone: '+852 9123 4567',
    email: 'meiling.chen@proton.me',
    lastVisit: '20 Feb 2025',
    nextAppointment: '02 Apr 2025',
    lifetimeValue: 6700,
    status: 'active',
    notes: 'Invisalign in progress — tray 7 of 14.',
  },
  {
    id: 'p5',
    name: 'Anastasia Rousseau',
    avatar: patientAvatars[4],
    phone: '+41 79 555 0299',
    email: 'ana.r@laposte.net',
    lastVisit: '15 Feb 2025',
    nextAppointment: null,
    lifetimeValue: 2100,
    status: 'inactive',
    notes: 'Has not returned since February.',
  },
  {
    id: 'p6',
    name: 'Sofia Marchetti',
    avatar: patientAvatars[5],
    phone: '+39 340 555 8841',
    email: 'sofia.marchetti@libero.it',
    lastVisit: '17 Mar 2025',
    nextAppointment: '24 Mar 2025',
    lifetimeValue: 9800,
    status: 'vip',
    notes: 'Implant treatment plan — stage 2 of 3.',
  },
];

// ---- Appointments ----
export interface LuxAppointment {
  id: string;
  patientName: string;
  patientAvatar: string;
  treatment: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  channel: 'whatsapp' | 'concierge' | 'direct';
  value: number;
}

export const appointments: LuxAppointment[] = [
  {
    id: 'a1',
    patientName: 'Alexandra Whitmore',
    patientAvatar: patients[0].avatar,
    treatment: 'Signature Hygiene Ritual',
    date: '28 Mar 2025',
    time: '09:00',
    duration: 60,
    status: 'confirmed',
    channel: 'whatsapp',
    value: 380,
  },
  {
    id: 'a2',
    patientName: 'Isabelle Fontaine',
    patientAvatar: patients[1].avatar,
    treatment: 'Veneer Consultation',
    date: '28 Mar 2025',
    time: '10:30',
    duration: 90,
    status: 'confirmed',
    channel: 'whatsapp',
    value: 650,
  },
  {
    id: 'a3',
    patientName: 'Sofia Marchetti',
    patientAvatar: patients[5].avatar,
    treatment: 'Implant Restoration — Stage 2',
    date: '28 Mar 2025',
    time: '14:00',
    duration: 120,
    status: 'pending',
    channel: 'concierge',
    value: 2400,
  },
  {
    id: 'a4',
    patientName: 'Mei-Ling Chen',
    patientAvatar: patients[3].avatar,
    treatment: 'Invisalign Review',
    date: '29 Mar 2025',
    time: '11:00',
    duration: 30,
    status: 'pending',
    channel: 'whatsapp',
    value: 220,
  },
  {
    id: 'a5',
    patientName: 'Victoria Sterling',
    patientAvatar: patients[2].avatar,
    treatment: 'Express Whitening',
    date: '29 Mar 2025',
    time: '15:30',
    duration: 45,
    status: 'confirmed',
    channel: 'direct',
    value: 480,
  },
  {
    id: 'a6',
    patientName: 'Alexandra Whitmore',
    patientAvatar: patients[0].avatar,
    treatment: 'Hygiene Review',
    date: '12 Mar 2025',
    time: '09:30',
    duration: 45,
    status: 'completed',
    channel: 'whatsapp',
    value: 320,
  },
  {
    id: 'a7',
    patientName: 'Anastasia Rousseau',
    patientAvatar: patients[4].avatar,
    treatment: 'Hygiene Ritual',
    date: '10 Mar 2025',
    time: '16:00',
    duration: 60,
    status: 'cancelled',
    channel: 'whatsapp',
    value: 380,
  },
];

// ---- Conversations ----
export interface LuxMessage {
  id: string;
  from: 'patient' | 'ai' | 'staff';
  content: string;
  time: string;
}

export interface LuxConversation {
  id: string;
  patientName: string;
  patientAvatar: string;
  phone: string;
  lastMessage: string;
  time: string;
  unread: number;
  state: 'live' | 'resolved' | 'attention';
  messages: LuxMessage[];
}

export const conversations: LuxConversation[] = [
  {
    id: 'v1',
    patientName: 'Alexandra Whitmore',
    patientAvatar: patients[0].avatar,
    phone: '+41 79 555 0114',
    lastMessage: 'Perfect, see you on the 28th then. Thank you!',
    time: '10:42',
    unread: 0,
    state: 'resolved',
    messages: [
      { id: 'm1', from: 'patient', content: 'Good morning, I would like to book my quarterly hygiene appointment.', time: '10:38' },
      { id: 'm2', from: 'ai', content: 'Good morning, Ms. Whitmore. A pleasure as always. Dr. Laurent has availability on Friday the 28th at 09:00, or Tuesday the 1st of April at 11:30. Which suits you best?', time: '10:38' },
      { id: 'm3', from: 'patient', content: "Friday at nine works beautifully.", time: '10:41' },
      { id: 'm4', from: 'ai', content: 'Wonderful. You are confirmed for Friday, 28 March at 09:00 with Dr. Laurent for your Signature Hygiene Ritual. A gentle reminder will reach you the day before.', time: '10:42' },
      { id: 'm5', from: 'patient', content: 'Perfect, see you on the 28th then. Thank you!', time: '10:42' },
    ],
  },
  {
    id: 'v2',
    patientName: 'Isabelle Fontaine',
    patientAvatar: patients[1].avatar,
    phone: '+33 6 44 20 18 92',
    lastMessage: 'Do you offer weekend appointments?',
    time: '11:15',
    unread: 1,
    state: 'live',
    messages: [
      { id: 'm6', from: 'patient', content: 'Hello, I wanted to enquire about the veneer package I saw on your Instagram.', time: '11:10' },
      { id: 'm7', from: 'ai', content: 'Bonjour Mme Fontaine, and thank you for your interest. Our Porcelain Veneer Collection begins at CHF 14,500 for six units, including digital smile design and two review visits. Would you like me to reserve a consultation?', time: '11:11' },
      { id: 'm8', from: 'patient', content: 'Do you offer weekend appointments?', time: '11:15' },
    ],
  },
  {
    id: 'v3',
    patientName: 'Sofia Marchetti',
    patientAvatar: patients[5].avatar,
    phone: '+39 340 555 8841',
    lastMessage: 'I need to speak with someone about my insurance claim.',
    time: '09:03',
    unread: 2,
    state: 'attention',
    messages: [
      { id: 'm9', from: 'patient', content: 'Ciao! Quick question about tomorrow.', time: '09:00' },
      { id: 'm10', from: 'ai', content: 'Of course, Ms. Marchetti. Your implant restoration, stage two, is scheduled tomorrow at 14:00 with Dr. Laurent. Shall I confirm?', time: '09:00' },
      { id: 'm11', from: 'patient', content: 'I need to speak with someone about my insurance claim.', time: '09:03' },
    ],
  },
  {
    id: 'v4',
    patientName: 'Mei-Ling Chen',
    patientAvatar: patients[3].avatar,
    phone: '+852 9123 4567',
    lastMessage: 'Great, looking forward to it!',
    time: 'Yesterday',
    unread: 0,
    state: 'resolved',
    messages: [
      { id: 'm12', from: 'patient', content: "Hi! Time for my Invisalign review — can you check the earliest slot?", time: '16:22' },
      { id: 'm13', from: 'ai', content: 'Hello Mei-Ling. The earliest availability for your Invisalign review is Saturday 29 March at 11:00. Shall I book it?', time: '16:23' },
      { id: 'm14', from: 'patient', content: 'Great, looking forward to it!', time: '16:29' },
    ],
  },
];

// ---- Services ----
export interface LuxService {
  id: string;
  name: string;
  description: string;
  category: 'Signature' | 'Aesthetic' | 'Restorative' | 'Preventive';
  duration: number;
  price: number;
  active: boolean;
}

export const services: LuxService[] = [
  {
    id: 's1',
    name: 'Signature Hygiene Ritual',
    description: 'A full-mouth hygiene experience with ultrasonic scaling, air polishing, and a wellness oral cancer screen.',
    category: 'Signature',
    duration: 60,
    price: 380,
    active: true,
  },
  {
    id: 's2',
    name: 'Porcelain Veneer Collection',
    description: 'Hand-crafted ceramics with digital smile design preview and two complimentary reviews.',
    category: 'Aesthetic',
    duration: 120,
    price: 2400,
    active: true,
  },
  {
    id: 's3',
    name: 'Express Whitening Ritual',
    description: 'In-chair LED-accelerated whitening with enamel-safe gel, up to eight shades brighter.',
    category: 'Aesthetic',
    duration: 45,
    price: 480,
    active: true,
  },
  {
    id: 's4',
    name: 'Implant Restoration',
    description: 'Swiss titanium systems with guided surgery and a five-year structural guarantee.',
    category: 'Restorative',
    duration: 90,
    price: 3600,
    active: true,
  },
  {
    id: 's5',
    name: 'Invisalign Concierge Programme',
    description: 'Discrete orthodontics with remote monitoring and evening review access.',
    category: 'Aesthetic',
    duration: 30,
    price: 5200,
    active: true,
  },
  {
    id: 's6',
    name: 'Annual Wellness Screening',
    description: 'Comprehensive examination with 3D CBCT imaging and personalised care roadmap.',
    category: 'Preventive',
    duration: 45,
    price: 290,
    active: false,
  },
];

// ---- Stats ----
export const dashboardStats = {
  revenue: 148_200,
  revenueTrend: 12.4,
  appointmentsThisWeek: 34,
  conversationsResolved: 96,
  responseTime: 2.8,
  occupancy: 91,
};

export const testimonials = [
  {
    name: 'Dr. Adriana Cole',
    clinic: 'Beverly Hills Esthetics',
    avatar: testimonialAvatars[0],
    quote: 'Our front-of-house workload fell by almost 70% in the first month. AXOTIA handles enquiries with a warmth I did not expect from software.',
    metric: '+38% bookings',
  },
  {
    name: 'Dr. Marcus Alonzo',
    clinic: 'The Kensington Dental Lounge',
    avatar: testimonialAvatars[1],
    quote: 'Patients message us at 2am and wake up to a perfectly booked calendar. It feels less like software and more like an excellent receptionist.',
    metric: 'Zero missed enquiries',
  },
  {
    name: 'Dr. Elise Moreau',
    clinic: 'Mayfair Smile Atelier',
    avatar: testimonialAvatars[2],
    quote: 'Everything about it is refined — the onboarding, the dashboard, the manner in which it speaks to our patients. Utterly worth it.',
    metric: '4.9/5 patient rating',
  },
];
