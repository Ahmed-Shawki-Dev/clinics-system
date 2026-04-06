"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { editInvoiceAction } from "@/actions/finance/invoices";
import { IInvoice } from "@/types/visit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function EditInvoiceDialog({
  invoice,
  tenantSlug,
  open,
  setOpen,
}: {
  invoice: IInvoice;
  tenantSlug: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [amount, setAmount] = useState<string>((invoice.amount ?? "").toString());
  const [loading, setLoading] = useState(false);
  const paidAmount = invoice.paidAmount ?? 0;

  const handleEdit = async () => {
    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0)
      return toast.error("أدخل مبلغ صحيح");

    if (numericAmount < paidAmount) {
      return toast.error(
        `لا يمكن تقليل الإجمالي عن المبلغ المدفوع مسبقاً (${paidAmount} ج.م)`,
      );
    }

    setLoading(true);
    const res = await editInvoiceAction(tenantSlug, invoice.id ?? "", {
      amount: numericAmount,
    });
    setLoading(false);

    if (res.success) {
      toast.success("تم التعديل بنجاح");
      setOpen(false);
    } else {
      toast.error(res.message || "حدث خطأ");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>تعديل إجمالي الفاتورة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-muted flex justify-between rounded-lg p-3 text-sm font-bold">
            <span>المدفوع مسبقاً:</span>
            <span className="text-primary">{paidAmount} ج.م</span>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold">الإجمالي الجديد (ج.م)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            إلغاء
          </Button>
          <Button onClick={handleEdit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} حفظ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
