import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-200 outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-maroon-800 text-cream-50 shadow-sm shadow-maroon-900/15 hover:bg-maroon-900",
        secondary: "bg-cream-100 text-maroon-900 border border-khaki-300/70 hover:bg-cream-200",
        outline:
          "border border-maroon-800/25 bg-transparent text-maroon-800 hover:bg-maroon-50 hover:border-maroon-800/40",
        ghost: "text-maroon-800 hover:bg-maroon-50",
        link: "text-maroon-800 underline-offset-4 hover:underline rounded-md",
        peach: "bg-peach-400 text-maroon-950 shadow-sm shadow-maroon-900/10 hover:bg-peach-300",
        whatsapp: "bg-green-800 text-white shadow-sm shadow-green-900/20 hover:bg-green-900",
        destructive: "bg-red-700 text-white hover:bg-red-800",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        default: "h-11 px-5",
        lg: "h-12 px-7 text-base",
        xl: "h-14 px-8 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
