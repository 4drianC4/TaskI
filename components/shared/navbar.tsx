"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { isAuthenticated, userEmail, signOut } = useAuth();

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Taski
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/board" className="text-sm font-medium text-slate-700">
            Tableros
          </Link>
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-700">
                Login
              </Link>
              <Link href="/register" className="text-sm font-medium text-slate-700">
                Registro
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-slate-600">{userEmail}</span>
              <Button onClick={signOut}>Salir</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
