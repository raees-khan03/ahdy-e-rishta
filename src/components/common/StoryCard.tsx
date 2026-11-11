import { useState } from "react";
import { MapPin, Quote, Share2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { SuccessStory } from "@/schemas/content.schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StoryCardProps {
  story: SuccessStory;
  className?: string;
}

export function StoryCard({ story, className }: StoryCardProps) {
  const [open, setOpen] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}/success-stories#${story.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: story.coupleLabel, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied.");
    } catch {
      toast.info("Press and hold the address bar to copy this link.");
    }
  };

  return (
    <>
      <article
        className={cn(
          "flex h-full flex-col gap-4 rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-maroon-900/10",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <Quote className="size-6 text-peach-400" aria-hidden="true" />
          {story.isSample ? (
            <Badge variant="outline" className="font-normal">
              Sample story
            </Badge>
          ) : null}
        </div>

        <blockquote className="font-heading text-lg italic leading-snug text-maroon-900">
          &ldquo;{story.quote}&rdquo;
        </blockquote>

        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden="true" />
            {story.city}
          </span>
          <span aria-hidden="true">·</span>
          <span>{story.year}</span>
          <span aria-hidden="true">·</span>
          <span>{story.serviceUsed}</span>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border pt-3">
          <p className="font-sans text-sm font-semibold text-maroon-800">{story.coupleLabel}</p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
              Read story
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => void share()}
              aria-label={`Share story from ${story.city}`}
            >
              <Share2 aria-hidden="true" />
            </Button>
          </div>
        </div>
      </article>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{story.coupleLabel}</DialogTitle>
            <DialogDescription>
              {story.city} · {story.year} · {story.serviceUsed}
            </DialogDescription>
          </DialogHeader>
          <p className="font-heading text-lg italic leading-snug text-maroon-900">
            &ldquo;{story.quote}&rdquo;
          </p>
          <p className="font-sans text-[15px] leading-7 text-muted-foreground">{story.story}</p>
          {story.isSample ? (
            <p className="rounded-2xl bg-cream-100 p-3 font-sans text-xs leading-5 text-maroon-900/70">
              This is a sample story used to show the layout. Real stories will be published only
              with the written consent of both families.
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <a href="/register">Start your own search</a>
            </Button>
            <Button variant="outline" onClick={() => void share()}>
              <Share2 aria-hidden="true" /> Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
