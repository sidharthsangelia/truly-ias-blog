'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

export default function RecentPostCard({ post }: { post: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Recent Post</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        {post.imageUrl && (
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={160}
            height={100}
            className="rounded-md object-cover"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <Link href={`/posts/${post.slug}`} className="text-blue-500 underline mt-2 inline-block">
            View Post
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
