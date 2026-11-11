import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import roseBanner from "@/assets/rose-banner.svg";
import { ComboboxField } from "@/components/forms/ComboboxField";
import { FormField, NativeSelect, controlClass } from "@/components/forms/FormField";
import { RegisterSuccess } from "@/components/forms/RegisterSuccess";
import { registerSteps } from "@/components/forms/registerSteps";
import {
  buildRegistrationMessage,
  saveRegistrationLocally,
} from "@/components/forms/registerMessage";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import {
  registerSchema,
  type RegisterInput,
  type RegisterOutput,
} from "@/schemas/register.schema";

const slide: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -24 }),
};

interface SubmittedRegistration {
  name: string;
  city: string;
  whatsappUrl: string;
}

// Har field shuru mein "" rakhein, taake "required" errors sahi dikhein
const emptyValues = {
  ...Object.fromEntries(
    registerSteps.flatMap((step) => step.fields.map((field) => [field.name, ""])),
  ),
  declaration: false,
} as unknown as RegisterInput;

export function RegisterForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitted, setSubmitted] = useState<SubmittedRegistration | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<RegisterInput, unknown, RegisterOutput>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: emptyValues,
  });

  const totalSteps = registerSteps.length;
  const step = registerSteps[stepIndex];
  const isLast = stepIndex === totalSteps - 1;
  const declared = watch("declaration");
  const percent = Math.round(((stepIndex + 1) / totalSteps) * 100);

  useEffect(() => {
    if (hasNavigated.current) headingRef.current?.focus();
  }, [stepIndex]);

  // After submit, the success screen replaces the form. Scroll up so it is visible.
  useEffect(() => {
    if (submitted) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  const goToStep = (index: number, dir: 1 | -1) => {
    hasNavigated.current = true;
    setDirection(dir);
    setStepIndex(index);
  };

  const handleNext = async () => {
    const names = step.fields.map((field) => field.name);
    const isValid = await trigger(names, { shouldFocus: true });
    if (isValid) goToStep(stepIndex + 1, 1);
  };

  const onSubmit = (values: RegisterOutput) => {
    console.log("Registration form submitted:", values);
    saveRegistrationLocally(values);

    const whatsappUrl = buildWhatsAppUrl(buildRegistrationMessage(values));
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted({ name: values.fullName, city: values.city, whatsappUrl });
  };

  // If something on an earlier step is invalid, jump back to the first such step
  const onInvalid = (formErrors: FieldErrors<RegisterInput>) => {
    const index = registerSteps.findIndex((s) => s.fields.some((field) => formErrors[field.name]));
    if (index !== -1) goToStep(index, -1);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isLast) {
      // Pressing Enter on an earlier step moves forward instead of submitting
      event.preventDefault();
      void handleNext();
      return;
    }
    void handleSubmit(onSubmit, onInvalid)(event);
  };

  if (submitted) {
    return (
      <RegisterSuccess
        name={submitted.name}
        city={submitted.city}
        whatsappUrl={submitted.whatsappUrl}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-border bg-white p-5 shadow-xl shadow-maroon-900/10 sm:p-8">
      <div
        className="rounded-xl border border-peach-400/60 bg-cream-50 bg-cover bg-right bg-no-repeat px-4 py-3 pr-24 text-sm text-maroon-800 sm:pr-40"
        style={{ backgroundImage: `url(${roseBanner})` }}
      >
        <strong className="font-semibold">Note:</strong> Please fill each section carefully. When
        you submit, your details open in WhatsApp for our team.
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Step {stepIndex + 1} of {totalSteps}
          </span>
          <span>{percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Registration progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-100"
        >
          <motion.div
            initial={false}
            animate={{ scaleX: percent / 100 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="h-full origin-left rounded-full bg-linear-to-r from-peach-400 to-maroon-600"
          />
        </div>
      </div>

      <form noValidate onSubmit={handleFormSubmit} className="mt-6">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-heading text-xl font-semibold text-maroon-800 outline-none"
        >
          {step.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>

        {/* No overflow-hidden on this wrapper, otherwise the dropdown lists get cut off */}
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={step.id}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2"
          >
            {step.fields.map((field) => {
              const id = `field-${field.name}`;
              const error = errors[field.name]?.message;
              const aria = {
                "aria-invalid": error ? true : undefined,
                "aria-describedby": error ? `${id}-error` : undefined,
              } as const;

              return (
                <FormField
                  key={field.name}
                  id={id}
                  label={field.label}
                  error={error}
                  className={field.fullWidth ? "sm:col-span-2" : undefined}
                >
                  {field.kind === "text" && (
                    <Input
                      id={id}
                      type={field.inputType ?? "text"}
                      inputMode={field.inputMode}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      className={controlClass}
                      {...aria}
                      {...register(field.name)}
                    />
                  )}

                  {field.kind === "select" && (
                    <NativeSelect id={id} {...aria} {...register(field.name)}>
                      <option value="">Select...</option>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </NativeSelect>
                  )}

                  {field.kind === "combobox" && (
                    <Controller
                      name={field.name}
                      control={control}
                      render={({ field: controller }) => (
                        <ComboboxField
                          id={id}
                          value={String(controller.value ?? "")}
                          onChange={controller.onChange}
                          onBlur={controller.onBlur}
                          options={field.options}
                          allowCustom={field.allowCustom}
                          invalid={Boolean(error)}
                          describedBy={error ? `${id}-error` : undefined}
                        />
                      )}
                    />
                  )}

                  {field.kind === "textarea" && (
                    <textarea
                      id={id}
                      rows={4}
                      placeholder={field.placeholder}
                      className={cn(controlClass, "h-auto min-h-28 rounded-2xl py-3")}
                      {...aria}
                      {...register(field.name)}
                    />
                  )}
                </FormField>
              );
            })}

            {isLast && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="field-declaration"
                  className={cn(
                    "flex cursor-pointer gap-3 rounded-xl border bg-cream-50 p-4",
                    errors.declaration ? "border-destructive" : "border-border",
                  )}
                >
                  <input
                    id="field-declaration"
                    type="checkbox"
                    className="mt-1 size-4 shrink-0 accent-maroon-700"
                    aria-invalid={errors.declaration ? true : undefined}
                    {...register("declaration")}
                  />
                  <span className="space-y-2 text-sm text-maroon-900">
                    <span className="block">
                      I declare that the information provided above is true and accurate to the best
                      of my knowledge.
                    </span>
                    <span lang="ur" dir="rtl" className="block text-muted-foreground">
                      میں اقرار کرتا/کرتی ہوں کہ اوپر دی گئی معلومات میرے علم کے مطابق درست اور سچی ہیں۔
                    </span>
                  </span>
                </label>
                {errors.declaration?.message && (
                  <p role="alert" className="mt-1.5 px-1 text-xs font-medium text-destructive">
                    {errors.declaration.message}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full px-5"
            onClick={() => goToStep(stepIndex - 1, -1)}
            disabled={stepIndex === 0}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>

          {/* Different keys so React never reuses one DOM button for both types */}
          {isLast ? (
            <Button
              key="submit"
              type="submit"
              className="h-11 rounded-full bg-green-800 px-6 text-white hover:bg-green-900"
              disabled={!declared}
            >
              Submit &amp; WhatsApp
              <WhatsAppIcon className="size-4" />
            </Button>
          ) : (
            <Button
              key="continue"
              type="button"
              className="h-11 rounded-full px-6"
              onClick={() => void handleNext()}
            >
              Continue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}