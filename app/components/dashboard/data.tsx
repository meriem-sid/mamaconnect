import React from "react";
import {
  PillIcon,
  DumbbellIcon,
  HospitalIcon,
  BookOpenIcon,
  UsersIcon,
  VideoIcon,
  HomeIcon,
  PhoneIcon,
  DashboardIcon,
  MonitorIcon,
  CalendarIcon,
  ShopIcon,
  ChatIcon,
  FoodIcon,
  SymptomsIcon,
  SymptomsNavIcon,
} from "./icons";

/* ═══════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════ */

export type TabKey = "home" | "monitoring" | "booking" | "shop" | "chat" | "timeline" | "symptoms";

export interface Midwife {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  available: boolean;
  image: null;
  bio: string;
  languages: string[];
  education: string;
  sessions: string[];
}

export interface SessionType {
  value: string;
  label: string;
  icon: React.ReactNode;
  desc: string;
}

/* ═══════════════════════════════════════════════════════════
   PREGNANCY DATA
   ═══════════════════════════════════════════════════════════ */

export const PREGNANCY_WEEK = 7;
export const PREGNANCY_DAY = 3;
export const TOTAL_DAYS = 280;
export const ELAPSED_DAYS = PREGNANCY_WEEK * 7 + PREGNANCY_DAY;
export const PERCENT_DONE = parseFloat(((ELAPSED_DAYS / TOTAL_DAYS) * 100).toFixed(1));
export const DAYS_TO_GO = TOTAL_DAYS - ELAPSED_DAYS;

/* ═══════════════════════════════════════════════════════════
   SERVICE ITEMS
   ═══════════════════════════════════════════════════════════ */

export const SERVICE_ITEMS = [
  { icon: "pill", label: "Medicines", desc: "Track prescriptions & supplements", color: "from-rose-400 to-pink-500" },
  { icon: "dumbbell", label: "Exercises", desc: "Prenatal fitness routines", color: "from-violet-400 to-purple-500" },
  { icon: "hospital", label: "Hospitals", desc: "Nearby clinics & emergency", color: "from-blue-400 to-cyan-500" },
  { icon: "book", label: "Articles", desc: "Weekly guides & tips", color: "from-amber-400 to-orange-500" },
  { icon: "food", label: "Food Recommendations", desc: "Healthy meal suggestions for pregnancy.", color: "from-emerald-400 to-teal-500" },
  { icon: "community", label: "Community", desc: "Connect with other mamas", color: "from-pink-400 to-rose-500" },
  { icon: "symptoms", label: "Symptoms Tracker", desc: "Log & track how you feel daily", color: "from-fuchsia-400 to-purple-500" },
];

export const serviceIcons: Record<string, React.ReactNode> = {
  pill: <PillIcon />,
  dumbbell: <DumbbellIcon />,
  hospital: <HospitalIcon />,
  book: <BookOpenIcon />,
  food: <FoodIcon />,
  community: <UsersIcon />,
  symptoms: <SymptomsIcon />,
};

/* ═══════════════════════════════════════════════════════════
   ALERTS
   ═══════════════════════════════════════════════════════════ */

export const ALERTS = [
  { id: 1, type: "critical" as const, title: "Heart Rate Spike Detected", desc: "Heart rate reached 168 BPM at 2:34 PM. Please rest and monitor.", time: "14 min ago" },
  { id: 2, type: "warning" as const, title: "Low Kick Count Today", desc: "Only 4 kicks recorded in the last 2 hours. Try drinking cold water and lying on your left side.", time: "1 hr ago" },
  { id: 3, type: "warning" as const, title: "Temperature Elevation", desc: "Body temperature at 37.8\u00B0C \u2014 slightly elevated. Stay hydrated and rest.", time: "2 hrs ago" },
  { id: 4, type: "warning" as const, title: "Low Battery \u2014 Mamacita Monitor", desc: "Wearable device battery at 12%. Please charge soon to avoid data gaps.", time: "3 hrs ago" },
  { id: 5, type: "info" as const, title: "Weekly Health Report Ready", desc: "Your Week 7 health summary is available. Tap to view detailed metrics.", time: "5 hrs ago" },
  { id: 6, type: "info" as const, title: "Check-in Reminder", desc: "Don\u2019t forget your daily mood and symptom check-in for today.", time: "6 hrs ago" },
];

