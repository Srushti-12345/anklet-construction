import React from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  FileText,
  LogOut,
  Mail,
  PhoneCall,
  Trash2,
  UserCircle2,
  UsersRound,
  X,
} from "lucide-react";
import { AnkletLogo } from "./AnkletLogo";
import {
  clearAdminSession,

  getAdminSession,
  type AdminRecordStatus,
} from "../admin/adminStorage";
import { CallbackRequest, ConsultationRequest, QuoteRequest } from "../types";
import { useEffect, useState } from "react";
import { getAllQuotes, updateQuoteStatus, deleteQuote } from "../api/quoteApi";
import { getAllConsultations, updateConsultationStatus, deleteConsultation } from "../api/consultationApi";
import { getAllTechnicalConsultations, updateCallbackStatus, deleteCallback } from "../api/technicalConsultationApi";
import { logout } from "../api/authApi";


interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

type AdminPage = "quotes" | "consultations" | "callbacks";

type QuoteRow = QuoteRequest & { status: AdminRecordStatus };
type ConsultationRow = ConsultationRequest & { status: AdminRecordStatus };
type CallbackRow = CallbackRequest & { status: AdminRecordStatus };

type SelectedRecord =
  | { kind: "quote"; data: QuoteRow }
  | { kind: "consultation"; data: ConsultationRow }
  | { kind: "callback"; data: CallbackRow };

const RECORD_STATUS_OPTIONS: AdminRecordStatus[] = ["NEW", "CONTACTED", "COMPLETED", "CLOSED"];

const STATUS_META: Record<AdminRecordStatus, { label: string; chip: string; select: string }> = {
  NEW: {
    label: "New",
    chip: "bg-amber-50 text-amber-700 border-amber-200",
    select: "bg-amber-50 text-amber-800 border-amber-200 focus:border-amber-400",
  },
  CONTACTED: {
    label: "Contacted",
    chip: "bg-sky-50 text-sky-700 border-sky-200",
    select: "bg-sky-50 text-sky-800 border-sky-200 focus:border-sky-400",
  },
  COMPLETED: {
    label: "Completed",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200",
    select: "bg-emerald-50 text-emerald-800 border-emerald-200 focus:border-emerald-400",
  },
  CLOSED: {
    label: "Closed",
    chip: "bg-slate-100 text-slate-700 border-slate-200",
    select: "bg-slate-100 text-slate-700 border-slate-200 focus:border-slate-400",
  },
};

const statusLabel = (value: AdminRecordStatus) => STATUS_META[value].label;

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

const buildMailtoLink = (email?: string) =>
  email ? `mailto:${email.trim()}` : "#";

