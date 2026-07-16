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
  fullName: string;
  email: string;
  signedInAt: string;
}

export const ADMIN_ACCOUNTS_KEY = "accessToken";
export const ADMIN_SESSION_KEY = "admin";;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const RECORD_STATUSES: AdminRecordStatus[] = ["NEW", "CONTACTED", "COMPLETED", "CLOSED"];

const normalizeStatus = (value: unknown): AdminRecordStatus =>
  typeof value === "string" && RECORD_STATUSES.includes(value as AdminRecordStatus)
    ? (value as AdminRecordStatus)
    : "NEW";

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
    fullName: account.fullName,
    email: account.email,
    signedInAt: new Date().toISOString(),

  });

  return { ok: true as const, account };
};

export const logoutAdmin = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("admin");
};