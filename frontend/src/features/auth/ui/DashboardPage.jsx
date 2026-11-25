import { LogOut, Sparkles } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { BrandMark } from "./BrandMark.jsx";

export function DashboardPage() {
  const { user, logout, status } = useAuth();

  return (
    <main className="min-h-screen bg-canvas px-6 py-6 text-ink sm:px-10 lg:px-14">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <BrandMark />
        <button
          type="button"
          onClick={logout}
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 rounded-full border border-[#363636] bg-[#1e1e1e] px-4 py-2.5 text-sm text-[#c8c8c8] transition-colors hover:border-[#555] hover:text-ink disabled:opacity-60"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </header>
      <section className="mx-auto flex min-h-[75vh] max-w-6xl items-center">
        <div className="max-w-2xl">
          <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-[#363636] bg-[#1e1e1e] text-ink">
            <Sparkles size={22} />
          </div>
          <p className="text-sm text-muted">Your space is ready</p>
          <h1 className="mt-3 text-4xl font-normal tracking-[-0.055em] text-ink sm:text-6xl">
            Good to see you, {user?.name}.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted">
            You’re signed in to Neuron. Your AI workspace is ready for what comes next.
          </p>
          <div className="mt-9 inline-flex items-center gap-3 rounded-2xl border border-[#303030] bg-surface px-5 py-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#303030] text-sm font-medium text-ink">
              {user?.name?.slice(0, 1).toUpperCase()}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{user?.name}</span>
              <span className="mt-0.5 block text-xs text-muted">{user?.email}</span>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
