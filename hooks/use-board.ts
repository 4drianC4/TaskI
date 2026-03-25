"use client";

import { useEffect, useState } from "react";

import { fetchUsers } from "@/services/user-service";
import type { UserDTO } from "@/types/user";

export function useBoardUsers() {
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const data = await fetchUsers();
        if (active) {
          setUsers(data);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, []);

  return { users, isLoading, error };
}
