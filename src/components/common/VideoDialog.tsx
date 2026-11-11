import { Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/schemas/content.schema";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { trackEvent } from "@/lib/analytics";

interface VideoCardProps {
  video: VideoItem;
  className?: string;
  /** Compact card used in the home page section. */
  priority?: boolean;
}

/**
 * Thumbnail card that opens a dialog with a privacy-enhanced YouTube embed.
 * The iframe is only mounted after the visitor clicks, so nothing loads up front.
 */
export function VideoCard({ video, className, priority = false }: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm shadow-maroon-900/5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-maroon-900/10",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("video_open", { videoId: video.id });
        }}
        className="relative block aspect-video w-full overflow-hidden bg-maroon-900 focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label={`Play video: ${video.title}`}
      >
        {thumbFailed ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-br from-maroon-800 via-maroon-900 to-maroon-950"
          >
            <svg
              viewBox="0 0 480 270"
              preserveAspectRatio="none"
              className="size-full text-khaki-400/25"
              aria-hidden="true"
            >
              <g fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M60 270V150a60 75 0 0 1 120 0v120" />
                <path d="M180 270V150a60 75 0 0 1 120 0v120" />
                <path d="M300 270V150a60 75 0 0 1 120 0v120" />
              </g>
            </svg>
          </span>
        ) : (
          <img
            src={video.thumbnailUrl ?? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onError={() => setThumbFailed(true)}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-maroon-950/70 via-maroon-950/10 to-transparent"
        />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid size-14 place-items-center rounded-full bg-cream-50/95 text-maroon-800 shadow-lg transition-transform group-hover:scale-110">
            <Play className="ms-0.5 size-5 fill-current" aria-hidden="true" />
          </span>
        </span>
        <span className="absolute bottom-2 end-2 rounded-full bg-maroon-950/80 px-2 py-0.5 font-sans text-[11px] font-semibold text-cream-100">
          {video.durationLabel}
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-maroon-600">
          {video.category === "nikah"
            ? "Nikah"
            : video.category === "guidance"
              ? "Guidance"
              : "For families"}
        </p>
        <h3 className="font-heading text-lg font-semibold leading-snug text-maroon-900">
          {video.title}
        </h3>
        <p className="font-sans text-sm leading-6 text-muted-foreground">{video.description}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl p-4 sm:p-6">
          <DialogTitle className="pe-8 font-heading text-xl">{video.title}</DialogTitle>
          <DialogDescription className="sr-only">
            Video player. Press Escape to close.
          </DialogDescription>
          {open ? (
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="size-full"
              />
            </div>
          ) : null}
          <p className="font-sans text-sm leading-6 text-muted-foreground">{video.description}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
