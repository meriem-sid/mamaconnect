"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TRIMESTERS = ["All", "1st Trimester", "2nd Trimester", "3rd Trimester"];

const EXERCISES = [
  {
    emoji: "🚶‍♀️",
    name: "Marche à pied (Daily Walking)",
    trimester: ["1st Trimester", "2nd Trimester", "3rd Trimester"],
    duration: "20–30 min / day",
    difficulty: "Easy",
    description:
      "One of the safest and most recommended exercises throughout pregnancy. Walking improves cardiovascular health, reduces swelling in the legs, and boosts mood. Ideal in Algerian parks or residential areas in the early morning.",
    tips: "Wear comfortable shoes, stay hydrated, and avoid walking in midday heat during summer.",
  },
  {
    emoji: "🧘‍♀️",
    name: "Yoga Prénatal (Prenatal Yoga)",
    trimester: ["1st Trimester", "2nd Trimester", "3rd Trimester"],
    duration: "30–45 min / session",
    difficulty: "Moderate",
    description:
      "Gentle prenatal yoga combines breathing exercises, stretching, and relaxation poses. Helps reduce back pain, improve flexibility, manage anxiety, and prepare the body for labor.",
    tips: "Avoid poses lying flat on your back after 20 weeks. Focus on gentle hip openers and breathing.",
  },
  {
    emoji: "🌊",
    name: "Natation Douce (Gentle Swimming)",
    trimester: ["1st Trimester", "2nd Trimester", "3rd Trimester"],
    duration: "20–40 min / session",
    difficulty: "Easy",
    description:
      "Swimming is ideal during pregnancy because water supports your weight and reduces joint strain. It's excellent for circulation, muscle strength, and relieving lower back pain.",
    tips: "Available at public pools in Algiers, Oran, and Constantine. Choose lanes with calm water.",
  },
  {
    emoji: "🌬️",
    name: "Exercices de Respiration (Breathing Exercises)",
    trimester: ["1st Trimester", "2nd Trimester", "3rd Trimester"],
    duration: "10–15 min / day",
    difficulty: "Easy",
    description:
      "Diaphragmatic breathing and deep breathing techniques help reduce stress, improve oxygen flow to the baby, and prepare for labor. Can be done anywhere at home.",
    tips: "Practice the 4-7-8 technique: inhale for 4 counts, hold for 7, exhale for 8.",
  },
  {
    emoji: "🤸‍♀️",
    name: "Étirements Doux (Gentle Stretching)",
    trimester: ["1st Trimester", "2nd Trimester", "3rd Trimester"],
    duration: "15–20 min / day",
    difficulty: "Easy",
    description:
      "Light stretching relieves muscle tension, improves posture, and reduces common pregnancy discomforts like back pain, hip tightness, and leg cramps. Best done in the morning.",
    tips: "Hold each stretch for 20–30 seconds. Never stretch to the point of pain or discomfort.",
  },
  {
    emoji: "🏋️‍♀️",
    name: "Exercices de Kegel",
    trimester: ["1st Trimester", "2nd Trimester", "3rd Trimester"],
    duration: "10 min / day",
    difficulty: "Easy",
    description:
      "Pelvic floor exercises that strengthen the muscles supporting the uterus, bladder, and bowel. Helps with labor and recovery. Reduces risk of urinary incontinence.",
    tips: "Contract your pelvic floor for 5 seconds, relax for 5 seconds. Repeat 10–15 times per set.",
  },
  {
    emoji: "🐱",
    name: "Posture Chat-Vache (Cat-Cow Pose)",
    trimester: ["1st Trimester", "2nd Trimester"],
    duration: "10 min / session",
    difficulty: "Easy",
    description:
      "A classic yoga movement done on hands and knees that gently mobilizes the spine, relieves lower back pain, and helps position the baby optimally in the second trimester.",
    tips: "Move slowly and synchronize with your breath. Avoid if you experience wrist pain — use fists instead.",
  },
  {
    emoji: "🦆",
    name: "Squats Doux (Gentle Squats)",
    trimester: ["2nd Trimester"],
    duration: "3 sets of 10 reps",
    difficulty: "Moderate",
    description:
      "Gentle squats strengthen the thighs, glutes, and pelvic floor, which can help with labor and delivery. A powerful and safe pregnancy exercise when done correctly.",
    tips: "Keep your back straight and feet shoulder-width apart. Hold onto a chair or wall for balance.",
  },
  {
    emoji: "🧎‍♀️",
    name: "Pilates Prénatal",
    trimester: ["2nd Trimester", "3rd Trimester"],
    duration: "30–40 min / session",
    difficulty: "Moderate",
    description:
      "Prenatal Pilates focuses on core stability, posture, and breathing. Safe for pregnancy when adapted by a certified instructor. Helps reduce back pain and prepares for labor.",
    tips: "Seek a certified prenatal Pilates instructor. Avoid exercises on your back in the third trimester.",
  },
  {
    emoji: "🛌",
    name: "Relaxation Guidée (Guided Relaxation)",
    trimester: ["3rd Trimester"],
    duration: "15–20 min / session",
    difficulty: "Easy",
    description:
      "Progressive muscle relaxation and guided imagery techniques help manage anxiety, improve sleep quality, and reduce stress hormones in the final weeks of pregnancy.",
    tips: "Practice in a quiet, dimly lit room. Use a pregnancy pillow for side-lying relaxation. Excellent before sleep.",
  },
];

