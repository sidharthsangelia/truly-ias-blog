 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export default function RecentPostCard({ post }: { post: any }) {
  return (
    <Card className="shadow-sm border-muted bg-background hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground tracking-tight">
          🆕 Most Recent Post
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-5 items-start">
        {post.imageUrl && (
          <div className="w-full sm:w-[180px] h-[120px] overflow-hidden rounded-md">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={180}
              height={120}
              className="rounded-md object-cover w-full h-full"
            />
          </div>
        )}

        <div className="flex flex-col justify-between flex-1 space-y-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground line-clamp-2">
              {post.title}
            </h2>
            <p className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {stripHtml(post.content)}
          </p>

          <Link
            href={`/posts/${post.slug}`}
            className="text-sm text-primary hover:underline font-medium mt-1"
          >
            Read Full Post →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// Utility to strip HTML tags from content
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '');
}
