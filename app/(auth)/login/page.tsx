import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Iniciar sesion</h1>
      <LoginForm />
    </main>
  );
}
