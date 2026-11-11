import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";
import {
  loginSchema,
  type LoginInput,
  type LoginOutput,
} from "@/schemas/login.schema";

const inputClass =
  "w-full rounded-full border border-[#e6dcef] bg-[#f8efdc] py-3.5 pl-12 pr-12 text-[#4a0a12] placeholder:text-[#4a0a12]/40 outline-none transition focus:border-[#7d1424] focus:ring-2 focus:ring-[#7d1424]/20";

export function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput, unknown, LoginOutput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginOutput) {
    setServerError(null);
    try {
      // Endpoint apne backend ke mutabiq badal lein
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(data.message ?? "Incorrect phone number or password.");
        return;
      }

      // Token ka naam apne backend ke response ke mutabiq badal lein
      try {
        if (data.token) localStorage.setItem("ahd-e-rishta:token", data.token);
      } catch {
        // storage blocked ho to ignore
      }

      navigate("/");
    } catch {
      setServerError("Could not reach the server. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-[#eadfce] bg-white p-6 shadow-xl shadow-[#5a0f19]/5 sm:p-10">
      <h2 className="font-serif text-3xl font-bold text-[#4a0a12]">Login</h2>
      <p className="mt-1 text-[#4a0a12]/70">
        Enter your phone number and password.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-8 space-y-5"
      >
        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block font-medium text-[#4a0a12]"
          >
            Phone number
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7d1424]" />
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="0300 1234567"
              className={inputClass}
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-[#4a0a12]"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7d1424]" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              className={inputClass}
              aria-invalid={!!errors.password}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7d1424]/70 hover:text-[#7d1424]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <p
            role="alert"
            className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-gradient-to-r from-[#7d1424] to-[#5a0f19] py-3.5 font-semibold text-[#f5e6c8] shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-[#4a0a12]/80">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#7d1424] hover:underline"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
