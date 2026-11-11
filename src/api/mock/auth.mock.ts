/**
 * DUMMY DATA, replace with real data or API.
 * One account for each role. These exist for development only and are listed in
 * docs/PROJECT_GUIDE.md. The real API checks phone and password and sets a
 * httpOnly cookie.
 */
export interface MockAccount {
  id: string;
  fullName: string;
  phone: string;
  /** Plain text only because this is a mock. The real API hashes passwords. */
  password: string;
  role: "user" | "admin";
  city: string;
  memberSince: string;
}

export const mockAccounts: MockAccount[] = [
  {
    id: "user-1",
    fullName: "Ayesha K.",
    phone: "03001234567",
    password: "Rishta@2026",
    role: "user",
    city: "Lahore",
    memberSince: "2026-02-14",
  },
  {
    id: "admin-1",
    fullName: "Office Admin",
    phone: "03009999999",
    password: "Bureau@2026",
    role: "admin",
    city: "Lahore",
    memberSince: "2026-01-05",
  },
];

/** Code the mock password reset accepts. Documented as development only. */
export const MOCK_OTP = "123456";
