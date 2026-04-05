import { Badge } from "@/components/ui/badge";
import { ILabRequest } from "@/types/visit";
import { FlaskConical } from "lucide-react";

interface Props {
  requests: ILabRequest[];
}

export function VisitLabRequests({ requests }: Props) {
  if (!requests?.length) return null;

  return (
    <div className="space-y-3 border-t pt-4">
      <h4 className="text-primary flex items-center gap-2 font-semibold">
        <FlaskConical className="h-4 w-4" /> التحاليل والأشعة المطلوبة
      </h4>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {requests.map((lab) => (
          <div
            key={lab.id}
            className="bg-muted/5 flex items-start justify-between rounded-md border p-3"
          >
            <div>
              <span className="text-sm font-bold">{lab.testName}</span>
              <Badge variant="secondary" className="mr-2 text-[10px]">
                {lab.type === "Lab" ? "تحليل" : "أشعة"}
              </Badge>
              {lab.notes && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {lab.notes}
                </p>
              )}
              {lab.resultText && (
                <p className="mt-2 rounded bg-emerald-50 p-1 text-xs font-medium text-emerald-600">
                  النتيجة: {lab.resultText}
                </p>
              )}
            </div>
            {lab.isUrgent && (
              <Badge variant="destructive" className="text-[10px]">
                عاجل
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
