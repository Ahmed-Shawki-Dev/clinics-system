"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

interface FinalCtaSectionProps {
  tenantSlug: string;
}

export default function FinalCtaSection({ tenantSlug }: FinalCtaSectionProps) {
  return (
    <section className="bg-background py-20" dir="rtl">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-primary-foreground shadow-primary/20 relative overflow-hidden rounded-[2.5rem] p-10 text-center shadow-2xl md:p-16"
        >
          <div className="bg-background pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-3xl" />
          <div className="bg-foreground pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full opacity-10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center space-y-6">
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              صحتك تستحق <span className="font-bold">الأفضل.</span>
            </h2>
            <p className="text-primary-foreground/90 mx-auto max-w-2xl text-lg md:text-xl">
              لا تؤجل العناية بصحتك. احجز استشارتك الآن وانضم لآلاف المرضى الذين
              يثقون برعايتنا.
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-muted h-14 gap-2 rounded-full px-10 text-lg font-bold transition-colors"
                asChild
              >
                <Link href={`/${tenantSlug}#booking`}>
                  احجز موعدك الآن <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
