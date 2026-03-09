"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthUser {
  name: string;
  email: string;
  phone: string;
  role: "client" | "midwife";
  status: "active" | "pending";
  plan: "free" | "premium";
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string) => void;
  signup: (name: string, email: string, phone: string, role: "client" | "midwife", status?: "active" | "pending") => void;
  logout: () => void;
  upgradePlan: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "mamaconnect_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure existing stored users get a default plan
        if (!parsed.plan) parsed.plan = "free";
        setUser(parsed);
      }
    } catch {
      // ignore parse errors
    }
    setIsLoading(false);
  }, []);

  function login(email: string) {
    const authUser: AuthUser = { name: email.split("@")[0], email, phone: "", role: "client", status: "active", plan: "free" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  }

  function signup(name: string, email: string, phone: string, role: "client" | "midwife", status: "active" | "pending" = "active") {
    const authUser: AuthUser = { name, email, phone, role, status, plan: "free" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    setUser(authUser);
  }

  function upgradePlan() {
    if (!user) return;
    const updated = { ...user, plan: "premium" as const };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setUser(updated);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, upgradePlan }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
