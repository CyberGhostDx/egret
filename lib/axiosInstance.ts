import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrf_token");
  if (csrfToken && config.method !== "get") {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});

export default axiosInstance;
