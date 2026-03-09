"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/components/auth/AuthContext";
import Sidebar from "@/app/components/dashboard/Sidebar";
import HeaderBar from "@/app/components/dashboard/HeaderBar";
import { PREGNANCY_WEEK } from "@/app/components/dashboard/data";

/* ─── Types ──────────────────────────────────────────────────────── */

type Severity = "mild" | "moderate" | "severe";

interface LoggedSymptom {
  symptomId: string;
  label: string;
  emoji: string;
  severity: Severity;
}

interface RecommendationsContext {
  symptoms: LoggedSymptom[];
  savedAt: string;
}

/* ─── Food Catalog ───────────────────────────────────────────────── */

const FOOD_CATALOG = [
  { id: "spinach_lentil",       name: "Spinach & Lentil Soup",       nutrients: "Iron, Folate, Protein",            emoji: "🥘", color: "from-emerald-400 to-teal-500" },
  { id: "salmon_quinoa",        name: "Salmon with Quinoa",           nutrients: "Omega-3, Protein, B12",            emoji: "🍣", color: "from-blue-400 to-cyan-500" },
  { id: "greek_yogurt",         name: "Greek Yogurt Parfait",         nutrients: "Calcium, Probiotics, Vitamin D",   emoji: "🫐", color: "from-violet-400 to-purple-500" },
  { id: "avocado_toast",        name: "Avocado Toast with Egg",       nutrients: "Healthy Fats, Choline, Protein",   emoji: "🥑", color: "from-green-400 to-emerald-500" },
  { id: "chicken_sweet_potato", name: "Chicken & Sweet Potato Bowl",  nutrients: "Vitamin A, Protein, Fibre",        emoji: "🍠", color: "from-orange-400 to-amber-500" },
  { id: "banana_smoothie",      name: "Banana & Oat Smoothie",        nutrients: "Potassium, Magnesium, Fibre",      emoji: "🍌", color: "from-yellow-400 to-orange-400" },
];

/* ─── Exercise Catalog ───────────────────────────────────────────── */

const EXERCISE_CATALOG = [
  { id: "walking",    name: "Daily Walking",        duration: "20–30 min/day",     difficulty: "Easy" as const,     benefit: "Boosts circulation and energy levels" },
  { id: "yoga",       name: "Prenatal Yoga",         duration: "30–45 min/session", difficulty: "Moderate" as const, benefit: "Reduces stress and improves flexibility" },
  { id: "breathing",  name: "Breathing Exercises",   duration: "10–15 min/day",     difficulty: "Easy" as const,     benefit: "Calms the nervous system and eases nausea" },
  { id: "stretching", name: "Gentle Stretching",     duration: "15–20 min/day",     difficulty: "Easy" as const,     benefit: "Relieves muscle tension and back pain" },
  { id: "relaxation", name: "Guided Relaxation",     duration: "15–20 min/session", difficulty: "Easy" as const,     benefit: "Promotes deep sleep and reduces anxiety" },
  { id: "catcow",     name: "Cat-Cow Pose",          duration: "10 min/session",    difficulty: "Easy" as const,     benefit: "Relieves back pain and improves posture" },
  { id: "kegel",      name: "Kegel Exercises",       duration: "10 min/day",        difficulty: "Easy" as const,     benefit: "Strengthens pelvic floor for childbirth" },
  { id: "swimming",   name: "Gentle Swimming",       duration: "20–40 min/session", difficulty: "Easy" as const,     benefit: "Low-impact full-body workout, reduces swelling" },
];

/* ─── Symptom → Recommendation Mapping ──────────────────────────── */

