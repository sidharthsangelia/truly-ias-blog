import { notFound } from "next/navigation";
import PostDetailImage from "@/components/PostDetailImage";
import RichTextEditor from "@/components/rich-text-editor";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Head from "next/head";
import Header from "@/components/Header";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface PostType {
  _id: string;
  title: string;
  content: string;
  slug: string;
  imageUrl?: string;
  createdAt: string | Date;
}

export default async function PostDetailsPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  // const post = (await Post.findOne({ slug }).lean()) as PostType | null;

  if (!post) notFound();

  // const trending = await Post.find().sort({ createdAt: -1 }).limit(3).lean();

  const trending = await prisma.post.findMany({
    orderBy: { createdAt: "asc" },
    take: 3,
  });
  // const others = await Post.find({ slug: { $ne: slug } })
  //   .sort({ createdAt: -1 })
  //   .limit(2)
  //   .lean();
  const others = await prisma.post.findMany({
    where: {
      slug: {
        not: slug,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
    
  });

  const cleanContent = (post.content || "").replace(/<[^>]+>/g, "");
  const metaDescription =
    cleanContent.length > 160
      ? cleanContent.substring(0, 157) + "..."
      : cleanContent;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={post.title.split(" ").join(", ")} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={metaDescription} />
        {post.imageUrl && <meta property="og:image" content={post.imageUrl} />}
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-6 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-4">
          {post.imageUrl && (
            <PostDetailImage src={post.imageUrl} alt={post.title} />
          )}

          <h1 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-2 text-foreground dark:text-gray-200 text-center lg:text-left">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-6 text-center lg:text-left space-x-2">
           <span> {new Date(post.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}</span><span>{post.author.name}</span>
          </p>

          <div className="rounded-xl   py-8   dark:bg-background text-foreground dark:text-gray-200 transition-colors">
            <RichTextEditor content={post.content || ""} editable={false} />
          </div>

          {/* Explore More */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">🔎 Explore More</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((p: any) => (
                <Link key={p._id} href={`/posts/${p.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow h-full flex flex-col pt-0">
                    {p.imageUrl && (
                      <div className="w-full h-58 overflow-hidden rounded-t-md">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">
                        {p.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground line-clamp-3">
                      {(p.content || "").replace(/<[^>]+>/g, "").slice(0, 100)}
                      ...
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Quote */}
          <div className="mt-16 border-t pt-6 text-center text-muted-foreground text-sm">
            <p>You've reached the end... or have you? 👀</p>
            <p className="mt-2">
              Stick around, more good stuff is always on the way.
            </p>
          </div>
        </div>

        {/* Trending Section (Desktop Only) */}
        <div className="hidden lg:block lg:col-span-2 space-y-6">
          <div className="border p-4 rounded-lg bg-muted/30">
            <h2 className="text-lg font-semibold mb-4">🔥 Trending Posts</h2>
            <ul className="space-y-3 text-sm">
              {trending.map((t: any) => (
                <li key={t._id} className="border-b pb-2">
                  <Link href={`/posts/${t.slug}`} className="hover:underline">
                    {t.title}
                  </Link>
                  <div className="text-xs text-muted-foreground">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
