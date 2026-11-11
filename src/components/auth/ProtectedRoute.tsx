import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import type { Role } from "@/schemas/auth.schema";

interface ProtectedRouteProps {
  children: ReactNode;
  /** Roles allowed to open the page. Defaults to any signed-in member. */
  allow?: Role[];
}

/**
 * Keeps a page for signed-in members only and remembers where the visitor was
 * going, so the login form can send them straight back.
 */
export function ProtectedRoute({ children, allow }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-4 h-40 w-full rounded-3xl" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allow && !allow.includes(user.role)) {
    return <Navigate to="/account" replace />;
  }

  return <>{children}</>;
}
