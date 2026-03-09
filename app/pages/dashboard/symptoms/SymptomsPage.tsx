"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/auth/AuthContext";
import Sidebar from "@/app/components/dashboard/Sidebar";
import HeaderBar from "@/app/components/dashboard/HeaderBar";

/* ─── Types ─────────────────────────────────────────────────────── */

type Severity = "mild" | "moderate" | "severe";

interface SymptomEntry {
  id: string;
  label: string;
  emoji: string;
  category: string;
}

interface LoggedSymptom {
  symptomId: string;
  label: string;
  emoji: string;
  severity: Severity;
}

interface DayLog {
  date: string; // "YYYY-MM-DD"
  symptoms: LoggedSymptom[];
  notes: string;
  loggedAt: string; // ISO timestamp
}

/* ─── Symptom Catalogue ──────────────────────────────────────────── */

const SYMPTOM_CATEGORIES = [
  {
    category: "Digestive",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    activeBg: "bg-emerald-500",
    symptoms: [
      { id: "nausea", label: "Nausea", emoji: "🤢" },
      { id: "vomiting", label: "Vomiting", emoji: "🤮" },
      { id: "heartburn", label: "Heartburn", emoji: "🔥" },
      { id: "bloating", label: "Bloating", emoji: "🫧" },
      { id: "constipation", label: "Constipation", emoji: "😣" },
      { id: "food_aversion", label: "Food Aversions", emoji: "🚫" },
    ],
  },
  {
    category: "Physical",
    color: "from-rose-400 to-pink-500",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    activeBg: "bg-rose-500",
    symptoms: [
      { id: "fatigue", label: "Fatigue", emoji: "😴" },
      { id: "back_pain", label: "Back Pain", emoji: "🔙" },
      { id: "pelvic_pain", label: "Pelvic Pain", emoji: "⚡" },
      { id: "breast_tenderness", label: "Breast Tenderness", emoji: "💗" },
      { id: "swelling", label: "Swelling", emoji: "🦵" },
      { id: "leg_cramps", label: "Leg Cramps", emoji: "🦴" },
      { id: "braxton_hicks", label: "Braxton Hicks", emoji: "🌊" },
    ],
  },
  {
    category: "Head & Sensory",
    color: "from-violet-400 to-purple-500",
    bg: "bg-violet-50",
    text: "text-violet-700",
    border: "border-violet-200",
    activeBg: "bg-violet-500",
    symptoms: [
      { id: "headache", label: "Headache", emoji: "🤕" },
      { id: "dizziness", label: "Dizziness", emoji: "😵" },
      { id: "smell_sensitivity", label: "Smell Sensitivity", emoji: "👃" },
      { id: "vision_changes", label: "Vision Changes", emoji: "👁️" },
      { id: "nasal_congestion", label: "Nasal Congestion", emoji: "🤧" },
    ],
  },
  {
    category: "Emotional & Sleep",
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    activeBg: "bg-amber-500",
    symptoms: [
      { id: "mood_changes", label: "Mood Changes", emoji: "🎭" },
      { id: "anxiety", label: "Anxiety", emoji: "😰" },
      { id: "insomnia", label: "Insomnia", emoji: "🌙" },
      { id: "forgetfulness", label: "Forgetfulness", emoji: "🧠" },
    ],
  },
  {
    category: "Respiratory",
    color: "from-blue-400 to-cyan-500",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    activeBg: "bg-blue-500",
    symptoms: [
      { id: "shortness_of_breath", label: "Shortness of Breath", emoji: "💨" },
      { id: "frequent_urination", label: "Frequent Urination", emoji: "🚿" },
      { id: "spotting", label: "Light Spotting", emoji: "🩸" },
    ],
  },
];

const ALL_SYMPTOMS: (SymptomEntry & { category: string })[] = SYMPTOM_CATEGORIES.flatMap((cat) =>
  cat.symptoms.map((s) => ({ ...s, category: cat.category }))
);

const SEVERITY_OPTIONS: { value: Severity; label: string; color: string; bg: string }[] = [
  { value: "mild", label: "Mild", color: "text-green-700", bg: "bg-green-100 border-green-300" },
  { value: "moderate", label: "Moderate", color: "text-amber-700", bg: "bg-amber-100 border-amber-300" },
  { value: "severe", label: "Severe", color: "text-red-700", bg: "bg-red-100 border-red-300" },
];

