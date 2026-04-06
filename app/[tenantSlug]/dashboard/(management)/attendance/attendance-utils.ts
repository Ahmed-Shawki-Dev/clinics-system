export function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function toIsoFromDateInput(date: string, endOfDay = false) {
  if (!date) return undefined;
  return new Date(
    `${date}T${endOfDay ? "23:59:59" : "00:00:00"}`,
  ).toISOString();
}

export function formatDateTime(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString("ar-EG", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
