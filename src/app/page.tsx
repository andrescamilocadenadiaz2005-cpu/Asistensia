export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10 text-slate-900">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Listado
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Sistema de registro de asistencia
        </h1>
        <p className="mt-4 text-base text-slate-600">
          La aplicación está configurada y lista para continuar con la fase de base de datos y flujo de asistencia.
        </p>
      </div>
    </main>
  );
}
