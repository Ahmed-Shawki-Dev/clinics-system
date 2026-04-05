"use client";

import { fadeInUp, staggerContainer } from "@/animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import Link from "next/link";

const faqs = [
  {
    question: "هل النظام مناسب لعيادتي الفردية؟",
    answer:
      "بالتأكيد. ميدورا مصمم ليكون مرناً، سواء كنت تدير عيادة خاصة بمفردك أو مركزاً طبياً كبيراً يضم تخصصات متعددة. النظام يتكيف مع حجم عملك بسهولة.",
  },
  {
    question: "ما مدى أمان بيانات المرضى والتقارير؟",
    answer:
      "أمان البيانات هو أساس نظامنا. نستخدم بنية برمجية معزولة (Multi-tenant) تضمن خصوصية بيانات كل عيادة بشكل كامل، مع تشفير كافة الملفات والروشتات وفق أعلى المعايير.",
  },
  {
    question: "هل أحتاج لأجهزة كمبيوتر بمواصفات خاصة؟",
    answer:
      "لا، النظام يعمل بالكامل سحابياً (Cloud-based). كل ما تحتاجه هو متصفح إنترنت على أي جهاز (كمبيوتر، تابلت، أو موبايل) لتبدأ العمل فوراً من أي مكان.",
  },
  {
    question: "هل يدعم النظام الحجز الإلكتروني؟",
    answer:
      "نعم، نوفر لك صفحة حجز خاصة بعيادتك تمكن المرضى من رؤية المواعيد المتاحة وحجزها إلكترونياً، مما يقلل ضغط الاتصالات على موظفي الاستقبال.",
  },
  {
    question: "كيف يعمل نظام التنبيهات عبر واتساب؟",
    answer:
      "يقوم النظام آلياً بإرسال رسائل لتأكيد الحجز وتذكير المريض بموعده قبل الزيارة، مما يقلل بشكل كبير من نسب التخلف عن المواعيد.",
  },
  {
    question: "ما هو شكل الدعم الفني المتاح؟",
    answer:
      "فريقنا متاح تقريباً على مدار الساعة عبر الواتساب والهاتف للرد على أي استفسار أو حل أي مشكلة فنية قد تواجهك لضمان استقرار عمل عيادتك.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-background py-24 md:py-32" dir="rtl">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mb-20 space-y-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="text-foreground text-3xl font-bold tracking-tight md:text-5xl"
          >
            أسئلة <span className="text-muted-foreground">شائعة</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-muted-foreground mx-auto max-w-xl text-lg font-medium"
          >
            إجابات سريعة لأكثر التساؤلات التي قد تدور في ذهنك حول النظام.
          </motion.p>
        </motion.div>

        {/* 🔴 Accordion: ستايل القائمة النظيفة (Simple & Modern) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Accordion
            type="single"
            collapsible
            className="border-border/60 w-full border-t"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/60 hover:bg-muted/30 border-b px-2 transition-colors"
              >
                <AccordionTrigger className="text-foreground/90 py-6 text-right text-lg font-bold hover:no-underline md:text-xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed font-medium md:text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Footer Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mt-12 text-center font-medium"
        >
          عندك سؤال تاني؟{" "}
          <Link
            href="https://wa.me/201070272135"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            تواصل معنا مباشرة
          </Link>
        </motion.p>
      </div>
    </section>
  );
}
