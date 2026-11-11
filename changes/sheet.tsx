import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "top" | "bottom" | "start" | "end";
    title: string;
  }
>(({ className, children, side = "end", title, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 animate-fade-in bg-maroon-950/55 backdrop-blur-[2px]" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex animate-slide-up flex-col gap-4 bg-cream-50 shadow-xl shadow-maroon-950/25",
        side === "end" && "inset-y-0 end-0 h-full w-[88%] max-w-sm border-s border-border",
        side === "start" && "inset-y-0 start-0 h-full w-[88%] max-w-sm border-e border-border",
        side === "top" && "inset-x-0 top-0 max-h-[85dvh] rounded-b-3xl border-b border-border",
        side === "bottom" &&
          "inset-x-0 bottom-0 max-h-[92dvh] rounded-t-3xl border-t border-border",
        className,
      )}
      {...props}
    >
      <SheetPrimitive.Title className="sr-only">{title}</SheetPrimitive.Title>
      <SheetPrimitive.Description className="sr-only">Panel content</SheetPrimitive.Description>
      {children}
      <SheetPrimitive.Close
        aria-label="Close panel"
        className="absolute end-2 top-2 grid size-10 place-items-center rounded-full text-maroon-800 transition-colors hover:bg-maroon-100 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:outline-none"
      >
        <X className="size-5" />
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetClose, SheetContent };
