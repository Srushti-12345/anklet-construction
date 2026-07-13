import { CallbackRequest, ConsultationRequest, QuoteRequest } from "../types";

export type AdminRecordStatus = "NEW"
  | "CONTACTED"
  | "COMPLETED"
  | "CLOSED";

export interface AdminAccount {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface AdminSession {
  name: string;
  email: string;
  signedInAt: string;
}

export const ADMIN_ACCOUNTS_KEY = "anklet_admin_accounts";
export const ADMIN_SESSION_KEY = "anklet_admin_session";
// export const QUOTE_STORAGE_KEY = "anklet_quotes";
// export const CONSULT_STORAGE_KEY = "anklet_consults";
// export const CALLBACK_STORAGE_KEY = "anklet_callbacks";

// const DEFAULT_QUOTES: QuoteRequest[] = [
//   {
//     id: "QT-240981",
//     name: "Aarav Mehta",
//     email: "aarav.mehta@example.com",
//     phone: "+91 98765 43001",
//     projectType: "Residential Construction",
//     budget: "1 Crore - 5 Crores",
//     message: "Need a detailed BOQ and preliminary structural estimate for a premium villa.",
//     submittedAt: "2026-07-01T10:15:00.000Z",
//   },
//   {
//     id: "QT-240982",
//     name: "Nidhi Shah",
//     email: "nidhi.shah@example.com",
//     phone: "+91 98765 43002",
//     projectType: "Commercial Construction",
//     budget: "5 Crores - 25 Crores",
//     message: "Looking for a quote on a corporate office block with interior fit-out options.",
//     submittedAt: "2026-07-02T13:40:00.000Z",
//   },
//   {
//     id: "QT-240983",
//     name: "Rajiv Kulkarni",
//     email: "rajiv.k@example.com",
//     phone: "+91 98765 43003",
//     projectType: "Infrastructure Development",
//     budget: "Above 25 Crores (Corporate Scale)",
//     message: "Requesting an engineering estimate for a bridge and approach road package.",
//     submittedAt: "2026-07-03T09:05:00.000Z",
//   },
// ];

// const DEFAULT_CONSULTATIONS: ConsultationRequest[] = [
//   {
//     id: "CS-780341",
//     name: "Meera Iyer",
//     email: "meera.iyer@example.com",
//     phone: "+91 98987 65001",
//     preferredDate: "2026-07-08",
//     timeSlot: "10:00 AM - 12:00 PM",
//     message: "Need a consultation on structural planning and municipal approval workflow.",
//     submittedAt: "2026-07-01T11:20:00.000Z",
//   },
//   {
//     id: "CS-780342",
//     name: "Farhan Khan",
//     email: "farhan.khan@example.com",
//     phone: "+91 98987 65002",
//     preferredDate: "2026-07-09",
//     timeSlot: "01:00 PM - 03:00 PM",
//     message: "We need a review of a commercial renovation and site supervision scope.",
//     submittedAt: "2026-07-02T15:10:00.000Z",
//   },
//   {
//     id: "CS-780343",
//     name: "Priya Nair",
//     email: "priya.nair@example.com",
//     phone: "+91 98987 65003",
//     preferredDate: "2026-07-10",
//     timeSlot: "04:00 PM - 06:00 PM (Executive Hub)",
//     message: "Schedule a technical consultation for a project feasibility and cost review.",
//     submittedAt: "2026-07-03T08:30:00.000Z",
//   },
// ];

// const DEFAULT_CALLBACKS: CallbackRequest[] = [
//   {
//     id: "CB-510241",
//     name: "Ananya Desai",
//     phone: "+91 98811 22001",
//     focusArea: "RCC Structural Design",
//     consultantName: "Er. Ramesh Deshmukh",
//     preferredDate: "Mon, 8 Jul",
//     timeSlot: "10:30 AM",
//     submittedAt: "2026-07-01T09:15:00.000Z",
//   },
//   {
//     id: "CB-510242",
//     name: "Karan Bhatia",
//     phone: "+91 98811 22002",
//     focusArea: "BIM / 3D Walkthrough",
//     consultantName: "Ar. Sneha Pathak",
//     preferredDate: "Tue, 9 Jul",
//     timeSlot: "12:00 PM",
//     submittedAt: "2026-07-02T12:05:00.000Z",
//   },
//   {
//     id: "CB-510243",
//     name: "Mehul Joshi",
//     phone: "+91 98811 22003",
//     focusArea: "PWD & Statutory Compliance",
//     consultantName: "Er. Vivek Shrivastava",
//     preferredDate: "Wed, 10 Jul",
//     timeSlot: "3:30 PM",
//     submittedAt: "2026-07-03T16:45:00.000Z",
//   },
// ];

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const RECORD_STATUSES: AdminRecordStatus[] = ["new", "contacted", "completed", "closed"];

const normalizeStatus = (value: unknown): AdminRecordStatus =>
  typeof value === "string" && RECORD_STATUSES.includes(value as AdminRecordStatus)
    ? (value as AdminRecordStatus)
    : "new";

const readJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

// const seedIfEmpty = <T,>(key: string, seedValue: T[]) => {
//   if (typeof window === "undefined") {
//     return;
//   }

//   const current = readJson<T[]>(key, []);
//   if (current.length === 0) {
//     writeJson(key, seedValue);
//   }
// };

const normalizeRecordArray = <T extends { status?: AdminRecordStatus }>(records: T[]) =>
  records.map((record) => ({
    ...record,
    status: normalizeStatus(record.status),
  }));

const readNormalisedRecords = <T extends { status?: AdminRecordStatus }>(key: string, fallback: T[]) => {
  seedIfEmpty(key, fallback);

  const records = readJson<T[]>(key, []);
  const normalized = normalizeRecordArray(records);

  if (JSON.stringify(records) !== JSON.stringify(normalized)) {
    writeJson(key, normalized);
  }

  return normalized;
};

const updateRecord = <T extends { id: string; status?: AdminRecordStatus }>(
  key: string,
  id: string,
  updater: (record: T) => T,
) => {
  const records = readNormalisedRecords(key, [] as T[]);
  const updated = records.map((record) => (record.id === id ? updater(record) : record));
  writeJson(key, updated);
  return updated;
};

const deleteRecord = <T extends { id: string; status?: AdminRecordStatus }>(key: string, id: string) => {
  const records = readNormalisedRecords(key, [] as T[]);
  const updated = records.filter((record) => record.id !== id);
  writeJson(key, updated);
  return updated;
};

// export const seedAdminDemoData = () => {
//   seedIfEmpty(QUOTE_STORAGE_KEY, DEFAULT_QUOTES);
//   seedIfEmpty(CONSULT_STORAGE_KEY, DEFAULT_CONSULTATIONS);
//   seedIfEmpty(CALLBACK_STORAGE_KEY, DEFAULT_CALLBACKS);
// };

export const getAdminAccounts = () => readJson<AdminAccount[]>(ADMIN_ACCOUNTS_KEY, []);

export const saveAdminAccounts = (accounts: AdminAccount[]) => {
  writeJson(ADMIN_ACCOUNTS_KEY, accounts);
};

export const getAdminSession = () => readJson<AdminSession | null>(ADMIN_SESSION_KEY, null);

export const setAdminSession = (session: AdminSession) => {
  writeJson(ADMIN_SESSION_KEY, session);
};

export const clearAdminSession = () => {
  window.localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const isAdminAuthenticated = () => {
  return (
    !!localStorage.getItem("token") &&
    !!localStorage.getItem("admin")
  );
};

export const signupAdmin = ({ name, email, password }: { name: string; email: string; password: string; }) => {
  const accounts = getAdminAccounts();
  const sanitizedEmail = normalizeEmail(email);

  if (accounts.some((account) => account.email === sanitizedEmail)) {
    return { ok: false as const, message: "An admin account already exists for that email." };
  }

  const newAccount: AdminAccount = {
    name: name.trim(),
    email: sanitizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  saveAdminAccounts([newAccount, ...accounts]);
  setAdminSession({
    name: newAccount.name,
    email: newAccount.email,
    signedInAt: new Date().toISOString(),
  });

  return { ok: true as const, account: newAccount };
};

export const loginAdmin = ({ email, password }: { email: string; password: string; }) => {
  const accounts = getAdminAccounts();
  const sanitizedEmail = normalizeEmail(email);
  const account = accounts.find((entry) => entry.email === sanitizedEmail && entry.password === password);

  if (!account) {
    return { ok: false as const, message: "Invalid admin credentials." };
  }

  setAdminSession({
    name: account.name,
    email: account.email,
    signedInAt: new Date().toISOString(),

  });

  return { ok: true as const, account };
};

export const logoutAdmin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
};

// export const getQuoteRequests = () => {
//   seedIfEmpty(QUOTE_STORAGE_KEY, DEFAULT_QUOTES);
//   return readJson<QuoteRequest[]>(QUOTE_STORAGE_KEY, []);
// };

// export const getConsultationRequests = () => {
//   seedIfEmpty(CONSULT_STORAGE_KEY, DEFAULT_CONSULTATIONS);
//   return readJson<ConsultationRequest[]>(CONSULT_STORAGE_KEY, []);
// };

// export const getCallbackRequests = () => {
//   seedIfEmpty(CALLBACK_STORAGE_KEY, DEFAULT_CALLBACKS);
//   return readJson<CallbackRequest[]>(CALLBACK_STORAGE_KEY, []);
// };

// export const saveCallbackRequest = (request: CallbackRequest) => {
//   const current = getCallbackRequests();
//   writeJson(CALLBACK_STORAGE_KEY, [request, ...current]);
// };

export const updateQuoteRequestStatus = (id: string, status: AdminRecordStatus) =>
  updateRecord<QuoteRequest>(QUOTE_STORAGE_KEY, id, (record) => ({ ...record, status }));

export const updateConsultationRequestStatus = (id: string, status: AdminRecordStatus) =>
  updateRecord<ConsultationRequest>(CONSULT_STORAGE_KEY, id, (record) => ({ ...record, status }));

export const updateCallbackRequestStatus = (id: string, status: AdminRecordStatus) =>
  updateRecord<CallbackRequest>(CALLBACK_STORAGE_KEY, id, (record) => ({ ...record, status }));

export const deleteQuoteRequest = (id: string) => deleteRecord<QuoteRequest>(QUOTE_STORAGE_KEY, id);

export const deleteConsultationRequest = (id: string) =>
  deleteRecord<ConsultationRequest>(CONSULT_STORAGE_KEY, id);

export const deleteCallbackRequest = (id: string) => deleteRecord<CallbackRequest>(CALLBACK_STORAGE_KEY, id);
