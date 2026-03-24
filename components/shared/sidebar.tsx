import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-full rounded-lg border border-slate-200 bg-white p-4 md:w-64">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Navegacion
      </p>
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/board" className="text-slate-700 hover:text-slate-900">
            Mi tablero
          </Link>
        </li>
        <li>
          <Link href="/login" className="text-slate-700 hover:text-slate-900">
            Acceso
          </Link>
        </li>
      </ul>
    </aside>
  );
}
