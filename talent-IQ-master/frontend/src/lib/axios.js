import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ✅ attach Clerk token to every request
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await window.Clerk?.session?.getToken?.();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error attaching token:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;