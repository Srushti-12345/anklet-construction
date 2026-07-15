import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization =
      `Bearer ${accessToken}`;
  }

  return config;
});

const refreshToken = () => {
  return api.post("/auth/refresh", {}, {
    withCredentials: true
  });
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (originalRequest.url?.includes("/auth/refresh")) {
      console.log("calling refresh token");
      return Promise.reject(error);
    }
    const status = error.response?.status;

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenResponse = await api.post(
          "/auth/refresh",
          {}, {
          withCredentials: true
        }
        );

        console.log("refresh token response", refreshTokenResponse);

        localStorage.setItem(
          "accessToken",
          refreshTokenResponse.data.accessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${refreshTokenResponse.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("admin");

        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }
  }
);

export default api;