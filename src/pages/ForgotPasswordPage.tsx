import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, controlClass } from "@/components/forms/FormField";
import { useSeo } from "@/hooks/useSeo";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { requestPasswordReset, resetPassword, verifyOtp } from "@/api/auth.api";
import { ApiError } from "@/api/http";
import {
  forgotPhoneSchema,
  newPasswordSchema,
  otpSchema,
  type NewPasswordValues,
} from "@/schemas/login.schema";
import { cn } from "@/lib/utils";

type Step = "phone" | "otp" | "password" | "done";

const steps: { id: Step; label: string }[] = [
  { id: "phone", label: "Phone" },
  { id: "otp", label: "Code" },
  { id: "password", label: "New password" },
];

export default function ForgotPasswordPage() {
  const { block } = useSiteSettings();
  const intro = block("page.forgot");
  const navigate = useNavigate();

  useSeo({
    title: "Reset your password",
    description:
      "Reset the password for your Ahd-e-Rishta account using your registered phone number.",
    path: "/forgot-password",
    noIndex: true,
  });

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const phoneForm = useForm<{ phone: string }>({
    resolver: zodResolver(forgotPhoneSchema),
    mode: "onTouched",
    defaultValues: { phone: "" },
  });

  const otpForm = useForm<{ code: string }>({
    resolver: zodResolver(otpSchema),
    mode: "onTouched",
    defaultValues: { code: "" },
  });

  const passwordForm = useForm<NewPasswordValues>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onTouched",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const stepIndex = steps.findIndex((item) => item.id === step);

  const sendCode = phoneForm.handleSubmit(async (values) => {
    setError(null);
    setBusy(true);
    try {
      await requestPasswordReset(values.phone);
      setPhone(values.phone);
      setStep("otp");
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not send the code.");
    } finally {
      setBusy(false);
    }
  });

  const checkCode = otpForm.handleSubmit(async (values) => {
    setError(null);
    setBusy(true);
    try {
      await verifyOtp(phone, values.code);
      setCode(values.code);
      setStep("password");
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not check the code.");
    } finally {
      setBusy(false);
    }
  });

  const savePassword = passwordForm.handleSubmit(async (values) => {
    setError(null);
    setBusy(true);
    try {
      await resetPassword(phone, code, values.password);
      setStep("done");
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not change the password.");
    } finally {
      setBusy(false);
    }
  });

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 lg:py-20">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-maroon-600">
        {intro?.eyebrow ?? "Password help"}
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-maroon-700 sm:text-4xl">
        {intro?.title ?? "Reset your password"}
      </h1>
      <p className="mt-2 font-sans text-[15px] leading-7 text-muted-foreground">
        {intro?.subtitle ?? ""}
      </p>

      <div className="mt-8 rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 sm:p-8">
        {step !== "done" ? (
          <ol className="mb-6 flex items-center gap-2" aria-label="Reset steps">
            {steps.map((item, index) => (
              <li key={item.id} className="flex flex-1 items-center gap-2">
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full font-sans text-xs font-bold",
                    index <= stepIndex
                      ? "bg-maroon-800 text-cream-50"
                      : "bg-cream-100 text-maroon-800/60",
                  )}
                  aria-current={index === stepIndex ? "step" : undefined}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "font-sans text-xs font-semibold",
                    index <= stepIndex ? "text-maroon-900" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
                {index < steps.length - 1 ? (
                  <span aria-hidden="true" className="h-px flex-1 bg-border" />
                ) : null}
              </li>
            ))}
          </ol>
        ) : null}

        {error ? (
          <p
            role="alert"
            className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-800"
          >
            {error}
          </p>
        ) : null}

        {step === "phone" ? (
          <form onSubmit={sendCode} noValidate className="space-y-5">
            <FormField
              id="reset-phone"
              label="Registered phone number"
              error={phoneForm.formState.errors.phone?.message}
              hint="Use the number the office has on your file."
              required
            >
              <Input
                id="reset-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="0300 1234567"
                className={controlClass}
                {...phoneForm.register("phone")}
              />
            </FormField>
            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              Send code
            </Button>
          </form>
        ) : null}

        {step === "otp" ? (
          <form onSubmit={checkCode} noValidate className="space-y-5">
            <FormField
              id="reset-otp"
              label="Six digit code"
              error={otpForm.formState.errors.code?.message}
              hint="For this preview the code is 123456. The real office will send it by SMS."
              required
            >
              <Input
                id="reset-otp"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                className={controlClass}
                {...otpForm.register("code")}
              />
            </FormField>
            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              Verify code
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={() => setStep("phone")}
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Use a different number
            </Button>
          </form>
        ) : null}

        {step === "password" ? (
          <form onSubmit={savePassword} noValidate className="space-y-5">
            <FormField
              id="reset-password"
              label="New password"
              error={passwordForm.formState.errors.password?.message}
              hint="At least 8 characters."
              required
            >
              <Input
                id="reset-password"
                type="password"
                autoComplete="new-password"
                className={controlClass}
                {...passwordForm.register("password")}
              />
            </FormField>
            <FormField
              id="reset-confirm"
              label="Repeat password"
              error={passwordForm.formState.errors.confirmPassword?.message}
              required
            >
              <Input
                id="reset-confirm"
                type="password"
                autoComplete="new-password"
                className={controlClass}
                {...passwordForm.register("confirmPassword")}
              />
            </FormField>
            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              Save new password
            </Button>
          </form>
        ) : null}

        {step === "done" ? (
          <div className="text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-green-50 text-green-800">
              <CheckCircle2 className="size-7" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-heading text-2xl font-semibold text-maroon-900">
              Password changed
            </h2>
            <p className="mt-2 font-sans text-sm leading-6 text-muted-foreground">
              You can sign in now with the new password. If this was not you, call the office
              straight away.
            </p>
            <Button className="mt-6 w-full" size="lg" onClick={() => navigate("/login")}>
              Go to login
            </Button>
          </div>
        ) : null}

        {step !== "done" ? (
          <p className="mt-5 text-center font-sans text-sm text-maroon-900/80">
            Remembered it?{" "}
            <Link
              to="/login"
              className="font-semibold text-maroon-700 underline-offset-4 hover:underline"
            >
              Back to login
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
