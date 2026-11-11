import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<React.ComponentProps<"input">, "type"> {
  label?: React.ReactNode;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;
    return (
      <div className={cn("flex items-start gap-3", className)}>
        <span className="relative mt-0.5 grid size-5 shrink-0 place-items-center">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            className="peer size-5 cursor-pointer appearance-none rounded-md border border-khaki-400 bg-white transition-colors checked:border-maroon-800 checked:bg-maroon-800 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none aria-invalid:border-red-600"
            aria-describedby={description ? `${inputId}-description` : undefined}
            {...props}
          />
          <Check
            aria-hidden="true"
            className="pointer-events-none absolute size-3.5 text-cream-50 opacity-0 peer-checked:opacity-100"
            strokeWidth={3}
          />
        </span>
        {label ? (
          <label htmlFor={inputId} className="font-sans text-sm leading-6 text-maroon-900">
            {label}
            {description ? (
              <span
                id={`${inputId}-description`}
                className="block text-xs leading-5 text-muted-foreground"
              >
                {description}
              </span>
            ) : null}
          </label>
        ) : null}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
