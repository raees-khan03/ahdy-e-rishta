import type { z } from "zod";
import { env } from "@/lib/env";

export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export interface RequestOptions<T> {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  signal?: AbortSignal;
  schema: z.ZodType<T>;
  /** Milliseconds before the request is aborted. */
  timeout?: number;
}

/**
 * Thin, typed fetch wrapper. Every response is validated with zod so a backend
 * change cannot silently break the UI. Swapping mocks for a real API only
 * touches the service files, never the components.
 */
export async function httpRequest<T>(path: string, options: RequestOptions<T>): Promise<T> {
  const { method = "GET", body, signal, schema, timeout = 15000 } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const onAbort = () => controller.abort();
  signal?.addEventListener("abort", onAbort, { once: true });

  try {
    const response = await fetch(`${env.apiUrl.replace(/\/$/, "")}${path}`, {
      method,
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      let details: unknown;
      try {
        details = await response.json();
      } catch {
        details = undefined;
      }
      throw new ApiError(
        response.status === 404
          ? "We could not find what you were looking for."
          : "Something went wrong while loading this section. Please try again.",
        response.status,
        details,
      );
    }

    const json: unknown = await response.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      throw new ApiError(
        "The server returned data we could not read.",
        502,
        parsed.error.flatten(),
      );
    }
    return parsed.data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError("We could not reach the server. Please check your connection.", 0, error);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", onAbort);
  }
}
