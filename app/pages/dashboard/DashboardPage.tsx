"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/components/auth/AuthContext";
import { TabKey, Midwife } from "@/app/components/dashboard/data";
import Sidebar from "@/app/components/dashboard/Sidebar";
import HeaderBar from "@/app/components/dashboard/HeaderBar";
import DashboardHome from "@/app/components/dashboard/DashboardHome";
import MonitoringAlerts from "@/app/components/dashboard/MonitoringAlerts";
import BookingSection from "@/app/components/dashboard/BookingSection";
import ShopSection from "@/app/components/dashboard/ShopSection";
import ChatSection from "@/app/components/dashboard/ChatSection";

import TrackerSection from "@/app/components/dashboard/TrackerSection";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabKey) || "home";
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);
  const [greeting, setGreeting] = useState("Good morning");
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const loggingOut = useRef(false);

  // Booking state lifted here so midwife selection can pass through
  const [bookingMidwife, setBookingMidwife] = useState<Midwife | null>(null);

  useEffect(() => {
    if (!isLoading && !user && !loggingOut.current) {
      router.replace("/auth?mode=login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  function handleLogout() {
    loggingOut.current = true;
    logout();
    router.push("/");
  }

  if (isLoading || !user) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-[#F46A6A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userName={user.name}
        userEmail={user.email}
      />

      <div className="flex-1 ml-64">
        <HeaderBar
          activeTab={activeTab}
          user={user}
          onLogout={handleLogout}
        />

        <main className="min-h-[calc(100vh-4rem)]">
          {activeTab === "home" && (
            <DashboardHome
              greeting={greeting}
              userName={user.name}
              onGoToBooking={() => setActiveTab("booking")}
            />
          )}
          {activeTab === "monitoring" && <MonitoringAlerts />}
          {activeTab === "booking" && (
            <BookingSection
              preselectedMidwife={bookingMidwife}
              onClearPreselected={() => setBookingMidwife(null)}
            />
          )}
          {activeTab === "shop" && <ShopSection />}
          {activeTab === "chat" && <ChatSection onGoToShop={() => setActiveTab("shop")} />}
          {activeTab === "timeline" && <TrackerSection />}
        </main>
      </div>
    </div>
  );
}
