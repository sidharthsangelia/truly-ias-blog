'use client';

import Link from 'next/link';
import { Marquee } from '@/components/magicui/marquee';
import { cn } from '@/lib/utils';

interface TrendingPost {
  _id: string;
  title: string;
  createdAt: string;
  slug: string;
}

interface Props {
  posts: TrendingPost[];
}

const TrendingCard = ({ title, date, slug }: { title: string; date: string; slug: string }) => (
  <Link
    href={`/posts/${slug}`}
    className={cn(
      'block w-64 md:w-80 lg:w-72 bg-background border border-border rounded-lg p-4 transition hover:scale-[1.02] hover:shadow-sm',
      'dark:bg-slate-900 dark:border-slate-700'
    )}
  >
    <p className="text-base font-medium line-clamp-2">{title}</p>
    <span className="text-xs text-muted-foreground block mt-2">{date}</span>
  </Link>
);

export default function TrendingPosts({ posts }: Props) {
  return (
    <div className="col-span-2 row-span-4 col-start-5 p-4 rounded-xl bg-muted/30">
      <h2 className="text-lg font-semibold mb-4">🔥 Trending Posts</h2>
      <div className="relative h-[560px] overflow-hidden">
        <Marquee pauseOnHover vertical className="[--duration:25s]">
          {posts.map((post) => (
            <TrendingCard
              key={post._id}
              title={post.title}
              date={new Date(post.createdAt).toLocaleDateString()}
              slug={post.slug}
            />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-muted/30"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-muted/30"></div>
      </div>
    </div>
  );
}
