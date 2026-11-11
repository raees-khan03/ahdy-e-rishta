import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  title: string;
  className?: string;
  /** Path to share; defaults to the current URL. */
  path?: string;
}

export function ShareButton({ title, className, path }: ShareButtonProps) {
  const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const url = path ? `${window.location.origin}${path}` : window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied. Share it with your family.");
    } catch {
      toast.info("Press and hold the address bar to copy this link.");
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Share ${title}`}
      title="Share"
      className={cn(
        "grid size-9 place-items-center rounded-full border border-khaki-300 bg-white/90 text-maroon-800 transition-colors hover:bg-cream-100 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      <Share2 aria-hidden="true" className="size-4" />
    </button>
  );
}
