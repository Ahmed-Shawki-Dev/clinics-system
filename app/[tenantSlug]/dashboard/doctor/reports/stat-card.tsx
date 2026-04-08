import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card className="border-border/50 p-4 shadow-sm">
      <div className="flex items-center justify-between pb-2">
        <p className="text-muted-foreground text-sm font-medium">{title}</p>
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-muted-foreground mt-1 text-xs">{description}</p>
      )}
    </Card>
  );
}
