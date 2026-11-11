import { Link } from "react-router-dom";
import { BadgeCheck, Briefcase, GraduationCap, MapPin, Ruler, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatHeight,
  genderLabel,
  maritalLabel,
  profileHref,
  type Profile,
} from "@/schemas/profile.schema";
import { Badge } from "@/components/ui/badge";
import { ProfilePhoto } from "@/components/profiles/ProfilePhoto";
import { ShortlistButton } from "@/components/profiles/ShortlistButton";
import { ShareButton } from "@/components/profiles/ShareButton";

export interface ProfileCardProps {
  profile: Profile;
  className?: string;
  /** Horizontal layout used by the grid/list toggle and shortlist page. */
  layout?: "grid" | "list";
  priority?: boolean;
  /** Hides the shortlist/share buttons when the card is a preview. */
  showActions?: boolean;
}

function DetailRow({ icon: Icon, children }: { icon: typeof MapPin; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-maroon-900/80">
      <Icon className="size-3.5 shrink-0 text-maroon-600" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </li>
  );
}

/**
 * Whole-card link built with a stretched overlay so nested buttons stay valid
 * and keyboard focus stops exactly once per card.
 */
export function ProfileCard({
  profile,
  className,
  layout = "grid",
  priority = false,
  showActions = true,
}: ProfileCardProps) {
  const isList = layout === "list";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm shadow-maroon-900/5 transition-all duration-300",
        "hover:-translate-y-1 hover:border-maroon-200 hover:shadow-lg hover:shadow-maroon-900/10",
        "focus-within:ring-2 focus-within:ring-maroon-700 focus-within:ring-offset-2",
        isList && "sm:flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          // Hover par photo bahut halka zoom hoti hai (dikhawa, click nahi rokta)
          "[&_img]:transition-transform [&_img]:duration-500 [&_img]:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[&_img]:scale-105",
          isList ? "sm:w-48 sm:shrink-0" : "",
        )}
      >
        <ProfilePhoto
          profile={profile}
          priority={priority}
          className={cn("aspect-square w-full sm:aspect-4/5", isList && "sm:h-full sm:aspect-auto")}
          sizes={isList ? "(max-width: 640px) 90vw, 200px" : "(max-width: 640px) 90vw, 300px"}
        />

        <div className="absolute inset-x-3 top-3 z-20 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {profile.packageName ? (
              <Badge variant="peach" className="shadow-sm">
                {profile.packageName}
              </Badge>
            ) : null}
            {profile.verified ? (
              <Badge variant="secondary" className="gap-1 shadow-sm">
                <BadgeCheck className="size-3.5 text-green-800" aria-hidden="true" />
                Verified
              </Badge>
            ) : null}
          </div>
          {showActions ? (
            <div className="flex flex-col gap-1.5">
              <ShortlistButton profileId={profile.id} />
              <ShareButton
                title={`${profile.displayName} (${profile.id})`}
                path={profileHref(profile.id)}
              />
            </div>
          ) : null}
        </div>

        <p className="pointer-events-none absolute inset-x-3 bottom-3 z-10 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-50">
          {profile.id}
        </p>
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-4 sm:p-5", isList && "sm:justify-center")}>
        <div>
          <h3 className="font-heading text-xl font-semibold text-maroon-900">
            <Link
              to={profileHref(profile.id)}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {profile.displayName}
            </Link>
          </h3>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            {genderLabel(profile.gender)} · {profile.age} yrs · {formatHeight(profile.heightCm)}
          </p>
        </div>

        <ul className="grid gap-1.5 font-sans text-sm">
          <DetailRow icon={UserRound}>
            {maritalLabel(profile.maritalStatus)} · {profile.religion}
          </DetailRow>
          <DetailRow icon={GraduationCap}>{profile.education}</DetailRow>
          <DetailRow icon={Briefcase}>{profile.occupation}</DetailRow>
          <li className="flex items-center gap-2 text-maroon-900/80">
            <MapPin className="size-3.5 shrink-0 text-maroon-600" aria-hidden="true" />
            <span className="truncate">
              {profile.city}, {profile.country}
            </span>
          </li>
          <DetailRow icon={Ruler}>{profile.caste}</DetailRow>
        </ul>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="font-sans text-xs font-semibold text-maroon-700 underline-offset-4 group-hover:underline">
            View profile
          </span>
          <span className="font-sans text-[11px] text-muted-foreground" aria-hidden="true">
            Contact via office
          </span>
        </div>
      </div>
    </article>
  );
}
