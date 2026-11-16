import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { useAuth } from "./useAuth";
import type { Role } from "./schema";

export function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

export function RequireRole({ allow }: { allow: Role[] }) {
  const { user } = useAuth();

  if (!user || !allow.includes(user.role)) {
    return <ForbiddenPage />;
  }

  return <Outlet />;
}
