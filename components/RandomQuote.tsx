import React from 'react'

export default function RandomQuote() {
  return (
    <div className="col-span-2 row-span-2 col-start-5 row-start-5 p-6 border rounded-xl bg-gradient-to-br from-pink-100/60 to-blue-100/40 dark:from-slate-900/80 dark:to-slate-800/60 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📝 Quote of the Moment
            </h2>

            {/* First Quote */}
            <div className="mb-6">
              <blockquote className="italic text-muted-foreground text-base leading-relaxed">
                "Success usually comes to those who are too busy to be looking
                for it."
              </blockquote>
              <p className="text-sm text-right mt-2 text-foreground">
                — Henry David Thoreau
              </p>
            </div>

            <hr className="border-muted my-2" />

            {/* Second Quote */}
            <div className="mt-6">
              <blockquote className="italic text-muted-foreground text-base leading-relaxed">
                "The best way to get started is to quit talking and begin
                doing."
              </blockquote>
              <p className="text-sm text-right mt-2 text-foreground">
                — Walt Disney
              </p>
            </div>
          </div>
  )
}
