import Link from "next/link";
import { BorderBeam } from "./magicui/border-beam";
import { ArrowRight } from "lucide-react";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

export default function ReadMoreCTA() {
  return (
    <div className="col-span-2 row-span-2 col-start-5 row-start-5 p-6 rounded-xl border bg-gradient-to-br from-violet-100/70 to-indigo-100/50 dark:from-indigo-800/50 dark:to-indigo-700/40 transition-all shadow-sm relative overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
        📚 Still Curious?
      </h2>

      <div className="space-y-4">
        <p className="italic text-muted-foreground text-[17px] leading-relaxed">
          You've barely scratched the surface, seeker of knowledge. There's a
          whole world of insights, hot takes, and opinionated wisdom waiting for you.
        </p>

    
        <div className="pt-2">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400  "
          >

           <InteractiveHoverButton>
             Dive into all posts
           </InteractiveHoverButton>
          </Link>
        </div>
      </div>

      <BorderBeam duration={8} size={100} />
    </div>
  );
}
