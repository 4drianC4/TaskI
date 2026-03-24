import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Crear cuenta</h1>
      <RegisterForm />
    </main>
  );
}
