"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
  AttendanceFiltersState,
  WorkerOption,
  WorkforceType,
} from "./attendance-types";

interface AttendanceFilterBarProps {
  filters: AttendanceFiltersState;
  personOptions: WorkerOption[];
  isRefreshing: boolean;
  onChange: (next: AttendanceFiltersState) => void;
  onReset: () => void;
}

export function AttendanceFilterBar({
  filters,
  personOptions,
  isRefreshing,
  onChange,
  onReset,
}: AttendanceFilterBarProps) {
  return (
    <div className="bg-background/90 flex flex-col gap-3 rounded-xl border p-3 backdrop-blur md:flex-row md:items-end">
      <div className="min-w-32 space-y-1">
        <Label htmlFor="filter-from" className="text-xs">
          من
        </Label>
        <Input
          id="filter-from"
          type="date"
          value={filters.from ?? ""}
          onChange={(e) => onChange({ ...filters, from: e.target.value })}
          className="h-9"
        />
      </div>

      <div className="min-w-32 space-y-1">
        <Label htmlFor="filter-to" className="text-xs">
          إلى
        </Label>
        <Input
          id="filter-to"
          type="date"
          value={filters.to ?? ""}
          onChange={(e) => onChange({ ...filters, to: e.target.value })}
          className="h-9"
        />
      </div>

      <div className="min-w-32 space-y-1">
        <Label className="text-xs">النوع</Label>
        <Select
          value={filters.personType ?? "all"}
          onValueChange={(value) =>
            onChange({
              ...filters,
              personType: value as "all" | WorkforceType,
              personId: "all",
            })
          }
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            <SelectItem value="doctor">Doctor</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="min-w-44 flex-1 space-y-1">
        <Label className="text-xs">الشخص</Label>
        <Select
          value={filters.personId ?? "all"}
          onValueChange={(value) => onChange({ ...filters, personId: value })}
          disabled={filters.personType === "all"}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder="اختر شخص" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">الكل</SelectItem>
            {personOptions.map((person) => (
              <SelectItem key={person.id} value={person.id}>
                {person.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="button" variant="outline" className="h-9" onClick={onReset}>
        إعادة
      </Button>

      {isRefreshing && (
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <Loader2 className="h-3 w-3 animate-spin" />
          Loading
        </div>
      )}
    </div>
  );
}