export default function ExercisesPage() {
  const router = useRouter();
  const [activeTrimester, setActiveTrimester] = useState("All");

  const filtered = EXERCISES.filter(
    (e) => activeTrimester === "All" || e.trimester.includes(activeTrimester)
  );

  const difficultyColor = (d: string) => {
    if (d === "Easy") return "text-emerald-700 bg-emerald-50";
    if (d === "Moderate") return "text-amber-700 bg-amber-50";
    return "text-rose-700 bg-rose-50";
  };

  return (
    <>
      {/* Back */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#F46A6A] transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        </div>
      </div>

      {/* Hero */}
      <section
        className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff5f5 0%, #ffe0e0 50%, #fecdd3 100%)" }}
      >
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#F46A6A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#F46A6A] bg-white/70 px-3 py-1 rounded-full mb-4 shadow-sm">
            Stay Active
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
            Prenatal <span className="text-[#F46A6A]">Fitness</span> &amp; Exercises
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Safe and effective exercises for every stage of your pregnancy journey.
            Stay healthy, active, and confident — adapted for Algerian mothers.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 mb-4 font-medium">Filter by trimester</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TRIMESTERS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTrimester(t)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                  activeTrimester === t
                    ? "bg-[#F46A6A] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-[#F46A6A]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 text-center max-w-lg mx-auto">
            {[
              { value: `${filtered.length}`, label: "Exercises" },
              { value: "3", label: "Trimesters" },
              { value: "100%", label: "Pregnancy Safe" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold text-[#F46A6A]">{s.value}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Cards */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {activeTrimester === "All" ? "All Exercises" : `Exercises for ${activeTrimester}`}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Approved by maternal health specialists. Always listen to your body and stop if you feel any discomfort.
            </p>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((ex) => (
                <div
                  key={ex.name}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center text-2xl shadow-md shrink-0">
                      {ex.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-2">
                        {ex.name}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {ex.trimester.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-semibold text-[#F46A6A] bg-rose-50 px-2 py-0.5 rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${difficultyColor(ex.difficulty)}`}>
                          {ex.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                    {ex.description}
                  </p>

                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500 w-16 shrink-0">Duration</span>
                      <span className="text-xs text-gray-700 font-medium">{ex.duration}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-500 w-16 shrink-0 pt-0.5">Tip</span>
                      <span className="text-xs text-gray-500 leading-relaxed">{ex.tips}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🤸‍♀️</span>
              <p className="text-gray-500 text-sm">No exercises found for this trimester.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-rose-50 to-pink-50 rounded-2xl p-8 sm:p-12 text-center">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#F46A6A] bg-white/70 px-3 py-1 rounded-full mb-3">
              Your Wellness Plan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Get a Personalized Exercise Plan
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Book a session with one of our certified prenatal fitness midwives and get a
              customized plan tailored to your pregnancy stage and health condition.
            </p>
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center text-sm font-semibold text-white bg-[#F46A6A] px-7 py-3 rounded-full hover:bg-[#e55d5d] transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Book a Midwife Session
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
