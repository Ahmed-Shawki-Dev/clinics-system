"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IDoctorVisitConfig } from "@/types/doctor";
import { VISIT_CONFIG_LABELS } from "@/constants/visit-fields";
import { updateMyVisitFieldsAction } from "../../../../../actions/doctor/update-my-visit-fields";

interface Props {
  tenantSlug: string;
  initialConfig: IDoctorVisitConfig;
}

export function VisitFieldsClient({ tenantSlug, initialConfig }: Props) {
  const [config, setConfig] = useState<IDoctorVisitConfig>(initialConfig);
  const [isPending, startTransition] = useTransition();

  const handleToggle = (key: keyof IDoctorVisitConfig) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    startTransition(async () => {
      const res = await updateMyVisitFieldsAction(
        tenantSlug,
        config as unknown as Record<string, boolean>,
      );

      if (res.success) {
        toast.success("تم حفظ إعدادات الكشف بنجاح");
      } else {
        toast.error(res.message || "حدث خطأ أثناء الحفظ");
      }
    });
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 py-4 md:grid-cols-2">
          {(
            Object.keys(VISIT_CONFIG_LABELS) as Array<keyof IDoctorVisitConfig>
          ).map((key) => (
            <div
              key={key}
              className="hover:bg-muted/30 flex items-center justify-between rounded-md border-b p-2 pb-3 transition-colors"
            >
              <Label
                htmlFor={key}
                className="w-full cursor-pointer text-base font-semibold"
              >
                {VISIT_CONFIG_LABELS[key]}
              </Label>
              <Switch
                id={key}
                checked={config[key]}
                onCheckedChange={() => handleToggle(key)}
                disabled={isPending}
                dir="ltr"
                className="data-[state=checked]:bg-primary"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end border-t pt-6">
          <Button
            onClick={handleSave}
            disabled={isPending}
            size="lg"
            className="px-8"
          >
            {isPending ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="ml-2 h-4 w-4" />
            )}
            حفظ الإعدادات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
