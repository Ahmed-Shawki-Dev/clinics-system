"use client";

import { Clock, HeartHandshake, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animation";
import { Typography } from "@/components/ui/typography";

// داتا حقيقية ومقنعة لأي عيادة بدون مبالغات
const standards = [
  {
    id: 1,
    title: "معايير أمان صارمة",
    description:
      "نطبق بروتوكولات تعقيم عالمية لضمان بيئة طبية آمنة تماماً لك ولأسرتك.",
    icon: Shield,
  },
  {
    id: 2,
    title: "رعاية إنسانية",
    description:
      "نستمع لمخاوفك بعناية ونضع راحتك النفسية والجسدية على رأس أولوياتنا.",
    icon: HeartHandshake,
  },
  {
    id: 3,
    title: "احترام وقتك",
    description:
      "نظام إدارة حجوزات دقيق يضمن لك الدخول في موعدك دون فترات انتظار مزعجة.",
    icon: Clock,
  },
];

export default function ClinicStandardsSection() {
  return (
    // ادينا السكشن ده خلفية مختلفة سنة صغيرة عشان يفصل عن اللي قبله بس يفضل سيمبل
    <section className="relative overflow-hidden py-24 md:py-32">
      <motion.div
        className="relative z-10 container mx-auto flex flex-col items-center space-y-16 px-4 text-center md:px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* العناوين (نفس الستايل المينيمال) */}
        <div className="flex w-full max-w-3xl flex-col items-center space-y-4">
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              className="text-foreground w-full text-3xl font-bold tracking-tight md:text-5xl"
            >
              لماذا يثق بنا <span className="text-primary">المرضى</span>
              <span className="text-muted-foreground">؟</span>
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant="p"
              className="text-muted-foreground mx-auto max-w-2xl text-lg"
            >
              لا نقدم مجرد علاج، بل نصنع تجربة رعاية طبية متكاملة تضعك في المركز
              الأول وتضمن لك راحة البال.
            </Typography>
          </motion.div>
        </div>

        {/* الكروت (نفس ستايل Vercel / shadcn بالحرف) */}
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {standards.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              whileTap={{ scale: 0.98 }}
              // نفس الكلاسات بالضبط: rounded-xl, border, bg-card, hover:bg-muted/50
              className="bg-card text-card-foreground hover:bg-muted/50 flex flex-col items-center justify-center gap-3 rounded-xl border p-8 shadow-sm transition-colors duration-200"
            >
              <item.icon className="text-muted-foreground h-6 w-6" />
              <div className="mt-2 space-y-2 text-center">
                <h3 className="text-foreground text-lg font-semibold tracking-wide">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