const SYMPTOM_RECS: Record<string, { foodIds: string[]; exerciseIds: string[]; tip: string; premiumInsight: string }> = {
  nausea:              { foodIds: ["greek_yogurt", "banana_smoothie"],          exerciseIds: ["breathing", "stretching"],    tip: "Eat small meals every 2–3 hours. Avoid spicy or greasy foods. Ginger tea can help.",            premiumInsight: "Vitamin B6 (25mg, 3×/day) combined with ginger extract reduces nausea by up to 75% clinically." },
  vomiting:            { foodIds: ["banana_smoothie", "greek_yogurt"],          exerciseIds: ["breathing"],                  tip: "Sip cold water or clear fluids slowly. Cold foods are usually better tolerated.",               premiumInsight: "Track vomiting episodes in your AI log. Hydration IV protocol suggested if >3 episodes/day." },
  heartburn:           { foodIds: ["greek_yogurt", "avocado_toast"],            exerciseIds: ["walking", "stretching"],      tip: "Avoid lying down after eating. Elevate your head while sleeping. Eat smaller meals.",           premiumInsight: "Sleep on left side + head elevated by 15cm. Your meal plan staggers meal timing to reduce acid." },
  bloating:            { foodIds: ["banana_smoothie", "avocado_toast"],         exerciseIds: ["walking", "kegel"],           tip: "Eat slowly and chew well. Warm water before meals aids digestion.",                            premiumInsight: "Targeted probiotic protocol (Lactobacillus rhamnosus, 10B CFU/day) reduces bloating by ~60%." },
  constipation:        { foodIds: ["banana_smoothie", "avocado_toast"],         exerciseIds: ["walking", "yoga"],            tip: "Increase fiber to 35g/day. Stay well-hydrated — aim for 10 glasses of water daily.",             premiumInsight: "Your personalized meal plan adds soluble fibre timing around meals for optimal gut transit." },
  food_aversion:       { foodIds: ["banana_smoothie", "greek_yogurt"],          exerciseIds: ["breathing"],                  tip: "Cold foods have less aroma and are usually more tolerable. Focus on what you can manage.",       premiumInsight: "Aversions peak at weeks 8–10. Your AI plan substitutes aversion triggers with equal-nutrient alternatives." },
  fatigue:             { foodIds: ["spinach_lentil", "chicken_sweet_potato"],   exerciseIds: ["walking", "relaxation"],      tip: "Iron deficiency is the #1 cause of pregnancy fatigue. Eat iron-rich foods with Vitamin C.",     premiumInsight: "Your iron level is below target. Pair iron-rich meals with 100mg Vitamin C — doubles absorption." },
  back_pain:           { foodIds: ["salmon_quinoa"],                             exerciseIds: ["catcow", "yoga"],             tip: "Avoid standing for long periods. Sleep with a pregnancy pillow between your knees.",             premiumInsight: "3×/week Cat-Cow + Prenatal Yoga sequence targets lumbar support — 70% pain reduction in studies." },
  pelvic_pain:         { foodIds: ["salmon_quinoa"],                             exerciseIds: ["kegel", "yoga"],              tip: "Avoid asymmetric activities. Apply a warm pack to the area for 15 minutes twice daily.",         premiumInsight: "Pelvic floor PT (3 sessions) + targeted Kegel schedule included in your premium workout plan." },
  breast_tenderness:   { foodIds: ["salmon_quinoa", "avocado_toast"],           exerciseIds: ["yoga", "stretching"],         tip: "Wear a supportive bra at all times, including nights. Reduce caffeine intake significantly.",     premiumInsight: "DHA 200mg/day reduces breast inflammation. Added to your supplement schedule this week." },
  swelling:            { foodIds: ["banana_smoothie", "spinach_lentil"],        exerciseIds: ["swimming", "walking"],        tip: "Elevate feet when sitting. Reduce sodium and increase potassium-rich foods.",                  premiumInsight: "Magnesium 300mg before bed + compression stockings protocol. Reduces edema by ~45%." },
  leg_cramps:          { foodIds: ["banana_smoothie", "spinach_lentil"],        exerciseIds: ["stretching", "swimming"],     tip: "Stretch calves before bed. Increase magnesium and potassium in your diet.",                    premiumInsight: "Magnesium glycinate 200mg nightly + Potassium 4,700mg/day through food. Added to your plan." },
  braxton_hicks:       { foodIds: ["banana_smoothie"],                           exerciseIds: ["breathing", "relaxation"],   tip: "Change position and rest when they occur. Dehydration is a common trigger.",                    premiumInsight: "Personalized hydration targets per trimester + frequency tracking in your AI dashboard." },
  headache:            { foodIds: ["banana_smoothie", "salmon_quinoa"],         exerciseIds: ["breathing", "relaxation"],    tip: "Stay hydrated — most pregnancy headaches are dehydration-related. Rest in a quiet room.",       premiumInsight: "Magnesium 400mg/day reduces pregnancy headache frequency by 50%. Added to your schedule." },
  dizziness:           { foodIds: ["spinach_lentil", "chicken_sweet_potato"],   exerciseIds: ["breathing", "walking"],       tip: "Stand up very slowly. Eat small, regular meals to keep blood sugar stable.",                   premiumInsight: "Orthostatic hypotension risk noted. Personalized iron + hydration protocol in your plan." },
  smell_sensitivity:   { foodIds: ["greek_yogurt", "banana_smoothie"],          exerciseIds: ["breathing"],                  tip: "Keep windows open. Choose bland, cold foods which have minimal aroma.",                        premiumInsight: "Peaks at weeks 8–10. Your aroma-neutral meal plan adapts weekly during this period." },
  vision_changes:      { foodIds: ["salmon_quinoa", "avocado_toast"],           exerciseIds: ["relaxation"],                 tip: "Vision changes can indicate blood pressure shifts. Mention them at your next appointment.",     premiumInsight: "Omega-3 foods prioritised this week to support microvascular health. Monitor BP closely." },
  nasal_congestion:    { foodIds: ["spinach_lentil", "chicken_sweet_potato"],   exerciseIds: ["breathing", "yoga"],          tip: "Use a humidifier and saline nasal spray. Stay well-hydrated.",                               premiumInsight: "Vitamin C 500mg/day from food sources reduces pregnancy rhinitis. Added to your plan." },
  mood_changes:        { foodIds: ["salmon_quinoa", "greek_yogurt"],             exerciseIds: ["yoga", "relaxation"],         tip: "Share how you feel with someone you trust. 5 minutes of daily mindfulness helps significantly.", premiumInsight: "Omega-3 DHA + Vitamin D deficiency linked to mood shifts. Personalised protocol added." },
  anxiety:             { foodIds: ["greek_yogurt", "salmon_quinoa"],             exerciseIds: ["yoga", "relaxation", "breathing"], tip: "Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s. Limit news and social media exposure.", premiumInsight: "8-week mindfulness + Magnesium protocol shows 60% anxiety reduction. Your AI assistant guides each session." },
  insomnia:            { foodIds: ["banana_smoothie", "greek_yogurt"],           exerciseIds: ["relaxation", "breathing"],    tip: "Keep a consistent sleep schedule. Avoid screens 1 hour before bed. Sleep on your left side.",  premiumInsight: "Melatonin 0.5mg + personalised sleep hygiene protocol in your premium plan." },
  forgetfulness:       { foodIds: ["salmon_quinoa", "avocado_toast"],            exerciseIds: ["walking", "yoga"],            tip: "'Pregnancy brain' is normal. Use a notes app. Stay rested.",                                 premiumInsight: "Choline 450mg/day and DHA are critical for cognition. Optimised in your nutrition plan." },
  shortness_of_breath: { foodIds: ["spinach_lentil", "chicken_sweet_potato"],  exerciseIds: ["breathing", "yoga"],           tip: "Sit up straight to maximise lung capacity. Sleep propped up on pillows.",                    premiumInsight: "Diaphragmatic breathing exercises (3×/day) improve oxygenation. Added to your schedule." },
  frequent_urination:  { foodIds: ["banana_smoothie"],                           exerciseIds: ["kegel"],                      tip: "Lean slightly forward while urinating to fully empty your bladder. Reduce fluids near bedtime.", premiumInsight: "Targeted Kegel protocol reduces urgency episodes by 40% within 4 weeks." },
  spotting:            { foodIds: ["spinach_lentil", "avocado_toast"],           exerciseIds: ["relaxation"],                 tip: "Light spotting can be normal but always mention it to your midwife or doctor. Rest today.",    premiumInsight: "Track spotting timing, colour, and flow in your AI dashboard. Alert midwife if it increases." },
};

