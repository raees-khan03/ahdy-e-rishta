import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, controlClass } from "@/components/forms/FormField";
import { useAuth } from "@/context/AuthProvider";
import { ApiError } from "@/api/http";
import { cn } from "@/lib/utils";
import { loginSchema, type LoginInput, type LoginOutput } from "@/schemas/login.schema";

interface LocationState {
  from?: { pathname: string; search?: string };
}

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput, unknown, LoginOutput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { phone: "", password: "" },
  });

  const onSubmit = async (values: LoginOutput) => {
    setServerError(null);
    try {
      await login(values.phone, values.password);
      const state = location.state as LocationState | null;
      const target = state?.from ? `${state.from.pathname}${state.from.search ?? ""}` : "/account";
      navigate(target, { replace: true });
    } catch (error) {
      setServerError(
        error instanceof ApiError ? error.message : "Could not sign you in. Please try again.",
      );
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-white p-6 shadow-xl shadow-maroon-900/5 sm:p-10">
      <h2 className="font-heading text-2xl font-semibold text-maroon-900 sm:text-3xl">
        Sign In to Your Account
      </h2>
      <p className="mt-1 font-sans text-sm leading-6 text-muted-foreground">
        Use the phone number and password the office gave you.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-6">
        <FormField id="login-phone" label="Phone number" error={errors.phone?.message} required>
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 start-0 grid w-14 place-items-center rounded-s-2xl border-e border-input bg-cream-100 font-sans text-sm font-semibold text-maroon-900"
            >
              +92
            </span>
            <Input
              id="login-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="300 1234567"
              className={cn(controlClass, "ps-16")}
              aria-invalid={errors.phone ? true : undefined}
              {...register("phone")}
            />
            <Phone
              aria-hidden="true"
              className="pointer-events-none absolute end-4 top-1/2 size-4 -translate-y-1/2 text-maroon-800/50"
            />
          </div>
        </FormField>

        <FormField id="login-password" label="Password" error={errors.password?.message} required>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
              className={cn(controlClass, "ps-11 pe-12")}
              aria-invalid={errors.password ? true : undefined}
              {...register("password")}
            />
            <Lock
              aria-hidden="true"
              className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-maroon-800/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-maroon-800/70 transition-colors hover:bg-cream-100 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:outline-none"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </FormField>

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="font-sans text-sm font-semibold text-maroon-700 underline-offset-4 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {serverError ? (
          <p
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800"
          >
            {serverError}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Signing in
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>

      <p className="mt-8 text-center font-sans text-sm text-maroon-900/80">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-maroon-700 underline-offset-4 hover:underline"
        >
          Create your profile
        </Link>
      </p>
      <p className="mt-5 rounded-2xl bg-cream-100 px-4 py-3 text-center font-sans text-xs leading-5 text-muted-foreground">
        Accounts are created by the office after your registration interview. There is no public
        sign up.
      </p>
    </div>
  );
}
