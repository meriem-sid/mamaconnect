"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export default function VerifyCode() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (error) setError("");
    if (digit && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...code];
    for (let i = 0; i < 6; i++) {
      next[i] = pasted[i] || "";
    }
    setCode(next);
    const focusIndex = Math.min(pasted.length, 5);
    inputsRef.current[focusIndex]?.focus();
  }

  function handleVerify() {
    const fullCode = code.join("");
    if (fullCode.length < 6) {
      setError("Please enter the full 6-digit code");
      return;
    }
    router.push("/reset-password");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
      <div className="w-full max-w-sm animate-formRevealMobile lg:animate-formReveal">
        <button
          onClick={() => router.push("/forgot-password")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#F46A6A] transition-colors mb-5"
        >
          <ArrowLeftIcon />
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Verification Code</h1>
        <p className="text-sm text-gray-500 mt-1 mb-5">
          Enter the 6-digit code we sent to your email address.
        </p>

        {/* Code inputs */}
        <div className="flex gap-2.5 justify-center mb-5" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className={`w-11 h-12 rounded-xl border ${error ? "border-red-400" : "border-gray-200"} text-center text-lg font-semibold text-gray-800 outline-none focus:border-[#F46A6A] focus:ring-1 focus:ring-[#F46A6A]/20 transition-all`}
            />
          ))}
        </div>
        {error && <p className="text-xs text-red-500 text-center mb-4">{error}</p>}

        {/* Verify button */}
        <button
          onClick={handleVerify}
          className="w-full bg-[#F46A6A] text-white rounded-full h-11 font-semibold text-sm hover:bg-[#e55d5d] active:bg-[#d45252] transition-colors"
        >
          Verify Code
        </button>

        {/* Resend */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Didn&apos;t receive a code?{" "}
          <button className="text-[#F46A6A] font-semibold hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
