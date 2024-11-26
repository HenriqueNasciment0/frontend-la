import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (userData: { name: string; email: string }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
