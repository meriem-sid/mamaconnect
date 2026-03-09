"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  TabKey,
  SIDEBAR_TABS,
  getInitials,
} from "./data";

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  userName: string;
  userEmail: string;
}

export default function Sidebar({ activeTab, onTabChange, userName, userEmail }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleTabClick(tab: typeof SIDEBAR_TABS[number]) {
    if (tab.href) {
      router.push(tab.href);
    } else {
      onTabChange(tab.key);
    }
  }

  function isTabActive(tab: typeof SIDEBAR_TABS[number]) {
    if (tab.href) return pathname === tab.href;
    return activeTab === tab.key && pathname === "/dashboard";
  }

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100 shrink-0">
        <a href="/" className="flex items-center gap-2 select-none">
          <img src="/logo-mamaconnect.png" alt="MamaConnect" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            Mama<span className="text-[#F46A6A]">Connect</span>
          </span>
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto flex flex-col gap-1">
        {SIDEBAR_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
              isTabActive(tab)
                ? "bg-[#F46A6A] text-white shadow-md shadow-[#F46A6A]/20"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <span className={isTabActive(tab) ? "text-white" : "text-gray-400"}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Sidebar Footer — User Preview */}
      <div className="px-4 py-4 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#F46A6A] to-[#FBC4AB] flex items-center justify-center text-white font-bold text-xs shrink-0">
            {getInitials(userName)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