const DEFAULT_RECS = {
  foodIds: ["banana_smoothie", "spinach_lentil"],
  exerciseIds: ["walking", "breathing"],
  tip: "Listen to your body, stay hydrated, and rest when you need to.",
  premiumInsight: "Your AI health assistant will provide personalised guidance based on your symptom patterns over time.",
};

/* ─── Premium Daily Meal Plan ────────────────────────────────────── */

const PREMIUM_MEALS = [
  { time: "7:00 AM",  slot: "Breakfast",         suggestion: "Greek Yogurt Parfait with berries & granola", emoji: "🫐", reason: "Probiotics ease morning nausea; calcium supports bone development" },
  { time: "10:00 AM", slot: "Morning Snack",      suggestion: "Banana with almond butter",                  emoji: "🍌", reason: "Potassium & magnesium reduce cramps and steady blood sugar" },
  { time: "1:00 PM",  slot: "Lunch",              suggestion: "Spinach & Lentil Soup with whole-wheat bread", emoji: "🥘", reason: "Iron + folate combat fatigue; fibre prevents constipation" },
  { time: "3:30 PM",  slot: "Afternoon Snack",    suggestion: "Avocado Toast (half portion) with sesame",   emoji: "🥑", reason: "Choline & healthy fats support baby brain development" },
  { time: "7:00 PM",  slot: "Dinner",             suggestion: "Salmon with Quinoa & steamed greens",        emoji: "🍣", reason: "Omega-3 DHA for neural development; protein for growth" },
  { time: "9:00 PM",  slot: "Evening (if needed)",suggestion: "Small Banana & Oat Smoothie",                emoji: "🥤", reason: "Magnesium promotes better sleep quality" },
];

