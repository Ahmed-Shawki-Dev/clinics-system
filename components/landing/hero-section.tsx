"use client";

import { fadeInUp, staggerContainer } from "@/animation";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  ChevronDown,
  ShieldCheck,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { StarfieldBackground } from "../ui/starfield";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const springConfig = { damping: 50, stiffness: 250 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const floatX1 = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const floatY1 = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);
  const floatX2 = useTransform(smoothX, [-0.5, 0.5], [45, -45]);
  const floatY2 = useTransform(smoothY, [-0.5, 0.5], [45, -45]);
  const floatX3 = useTransform(smoothX, [-0.5, 0.5], [25, -25]);
  const floatY3 = useTransform(smoothY, [-0.5, 0.5], [-45, 45]);
  const floatX4 = useTransform(smoothX, [-0.5, 0.5], [-45, 45]);
  const floatY4 = useTransform(smoothY, [-0.5, 0.5], [25, -25]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  return (
    <section
      className="bg-background relative flex min-h-[95vh] w-full items-center justify-center overflow-hidden pt-20 pb-16"
      dir="rtl"
      onMouseMove={handleMouseMove}
    >
      <StarfieldBackground className="absolute inset-0 z-0 hidden md:block" />

      {/* Background Blobs */}
      <div className="bg-primary/20 pointer-events-none absolute top-[-10%] right-[-10%] z-0 h-75 w-75 transform-gpu rounded-full opacity-50 blur-[80px] md:h-125 md:w-125 md:opacity-100 md:blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] z-0 h-75 w-75 transform-gpu rounded-full bg-emerald-500/10 opacity-50 blur-[80px] md:h-100 md:w-100 md:opacity-100 md:blur-[120px]" />

      {/* Noise */}
      <div className='pointer-events-none absolute inset-0 z-0 bg-[url("https://grainy-gradients.vercel.app/noise.svg")] opacity-[0.03] md:opacity-5 md:mix-blend-overlay'></div>

      {/* 🔴 التعديل السحري: الـ Fade اللي بيخلي الهيرو يسيح مع السكشن اللي تحته */}
      <div className="from-background via-background/80 pointer-events-none absolute bottom-0 left-0 z-10 h-32 w-full bg-linear-to-t to-transparent md:h-64" />

      <div className="relative z-20 container mx-auto px-4">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-10 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-4 md:space-y-2">
            <motion.div variants={fadeInUp} className="w-full">
              <h1 className="text-foreground font-sans text-6xl leading-[1.1] font-black tracking-tight md:text-8xl lg:text-[7rem]">
                MEDORA CLINIC
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-muted-foreground mx-auto max-w-3xl px-2 text-lg leading-relaxed font-medium md:text-2xl">
                إنسى الورق ولخبطة الحسابات. سيستم واحد بيدير عيادتك من أول حجز
                الميعاد لحد التقارير المالية، عشان تتفرغ إنت لمرضاك
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={fadeInUp}
            className="flex w-full flex-row items-center justify-center gap-4 pt-4 sm:gap-5"
          >
            <Link
              href="https://wa.me/201070272135"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="h-12 w-auto rounded-full px-5 text-sm font-bold shadow-lg transition-transform hover:-translate-y-1 sm:px-8 sm:text-base"
              >
                احجز نسختك
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link
              href="https://www.facebook.com/share/1BNbjo8Byz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="bg-background/50 border-border hover:bg-muted h-12 w-auto rounded-full px-5 text-sm font-bold backdrop-blur-sm transition-colors sm:px-8 sm:text-base"
              >
                مشاهدة السيستم
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-3 pt-8"
          >
            <div className="text-muted-foreground flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
              <span>موثوق من الأطباء</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating SaaS Cards */}
        {!isMobile && (
          <>
            <motion.div
              className="bg-card/40 border-primary/20 absolute top-[15%] right-[2%] flex items-center gap-4 rounded-2xl border p-4 shadow-xl backdrop-blur-xl lg:right-[5%]"
              style={{ x: floatX1, y: floatY1 }}
            >
              <div className="bg-primary/10 rounded-lg p-2">
                <Calendar className="text-primary h-6 w-6" />
              </div>
              <div className="hidden text-right xl:block">
                <p className="text-foreground text-sm font-bold">
                  إدارة المواعيد
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-card/40 absolute bottom-[20%] left-[2%] flex items-center gap-4 rounded-2xl border border-emerald-500/20 p-4 shadow-xl backdrop-blur-xl lg:left-[5%]"
              style={{ x: floatX2, y: floatY2 }}
            >
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <BarChart3 className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="hidden text-right xl:block">
                <p className="text-foreground text-sm font-bold">
                  تقارير مالية
                </p>
              </div>
            </motion.div>

            <motion.div
              className="bg-card/40 absolute top-[25%] left-[5%] flex items-center gap-4 rounded-2xl border border-blue-500/20 p-4 shadow-xl backdrop-blur-xl lg:left-[8%]"
              style={{ x: floatX3, y: floatY3 }}
            >
              <div className="rounded-lg bg-blue-500/10 p-2">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <div className="hidden text-right xl:block">
                <p className="text-foreground text-sm font-bold">سجلات طبية</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-card/40 absolute right-[8%] bottom-[30%] flex items-center gap-4 rounded-2xl border border-amber-500/20 p-4 shadow-xl backdrop-blur-xl lg:right-[10%]"
              style={{ x: floatX4, y: floatY4 }}
            >
              <div className="rounded-lg bg-amber-500/10 p-2">
                <ShieldCheck className="h-6 w-6 text-amber-500" />
              </div>
              <div className="hidden text-right xl:block">
                <p className="text-foreground text-sm font-bold">أمان عالي</p>
              </div>
            </motion.div>
          </>
        )}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center opacity-30 md:flex"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
