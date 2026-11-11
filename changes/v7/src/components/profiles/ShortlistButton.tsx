import { useState } from "react";
import { Heart } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useShortlist } from "@/hooks/useShortlist";
import { trackEvent } from "@/lib/analytics";

interface ShortlistButtonProps {
  profileId: string;
  className?: string;
  /** Larger control for the detail page. */
  size?: "sm" | "md";
  withLabel?: boolean;
}

/** Saves a profile to the visitor's shortlist (localStorage). Never navigates. */
export function ShortlistButton({
  profileId,
  className,
  size = "sm",
  withLabel = false,
}: ShortlistButtonProps) {
  const { has, toggle } = useShortlist();
  const reduce = useReducedMotion();
  const saved = has(profileId);
  // Har toggle par +1: is se dil ka chhota pop dobara chalta hai
  const [pop, setPop] = useState(0);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const next = toggle(profileId);
    setPop((value) => value + 1);
    trackEvent("shortlist_toggle", { profileId, saved: next });
    toast.success(
      next
        ? `Saved to your shortlist (${profileId}).`
        : `Removed ${profileId} from your shortlist.`,
    );
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${profileId} from shortlist` : `Save ${profileId} to shortlist`}
      title={saved ? "Remove from shortlist" : "Save to shortlist"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border transition-colors focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none",
        size === "sm" ? "size-9" : "h-11 px-4",
        saved
          ? "border-maroon-700 bg-maroon-700 text-cream-50 hover:bg-maroon-800"
          : "border-khaki-300 bg-white/90 text-maroon-800 hover:bg-cream-100",
        className,
      )}
    >
      {reduce ? (
        <Heart
          aria-hidden="true"
          className={cn("size-4", saved ? "fill-current" : undefined)}
          strokeWidth={2}
        />
      ) : (
        <motion.span
          key={pop}
          initial={pop === 0 ? false : { scale: 1 }}
          animate={pop === 0 ? undefined : { scale: [1, 1.32, 1] }}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          <Heart
            aria-hidden="true"
            className={cn("size-4", saved ? "fill-current" : undefined)}
            strokeWidth={2}
          />
        </motion.span>
      )}
      {withLabel ? (
        <span className="font-sans text-sm font-semibold">{saved ? "Saved" : "Save"}</span>
      ) : null}
    </button>
  );
}
