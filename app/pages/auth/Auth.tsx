"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Login from "@/app/components/auth/Login";
import Signup from "@/app/components/auth/Signup";
import ClientProfileDetails from "@/app/components/auth/ClientProfileDetails";
import MidwifeDocumentUpload from "@/app/components/auth/MidwifeDocumentUpload";
import PendingApproval from "@/app/components/auth/PendingApproval";
import { useAuth } from "@/app/components/auth/AuthContext";
import panelLogin from "@/app/assets/panelLogin.png";
import panelSignup from "@/app/assets/panelSignup.png";

type Step = "login" | "signup" | "clientProfile" | "midwifeDocuments" | "pendingApproval" | "midwifeVerifying";

export default function Auth() {
  const searchParams = useSearchParams();
  const initialStep: Step = searchParams.get("mode") === "login" ? "login" : "signup";
  const [step, setStep] = useState<Step>(initialStep);
  const [pendingSignup, setPendingSignup] = useState<{
    name: string;
    email: string;
    phone: string;
    role: "client" | "midwife";
  } | null>(null);

  const { signup } = useAuth();
  const router = useRouter();

  function handleSignup(role: "client" | "midwife" | "", name?: string, email?: string, phone?: string) {
    if (!role || !name || !email) return;
    setPendingSignup({ name, email, phone: phone || "", role });
    if (role === "midwife") {
      setStep("midwifeDocuments");
    } else {
      setStep("clientProfile");
    }
  }

  function handleClientProfile(_data?: unknown) {
    if (!pendingSignup) return;
    signup(pendingSignup.name, pendingSignup.email, pendingSignup.phone, "client", "active");
    router.push("/dashboard");
  }

  function handleMidwifeDocuments() {
    if (!pendingSignup) return;
    // Show loading/verification screen before redirecting
    setStep("midwifeVerifying");
    signup(pendingSignup.name, pendingSignup.email, pendingSignup.phone, "midwife", "active");
  }

  const isSliderStep = step === "login" || step === "signup";

  // Auto-redirect after midwife verification loading screen
  useEffect(() => {
    if (step === "midwifeVerifying") {
      const timer = setTimeout(() => {
        router.push("/midwife-dashboard");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  /* ── Midwife verification loading screen ─── */
  if (step === "midwifeVerifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#fff5f5] via-white to-[#fdf0f0]">
        <div className="flex flex-col items-center gap-6 px-6 text-center">
          {/* Spinner */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#F46A6A] animate-spin" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Verifying your documents, please wait&hellip;
            </h2>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Our team is reviewing your uploaded documents. You will be redirected shortly.
            </p>
          </div>
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F46A6A] animate-bounce [animation-delay:0ms]" />
            <span className="w-2 h-2 rounded-full bg-[#F46A6A] animate-bounce [animation-delay:150ms]" />
            <span className="w-2 h-2 rounded-full bg-[#F46A6A] animate-bounce [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Sub-steps: clientProfile / midwifeDocuments / pendingApproval ─── */
  if (!isSliderStep) {
    return (
      <div className={`min-h-screen flex ${step === "midwifeDocuments" || step === "clientProfile" ? "flex-row-reverse" : ""}`}>
        {/* Static decorative panel */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-[#fdf0f0] items-center justify-center overflow-hidden">
          <div className="relative w-full h-full" style={{ maxWidth: 480, maxHeight: 480 }}>
            <Image
              src={panelSignup}
              alt="Illustration"
              fill
              sizes="45vw"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
        {/* Form */}
        <div className="flex flex-1 items-center justify-center px-6 py-10 bg-white">
          <div className="w-full max-w-sm animate-slideInRight">
            {step === "clientProfile" && (
              <ClientProfileDetails
                onBack={() => setStep("signup")}
                onContinue={handleClientProfile}
              />
            )}
            {step === "midwifeDocuments" && (
              <MidwifeDocumentUpload
                onBack={() => setStep("signup")}
                onSubmit={handleMidwifeDocuments}
              />
            )}
            {step === "pendingApproval" && (
              <PendingApproval onGoToSignIn={() => setStep("login")} />
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Login / Signup slider ───────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white">

      {/* ── Mobile (< lg): fade-in on switch ────────────────────── */}
      <div className="flex lg:hidden min-h-screen items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">
          {step === "login" && (
            <div key="mobile-login" className="animate-formRevealMobile">
              <Login onSwitch={() => setStep("signup")} />
            </div>
          )}
          {step === "signup" && (
            <div key="mobile-signup" className="animate-formRevealMobile">
              <Signup onSwitch={() => setStep("login")} onSignup={handleSignup} />
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop (≥ lg): sliding overlay panel ───────────────── */}
      {/*
        Layout:
          [ Signup form LEFT ]  [ Login form RIGHT ]
          Overlay panel slides on top:
            • step="login"  → panel at left: 0    (covers LEFT/signup)  → login form visible
            • step="signup" → panel at left: 55%  (covers RIGHT/login)  → signup form visible

        The panel (w-[45%]) slides via the CSS `left` property.
        Form content uses key={step} so it remounts and plays formReveal on each switch.
      */}
      <div className="hidden lg:block relative min-h-screen overflow-hidden">

        {/* Signup form — occupies left 55 % */}
        <div className="absolute inset-y-0 left-0 w-[55%] flex items-center justify-center px-10 py-10 bg-white">
          <div key={`signup-${step}`} className="w-full max-w-sm animate-formReveal">
            <Signup onSwitch={() => setStep("login")} onSignup={handleSignup} />
          </div>
        </div>

        {/* Login form — occupies right 55 % */}
        <div className="absolute inset-y-0 right-0 w-[55%] flex items-center justify-center px-10 py-10 bg-white">
          <div key={`login-${step}`} className="w-full max-w-sm animate-formReveal">
            <Login onSwitch={() => setStep("signup")} />
          </div>
        </div>

        {/* Sliding decorative panel — 45 % wide, transitions on `left` */}
        <div
          className={`absolute inset-y-0 w-[45%] z-10 bg-[#fdf0f0]
            flex items-center justify-center overflow-hidden
            [transition:left_700ms_cubic-bezier(0.65,0,0.35,1)]
            ${step === "login" ? "left-0" : "left-[55%]"}`}
        >
          <div className="relative w-full h-full" style={{ maxWidth: 480, maxHeight: 480 }}>
            {/* Login illustration */}
            <Image
              src={panelLogin}
              alt="Sign in illustration"
              fill
              sizes="45vw"
              style={{ objectFit: "contain" }}
              priority
              className={`transition-opacity duration-400 delay-300 select-none
                ${step === "login" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />
            {/* Signup illustration */}
            <Image
              src={panelSignup}
              alt="Sign up illustration"
              fill
              sizes="45vw"
              style={{ objectFit: "contain" }}
              className={`transition-opacity duration-400 delay-300 select-none
                ${step === "signup" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
