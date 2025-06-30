'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { ShinyButton } from './magicui/shiny-button';

function Hero() {
  return (
    <main>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center">
        {/* Blurred Background Blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              background:
                'linear-gradient(to top right, #8b5cf6, #6366f1, #a855f7)',
              opacity: '0.25',
            }}
            className="mx-auto aspect-[1155/678] w-[72rem]"
          />
        </div>

        {/* Hero Content */}
        <div className="px-4 py-8 md:py-10">
          <span className="mx-auto flex justify-center mb-6">
            <ShinyButton className="rounded-xl">
              🧠 Ace UPSC with Truly IAS
            </ShinyButton>
          </span>

          <h1 className="relative z-10 mx-auto max-w-4xl text-center text-4xl font-extrabold text-zinc-800 dark:text-zinc-100 md:text-5xl lg:text-7xl">
            Crack the Code to UPSC 
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent ml-2">
              one blog at a time.
            </span>
          </h1>

          <p className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-medium text-zinc-600 dark:text-zinc-400">
            {"Insights, analysis, and crisp notes that make complex topics feel like common sense. Because at Truly IAS, we believe smart study > hard study."}
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg">
              <Link
                className="flex flex-row space-x-2 items-center"
                href="/posts"
              >
                Start Reading
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Contact the Team
            </Button>
          </div>

          {/* Optional Preview Area or Illustration */}
          <div className="relative z-10 mt-24 rounded-3xl border border-zinc-200 bg-zinc-100 p-4 shadow-md dark:border-zinc-700 dark:bg-zinc-900">
            <div className="w-full overflow-hidden rounded-xl border border-zinc-300 dark:border-zinc-700">
              <video
                autoPlay
                loop
                muted
                className="rounded-lg aspect-[16/9] h-auto w-full object-cover"
              >
                <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/test/homepageredesign2024/features/docsend/user-interface/webm/docsend-permissioning-ui-1080xauto-en_GB.webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Hero;