/* ─── Premium Weekly Workout Plan ────────────────────────────────── */

const PREMIUM_WORKOUTS = [
  { days: "Mon · Wed · Fri", type: "Morning Routine",  exercises: ["20 min Gentle Walking", "10 min Breathing Exercises", "5 min Kegel Exercises"],       duration: "35 min", color: "bg-blue-50 border-blue-200" },
  { days: "Tue · Thu",       type: "Yoga Session",     exercises: ["5 min warm-up stretching", "30 min Prenatal Yoga", "10 min Guided Relaxation"],       duration: "45 min", color: "bg-violet-50 border-violet-200" },
  { days: "Saturday",        type: "Aquatic Session",  exercises: ["30 min Gentle Swimming", "10 min poolside stretching"],                               duration: "40 min", color: "bg-cyan-50 border-cyan-200" },
  { days: "Sunday",          type: "Rest Day",         exercises: ["10 min gentle stretching (optional)", "15 min Guided Relaxation meditation"],          duration: "15 min", color: "bg-green-50 border-green-200" },
];

/* ─── AI Response Generator ──────────────────────────────────────── */

function generateAIResponse(symptoms: LoggedSymptom[], week: number): string {
  const severe   = symptoms.filter((s) => s.severity === "severe");
  const moderate = symptoms.filter((s) => s.severity === "moderate");
  const top      = [...severe, ...moderate].slice(0, 3);

  const topText = top.length > 0
    ? top.map((s) => `${s.emoji} ${s.label} (${s.severity})`).join(", ")
    : symptoms.slice(0, 2).map((s) => `${s.emoji} ${s.label}`).join(", ");

  const severeAlert = severe.length > 0
    ? `\n\nI have noted **${severe[0].label}** at severe intensity. Please monitor this closely and mention it at your next prenatal appointment if it persists for more than 24 hours.`
    : "";

  return `Based on your symptom log today — ${topText} — at Week ${week} of your pregnancy:\n\nThese symptoms are consistent with normal Week ${week} changes. The personalized nutrition and workout plan above is calibrated specifically for your current symptom profile.${severeAlert}\n\n**Key action for today:** Follow your meal timing plan closely — eating every 2–3 hours is the single most effective intervention for your current symptom combination. Your morning Breathing Exercises (10 minutes) will also significantly help with any nausea or anxiety you are experiencing.\n\nLog your symptoms again tomorrow to track your progress over time.`;
}

