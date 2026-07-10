import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, KeyRound, Lock, LogIn, ShieldCheck, Sparkles } from "lucide-react";
import { loginAdmin, signupAdmin } from "../admin/adminStorage";
import { login, signup } from "../api/authApi";

type AuthMode = "login" | "signup";

interface AdminAuthProps {
  initialMode?: AuthMode;
  onNavigate: (path: string) => void;
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ initialMode = "login", onNavigate }) => {
  const [mode, setMode] = React.useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [signupName, setSignupName] = React.useState("");
  const [signupEmail, setSignupEmail] = React.useState("");
  const [signupPassword, setSignupPassword] = React.useState("");

  const [signupConfirmPassword, setSignupConfirmPassword] = React.useState("");
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  React.useEffect(() => {
    setMode(initialMode);
    setError(null);
  }, [initialMode]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("1. Login clicked");

    try {
      const response = await login({
        email: loginEmail,
        password: loginPassword,
      });

      console.log("2. Login success", response.data);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "admin",
        JSON.stringify({
          fullName: response.data.fullName,
          email: response.data.email,
          role: response.data.role,
        })
      );

      console.log("3. Before navigate");

      onNavigate("/admin/dashboard/quotes");

      console.log("4. After navigate");

    } catch (error) {
      console.log("Login error", error);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupForm.name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!signupForm.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!signupForm.password.trim()) {
      alert("Please enter your password.");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await signup({
        fullName: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
        confirmPassword: signupForm.confirmPassword,
      });

      alert(response.data.message ?? "Signup successful!");

      setSignupForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setMode("login");

    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ??
        "Unable to register admin."
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]" />
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-size-[48px_48px]" />

      <div className="absolute -top-12 right-8 hidden xl:block w-72 h-72 rounded-full bg-brand-orange/10 blur-3xl" />
      <div className="absolute bottom-4 left-0 hidden xl:block w-80 h-80 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <section className="lg:col-span-5 rounded-[2rem] border border-slate-200 bg-white/85 backdrop-blur-xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(249,115,22,0.08),transparent_42%)] pointer-events-none" />

            <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em]">
              <Sparkles className="w-4 h-4" />
              Protected Admin Route
            </div>

            <div className="relative mt-6 space-y-4">
              <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight max-w-md text-slate-950">
                Secure access for your response portal.
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                Sign in or create the first admin account to manage quote requests, consultation bookings, and the live expert workflow.
              </p>
            </div>

            <div className="relative mt-8 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <KeyRound className="w-4 h-4 text-brand-orange" />
                <p className="mt-3 text-xs font-black uppercase tracking-widest text-slate-400">Private Workspace</p>
                <p className="mt-1 text-sm text-slate-700">No public sign-in entry points</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <p className="mt-3 text-xs font-black uppercase tracking-widest text-slate-400">Protected Session</p>
                <p className="mt-1 text-sm text-slate-700">Route-gated admin workspace</p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-7 rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.09)] p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-amber-400 to-sky-400" />

            <div className="flex flex-wrap gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 w-fit shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "login" ? "bg-brand-orange text-white shadow-md shadow-orange-500/20" : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "signup" ? "bg-brand-orange text-white shadow-md shadow-orange-500/20" : "text-slate-500 hover:text-slate-900"
                  }`}
              >
                Signup
              </button>
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="mt-6 space-y-5">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                    placeholder="admin@company.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3.5 pr-12 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-0 px-4 text-slate-400 hover:text-slate-900"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.25em] hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <LogIn className="w-4 h-4" />
                  {loading ? "Signing in..." : "Access Dashboard"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
                      Admin Name
                    </label>
                    <input
                      type="text"
                      required
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({
                        ...signupForm,
                        name: e.target.value,
                      })
                      }
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                      placeholder="Operations Lead"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      required
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({
                        ...signupForm,
                        email: e.target.value,
                      })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                      placeholder="admin@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({
                        ...signupForm,
                        password: e.target.value,
                      })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                      placeholder="Create a password"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({
                        ...signupForm,
                        confirmPassword: e.target.value,
                      })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-colors"
                      placeholder="Repeat the password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-orange text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-[0.25em] hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <ArrowRight className="w-4 h-4" />
                  {loading ? "Creating account..." : "Create Admin Account"}
                </button>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};
