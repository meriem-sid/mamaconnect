"use client";

import { useRouter } from "next/navigation";
import {
  PREGNANCY_WEEK,
  PREGNANCY_DAY,
  PERCENT_DONE,
  DAYS_TO_GO,
  SERVICE_ITEMS,
  serviceIcons,
  APPOINTMENT_REMINDERS,
  WEEKLY_TIPS,
} from "./data";
import { ChevronRightIcon } from "./icons";

const ITEM_ROUTES: Record<string, string> = {
  Medicines: "/medicines",
  Exercises: "/exercises",
  Hospitals: "/hospitals",
  Articles: "/articles",
  "Food Recommendations": "/food-recommendations",
  Community: "/community",
  "Symptoms Tracker": "/dashboard/symptoms",
};

interface DashboardHomeProps {
  greeting: string;
  userName: string;
  onGoToBooking?: () => void;
}

export default function DashboardHome({ greeting, userName, onGoToBooking }: DashboardHomeProps) {
  const router = useRouter();

  function handleServiceClick(label: string) {
    const route = ITEM_ROUTES[label];
    if (route) {
      router.push(route);
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative pt-8 pb-10 sm:pt-10 sm:pb-12 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff5f5 0%, #ffe0e0 50%, #fecdd3 100%)" }}
      >
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#F46A6A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left */}
            <div className="lg:w-3/5 text-center lg:text-left">
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#F46A6A] bg-white/70 px-3 py-1 rounded-full mb-4 shadow-sm">
                Your Dashboard
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                {greeting}, <span className="text-[#F46A6A]">{userName}</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed mb-6">
                You&apos;re at <strong>Week {PREGNANCY_WEEK} + {PREGNANCY_DAY} days</strong> of your pregnancy journey. Keep going — every day matters!
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="bg-white/80 backdrop-blur rounded-2xl px-5 py-3 shadow-sm border border-white/50">
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mb-0.5">Progress</p>
                  <p className="text-xl font-extrabold text-[#F46A6A]">{PERCENT_DONE}%<span className="text-sm font-medium text-gray-500 ml-1">Done</span></p>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-2xl px-5 py-3 shadow-sm border border-white/50">
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium mb-0.5">Remaining</p>
                  <p className="text-xl font-extrabold text-gray-900">{DAYS_TO_GO}<span className="text-sm font-medium text-gray-500 ml-1">Days to Go</span></p>
                </div>
              </div>
            </div>

            {/* Right — Circular Progress */}
            <div className="lg:w-2/5 flex items-center justify-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#fce4ec" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="url(#progressGrad)" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - PERCENT_DONE / 100)}`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F46A6A" />
                      <stop offset="100%" stopColor="#FBC4AB" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-sm text-gray-500 font-medium">Week</span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-none">{PREGNANCY_WEEK}</span>
                  <span className="text-sm text-[#F46A6A] font-semibold">+ {PREGNANCY_DAY} days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-8 sm:py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
            {SERVICE_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleServiceClick(item.label)}
                className="group relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br ${item.color} text-white flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}>
                  {serviceIcons[item.icon]}
                </div>
                <h3 className="relative text-sm sm:text-base font-semibold text-gray-900 mb-1">{item.label}</h3>
                <p className="relative text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-gray-400 transition-colors">
                  <ChevronRightIcon />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Personalised Health Tips */}
      <section className="pb-8 sm:pb-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Your Health Tips This Week</h2>
              <p className="text-sm text-gray-500 mt-0.5">Personalised for Week {PREGNANCY_WEEK} of your pregnancy</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {WEEKLY_TIPS.map((tip) => (
              <div key={tip.category} className={`${tip.bgColor} rounded-2xl p-5`}>
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider ${tip.textColor} mb-3`}>{tip.category}</span>
                <p className="text-sm text-gray-700 leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Reminders */}
      <section className="pb-10 sm:pb-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
              <p className="text-sm text-gray-500 mt-0.5">Your next prenatal visits and check-ups</p>
            </div>
            {onGoToBooking && (
              <button
                onClick={onGoToBooking}
                className="text-sm font-semibold text-[#F46A6A] hover:text-[#e55d5d] transition-colors cursor-pointer"
              >
                + Book New
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {APPOINTMENT_REMINDERS.map((apt) => (
              <div
                key={apt.id}
                className={`bg-white rounded-2xl p-5 border shadow-sm ${apt.urgent ? "border-[#F46A6A]/30" : "border-gray-100"}`}
              >
                {apt.urgent && (
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#F46A6A] bg-rose-50 px-2 py-0.5 rounded-full mb-2">
                    Coming Soon
                  </span>
                )}
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{apt.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{apt.doctor}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">{apt.type}</p>
                    <p className="text-sm font-semibold text-gray-700">{apt.date}</p>
                  </div>
                  <div className={`text-right ${apt.daysUntil <= 7 ? "text-[#F46A6A]" : "text-gray-400"}`}>
                    <p className="text-lg font-extrabold leading-none">{apt.daysUntil}</p>
                    <p className="text-[10px]">days away</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
