import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api", // ✅ IMPORTANT FIX
  withCredentials: true,
});

// ✅ attach Clerk token to every request (FIXED)
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // ✅ Correct way (works in production)
      const token = await window.Clerk?.session?.getToken();

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