import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2, Clock } from "lucide-react";

interface Props {
  startedAt: string;
  status: "Open" | "Completed";
}

export function VisitHeader({ startedAt, status }: Props) {
  const date = new Date(startedAt);
  const formattedDate = date.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // شيلت الثواني وظبطت الفورمات عشان يطلع شكله نضيف
  const formattedTime = date.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isCompleted = status === "Completed";

  return (
    // ضفنا space-y-0 عشان نلغي المسافات الافتراضية بتاعت شادسيان
    <CardHeader className="bg-muted/10 flex flex-row items-start justify-between space-y-0 border-b p-4 sm:items-center">
      <div className="flex items-center gap-3">
        {/* لمسة UI سينيور: أيقونة جوه بوكس خفيف */}
        <div className="bg-primary/10 text-primary shrink-0 rounded-lg p-2">
          <Calendar className="h-5 w-5" />
        </div>

        {/* فصلنا التاريخ عن الوقت في فليكس عشان الموبايل والـ RTL */}
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <CardTitle className="text-base leading-none font-bold sm:text-lg">
            {formattedDate}
          </CardTitle>

          <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <span className="hidden sm:inline-block">-</span>
            <span dir="ltr">{formattedTime}</span>
          </span>
        </div>
      </div>

      <Badge
        variant={isCompleted ? "default" : "secondary"}
        className="h-7 shrink-0 gap-1"
      >
        {isCompleted ? (
          <CheckCircle2 className="h-3.5 w-3.5" />
        ) : (
          <Clock className="h-3.5 w-3.5" />
        )}
        {isCompleted ? "مكتملة" : "مفتوحة"}
      </Badge>
    </CardHeader>
  );
}
