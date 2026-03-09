"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/components/auth/AuthContext";

const AUTH_NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/articles", label: "Articles" },
  { href: "/download", label: "Download App" },
];

const PUBLIC_NAV_LINKS = [
  { href: "/articles", label: "Articles" },
  { href: "/download", label: "Download App" },
];

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const navLinks = user ? AUTH_NAV_LINKS : PUBLIC_NAV_LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/");
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href={user ? "/dashboard" : "/"} className="flex items-center gap-2 select-none">
          <img src="/logo-mamaconnect.png" alt="MamaConnect" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl text-gray-900 tracking-tight">
            Mama<span className="text-[#F46A6A]">Connect</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                pathname === l.href
                  ? "text-[#F46A6A] border-b-2 border-[#F46A6A] pb-0.5"
                  : "text-gray-600 hover:text-[#F46A6A]"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-[#F46A6A] px-5 py-2 rounded-full border border-[#F46A6A] hover:bg-rose-50 transition-colors duration-200"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a
                href="/auth?mode=login"
                className="text-sm font-semibold text-[#F46A6A] px-5 py-2 rounded-full border border-[#F46A6A] hover:bg-rose-50 transition-colors duration-200"
              >
                Sign In
              </a>
              <a
                href="/auth"
                className="text-sm font-semibold text-white bg-[#F46A6A] px-5 py-2 rounded-full hover:bg-[#e55d5d] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </a>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 pb-5 flex flex-col gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-3 border-b border-gray-50 transition-colors ${
                pathname === l.href
                  ? "text-[#F46A6A] bg-rose-50/50 rounded-lg px-2"
                  : "text-gray-700 hover:text-[#F46A6A]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-4">
            {user ? (
              <button
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                className="flex-1 text-center text-sm font-semibold text-[#F46A6A] px-4 py-2.5 rounded-full border border-[#F46A6A] hover:bg-rose-50 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <a
                  href="/auth?mode=login"
                  className="flex-1 text-center text-sm font-semibold text-[#F46A6A] px-4 py-2.5 rounded-full border border-[#F46A6A] hover:bg-rose-50 transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/auth"
                  className="flex-1 text-center text-sm font-semibold text-white bg-[#F46A6A] px-4 py-2.5 rounded-full hover:bg-[#e55d5d] transition-colors"
                >
                  Get Started
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
