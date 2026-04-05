"use client";

import { useSyncExternalStore } from "react";
import { useUserRole } from "@/hooks/use-auth";
import { UserRole } from "@/config/roles";

// 👇 التعديل هنا: ضيف الـ fallback للـ Interface
interface PermissionGateProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode; // علامة الاستهام معناها إنه اختياري
}

const emptySubscribe = () => () => {};

export function PermissionGate({
  allowedRoles,
  children,
  fallback = null,
}: PermissionGateProps) {
  const currentRole = useUserRole();

  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!isHydrated) return null;

  // لو مسموح له، اعرض الـ children، وإلا اعرض الـ fallback
  if (!currentRole || !allowedRoles.includes(currentRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
