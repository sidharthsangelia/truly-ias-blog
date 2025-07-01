import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-indigo-50/50 to-purple-50/50 dark:from-indigo-400/50 dark:to-purple-400/50 backdrop-blur-lg border-t border-white/20 dark:border-gray-700/30">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 pt-8 pb-12">
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white">
          Still decoding UPSC with tea-stained newspapers? 😅
        </h2>

        {/* Subheading */}
        <p className="text-muted-foreground dark:text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Swap the clutter for curated brilliance. Dive into our blogs for daily UPSC insights, witty takes, and tips sharper than your pencil during prelims!
        </p>

        {/* CTA Button */}
        <Link href="/posts">
          <Button
            size="lg"
            className="text-base px-8 py-5 bg-indigo-500 hover:bg-indigo-600 text-white dark:bg-indigo-400 dark:hover:bg-indigo-500 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            Start Reading Blogs
          </Button>
        </Link>
      </div>
    </section>
  );
}