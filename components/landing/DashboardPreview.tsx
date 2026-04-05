"use client";

import { fadeInUp, staggerContainer } from "@/animation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

// السكشن الأول: شاشة الطبيب (موبايل/تابلت)
export function DashboardPreview() {
  return (
    <section className="bg-background overflow-hidden py-24" dir="rtl">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* الجانب النصي */}
          <motion.div
            variants={fadeInUp}
            className="w-full max-w-2xl flex-1 space-y-6 text-right"
          >
            <div className="space-y-4">
              <h2 className="text-foreground text-3xl leading-[1.15] font-bold tracking-tight md:text-5xl">
                نظّم كشوفاتك <br className="hidden md:block" />
                <span className="text-muted-foreground">بمنتهى البساطة</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                واجهة ذكية بتعرض لك الحالة الحالية، وقائمة الانتظار، مع إمكانية
                نقل الدور بضغطة زر. ركز في تشخيصك وسيب تنظيم الحالات علينا.
              </p>
            </div>

            <div className="grid gap-4 pt-2">
              {[
                "متابعة حية لترتيب الكشوفات بالخارج",
                "كتابة الروشتة وحفظها في ثوانٍ",
                "ربط فوري بين الدكتور وسكرتارية العيادة",
              ].map((point, i) => (
                <div
                  key={i}
                  className="text-foreground/80 flex items-center gap-3 font-semibold"
                >
                  <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                  <span className="text-base md:text-lg">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* الجانب البصري - Sizing Fixed */}
          <motion.div
            variants={fadeInUp}
            className="relative flex w-full flex-1 justify-center"
          >
            <div className="bg-background relative aspect-9/19 w-full max-w-70 overflow-hidden rounded-[2.5rem] border-8 border-zinc-200 shadow-2xl md:max-w-[320px] dark:border-zinc-800">
              <Image
                src="/landing/doctor.webp"
                alt="Medora Doctor Dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="bg-primary/10 absolute top-1/2 left-1/2 -z-10 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
