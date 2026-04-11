"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateStaffForm } from "./create-staff-form";

interface Props {
  tenantSlug: string;
}

export function AddStaffDialog({ tenantSlug }: Readonly<Props>) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          موظف جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-150">
        <DialogHeader>
          <DialogTitle>إضافة موظف جديد</DialogTitle>
          <DialogDescription>
            اختر نوع الموظف ثم اكمل البيانات.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login-based" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login-based">له حساب على السيستم</TabsTrigger>
            <TabsTrigger value="payroll-only">بدون حساب</TabsTrigger>
          </TabsList>

          <TabsContent value="login-based" className="pt-4">
            <CreateStaffForm
              mode="login-based"
              tenantSlug={tenantSlug}
              onSuccess={() => setOpen(false)}
            />
          </TabsContent>

          <TabsContent value="payroll-only" className="pt-4">
            <CreateStaffForm
              mode="payroll-only"
              tenantSlug={tenantSlug}
              onSuccess={() => setOpen(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