export const alertStyles = {
  critical: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", badge: "bg-red-100 text-red-700", dot: "bg-red-500" },
  warning: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  info: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
};

/* ═══════════════════════════════════════════════════════════
   WEARABLE
   ═══════════════════════════════════════════════════════════ */

export const WEARABLE_DATA = {
  spo2: 98.2,
  heartRate: 142,
  temp: 36.7,
  battery: 87,
  connected: true,
  kicks: 3,
  movement: 40,
};

/* ═══════════════════════════════════════════════════════════
   MIDWIVES
   ═══════════════════════════════════════════════════════════ */

export const MIDWIVES: Midwife[] = [
  { id: 1, name: "Dr. Sarah Benali", specialty: "High-Risk Pregnancy", location: "Algiers Central", rating: 4.9, reviews: 128, price: "3,500 DA", available: true, image: null, bio: "Board-certified OB-GYN with 12 years of experience specializing in high-risk pregnancies. Known for her compassionate approach and evidence-based care.", languages: ["Arabic", "French", "English"], education: "University of Algiers Medical School", sessions: ["Video Call", "Home Visit", "Clinic Visit"] },
  { id: 2, name: "Dr. Fatima Ndiaye", specialty: "Prenatal Nutrition", location: "Oran", rating: 4.8, reviews: 95, price: "2,800 DA", available: true, image: null, bio: "Specialist in maternal nutrition with a focus on holistic prenatal care. Combines traditional knowledge with modern nutritional science.", languages: ["Arabic", "French"], education: "University of Oran Medical Faculty", sessions: ["Video Call", "Clinic Visit"] },
  { id: 3, name: "Dr. Amina Diallo", specialty: "Natural Birth", location: "Constantine", rating: 4.7, reviews: 76, price: "3,200 DA", available: false, image: null, bio: "Experienced midwife specializing in natural birth techniques and water birth. Advocates for personalized birth plans.", languages: ["Arabic", "French", "Tamazight"], education: "Constantine University Hospital Training", sessions: ["Home Visit", "Clinic Visit"] },
  { id: 4, name: "Dr. Leila Mansouri", specialty: "Postpartum Care", location: "Blida", rating: 4.9, reviews: 112, price: "3,000 DA", available: true, image: null, bio: "Dedicated to supporting new mothers through the postpartum period. Expert in breastfeeding support and mental health screening.", languages: ["Arabic", "French"], education: "Blida Medical University", sessions: ["Video Call", "Home Visit", "Phone Call"] },
];

export const SESSION_TYPES: SessionType[] = [
  { value: "video", label: "Video Call", icon: <VideoIcon />, desc: "Face-to-face consultation from home" },
  { value: "home", label: "Home Visit", icon: <HomeIcon />, desc: "Midwife visits you at your location" },
  { value: "clinic", label: "Clinic Visit", icon: <HospitalIcon />, desc: "Visit the midwife's clinic" },
  { value: "phone", label: "Phone Call", icon: <PhoneIcon />, desc: "Quick consultation over the phone" },
];

/* ═══════════════════════════════════════════════════════════
   SHOP PLANS
   ═══════════════════════════════════════════════════════════ */

export const SHOP_PLANS = [
  {
    name: "Premium",
    price: "18,900",
    period: "/ month",
    desc: "Full-spectrum premium maternal care",
    features: [
      "Everything from the Free plan, plus:",
      "Wearable device integration",
      "Real-time alerts",
      "Unlimited AI chatbot requests",
      "Personalized meal plans",
      "Personalized workout plans",
    ],
    popular: true,
  },
];

/* ═══════════════════════════════════════════════════════════
   USER PROFILE
   ═══════════════════════════════════════════════════════════ */

export const USER_PROFILE = {
  name: "Amira Khelif",
  email: "amira.khelif@email.com",
  phone: "+213 555 123 456",
  age: 28,
  bloodType: "O+",
  dueDate: "2026-10-15",
  weight: 65,
  height: 165,
  allergies: ["None"] as string[],
  illnesses: ["None"] as string[],
};

/* ═══════════════════════════════════════════════════════════
   SIDEBAR TABS
   ═══════════════════════════════════════════════════════════ */

