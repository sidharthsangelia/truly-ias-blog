import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative w-[80%] mx-auto bg-muted/30 dark:bg-background rounded-lg py-16 px-6 md:px-20 border-t">
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

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white">
          Still decoding UPSC with tea-stained newspapers? 😅
        </h2>

        {/* Subheading */}
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          Swap the clutter for curated brilliance. Dive into our blogs for daily UPSC insights, witty takes, and tips sharper than your pencil during prelims!
        </p>

        {/* CTA Button */}
        <Link href="/posts">
          <Button
            size="lg"
            className="text-base px-6 py-4 bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-400 dark:hover:bg-indigo-500"
          >
            Start Reading Blogs
          </Button>
        </Link>
      </div>
    </section>
  );
}