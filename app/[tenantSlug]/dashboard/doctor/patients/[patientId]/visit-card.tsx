import { Card, CardContent } from "@/components/ui/card";
import { IVisit } from "@/types/visit";
import { VisitHeader } from "./VisitHeader";
import { VisitLabRequests } from "./VisitLabRequests";
import { VisitNotes } from "./VisitNotes";
import { VisitPrescriptions } from "./VisitPrescriptions";
import { VisitVitals } from "./VisitVitals";

interface Props {
  visit: IVisit;
}

export function VisitCard({ visit }: Props) {
  return (
    <Card className="border-border/50 mb-6 overflow-hidden p-0 shadow-sm">
      <VisitHeader startedAt={visit.startedAt} status={visit.status} />

      <CardContent className="space-y-6 p-6">
        <VisitVitals visit={visit} />

        <VisitNotes
          complaint={visit.complaint}
          diagnosis={visit.diagnosis}
          notes={visit.notes}
        />

        <VisitPrescriptions prescriptions={visit.prescriptions} />

        <VisitLabRequests requests={visit.labRequests} />
      </CardContent>
    </Card>
  );
}
