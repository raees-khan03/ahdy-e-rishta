import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { currentUser, login as loginRequest, logout as logoutRequest } from "@/api/auth.api";
import { switchShortlistOwner } from "@/hooks/useShortlist";
import type { AuthUser, Role } from "@/schemas/auth.schema";

interface AuthValue {
  user: AuthUser | null;
  role: Role | null;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthValue | null>(null);

/**
 * Holds the signed-in visitor. The session is read from storage on first load
 * and checked with the API, so a revoked session logs the visitor out.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const refresh = useCallback(async () => {
    const next = await currentUser();
    setUser(next);
  }, []);

  useEffect(() => {
    let active = true;
    void (async () => {
      const next = await currentUser();
      if (active) {
        setUser(next);
        switchShortlistOwner(next?.id ?? null);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = useCallback(async (phone: string, password: string) => {
    const session = await loginRequest(phone, password);
    setUser(session.user);
    switchShortlistOwner(session.user.id);
    return session.user;
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setUser(null);
    switchShortlistOwner(null);
    queryClient.clear();
  }, [queryClient]);

  const value = useMemo<AuthValue>(
    () => ({ user, role: user?.role ?? null, isLoading, login, logout, refresh }),
    [user, isLoading, login, logout, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
