import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// *** THIS IS THE CRITICAL CHANGE ***
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (error.response?.status === 401) {
      // The token is invalid or expired. Just remove it.
      // Do NOT reload the page here.
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }

      // We don't want SWR to retry, so we don't need to do anything else.
      // The rejection will propagate to the SWR hook.
    }
    return Promise.reject(error);
  }
);

export default api;
