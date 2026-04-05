"use client";

import { fadeInUp, staggerContainer } from "@/animation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import { motion } from "framer-motion";
import {
  BarChart,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  User,
} from "lucide-react";

// 🔴 كلام احترافي، مباشر، بيشرح الخاصية وفايدتها بدون تصنع
const features = [
  {
    icon: Calendar,
    title: "جدولة ذكية للمواعيد",
    description:
      "نظام حجز متكامل يرسل تذكيرات تلقائية للمرضى عبر واتساب لتقليل نسب التخلف عن الحضور.",
  },
  {
    icon: User,
    title: "سجل طبي رقمي",
    description:
      "ملف موحد لكل مريض يعرض التاريخ المرضي، الأشعة، والتحاليل بضغطة زر وبدون أرشفة ورقية.",
  },
  {
    icon: FileText,
    title: "روشتات إلكترونية",
    description:
      "إصدار روشتات دقيقة وإرسالها للمريض مباشرة، مع دعم كامل لقاعدة بيانات الأدوية والجرعات.",
  },
  {
    icon: DollarSign,
    title: "الإدارة المالية",
    description:
      "متابعة دقيقة للإيرادات والمصروفات اليومية مع تقارير محاسبية تفصيلية لحساب صافي الأرباح.",
  },
  {
    icon: Clock,
    title: "شاشة الانتظار",
    description:
      "نظام آلي لتنظيم أدوار المرضى وعرضها على الشاشات لمنع التكدس وتحسين تجربة المريض.",
  },
  {
    icon: BarChart,
    title: "لوحة التحليلات",
    description:
      "مؤشرات أداء تفاعلية تمنحك رؤية شاملة لمعدلات النمو وأكثر الخدمات طلباً في عيادتك.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-background relative overflow-hidden py-24"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mx-auto mb-16 max-w-3xl space-y-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              className="text-foreground text-3xl leading-[1.1] font-bold tracking-tight md:text-5xl"
            >
              حلول متكاملة لإدارة عيادتك
            </Typography>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Typography className="text-muted-foreground text-lg font-medium">
              أدوات مصممة خصيصاً لتنظيم سير العمل، توفير الوقت، ومضاعفة
              الإنتاجية.
            </Typography>
          </motion.div>
        </motion.div>

        {/* 📱 نسخة الموبايل: Carousel */}
        <div className="block md:hidden">
          <Carousel
            opts={{ align: "start", direction: "rtl" }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <CarouselItem key={index} className="basis-[85%] pl-4">
                    {/* 🔴 كارت الموبايل الأغمق */}
                    <Card className="border-border/60 bg-muted/40 h-full rounded-2xl shadow-none">
                      <CardHeader className="p-6 pb-4">
                        <div className="bg-background border-border/50 mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg border shadow-sm">
                          <Icon className="text-foreground h-6 w-6" />
                        </div>
                        <CardTitle className="text-foreground text-xl font-bold tracking-tight">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-6 pb-6">
                        <Typography className="text-muted-foreground text-sm leading-relaxed font-medium">
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          <p className="text-muted-foreground mt-6 text-center text-xs font-medium opacity-70">
            اسحب لاستكشاف المميزات ←
          </p>
        </div>

        {/* 💻 نسخة الكمبيوتر: Grid */}
        <div className="mx-auto hidden max-w-6xl gap-6 sm:grid-cols-2 md:grid lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {/* 🔴 الكارت الجديد: أغمق (bg-muted/30)، زوايا 2xl، وهوفر بيغمقه أكتر */}
                <Card className="group border-border/60 bg-muted/30 hover:bg-muted/60 flex h-full flex-col rounded-2xl border p-7 shadow-none transition-colors duration-300">
                  {/* حاوية الأيقونة: بقت بارزة (bg-background) عشان تظهر على الكارت الغامق */}
                  <div className="bg-background border-border/50 group-hover:border-primary/30 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg border shadow-sm transition-colors">
                    <Icon className="text-foreground group-hover:text-primary h-5 w-5 transition-colors" />
                  </div>

                  <div className="space-y-2.5">
                    <h3 className="text-foreground text-lg font-bold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
