"use client";

import { useState } from "react";
import { Midwife, getInitials } from "./data";
import { CheckIcon } from "./icons";

interface PaymentDetails {
  midwife: Midwife;
  sessionType: string;
  date: string;
  message: string;
}

interface PaymentSectionProps {
  paymentDetails: PaymentDetails;
  onBack: () => void;
  onPaymentComplete: () => void;
}

const SAVED_CARDS = [
  { id: 1, type: "visa", label: "Visa", last4: "4187", expiry: "09/27" },
  { id: 2, type: "mastercard", label: "Mastercard", last4: "5765", expiry: "03/28" },
];

function CardIcon({ type }: { type: string }) {
  if (type === "visa") {
    return (
      <div className="w-10 h-7 rounded bg-linear-to-br from-blue-600 to-blue-800 flex items-center justify-center">
        <span className="text-white text-[9px] font-bold italic tracking-wide">VISA</span>
      </div>
    );
  }
  return (
    <div className="w-10 h-7 rounded bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center">
      <div className="flex -space-x-1.5">
        <div className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
      </div>
    </div>
  );
}

function BackArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function CreditCardPlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
      <line x1="12" y1="14" x2="12" y2="20" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  );
}

function LockSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function PaymentSection({ paymentDetails, onBack, onPaymentComplete }: PaymentSectionProps) {
  const { midwife, sessionType, date, message } = paymentDetails;
  const [selectedCard, setSelectedCard] = useState<number | "new">(SAVED_CARDS[0]?.id ?? "new");
  const [processing, setProcessing] = useState(false);

  // New card form state
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvv, setNewCardCvv] = useState("");

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })
    : "";
  const formattedTime = date
    ? new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : "";

  // Parse the price string to get the numeric value
  const priceNum = midwife.price.replace(/[^\d]/g, "");
  const serviceFee = "200";
  const totalNum = parseInt(priceNum) + parseInt(serviceFee);
  const formattedTotal = totalNum.toLocaleString() + " DA";

  function formatCardInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  }

  function formatExpiryInput(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  }

  function handlePay() {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete();
    }, 2000);
  }

  const canPay =
    selectedCard !== "new" ||
    (newCardNumber.replace(/\s/g, "").length === 16 &&
      newCardName.trim().length > 0 &&
      newCardExpiry.length === 5 &&
      newCardCvv.length >= 3);

  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-all"
        >
          <BackArrowIcon />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Payment</h2>
      </div>

      {/* Midwife Summary Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-white font-bold text-base shrink-0">
            {getInitials(midwife.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-900">{midwife.name}</h3>
            <p className="text-sm text-[#F46A6A] font-medium">{midwife.specialty}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-base font-bold text-gray-900">{midwife.price}</p>
            <p className="text-xs text-gray-400">per session</p>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Appointment Details</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center text-[#F46A6A]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="16" y1="2" x2="16" y2="6" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Date & Time</p>
              <p className="text-sm font-medium text-gray-800">{formattedDate} at {formattedTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center text-[#F46A6A]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Session Type</p>
              <p className="text-sm font-medium text-gray-800">{sessionType}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center text-[#F46A6A]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Location</p>
              <p className="text-sm font-medium text-gray-800">{midwife.location}</p>
            </div>
          </div>

          {message && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 flex items-center justify-center text-[#F46A6A] shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">Your Message</p>
                <p className="text-sm font-medium text-gray-800">{message}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Payment Method</h4>
        <div className="space-y-2.5">
          {SAVED_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
                selectedCard === card.id
                  ? "border-[#F46A6A] bg-rose-50/40"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <CardIcon type={card.type} />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">
                  {card.label} ending in {card.last4}
                </p>
                <p className="text-xs text-gray-400">Expires {card.expiry}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedCard === card.id
                    ? "border-[#F46A6A] bg-[#F46A6A]"
                    : "border-gray-300"
                }`}
              >
                {selectedCard === card.id && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            </button>
          ))}

          {/* Add New Card */}
          <button
            onClick={() => setSelectedCard("new")}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 ${
              selectedCard === "new"
                ? "border-[#F46A6A] bg-rose-50/40"
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            <div className="w-10 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-500">
              <CreditCardPlusIcon />
            </div>
            <p className="text-sm font-medium text-gray-900 flex-1 text-left">Add new card</p>
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedCard === "new"
                  ? "border-[#F46A6A] bg-[#F46A6A]"
                  : "border-gray-300"
              }`}
            >
              {selectedCard === "new" && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </button>
        </div>

        {/* New Card Form */}
        {selectedCard === "new" && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={newCardNumber}
                onChange={(e) => setNewCardNumber(formatCardInput(e.target.value))}
                maxLength={19}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F46A6A]/30 focus:border-[#F46A6A] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Cardholder Name</label>
              <input
                type="text"
                placeholder="Full name on card"
                value={newCardName}
                onChange={(e) => setNewCardName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F46A6A]/30 focus:border-[#F46A6A] transition-all"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={newCardExpiry}
                  onChange={(e) => setNewCardExpiry(formatExpiryInput(e.target.value))}
                  maxLength={5}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F46A6A]/30 focus:border-[#F46A6A] transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={newCardCvv}
                  onChange={(e) => setNewCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  maxLength={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F46A6A]/30 focus:border-[#F46A6A] transition-all"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Price Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Price Summary</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Session fee</span>
            <span className="font-medium text-gray-800">{midwife.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Service fee</span>
            <span className="font-medium text-gray-800">200 DA</span>
          </div>
          <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-base font-bold text-[#F46A6A]">{formattedTotal}</span>
          </div>
        </div>
      </div>

      {/* Secure badge */}
      <div className="flex items-center justify-center gap-1.5 mb-4">
        <LockSmallIcon />
        <p className="text-xs text-gray-400">Secure payment powered by MamaConnect</p>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePay}
        disabled={!canPay || processing}
        className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
          canPay && !processing
            ? "bg-[#F46A6A] text-white hover:bg-[#e55a5a] shadow-md shadow-[#F46A6A]/20"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {processing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>Confirm & Pay {formattedTotal}</>
        )}
      </button>
    </div>
  );
}
