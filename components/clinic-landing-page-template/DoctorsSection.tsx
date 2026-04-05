"use client";

import { fadeInUp, staggerContainer } from "@/animation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Typography } from "@/components/ui/typography";
import { motion } from "framer-motion";
import { IPublicDoctor } from "../../types/public";
import { ClinicImage } from "../shared/clinic-image"; // 👈 استيراد المكون الموحد

export default function DoctorsSection({
  doctors,
}: {
  doctors: IPublicDoctor[];
}) {
  if (!doctors || doctors.length <= 1) return null;

  return (
    <section
      id="doctors"
      className="bg-muted/30 relative overflow-hidden py-24 md:py-32"
      dir="rtl"
    >
      {/* إضاءة خلفية ناعمة */}

      <motion.div
        className="container mx-auto px-4 md:px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* --- Header --- */}
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center md:mb-16">
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              className="text-foreground text-3xl font-black tracking-tight md:text-5xl"
            >
              أطباء{" "}
              <span className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent">
                العيادة
              </span>
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant="lead"
              className="text-muted-foreground max-w-2xl"
            >
              فريق طبي متميز بتخصصات دقيقة لضمان أفضل تشخيص وعلاج. نجمع بين
              الخبرة العالية والرعاية الإنسانية.
            </Typography>
          </motion.div>
        </div>

        {/* --- Carousel --- */}
        <motion.div
          variants={fadeInUp}
          className="relative mx-auto w-full max-w-7xl"
        >
          <Carousel
            opts={{
              align: "center",
              loop: true,
              direction: "rtl",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {doctors.map((doctor) => (
                <CarouselItem
                  key={doctor.id}
                  className="basis-[85%] pl-2 sm:basis-1/2 md:pl-4 lg:basis-1/3"
                >
                  <Card className="group border-border/50 bg-card/60 hover:bg-card hover:shadow-primary/10 flex h-full cursor-grab flex-col overflow-hidden rounded-4xl border p-0 shadow-sm backdrop-blur-sm transition-all duration-500 hover:shadow-2xl active:cursor-grabbing">
                    {/* Image Container */}
                    <div className="bg-muted/50 relative aspect-square w-full overflow-hidden md:aspect-4/3">
                      {/* 👈 استخدام المكون الموحد: بيتعامل مع المسار الـ relative والـ absolute لوحده */}
                      <ClinicImage
                        src={doctor.photoUrl}
                        alt={doctor.name}
                        fill
                        fallbackType="doctor"
                        className="object-cover object-top transition-transform duration-700 select-none group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                      {/* Floating Specialty Badge */}
                      <div className="absolute right-4 bottom-4 z-10">
                        <Badge className="bg-primary text-primary-foreground border-none px-3 py-1 text-sm font-bold shadow-lg backdrop-blur-md">
                          {doctor.specialty || "طبيب متخصص"}
                        </Badge>
                      </div>
                    </div>

                    {/* Card Body */}
                    <CardContent className="flex flex-1 flex-col p-6 text-right">
                      <Typography
                        variant="h4"
                        className="text-foreground group-hover:text-primary mb-3 text-xl font-black transition-colors"
                      >
                        {doctor.name}
                      </Typography>

                      <Typography
                        variant="muted"
                        className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed"
                      >
                        {doctor.bio || "لا توجد نبذة مختصرة."}
                      </Typography>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-10 hidden items-center justify-center gap-4 md:flex">
              <CarouselNext className="border-border/50 bg-card hover:bg-primary hover:text-primary-foreground static h-12 w-12 translate-x-0 translate-y-0 transition-colors" />
              <CarouselPrevious className="border-border/50 bg-card hover:bg-primary hover:text-primary-foreground static h-12 w-12 translate-x-0 translate-y-0 transition-colors" />
            </div>
          </Carousel>
        </motion.div>
      </motion.div>
    </section>
  );
}
