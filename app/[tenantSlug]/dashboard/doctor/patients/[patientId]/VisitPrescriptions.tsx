import { IPrescription } from "@/types/visit";
import { Pill } from "lucide-react";

interface Props {
  prescriptions: IPrescription[];
}

export function VisitPrescriptions({ prescriptions }: Props) {
  if (!prescriptions?.length) return null;

  return (
    <div className="space-y-3 border-t pt-4">
      <h4 className="text-primary flex items-center gap-2 font-semibold">
        <Pill className="h-4 w-4" /> الأدوية الموصوفة (الروشتة)
      </h4>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {prescriptions.map((med) => (
          <div
            key={med.id}
            className="bg-muted/5 flex flex-col rounded-md border p-3"
          >
            <span className="text-sm font-bold">{med.medicationName}</span>
            <span className="text-muted-foreground mt-1 text-xs">
              {med.dosage} - {med.frequency} ({med.duration})
            </span>
            {med.instructions && (
              <span className="text-muted-foreground mt-1 border-t pt-1 text-xs">
                {med.instructions}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
