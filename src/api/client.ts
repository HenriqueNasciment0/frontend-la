import axios from "axios";
import Router from "next/router";

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
        console.error("Falha ao renovar token:", refreshError);
        Router.push("/pt/admin/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
