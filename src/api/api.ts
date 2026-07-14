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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshTokenResponse = await api.post(
        "/auth/refresh",
        {},{
          withCredentials: true
        }
      );

      localStorage.setItem(
        "accessToken", 
        refreshTokenResponse.data.accessToken
      );

      originalRequest.headers.Authorization = 
      `Bearer ${refreshTokenResponse.data.accessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;