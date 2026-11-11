import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Profile } from "@/schemas/profile.schema";
import malePlaceholder from "@/assets/photos/profile-m-2.jpg";
import femalePlaceholder from "@/assets/photos/profile-f-3.jpg";

export interface ProfilePhotoProps {
  profile: Pick<Profile, "photoUrl" | "photoVisible" | "displayName" | "gender">;
  className?: string;
  /** Set for above-the-fold images so they load eagerly. */
  priority?: boolean;
  sizes?: string;
}

/**
 * Shows the photograph when the family allowed one, otherwise the
 * "Photograph on request" placeholder. Mock data uses free placeholder portraits.
 */
export function ProfilePhoto({ profile, className, priority = false, sizes }: ProfilePhotoProps) {
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Cache se aane wali photo par load event pahle hi guzar sakta hai
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);
  const showPhoto = profile.photoVisible && Boolean(profile.photoUrl);
  // Remote portraits can fail on a slow or filtered connection; keep the card tidy.
  const fallback = profile.gender === "male" ? malePlaceholder : femalePlaceholder;

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-linear-to-b from-cream-100 to-cream-200",
        className,
      )}
    >
      {showPhoto ? (
        <img
          ref={imgRef}
          onLoad={() => setLoaded(true)}
          src={failed ? fallback : (profile.photoUrl ?? undefined)}
          alt={`Photograph of ${profile.displayName}`}
          onError={() => setFailed(true)}
          width={640}
          height={800}
          sizes={sizes ?? "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className={
            reduceMotion
              ? "size-full object-cover"
              : `size-full object-cover transition-opacity duration-500 ${
                  loaded ? "opacity-100" : "opacity-0"
                }`
          }
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2 px-4 text-center">
          <span className="grid size-11 place-items-center rounded-full border border-khaki-300/70 bg-white/70 text-maroon-700">
            <ImageOff className="size-5" aria-hidden="true" />
          </span>
          <p className="font-heading text-sm font-semibold text-maroon-800">
            Photograph on request
          </p>
          <p className="max-w-40 font-sans text-[11px] leading-4 text-muted-foreground">
            Shared by the office only with the family&apos;s consent.
          </p>
        </div>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-maroon-950/25 to-transparent"
      />
    </div>
  );
}
