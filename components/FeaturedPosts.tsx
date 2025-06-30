import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CloudImage from "@/components/CloudImage";
import ReadMoreCTA from "./ReadMoreCTA";

export default async function FeaturedPostsSection() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).limit(4).lean();

  if (!posts.length) return null;

  const [first, second, third, fourth] = posts;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">
        🚀 Featured Posts from Truly IAS
      </h2>

      <div className="grid grid-cols-6 grid-rows-6 gap-4 gap-y-0">
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
                    <CardDescription className="text-muted-foreground tracking-wider text mb-4">
                      {new Date(first.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground p-0 text line-clamp-5">
                    {stripHtml(first.content)}
                  </CardContent>
                </div>
              </Card>
            </Link>
          )}

          {/* Grid of Remaining Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {second && (
              <Link href={`/posts/${second.slug}`}>
                <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                  {second.imageUrl && (
                    <div className="w-full h-48 overflow-hidden rounded-t-md">
                      <CloudImage src={second.imageUrl} alt={second.title} />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-1">
                      {second.title}
                    </CardTitle>
                    <CardDescription className="text text-muted-foreground">
                      {new Date(second.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto text text-muted-foreground line-clamp-3">
                    {stripHtml(second.content)}
                  </CardContent>
                </Card>
              </Link>
            )}
            {third && (
              <Link href={`/posts/${third.slug}`}>
                <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow">
                  {second.imageUrl && (
                    <div className="w-full h-48 overflow-hidden rounded-t-md">
                      <CloudImage src={third.imageUrl} alt={third.title} />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-1">
                      {third.title}
                    </CardTitle>
                    <CardDescription className="text text-muted-foreground">
                      {new Date(third.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto  text-muted-foreground line-clamp-3">
                    {stripHtml(third.content)}
                  </CardContent>
                </Card>
              </Link>
            )}
          </div>
        </div>

        <div className="col-span-2 row-span-4 col-start-5 p-4 rounded-xl bg-muted/30">
          {fourth && (
            <Link href={`/posts/${fourth.slug}`}>
              <Card className=" flex flex-col shadow-md hover:shadow-lg transition-shadow">
                {second.imageUrl && (
                  <div className="w-full h-48 overflow-hidden rounded-t-md">
                    <CloudImage src={fourth.imageUrl} alt={fourth.title} />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-1">
                    {fourth.title}
                  </CardTitle>
                  <CardDescription className="text text-muted-foreground">
                    {new Date(fourth.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className=" text-muted-foreground line-clamp-4">
                  {stripHtml(fourth.content)}
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
        <ReadMoreCTA />
      </div>
    </section>
  );
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}
