/**
 * Tiny vendor-free analytics placeholder. Swap the body of `trackEvent`
 * for a real provider later; call sites do not need to change.
 */
export type AnalyticsEvent =
  | "whatsapp_click"
  | "register_step"
  | "register_submit"
  | "search_submit"
  | "profile_view"
  | "shortlist_toggle"
  | "newsletter_submit"
  | "contact_submit"
  | "video_open"
  | "filter_change";

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (import.meta.env.DEV && import.meta.env.VITE_ANALYTICS_DEBUG === "true") {
    console.info("[analytics]", event, payload);
  }
  // Intentionally no-op in production until a provider is connected.
}
