"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
  isAccountCTA?: boolean;
}

const SUGGESTIONS = [
  "Pregnancy nutrition tips",
  "Safe exercises during pregnancy",
  "Common pregnancy symptoms",
  "Mental health during pregnancy",
];

function getTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function AIBotIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
      <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function MinimizeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const INITIAL_MESSAGE: Message = {
  id: 1,
  text: "Hi! I'm the MamaConnect AI assistant. Ask me anything about pregnancy — nutrition, symptoms, baby development, and more.",
  isUser: false,
  timestamp: getTimestamp(),
};

export default function LandingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  function handleSuggestionClick(suggestion: string) {
    const userMsg: Message = {
      id: Date.now(),
      text: suggestion,
      isUser: true,
      timestamp: getTimestamp(),
    };

    const ctaMsg: Message = {
      id: Date.now() + 1,
      text: "Create an account to start chatting with the MamaConnect AI assistant.",
      isUser: false,
      timestamp: getTimestamp(),
      isAccountCTA: true,
    };

    setMessages((prev) => [...prev, userMsg, ctaMsg]);
    setShowSuggestions(false);
  }

  function handleReset() {
    setMessages([{ ...INITIAL_MESSAGE, timestamp: getTimestamp() }]);
    setShowSuggestions(true);
    setIsOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {isOpen && (
        <div
          className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ height: "460px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-[#F46A6A] to-[#FBC4AB]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <AIBotIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">MamaConnect AI</p>
                <p className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Minimize"
              >
                <MinimizeIcon />
              </button>
              <button
                onClick={handleReset}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Suggestion buttons (shown above messages when no interaction yet) */}
          {showSuggestions && (
            <div className="px-4 pt-3 pb-1 flex flex-col gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="text-left text-xs text-gray-600 bg-gray-50 hover:bg-rose-50 hover:text-[#F46A6A] px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end gap-2 ${msg.isUser ? "justify-end" : "justify-start"}`}>
                {!msg.isUser && (
                  <div className="w-6 h-6 rounded-full bg-[#F46A6A] flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
                      <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
                    </svg>
                  </div>
                )}
                <div className={`max-w-[78%] px-3 py-2 rounded-xl text-xs leading-relaxed shadow-sm ${
                  msg.isUser
                    ? "bg-[#F46A6A] text-white rounded-br-md"
                    : "bg-white text-gray-700 border border-gray-100 rounded-bl-md"
                }`}>
                  {msg.text}
                  {/* Sign Up / Log In buttons inside the CTA message */}
                  {msg.isAccountCTA && (
                    <div className="flex gap-2 mt-2.5">
                      <a
                        href="/auth?mode=signup"
                        className="flex-1 text-center text-[11px] font-semibold text-white bg-[#F46A6A] hover:bg-[#e55d5d] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Sign Up
                      </a>
                      <a
                        href="/auth?mode=login"
                        className="flex-1 text-center text-[11px] font-semibold text-[#F46A6A] bg-white border border-[#F46A6A]/30 hover:border-[#F46A6A] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Log In
                      </a>
                    </div>
                  )}
                  <p className={`text-[9px] mt-1 ${msg.isUser ? "text-white/70" : "text-gray-400"}`}>{msg.timestamp}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* CTA strip (replaces the old input area) */}
          <div className="px-4 py-2.5 bg-rose-50 border-t border-rose-100 text-center">
            <p className="text-[10px] text-gray-500">
              Want personalised tips?{" "}
              <a href="/auth?mode=signup" className="font-semibold text-[#F46A6A] hover:underline">
                Create a free account
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer relative"
        aria-label="Open AI chat"
      >
        {isOpen ? (
          <CloseIcon />
        ) : (
          <>
            <AIBotIcon />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </>
        )}
      </button>
    </div>
  );
}
