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

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F46A6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function handleReset() {
    let hasError = false;
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmError("Please confirm your password");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      hasError = true;
    } else {
      setConfirmError("");
    }

    if (hasError) return;

    setSuccess(true);
    setTimeout(() => {
      router.push("/auth?mode=login");
    }, 2000);
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
        <div className="flex flex-col items-center gap-4 text-center animate-formRevealMobile lg:animate-formReveal">
          <CheckCircleIcon />
          <h2 className="text-xl font-bold text-gray-900">Password Reset Successful</h2>
          <p className="text-sm text-gray-500 max-w-xs">
            Your password has been reset. Redirecting you to the login page&hellip;
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#F46A6A] animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-[#F46A6A] animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-[#F46A6A] animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-10">
      <div className="w-full max-w-sm animate-formRevealMobile lg:animate-formReveal">
        <button
          onClick={() => router.push("/verify-code")}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#F46A6A] transition-colors mb-5"
        >
          <ArrowLeftIcon />
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-900 leading-tight">Reset Password</h1>
        <p className="text-sm text-gray-500 mt-1 mb-5">
          Create a new password for your account.
        </p>

        {/* New Password */}
        <div className="mb-3.5">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">New Password</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <LockIcon />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
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

        {/* Confirm Password */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Confirm Password</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <LockIcon />
            </span>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); if (confirmError) setConfirmError(""); }}
              required
              className={`w-full rounded-xl border ${confirmError ? "border-red-400" : "border-gray-200"} h-11 pl-11 pr-11 text-sm text-gray-800 outline-none focus:border-[#F46A6A] focus:ring-1 focus:ring-[#F46A6A]/20 transition-all placeholder:text-gray-300`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {confirmError && <p className="text-xs text-red-500 mt-1">{confirmError}</p>}
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          className="w-full bg-[#F46A6A] text-white rounded-full h-11 font-semibold text-sm hover:bg-[#e55d5d] active:bg-[#d45252] transition-colors"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}
