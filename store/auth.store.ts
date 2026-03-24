"use client";

import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  userEmail: string | null;
  signIn: (email: string) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userEmail: null,
  signIn: (email) => {
    document.cookie = "taski_session=1; path=/; max-age=86400; samesite=lax";
    set({ isAuthenticated: true, userEmail: email });
  },
  signOut: () => {
    document.cookie = "taski_session=; path=/; max-age=0; samesite=lax";
    set({ isAuthenticated: false, userEmail: null });
  },
}));
