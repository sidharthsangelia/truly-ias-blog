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
  const trending = [...posts].sort(() => 0.5 - Math.random()).slice(0, 4);
  const [first, second, ...rest] = posts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-foreground">
        Insights, Strategies & Success Stories – UPSC with Truly IAS
      </h1>

      {/* Responsive Grid Layout for Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Left Content Area */}
        <div className="lg:col-span-4 space-y-6">
          {/* First Large Post */}
          {first && (
            <Link href={`/posts/${first.slug}`}>
              <Card className="flex flex-col md:flex-row gap-4 p-4 hover:shadow-lg transition-shadow">
                <div className="min-w-full md:min-w-[180px] md:max-w-xs aspect-[4/3] overflow-hidden rounded-md">
                  {first.imageUrl && (
                    <CloudImage src={first.imageUrl} alt={first.title} />
                  )}
                </div>
                <div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl mb-2 line-clamp-2">
                      {first.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm mb-4">
                      {new Date(first.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground text-sm p-0 line-clamp-5">
                    {stripHtml(first.content)}
                  </CardContent>
                </div>
              </Card>
            </Link>
          )}

          {/* Second Large Post */}
          {second && (
            <Link href={`/posts/${second.slug}`}>
              <Card className="flex flex-col md:flex-row gap-4 p-4 hover:shadow-lg transition-shadow">
                <div className="min-w-full md:min-w-[180px] md:max-w-xs aspect-[4/3] overflow-hidden rounded-md">
                  {second.imageUrl && (
                    <CloudImage src={second.imageUrl} alt={second.title} />
                  )}
                </div>
                <div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl mb-2 line-clamp-2">
                      {second.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground text-sm mb-4">
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

          {/* Trending - for Mobile & Tablet only */}
          <div className="block lg:hidden">
            <TrendingPosts posts={trending} />
          </div>

          {/* Remaining Blog Posts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
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

        {/* Right Sidebar - Trending & Quote on Desktop only */}
        <div className="hidden lg:block lg:col-span-2 space-y-6">
          <TrendingPosts posts={trending} />
          <RandomQuote />
        </div>
      </div>
    </div>
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}
