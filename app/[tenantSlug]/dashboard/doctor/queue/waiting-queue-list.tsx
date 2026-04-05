import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IQueueTicket } from "@/types/queue";
import { Clock, Stethoscope } from "lucide-react";

interface Props {
  waitingTickets: IQueueTicket[];
  waitingCount: number;
}

export function WaitingQueueList({ waitingTickets, waitingCount }: Props) {
  if (waitingTickets.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between px-1">
        <h3 className="text-foreground text-lg font-bold">
          قائمة الانتظار ({waitingCount})
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {waitingTickets.map((ticket, index) => {
          const isNext = index === 0;

          return (
            <Card
              key={ticket.id}
              className={cn(
                "border shadow-sm",
                isNext ? "border-primary/50 bg-primary/5" : "bg-card",
                ticket.isUrgent && "border-destructive/30 bg-destructive/5",
              )}
            >
              <CardContent className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <span className="bg-background text-muted-foreground rounded border px-2 py-0.5 font-mono text-sm font-medium">
                    #{ticket.ticketNumber}
                  </span>
                  <div className="flex gap-1.5">
                    {isNext && (
                      <Badge className="px-2 py-0.5 text-xs font-normal">
                        التالي
                      </Badge>
                    )}
                    {ticket.isUrgent && (
                      <Badge
                        variant="destructive"
                        className="px-2 py-0.5 text-xs font-normal"
                      >
                        طارئ
                      </Badge>
                    )}
                  </div>
                </div>

                <h4 className="text-foreground truncate font-semibold">
                  {ticket.patientName}
                </h4>

                <div className="text-muted-foreground mt-2 flex items-center gap-3 text-xs">
                  {ticket.serviceName && (
                    <span className="flex items-center gap-1 truncate">
                      <Stethoscope className="h-3.5 w-3.5" />
                      {ticket.serviceName}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {/* 🔥 التعديل هنا: استخدمنا issuedAt بدل calledAt لأن المريض لسه في الانتظار */}
                    {new Date(ticket.issuedAt).toLocaleTimeString("ar-EG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
