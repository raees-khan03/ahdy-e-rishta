import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-input bg-white px-4 py-2 font-sans text-base text-foreground shadow-xs transition-colors",
        "placeholder:text-muted-foreground/70",
        "focus-visible:border-maroon-700 focus-visible:ring-2 focus-visible:ring-maroon-700/20 focus-visible:outline-none",
        "aria-invalid:border-red-600 aria-invalid:ring-2 aria-invalid:ring-red-600/15",
        "disabled:cursor-not-allowed disabled:bg-cream-100 disabled:opacity-70",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
