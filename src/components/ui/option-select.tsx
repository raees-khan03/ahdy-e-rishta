import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SimpleOption {
  label: string;
  value: string;
}

export interface OptionSelectProps extends Omit<React.ComponentProps<"select">, "children"> {
  options: SimpleOption[];
  placeholder?: string;
}

/**
 * Styled native <select>. Native keeps mobile UX and keyboard behaviour flawless
 * while still matching the design system.
 */
const OptionSelect = React.forwardRef<HTMLSelectElement, OptionSelectProps>(
  ({ className, options, placeholder, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "h-11 w-full appearance-none rounded-2xl border border-input bg-white ps-4 pe-10 font-sans text-base text-foreground shadow-xs transition-colors",
          "focus-visible:border-maroon-700 focus-visible:ring-2 focus-visible:ring-maroon-700/20 focus-visible:outline-none",
          "aria-invalid:border-red-600 aria-invalid:ring-2 aria-invalid:ring-red-600/15",
          "disabled:cursor-not-allowed disabled:opacity-70",
          className,
        )}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute end-3.5 top-1/2 size-4 -translate-y-1/2 text-maroon-800/60"
      />
    </div>
  ),
);
OptionSelect.displayName = "OptionSelect";

export { OptionSelect };
