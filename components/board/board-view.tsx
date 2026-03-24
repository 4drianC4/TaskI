"use client";

import { useBoardUsers } from "@/hooks/use-board";

export function BoardView() {
  const { users, isLoading, error } = useBoardUsers();

  if (isLoading) {
    return <p className="text-sm text-slate-500">Cargando tablero...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="mb-3 text-base font-semibold text-slate-900">Usuarios del tablero</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="rounded-md border border-slate-100 px-3 py-2 text-sm text-slate-700">
            <p className="font-medium">{user.name || "Sin nombre"}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
