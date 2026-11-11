import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, LogOut, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FormField, controlClass } from "@/components/forms/FormField";
import { ProfileCard } from "@/components/profiles/ProfileCard";
import { useAuth } from "@/context/AuthProvider";
import { useMyInterests, useProfilesByIds } from "@/hooks/useApiQueries";
import { useShortlist } from "@/hooks/useShortlist";
import { useSeo } from "@/hooks/useSeo";
import { useSiteSettings } from "@/context/SiteSettingsProvider";
import { changePassword } from "@/api/auth.api";
import { ApiError } from "@/api/http";
import { z } from "zod";
import { toast } from "sonner";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    password: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(1, "Please repeat the new password"),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Both passwords should match",
    path: ["confirmPassword"],
  });

type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

const statusLabel: Record<string, string> = {
  sent: "Sent to the office",
  accepted: "Family agreed to meet",
  declined: "Not a match",
  pending: "Waiting for the office",
};

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { block } = useSiteSettings();
  const navigate = useNavigate();
  const heading = block("page.account");
  const { ids } = useShortlist();
  const interests = useMyInterests();
  const savedProfiles = useProfilesByIds(ids);
  const interestProfiles = useProfilesByIds(
    interests.data?.map((interest) => interest.profileId) ?? [],
  );

  useSeo({
    title: "My account",
    description: "Your saved proposals, interests and password settings.",
    path: "/account",
    noIndex: true,
  });

  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
    defaultValues: { currentPassword: "", password: "", confirmPassword: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    try {
      await changePassword(values.currentPassword, values.password);
      toast.success("Password updated");
      reset();
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Could not change the password.");
    }
  });

  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-maroon-600">
        {heading?.eyebrow ?? "My account"}
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-maroon-700 sm:text-4xl">
        Assalam-o-Alaikum, {user.fullName.split(" ")[0]}
      </h1>
      <p className="mt-2 max-w-2xl font-sans text-[15px] leading-7 text-muted-foreground">
        {heading?.subtitle}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 lg:col-span-1">
          <h2 className="font-heading text-lg font-semibold text-maroon-900">Your details</h2>
          <ul className="mt-4 space-y-3 font-sans text-sm text-maroon-900/85">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-maroon-700" aria-hidden="true" />
              {user.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-maroon-700" aria-hidden="true" />
              {user.city}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-maroon-700" aria-hidden="true" />
              <span className="text-muted-foreground">Ask the office to change your email</span>
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-maroon-700" aria-hidden="true" />
              Member since {new Date(user.memberSince).toLocaleDateString("en-GB")}
            </li>
          </ul>
          <Button
            variant="outline"
            className="mt-5 w-full"
            onClick={() => void logout().then(() => navigate("/"))}
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </Button>
        </section>

        <section className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-heading text-lg font-semibold text-maroon-900">My shortlist</h2>
            <Link
              to="/shortlist"
              className="font-sans text-sm font-semibold text-maroon-700 hover:underline"
            >
              Open shortlist
            </Link>
          </div>

          {ids.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-cream-100 p-4 font-sans text-sm leading-6 text-maroon-900/75">
              Nothing saved yet. Press the heart on any proposal to keep it here.
            </p>
          ) : savedProfiles.isLoading ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-64 rounded-3xl" />
              <Skeleton className="h-64 rounded-3xl" />
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(savedProfiles.data ?? []).slice(0, 2).map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold text-maroon-900">My interests</h2>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            When you ask about a proposal, the office records it here.
          </p>

          {interests.isLoading ? (
            <Skeleton className="mt-4 h-24 rounded-2xl" />
          ) : (interests.data ?? []).length === 0 ? (
            <p className="mt-4 rounded-2xl bg-cream-100 p-4 font-sans text-sm leading-6 text-maroon-900/75">
              No interests sent yet. Open a proposal and press Ask about this proposal.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {(interests.data ?? []).map((interest) => {
                const profile = (interestProfiles.data ?? []).find(
                  (item) => item.id === interest.profileId,
                );
                return (
                  <li key={interest.id} className="flex items-center justify-between gap-3 py-3">
                    <div>
                      <p className="font-heading text-sm font-semibold text-maroon-900">
                        {profile ? `${profile.displayName} · ${profile.id}` : interest.profileId}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground">
                        {profile ? `${profile.city}, ${profile.country}` : "Proposal closed"}
                      </p>
                    </div>
                    <Badge variant={interest.status === "accepted" ? "success" : "secondary"}>
                      {statusLabel[interest.status]}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="rounded-3xl border border-border bg-white p-6 shadow-sm shadow-maroon-900/5 lg:col-span-1">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold text-maroon-900">
            <Heart className="size-4 text-maroon-700" aria-hidden="true" />
            Change password
          </h2>

          <form onSubmit={onSubmit} noValidate className="mt-4 space-y-4">
            <FormField
              id="current-password"
              label="Current password"
              error={errors.currentPassword?.message}
              required
            >
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                className={controlClass}
                {...register("currentPassword")}
              />
            </FormField>
            <FormField
              id="account-password"
              label="New password"
              error={errors.password?.message}
              hint="At least 8 characters."
              required
            >
              <Input
                id="account-password"
                type="password"
                autoComplete="new-password"
                className={controlClass}
                {...register("password")}
              />
            </FormField>
            <FormField
              id="account-confirm"
              label="Repeat password"
              error={errors.confirmPassword?.message}
              required
            >
              <Input
                id="account-confirm"
                type="password"
                autoComplete="new-password"
                className={controlClass}
                {...register("confirmPassword")}
              />
            </FormField>

            {error ? (
              <p role="alert" className="font-sans text-sm text-red-700">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Save password
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