/* ─── Component ──────────────────────────────────────────────────── */

export default function RecommendationsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const loggingOut = useRef(false);

  const [context, setContext] = useState<RecommendationsContext | null>(null);
  const [contextLoaded, setContextLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && !user && !loggingOut.current) {
      router.replace("/auth?mode=login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mama_recommendations_context");
      if (raw) setContext(JSON.parse(raw));
    } catch {
      // ignore
    } finally {
      setContextLoaded(true);
    }
  }, []);

  function handleLogout() {
    loggingOut.current = true;
    logout();
    router.push("/");
  }

  if (isLoading || !user || !contextLoaded) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#F46A6A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  const isPremium = user.plan === "premium";
  const symptoms  = context?.symptoms ?? [];

  // Aggregate recommended food & exercise IDs from all logged symptoms
  const foodIdsOrdered:     string[] = [];
  const exerciseIdsOrdered: string[] = [];
  const tips:               string[] = [];
  const premiumInsights:    string[] = [];

  symptoms.forEach((s) => {
    const rec = SYMPTOM_RECS[s.symptomId] ?? DEFAULT_RECS;
    rec.foodIds.forEach((id) => { if (!foodIdsOrdered.includes(id)) foodIdsOrdered.push(id); });
    rec.exerciseIds.forEach((id) => { if (!exerciseIdsOrdered.includes(id)) exerciseIdsOrdered.push(id); });
    tips.push(rec.tip);
    premiumInsights.push(rec.premiumInsight);
  });

  if (symptoms.length === 0) {
    foodIdsOrdered.push(...DEFAULT_RECS.foodIds);
    exerciseIdsOrdered.push(...DEFAULT_RECS.exerciseIds);
    tips.push(DEFAULT_RECS.tip);
    premiumInsights.push(DEFAULT_RECS.premiumInsight);
  }

  const foodLimit     = isPremium ? 6 : 4;
  const exerciseLimit = isPremium ? 8 : 3;

  const recommendedFoods     = foodIdsOrdered.slice(0, foodLimit).map((id) => FOOD_CATALOG.find((f) => f.id === id)!).filter(Boolean);
  const recommendedExercises = exerciseIdsOrdered.slice(0, exerciseLimit).map((id) => EXERCISE_CATALOG.find((e) => e.id === id)!).filter(Boolean);

  const severityBadge: Record<Severity, string> = {
    mild:     "bg-green-100 text-green-700",
    moderate: "bg-amber-100 text-amber-700",
    severe:   "bg-red-100 text-red-700",
  };

  const aiMessage = generateAIResponse(symptoms, PREGNANCY_WEEK);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab="symptoms"
        onTabChange={() => {}}
        userName={user.name}
        userEmail={user.email}
      />

      <div className="flex-1 ml-64">
        <HeaderBar activeTab="symptoms" user={user} onLogout={handleLogout} />

        <main className="min-h-[calc(100vh-4rem)]">

          {/* ── Page Header ─────────────────────────────────────── */}
          <section
            className="relative pt-8 pb-10 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #fdf4ff 0%, #ede9fe 50%, #ddd6fe 100%)" }}
          >
            <div className="absolute top-8 right-10 w-64 h-64 bg-fuchsia-300/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
              {/* Back link */}
              <button
                onClick={() => router.push("/dashboard/symptoms")}
                className="flex items-center gap-2 text-sm text-fuchsia-600 hover:text-fuchsia-800 mb-5 transition-colors cursor-pointer group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to Symptoms Tracker
              </button>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-fuchsia-400 to-purple-500 flex items-center justify-center text-2xl shadow-lg shadow-fuchsia-300/30 shrink-0">
                  ✨
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <span className="inline-block text-xs font-semibold tracking-wider uppercase text-fuchsia-600 bg-white/70 px-3 py-1 rounded-full shadow-sm">
                      {isPremium ? "Premium Wellness Plan" : "Wellness Suggestions"}
                    </span>
                    {isPremium && (
                      <span className="inline-block text-xs font-bold text-white bg-linear-to-r from-[#F46A6A] to-[#FBC4AB] px-3 py-1 rounded-full shadow-sm">
                        ⭐ Premium
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                    Your Wellness Recommendations
                  </h1>
                  <p className="text-gray-600 max-w-xl text-sm mb-4">
                    {isPremium
                      ? "A fully personalised nutrition plan, workout routine, and AI health guidance — crafted around your symptoms today."
                      : "Based on your logged symptoms, here are our top food and exercise suggestions to support you."}
                  </p>

                  {/* Symptoms chips */}
                  {symptoms.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {symptoms.map((s) => (
                        <span
                          key={s.symptomId}
                          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/80 border border-fuchsia-200 text-fuchsia-800 font-medium shadow-sm"
                        >
                          {s.emoji} {s.label}
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 ${severityBadge[s.severity]}`}>
                            {s.severity}
                          </span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-fuchsia-500 italic">No symptoms logged — showing general recommendations.</p>
                  )}
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8 space-y-10">

            {/* ── NUTRITION ─────────────────────────────────────── */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isPremium ? "Personalised Daily Meal Plan" : "Suggested Nutrition"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {isPremium
                      ? `Meal timing optimised for Week ${PREGNANCY_WEEK} and your symptom profile`
                      : "Foods from our nutrition guide that may help with your symptoms"}
                  </p>
                </div>
                <Link
                  href="/food-recommendations"
                  className="text-sm font-semibold text-[#F46A6A] hover:text-[#e55d5d] transition-colors hidden sm:block"
                >
                  View all foods →
                </Link>
              </div>

              {isPremium ? (
                /* Premium: full day schedule */
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  {PREMIUM_MEALS.map((meal, i) => (
                    <div
                      key={meal.slot}
                      className={`flex items-start gap-4 px-6 py-4 ${i < PREMIUM_MEALS.length - 1 ? "border-b border-gray-50" : ""}`}
                    >
                      <div className="w-16 shrink-0 text-right">
                        <span className="text-xs font-semibold text-gray-400">{meal.time}</span>
                      </div>
                      <div className="w-px self-stretch bg-gray-100 shrink-0" />
                      <div className="text-2xl shrink-0 mt-0.5">{meal.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-500 mb-0.5">{meal.slot}</p>
                        <p className="text-sm font-semibold text-gray-900">{meal.suggestion}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{meal.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Free: food cards grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {recommendedFoods.map((food) => (
                    <div key={food.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${food.color} flex items-center justify-center text-2xl mb-3 shadow-md shadow-black/10`}>
                        {food.emoji}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{food.name}</h3>
                      <p className="text-xs text-gray-500">{food.nutrients}</p>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/food-recommendations"
                className="mt-4 inline-block text-sm font-semibold text-[#F46A6A] hover:text-[#e55d5d] transition-colors sm:hidden"
              >
                View all foods →
              </Link>
            </section>

            {/* ── EXERCISE ──────────────────────────────────────── */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {isPremium ? "Personalised Workout Routine" : "Suggested Exercises"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {isPremium
                      ? "Weekly schedule tailored to your symptoms and pregnancy stage"
                      : "Gentle prenatal exercises from our fitness guide"}
                  </p>
                </div>
                <Link
                  href="/exercises"
                  className="text-sm font-semibold text-[#F46A6A] hover:text-[#e55d5d] transition-colors hidden sm:block"
                >
                  View all exercises →
                </Link>
              </div>

              {isPremium ? (
                /* Premium: weekly workout schedule */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PREMIUM_WORKOUTS.map((day) => (
                    <div key={day.type} className={`rounded-2xl border p-5 ${day.color}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{day.days}</p>
                          <h3 className="font-bold text-gray-900 text-sm mt-0.5">{day.type}</h3>
                        </div>
                        <span className="text-xs font-semibold text-gray-500 bg-white/70 px-2.5 py-1 rounded-full">{day.duration}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {day.exercises.map((ex) => (
                          <li key={ex} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                /* Free: exercise cards */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendedExercises.map((ex) => (
                    <div key={ex.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          ex.difficulty === "Easy"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {ex.difficulty}
                        </span>
                        <span className="text-xs text-gray-400">{ex.duration}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{ex.name}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{ex.benefit}</p>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href="/exercises"
                className="mt-4 inline-block text-sm font-semibold text-[#F46A6A] hover:text-[#e55d5d] transition-colors sm:hidden"
              >
                View all exercises →
              </Link>
            </section>

            {/* ── WELLNESS TIPS (Free only, shown instead of AI) ── */}
            {!isPremium && tips.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">Quick Wellness Tips</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...new Set(tips)].slice(0, 4).map((tip, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex gap-3">
                      <span className="text-lg shrink-0 mt-0.5">💡</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── AI HEALTH ASSISTANT (Premium only) ────────────── */}
            {isPremium && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">AI Health Assistant</h2>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                      AI
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">MamaConnect AI · Week {PREGNANCY_WEEK}</p>
                      <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {aiMessage.split("**").map((part, i) =>
                          i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Premium insights from symptoms */}
                  {premiumInsights.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-gray-50 space-y-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Symptom-Specific Insights</p>
                      {[...new Set(premiumInsights)].slice(0, 4).map((insight, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F46A6A] mt-1.5 shrink-0" />
                          <p className="text-xs text-gray-600 leading-relaxed">{insight}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ── PREMIUM UPSELL (Free only) ─────────────────────── */}
            {!isPremium && (
              <section className="pb-10">
                <div
                  className="relative rounded-2xl overflow-hidden p-6 sm:p-8"
                  style={{ background: "linear-gradient(135deg, #fff5f5 0%, #ffe0e0 50%, #fecdd3 100%)" }}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#F46A6A]/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-2xl shadow-lg shadow-rose-300/30 shrink-0">
                      ⭐
                    </div>

                    <div className="flex-1">
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#F46A6A] mb-1">Upgrade to Premium</span>
                      <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                        Get Personalised Meals, Workouts & AI Guidance
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 max-w-lg">
                        Premium members receive a fully personalised daily meal plan, a structured weekly workout routine, and AI health guidance — all adapted to their specific symptoms and pregnancy week every single day.
                      </p>

                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                        {[
                          "Personalised daily meal plan",
                          "Weekly workout schedule",
                          "AI symptom-based health insights",
                          "Symptom-specific supplement guidance",
                          "Wearable device integration",
                          "Unlimited AI chatbot sessions",
                        ].map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F46A6A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {feat}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => router.push("/dashboard?tab=shop")}
                        className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-linear-to-r from-[#F46A6A] to-[#FBC4AB] text-white font-bold text-sm shadow-lg shadow-rose-300/40 hover:shadow-xl hover:shadow-rose-300/50 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      >
                        Get Premium
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
