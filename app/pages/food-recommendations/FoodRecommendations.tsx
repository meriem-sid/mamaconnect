"use client";

import { useRouter } from "next/navigation";

const RECOMMENDED_MEALS = [
  {
    name: "Spinach & Lentil Soup",
    nutrients: ["Iron", "Folate", "Protein"],
    description: "Rich in iron and folate — vital for your baby's neural tube development and your own energy levels.",
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    badge: "text-emerald-700",
    emoji: "🥣",
  },
  {
    name: "Salmon with Quinoa",
    nutrients: ["Omega-3", "Protein", "B12"],
    description: "Omega-3 fatty acids support your baby's brain and eye development during the first trimester.",
    gradient: "from-blue-400 to-cyan-500",
    bg: "bg-blue-50",
    badge: "text-blue-700",
    emoji: "🍽️",
  },
  {
    name: "Greek Yogurt Parfait",
    nutrients: ["Calcium", "Probiotics", "Vitamin D"],
    description: "Calcium strengthens your baby's bones. Layer with berries and oats for a complete breakfast.",
    gradient: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    badge: "text-violet-700",
    emoji: "🫐",
  },
  {
    name: "Avocado Toast with Egg",
    nutrients: ["Healthy Fats", "Choline", "Protein"],
    description: "Choline from eggs supports fetal brain development. Avocado provides heart-healthy monounsaturated fats.",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    badge: "text-amber-700",
    emoji: "🥑",
  },
  {
    name: "Chicken & Sweet Potato Bowl",
    nutrients: ["Vitamin A", "Protein", "Fibre"],
    description: "Sweet potato is packed with beta-carotene (Vitamin A), essential for your baby's skin and eye development.",
    gradient: "from-rose-400 to-pink-500",
    bg: "bg-rose-50",
    badge: "text-rose-700",
    emoji: "🍠",
  },
  {
    name: "Banana & Oat Smoothie",
    nutrients: ["Potassium", "Magnesium", "Fibre"],
    description: "A quick snack that helps ease leg cramps and morning sickness while keeping your energy steady.",
    gradient: "from-yellow-400 to-amber-400",
    bg: "bg-yellow-50",
    badge: "text-yellow-700",
    emoji: "🍌",
  },
];

const FOODS_TO_AVOID = [
  {
    name: "Raw or Undercooked Meat",
    reason: "Risk of toxoplasmosis and salmonella infection which can harm your baby.",
    icon: "🥩",
  },
  {
    name: "High-Mercury Fish",
    reason: "Swordfish, shark, and king mackerel contain mercury levels dangerous to fetal brain development.",
    icon: "🐟",
  },
  {
    name: "Unpasteurised Dairy",
    reason: "Raw milk and soft cheeses like brie or camembert may contain listeria bacteria.",
    icon: "🧀",
  },
  {
    name: "Raw Sprouts",
    reason: "Alfalfa, clover, and bean sprouts can harbour salmonella and E. coli.",
    icon: "🌱",
  },
  {
    name: "Excessive Caffeine",
    reason: "Keep caffeine under 200 mg/day. High intake is linked to low birth weight.",
    icon: "☕",
  },
  {
    name: "Alcohol",
    reason: "No amount of alcohol is proven safe during pregnancy. It can cause fetal alcohol spectrum disorders.",
    icon: "🍷",
  },
];

const DAILY_TIPS = [
  {
    title: "Folic Acid",
    amount: "400–800 mcg/day",
    tip: "Take a folic acid supplement and eat leafy greens, fortified cereals, and legumes to prevent neural tube defects.",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
  {
    title: "Iron",
    amount: "27 mg/day",
    tip: "Pair iron-rich foods (red meat, lentils, spinach) with Vitamin C sources to boost absorption. Avoid taking iron with calcium.",
    color: "from-rose-400 to-pink-500",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
  {
    title: "Calcium",
    amount: "1,000 mg/day",
    tip: "Your baby's bones and teeth need calcium. Dairy, fortified plant milks, and broccoli are great sources.",
    color: "from-blue-400 to-cyan-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    title: "Protein",
    amount: "75–100 g/day",
    tip: "Essential for your baby's growth. Aim for chicken, fish, eggs, dairy, beans, or tofu at every meal.",
    color: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
  {
    title: "Hydration",
    amount: "8–10 glasses/day",
    tip: "Staying well-hydrated helps prevent urinary tract infections, constipation, and preterm labour risk.",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    title: "Omega-3",
    amount: "200–300 mg DHA/day",
    tip: "Supports your baby's brain, eye, and nervous system development. Oily fish (2x/week) or algae-based supplements.",
    color: "from-teal-400 to-cyan-500",
    bg: "bg-teal-50",
    text: "text-teal-700",
  },
];

export default function FoodRecommendations() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="relative py-12 sm:py-16 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #d1fae5 50%, #a7f3d0 100%)" }}
      >
        <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900 mb-6 transition-colors"
          >
            ← Back
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-2xl shadow-lg shadow-emerald-400/30">
              🥗
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-white/70 px-3 py-1 rounded-full">
                Nutrition Guide
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">
                Food Recommendations
              </h1>
            </div>
          </div>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Nourish yourself and your baby with expert-curated meal ideas, foods to avoid, and daily nutrition targets during pregnancy.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 space-y-14">

        {/* ── Recommended Meals ── */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recommended Meals</h2>
            <p className="text-sm text-gray-500 mt-0.5">Nutrient-dense options curated for each stage of pregnancy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RECOMMENDED_MEALS.map((meal) => (
              <div
                key={meal.name}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${meal.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className={`relative w-12 h-12 rounded-xl bg-linear-to-br ${meal.gradient} text-white flex items-center justify-center text-xl mb-4 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300`}>
                  {meal.emoji}
                </div>
                <h3 className="relative font-semibold text-gray-900 text-base mb-2">{meal.name}</h3>
                <p className="relative text-xs text-gray-500 leading-relaxed mb-4">{meal.description}</p>
                <div className="relative flex flex-wrap gap-1.5">
                  {meal.nutrients.map((n) => (
                    <span key={n} className={`text-[10px] font-semibold uppercase tracking-wider ${meal.badge} ${meal.bg} px-2.5 py-0.5 rounded-full`}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Foods to Avoid ── */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Foods to Avoid</h2>
            <p className="text-sm text-gray-500 mt-0.5">Keep yourself and your baby safe by steering clear of these during pregnancy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FOODS_TO_AVOID.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Avoid</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.reason}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Daily Nutrition Tips ── */}
        <section className="pb-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Daily Nutrition Tips</h2>
            <p className="text-sm text-gray-500 mt-0.5">Key nutrients and recommended daily amounts for pregnant women.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DAILY_TIPS.map((tip) => (
              <div key={tip.title} className={`${tip.bg} rounded-2xl p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${tip.text}`}>{tip.title}</span>
                  <span className={`text-xs font-semibold ${tip.text} bg-white/60 px-2.5 py-0.5 rounded-full`}>
                    {tip.amount}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
