"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IDoctor } from "@/types/doctor";

interface Props {
  doctors: IDoctor[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function DoctorSelect({ doctors, selectedId, onSelect }: Props) {
  const activeDoctors = doctors?.filter((doctor) => doctor.isEnabled) || [];

  return (
    <div className="bg-muted/30 flex items-center gap-4 rounded-lg border p-4">
      <Label>اختر الطبيب لتعديل خدماته:</Label>

      <Select value={selectedId || undefined} onValueChange={onSelect}>
        <SelectTrigger className="bg-background w-75">
          <SelectValue placeholder="اختر طبيب..." />
        </SelectTrigger>
        <SelectContent>
          {activeDoctors.length > 0 ? (
            activeDoctors.map((doc) => (
              <SelectItem key={doc.id} value={doc.id}>
                {doc.name}
              </SelectItem>
            ))
          ) : (
            <div className="text-muted-foreground p-2 text-center text-sm">
              لا يوجد أطباء متاحين
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
