import axios from "axios";

const ACCESS_TOKEN_KEY = "issuehub_access_token";
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000/api" : "https://issuehub-euyj.onrender.com/api");

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest?._retry || originalRequest?.url?.includes("/auth/")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await api.post("/auth/refresh");
      localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem("issuehub_user");
      return Promise.reject(refreshError);
    }
  }
);

export { ACCESS_TOKEN_KEY, API_BASE_URL };
export default api;
