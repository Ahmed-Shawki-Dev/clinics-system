"use client";

import { getInvoiceByIdAction } from "@/actions/finance/invoices";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IInvoice } from "@/types/visit";
import { Eye, Loader2, ReceiptText } from "lucide-react";
import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function InvoiceDetailsAction({
  invoiceId,
  tenantSlug,
}: {
  invoiceId: string;
  tenantSlug: string;
}) {
  const [open, setOpen] = useState(false);
  const [invoice, setInvoice] = useState<IInvoice | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <DropdownMenuItem
        onSelect={async (e) => {
          e.preventDefault();
          setOpen(true);

          if (!invoice) {
            setLoading(true);
            try {
              const res = await getInvoiceByIdAction(tenantSlug, invoiceId);
              if (res.success && res.data) {
                setInvoice(res.data);
              }
            } catch (error) {
              console.error("Failed to fetch invoice", error);
            } finally {
              setLoading(false);
            }
          }
        }}
        className="flex cursor-pointer items-center gap-2"
      >
        <Eye className="text-muted-foreground size-4" />
        <span>عرض التفاصيل</span>
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="bg-background border-border/40 max-w-2xl gap-0 overflow-hidden p-0 shadow-2xl sm:rounded-2xl"
          dir="rtl"
        >
          {/* Header - Minimal Vercel Style */}
          <DialogHeader className="border-border/40 border-b px-6 py-5">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-base font-semibold">
                <div className="bg-primary/10 flex size-8 items-center justify-center rounded-full">
                  <ReceiptText className="text-primary size-4" />
                </div>
                تفاصيل الفاتورة
              </DialogTitle>
              {!loading && invoice && (
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
                    INV-{invoice.invoiceNumber}
                  </span>
                  <StatusBadge status={invoice.status} />
                </div>
              )}
            </div>
          </DialogHeader>

          {/* Content Area */}
          <div className="max-h-[75vh] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-32">
                <Loader2 className="text-muted-foreground size-6 animate-spin" />
                <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                  جاري التحميل...
                </p>
              </div>
            ) : !invoice ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-32">
                <ReceiptText className="text-muted-foreground/20 size-10" />
                <p className="text-muted-foreground text-sm font-medium">
                  تعذر العثور على بيانات الفاتورة
                </p>
              </div>
            ) : (
              <div className="p-0">
                {/* Meta Info - Vercel Grid */}
                <div className="bg-border/40 border-border/40 grid grid-cols-2 gap-px border-b">
                  <div className="bg-background flex flex-col gap-1 p-6">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      المريض
                    </span>
                    <span className="text-foreground text-sm font-semibold">
                      {invoice.patientName}
                    </span>
                  </div>
                  <div className="bg-background flex flex-col gap-1 p-6">
                    <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      الطبيب المعالج
                    </span>
                    <span className="text-foreground text-sm font-semibold">
                      د. {invoice.doctorName}
                    </span>
                  </div>
                </div>

                <div className="space-y-8 p-6">
                  {/* Line Items - Clean Table */}
                  {invoice.lineItems && invoice.lineItems.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                        الخدمات المقدمة
                      </h3>
                      <div className="border-border/50 overflow-hidden rounded-lg border">
                        <Table>
                          <TableHeader className="bg-muted/30">
                            <TableRow className="hover:bg-transparent">
                              <TableHead className="h-9 text-xs font-medium">
                                الوصف
                              </TableHead>
                              <TableHead className="h-9 text-xs font-medium">
                                الكمية
                              </TableHead>
                              <TableHead className="h-9 text-left text-xs font-medium">
                                القيمة
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {invoice.lineItems.map((item) => (
                              <TableRow
                                key={item.id}
                                className="hover:bg-muted/10 border-border/40"
                              >
                                <TableCell className="py-3 text-sm font-medium">
                                  {item.itemName}
                                </TableCell>
                                <TableCell className="text-muted-foreground py-3 font-mono text-xs">
                                  {item.quantity} × {item.unitPrice}
                                </TableCell>
                                <TableCell className="py-3 text-left font-mono text-sm font-semibold">
                                  {item.totalPrice} ج.م
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}

                  {/* Payments History - Minimalist */}
                  <div className="space-y-3">
                    <h3 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      سجل الدفعات
                    </h3>
                    <div className="border-border/50 overflow-hidden rounded-lg border">
                      <Table>
                        <TableBody>
                          {invoice.payments && invoice.payments.length > 0 ? (
                            invoice.payments.map((payment) => (
                              <TableRow
                                key={payment.id}
                                className={
                                  payment.isRefund
                                    ? "bg-destructive/5 hover:bg-destructive/10"
                                    : "hover:bg-muted/10"
                                }
                              >
                                <TableCell className="text-muted-foreground py-3 font-mono text-xs">
                                  {new Date(
                                    payment.createdAt,
                                  ).toLocaleDateString("ar-EG")}
                                </TableCell>
                                <TableCell className="py-3">
                                  <Badge
                                    variant={
                                      payment.isRefund
                                        ? "destructive"
                                        : "outline"
                                    }
                                    className="rounded-sm text-[10px] font-medium shadow-none"
                                  >
                                    {payment.isRefund
                                      ? "استرداد"
                                      : payment.paymentMethod}
                                  </Badge>
                                </TableCell>
                                <TableCell
                                  className={`py-3 text-left font-mono text-sm font-bold ${payment.isRefund ? "text-destructive" : "text-foreground"}`}
                                >
                                  {payment.isRefund ? "" : "+"}
                                  {payment.amount} ج.م
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                className="text-muted-foreground h-20 text-center text-xs"
                              >
                                لا توجد حركات مالية مسجلة
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Financial Summary - Right Aligned Math */}
                  <div className="flex justify-end pt-4">
                    <div className="w-full space-y-3 sm:w-1/2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">الإجمالي</span>
                        <span className="font-mono font-medium">
                          {invoice.amount} ج.م
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">المدفوع</span>
                        <span className="font-mono font-medium text-emerald-600">
                          {invoice.paidAmount} ج.م
                        </span>
                      </div>
                      <div className="border-border/50 flex justify-between border-t pt-3 text-sm">
                        <span className="font-bold">المتبقي</span>
                        <span className="font-mono text-base font-bold">
                          {invoice.remainingAmount} ج.م
                        </span>
                      </div>

                      {invoice.pendingSettlementAmount > 0 && (
                        <div className="mt-2 flex justify-between rounded bg-amber-500/10 p-2 text-xs text-amber-600">
                          <span className="font-semibold">
                            مبلغ معلق (خدمات إضافية)
                          </span>
                          <span className="font-mono font-bold">
                            {invoice.pendingSettlementAmount} ج.م
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Paid")
    return (
      <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-emerald-600">
        <div className="size-1.5 rounded-full bg-emerald-500" />
        <span className="text-[10px] font-bold tracking-wider uppercase">
          مدفوعة
        </span>
      </div>
    );
  if (status === "PartiallyPaid")
    return (
      <div className="flex items-center gap-1.5 rounded-md border border-amber-500/20 bg-amber-500/10 px-2 py-1 text-amber-600">
        <div className="size-1.5 rounded-full bg-amber-500" />
        <span className="text-[10px] font-bold tracking-wider uppercase">
          دفع جزئي
        </span>
      </div>
    );
  return (
    <div className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-1.5 rounded-md border px-2 py-1">
      <div className="bg-destructive size-1.5 rounded-full" />
      <span className="text-[10px] font-bold tracking-wider uppercase">
        غير مدفوعة
      </span>
    </div>
  );
}
