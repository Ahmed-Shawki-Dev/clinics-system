import { CheckCircle2 } from "lucide-react";

export function PrescriptionSection() {
  return (
    <section className="bg-muted/5 py-20" dir="rtl">
      <div className="container mx-auto flex flex-col items-center gap-16 px-6 lg:flex-row">
        <div className="flex-1 space-y-6 border">
          <h2 className="text-3xl font-black tracking-tighter md:text-5xl">
            روشتة <span className="text-primary">تليق باسمك</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            وداعاً للخط غير المفهوم. أصدر روشتة مطبوعة أو رقمية ببيانات المريض
            وتاريخه الطبي في ثوانٍ.
          </p>
          <ul className="grid gap-3">
            {[
              "دعم كامل لأسماء الأدوية",
              "لوجو العيادة وبيانات التواصل",
              "أرشفة فورية لكل روشتة",
            ].map((item, i) => (
              <li
                key={i}
                className="text-foreground/80 flex items-center gap-2 font-medium"
              >
                <CheckCircle2 className="text-primary h-4 w-4" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-1 justify-center">
          <div className="border-primary relative h-112.5 w-64 rounded-sm border-t-20 bg-white p-6 shadow-2xl">
            <div className="bg-primary/10 mb-4 h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <div className="bg-muted h-2 w-3/4 rounded" />
              <div className="bg-muted h-2 w-1/2 rounded" />
            </div>
            <div className="mt-10 space-y-4">
              <div className="bg-muted/30 h-4 w-full rounded" />
              <div className="bg-muted/30 h-4 w-full rounded" />
              <div className="bg-muted/30 h-4 w-3/4 rounded" />
            </div>
            <p className="absolute right-6 bottom-6 text-[10px] font-bold opacity-20">
              MEDORA SYSTEM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
