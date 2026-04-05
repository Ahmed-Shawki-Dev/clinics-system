"use client";

import { getPatientsAction } from "@/actions/patient/getPatients";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { IPatient } from "@/types/patient";
import { Check, ChevronsUpDown, Loader2, UserPlus } from "lucide-react";
import * as React from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { AddPatientModal } from "../app/[tenantSlug]/dashboard/(clinical)/patients/add-patient-modal";

interface PatientSearchProps {
  tenantSlug: string;
  onSelect: (patient: IPatient) => void;
  selectedPatientId?: string;
}

export function PatientSearch({
  tenantSlug,
  onSelect,
  selectedPatientId,
}: PatientSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedPatient, setSelectedPatient] = React.useState<IPatient | null>(
    null,
  );
  const [debouncedTerm] = useDebounce(searchTerm, 500);

  const { data, isLoading } = useSWR(
    open ? ["searchPatients", tenantSlug, debouncedTerm] : null,
    ([, slug, term]) => getPatientsAction(slug, 1, 15, term as string),
    { keepPreviousData: true },
  );

  const patients = data?.items || [];

  React.useEffect(() => {
    if (!selectedPatientId) {
      setSelectedPatient(null);
      setSearchTerm("");
    }
  }, [selectedPatientId]);

  const handleNewPatientSuccess = (newId: string, newName: string) => {
    const newPatient = {
      id: newId,
      name: newName,
      phone: searchTerm,
    } as IPatient;
    setSelectedPatient(newPatient);
    onSelect(newPatient);
    setIsAddModalOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            type="button"
            role="combobox"
            className="bg-background h-11 w-full min-w-0 justify-between overflow-hidden px-3 text-right font-normal"
          >
            {selectedPatient ? (
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span className="truncate text-sm font-bold">
                  {selectedPatient.name}
                </span>
                <span className="text-muted-foreground shrink-0 text-[10px]">
                  ({selectedPatient.phone})
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground truncate text-sm">
                ابحث عن مريض...
              </span>
            )}
            <ChevronsUpDown className="mr-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="border-border/60 w-[--radix-popover-trigger-width] max-w-87.5 overflow-hidden p-0 shadow-xl md:max-w-none"
          align="start"
        >
          <Command shouldFilter={false} className="w-full">
            <CommandInput
              placeholder="بحث بالاسم أو الموبايل..."
              className="h-11"
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <CommandList
              className="scrollbar-thin scrollbar-thumb-primary/20 max-h-64 overflow-x-hidden overflow-y-auto"
              onWheel={(e) => e.stopPropagation()}
            >
              {isLoading && (
                <div className="text-muted-foreground flex items-center justify-center p-6">
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  <span className="text-xs">جاري البحث...</span>
                </div>
              )}

              {!isLoading && patients.length === 0 && (
                <CommandEmpty className="p-4 text-center">
                  <p className="text-muted-foreground mb-3 text-xs">
                    لم يتم العثور على نتائج
                  </p>
                  <Button
                    size="sm"
                    type="button"
                    variant="secondary"
                    className="h-8 text-xs"
                    onClick={() => {
                      setOpen(false);
                      setIsAddModalOpen(true);
                    }}
                  >
                    <UserPlus className="ml-1 h-3.5 w-3.5" />
                    إضافة مريض جديد
                  </Button>
                </CommandEmpty>
              )}

              <CommandGroup>
                {!isLoading &&
                  patients.map((patient) => (
                    <CommandItem
                      key={patient.id}
                      value={patient.id}
                      onSelect={() => {
                        setSelectedPatient(patient);
                        onSelect(patient);
                        setOpen(false);
                      }}
                      className="flex min-w-0 cursor-pointer items-center justify-between gap-2 py-2.5"
                    >
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="truncate text-right text-sm font-bold">
                          {patient.name}
                        </span>
                        <span
                          className="text-muted-foreground mt-0.5 text-right text-[10px]"
                          dir="ltr"
                        >
                          {patient.phone}
                        </span>
                      </div>
                      <Check
                        className={cn(
                          "text-primary h-4 w-4 shrink-0",
                          selectedPatientId === patient.id
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <AddPatientModal
        tenantSlug={tenantSlug}
        initialPhone={searchTerm.replace(/\D/g, "")}
        onSuccess={handleNewPatientSuccess}
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </>
  );
}
