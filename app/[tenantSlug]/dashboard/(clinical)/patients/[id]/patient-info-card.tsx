"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { IPatient } from "@/types/patient";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, MapPin, Phone, User as UserIcon } from "lucide-react";
import { calculateAge } from "../../../../../../lib/patient-utils";

export function PatientInfoCard({ patient }: { patient: IPatient }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <h2 className="text-foreground text-xl leading-none font-bold tracking-tight">
          {patient.name}
        </h2>
      </CardHeader>
      {/* 2. Data Rows: (Clean Text-First UI) */}
      <div className="flex flex-col p-0">
        {/* الصف الأول: العمر والنوع */}
        <div className="border-border/30 hover:bg-muted/5 flex items-center justify-between border-b p-4 transition-colors">
          <div className="text-muted-foreground flex items-center gap-2">
            <UserIcon className="size-4" />
            <span className="text-xs font-medium">العمر والنوع</span>
          </div>
          <span className="text-foreground text-sm font-semibold">
            {calculateAge(patient.dateOfBirth)} سنة •{" "}
            {patient.gender === "Male" ? "ذكر" : "أنثى"}
          </span>
        </div>

        {/* الصف الثاني: التليفون */}
        <div className="border-border/30 hover:bg-muted/5 flex items-center justify-between border-b p-4 transition-colors">
          <div className="text-muted-foreground flex items-center gap-2">
            <Phone className="size-4" />
            <span className="text-xs font-medium">رقم الهاتف</span>
          </div>
          <span
            className="text-foreground font-mono text-sm font-bold tracking-wide"
            dir="ltr"
          >
            {patient.phone}
          </span>
        </div>

        {/* الصف الثالث: تاريخ الانضمام */}
        <div className="border-border/30 hover:bg-muted/5 flex items-center justify-between border-b p-4 transition-colors">
          <div className="text-muted-foreground flex items-center gap-2">
            <Calendar className="size-4" />
            <span className="text-xs font-medium">تاريخ الانضمام</span>
          </div>
          <span className="text-foreground text-sm font-semibold">
            {format(new Date(patient.createdAt??''), "dd MMM yyyy", { locale: ar })}
          </span>
        </div>

        {/* الصف الرابع: العنوان (بيأخد السطر كله لو طويل) */}
        {patient.address && (
          <div className="hover:bg-muted/5 flex flex-col gap-2 p-4 transition-colors">
            <div className="text-muted-foreground flex items-center gap-2">
              <MapPin className="size-4" />
              <span className="text-xs font-medium">العنوان بالتفصيل</span>
            </div>
            <span className="text-foreground text-sm leading-relaxed font-medium">
              {patient.address}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
