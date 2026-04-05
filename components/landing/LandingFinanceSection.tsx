"use client";

import { fadeInUp, staggerContainer } from "@/animation";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export function LandingFinanceSection() {
  return (
    <section className="bg-muted/30 overflow-hidden py-24" dir="rtl">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center gap-12 lg:flex-row-reverse lg:gap-20"
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
                إدارة مالية <br className="hidden md:block" />
                <span className="text-muted-foreground">بأعلى دقة</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                وداعاً للحسابات اليدوية المعقدة. احصل على رؤية شاملة لأداء
                عيادتك المالي من خلال تقارير ذكية تحسب الإيرادات والمصروفات
                بصورة لحظية.
              </p>
            </div>

            <div className="grid gap-4 pt-2">
              {[
                "تقارير أرباح يومية وشهرية مفصلة",
                "تتبع مستحقات الشركات والتعاقدات بدقة",
                "إدارة كاملة لمصروفات العيادة والنثريات",
              ].map((point, i) => (
                <div
                  key={i}
                  className="text-foreground/80 flex items-center gap-3 font-semibold"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
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
            {/* جعلنا الديسكتوب ملموم أكتر max-w-xl عشان ميبقاش ضخم مقارنة بالموبايل */}
            <div className="border-border/50 relative aspect-16/10 w-full max-w-xl overflow-hidden rounded-2xl border bg-zinc-200 p-2 shadow-2xl dark:bg-zinc-800">
              <div className="border-border/50 bg-background relative h-full w-full overflow-hidden rounded-xl border">
                <Image
                  src="/landing/dashboard.webp"
                  alt="Medora Finance Dashboard"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -z-10 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
