"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { TabKey, SIDEBAR_TABS, ALERTS, alertStyles, getInitials } from "./data";
import { BellIcon } from "./icons";
import ProfileDropdown from "./ProfileDropdown";

interface HeaderBarProps {
  activeTab: TabKey;
  user: { name: string; email: string };
  onLogout: () => void;
}

export default function HeaderBar({ activeTab, user, onLogout }: HeaderBarProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Mark all notifications as read when the panel is opened
  const handleToggleNotif = useCallback(() => {
    setNotifOpen((v) => {
      const next = !v;
      if (next) {
        setHasUnread(false);
      }
      return next;
    });
    setProfileOpen(false);
  }, []);

  const unreadCount = ALERTS.length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 sm:px-8">
      <div>
        <h1 className="text-lg font-bold text-gray-900">
          {SIDEBAR_TABS.find((t) => t.key === activeTab)?.label}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={handleToggleNotif}
            className="relative w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <BellIcon />
            {hasUnread && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#F46A6A] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-400">{ALERTS.length} alerts today</p>
                </div>
                {ALERTS.filter((a) => a.type === "critical").length > 0 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 uppercase tracking-wider">
                    {ALERTS.filter((a) => a.type === "critical").length} critical
                  </span>
                )}
              </div>

              {/* Alerts list */}
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                {ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${alertStyles[alert.type].bg}`}
                  >
                    <span className={`mt-1.5 shrink-0 block w-2.5 h-2.5 rounded-full ${alertStyles[alert.type].dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className={`text-xs font-semibold truncate ${alertStyles[alert.type].text}`}>{alert.title}</p>
                        <span className="text-[10px] text-gray-400 shrink-0">{alert.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{alert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-gray-100 text-center">
                <button
                  onClick={() => setNotifOpen(false)}
                  className="text-xs font-semibold text-[#F46A6A] hover:underline cursor-pointer"
                >
                  View all in Monitoring
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
            className="w-10 h-10 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:shadow-lg hover:shadow-[#F46A6A]/20 transition-all duration-200"
          >
            {getInitials(user.name)}
          </button>

          {profileOpen && (
            <ProfileDropdown user={user} onLogout={onLogout} />
          )}
        </div>
      </div>
    </header>
  );
}
