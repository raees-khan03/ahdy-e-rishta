import { ApiError } from "@/api/http";
import { mockDelay } from "@/api/mock/delay";
import { env } from "@/lib/env";
import { normalizePhone } from "@/schemas/login.schema";
import {
  authUserSchema,
  loginResponseSchema,
  passwordChangeResponseSchema,
  type AuthUser,
  type LoginResponse,
} from "@/schemas/auth.schema";
import { MOCK_OTP, mockAccounts } from "@/api/mock/auth.mock";

const GENERIC_ERROR = "Number or password is incorrect.";

/* ------------------------------------------------------------------
   Cosmetic throttle. The real protection lives on the server.
   ------------------------------------------------------------------ */
const attempts: number[] = [];
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const BLOCK_MS = 60 * 1000;
let blockedUntil = 0;

function checkThrottle(): void {
  const now = Date.now();
  if (now < blockedUntil) {
    const seconds = Math.ceil((blockedUntil - now) / 1000);
    throw new ApiError(`Too many attempts. Please try again in ${seconds} seconds.`, 429);
  }
  while (attempts.length > 0 && now - attempts[0] > WINDOW_MS) attempts.shift();
  if (attempts.length >= MAX_ATTEMPTS) {
    blockedUntil = now + BLOCK_MS;
    throw new ApiError("Too many attempts. Please try again in a minute.", 429);
  }
}

function recordFailure(): void {
  attempts.push(Date.now());
}

const STORAGE_KEY = "ahd-e-rishta:session";

export function readStoredSession(): { token: string; user: AuthUser } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = loginResponseSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

function writeSession(session: LoginResponse | null): void {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Private mode blocks storage. The visitor is simply signed out next reload.
  }
}

export async function login(phone: string, password: string): Promise<LoginResponse> {
  checkThrottle();

  if (env.useMockApi) {
    await mockDelay(500);
    const normalized = normalizePhone(phone);
    const account = mockAccounts.find(
      (candidate) =>
        normalizePhone(candidate.phone) === normalized && candidate.password === password,
    );

    if (!account) {
      recordFailure();
      throw new ApiError(GENERIC_ERROR, 401);
    }

    attempts.length = 0;
    const session: LoginResponse = {
      token: `mock.${account.id}.${Date.now().toString(36)}`,
      user: authUserSchema.parse({
        id: account.id,
        fullName: account.fullName,
        phone: normalizePhone(account.phone),
        role: account.role,
        city: account.city,
        memberSince: account.memberSince,
      }),
    };
    writeSession(session);
    return session;
  }

  const response = await fetch(`${env.apiUrl.replace(/\/$/, "")}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ phone: normalizePhone(phone), password }),
  });

  if (!response.ok) {
    recordFailure();
    throw new ApiError(GENERIC_ERROR, response.status);
  }

  const parsed = loginResponseSchema.parse(await response.json());
  attempts.length = 0;
  writeSession(parsed);
  return parsed;
}

export async function logout(): Promise<void> {
  if (!env.useMockApi) {
    try {
      await fetch(`${env.apiUrl.replace(/\/$/, "")}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Signing out locally is enough.
    }
  }
  writeSession(null);
}

/** Session check on first load. A 401 clears the stored session. */
export async function currentUser(): Promise<AuthUser | null> {
  const stored = readStoredSession();
  if (!stored) return null;
  if (env.useMockApi) {
    await mockDelay(80);
    return stored.user;
  }
  try {
    const response = await fetch(`${env.apiUrl.replace(/\/$/, "")}/auth/me`, {
      credentials: "include",
    });
    if (response.status === 401) {
      writeSession(null);
      return null;
    }
    if (!response.ok) return stored.user;
    return authUserSchema.parse(await response.json());
  } catch {
    return stored.user;
  }
}

export async function requestPasswordReset(phone: string): Promise<{ sent: boolean }> {
  if (env.useMockApi) {
    await mockDelay(420);
    const exists = mockAccounts.some(
      (account) => normalizePhone(account.phone) === normalizePhone(phone),
    );
    // Always answer the same way so the form cannot be used to find accounts.
    return { sent: exists || true };
  }
  const response = await fetch(`${env.apiUrl.replace(/\/$/, "")}/auth/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: normalizePhone(phone) }),
  });
  if (!response.ok)
    throw new ApiError("Could not send the code. Please try again.", response.status);
  return { sent: true };
}

export async function verifyOtp(phone: string, code: string): Promise<{ verified: boolean }> {
  if (env.useMockApi) {
    await mockDelay(320);
    if (code !== MOCK_OTP) throw new ApiError("That code is not correct.", 400);
    return { verified: true };
  }
  const response = await fetch(`${env.apiUrl.replace(/\/$/, "")}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: normalizePhone(phone), code }),
  });
  if (!response.ok) throw new ApiError("That code is not correct.", response.status);
  return { verified: true };
}

export async function resetPassword(
  phone: string,
  code: string,
  password: string,
): Promise<{ ok: boolean }> {
  if (env.useMockApi) {
    await mockDelay(500);
    if (code !== MOCK_OTP) throw new ApiError("That code is not correct.", 400);
    const account = mockAccounts.find(
      (candidate) => normalizePhone(candidate.phone) === normalizePhone(phone),
    );
    if (account) account.password = password;
    return { ok: true };
  }
  const response = await fetch(`${env.apiUrl.replace(/\/$/, "")}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: normalizePhone(phone), code, password }),
  });
  if (!response.ok) throw new ApiError("Could not change the password.", response.status);
  return { ok: true };
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<{ ok: boolean }> {
  if (env.useMockApi) {
    await mockDelay(480);
    const session = readStoredSession();
    const account = mockAccounts.find((candidate) => candidate.id === session?.user.id);
    if (!account || account.password !== currentPassword) {
      throw new ApiError("Your current password is not correct.", 400);
    }
    account.password = newPassword;
    return { ok: true };
  }
  const response = await fetch(`${env.apiUrl.replace(/\/$/, "")}/auth/change-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!response.ok) throw new ApiError("Your current password is not correct.", response.status);
  return passwordChangeResponseSchema.parse(await response.json());
}
