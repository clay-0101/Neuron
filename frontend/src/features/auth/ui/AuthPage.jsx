import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import { BrandMark } from "./BrandMark.jsx";

export function AuthPage() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, status, error, dismissError } = useAuth();
  const isRegister = mode === "register";
  const busy = status === "loading";

  async function handleSubmit(event) {
    event.preventDefault();
    dismissError();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (isRegister) await register(values);
    else await login({ email: values.email, password: values.password });
  }

  function changeMode(nextMode) {
    dismissError();
    setMode(nextMode);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-5 py-12 text-ink">
      <div aria-hidden="true" className="auth-atmosphere pointer-events-none absolute inset-0" />
      <div className="relative z-10 flex w-full max-w-[440px] flex-col items-center">
        <div className="mb-8">
          <BrandMark />
        </div>

        <section
          aria-labelledby="auth-title"
          className="w-full rounded-[28px] border border-[#303030] bg-surface px-6 py-8 sm:px-10 sm:py-10"
        >
          <header className="mb-7 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#898989]">
              Your AI, in one place
            </p>
            <h1 id="auth-title" className="text-[30px] font-normal tracking-[-0.045em] text-ink">
              {isRegister ? "Create your account" : "Welcome back"}
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted">
              {isRegister ? "Make room for your next big idea." : "Sign in to continue to Neuron."}
            </p>
          </header>

          <div
            role="tablist"
            aria-label="Account options"
            className="mb-7 flex rounded-full border border-[#303030] bg-[#191919] p-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isRegister}
              onClick={() => changeMode("login")}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm transition-colors ${
                !isRegister ? "bg-[#303030] text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isRegister}
              onClick={() => changeMode("register")}
              className={`flex-1 rounded-full px-4 py-2.5 text-sm transition-colors ${
                isRegister ? "bg-[#303030] text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Create account
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-2xl border border-[#633838] bg-[#2b1d1d] px-4 py-3 text-sm text-[#f0b5b5]"
            >
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {isRegister && (
              <label className="block">
                <span className="mb-2 ml-1 block text-sm text-[#d0d0d0]">Name</span>
                <span className="relative block">
                  <UserRound aria-hidden="true" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]" />
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={50}
                    placeholder="Your name"
                    className="w-full rounded-full border border-[#343434] bg-[#171717] py-3.5 pl-11 pr-5 text-sm text-ink outline-none transition-colors placeholder:text-[#777] hover:border-[#484848] focus:border-[#777] focus:ring-4 focus:ring-white/5"
                  />
                </span>
              </label>
            )}

            <label className="block">
              <span className="mb-2 ml-1 block text-sm text-[#d0d0d0]">Email</span>
              <span className="relative block">
                <Mail aria-hidden="true" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]" />
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-[#343434] bg-[#171717] py-3.5 pl-11 pr-5 text-sm text-ink outline-none transition-colors placeholder:text-[#777] hover:border-[#484848] focus:border-[#777] focus:ring-4 focus:ring-white/5"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 ml-1 block text-sm text-[#d0d0d0]">Password</span>
              <span className="relative block">
                <LockKeyhole aria-hidden="true" size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#777]" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isRegister ? "new-password" : "current-password"}
                  required
                  minLength={isRegister ? 8 : undefined}
                  placeholder={isRegister ? "At least 8 characters" : "Your password"}
                  className="w-full rounded-full border border-[#343434] bg-[#171717] py-3.5 pl-11 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-[#777] hover:border-[#484848] focus:border-[#777] focus:ring-4 focus:ring-white/5"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#858585] transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aaa]"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
              {isRegister && (
                <span className="mt-2 ml-1 block text-xs leading-5 text-muted">
                  At least 8 characters, with a letter and a number.
                </span>
              )}
            </label>

            <button
              type="submit"
              disabled={busy}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#e8e6e3] px-5 py-3.5 text-sm font-medium text-[#171717] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8e6e3] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Please wait..." : isRegister ? "Create account" : "Continue"}
              {!busy && <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5" />}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-5 text-[#777]">
            Your account is the key to your AI workspace.
          </p>
        </section>

        <p className="mt-7 text-xs text-[#737373]">A little more space to think.</p>
      </div>
    </main>
  );
}
