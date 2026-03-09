"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function validateEmail(value: string): string {
  if (!value) return "";
  if (value.length > 254) return "Email must be 254 characters or fewer";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
  return "";
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();

  function handleSendCode() {
    const err = validateEmail(email) || (!email ? "Email is required" : "");
    setEmailError(err);
    if (err) return;
    router.push("/verify-code");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
      <div className="w-full max-w-sm animate-formRevealMobile lg:animate-formReveal">
        <button
          onClick={() => router.push("/auth?mode=login")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#F46A6A] transition-colors mb-5"
        >
          <ArrowLeftIcon />
          <span>Back to Login</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Forgot Password</h1>
        <p className="text-sm text-gray-500 mt-1 mb-5">
          Enter your email address and we&apos;ll send you a verification code to reset your password.
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <MailIcon />
            </span>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
              onBlur={() => setEmailError(validateEmail(email))}
              required
              className={`w-full rounded-xl border ${emailError ? "border-red-400" : "border-gray-200"} h-11 pl-11 pr-4 text-sm text-gray-800 outline-none focus:border-[#F46A6A] focus:ring-1 focus:ring-[#F46A6A]/20 transition-all placeholder:text-gray-300`}
            />
          </div>
          {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
        </div>

        {/* Send Code button */}
        <button
          onClick={handleSendCode}
          className="w-full bg-[#F46A6A] text-white rounded-full h-11 font-semibold text-sm hover:bg-[#e55d5d] active:bg-[#d45252] transition-colors"
        >
          Send Code
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Remember your password?{" "}
          <button
            onClick={() => router.push("/auth?mode=login")}
            className="text-[#F46A6A] font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
