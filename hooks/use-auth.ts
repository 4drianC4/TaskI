"use client";

import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userEmail = useAuthStore((state) => state.userEmail);
  const signIn = useAuthStore((state) => state.signIn);
  const signOut = useAuthStore((state) => state.signOut);

  return {
    isAuthenticated,
    userEmail,
    signIn,
    signOut,
  };
}
