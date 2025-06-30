import { BorderBeam } from "./magicui/border-beam";

interface Quote {
  author: string;
  content: string;
  tags?: string[];
}

async function fetchRandomQuote(): Promise<Quote | null> {
  try {
    const res = await fetch(
      'https://api.freeapi.app/api/v1/public/quotes/quote/random',
      {
        headers: { accept: 'application/json' },
        cache: 'no-store',
      }
    );
    const json = await res.json();
    return json?.data || null;
  } catch (err) {
    console.error('Error fetching quote:', err);
    return null;
  }
}

export default async function QuoteBlock() {
  const quote = await fetchRandomQuote();

  return (
    <div className="col-span-2 row-span-2 col-start-5 row-start-5 p-6 rounded-xl border bg-gradient-to-br from-orange-100/60 to-rose-100/50 dark:from-slate-800/70 dark:to-slate-700/60 transition-all shadow-sm relative overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        📜 Quote of the Moment
      </h2>

      {quote ? (
        <div className="space-y-4">
          <div className="text-4xl text-muted-foreground leading-none mb-2">“</div>

          <blockquote className="italic text-muted-foreground text-[17px] leading-relaxed">
            {quote.content}
          </blockquote>

          <hr className="border-muted my-3" />

          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-right text-foreground">
              — {quote.author}
            </p>

            {Array.isArray(quote.tags) && quote.tags.length > 0 && (
              <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                {quote.tags[0]}
              </span>
            )}
          </div>
           <BorderBeam duration={8} size={100} />
        </div>
      ) : (
        <p className="text-muted-foreground italic">Unable to fetch quote.</p>
      )}
    </div>
  );
}