const buildTelLink = (phone?: string) =>
  phone ? `tel:${phone.replace(/\s+/g, "")}` : "#";

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [quoteRows, setQuoteRows] = React.useState([]);
  const [consultRows, setConsultRows] = React.useState([]);
  const [callbackRows, setCallbackRows] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState<SelectedRecord | null>(null);
  const [activePage, setActivePage] = React.useState<AdminPage>(() =>
    window.location.pathname.includes("consultations")
      ? "consultations"
      : window.location.pathname.includes("callbacks")
        ? "callbacks"
        : "quotes",
  );
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [adminSession, setAdminSession] = React.useState(() => getAdminSession());
  console.log("Admin session:", adminSession);
  const profileMenuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    loadDashboardData();
  }, []);

  const recordId = selectedRecord
    ? selectedRecord.kind === "quote"
      ? selectedRecord.data.quoteId
      : selectedRecord.kind === "consultation"
        ? selectedRecord.data.consultationId
        : selectedRecord.data.technicalConsultationId
    : "";

  const loadDashboardData = async () => {
    try {
      const [quotesRes, consultationsRes, technicalRes] = await Promise.all([
        getAllQuotes(),
        getAllConsultations(),
        getAllTechnicalConsultations(),
      ]);

      setQuoteRows(quotesRes.data);
      setConsultRows(consultationsRes.data);
      setCallbackRows(technicalRes.data);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    }
  };

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

  React.useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
        setSelectedRecord(null);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
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

  const handleLogout = async () => {
    try {
      await logout(); // Calls POST /auth/logout
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("accessToken");
      clearAdminSession();
      onNavigate("/admin/login");
    }
  };

  const updateSelectedStatus = async (status: AdminRecordStatus) => {
    if (!selectedRecord) {
      return;
    }

    if (selectedRecord.kind === "quote") {
      try {
        await updateQuoteStatus(
          selectedRecord.data.quoteId,
          status
        );

        setQuoteRows((rows) =>
          rows.map((row) =>
            row.quoteId === selectedRecord.data.quoteId
              ? { ...row, status }
              : row
          )
        );

        setSelectedRecord({
          kind: "quote",
          data: {
            ...selectedRecord.data,
            status,
          },
        });
      } catch (error) {
        console.error(error);
      }

      return;
    }

    if (selectedRecord.kind === "consultation") {
      try {
        await updateConsultationStatus(
          selectedRecord.data.consultationId,
          status
        );

        setConsultRows((rows) =>
          rows.map((row) =>
            row.id === selectedRecord.data.consultationId
              ? { ...row, status }
              : row
          )
        );

        setSelectedRecord({
          kind: "consultation",
          data: {
            ...selectedRecord.data,
            status,
          },
        });
      } catch (error) {
        console.error("Failed to update consultation status:", error);
      }

      return;
    }

    try {
      await updateCallbackStatus(
        selectedRecord.data.technicalConsultationId,
        status
      );

      setCallbackRows((rows) =>
        rows.map((row) =>
          row.id === selectedRecord.data.technicalConsultationId
            ? { ...row, status }
            : row
        )
      );

      setSelectedRecord({
        kind: "callback",
        data: {
          ...selectedRecord.data,
          status,
        },
      });
    } catch (error) {
      console.error("Failed to update callback status:", error);
    }

    return;
  };

  const deleteSelectedRecord = async () => {
    if (!selectedRecord) {
      return;
    }

    const confirmed = window.confirm("Delete this record permanently?");
    if (!confirmed) {
      return;
    }

    try {
      if (selectedRecord.kind === "quote") {
        await deleteQuote(selectedRecord.data.quoteId);
        setQuoteRows((rows) =>
          rows.filter((row) => row.quoteId !== selectedRecord.data.quoteId)
        );
      } else if (selectedRecord.kind === "consultation") {
        await deleteConsultation(selectedRecord.data.consultationId);
        setConsultRows((rows) =>
          rows.filter(
            (row) => row.consultationId !== selectedRecord.data.consultationId
          )
        );
      } else {
        await deleteCallback(selectedRecord.data.technicalConsultationId);
        setCallbackRows((rows) =>
          rows.filter(
            (row) =>
              row.technicalConsultationId !==
              selectedRecord.data.technicalConsultationId
          )
        );
      }

      setSelectedRecord(null);
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  const activeRows =
    activePage === "quotes" ? quoteRows : activePage === "consultations" ? consultRows : callbackRows;

  const activeTitle =
    activePage === "quotes"
      ? "Requested Quotes"
      : activePage === "consultations"
        ? "Scheduled Consultations"
        : "Direct Callback Requests";

  const activeDescription =
    activePage === "quotes"
      ? "Latest quote requests are surfaced first, with status tracking and full record cards."
      : activePage === "consultations"
        ? "Review consultation bookings in a focused workspace built for quick triage."
        : "Manage callback requests with clear status controls and fast record access.";


  const activeCount = activeRows.length;
  const adminName = adminSession?.fullName?.trim() || "Admin";
  const recordTypeLabel =
    selectedRecord?.kind === "quote"
      ? "Project Type"
      : selectedRecord?.kind === "consultation"
        ? "Preferred Date"
        : "Focus Area";
  const recordTypeValue = selectedRecord
    ? selectedRecord.kind === "quote"
      ? selectedRecord.data.projectClassification
      : selectedRecord.kind === "consultation"
        ? selectedRecord.data.preferredDate
        : selectedRecord.data.consultationFocusArea
    : "";
  const recordSecondaryLabel =
    selectedRecord?.kind === "quote"
      ? "Budget"
      : selectedRecord?.kind === "consultation"
        ? "Time Slot"
        : "Consultant";
  const recordSecondaryValue = selectedRecord
    ? selectedRecord.kind === "quote"
      ? selectedRecord.data.estimatedProjectBudget
      : selectedRecord.kind === "consultation"
        ? selectedRecord.data.timeSlot
        : selectedRecord.data.consultantName
    : "";

  const renderStatusSelect = (value: AdminRecordStatus, onChange: (status: AdminRecordStatus) => void) => (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as AdminRecordStatus)}
      onClick={(event) => event.stopPropagation()}
      className={`w-full rounded-xl border px-3 py-2 text-xs font-semibold capitalize outline-none transition-colors ${STATUS_META[value].select}`}
    >
      {RECORD_STATUS_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {statusLabel(option)}
        </option>
      ))}
    </select>
  );

  const openRecord = (record: SelectedRecord) => {
    setSelectedRecord(record);
    setProfileMenuOpen(false);
  };

  const handleRowKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>, record: SelectedRecord) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openRecord(record);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.1),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] text-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[42px_42px] opacity-50" />

      <div className="relative grid min-h-screen w-full gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-0 lg:py-0">
        <aside className="min-h-[calc(100vh-2rem)] rounded-none border border-slate-200 bg-slate-950/95 text-white shadow-[0_24px_70px_rgba(15,23,42,0.15)] backdrop-blur-xl lg:sticky lg:top-0 lg:min-h-screen">
          <div className="flex h-full flex-col px-4 py-5 sm:px-5 sm:py-6">
            <div className="flex items-start justify-center">
              <AnkletLogo height={52} showText lightText align="center" />
            </div>

            <nav className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => navigateToPage("quotes")}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${activePage === "quotes"
                  ? "border-brand-orange/40 bg-brand-orange text-white shadow-lg shadow-orange-500/20"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                  }`}
              >
                <span className="inline-flex items-center gap-3 text-sm font-bold">
                  <FileText className="h-4 w-4" />
                  Quotes
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">
                  {quoteRows.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigateToPage("consultations")}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${activePage === "consultations"
                  ? "border-brand-orange/40 bg-brand-orange text-white shadow-lg shadow-orange-500/20"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                  }`}
              >
                <span className="inline-flex items-center gap-3 text-sm font-bold">
                  <CalendarDays className="h-4 w-4" />
                  Consultations
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">
                  {consultRows.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => navigateToPage("callbacks")}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${activePage === "callbacks"
                  ? "border-brand-orange/40 bg-brand-orange text-white shadow-lg shadow-orange-500/20"
                  : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/10"
                  }`}
              >
                <span className="inline-flex items-center gap-3 text-sm font-bold">
                  <Clock3 className="h-4 w-4" />
                  Callbacks
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">
                  {callbackRows.length}
                </span>
              </button>
            </nav>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Active Panel</p>
                <p className="mt-2 text-sm font-bold text-white">{activeTitle}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-300">{activeDescription}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Open Records</p>
                <p className="mt-2 text-3xl font-black tracking-tight text-brand-orange">{activeCount}</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-col gap-6">
          <header className="rounded-4xl border border-slate-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-orange">
                  <UsersRound className="h-4 w-4" />
                  Admin Dashboard
                </div>
                <div>
                  <h2 className="font-display text-2xl font-black tracking-tight text-slate-950 sm:text-[2rem]">
                    Welcome, {adminName}!
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">
                    Review incoming requests, update statuses, and open detailed records.
                  </p>
                </div>
              </div>

              <div ref={profileMenuRef} className="relative self-start">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((value) => !value)}
                  className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left shadow-sm transition-colors hover:border-slate-300 hover:bg-white"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white">
                    <UserCircle2 className="h-5 w-5" />
                  </span>
                  <span className="hidden min-w-0 sm:flex sm:flex-col">
                    <span className="truncate text-sm font-bold text-slate-900">{adminName}</span>
                    <span className="truncate text-xs text-slate-500">{adminSession?.email ?? "admin"}</span>
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Signed In</p>
                      <p className="mt-2 text-base font-bold text-slate-950">{adminSession?.fullName}</p>
                      <p className="mt-1 wrap-break-word text-sm text-slate-500">{adminSession?.email}</p>
                      <p className="mt-3 text-xs text-slate-400">
                        Session started at {adminSession?.signedInAt ? formatSubmittedAt(adminSession.signedInAt) : "unknown"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Quotes</p>
                <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">{quoteRows.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Consultations</p>
                <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">{consultRows.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Callbacks</p>
                <p className="mt-2 text-2xl font-black tracking-tight text-slate-950">{callbackRows.length}</p>
              </div>
            </div>
          </header>

          {activePage === "quotes" && (
            <RecordTable
              title="Quotes"
              icon={<FileText className="h-5 w-5 text-brand-orange" />}
              rows={quoteRows}
              emptyMessage="No quote responses yet."
              columns={[
                { label: "ID", className: "w-32" },
                { label: "Client", className: "w-44" },
                { label: "Contact", className: "w-56" },
                { label: "Scope", className: "min-w-[280px]" },
                { label: "Submitted", className: "w-52" },
                { label: "Status", className: "w-44" },
              ]}
              renderRow={(row) => (
                <>
                  <td className="px-5 py-5 font-mono text-xs font-bold text-brand-orange">
                    <span className="inline-flex rounded-full border border-brand-orange/15 bg-brand-orange/10 px-2.5 py-1">
                      {row.quoteId}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <p className="font-bold text-slate-950">{row.fullName}</p>
                    <p className="mt-1 text-xs text-slate-500">Quote request</p>
                  </td>
                  <td className="px-5 py-5">
                    <div className="space-y-1 text-sm text-slate-700">
                      <a
                        href={buildMailtoLink(row.emailAddress)}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 font-medium text-slate-700 transition-colors hover:text-brand-orange"
                      >
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{row.emailAddress}</span>
                      </a>
                      <a
                        href={buildTelLink(row.contactNumber)}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 font-medium text-slate-700 transition-colors hover:text-brand-orange"
                      >
                        <PhoneCall className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{row.contactNumber}</span>
                      </a>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-950">{row.projectClassification}</p>
                      <p className="text-xs text-slate-500">{row.estimatedProjectBudget}</p>
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                        {row.projectVisionScopeSpecifications || "No message provided"}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-sm text-slate-600">{formatSubmittedAt(row.submittedAt)}</td>
                  <td className="px-5 py-5">
                    {renderStatusSelect(row.status, async (status) => {
                      try {
                        await updateQuoteStatus(row.quoteId, status);

                        setQuoteRows((rows) =>
                          rows.map((r) =>
                            r.quoteId === row.quoteId
                              ? { ...r, status }
                              : r
                          )
                        );
                      } catch (error) {
                        console.error("Failed to update quote status:", error);
                      }
                    })}
                  </td>
                </>
              )}
              onRowClick={(row) => openRecord({ kind: "quote", data: row })}
              onRowKeyDown={(event, row) => handleRowKeyDown(event, { kind: "quote", data: row })}
            />
          )}

          {activePage === "consultations" && (
            <RecordTable
              title="Consultations"
              icon={<CalendarDays className="h-5 w-5 text-brand-orange" />}
              rows={consultRows}
              emptyMessage="No consultation responses yet."
              columns={[
                { label: "ID", className: "w-32" },
                { label: "Client", className: "w-44" },
                { label: "Contact", className: "w-56" },
                { label: "Schedule", className: "min-w-[280px]" },
                { label: "Notes", className: "w-64" },
                { label: "Status", className: "w-44" },
              ]}
              renderRow={(row) => (
                <>
                  <td className="px-5 py-5 font-mono text-xs font-bold text-brand-orange">
                    <span className="inline-flex rounded-full border border-brand-orange/15 bg-brand-orange/10 px-2.5 py-1">
                      {row.consultationId}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <p className="font-bold text-slate-950">{row.fullName}</p>
                    <p className="mt-1 text-xs text-slate-500">Consultation request</p>
                  </td>
                  <td className="px-5 py-5">
                    <div className="space-y-1 text-sm text-slate-700">
                      <a
                        href={buildMailtoLink(row.emailAddress)}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 font-medium text-slate-700 transition-colors hover:text-brand-orange"
                      >
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{row.emailAddress}</span>
                      </a>
                      <a
                        href={buildTelLink(row.contactNumber)}
                        onClick={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 font-medium text-slate-700 transition-colors hover:text-brand-orange"
                      >
                        <PhoneCall className="h-4 w-4 text-slate-400" />
                        <span className="truncate">{row.contactNumber}</span>
                      </a>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-950">{row.preferredDate}</p>
                      <p className="text-xs text-slate-500">{row.timeSlot}</p>
                      <p className="text-xs text-slate-400">{formatSubmittedAt(row.submittedAt)}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="max-w-[16rem] space-y-1">
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                        {row.consultationTopic || "No message provided"}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    {renderStatusSelect(row.status, async (status) => {
                      try {
                        await updateConsultationStatus(row.consultationId, status);

                        setConsultRows((rows) =>
                          rows.map((item) =>
                            item.consultationId === row.consultationId
                              ? { ...item, status }
                              : item
                          )
                        );
                      } catch (error) {
                        console.error("Failed to update consultation status:", error);
                      }
                    })}
                  </td>
                </>
              )}
              onRowClick={(row) => openRecord({ kind: "consultation", data: row })}
              onRowKeyDown={(event, row) => handleRowKeyDown(event, { kind: "consultation", data: row })}
            />
          )}

          {activePage === "callbacks" && (
            <RecordTable
              title="Callbacks"
              icon={<Clock3 className="h-5 w-5 text-brand-orange" />}
              rows={callbackRows}
              emptyMessage="No callback responses yet."
              columns={[
                { label: "ID", className: "w-32" },
                { label: "Client", className: "w-44" },
                { label: "Contact", className: "w-48" },
                { label: "Focus", className: "min-w-[240px]" },
                { label: "Schedule", className: "w-56" },
                { label: "Status", className: "w-44" },
              ]}
              renderRow={(row) => (
                <>
                  <td className="px-5 py-5 font-mono text-xs font-bold text-brand-orange">
                    <span className="inline-flex rounded-full border border-brand-orange/15 bg-brand-orange/10 px-2.5 py-1">
                      {row.technicalConsultationId}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <p className="font-bold text-slate-950">{row.fullName}</p>
                    <p className="mt-1 text-xs text-slate-500">Callback booking</p>
                  </td>
                  <td className="px-5 py-5">
                    <a
                      href={buildTelLink(row.contactNumber)}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition-colors hover:text-brand-orange"
                    >
                      <PhoneCall className="h-4 w-4 text-slate-400" />
                      <span className="truncate">{row.contactNumber}</span>
                    </a>
                  </td>
                  <td className="px-5 py-5">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-950">{row.consultationFocusArea}</p>
                      <p className="text-xs text-slate-500">{row.consultantName}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-950">{row.preferredDate}</p>
                      <p className="text-xs text-slate-500">{row.timeSlot}</p>
                      <p className="text-xs text-slate-400">{formatSubmittedAt(row.submittedAt)}</p>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    {renderStatusSelect(row.status, async (status) => {
                      try {
                        await updateCallbackStatus(row.technicalConsultationId, status);

                        setCallbackRows((rows) =>
                          rows.map((r) =>
                            r.id === row.id
                              ? { ...r, status }
                              : r
                          )
                        );
                      } catch (error) {
                        console.error("Failed to update callback status:", error);
                      }
                    })}
                  </td>
                </>
              )}
              onRowClick={(row) => openRecord({ kind: "callback", data: row })}
              onRowKeyDown={(event, row) => handleRowKeyDown(event, { kind: "callback", data: row })}
            />
          )}
        </section>
      </div>

      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <button
            type="button"
            aria-label="Close details"
            onClick={() => setSelectedRecord(null)}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
          />

          <div className="relative flex max-h-[calc(100vh-1rem)] w-full max-w-3xl flex-col overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]">
            <div className="bg-[linear-gradient(135deg,#0f172a_0%,#111827_45%,#F97316_220%)] px-5 py-4 text-white sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Record Card</p>
                  <h3 className="mt-2 text-xl font-black tracking-tight sm:text-2xl">
                    {selectedRecord.data.fullName}
                  </h3>
                  <p className="mt-1 text-xs text-white/80 sm:text-sm">
                    {selectedRecord.kind === "quote"
                      ? selectedRecord.data.projectClassification
                      : selectedRecord.kind === "consultation"
                        ? selectedRecord.data.timeSlot
                        : selectedRecord.data.focusArea}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-[1.06fr_0.94fr]">
              <div className="grid gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <InfoTile label="Record ID" value={recordId} tone="brand" />
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Status</p>
                    <div className="mt-2">
                      {renderStatusSelect(selectedRecord.data.status, updateSelectedStatus)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <InfoTile
                    label="Email"
                    value={selectedRecord.kind === "callback" ? "Not provided" : selectedRecord.data.emailAddress}
                  />
                  <InfoTile label="Phone" value={selectedRecord.data.contactNumber} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <InfoTile label="Submitted" value={formatSubmittedAt(selectedRecord.data.submittedAt)} />
                  <InfoTile label={recordTypeLabel} value={recordTypeValue} />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                    {selectedRecord.kind === "quote"
                      ? "Project Notes"
                      : selectedRecord.kind === "consultation"
                        ? "Consultation Notes"
                        : "Callback Notes"}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                    {selectedRecord.kind === "quote"
                      ? selectedRecord.data.projectVisionScopeSpecifications || "No project notes provided."
                      : selectedRecord.kind === "consultation"
                        ? selectedRecord.data.consultationTopic || "No consultation notes provided."
                        : `${selectedRecord.data.consultationFocusArea} on ${selectedRecord.data.meetingDate} at ${selectedRecord.data.timeSlot}.`}
                  </p>
                </div>
              </div>

              <div className="grid content-start gap-3">
                <InfoTile label={recordSecondaryLabel} value={recordSecondaryValue} />

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Request Summary</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">
                    {selectedRecord.kind === "quote"
                      ? "Quote review item ready for follow-up, pricing confirmation, and scope clarification."
                      : selectedRecord.kind === "consultation"
                        ? "Consultation booking ready for scheduling confirmation and client outreach."
                        : "Callback request ready for outreach and scheduling confirmation."}
                  </p>
                </div>

                <div className="grid gap-2.5">
                  {selectedRecord.kind !== "callback" && (
                    <a
                      href={buildMailtoLink(selectedRecord.data.emailAddress)}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-brand-orange hover:text-brand-orange"
                    >
                      <Mail className="h-4 w-4" />
                      Email Client
                    </a>
                  )}
                  <a
                    href={buildTelLink(selectedRecord.data.contactNumber)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-orange px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-600"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call Client
                  </a>
                  <button
                    type="button"
                    onClick={deleteSelectedRecord}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 transition-colors hover:bg-rose-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

type RecordTableProps<T extends { id: string; status: AdminRecordStatus }> = {
  title: string;
  icon: React.ReactNode;
  rows: T[];
  emptyMessage: string;
  columns: Array<{ label: string; className: string }>;
  renderRow: (row: T) => React.ReactNode;
  onRowClick: (row: T) => void;
  onRowKeyDown: (event: React.KeyboardEvent<HTMLTableRowElement>, row: T) => void;
};

const RecordTable = <T extends { id: string; status: AdminRecordStatus }>({
  title,
  icon,
  rows,
  emptyMessage,
  columns,
  renderRow,
  onRowClick,
  onRowKeyDown,
}: RecordTableProps<T>) => {
  const count = rows.length;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h3 className="text-xl font-black tracking-tight text-slate-950">{title}</h3>
            <p className="text-sm text-slate-500">Open a detailed record view by selecting any row.</p>
          </div>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-500">
          {count} records
        </span>
      </div>

      <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed text-left text-sm">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.3em] text-slate-400">
              <tr>
                {columns.map((column) => (
                  <th key={column.label} className={`px-5 py-4 font-black ${column.className}`}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-12 text-sm text-slate-400" colSpan={columns.length}>
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => onRowClick(row)}
                    onKeyDown={(event) => onRowKeyDown(event, row)}
                    className="group cursor-pointer align-top transition-colors hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                  >
                    {renderRow(row)}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const InfoTile = ({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "brand";
}) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">{label}</p>
    <p className={`mt-2 wrap-break-word text-sm font-semibold ${tone === "brand" ? "text-brand-orange" : "text-slate-900"}`}>
      {value}
    </p>
  </div>
);