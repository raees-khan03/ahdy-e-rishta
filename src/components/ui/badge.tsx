import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-xs font-semibold whitespace-nowrap transition-colors [&_svg]:size-3.5",
  {
    variants: {
      variant: {
        default: "border-transparent bg-maroon-800 text-cream-50",
        secondary: "border-khaki-300 bg-cream-100 text-maroon-900",
        outline: "border-maroon-800/20 bg-transparent text-maroon-800",
        peach: "border-transparent bg-peach-100 text-maroon-900",
        success: "border-green-700/20 bg-green-50 text-green-900",
        muted: "border-transparent bg-cream-200/70 text-maroon-800",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