export const SIDEBAR_TABS: { key: TabKey; label: string; icon: React.ReactNode; href?: string }[] = [
  { key: "home", label: "Dashboard", icon: <DashboardIcon /> },
  { key: "timeline", label: "Pregnancy Timeline", icon: <CalendarIcon /> },
  { key: "monitoring", label: "Monitoring", icon: <MonitorIcon /> },
  { key: "booking", label: "Booking", icon: <CalendarIcon /> },
  { key: "shop", label: "Shop", icon: <ShopIcon /> },
  { key: "chat", label: "Chat", icon: <ChatIcon /> },
  { key: "symptoms", label: "Symptoms Tracker", icon: <SymptomsNavIcon />, href: "/dashboard/symptoms" },
];

/* ═══════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════ */

export function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

/* ═══════════════════════════════════════════════════════════
   PREGNANCY WEEK SUMMARIES (for sidebar timeline)
   ═══════════════════════════════════════════════════════════ */

export interface WeekSummary {
  size: string;
  emoji: string;
  length: string;
  weight: string;
  highlight: string;
  tip: string;
  nextMilestone?: string;
}

const WEEK_SUMMARIES: Record<number, WeekSummary> = {
  4:  { size: "Poppy Seed",   emoji: "🌱", length: "0.1 cm", weight: "< 1 g",   highlight: "Implantation complete, neural tube forming",       tip: "Start folic acid 400 mcg/day if you haven't already.",       nextMilestone: "Heart starts beating (wk 5)" },
  5:  { size: "Sesame Seed",  emoji: "🌾", length: "0.4 cm", weight: "< 1 g",   highlight: "Heart begins to beat — a huge milestone!",           tip: "Stay hydrated and rest often — exhaustion is normal.",        nextMilestone: "All major organs present (wk 8)" },
  6:  { size: "Lentil",       emoji: "🫘", length: "0.6 cm", weight: "< 1 g",   highlight: "Facial features and tiny fingers starting to form",   tip: "Eat small, frequent meals to manage morning sickness.",       nextMilestone: "All major organs present (wk 8)" },
  7:  { size: "Blueberry",    emoji: "🫐", length: "1.0 cm", weight: "< 1 g",   highlight: "Brain growing rapidly, heart fully divided",          tip: "Ginger tea or crackers can ease nausea — keep some nearby.", nextMilestone: "All major organs present (wk 8)" },
  8:  { size: "Raspberry",    emoji: "🍇", length: "1.6 cm", weight: "1 g",     highlight: "All major organs are now present",                   tip: "Book your first prenatal appointment if not yet done.",       nextMilestone: "1st trimester complete (wk 12)" },
  9:  { size: "Grape",        emoji: "🍇", length: "2.3 cm", weight: "2 g",     highlight: "Cartilage and bones forming, baby can flex",          tip: "Fatigue may ease slightly — enjoy any energy boosts.",        nextMilestone: "1st trimester complete (wk 12)" },
  10: { size: "Kumquat",      emoji: "🍊", length: "3.1 cm", weight: "4 g",     highlight: "All vital organs formed and functioning",             tip: "Schedule your 1st trimester screening scan soon.",            nextMilestone: "1st trimester complete (wk 12)" },
  11: { size: "Fig",          emoji: "🌿", length: "4.1 cm", weight: "7 g",     highlight: "Baby kicks and stretches, tooth buds forming",        tip: "Nausea often begins to ease this week — enjoy the relief.",   nextMilestone: "1st trimester complete (wk 12)" },
  12: { size: "Lime",         emoji: "🍋", length: "5.4 cm", weight: "14 g",    highlight: "Reflexes developing, baby opens and closes fists",    tip: "Risk of miscarriage drops sharply after this week.",          nextMilestone: "Feel first movements (wk 16)" },
  13: { size: "Plum",         emoji: "🍑", length: "7.4 cm", weight: "23 g",    highlight: "Vocal cords forming, fingerprints developing",        tip: "Welcome to the 2nd trimester — energy often returns!",        nextMilestone: "Feel first movements (wk 16)" },
  14: { size: "Lemon",        emoji: "🍋", length: "8.7 cm", weight: "43 g",    highlight: "Baby squints, frowns and grimaces",                   tip: "You may start showing — embrace your growing bump.",          nextMilestone: "Feel first movements (wk 16)" },
  16: { size: "Avocado",      emoji: "🥑", length: "11.6 cm", weight: "100 g",  highlight: "Eyes and ears fully formed, baby may hear you",       tip: "Talk or sing to your baby — they can hear you now.",          nextMilestone: "Anatomy scan (wk 20)" },
  18: { size: "Bell Pepper",  emoji: "🫑", length: "14.2 cm", weight: "190 g",  highlight: "Baby yawns and hiccups in the womb",                  tip: "Schedule your mid-pregnancy anatomy scan (wks 18–20).",       nextMilestone: "Anatomy scan (wk 20)" },
  20: { size: "Banana",       emoji: "🍌", length: "25.0 cm", weight: "300 g",  highlight: "Halfway there! Baby moves actively, taste buds form", tip: "Start tracking daily kick counts if you haven't already.",    nextMilestone: "3rd trimester begins (wk 28)" },
  24: { size: "Corn",         emoji: "🌽", length: "30.0 cm", weight: "600 g",  highlight: "Baby's eyes beginning to open, brain growing fast",   tip: "Sleep on your left side to optimise blood flow.",             nextMilestone: "3rd trimester begins (wk 28)" },
  28: { size: "Eggplant",     emoji: "🍆", length: "37.6 cm", weight: "1.0 kg", highlight: "3rd trimester! Baby can blink and may dream",         tip: "Glucose screening test is usually done this week.",           nextMilestone: "Full term preparation (wk 36)" },
  32: { size: "Squash",       emoji: "🎃", length: "42.4 cm", weight: "1.7 kg", highlight: "Bones hardening, baby practises breathing",           tip: "Pack your hospital bag — labour can come earlier than expected.", nextMilestone: "Full term preparation (wk 36)" },
  36: { size: "Honeydew",     emoji: "🍈", length: "47.4 cm", weight: "2.6 kg", highlight: "Nearly full term, baby settles head-down",            tip: "Practise your breathing and relaxation techniques.",          nextMilestone: "Due date (wk 40)" },
  40: { size: "Watermelon",   emoji: "🍉", length: "51.2 cm", weight: "3.5 kg", highlight: "Fully developed and ready for birth!",                tip: "Watch for signs of labour. You're almost there!",             nextMilestone: undefined },
};

