import { cloneElement, isValidElement, type ReactNode, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared control styling so every input in the app looks identical. */
export const controlClass =
  "h-11 w-full min-w-0 rounded-2xl border border-input bg-white px-4 font-sans text-base text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/70 focus-visible:border-maroon-700 focus-visible:ring-2 focus-visible:ring-maroon-700/20 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-cream-100 disabled:opacity-70 aria-invalid:border-red-600 aria-invalid:ring-2 aria-invalid:ring-red-600/15";

export interface FormFieldProps {
  label: string;
  /** Id of the control. The label points at it and the error text uses `${id}-error`. */
  id?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Label, control, hint and error in one block. The control is cloned so the
 * hint and error ids reach screen readers without every caller wiring them.
 */
export function FormField({
  label,
  id,
  htmlFor,
  error,
  hint,
  required,
  optional,
  className,
  children,
}: FormFieldProps) {
  const targetId = htmlFor ?? id;
  const hintId = targetId && hint ? `${targetId}-hint` : undefined;
  const errorId = targetId && error ? `${targetId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement<Record<string, unknown>>(children)
    ? cloneElement(children, {
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })
    : children;

  return (
    <div className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <label htmlFor={targetId} className="font-sans text-sm font-medium text-maroon-900">
        {label}
        {required ? (
          <span className="ms-1 text-maroon-600" aria-hidden="true">
            *
          </span>
        ) : null}
        {optional ? (
          <span className="ms-1.5 text-xs font-normal text-muted-foreground">(optional)</span>
        ) : null}
      </label>
      {control}
      {hint && !error ? (
        <p id={hintId} className="text-xs leading-5 text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium leading-5 text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface NativeSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Either pass options here or give the select its own <option> children. */
  options?: { label: string; value: string }[];
  placeholder?: string;
}

/** Native select: quickest and most reliable control on mobile. */
export function NativeSelect({
  options,
  placeholder,
  className,
  children,
  ...props
}: NativeSelectProps) {
  return (
    <div className="relative">
      <select className={cn(controlClass, "appearance-none pe-10", className)} {...props}>
        {children
          ? children
          : [
              placeholder ? (
                <option key="__placeholder" value="">
                  {placeholder}
                </option>
              ) : null,
              ...(options ?? []).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )),
            ]}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-maroon-800/60"
      />
    </div>
  );
}
