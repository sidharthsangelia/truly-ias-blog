import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Faq() {
  const faqs = [
    {
      question: "Why should I read Truly IAS blogs instead of my trusty newspaper stack?",
      answer:
        "Our blogs are curated like a Michelin-starred UPSC meal—daily insights, policy breakdowns, and editorials without the newsprint smudge. Save your newspapers for origami and dive into our bite-sized, exam-ready content!",
    },
    {
      question: "How often are new blogs posted? I need my UPSC fix!",
      answer:
        "We drop fresh blogs daily, like your morning chai. From current affairs to essay tips, you’ll get a steady stream of content to keep your prep sharper than a GS answer in the mains!",
    },
    {
      question: "Can Truly IAS blogs help with all UPSC stages—Prelims, Mains, and Interview?",
      answer:
        "Absolutely! Think of our blogs as your all-in-one UPSC Swiss Army knife. We cover Prelims MCQs, Mains answer-writing hacks, and Interview confidence boosters. You’re ready for every stage, minus the panic.",
    },
    {
      question: "Are the blogs beginner-friendly or just for UPSC veterans?",
      answer:
        "Whether you’re a fresh-faced aspirant or a battle-hardened UPSC warrior, our blogs break down complex topics into clear, witty reads. No PhD in jargon required—just a passion to crack the exam!",
    },
    {
      question: "How do I make the most of Truly IAS blogs for my prep?",
      answer:
        "Read daily, take crisp notes, and revise smartly with our tips. Treat our blogs like your study buddy who’s always got your back. Ready to start? Jump in and explore our posts now!",
    },
  ];

  return (
    <section className="relative w-full bg-muted/30 dark:bg-background py-16 px-4 md:px-6 border-t overflow-hidden">
      {/* Gradient Wave Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        <svg
          className="w-full h-full opacity-20 dark:opacity-30"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#wave-gradient)"
            d="M0,160 C320,300 520,100 720,200 C920,300 1120,100 1440,200 L1440,320 L0,320 Z"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="wave-gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#7dd3fc', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#a5b4fc', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#fb7185', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <use href="#wave-gradient" className="block dark:hidden" />
          <use href="#wave-gradient-dark" className="hidden dark:block" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground dark:text-white mb-12">
          FAQs for UPSC Aspirants
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-md shadow-md border border-white/10 transition-all hover:shadow-lg"
            >
              <AccordionTrigger className="text-left px-6 py-4 text-lg font-semibold text-foreground dark:text-white hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-muted-foreground dark:text-gray-300 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

       
      </div>
    </section>
  );
}