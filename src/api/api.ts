import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// ── Request interceptor: attach access token ──────────────────────────
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization =
      `Bearer ${accessToken}`;
  }

  return config;
});

// ── Refresh queue (singleton promise prevents concurrent refresh calls) ──
let refreshPromise: Promise<string> | null = null;

/**
 * Call POST /auth/refresh and persist the new access token.
 * If a refresh is already in-flight, returns the same promise so
 * multiple 401s don't trigger multiple refresh requests.
 */
export const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = api
    .post("/auth/refresh", {}, { withCredentials: true })
    .then((res) => {
      const token: string = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      return token;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

// ── Response interceptor: auto-retry once after a successful refresh ──
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Never attempt to refresh a refresh request itself (avoids loops)
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        // Don't hard-redirect here — let the AuthContext handle it
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;