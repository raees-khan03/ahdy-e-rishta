import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full rounded-2xl border border-input bg-white px-4 py-3 font-sans text-base text-foreground shadow-xs transition-colors",
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
Textarea.displayName = "Textarea";

export { Textarea };
