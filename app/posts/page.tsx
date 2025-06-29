// app/posts/page.tsx or wherever your AllPostsPage is
import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/post';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CloudImage from '@/components/CloudImage'; 

export const dynamic = 'force-dynamic';

export default async function AllPostsPage() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-10 text-center">All Blog Posts</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No blog posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: any) => (
            <Link
              key={post._id}
              href={`/posts/${post.slug}`}
              className="hover:scale-[1.02] transition-transform"
            >
              <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                {post.imageUrl && (
                  <CloudImage src={post.imageUrl} alt={post.title} />
                )}

                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto text-sm text-gray-600 line-clamp-3">
                  {stripHtml(post.content)}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}
