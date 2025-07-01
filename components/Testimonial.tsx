import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Truly IAS blogs turned my chaotic prep into a victory lap! The daily insights are like having a mentor who’s also great at cracking jokes.",
      name: "Priya Sharma",
      achievement: "Cleared UPSC Prelims 2024",
    },
    {
      quote:
        "From drowning in notes to acing Mains answers, these blogs are my UPSC cheat code. Witty, crisp, and ridiculously helpful!",
      name: "Arjun Patel",
      achievement: "UPSC Mains Qualified 2023",
    },
    {
      quote:
        "I was a UPSC newbie, but Truly IAS blogs made me feel like a pro. Their tips are sharper than my pencil during the exam!",
      name: "Sneha Rao",
      achievement: "First Attempt Aspirant",
    },
    {
      quote:
        "The blogs are my daily dose of UPSC wisdom with a side of humor. Helped me stay sane and score in the Interview round!",
      name: "Vikram Singh",
      achievement: "UPSC Interview 2024",
    },
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-8 border-t">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground dark:text-white mb-12">
          What UPSC Aspirants Are Saying
        </h2>

        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="bg-white/20 dark:bg-slate-800/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all h-full">
                  <CardContent className="p-8 flex flex-col gap-6 h-full">
                    <Quote className="w-8 h-8 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                    <p className="text-base text-muted-foreground dark:text-gray-300 leading-relaxed flex-grow">
                      {testimonial.quote}
                    </p>
                    <div className="mt-auto">
                      <p className="font-semibold text-foreground dark:text-white text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {testimonial.achievement}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Show arrows only on md and up */}
          <div className="hidden md:flex justify-center gap-4 mt-6">
            <CarouselPrevious className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500 text-white w-10 h-10" />
            <CarouselNext className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500 text-white w-10 h-10" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
