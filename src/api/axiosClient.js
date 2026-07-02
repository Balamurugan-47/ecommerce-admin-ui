import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the auth token to every request automatically,
// so individual *Api.js files no longer need getAuthHeaders().
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Central place to react to auth failures across the whole app.
// Uncomment/extend if you want auto-logout on 401, etc.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   localStorage.removeItem("token");
    //   window.location.href = "/login";
    // }
    return Promise.reject(error);
  }
);

export default api;