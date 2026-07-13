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
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.14),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)] text-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-45" />
      <div className="absolute -top-24 right-2 hidden h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl xl:block" />
      <div className="absolute bottom-0 left-0 hidden h-96 w-96 rounded-full bg-slate-900/10 blur-3xl xl:block" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/85 shadow-[0_30px_100px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative overflow-hidden bg-[linear-gradient(160deg,#0f172a_0%,#111827_55%,#F97316_175%)] px-7 py-10 text-white sm:px-10 sm:py-12">
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.24),transparent_32%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-white/85">
                  <Sparkles className="h-4 w-4" />
                  Protected Admin Access
                </div>

                <div className="space-y-4">
                  <h1 className="max-w-md font-display text-3xl font-black tracking-tight sm:text-4xl">
                    Secure the admin workspace with a cleaner, sharper control surface.
                  </h1>
                  <p className="max-w-md text-sm leading-relaxed text-slate-200">
                    Sign in or create the first admin account to manage quote requests, consultation bookings, and callback records from a single workspace.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <KeyRound className="h-5 w-5 text-brand-orange" />
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/55">Access Scope</p>
                  <p className="mt-2 text-sm font-semibold text-white">Private route for the admin team</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <ShieldCheck className="h-5 w-5 text-brand-orange" />
                  <p className="mt-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/55">Session State</p>
                  <p className="mt-2 text-sm font-semibold text-white">Session-gated dashboard access</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-black/15 p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-orange-500/20">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/55">Brand palette</p>
                    <p className="mt-1 text-sm font-semibold text-white">Slate neutrals, warm orange, and deep charcoal</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden bg-white px-6 py-7 sm:px-8 sm:py-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-amber-400 to-sky-400" />

            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 w-fit shadow-sm">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-[0.25em] transition-all ${
                  mode === "login" ? "bg-brand-orange text-white shadow-md shadow-orange-500/20" : "text-slate-500 hover:text-slate-900"
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
                className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-[0.25em] transition-all ${
                  mode === "signup" ? "bg-brand-orange text-white shadow-md shadow-orange-500/20" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Signup
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-black tracking-tight text-slate-950">
                {mode === "login" ? "Sign in to continue" : "Create the first admin account"}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
                Use the same workspace style as the dashboard so the auth step feels like part of the product, not a separate experience.
              </p>
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            {mode === "login" ? (
              <form onSubmit={handleLogin} className="mt-6 space-y-5">
                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:outline-none"
                    placeholder="admin@company.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:outline-none"
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-0 px-4 text-slate-400 transition-colors hover:text-slate-900"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3.5 text-xs font-black uppercase tracking-[0.28em] text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-950/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <LogIn className="h-4 w-4" />
                  {loading ? "Signing in..." : "Access Dashboard"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
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
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:outline-none"
                      placeholder="Operations Lead"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
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
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:outline-none"
                      placeholder="admin@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
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
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:outline-none"
                      placeholder="Create a password"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
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
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-brand-orange focus:bg-white focus:outline-none"
                      placeholder="Repeat the password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3.5 text-xs font-black uppercase tracking-[0.28em] text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-950/10 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <ArrowRight className="h-4 w-4" />
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
