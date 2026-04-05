"use client";

import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfileSwitcher({ tenantSlug }: { tenantSlug: string }) {
  const authData = usePatientAuthStore((state) => state.tenants[tenantSlug]);
  const setActiveProfile = usePatientAuthStore(
    (state) => state.setActiveProfile,
  );

  if (!authData?.user) return null;

  const profiles = authData.user.profiles || [];
  const activeProfileId = authData.activeProfileId;
  const activeProfile =
    profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const handleProfileChange = (newProfileId: string) => {
    setActiveProfile(tenantSlug, newProfileId);
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="border-border/40 bg-muted/20 hover:bg-muted/40 flex h-9 items-center gap-2 rounded-full border px-3 transition-all"
        >
          <UserCircle2 className="text-primary h-4 w-4" />
          <span className="max-w-20 truncate text-xs font-bold">
            {activeProfile?.name}
          </span>
          <ChevronDown className="text-muted-foreground h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-1">
        {profiles.map((profile) => (
          <DropdownMenuItem
            key={profile.id}
            onClick={() => handleProfileChange(profile.id)}
            className={`cursor-pointer rounded-md text-xs font-bold ${
              profile.id === activeProfileId ? "bg-primary/10 text-primary" : ""
            }`}
          >
            {profile.name} {profile.isDefault && "(أنا)"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
