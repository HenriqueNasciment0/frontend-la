import api from "../client";

export const Login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const Logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const GetCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
