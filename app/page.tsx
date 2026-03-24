import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-10">
      <section className="rounded-xl border border-slate-200 bg-white p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Monolito Fullstack
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Taski con arquitectura profesional en Next.js
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Frontend y backend conviven en un mismo repositorio con separacion por
          capas: rutas API, controladores, servicios, validaciones, componentes,
          hooks y estado global.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/board"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Ver Board
          </Link>
          <Link
            href="/register"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Registrar Usuario
          </Link>
        </div>
      </section>
    </main>
  );
}
