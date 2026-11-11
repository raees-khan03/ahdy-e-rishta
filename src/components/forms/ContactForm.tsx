import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTACT_TOPICS,
  contactInquirySchema,
  type ContactInquiry,
} from "@/schemas/inquiry.schema";
import { submitInquiry } from "@/api/inquiries.api";
import { trackEvent } from "@/lib/analytics";
import { cityOptions } from "@/lib/filterOptions";
import { ComboboxField } from "@/components/forms/ComboboxField";
import { FormField, NativeSelect, controlClass } from "@/components/forms/FormField";
import { Button } from "@/components/ui/button";

const topicOptions = CONTACT_TOPICS.map((topic) => ({ label: topic, value: topic }));

interface ContactFormProps {
  initialTopic?: string;
  className?: string;
}

export function ContactForm({ initialTopic, className }: ContactFormProps) {
  const { t } = useTranslation();

  const defaultTopic = (CONTACT_TOPICS as readonly string[]).includes(initialTopic ?? "")
    ? (initialTopic as (typeof CONTACT_TOPICS)[number])
    : CONTACT_TOPICS[0];

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactInquiry>({
    resolver: zodResolver(contactInquirySchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      topic: defaultTopic,
      message: "",
      company: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: ContactInquiry) => submitInquiry(values),
    onSuccess: () => {
      toast.success(t("forms.contactSuccess"));
      trackEvent("contact_submit");
      reset({ ...valuesForReset(), topic: defaultTopic });
    },
    onError: () => {
      toast.error(t("forms.contactError"));
    },
  });

  function valuesForReset(): Partial<ContactInquiry> {
    return {
      name: "",
      phone: "",
      city: "",
      message: "",
      company: "",
    };
  }

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "rounded-3xl border border-border bg-white p-5 shadow-sm shadow-maroon-900/5 sm:p-7",
        className,
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label={t("forms.name")}
          htmlFor="contact-name"
          required
          error={errors.name?.message}
        >
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            maxLength={80}
            className={controlClass}
            placeholder="e.g. Ayesha Khan"
            aria-invalid={errors.name ? true : undefined}
            {...register("name")}
          />
        </FormField>

        <FormField
          label={t("forms.phone")}
          htmlFor="contact-phone"
          required
          error={errors.phone?.message}
          hint={t("forms.phoneHint")}
        >
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={controlClass}
            placeholder="0300 1234567"
            aria-invalid={errors.phone ? true : undefined}
            {...register("phone")}
          />
        </FormField>

        <ComboboxField
          label={t("forms.city")}
          required
          value={watch("city")}
          onChange={(value) => setValue("city", value, { shouldValidate: true })}
          options={cityOptions}
          placeholder="Search or type your city"
          allowCustom
          error={errors.city?.message}
        />

        <FormField
          label={t("forms.topic")}
          htmlFor="contact-topic"
          required
          error={errors.topic?.message}
        >
          <NativeSelect
            id="contact-topic"
            options={topicOptions}
            aria-invalid={errors.topic ? true : undefined}
            {...register("topic")}
          />
        </FormField>

        <FormField
          label={t("forms.message")}
          htmlFor="contact-message"
          required
          error={errors.message?.message}
          className="sm:col-span-2"
          hint="Please do not include identity documents or bank details in this message."
        >
          <textarea
            id="contact-message"
            rows={5}
            maxLength={1200}
            className={cn(controlClass, "h-auto py-3")}
            placeholder="Tell us briefly what you need help with."
            aria-invalid={errors.message ? true : undefined}
            {...register("message")}
          />
        </FormField>
      </div>

      {/* Honeypot: must stay empty */}
      <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input id="contact-company" tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs leading-5 text-muted-foreground">
          We reply within one working day. For urgent matters, WhatsApp is fastest.
        </p>
        <Button type="submit" size="lg" disabled={mutation.isPending} className="sm:w-auto">
          {mutation.isPending ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" /> {t("forms.sending")}
            </>
          ) : (
            <>
              {t("forms.send")}
              <Send aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
