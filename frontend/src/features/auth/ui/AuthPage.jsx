import { BrandMark } from "./BrandMark.jsx";
import { AuthForm } from "./AuthForm.jsx";
import { ShowcasePanel } from "./ShowcasePanel.jsx";

export function AuthPage() {
  return (
    <main className="auth-layout min-h-screen lg:grid lg:grid-cols-2">
      <section className="auth-form-side grid min-h-screen grid-rows-[auto_1fr_auto] px-6 py-7 sm:px-10 lg:px-14">
        <div className="w-fit">
          <BrandMark />
        </div>

        <div className="flex items-center justify-center py-10">
          <AuthForm />
        </div>

        <p className="text-xs text-[#777]">A little more space to think.</p>
      </section>

      <ShowcasePanel />
    </main>
  );
}
