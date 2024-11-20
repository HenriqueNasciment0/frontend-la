import axios from "axios";
import { useRouter } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Token expired"
    ) {
      try {
        await api.post("/auth/refresh-token");
        return api.request(error.config);
      } catch (refreshError) {
        console.error("Refresh token falhou:", refreshError);

        if (typeof window !== "undefined") {
          const router = useRouter();
          router.push("/pt/admin/login");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
