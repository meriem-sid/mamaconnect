"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/components/auth/AuthContext";
import ChatMessage from "@/app/components/chat/ChatMessage";
import ChatInput from "@/app/components/chat/ChatInput";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const FREE_SUGGESTIONS = [
  "Pregnancy nutrition tips",
  "Exercises during pregnancy",
  "Common pregnancy symptoms",
  "Mental health during pregnancy",
];

const FREE_MAX_INTERACTIONS = 3;

const EXAMPLE_PROMPTS = [
  "What foods should I avoid during pregnancy?",
  "What happens in week 20 of pregnancy?",
  "How can I reduce morning sickness?",
  "Is it safe to exercise during pregnancy?",
  "What vitamins should I take?",
  "How much weight should I gain?",
];

const AI_RESPONSES: Record<string, string> = {
  default:
    "That's a great question! While I'm here to provide general pregnancy guidance, I'd always recommend consulting your healthcare provider for personalised medical advice. Is there anything specific about your pregnancy journey I can help with?",
  food: "During pregnancy, it's recommended to avoid raw or undercooked meats, unpasteurised dairy, high-mercury fish (like shark and swordfish), raw eggs, and excess caffeine. Focus on folate-rich foods, lean proteins, whole grains, and plenty of fruits and vegetables. Would you like more nutrition tips?",
  morning:
    "Morning sickness is very common, especially in the first trimester. Try eating small, frequent meals, keeping crackers by your bedside, staying hydrated, and trying ginger tea. Some mums find that vitamin B6 supplements help too. If symptoms are severe, please consult your doctor.",
  week: "At week 20, you're halfway through your pregnancy! Your baby is about 25cm long and weighs around 300g. You might start feeling those exciting first kicks (called quickening). This is usually when you'll have your mid-pregnancy ultrasound scan. How exciting!",
  exercise:
    "Light to moderate exercise is generally safe and beneficial during pregnancy. Walking, swimming, prenatal yoga, and low-impact aerobics are excellent choices. Aim for about 30 minutes of activity most days. Always listen to your body and avoid contact sports or activities with a risk of falling.",
  vitamin:
    "Key supplements during pregnancy include folic acid (especially in the first trimester), iron, calcium, vitamin D, and omega-3 fatty acids. Your prenatal vitamin should cover most of these. Always check with your healthcare provider about the right dosage for your needs.",
  weight:
    "Healthy weight gain during pregnancy varies based on your pre-pregnancy BMI. Generally, 11-16kg is recommended for those with a normal BMI. Your healthcare provider can give you personalised guidance based on your individual situation.",
  nutrition:
    "Good nutrition during pregnancy is essential for your baby's development. Focus on iron-rich foods (spinach, lean red meat), calcium (dairy, fortified plant milk), folate (leafy greens, legumes), and omega-3s (salmon, walnuts). Eat small, frequent meals and stay well-hydrated with at least 8 glasses of water daily.",
  symptoms:
    "Common pregnancy symptoms include nausea, fatigue, breast tenderness, frequent urination, and mood swings — especially in the first trimester. As pregnancy progresses you may experience back pain, swelling, and heartburn. Most symptoms are normal, but always contact your healthcare provider if something feels concerning.",
  mental:
    "Mental health during pregnancy is just as important as physical health. It's normal to feel anxious, emotional, or overwhelmed. Try mindfulness exercises, gentle physical activity, and talking openly with your partner or a trusted friend. If you experience persistent sadness or anxiety, please reach out to a mental health professional — support is available and you deserve it.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("nutrition") || lower.includes("food") || lower.includes("eat") || lower.includes("avoid")) return AI_RESPONSES.nutrition;
  if (lower.includes("morning") || lower.includes("nausea") || lower.includes("sick")) return AI_RESPONSES.morning;
  if (lower.includes("week")) return AI_RESPONSES.week;
  if (lower.includes("exercise") || lower.includes("active") || lower.includes("workout")) return AI_RESPONSES.exercise;
  if (lower.includes("vitamin") || lower.includes("supplement")) return AI_RESPONSES.vitamin;
  if (lower.includes("weight") || lower.includes("gain")) return AI_RESPONSES.weight;
  if (lower.includes("symptom")) return AI_RESPONSES.symptoms;
  if (lower.includes("mental") || lower.includes("anxiety") || lower.includes("depress") || lower.includes("stress")) return AI_RESPONSES.mental;
  return AI_RESPONSES.default;
}

function getTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function ChatSection({ onGoToShop }: { onGoToShop?: () => void }) {
  const { user } = useAuth();
  const isPremium = user?.plan === "premium";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your MamaConnect AI assistant 🌸 I'm here to help answer your pregnancy-related questions. How can I support you today?",
      isUser: false,
      timestamp: getTimestamp(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [freeInteractions, setFreeInteractions] = useState(0);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

  const freeExhausted = !isPremium && freeInteractions >= FREE_MAX_INTERACTIONS;

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    if (!isPremium && freeInteractions >= FREE_MAX_INTERACTIONS) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isUser: true,
      timestamp: getTimestamp(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userText = text.trim();
    setInput("");
    setIsTyping(true);

    if (!isPremium) {
      setFreeInteractions((prev) => prev + 1);
    }

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: getAIResponse(userText),
        isUser: false,
        timestamp: getTimestamp(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const handlePromptClick = (prompt: string) => {
    if (isPremium) {
      setInput(prompt);
    } else {
      sendMessage(prompt);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
            <p className="text-sm text-gray-500 mt-1">Ask any pregnancy-related question and get supportive, helpful answers.</p>
          </div>
          {!isPremium && (
            <span className="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              {freeInteractions}/{FREE_MAX_INTERACTIONS} free
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chat panel */}
        <div
          className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          style={{ minHeight: "520px" }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#F46A6A] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">MamaConnect AI</p>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Online
              </p>
            </div>
          </div>

          {/* Messages area */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto px-5 py-5 space-y-4"
            style={{ maxHeight: "400px" }}
          >
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                text={msg.text}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F46A6A] flex items-center justify-center shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                    <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
                  </svg>
                </div>
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input area — differs by plan */}
          <div className="px-5 pt-3 pb-3 border-t border-gray-100">
            {isPremium ? (
              <ChatInput value={input} onChange={setInput} onSend={handleSend} />
            ) : freeExhausted ? (
              /* Free user exhausted all interactions */
              <div className="text-center py-2">
                <p className="text-sm text-gray-500 mb-3">
                  You&apos;ve used all <span className="font-semibold">{FREE_MAX_INTERACTIONS} free</span> AI interactions.
                </p>
                <button
                  onClick={onGoToShop}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F46A6A] text-white text-sm font-semibold rounded-full hover:bg-[#e55d5d] active:bg-[#d45252] transition-colors cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Upgrade to Premium
                </button>
              </div>
            ) : (
              /* Free user — suggestion buttons only */
              <div>
                <p className="text-xs text-gray-400 mb-2.5">Choose a topic to ask about:</p>
                <div className="flex flex-wrap gap-2">
                  {FREE_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isTyping}
                      className="text-xs text-gray-600 bg-gray-50 hover:bg-rose-50 hover:text-[#F46A6A] border border-gray-200 hover:border-[#F46A6A]/30 px-3.5 py-2 rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:w-80 shrink-0 space-y-5">
          {/* AI branding card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F46A6A] mx-auto mb-4 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
                <circle cx="9" cy="7" r="0.5" fill="white" />
                <circle cx="15" cy="7" r="0.5" fill="white" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">MamaConnect AI</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Your friendly pregnancy assistant, here to answer questions and
              provide supportive guidance 24/7.
            </p>
          </div>

          {/* Suggested prompts */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Try asking:</h3>
            <div className="space-y-2">
              {EXAMPLE_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  disabled={freeExhausted || isTyping}
                  className="w-full text-left text-xs text-gray-600 bg-gray-50 hover:bg-rose-50 hover:text-[#F46A6A] px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &ldquo;{prompt}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Tips or Upgrade CTA */}
          {isPremium ? (
            <div className="bg-rose-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 text-sm mb-2">💡 Tips</h3>
              <ul className="space-y-2 text-xs text-gray-600 leading-relaxed">
                <li>• Ask specific questions for better answers</li>
                <li>• Mention your trimester for tailored advice</li>
                <li>• Always consult your doctor for medical decisions</li>
              </ul>
            </div>
          ) : (
            <div className="bg-linear-to-br from-[#fff5f5] to-[#fdf0f0] rounded-2xl p-6 border border-[#F46A6A]/10">
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F46A6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <h3 className="font-semibold text-gray-900 text-sm">Upgrade to Premium</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Get unlimited AI conversations, type your own questions, and receive personalised pregnancy guidance.
              </p>
              <button
                onClick={onGoToShop}
                className="inline-block text-xs font-semibold text-[#F46A6A] hover:underline cursor-pointer"
              >
                Learn more →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
