import Link from "next/link";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import CloudImage from "@/components/CloudImage";
import TrendingPosts from "@/components/TrendingPosts";
import RandomQuote from "@/components/RandomQuote";

export const dynamic = "force-dynamic";

export default async function AllPostsPage() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  const trending = [...posts].sort(() => 0.5 - Math.random()).slice(0, 4); // Random trending
  const [first, second, ...rest] = posts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-foreground">
        All Blog Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No blog posts found.
        </p>
      ) : (
        <div className="grid grid-cols-6 grid-rows-6 gap-x-6 gap-y-3">
          {/* Left Large Section */}
          <div className="col-span-4 row-span-6 space-y-6">
            {/* First Big Post */}
            {first && (
              <Link href={`/posts/${first.slug}`}>
                <Card className="flex my-3 flex-col md:flex-row gap-4 p-4 hover:shadow-lg transition-shadow">
                  <div className="min-w-[180px] max-w-xs aspect-[4/3] overflow-hidden rounded-md flex-shrink-0">
                    {first.imageUrl && (
                      <CloudImage src={first.imageUrl} alt={first.title} />
                    )}
                  </div>
                  <div>
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl mb-2 line-clamp-2">
                        {first.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground tracking-wider text-sm mb-4">
                        {new Date(first.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-muted-foreground p-0 text-sm line-clamp-5">
                      {stripHtml(first.content)}
                    </CardContent>
                  </div>
                </Card>
              </Link>
            )}

            {/* Second Big Post */}
            {second && (
              <Link href={`/posts/${second.slug}`}>
                <Card className="flex my-3 flex-col md:flex-row gap-4 p-4 hover:shadow-lg transition-shadow">
                  <div className="min-w-[180px] max-w-xs aspect-[4/3] overflow-hidden rounded-md flex-shrink-0">
                    {second.imageUrl && (
                      <CloudImage src={second.imageUrl} alt={second.title} />
                    )}
                  </div>
                  <div>
                    <CardHeader className="p-0">
                      <CardTitle className="text-2xl mb-2 line-clamp-2">
                        {second.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground tracking-wider text-sm mb-4">
                        {new Date(second.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm p-0 line-clamp-5">
                      {stripHtml(second.content)}
                    </CardContent>
                  </div>
                </Card>
              </Link>
            )}

            {/* Grid of Remaining Posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {rest.map((post: any) => (
                <Link key={post._id} href={`/posts/${post.slug}`}>
                  <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                    {post.imageUrl && (
                      <div className="w-full h-48 overflow-hidden rounded-t-md">
                        <CloudImage src={post.imageUrl} alt={post.title} />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-1">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto text-sm text-muted-foreground line-clamp-3">
                      {stripHtml(post.content)}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

        

          <TrendingPosts posts={posts} />

          {/* Right Bottom - Quote */}
          <RandomQuote/>
        </div>
      )}
    </div>
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}
