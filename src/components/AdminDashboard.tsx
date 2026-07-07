import React from "react";
import { CalendarDays, Clock3, Eye, FileText, LogOut, Mail, PhoneCall, ShieldCheck, User, X } from "lucide-react";
import { clearAdminSession, getCallbackRequests, getConsultationRequests, getQuoteRequests } from "../admin/adminStorage";
import { CallbackRequest, ConsultationRequest, QuoteRequest } from "../types";

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

type AdminPage = "quotes" | "consultations" | "callbacks";

type SelectedRecord =
  | { kind: "quote"; data: QuoteRequest }
  | { kind: "consultation"; data: ConsultationRequest }
  | { kind: "callback"; data: CallbackRequest };

const formatSubmittedAt = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const buildMailtoLink = (email: string) => `mailto:${email.trim()}`;

const buildTelLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [quoteRows, setQuoteRows] = React.useState(getQuoteRequests());
  const [consultRows, setConsultRows] = React.useState(getConsultationRequests());
  const [callbackRows, setCallbackRows] = React.useState(getCallbackRequests());
  const [selectedRecord, setSelectedRecord] = React.useState<SelectedRecord | null>(null);
  const [activePage, setActivePage] = React.useState<AdminPage>(() =>
    window.location.pathname.includes("consultations")
      ? "consultations"
      : window.location.pathname.includes("callbacks")
        ? "callbacks"
        : "quotes",
  );

  React.useEffect(() => {
    const refresh = () => {
      setQuoteRows(getQuoteRequests());
      setConsultRows(getConsultationRequests());
      setCallbackRows(getCallbackRequests());
    };

    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  React.useEffect(() => {
    const syncPage = () => {
      setActivePage(
        window.location.pathname.includes("consultations")
          ? "consultations"
          : window.location.pathname.includes("callbacks")
            ? "callbacks"
            : "quotes",
      );
    };

    window.addEventListener("popstate", syncPage);
    return () => window.removeEventListener("popstate", syncPage);
  }, []);

  const navigateToPage = (page: AdminPage) => {
    const nextPath =
      page === "quotes"
        ? "/admin/dashboard/quotes"
        : page === "consultations"
          ? "/admin/dashboard/consultations"
          : "/admin/dashboard/callbacks";
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    clearAdminSession();
    onNavigate("/admin/login");
  };

  const activeCount =
    activePage === "quotes" ? quoteRows.length : activePage === "consultations" ? consultRows.length : callbackRows.length;
  const activeTitle =
    activePage === "quotes"
      ? "Requested Quotes"
      : activePage === "consultations"
        ? "Scheduled Consultations"
        : "Direct Callback Requests";
  const activeDescription =
    activePage === "quotes"
      ? "Review all quote requests here!"
      : activePage === "consultations"
        ? "Review all consultation requests here!"
        : "Review callback bookings from the contact page scheduler!";

  const closeSelectedRecord = () => setSelectedRecord(null);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.10),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.08),transparent_28%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        <header className="rounded-4xl border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-5 sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/10 text-brand-orange text-[10px] font-black uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4" />
                Admin Portal
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-slate-950">Inquiry responses</h1>
                <p className="text-sm text-slate-500 mt-2 max-w-2xl">
                  Review quote and consultation responses in a clean light workspace with modal details.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-700 hover:bg-white hover:border-slate-300 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => navigateToPage("quotes")}
              className={`inline-flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-sm font-bold transition-all ${
                activePage === "quotes"
                  ? "bg-brand-orange text-white border-brand-orange shadow-lg shadow-orange-500/15"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Quotes
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">{quoteRows.length}</span>
            </button>

            <button
              type="button"
              onClick={() => navigateToPage("consultations")}
              className={`inline-flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-sm font-bold transition-all ${
                activePage === "consultations"
                  ? "bg-brand-orange text-white border-brand-orange shadow-lg shadow-orange-500/15"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Consultations
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">{consultRows.length}</span>
            </button>

            <button
              type="button"
              onClick={() => navigateToPage("callbacks")}
              className={`inline-flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-sm font-bold transition-all ${
                activePage === "callbacks"
                  ? "bg-brand-orange text-white border-brand-orange shadow-lg shadow-orange-500/15"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <Clock3 className="w-4 h-4" />
                Callbacks
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">{callbackRows.length}</span>
            </button>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Active Panel</p>
                <p className="text-sm font-bold text-slate-800 mt-1">{activeTitle}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Records</p>
                <p className="text-lg font-black text-brand-orange leading-none mt-1">{activeCount}</p>
              </div>
            </div>
          </div>
        </header>

        {activePage === "quotes" ? (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-brand-orange" />
              <h2 className="text-xl font-black tracking-tight">Requested Quotes</h2>
              <span className="text-xs font-bold text-slate-400">({quoteRows.length})</span>
            </div>

            <div className="overflow-x-auto rounded-4xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <table className="min-w-[940px] w-full table-fixed text-left text-sm">
                <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  <tr>
                    <th className="w-28 px-4 py-4 font-black">ID</th>
                    <th className="w-36 px-4 py-4 font-black">Client</th>
                    <th className="w-56 px-4 py-4 font-black">Email</th>
                    <th className="w-40 px-4 py-4 font-black">Phone</th>
                    <th className="px-4 py-4 font-black">Details</th>
                    <th className="w-24 px-4 py-4 font-black text-center">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {quoteRows.length === 0 ? (
                    <tr>
                      <td className="px-4 py-8 text-slate-400" colSpan={6}>
                        No quote responses yet.
                      </td>
                    </tr>
                  ) : (
                    quoteRows.map((row) => (
                      <tr key={row.id} className="group hover:bg-slate-50 transition-colors align-top">
                        <td className="px-4 py-4 font-mono text-xs text-brand-orange">
                          <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-1 border border-brand-orange/15">
                            {row.id}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 min-w-0">
                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="font-semibold text-slate-900 truncate">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <a
                            href={buildMailtoLink(row.email)}
                            className="inline-flex max-w-full items-center gap-2 text-slate-600 hover:text-brand-orange transition-colors truncate"
                            aria-label={`Email ${row.email}`}
                          >
                            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate">{row.email}</span>
                          </a>
                        </td>
                        <td className="px-4 py-4">
                          <a
                            href={buildTelLink(row.phone)}
                            className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-orange transition-colors"
                            aria-label={`Call ${row.phone}`}
                          >
                            <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate">{row.phone}</span>
                          </a>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1 min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{row.projectType}</p>
                            <p className="text-xs text-slate-500 truncate">{row.budget}</p>
                            <p className="text-xs text-slate-400 truncate">{row.message || "No message provided"}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedRecord({ kind: "quote", data: row })}
                            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-2 text-xs font-black uppercase tracking-wider text-white shadow-sm hover:bg-orange-600 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : activePage === "consultations" ? (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-brand-orange" />
              <h2 className="text-xl font-black tracking-tight">Consultations</h2>
              <span className="text-xs font-bold text-slate-400">({consultRows.length})</span>
            </div>

            <div className="overflow-x-auto rounded-4xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <table className="min-w-[940px] w-full table-fixed text-left text-sm">
                <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  <tr>
                    <th className="w-28 px-4 py-4 font-black">ID</th>
                    <th className="w-36 px-4 py-4 font-black">Client</th>
                    <th className="w-56 px-4 py-4 font-black">Email</th>
                    <th className="w-40 px-4 py-4 font-black">Phone</th>
                    <th className="px-4 py-4 font-black">Details</th>
                    <th className="w-24 px-4 py-4 font-black text-center">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {consultRows.length === 0 ? (
                    <tr>
                      <td className="px-4 py-8 text-slate-400" colSpan={6}>
                        No consultation responses yet.
                      </td>
                    </tr>
                  ) : (
                    consultRows.map((row) => (
                      <tr key={row.id} className="group hover:bg-slate-50 transition-colors align-top">
                        <td className="px-4 py-4 font-mono text-xs text-brand-orange">
                          <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-1 border border-brand-orange/15">
                            {row.id}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 min-w-0">
                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="font-semibold text-slate-900 truncate">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <a
                            href={buildMailtoLink(row.email)}
                            className="inline-flex max-w-full items-center gap-2 text-slate-600 hover:text-brand-orange transition-colors truncate"
                            aria-label={`Email ${row.email}`}
                          >
                            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate">{row.email}</span>
                          </a>
                        </td>
                        <td className="px-4 py-4">
                          <a
                            href={buildTelLink(row.phone)}
                            className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-orange transition-colors"
                            aria-label={`Call ${row.phone}`}
                          >
                            <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate">{row.phone}</span>
                          </a>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1 min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{row.preferredDate}</p>
                            <p className="text-xs text-slate-500 truncate">{row.timeSlot}</p>
                            <p className="text-xs text-slate-400 truncate">{row.message || "No message provided"}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedRecord({ kind: "consultation", data: row })}
                            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-2 text-xs font-black uppercase tracking-wider text-white shadow-sm hover:bg-orange-600 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock3 className="w-5 h-5 text-brand-orange" />
              <h2 className="text-xl font-black tracking-tight">Direct Callback Requests</h2>
              <span className="text-xs font-bold text-slate-400">({callbackRows.length})</span>
            </div>

            <div className="overflow-x-auto rounded-4xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <table className="min-w-[1120px] w-full table-fixed text-left text-sm">
                <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  <tr>
                    <th className="w-28 px-4 py-4 font-black">ID</th>
                    <th className="w-36 px-4 py-4 font-black">Client</th>
                    <th className="w-44 px-4 py-4 font-black">Phone</th>
                    <th className="w-44 px-4 py-4 font-black">Focus Area</th>
                    <th className="w-40 px-4 py-4 font-black">Schedule</th>
                    <th className="px-4 py-4 font-black">Expert</th>
                    <th className="w-24 px-4 py-4 font-black text-center">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {callbackRows.length === 0 ? (
                    <tr>
                      <td className="px-4 py-8 text-slate-400" colSpan={7}>
                        No callback responses yet.
                      </td>
                    </tr>
                  ) : (
                    callbackRows.map((row) => (
                      <tr key={row.id} className="group hover:bg-slate-50 transition-colors align-top">
                        <td className="px-4 py-4 font-mono text-xs text-brand-orange">
                          <span className="inline-flex items-center rounded-full bg-brand-orange/10 px-2.5 py-1 border border-brand-orange/15">
                            {row.id}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 min-w-0">
                            <User className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="font-semibold text-slate-900 truncate">{row.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <a
                            href={buildTelLink(row.phone)}
                            className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-orange transition-colors"
                            aria-label={`Call ${row.phone}`}
                          >
                            <PhoneCall className="w-4 h-4 text-slate-400 shrink-0" />
                            <span className="truncate">{row.phone}</span>
                          </a>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1 min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{row.focusArea}</p>
                            <p className="text-xs text-slate-400 truncate">{formatSubmittedAt(row.submittedAt)}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1 min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{row.preferredDate}</p>
                            <p className="text-xs text-slate-500 truncate">{row.timeSlot}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <p className="font-semibold text-slate-900 truncate">{row.consultantName}</p>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedRecord({ kind: "callback", data: row })}
                            className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-3 py-2 text-xs font-black uppercase tracking-wider text-white shadow-sm hover:bg-orange-600 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <button
              type="button"
              aria-label="Close details"
              onClick={closeSelectedRecord}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
            />

            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_25px_90px_rgba(15,23,42,0.22)] flex flex-col">
              <div className="bg-brand-orange px-6 py-5 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Record Details</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">
                      {selectedRecord.kind === "quote" ? selectedRecord.data.name : selectedRecord.data.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/85">
                      {selectedRecord.kind === "quote"
                        ? selectedRecord.data.projectType
                        : selectedRecord.kind === "consultation"
                          ? selectedRecord.data.timeSlot
                          : selectedRecord.data.focusArea}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeSelectedRecord}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid gap-6 p-6 sm:p-7 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Email</p>
                    {selectedRecord.kind === "callback" ? (
                      <p className="mt-2 text-sm font-semibold text-slate-900">Not provided</p>
                    ) : (
                      <a href={buildMailtoLink(selectedRecord.data.email)} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-brand-orange transition-colors">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {selectedRecord.data.email}
                      </a>
                    )}
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Phone</p>
                    <a href={buildTelLink(selectedRecord.data.phone)} className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-brand-orange transition-colors">
                      <PhoneCall className="w-4 h-4 text-slate-400" />
                      {selectedRecord.data.phone}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Submitted</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{formatSubmittedAt(selectedRecord.data.submittedAt)}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Reference ID</p>
                    <p className="mt-2 text-sm font-semibold text-brand-orange">{selectedRecord.data.id}</p>
                  </div>
                </div>

                {selectedRecord.kind === "quote" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Project Type</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-words">{selectedRecord.data.projectType}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Budget</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-words">{selectedRecord.data.budget}</p>
                    </div>
                  </div>
                )}

                {selectedRecord.kind === "consultation" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Preferred Date</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-words">{selectedRecord.data.preferredDate}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Time Slot</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-words">{selectedRecord.data.timeSlot}</p>
                    </div>
                  </div>
                )}

                {selectedRecord.kind === "callback" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Focus Area</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-words">{selectedRecord.data.focusArea}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Consultant</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-words">{selectedRecord.data.consultantName}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Preferred Date</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-words">{selectedRecord.data.preferredDate}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Time Slot</p>
                      <p className="mt-2 text-sm font-semibold text-slate-900 break-words">{selectedRecord.data.timeSlot}</p>
                    </div>
                  </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">
                    {selectedRecord.kind === "quote"
                      ? "Project Notes"
                      : selectedRecord.kind === "consultation"
                        ? "Consultation Notes"
                        : "Callback Notes"}
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap break-words">
                    {selectedRecord.kind === "quote"
                      ? selectedRecord.data.message || "No project notes provided."
                      : selectedRecord.kind === "consultation"
                        ? selectedRecord.data.message || "No consultation notes provided."
                        : `${selectedRecord.data.focusArea} with ${selectedRecord.data.consultantName} on ${selectedRecord.data.preferredDate} at ${selectedRecord.data.timeSlot}.`}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-1">
                  {selectedRecord.kind !== "callback" && (
                    <a
                      href={buildMailtoLink(selectedRecord.data.email)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:border-brand-orange hover:text-brand-orange transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Email Client
                    </a>
                  )}
                  <a
                    href={buildTelLink(selectedRecord.data.phone)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-white hover:bg-orange-600 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Call Client
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
