"use client";

import { useState } from "react";
import { Send, MessageSquarePlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createDoctorNoteAction } from "../actions/notes/notes";

export function SendDoctorNoteModal({ tenantSlug }: { tenantSlug: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return toast.error("اكتب الملاحظة الأول يا دكتور!");

    setLoading(true);
    const res = await createDoctorNoteAction(tenantSlug, message);
    setLoading(false);

    if (res.success) {
      toast.success("وصلت للاستقبال");
      setMessage("");
      setOpen(false);
    } else {
      toast.error(res.message || "في مشكلة في الشبكة");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              {/* الدايرة الصغيرة اهي: h-12 w-12 rounded-full */}
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 h-12 w-12 rounded-full shadow-lg transition-transform hover:scale-110"
              >
                <MessageSquarePlus className="h-6 w-6 text-white" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="top">
            <p className="text-xs">إرسال طلب للاستقبال</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent dir="rtl" className="border-none shadow-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquarePlus className="text-primary h-5 w-5" />
            طلب سريع للريسبشن
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <Textarea
            placeholder="مثلاً: جهزوا غرفة 3، هاتوا قهوة، دخلوا المريض..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-muted/20 min-h-25 border-none focus-visible:ring-1"
          />
          <Button
            onClick={handleSend}
            disabled={loading}
            className="w-full font-bold"
          >
            {loading ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="ml-2 h-4 w-4" />
            )}
            إرسال حالاً
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
