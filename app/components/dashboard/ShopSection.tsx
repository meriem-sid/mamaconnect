"use client";

import { useState } from "react";
import { SHOP_PLANS } from "./data";
import { CheckIcon } from "./icons";
import { useAuth } from "../auth/AuthContext";
import SubscriptionPaymentSection from "./SubscriptionPaymentSection";

export default function ShopSection() {
  const { user, upgradePlan } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<typeof SHOP_PLANS[0] | null>(null);
  const [paymentDone, setPaymentDone] = useState(false);

  const isPremium = user?.plan === "premium";

  if (selectedPlan) {
    return (
      <SubscriptionPaymentSection
        plan={selectedPlan}
        onBack={() => setSelectedPlan(null)}
        onPaymentComplete={() => {
          upgradePlan();
          setPaymentDone(true);
          setSelectedPlan(null);
        }}
      />
    );
  }

  if (paymentDone || isPremium) {
    return (
      <div className="max-w-md mx-auto px-6 sm:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#F46A6A]/20">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re Premium!</h2>
        <p className="text-gray-500 text-sm mb-6">
          You now have full access to all premium features including wearable device integration, real-time alerts, and unlimited AI chatbot requests.
        </p>
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-left space-y-2">
          {SHOP_PLANS[0].features.map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
              <span className="w-5 h-5 rounded-full bg-[#F46A6A] text-white flex items-center justify-center shrink-0">
                <CheckIcon />
              </span>
              {f}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
        <p className="text-gray-500 max-w-md mx-auto">Select the perfect care package for your pregnancy journey</p>
      </div>
      <div className="flex justify-center max-w-5xl mx-auto">
        {SHOP_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative w-full max-w-md bg-white rounded-2xl border-2 p-6 sm:p-7 transition-all duration-300 hover:shadow-xl ${
              plan.popular
                ? "border-[#F46A6A] shadow-lg shadow-[#F46A6A]/10 scale-[1.02]"
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-linear-to-r from-[#F46A6A] to-[#FBC4AB] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                  Most Popular
                </span>
              </div>
            )}
            <div className={`${plan.popular ? "pt-2" : ""}`}>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-500">DA {plan.period}</span>
              </div>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-[#F46A6A] text-white" : "bg-gray-100 text-gray-500"}`}>
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  plan.popular
                    ? "bg-[#F46A6A] text-white hover:bg-[#e55a5a] shadow-md shadow-[#F46A6A]/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Get {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
