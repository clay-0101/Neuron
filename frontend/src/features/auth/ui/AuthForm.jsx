import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  LoaderCircle,
  Mail,
  UserRound,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";

function FloatingField({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  icon: Icon,
  minLength,
  maxLength,
  required = true,
  trailing,
}) {
  const [hasValue, setHasValue] = useState(false);

  return (
    <label htmlFor={id} className="block">
      <span className="relative block">
        <Icon
          aria-hidden="true"
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#858585]"
        />
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
          placeholder=" "
          data-filled={hasValue}
          onChange={(event) => setHasValue(event.currentTarget.value.length > 0)}
          className="auth-floating-input h-12 w-full rounded-xl border border-[#353535] bg-[#171717] pl-11 pr-12 text-sm text-ink outline-none transition-[border-color,box-shadow] placeholder:text-transparent hover:border-[#505050] focus:border-[#a5a5a5] focus:ring-4 focus:ring-white/[0.06]"
        />
        <span className="auth-floating-label pointer-events-none absolute left-11 origin-left text-sm text-[#888]">
          {label}
        </span>
        {trailing}
      </span>
    </label>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]">
      <path fill="#4285F4" d="M21.6 12.23c0-.72-.06-1.42-.18-2.1H12v3.98h5.38a4.6 4.6 0 0 1-2 3.02v2.52h3.24c1.9-1.75 2.98-4.33 2.98-7.42Z" />
      <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.52c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H3.08v2.6A10 10 0 0 0 12 22Z" />
      <path fill="#FBBC05" d="M6.42 13.89a6.02 6.02 0 0 1 0-3.78v-2.6H3.08a10 10 0 0 0 0 8.98l3.34-2.6Z" />
      <path fill="#EA4335" d="M12 5.99c1.47 0 2.8.5 3.83 1.5l2.88-2.88C16.95 2.98 14.7 2 12 2a10 10 0 0 0-8.92 5.51l3.34 2.6C7.2 7.75 9.4 5.99 12 5.99Z" />
    </svg>
  );
}

export function AuthForm() {
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
    <div className="w-full max-w-[440px]">
      <header className="mb-8">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[#929292]">
          Your AI, in one place
        </p>
        <h1 className="text-[30px] font-medium tracking-[-0.045em] text-ink">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          {isRegister ? "Make room for your next big idea." : "Sign in to continue to Neuron."}
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Account options"
        className="relative mb-7 flex rounded-full border border-[#303030] bg-[#191919] p-1"
      >
        <motion.span
          aria-hidden="true"
          layoutId="auth-mode-indicator"
          layout
          className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-[#303030] ${
            isRegister ? "left-1/2" : "left-1"
          }`}
          transition={{ type: "spring", stiffness: 430, damping: 34 }}
        />
        <button
          type="button"
          role="tab"
          aria-selected={!isRegister}
          onClick={() => changeMode("login")}
          className={`relative z-10 flex-1 rounded-full px-4 py-2.5 text-sm transition-colors ${
            !isRegister ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={isRegister}
          onClick={() => changeMode("register")}
          className={`relative z-10 flex-1 rounded-full px-4 py-2.5 text-sm transition-colors ${
            isRegister ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          Sign up
        </button>
      </div>

      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            key="auth-error"
            role="alert"
            initial={{ height: 0, opacity: 0, y: -4 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -4 }}
            className="mb-5 overflow-hidden"
          >
            <p className="rounded-xl border border-[#633838] bg-[#2b1d1d] px-4 py-3 text-sm text-[#f0b5b5]">
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.form
          key={mode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          {isRegister && (
            <FloatingField
              id="auth-name"
              name="name"
              label="Name"
              autoComplete="name"
              icon={UserRound}
              minLength={2}
              maxLength={50}
            />
          )}

          <FloatingField
            id="auth-email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            icon={Mail}
          />

          <FloatingField
            id="auth-password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete={isRegister ? "new-password" : "current-password"}
            icon={LockKeyhole}
            minLength={isRegister ? 8 : undefined}
            trailing={
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#858585] transition-colors hover:text-ink focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aaa]"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            }
          />

          {isRegister && (
            <p className="pl-1 text-xs leading-5 text-muted">
              At least 8 characters, with a letter and a number.
            </p>
          )}

          <motion.button
            type="submit"
            disabled={busy}
            whileHover={busy ? undefined : { y: -1 }}
            whileTap={busy ? undefined : { scale: 0.99 }}
            className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#f0eeeb] to-[#d8d6d3] px-5 text-sm font-medium text-[#171717] shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-[filter,box-shadow] hover:brightness-105 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8e6e3] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <>
                <LoaderCircle aria-hidden="true" size={17} className="animate-spin" />
                Please wait...
              </>
            ) : (
              <>
                {isRegister ? "Create account" : "Continue"}
                <ArrowRight
                  aria-hidden="true"
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </>
            )}
          </motion.button>
        </motion.form>
      </AnimatePresence>

      <div className="my-5 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-[#303030]" />
        <span className="text-xs text-[#777]">or</span>
        <span className="h-px flex-1 bg-[#303030]" />
      </div>

      <button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#353535] bg-[#171717] text-sm font-medium text-[#dedede] transition-colors hover:border-[#555] hover:bg-[#1c1c1c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#aaa]"
      >
        <GoogleMark />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-xs leading-5 text-[#777]">
        Your account is the key to your AI workspace.
      </p>
    </div>
  );
}