export function getWeekSummary(week: number): WeekSummary {
  const keys = Object.keys(WEEK_SUMMARIES).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  for (const k of keys) {
    if (k <= week) closest = k;
  }
  return WEEK_SUMMARIES[closest] || WEEK_SUMMARIES[7];
}



export const APPOINTMENT_REMINDERS = [
  {
    id: 1,
    title: "First Prenatal Check-up",
    date: "March 15, 2026",
    daysUntil: 8,
    doctor: "Dr. Sarah Benali",
    type: "Clinic Visit",
    urgent: false,
  },
  {
    id: 2,
    title: "First Trimester Ultrasound",
    date: "March 28, 2026",
    daysUntil: 21,
    doctor: "Dr. Fatima Ndiaye",
    type: "Scan",
    urgent: false,
  },
  {
    id: 3,
    title: "Blood Tests (Routine Panel)",
    date: "March 12, 2026",
    daysUntil: 5,
    doctor: "Laboratory",
    type: "Lab Work",
    urgent: true,
  },
];

/* ═══════════════════════════════════════════════════════════
   WEEKLY HEALTH TIPS
   ═══════════════════════════════════════════════════════════ */

export const WEEKLY_TIPS = [
  {
    category: "Nutrition",
    color: "from-emerald-400 to-teal-500",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    tip: "Increase folic acid intake. Aim for 400–800 mcg daily to support your baby's neural tube development this week.",
  },
  {
    category: "Wellness",
    color: "from-violet-400 to-purple-500",
    bgColor: "bg-violet-50",
    textColor: "text-violet-700",
    tip: "Morning sickness peaks around week 7–9. Eat small, frequent meals and keep ginger tea or crackers nearby.",
  },
  {
    category: "Activity",
    color: "from-blue-400 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    tip: "Gentle walking for 20–30 minutes daily boosts circulation and mood without overtaxing your body in early pregnancy.",
  },
];
