import { env } from "@/lib/env";

interface WhatsAppOptions {
  /** Any extra context, e.g. profile ID, plan name or service name. */
  message?: string;
  /** Send to this number instead of the office number, e.g. a consultant's own line. */
  number?: string;
}

/**
 * Defaults come from site settings once they load, so the admin can change the
 * number without a deploy. Env values are the fallback while settings load.
 */
let runtimeDefaults: { number: string; message: string } | null = null;

export function configureWhatsApp(settings: { number: string; message: string }): void {
  runtimeDefaults = settings;
}

function defaults(): { number: string; message: string } {
  return (
    runtimeDefaults ?? {
      number: env.whatsappNumber,
      message: env.whatsappMessage,
    }
  );
}

/**
 * Builds a wa.me link with a context-aware, prefilled message.
 * Accepts a plain message string or an options object.
 */
export function buildWhatsAppUrl(input: string | WhatsAppOptions = {}): string {
  const { number: officeNumber, message: greeting } = defaults();
  const context = (typeof input === "string" ? input : input.message)?.trim();
  const target = (typeof input === "string" ? undefined : input.number)?.trim() || officeNumber;
  const text = context ? `${greeting}\n\n${context}` : greeting;
  return `https://wa.me/${target.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export function whatsappForProfile(profileId: string, displayName: string): string {
  return buildWhatsAppUrl({
    message: `Profile ID: ${profileId}\nName: ${displayName}\nI would like to ask about this proposal.`,
  });
}

export function whatsappForPlan(planName: string, customMessage?: string): string {
  return buildWhatsAppUrl({
    message:
      customMessage ?? `Plan: ${planName}\nI would like to know more about this membership plan.`,
  });
}

export function whatsappForService(serviceName: string): string {
  return buildWhatsAppUrl({
    message: `Service: ${serviceName}\nPlease share the details and process.`,
  });
}
