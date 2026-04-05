"use client";

import { fadeInUp, staggerContainer } from "@/animation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react"; // استبدلنا PhoneCall بـ MessageCircle
import Link from "next/link";

export function CTASection() {
  return (
    <section
      className="bg-muted/50 border-border/40 relative overflow-hidden border-t py-24 md:py-32"
      dir="rtl"
    >
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <motion.div
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* عنوان قوي ومباشر */}
          <motion.h2
            variants={fadeInUp}
            className="mb-6 text-4xl leading-[1.15] font-bold tracking-tight md:text-6xl"
          >
            جاهز تنقل إدارة عيادتك <br />
            <span className="text-muted-foreground">
              لمستوى تاني من الاحترافية؟
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground mb-10 max-w-2xl text-lg leading-relaxed font-medium md:text-xl"
          >
            انضم للأطباء اللي اختاروا{" "}
            <span className="text-foreground font-bold">ميدورا</span> عشان
            يريحوا دماغهم من هم الإدارة ويركزوا بس في مرضاهم.
          </motion.p>

          {/* زرار الواتساب */}
          <motion.div
            variants={fadeInUp}
            className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <Button size="lg" asChild>
              {/* تعديل اللينك للواتساب مباشرة */}
              <Link
                href="https://wa.me/201070272135"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="ml-2 h-5 w-5" />
                تواصل معنا عبر واتساب
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={fadeInUp}
            className="text-muted-foreground mt-16 flex flex-wrap items-center justify-center gap-6 text-sm font-semibold md:gap-10 md:text-base"
          >
            {["إعداد السيستم في أقل من 24 ساعة", "دعم فني معاك خطوة بخطوة"].map(
              (text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary/70 h-5 w-5" />
                  {text}
                </div>
              ),
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