const SEVERITY_BADGE: Record<Severity, string> = {
  mild: "bg-green-100 text-green-700",
  moderate: "bg-amber-100 text-amber-700",
  severe: "bg-red-100 text-red-700",
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (dateStr === todayKey()) return "Today";
  if (dateStr === yesterday.toISOString().slice(0, 10)) return "Yesterday";
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

/* ─── Component ──────────────────────────────────────────────────── */

export default function SymptomsPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const loggingOut = useRef(false);

  // Selection state
  const [selected, setSelected] = useState<Record<string, Severity>>({});
  const [notes, setNotes] = useState("");

  // History loaded from localStorage
  const [history, setHistory] = useState<DayLog[]>([]);

  useEffect(() => {
    if (!isLoading && !user && !loggingOut.current) {
      router.replace("/auth?mode=login");
    }
  }, [user, isLoading, router]);

  // Load history & today's draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem("mama_symptoms_history");
      if (raw) setHistory(JSON.parse(raw));
      const draft = localStorage.getItem("mama_symptoms_draft");
      if (draft) {
        const { selected: s, notes: n } = JSON.parse(draft);
        setSelected(s || {});
        setNotes(n || "");
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist draft as user builds their selection
  useEffect(() => {
    try {
      localStorage.setItem("mama_symptoms_draft", JSON.stringify({ selected, notes }));
    } catch {
      // ignore
    }
  }, [selected, notes]);

  function toggleSymptom(id: string) {
    setSelected((prev) => {
      if (id in prev) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: "mild" };
    });
  }

  function setSeverity(id: string, sev: Severity) {
    setSelected((prev) => ({ ...prev, [id]: sev }));
  }

  function handleLogSymptoms() {
    const today = todayKey();
    const logged: LoggedSymptom[] = Object.entries(selected).map(([id, severity]) => {
      const sym = ALL_SYMPTOMS.find((s) => s.id === id)!;
      return { symptomId: id, label: sym.label, emoji: sym.emoji, severity };
    });

    const entry: DayLog = {
      date: today,
      symptoms: logged,
      notes: notes.trim(),
      loggedAt: new Date().toISOString(),
    };

    setHistory((prev) => {
      // Replace today's entry if it exists, else prepend
      const filtered = prev.filter((h) => h.date !== today);
      const updated = [entry, ...filtered].slice(0, 30); // keep last 30 days
      try {
        localStorage.setItem("mama_symptoms_history", JSON.stringify(updated));
        localStorage.removeItem("mama_symptoms_draft");
      } catch {
        // ignore
      }
      return updated;
    });

    setSelected({});
    setNotes("");

    // Store symptoms context for the recommendations page
    try {
      localStorage.setItem(
        "mama_recommendations_context",
        JSON.stringify({ symptoms: logged, savedAt: new Date().toISOString() })
      );
    } catch {
      // ignore
    }

    // Navigate to recommendations
    router.push("/dashboard/recommendations");
  }

  function handleLogout() {
    loggingOut.current = true;
    logout();
    router.push("/");
  }

  const selectedCount = Object.keys(selected).length;
  const todayLog = history.find((h) => h.date === todayKey());
  const recentHistory = history.filter((h) => h.date !== todayKey()).slice(0, 6);

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#F46A6A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab="symptoms"
        onTabChange={(tab) => router.push(`/dashboard?tab=${tab}`)}
        userName={user.name}
        userEmail={user.email}
      />

      <div className="flex-1 ml-64">
        <HeaderBar activeTab="symptoms" user={user} onLogout={handleLogout} />

        <main className="min-h-[calc(100vh-4rem)]">
          {/* Page Header */}
          <section
            className="relative pt-8 pb-10 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #fff5f5 0%, #ffe0e0 50%, #fecdd3 100%)" }}
          >
            <div className="absolute top-8 right-10 w-64 h-64 bg-[#F46A6A]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-white text-2xl shadow-lg shadow-[#F46A6A]/20 shrink-0">
                  📋
                </div>
                <div>
                  <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#F46A6A] bg-white/70 px-3 py-1 rounded-full mb-2 shadow-sm">
                    Daily Log
                  </span>
                  <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                    Symptoms Tracker
                  </h1>
                  <p className="text-gray-600 mt-1 max-w-xl">
                    Select any symptoms you are experiencing today, rate their severity, and save your daily log.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8 space-y-8">

            {/* Today already logged banner */}
            {todayLog && (
              <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 flex items-center gap-4">
                <span className="text-2xl">✅</span>
                <div className="flex-1">
                  <p className="font-semibold text-green-800 text-sm">
                    You already logged {todayLog.symptoms.length} symptom{todayLog.symptoms.length !== 1 ? "s" : ""} today.
                  </p>
                  <p className="text-xs text-green-600 mt-0.5">Submitting again will replace today&apos;s entry.</p>
                </div>
              </div>
            )}

            {/* Symptom Selection Grid */}
            {SYMPTOM_CATEGORIES.map((cat) => (
              <section key={cat.category}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider ${cat.text} ${cat.bg} px-3 py-1 rounded-full`}>
                    {cat.category}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cat.symptoms.map((sym) => {
                    const isSelected = sym.id in selected;
                    const severity = selected[sym.id];
                    return (
                      <div key={sym.id} className="flex flex-col gap-2">
                        <button
                          onClick={() => toggleSymptom(sym.id)}
                          className={`group flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 cursor-pointer text-left w-full ${
                            isSelected
                              ? `${cat.bg} ${cat.border} ${cat.text} shadow-sm`
                              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:shadow-sm"
                          }`}
                        >
                          <span className="text-lg shrink-0">{sym.emoji}</span>
                          <span className="truncate">{sym.label}</span>
                          {isSelected && (
                            <span className="ml-auto shrink-0 w-4 h-4 rounded-full bg-current opacity-80 flex items-center justify-center">
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="white">
                                <polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          )}
                        </button>

                        {/* Severity picker — only shown when selected */}
                        {isSelected && (
                          <div className="flex gap-1.5 px-1">
                            {SEVERITY_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => setSeverity(sym.id, opt.value)}
                                className={`flex-1 py-1 text-[10px] font-semibold rounded-lg border transition-all cursor-pointer ${
                                  severity === opt.value
                                    ? `${opt.bg} ${opt.color} shadow-sm`
                                    : "bg-white border-gray-200 text-gray-400 hover:border-gray-300"
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}

            {/* Selected Summary + Notes + Submit */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-900">
                Selected Symptoms
                {selectedCount > 0 && (
                  <span className="ml-2 inline-block text-sm font-semibold text-[#F46A6A] bg-rose-50 px-2.5 py-0.5 rounded-full">
                    {selectedCount}
                  </span>
                )}
              </h2>

              {selectedCount === 0 ? (
                <p className="text-sm text-gray-400 italic">No symptoms selected yet. Tap any symptom above to add it.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selected).map(([id, sev]) => {
                    const sym = ALL_SYMPTOMS.find((s) => s.id === id)!;
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 font-medium"
                      >
                        {sym.emoji} {sym.label}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 ${SEVERITY_BADGE[sev]}`}>
                          {sev}
                        </span>
                        <button
                          onClick={() => toggleSymptom(id)}
                          className="ml-1 text-[#F46A6A]/60 hover:text-[#F46A6A] transition-colors cursor-pointer"
                          aria-label={`Remove ${sym.label}`}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. nausea was worse in the morning, headache started after lunch..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#F46A6A]/30 focus:border-[#F46A6A] transition-all"
                />
              </div>

              <button
                onClick={handleLogSymptoms}
                disabled={selectedCount === 0}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#F46A6A] text-white font-semibold text-sm shadow-lg shadow-[#F46A6A]/20 hover:bg-[#e55a5a] hover:shadow-xl hover:shadow-[#F46A6A]/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer"
              >
                Save & View Recommendations
              </button>
            </section>

            {/* Today's Log */}
            {todayLog && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Today&apos;s Log</h2>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {todayLog.symptoms.map((s) => (
                      <span
                        key={s.symptomId}
                        className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 font-medium"
                      >
                        {s.emoji} {s.label}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1 ${SEVERITY_BADGE[s.severity]}`}>
                          {s.severity}
                        </span>
                      </span>
                    ))}
                  </div>
                  {todayLog.notes && (
                    <p className="text-sm text-gray-500 italic border-t border-gray-100 pt-3">
                      &ldquo;{todayLog.notes}&rdquo;
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-3">
                    Logged at {new Date(todayLog.loggedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </section>
            )}

            {/* Recent History */}
            {recentHistory.length > 0 && (
              <section className="pb-10">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Recent History</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentHistory.map((log) => (
                    <div key={log.date} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                      <p className="text-sm font-bold text-gray-700 mb-3">{formatDateLabel(log.date)}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {log.symptoms.slice(0, 4).map((s) => (
                          <span
                            key={s.symptomId}
                            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium"
                          >
                            {s.emoji} {s.label}
                          </span>
                        ))}
                        {log.symptoms.length > 4 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                            +{log.symptoms.length - 4} more
                          </span>
                        )}
                      </div>
                      {log.notes && (
                        <p className="text-xs text-gray-400 italic line-clamp-2">&ldquo;{log.notes}&rdquo;</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
