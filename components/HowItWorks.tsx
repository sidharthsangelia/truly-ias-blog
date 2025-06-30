import { BookOpen, NotebookPen, ListChecks, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Read Curated Posts",
    description:
      "Stay informed with daily posts covering current affairs, policy, and UPSC-relevant editorials.",
    icon: <BookOpen className="w-6 h-6 text-indigo-500" />,
    color: "bg-indigo-100 dark:bg-indigo-900/20",
    btn: "Start Reading",
    btnColor: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    title: "Make Crisp Notes",
    description:
      "Distill the key points — because let’s be honest, you won't reread everything twice.",
    icon: <NotebookPen className="w-6 h-6 text-purple-500" />,
    color: "bg-purple-100 dark:bg-purple-900/20",
    btn: "Take Notes",
    btnColor: "bg-purple-500 hover:bg-purple-600",
  },
  {
    title: "Revise Smartly",
    description:
      "Smart revision cards and summaries to keep everything fresh — minus the burnout.",
    icon: <ListChecks className="w-6 h-6 text-pink-500" />,
    color: "bg-pink-100 dark:bg-pink-900/20",
    btn: "Revise Now",
    btnColor: "bg-pink-500 hover:bg-pink-600",
  },
  {
    title: "Crack the Exam",
    description:
      "With consistency, good notes, and a sprinkle of luck — welcome to LBSNAA! (Manifest mode: ON)",
    icon: <GraduationCap className="w-6 h-6 text-emerald-500" />,
    color: "bg-emerald-100 dark:bg-emerald-900/20",
    btn: "Begin Journey",
    btnColor: "bg-emerald-500 hover:bg-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-20 bg-muted/30 dark:bg-background border-t">
      {/* Light Leak Background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(10% 20%, 30% 10%, 50% 30%, 70% 10%, 90% 20%, 80% 50%, 90% 80%, 70% 90%, 50% 70%, 30% 90%, 10% 80%, 20% 50%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72rem] bg-gradient-to-br from-[#8b5cf6] via-[#a855f7] to-[#ec4899] opacity-25 dark:bg-gradient-to-br dark:from-[#7dd3fc] dark:via-[#a5b4fc] dark:to-[#fb7185] dark:opacity-50"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
          How Truly IAS Works
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={cn(
                "relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-md shadow-md border border-white/10 transition-transform hover:scale-[1.03] duration-300 ease-in-out"
              )}
            >
              <div className={cn("rounded-full p-4 mb-4 shadow-inner", step.color)}>
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground dark:text-white">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-2 mb-4">
                {step.description}
              </p>
              <Button className={cn("text-white", step.btnColor)}>
                {step.btn}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}