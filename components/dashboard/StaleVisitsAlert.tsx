"use client";

import { getStaleVisitsAction } from "@/actions/maintenance/maintenance-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, ListFilter } from "lucide-react";
import useSWR from "swr";
import { StaleVisitsManager } from "./StaleVisitsManager";

interface StaleVisitsAlertProps {
  tenantSlug: string;
}

export function StaleVisitsAlert({ tenantSlug }: StaleVisitsAlertProps) {
  const {
    data: staleRes,
    mutate,
    isLoading,
  } = useSWR(
    ["stale-visits", tenantSlug],
    ([, slug]) => getStaleVisitsAction(slug, 12),
    {
      revalidateOnFocus: true,
    },
  );

  const staleVisits = staleRes?.data || [];
  const count = staleVisits.length;

  if (isLoading || count === 0) return null;

  return (
    <div className="mb-6">
      <Alert className="border-border bg-card text-card-foreground flex flex-col items-start justify-between gap-4 border py-4 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          {/* 2. أيقونة محايدة جوه Box احترافي */}
          <div className="bg-muted border-border shrink-0 rounded-md border p-2.5">
            <AlertTriangle className="text-muted-foreground size-5" />
          </div>

          <div>
            <AlertTitle className="text-base font-bold tracking-tight">
              تنبيه سلامة البيانات: زيارات معلقة
            </AlertTitle>
            <AlertDescription className="text-muted-foreground mt-1 text-sm">
              يوجد {count} زيارات غير مغلقة من أيام سابقة. عدم إغلاقها يؤثر على
              دقة إحصائيات النظام.
            </AlertDescription>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            {/* 4. زرار Outline شيك ومحايد */}
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-muted/50 shrink-0 gap-2 font-medium"
            >
              <ListFilter className="size-4" />
              مراجعة وتنظيف
            </Button>
          </DialogTrigger>

          {/* Modal Content */}
          <DialogContent className="flex max-h-[85vh] max-w-4xl flex-col gap-0 overflow-hidden p-0">
            <DialogHeader className="bg-muted/20 border-b p-6">
              <DialogTitle className="text-right text-xl">
                إغلاق الزيارات المعلقة
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <StaleVisitsManager
                initialVisits={staleVisits}
                tenantSlug={tenantSlug}
                onRefresh={() => mutate()}
              />
            </div>
          </DialogContent>
        </Dialog>
      </Alert>
    </div>
  );
}
