"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/auth/AuthContext";

interface LoginProps {
  onSwitch: () => void;
}

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

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function validateEmail(value: string): string {
  if (!value) return "";
  if (value.length > 254) return "Email must be 254 characters or fewer";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
  return "";
}

export default function Login({ onSwitch }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  function handleLogin() {
    const emailErr = validateEmail(email) || (!email ? "Email is required" : "");
    const pwdErr = password ? "" : "Password is required";
    setEmailError(emailErr);
    setPasswordError(pwdErr);
    if (emailErr || pwdErr) return;
    login(email);
    router.push("/dashboard");
  }

  return (
    <div className="w-full">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#F46A6A] transition-colors mb-5"
      >
        <ArrowLeftIcon />
        <span>Back to Home</span>
      </button>

      <h1 className="text-2xl font-bold text-gray-900 leading-tight">Welcome Back</h1>
      <p className="text-sm text-gray-500 mt-1 mb-5">Sign in to your account</p>

      {/* Email */}
      <div className="mb-3.5">
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

      {/* Password */}
      <div className="mb-3.5">
        <label className="block text-xs font-medium text-gray-500 mb-1.5">Password</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <LockIcon />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (passwordError) setPasswordError(""); }}
            required
            className={`w-full rounded-xl border ${passwordError ? "border-red-400" : "border-gray-200"} h-11 pl-11 pr-11 text-sm text-gray-800 outline-none focus:border-[#F46A6A] focus:ring-1 focus:ring-[#F46A6A]/20 transition-all placeholder:text-gray-300`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {passwordError && <p className="text-xs text-red-500 mt-1">{passwordError}</p>}
      </div>

      {/* Remember me + Forgot password */}
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer select-none">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 rounded accent-[#F46A6A] cursor-pointer"
          />
          Remember me
        </label>
        <button
          onClick={() => router.push("/forgot-password")}
          className="text-xs font-semibold text-[#F46A6A] hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      {/* Sign in button */}
      <button onClick={handleLogin} className="w-full bg-[#F46A6A] text-white rounded-full h-11 font-semibold text-sm hover:bg-[#e55d5d] active:bg-[#d45252] transition-colors">
        Sign in
      </button>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-4">
        Don&apos;t have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-[#F46A6A] font-semibold hover:underline"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}
