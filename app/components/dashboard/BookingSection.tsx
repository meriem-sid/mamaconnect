"use client";

import { useState, useEffect } from "react";
import { Midwife, MIDWIVES, SESSION_TYPES, getInitials } from "./data";
import { SearchIcon, StarIcon, MapPinIcon, CheckIcon, CalendarSmIcon } from "./icons";
import PaymentSection from "./PaymentSection";

interface BookingSectionProps {
  preselectedMidwife: Midwife | null;
  onClearPreselected: () => void;
}

export default function BookingSection({ preselectedMidwife, onClearPreselected }: BookingSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMidwife, setSelectedMidwife] = useState<Midwife | null>(null);
  const [bookingMidwife, setBookingMidwife] = useState<Midwife | null>(preselectedMidwife);
  const [bookingStep, setBookingStep] = useState(preselectedMidwife ? 2 : 0);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    if (preselectedMidwife) {
      setBookingMidwife(preselectedMidwife);
      setBookingStep(2);
      onClearPreselected();
    }
  }, [preselectedMidwife, onClearPreselected]);

  const filteredMidwives = MIDWIVES.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function startBooking(midwife: Midwife) {
    setBookingMidwife(midwife);
    setBookingStep(2);
    setSelectedSession("");
    setSelectedDate("");
    setMessage("");
    setBookingConfirmed(false);
  }

  function resetBooking() {
    setBookingMidwife(null);
    setBookingStep(0);
    setSelectedSession("");
    setSelectedDate("");
    setMessage("");
    setBookingConfirmed(false);
    setShowPayment(false);
  }

  function goToPayment() {
    if (selectedDate) setShowPayment(true);
  }

  const isInBookingFlow = bookingStep >= 2;

  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8">
      {/* Header */}
      {!showPayment && (
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {isInBookingFlow ? "Book a Session" : "Find a Midwife"}
          </h2>
          <p className="text-sm text-gray-500">
            {isInBookingFlow
              ? `Booking with ${bookingMidwife?.name}`
              : "Browse and book sessions with certified midwives"}
          </p>
        </div>
        {isInBookingFlow && (
          <button
            onClick={resetBooking}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
          >
            Back to Midwives
          </button>
        )}
      </div>
      )}

      {/* ── Browse Midwives ── */}
      {!isInBookingFlow && (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={`${selectedMidwife ? "lg:w-1/2" : "w-full"} transition-all duration-300`}>
            <div className="relative mb-5">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search midwives by name, specialty, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F46A6A]/30 focus:border-[#F46A6A] transition-all"
              />
            </div>

            <div className="space-y-3">
              {filteredMidwives.map((midwife) => (
                <button
                  key={midwife.id}
                  onClick={() => setSelectedMidwife(midwife)}
                  className={`w-full text-left rounded-xl p-4 border transition-all duration-200 hover:shadow-md ${
                    selectedMidwife?.id === midwife.id
                      ? "border-[#F46A6A] bg-rose-50/50 shadow-sm"
                      : "border-gray-100 bg-white hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {getInitials(midwife.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{midwife.name}</h4>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${midwife.available ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                          {midwife.available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <p className="text-xs text-[#F46A6A] font-medium">{midwife.specialty}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <StarIcon key={s} filled={s <= Math.floor(midwife.rating)} />
                          ))}
                          <span className="text-[11px] text-gray-500 ml-1">{midwife.rating} ({midwife.reviews})</span>
                        </div>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPinIcon /> {midwife.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detail Panel */}
          {selectedMidwife && (
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {getInitials(selectedMidwife.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedMidwife.name}</h3>
                    <p className="text-sm text-[#F46A6A] font-medium">{selectedMidwife.specialty}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <MapPinIcon /> {selectedMidwife.location}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5">{selectedMidwife.bio}</p>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Education</p>
                    <p className="text-xs font-medium text-gray-900">{selectedMidwife.education}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Languages</p>
                    <p className="text-xs font-medium text-gray-900">{selectedMidwife.languages.join(", ")}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Session Price</p>
                    <p className="text-xs font-bold text-[#F46A6A]">{selectedMidwife.price}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">Rating</p>
                    <div className="flex items-center gap-1">
                      <StarIcon filled />
                      <span className="text-xs font-bold text-gray-900">{selectedMidwife.rating}</span>
                      <span className="text-[10px] text-gray-400">({selectedMidwife.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Session Types</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMidwife.sessions.map((s) => (
                      <span key={s} className="text-xs bg-rose-50 text-[#F46A6A] px-3 py-1 rounded-full font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => startBooking(selectedMidwife)}
                  disabled={!selectedMidwife.available}
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedMidwife.available
                      ? "bg-[#F46A6A] text-white hover:bg-[#e55a5a] shadow-md shadow-[#F46A6A]/20"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {selectedMidwife.available ? "Book a Session" : "Currently Unavailable"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Booking Flow ── */}
      {isInBookingFlow && !bookingConfirmed && !showPayment && (
        <div className="max-w-2xl mx-auto">
          {/* Selected Midwife Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {getInitials(bookingMidwife?.name || "")}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{bookingMidwife?.name}</p>
                <p className="text-xs text-gray-600">{bookingMidwife?.specialty} &mdash; <span className="font-medium text-[#F46A6A]">{bookingMidwife?.price}</span>/session</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold">Selected</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[
              { step: 2, label: "Session Type" },
              { step: 3, label: "Date & Time" },
              { step: 4, label: "Payment" },
            ].map(({ step, label }, index) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    bookingStep >= step ? "bg-[#F46A6A] text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {bookingStep > step ? <CheckIcon /> : index + 1}
                  </div>
                  <span className={`text-[10px] mt-1 ${bookingStep >= step ? "text-gray-700 font-medium" : "text-gray-500"}`}>{label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-12 sm:w-20 h-0.5 rounded mb-5 ${bookingStep > step ? "bg-[#F46A6A]" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            {/* Step 2: Session Type */}
            {bookingStep === 2 && (
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Choose Session Type</h3>
                <p className="text-sm text-gray-500 mb-5">
                  Select how you&apos;d like to meet with <strong>{bookingMidwife?.name}</strong>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {SESSION_TYPES.filter((s) => bookingMidwife?.sessions.some((ms) => ms.toLowerCase().includes(s.value))).map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedSession(type.value)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                        selectedSession === type.value ? "border-[#F46A6A] bg-rose-50/50 shadow-sm" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedSession === type.value ? "bg-[#F46A6A] text-white" : "bg-gray-100 text-gray-600"
                        }`}>
                          {type.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{type.label}</p>
                          <p className="text-xs text-gray-500">{type.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={resetBooking} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
                    Back
                  </button>
                  <button
                    onClick={() => { if (selectedSession) setBookingStep(3); }}
                    disabled={!selectedSession}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedSession ? "bg-[#F46A6A] text-white hover:bg-[#e55a5a]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Date Selection */}
            {bookingStep === 3 && (
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Pick a Date & Time</h3>
                <p className="text-sm text-gray-500 mb-5">
                  {SESSION_TYPES.find((s) => s.value === selectedSession)?.label} with <strong>{bookingMidwife?.name}</strong>
                </p>
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <CalendarSmIcon /> Select Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#F46A6A]/30 focus:border-[#F46A6A]"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your concern (optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your reason for the appointment or any questions you have..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#F46A6A]/30 focus:border-[#F46A6A]"
                  />
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-xs uppercase tracking-wider text-gray-600 font-semibold mb-2">Booking Summary</p>
                  <div className="space-y-1.5 text-sm">
                    <p className="text-gray-800"><span className="text-gray-500">Midwife:</span> <strong>{bookingMidwife?.name}</strong></p>
                    <p className="text-gray-800"><span className="text-gray-500">Type:</span> <span className="font-medium">{SESSION_TYPES.find((s) => s.value === selectedSession)?.label}</span></p>
                    <p className="text-gray-800"><span className="text-gray-500">Price:</span> <strong className="text-[#F46A6A]">{bookingMidwife?.price}</strong></p>
                    {selectedDate && <p className="text-gray-800"><span className="text-gray-500">Date:</span> <span className="font-medium">{new Date(selectedDate).toLocaleString()}</span></p>}
                    {message && <p className="text-gray-800"><span className="text-gray-500">Message:</span> <span className="font-medium">{message}</span></p>}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setBookingStep(2)} className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
                    Back
                  </button>
                  <button
                    onClick={goToPayment}
                    disabled={!selectedDate}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      selectedDate ? "bg-[#F46A6A] text-white hover:bg-[#e55a5a]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continue to Payment
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Payment Step ── */}
      {showPayment && !bookingConfirmed && bookingMidwife && (
        <PaymentSection
          paymentDetails={{
            midwife: bookingMidwife,
            sessionType: SESSION_TYPES.find((s) => s.value === selectedSession)?.label || selectedSession,
            date: selectedDate,
            message,
          }}
          onBack={() => setShowPayment(false)}
          onPaymentComplete={() => {
            setShowPayment(false);
            setBookingConfirmed(true);
          }}
        />
      )}

      {/* ── Booking Confirmation ── */}
      {bookingConfirmed && (
        <div className="max-w-lg mx-auto text-center py-12">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-500 mb-6">
            Your {SESSION_TYPES.find((s) => s.value === selectedSession)?.label} with <strong>{bookingMidwife?.name}</strong> has been booked and paid for.
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Midwife</span><span className="font-medium text-gray-800">{bookingMidwife?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Session</span><span className="font-medium text-gray-800">{SESSION_TYPES.find((s) => s.value === selectedSession)?.label}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium text-gray-800">{new Date(selectedDate).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Price</span><span className="font-bold text-[#F46A6A]">{bookingMidwife?.price}</span></div>
              {message && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-gray-500 mb-1">Message</p>
                  <p className="font-medium text-gray-800">{message}</p>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={resetBooking}
            className="px-6 py-2.5 rounded-xl bg-[#F46A6A] text-white text-sm font-semibold hover:bg-[#e55a5a] transition-colors shadow-sm"
          >
            Book Another Session
          </button>
        </div>
      )}
    </div>
  );
}
