"use client";

import { fadeInUp, staggerContainer } from "@/animation";
import { Typography } from "@/components/ui/typography";
import {
  formatEgyptPhoneForDisplay,
  normalizeSocialUrl,
  toTelLink,
  toWhatsAppLink,
} from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  MapPin,
  Music2,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { IPublicClinic } from "../../types/public";

export default function AboutClinicSection({
  clinic,
}: {
  clinic: IPublicClinic;
}) {
  if (!clinic) return null;
  const displayAddress = [clinic.city, clinic.address]
    .filter(Boolean)
    .join("، ");
  const displayPhone = clinic.phone || clinic.supportWhatsAppNumber;
  const formattedDisplayPhone = formatEgyptPhoneForDisplay(displayPhone);
  const formattedWhatsAppPhone = formatEgyptPhoneForDisplay(
    clinic.supportWhatsAppNumber,
  );
  const socialLinks = clinic.socialLinks || {};

  const mapUrl = socialLinks.address;

  const socialItems = [
    {
      key: "instagram",
      href: normalizeSocialUrl(socialLinks.instagram),
      label: "Instagram",
      Icon: Instagram,
    },
    {
      key: "facebook",
      href: normalizeSocialUrl(socialLinks.facebook),
      label: "Facebook",
      Icon: Facebook,
    },
    {
      key: "x",
      href: normalizeSocialUrl(socialLinks.x),
      label: "X",
      Icon: Twitter,
    },
    {
      key: "youtube",
      href: normalizeSocialUrl(socialLinks.youtube),
      label: "YouTube",
      Icon: Youtube,
    },
    {
      key: "tiktok",
      href: normalizeSocialUrl(socialLinks.tiktok),
      label: "TikTok",
      Icon: Music2,
    },
  ].filter((item) => item.href);

  const description =
    clinic.description ||
    "نلتزم بتقديم رعاية طبية استثنائية تعتمد على أحدث التقنيات وأفضل الكفاءات. نضع صحتك وصحة أسرتك في قمة أولوياتنا لضمان تجربة علاجية آمنة ومريحة.";

  return (
    <section
      id="about"
      className="bg-muted/30 relative overflow-hidden py-20 md:py-32"
    >
      <motion.div
        className="relative z-10 container mx-auto flex flex-col items-center px-4 text-center md:px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* منطقة الهيدر */}
        <div className="mb-16 max-w-4xl space-y-6 md:mb-24">
          <motion.div variants={fadeInUp}>
            <Typography
              variant="h2"
              className="text-foreground text-4xl font-black tracking-tight md:text-6xl"
            >
              تواصل مع
              <span className="from-primary to-primary/60 bg-linear-to-r bg-clip-text text-transparent">
                {" "}
                {clinic.clinicName}
              </span>
            </Typography>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Typography
              variant="p"
              className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl"
            >
              {description}
            </Typography>
          </motion.div>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {displayPhone && (
            <motion.a
              href={toTelLink(displayPhone)}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center p-2 transition-all"
            >
              <div className="bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary mb-6 rounded-full p-5 shadow-sm transition-colors duration-300">
                <Phone className="h-7 w-7" />
              </div>
              <p className="text-muted-foreground mb-2 text-sm font-medium tracking-widest uppercase">
                اتصل بنا
              </p>
              <p
                className="text-foreground text-2xl font-bold tracking-wider"
                dir="ltr"
              >
                {formattedDisplayPhone}
              </p>
            </motion.a>
          )}

          {clinic.supportWhatsAppNumber && (
            <motion.a
              href={toWhatsAppLink(clinic.supportWhatsAppNumber)}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center p-2 transition-all"
            >
              <div className="bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary mb-6 rounded-full p-5 shadow-sm transition-colors duration-300">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-7 w-7 fill-current"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-2 text-sm font-medium tracking-widest uppercase">
                واتساب الدعم
              </p>
              <p
                className="text-foreground text-2xl font-bold tracking-wider"
                dir="ltr"
              >
                {formattedWhatsAppPhone}
              </p>
            </motion.a>
          )}

          {displayAddress && (
            <motion.a
              href={``}
              rel="noopener noreferrer"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="group flex flex-col items-center p-2 transition-all"
            >
              <div className="bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary mb-6 rounded-full p-5 shadow-sm transition-colors duration-300">
                <MapPin className="h-7 w-7" />
              </div>
              <p className="text-muted-foreground mb-2 text-sm font-medium tracking-widest uppercase">
                موقع العيادة
              </p>
              <p className="text-foreground max-w-62.5 text-lg leading-relaxed font-bold">
                {displayAddress}
              </p>
            </motion.a>
          )}
        </div>

        {mapUrl && (
          <motion.div
            variants={fadeInUp}
            className="border-border/50 bg-muted relative mt-20 h-100 w-full max-w-5xl overflow-hidden rounded-2xl border shadow-lg md:h-125"
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="absolute inset-0 z-10"
            ></iframe>
            {/* Fallback Loader */}
            <div className="text-muted-foreground absolute inset-0 z-0 flex flex-col items-center justify-center">
              <MapPin className="mb-4 h-10 w-10 animate-pulse opacity-50" />
              <p className="text-sm font-medium">جاري تحميل الخريطة...</p>
            </div>
          </motion.div>
        )}

        {/* السوشيال ميديا */}
        {socialItems.length > 0 && (
          <motion.div variants={fadeInUp} className="mt-24 w-full max-w-4xl">
            <div className="mb-10 flex items-center justify-center gap-4">
              <div className="bg-border h-px max-w-25 flex-1" />
              <p className="text-muted-foreground text-sm font-bold tracking-widest uppercase">
                تابعنا على
              </p>
              <div className="bg-border h-px max-w-25 flex-1" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {socialItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-muted-foreground hover:text-foreground flex items-center gap-3 transition-colors"
                >
                  <div className="bg-muted/50 group-hover:bg-primary/10 group-hover:text-primary rounded-full p-3 transition-colors">
                    <item.Icon className="h-5 w-5" />
                  </div>
                  <span className="hidden text-sm font-medium sm:inline-block">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
