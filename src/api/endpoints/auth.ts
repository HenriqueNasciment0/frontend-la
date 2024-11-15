import apiClient from "../client";

export const login = async (email: string, password: string) => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/auth/logout");
  return response.data;
};
