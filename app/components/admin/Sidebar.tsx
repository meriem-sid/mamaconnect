"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/components/auth/AuthContext";
import {
  IoGridOutline,
  IoPeopleOutline,
  IoMedkitOutline,
  IoDocumentTextOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoClose,
} from "react-icons/io5";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: IoGridOutline },
  { label: "Users", href: "/admin/users", icon: IoPeopleOutline },
  { label: "Midwives", href: "/admin/midwives", icon: IoMedkitOutline },
  { label: "Articles", href: "/admin/articles", icon: IoDocumentTextOutline },
  { label: "Settings", href: "/admin/settings", icon: IoSettingsOutline },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-65 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand - matching app logo pattern */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
          <Link href="/admin" className="flex items-center gap-2">
            <img src="/logo-mamaconnect.png" alt="MamaConnect" className="w-7 h-7 object-contain" />
            <span className="font-bold text-xl text-gray-900">
              Mama<span className="text-[#F46A6A]">Connect</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-[#F46A6A]/10 transition-colors duration-200">
            <IoClose size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Menu</p>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-[#F46A6A] text-white shadow-md shadow-[#F46A6A]/20"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon size={20} className={active ? "text-white" : "text-gray-400"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-red-50 hover:text-[#F46A6A] transition-all duration-200 w-full"
          >
            <IoLogOutOutline size={20} className="text-gray-400" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
