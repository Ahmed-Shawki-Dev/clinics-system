"use client";

import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { IPublicDoctor } from "@/types/public";
import { Award, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animation";
import { ClinicImage } from "../shared/clinic-image";

export default function AboutDoctorSection({
  doctor,
}: {
  doctor: IPublicDoctor;
}) {
  if (!doctor) return null;

  return (
    <section
      id="about-doctor"
      className="bg-muted/30 relative w-full overflow-hidden py-24 md:py-32"
      dir="rtl"
    >
      <motion.div
        className="relative z-10 container mx-auto grid max-w-6xl items-center gap-12 px-4 md:gap-16 md:px-6 lg:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* نصوص التعريف بالطبيب (بقت order-last في الشاشات الكبيرة عشان تيجي شمال) */}
        <motion.div
          variants={fadeInUp}
          className="order-1 flex flex-col items-center space-y-8 text-center lg:order-last lg:items-start lg:text-right"
        >
          <div className="flex w-full flex-col items-center space-y-4 lg:items-start">
            <Badge
              variant="secondary"
              className="bg-muted text-muted-foreground w-fit px-4 py-1.5 text-sm font-medium"
            >
              عن الطبيب
            </Badge>
            <Typography
              variant="h2"
              className="text-foreground w-full text-3xl font-bold tracking-tight md:text-5xl"
            >
              {doctor.name}
            </Typography>
            <Typography
              variant="p"
              className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed lg:mx-0"
            >
              {doctor.bio || "لم يتم إضافة نبذة تعريفية بعد."}
            </Typography>
          </div>

          <div className="flex w-full flex-col gap-4 pt-4 sm:flex-row">
            <div className="bg-card text-card-foreground flex flex-1 flex-col items-center gap-3 rounded-xl border p-5 shadow-sm lg:flex-row lg:items-start">
              <Award className="text-muted-foreground mt-0.5 h-6 w-6 shrink-0" />
              <div className="mt-1 space-y-1 text-center lg:mt-0 lg:text-start">
                <p className="text-foreground text-base font-semibold">
                  خبرة معتمدة
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  تشخيص دقيق مبني على أحدث المعايير الطبية.
                </p>
              </div>
            </div>

            <div className="bg-card text-card-foreground flex flex-1 flex-col items-center gap-3 rounded-xl border p-5 shadow-sm lg:flex-row lg:items-start">
              <Stethoscope className="text-muted-foreground mt-0.5 h-6 w-6 shrink-0" />
              <div className="mt-1 space-y-1 text-center lg:mt-0 lg:text-start">
                <p className="text-foreground text-base font-semibold">
                  رعاية متكاملة
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  متابعة مستمرة لحالتك الصحية خطوة بخطوة.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* صورة الطبيب (بقت order-first دايماً عشان تيجي يمين في الشاشات الكبيرة وفوق في الموبايل) */}
        <motion.div
          variants={fadeInUp}
          className="relative order-first mt-8 flex justify-center lg:order-first lg:mt-0 lg:justify-center"
        >
          <div className="border-border/50 bg-muted group relative aspect-4/5 w-full max-w-100 overflow-hidden rounded-2xl border shadow-lg">
            <ClinicImage
              src={doctor.photoUrl}
              alt={doctor.name ?? ""}
              fill
              fallbackType="doctor"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
