"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toWhatsAppLink } from "../../lib/utils";
import { IPublicClinic } from "../../types/public";
import { ClinicImage } from "../shared/clinic-image";

interface HeroProps {
  clinic: IPublicClinic;
  tenantSlug: string;
}

export default function Hero({ clinic, tenantSlug }: HeroProps) {
  const heroImage =
    clinic.imgUrl ||
    "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1632&auto=format&fit=crop";

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-16 md:pt-32 md:pb-30">
      <div className="mx-auto grid w-full max-w-350 grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-2 lg:gap-20 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-1 flex flex-col items-start space-y-8 text-start lg:order-1"
        >
          <div className="w-full space-y-6">
            <h1 className="text-5xl leading-[1.1] font-black tracking-tight md:text-6xl lg:text-[5rem] xl:text-[6rem]">
              رعاية متقدمة
              <br />
              <span className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent italic">
                يمكنك{" "}
              </span>
              <span>الوثوق بها.</span>
            </h1>

            <p className="text-muted-foreground max-w-lg text-lg leading-relaxed font-normal md:text-xl">
              {clinic.description ||
                "تشخيص رقمي دقيق، إجراءات طبية متطورة، ونتائج مضمونة في كل مرحلة من مراحل علاجك معنا."}
            </p>
          </div>

          <Button size={"xl"} variant={"default"} asChild>
            <Link
              href={toWhatsAppLink(clinic.supportWhatsAppNumber)}
              target="_blank"
            >
              احجز الآن
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-2" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group relative order-2 mx-auto h-100 w-full max-w-2xl rounded-[2.5rem] shadow-[0_0_120px_40px_rgba(var(--primary)/0.08)] md:h-125 lg:order-2 lg:me-0 lg:h-160 lg:max-w-none"
        >
          {/* تأثير النقط 1: فوق يمين */}
          <div className="absolute -top-6 -right-6 h-32 w-32 bg-[radial-gradient(rgba(14,165,233,0.50)_1.5px,transparent_1.5px)] bg-size-[16px_16px] transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:translate-y-2" />

          {/* تأثير النقط 2: تحت شمال */}
          <div className="absolute -bottom-6 -left-6 h-32 w-32 bg-[radial-gradient(rgba(14,165,233,0.50)_1.5px,transparent_1.5px)] bg-size-[16px_16px] transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:translate-y-2" />

          {/* الصورة الأساسية */}
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-700 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:shadow-2xl">
            <ClinicImage
              src={heroImage}
              alt="رعاية طبية"
              fill
              fallbackType="general"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-110"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
