import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  newsletterSubscriptionSchema,
  type NewsletterSubscription,
} from "@/schemas/inquiry.schema";
import { subscribeToNewsletter } from "@/api/newsletter.api";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

interface NewsletterFormProps {
  tone?: "light" | "dark";
  className?: string;
}

export function NewsletterForm({ tone = "light", className }: NewsletterFormProps) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterSubscription>({
    resolver: zodResolver(newsletterSubscriptionSchema),
    defaultValues: { email: "", company: "" },
  });

  const mutation = useMutation({
    mutationFn: (values: NewsletterSubscription) => subscribeToNewsletter(values.email),
    onSuccess: () => {
      toast.success(t("forms.newsletterSuccess"));
      trackEvent("newsletter_submit");
      reset();
    },
    onError: () => {
      toast.error("We could not subscribe you right now. Please try again in a moment.");
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <form onSubmit={onSubmit} className={cn("w-full max-w-md", className)} noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="newsletter-email" className="sr-only">
            {t("forms.email")}
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "newsletter-email-error" : undefined}
            className={cn(
              "h-11 w-full rounded-full px-4 font-sans text-base outline-none transition-colors",
              tone === "dark"
                ? "border border-cream-200/25 bg-white/5 text-cream-50 placeholder:text-cream-200/40 focus-visible:border-peach-300 focus-visible:ring-2 focus-visible:ring-peach-300/30"
                : "border border-input bg-white text-foreground placeholder:text-muted-foreground/70 focus-visible:border-maroon-700 focus-visible:ring-2 focus-visible:ring-maroon-700/20",
              errors.email && "border-red-500",
            )}
            {...register("email")}
          />
          {/* Honeypot: hidden from people and screen readers */}
          <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
            <label htmlFor="newsletter-company">Company</label>
            <input
              id="newsletter-company"
              tabIndex={-1}
              autoComplete="off"
              {...register("company")}
            />
          </div>
        </div>
        <Button
          type="submit"
          variant={tone === "dark" ? "peach" : "default"}
          disabled={mutation.isPending}
          className="shrink-0"
        >
          {mutation.isPending ? t("common.submitting") : t("forms.newsletterCta")}
          <Send aria-hidden="true" className="size-4" />
        </Button>
      </div>
      {errors.email ? (
        <p id="newsletter-email-error" role="alert" className="mt-2 font-sans text-xs text-red-400">
          {errors.email.message}
        </p>
      ) : (
        <p
          className={cn(
            "mt-2 font-sans text-xs",
            tone === "dark" ? "text-cream-200/50" : "text-muted-foreground",
          )}
        >
          No forwarded messages. Unsubscribe any time.
        </p>
      )}
    </form>
  );
}
