"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Check, Loader2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import {
  getUnreadDoctorNotes,
  markDoctorNoteAsReadAction,
} from "../actions/notes/notes"; // 👈 الأكشنز بتاعتك
import { IDoctorNote } from "../types/notes";

export function DoctorNotesBell({ tenantSlug }: { tenantSlug: string }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // 1. الـ Key لازم يكون null لو الـ slug مش موجود عشان SWR ميبعتش ريكوست غلط
  // 2. الفيتشر بتنادي الأكشن بتاعك مباشرة
  const { data: notes, mutate } = useSWR<IDoctorNote[]>(
    tenantSlug ? `doctor-notes-unread-${tenantSlug}` : null,
    async () => {
      const res = await getUnreadDoctorNotes(tenantSlug);
      return res.data || [];
    },
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
      dedupingInterval: 10000,
    },
  );

  const handleMarkAsRead = async (e: React.MouseEvent, noteId: string) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingId(noteId);
    const res = await markDoctorNoteAsReadAction(tenantSlug, noteId);
    setLoadingId(null);

    if (res.success) {
      // بنحدث الكاش فوراً عشان الرسالة تختفي من قدام الريسبشن
      mutate(
        notes?.filter((n) => n.id !== noteId),
        false,
      );
    } else {
      toast.error(res.message || "حدث خطأ");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-muted relative">
          <Bell className="text-muted-foreground h-5 w-5" />
          {notes && notes.length > 0 && (
            <span className="bg-destructive animate-in zoom-in absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white">
              {notes.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-2">
        <DropdownMenuLabel className="flex items-center gap-2 font-bold">
          <MessageSquare className="text-primary h-4 w-4" />
          طلبات الأطباء الحالية
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {!notes || notes.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center text-sm">
            لا توجد طلبات جديدة من الأطباء حالياً
          </div>
        ) : (
          <div className="max-h-80 space-y-1 overflow-y-auto">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-muted/30 hover:border-primary/20 flex flex-col gap-2 rounded-md border border-transparent p-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-primary text-xs font-black underline underline-offset-4">
                    د. {note.doctorName}
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    {new Date(note.createdAt ?? "").toLocaleTimeString(
                      "ar-EG",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                </div>

                <p className="text-foreground bg-background/50 rounded border border-dashed p-2 text-sm leading-relaxed font-medium">
                  {note.message}
                </p>

                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 gap-1 text-xs font-bold text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={(e) => handleMarkAsRead(e, note.id ?? "")}
                    disabled={loadingId === note.id}
                  >
                    {loadingId === note.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Check className="h-3 w-3" />
                    )}
                    تم التنفيذ
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
