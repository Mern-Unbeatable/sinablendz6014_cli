import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { login } from "@/lib/store";
import { motion } from "framer-motion";
import penthouse from "@/assets/penthouse.jpg"; // Using existing preset

const inputClass =
  "block w-full rounded-xl border-0 py-3.5 pl-11 text-ink shadow-sm ring-1 ring-inset ring-border bg-sand/30 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-copper focus:bg-white sm:text-sm sm:leading-6 transition-all";

export function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState("admin@aurorasuites.com.au");
  const [password, setPassword] = useState("aurora2024");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = login(email, password);
    if (result.ok) {
      setTimeout(() => {
        onSuccess();
      }, 500); // Small delay for UX feel
    } else {
      setTimeout(() => {
        setError(result.error);
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Column - Image */}
      <div className="relative hidden lg:block lg:w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={penthouse}
          alt="Aurora Suites Luxury Property"
        />
        <div className="absolute inset-0 bg-ink/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-transparent" />

        <div className="absolute bottom-16 left-16 right-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Listings &amp; Inquiries, Managed.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Review homeowner and guest inquiries, manage property listings, and keep your
              portfolio organised from one place.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-10">
            <Logo className="h-12 w-auto" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-ink">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Secure portal for Aurora Suites listings and inquiries
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-ink mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold leading-6 text-ink mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-ink transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-border bg-sand/30 checked:border-copper checked:bg-copper transition-all"
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <span className="font-medium text-ink/80 group-hover:text-ink transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm font-semibold text-copper hover:text-copper/80">
                Forgot password?
              </a>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-red-50 p-4 border border-red-100"
              >
                <div className="flex">
                  <div className="shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-xl bg-ink px-3 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-ink/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 h-full w-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                  Authenticating...
                </span>
              ) : (
                "Sign in to workspace"
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-border">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-ink transition-colors"
            >
              <ArrowLeft size={16} /> Back to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
