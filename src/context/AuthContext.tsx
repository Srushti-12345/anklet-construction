import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { refreshAccessToken } from "../api/api";
import { logout as apiLogout } from "../api/authApi";

// ── Types ─────────────────────────────────────────────────────────────
export interface AdminInfo {
  fullName: string;
  email: string;
  role: string;
  signedInAt: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  admin: AdminInfo | null;
  login: (accessToken: string, admin: AdminInfo) => void;
  logout: () => Promise<void>;
}

// ── Context ───────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const didInit = useRef(false);

  // ── Startup: attempt to restore session ──────────────────────────
  useEffect(() => {
    // Guard against StrictMode double-mount
    if (didInit.current) return;
    didInit.current = true;

    const restoreSession = async () => {
      const existingToken = localStorage.getItem("accessToken");
      const existingAdmin = localStorage.getItem("admin");

      // Case 1: token already present — trust it (interceptor refreshes on 401)
      if (existingToken && existingAdmin) {
        try {
          setAdmin(JSON.parse(existingAdmin));
          setIsAuthenticated(true);
        } catch {
          // Corrupted admin data
          localStorage.removeItem("accessToken");
          localStorage.removeItem("admin");
        }
        setIsLoading(false);
        return;
      }

      // Case 2: no token but admin data exists — user was logged in,
      //         token likely expired. Try refreshing via the HttpOnly cookie.
      if (!existingToken && existingAdmin) {
        try {
          await refreshAccessToken();
          setAdmin(JSON.parse(existingAdmin));
          setIsAuthenticated(true);
        } catch {
          // Refresh failed — session is truly expired
          localStorage.removeItem("accessToken");
          localStorage.removeItem("admin");
          setIsAuthenticated(false);
          setAdmin(null);
        }
        setIsLoading(false);
        return;
      }

      // Case 3: nothing at all — not logged in
      setIsAuthenticated(false);
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  // ── Login: called after a successful POST /auth/login ────────────
  const login = useCallback((accessToken: string, adminInfo: AdminInfo) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("admin", JSON.stringify(adminInfo));
    setAdmin(adminInfo);
    setIsAuthenticated(true);
  }, []);

  // ── Logout: clear everything and call the backend ────────────────
  const logout = useCallback(async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("admin");
      setAdmin(null);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ── Hook ──────────────────────────────────────────────────────────────
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
