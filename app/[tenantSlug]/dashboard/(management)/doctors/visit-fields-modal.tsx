"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { IDoctorVisitConfig } from "@/types/doctor";
import { updateVisitFieldsAction } from "@/actions/doctor/update-visit-fields";
import { VISIT_CONFIG_LABELS } from "../../../../../constants/visit-fields";

interface Props {
  tenantSlug: string;
  doctorId: string;
  initialConfig: IDoctorVisitConfig;
  isOpen: boolean;
  onClose: () => void;
}

export function VisitFieldsConfigModal({
  tenantSlug,
  doctorId,
  initialConfig,
  isOpen,
  onClose,
}: Props) {
  const [config, setConfig] = useState<IDoctorVisitConfig>(initialConfig);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (key: keyof IDoctorVisitConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateVisitFieldsAction(
        tenantSlug,
        doctorId,
        config as unknown as Record<string, boolean>,
      );

      if (res.success) {
        toast.success("تم تحديث إعدادات الكشف بنجاح");
        onClose();
      } else {
        toast.error(res.message || "حدث خطأ أثناء الحفظ");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-137.5">
        <DialogHeader>
          <DialogTitle>إعدادات شاشة الكشف</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 py-6 md:grid-cols-2">
          {(
            Object.keys(VISIT_CONFIG_LABELS) as Array<keyof IDoctorVisitConfig>
          ).map((key) => (
            <div
              key={key}
              className="flex items-center justify-between border-b pb-2"
            >
              <Label htmlFor={key} className="cursor-pointer text-sm font-bold">
                {VISIT_CONFIG_LABELS[key]}
              </Label>
              <Switch
                id={key}
                checked={config[key]}
                onCheckedChange={() => handleToggle(key)}
                disabled={isPending}
                dir="ltr"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="bg-emerald-600 px-8 text-white hover:bg-emerald-700"
          >
            {isPending ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : null}
            حفظ التعديلات
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
