import { FileText } from "lucide-react";

interface Props {
  complaint?: string | null;
  diagnosis?: string | null;
  notes?: string | null;
}

export function VisitNotes({ complaint, diagnosis, notes }: Props) {
  if (!complaint && !diagnosis && !notes) return null;

  return (
    <div className="space-y-6">
      {(complaint || diagnosis) && (
        <div className="bg-muted/10 border-border/50 grid grid-cols-1 gap-6 rounded-lg border p-4 md:grid-cols-2">
          {complaint && (
            <div>
              <h4 className="text-muted-foreground mb-1 text-sm font-semibold">
                الشكوى الأساسية:
              </h4>
              <p className="text-sm leading-relaxed">{complaint}</p>
            </div>
          )}
          {diagnosis && (
            <div>
              <h4 className="text-muted-foreground mb-1 text-sm font-semibold">
                التشخيص:
              </h4>
              <p className="text-sm leading-relaxed font-medium">{diagnosis}</p>
            </div>
          )}
        </div>
      )}

      {notes && (
        <div className="space-y-2">
          <h4 className="text-muted-foreground flex items-center gap-2 font-semibold">
            <FileText className="h-4 w-4" /> الملاحظات الطبية
          </h4>
          <p className="bg-background rounded-md border p-3 text-sm">{notes}</p>
        </div>
      )}
    </div>
  );
}
