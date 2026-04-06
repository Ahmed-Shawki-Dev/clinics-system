"use client";

import { getQueueBoard } from "@/actions/queue/queue-board"; // الـ Action بتاعك
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PlusCircle, Stethoscope } from "lucide-react";
import * as React from "react";
import useSWR from "swr"; // <-- الاستيراد الجديد
import { BaseApiResponse } from "../../../../../types/api";
import { IDoctor } from "../../../../../types/doctor";
import { IQueueBoard } from "../../../../../types/queue";
import { DoctorQueueCard } from "./doctor-queue-card";
import { OpenSessionDialog } from "./open-session-dialog";

interface QueueViewProps {
  tenantSlug: string;
  initialBoardRes: BaseApiResponse<IQueueBoard>;
  doctors: IDoctor[];
}

export function QueueView({
  tenantSlug,
  initialBoardRes,
  doctors,
}: QueueViewProps) {
  const { data: boardRes } = useSWR(
    ["queueBoard", tenantSlug],
    ([, slug]) => getQueueBoard(slug),
    {
      fallbackData: initialBoardRes,
      refreshInterval: 10000,
      revalidateOnFocus: true,
      keepPreviousData: true,
      refreshWhenHidden: false,
    },
  );

  const activeSessions = React.useMemo(() => {
    return (boardRes?.data?.sessions || []).filter((s) => s.isActive);
  }, [boardRes?.data?.sessions]);

  const [selectedSessionId, setSelectedSessionId] = React.useState<
    string | null
  >(activeSessions[0]?.sessionId ?? null);

  React.useEffect(() => {
    if (
      activeSessions.length > 0 &&
      !activeSessions.find((s) => s.sessionId === selectedSessionId)
    ) {
      setSelectedSessionId(activeSessions[0]?.sessionId ?? null);
    }
  }, [activeSessions, selectedSessionId]);

  const selectedSession = activeSessions.find(
    (s) => s.sessionId === selectedSessionId,
  );

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col gap-6 md:h-[calc(100vh-250px)]">
      {activeSessions.length > 0 ? (
        <div className="flex flex-1 flex-col gap-4 overflow-hidden md:flex-row md:gap-6">
          {/* Sidebar List */}
          <Card className="bg-muted/20 flex w-full shrink-0 flex-col overflow-hidden border p-0 md:w-72">
            <div className="bg-background/50 flex items-center justify-between border-b p-3">
              <h3 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                قائمة العيادات
              </h3>
              <OpenSessionDialog
                tenantSlug={tenantSlug}
                doctors={doctors}
                activeSessions={activeSessions}
              />
            </div>

            <div className="flex-1 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto">
              <div className="flex min-w-max gap-2 p-2 md:min-w-0 md:flex-col">
                {activeSessions.map((session) => {
                  const isSelected = session.sessionId === selectedSessionId;
                  return (
                    <button
                      key={session.sessionId}
                      onClick={() => setSelectedSessionId(session.sessionId??'')}
                      className={cn(
                        "flex items-center justify-between rounded-md border p-3 text-right text-sm transition-colors",
                        "min-w-50 md:min-w-0",
                        isSelected
                          ? "bg-background border-primary text-primary font-medium shadow-sm"
                          : "hover:bg-background/50 text-muted-foreground hover:text-foreground border-transparent bg-transparent",
                      )}
                    >
                      <div className="flex max-w-30 items-center gap-2 truncate md:max-w-full">
                        <div
                          className={cn(
                            "h-2 w-2 shrink-0 rounded-full transition-colors duration-500",
                            session.currentTicket
                              ? "animate-pulse bg-orange-500"
                              : "bg-green-500",
                          )}
                        />
                        <span className="truncate">
                          د. {session.doctorName}
                        </span>
                      </div>
                      <Badge
                        variant={isSelected ? "outline" : "secondary"}
                        className="mr-2 h-5 px-1.5 text-xs font-normal"
                      >
                        {session.waitingCount} انتظار
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Main Detail View */}
          <div className="bg-background h-full flex-1 overflow-hidden rounded-lg border shadow-sm">
            {selectedSession ? (
              <div className="h-full overflow-y-auto">
                <DoctorQueueCard
                  key={selectedSession.sessionId}
                  tenantSlug={tenantSlug}
                  session={selectedSession}
                />
              </div>
            ) : (
              <div className="text-muted-foreground flex h-full flex-col items-center justify-center">
                <p>اختر عيادة لعرض التفاصيل</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="animate-in fade-in-50 flex min-h-112.5 w-full flex-col items-center justify-center p-8 text-center duration-500">
          <div className="bg-primary/10 relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2">
            <Stethoscope className="text-primary h-10 w-10" />
            <div className="bg-background absolute -right-1 -bottom-1 rounded-full">
              <PlusCircle className="text-primary fill-background h-6 w-6" />
            </div>
          </div>

          <h3 className="text-foreground mb-3 text-2xl font-bold tracking-tight">
            لا توجد عيادات مفتوحة حالياً
          </h3>

          <p className="text-muted-foreground mx-auto mb-8 max-w-105 text-base leading-relaxed">
            ابدأ بفتح العيادة للطبيب لتتمكن من تسجيل الحجوزات، قطع التذاكر،
            وتنظيم أدوار المرضى.
          </p>

          <div className="shrink-0">
            <OpenSessionDialog
              tenantSlug={tenantSlug}
              doctors={doctors}
              activeSessions={activeSessions}
            />
          </div>
        </div>
      )}
    </div>
  );
}
