"use client";

import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, Loader2, PlusCircle, Check, CreditCard } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  extendSubscriptionAction,
  getSubscriptions,
  createSubscriptionAction,
  markAsPaidAction,
} from "@/actions/platform/subscriptions";
import { ISubscription } from "../../types/subscriptions";

export function TenantSubscriptionTab({ tenantId }: { tenantId: string }) {
  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // States للتمديد
  const [newDate, setNewDate] = useState("");

  // States لإنشاء اشتراك جديد
  const [isCreating, setIsCreating] = useState(false);
  const [planName, setPlanName] = useState("الخطة الأساسية");
  const [amount, setAmount] = useState("1000");
  const [createEndDate, setCreateEndDate] = useState("");

  // States لتأكيد الدفع
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentRef, setPaymentRef] = useState("");

  // جلب بيانات الاشتراك
  useEffect(() => {
    async function load() {
      const res = await getSubscriptions(tenantId);
      if (res.success && res.data?.items && res.data.items.length > 0) {
        setSubscription(res.data.items[0]);
      }
      setIsLoading(false);
    }
    load();
  }, [tenantId]);

  // دالة إنشاء اشتراك جديد
  const handleCreate = () => {
    if (!createEndDate || !planName || !amount) {
      toast.error("أكمل بيانات الاشتراك أولاً");
      return;
    }
    startTransition(async () => {
      const res = await createSubscriptionAction({
        tenantId: tenantId,
        planName: planName,
        startDate: new Date().toISOString(),
        endDate: new Date(createEndDate).toISOString(),
        amount: Number(amount),
        currency: "EGP",
        notes: "تم الإنشاء من لوحة التحكم",
      });

      if (res.success && res.data) {
        toast.success("تم إنشاء الاشتراك بنجاح");
        setSubscription(res.data);
        setIsCreating(false);
      } else {
        toast.error(res.message || "فشل إنشاء الاشتراك");
      }
    });
  };

  // دالة تمديد الاشتراك
  const handleExtend = () => {
    if (!newDate || !subscription) return;
    startTransition(async () => {
      const res = await extendSubscriptionAction(subscription.id, {
        newEndDate: new Date(newDate).toISOString(),
        notes: "تم التمديد من لوحة التحكم",
      });
      if (res.success && res.data) {
        toast.success("تم تمديد الاشتراك بنجاح");
        setSubscription(res.data);
        setNewDate("");
      } else {
        toast.error(res.message || "فشل التمديد");
      }
    });
  };

  // دالة تأكيد الدفع
  const handleMarkPaid = () => {
    if (!paymentMethod || !paymentRef || !subscription) {
      toast.error("أكمل بيانات الدفع أولاً");
      return;
    }
    startTransition(async () => {
      const res = await markAsPaidAction(subscription.id, {
        paymentMethod,
        paymentReference: paymentRef,
        paidAt: new Date().toISOString(),
      });
      if (res.success && res.data) {
        toast.success("تم تسجيل الدفعة بنجاح");
        setSubscription(res.data);
        setShowPaymentForm(false);
        setPaymentRef("");
      } else {
        toast.error(res.message || "فشل تسجيل الدفعة");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="text-primary h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {subscription ? (
        <>
          {/* كارت عرض البيانات الحالية */}
          <div className="bg-muted/30 space-y-4 rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">الخطة الحالية:</span>
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20"
              >
                {subscription.planName}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">تاريخ الانتهاء:</span>
              <span className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {format(new Date(subscription.endDate), "dd MMMM yyyy", {
                  locale: ar,
                })}
              </span>
            </div>

            {/* حالة الدفع مع زرار التسجيل الدائم */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">حالة الدفع:</span>
              <div className="flex items-center gap-2">
                {subscription.isPaid ? (
                  <Badge className="border-green-200 bg-green-500/10 text-green-600">
                    تم الدفع
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="animate-pulse">
                    بانتظار الدفع
                  </Badge>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs"
                  onClick={() => setShowPaymentForm(!showPaymentForm)}
                >
                  تسجيل دفعة
                </Button>
              </div>
            </div>

            {/* فورم الدفع */}
            {showPaymentForm && (
              <div className="animate-in fade-in zoom-in mt-4 grid gap-3 border-t border-dashed pt-4 duration-200">
                <div className="grid gap-2">
                  <Label className="text-xs">طريقة الدفع</Label>
                  <Input
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    placeholder="كاش، تحويل بنكي، محفظة إلكترونية..."
                    className="h-8 text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">
                    رقم المرجع (رقم الإيصال / التحويل)
                  </Label>
                  <Input
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    placeholder="مثال: TRX-12345"
                    className="h-8 text-sm"
                  />
                </div>
                <Button
                  size="sm"
                  onClick={handleMarkPaid}
                  disabled={isPending}
                  className="mt-2 w-full"
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" /> تأكيد استلام
                      المبلغ
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <Separator />

          {/* فورم تمديد الاشتراك */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-bold">
              <PlusCircle className="h-4 w-4" /> تمديد فترة الاشتراك
            </h4>
            <div className="grid gap-2">
              <Label
                htmlFor="newDate"
                className="text-muted-foreground text-xs"
              >
                اختر تاريخ الانتهاء الجديد
              </Label>
              <div className="flex gap-2">
                <Input
                  id="newDate"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleExtend} disabled={isPending || !newDate}>
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "تمديد"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // حالة لو العيادة ملهاش اشتراك
        <div className="py-4">
          {!isCreating ? (
            <div className="bg-muted/10 rounded-xl border border-dashed py-10 text-center">
              <p className="text-muted-foreground mb-4 text-sm italic">
                لا يوجد اشتراك نشط لهذه العيادة
              </p>
              <Button onClick={() => setIsCreating(true)}>
                <PlusCircle className="mr-2 h-4 w-4" /> إنشاء اشتراك جديد
              </Button>
            </div>
          ) : (
            <div className="bg-muted/5 animate-in fade-in space-y-4 rounded-xl border p-4">
              <h4 className="flex items-center gap-2 border-b pb-2 text-sm font-bold">
                <PlusCircle className="text-primary h-4 w-4" /> بيانات الاشتراك
                الجديد
              </h4>

              <div className="mt-2 grid gap-4">
                <div className="grid gap-2">
                  <Label className="text-xs">اسم الخطة</Label>
                  <Input
                    value={planName}
                    onChange={(e) => setPlanName(e.target.value)}
                    className="h-9"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs">المبلغ (EGP)</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-9"
                  />
                </div>

                <div className="grid gap-2">
                  <Label className="text-xs">تاريخ الانتهاء</Label>
                  <Input
                    type="date"
                    value={createEndDate}
                    onChange={(e) => setCreateEndDate(e.target.value)}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreating(false)}
                  disabled={isPending}
                >
                  إلغاء
                </Button>
                <Button size="sm" onClick={handleCreate} disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> حفظ وتفعيل
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
