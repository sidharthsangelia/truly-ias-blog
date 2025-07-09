import PostTable from "@/components/PostTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RecentPostCard from "@/components/RecentPostCard";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddCategory from "@/components/Form/AddCategory";
import prisma from "@/lib/prisma";

// meta data

export const metadata: Metadata = {
  title: "Admin Dashboard - UPSC with Truly IAS",
  description:
    "Manage UPSC blog posts with Truly IAS Admin Dashboard. Create, edit, and organize insights and strategies for aspirants",
  openGraph: {
    title: "Admin Dashboard – UPSC with Truly IAS",
    description:
      "Manage UPSC blog posts with Truly IAS Admin Dashboard. Create, edit, and organize insights and strategies for aspirants",
    url: "https://truly-ias-blog.vercel.app/posts",
    type: "website",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/50bcbbd4-f25b-4805-994f-a012e58e6798.png?token=mthDW_Ca7CyIKdxVcZdHYVNF-BrD7EQUogaNqDUy4bA&height=560&width=1200&expires=33287367565",
        width: 1200,
        height: 560,
        alt: "Truly IAS Blog Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All posts – UPSC with Truly IAS",
    description:
      "Explore UPSC insights, strategies, and success stories on Truly IAS. Find articles and tips to boost your preparation.",
    images: [
      "https://opengraph.b-cdn.net/production/images/50bcbbd4-f25b-4805-994f-a012e58e6798.png?token=mthDW_Ca7CyIKdxVcZdHYVNF-BrD7EQUogaNqDUy4bA&height=560&width=1200&expires=33287367565",
    ],
  },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await currentUser();

  // Redirect if not authenticated
  if (!user) {
    redirect("/sign-in");
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="min-h-screen bg-muted/40 dark:bg-background px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {"Welcome back! Here's a quick look at your blog activity."}
            </p>
          </div>
          <Button
            asChild
            className="px-5 py-2 text-sm font-medium text-white rounded-lg bg-primary shadow-sm hover:shadow-md hover:opacity-90 transition-all"
          >
            <Link href="/admin/create" className="text-white">
              Create New Post
            </Link>
          </Button>
        </div>

        {/* Responsive Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 🧠 Stats for Nerds */}
          <Card className="flex flex-col justify-between lg:row-span-2">
            <CardHeader>
              <CardTitle className="text-lg">🧠 Stats for Nerds</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full space-y-4 text-sm text-muted-foreground">
              <p className="italic">
                {
                  "Because what’s a dashboard without numbers and unnecessary precision?"
                }
              </p>

              {/* <div className="space-y-1 text-foreground">
                <p><span className="font-semibold">Total Words:</span> {totalWords}</p>
                <p><span className="font-semibold">Avg Words/Post:</span> {avgWords}</p>
                <p><span className="font-semibold">Total Posts:</span> {totalPosts}</p>
                <p><span className="font-semibold">Last Post Date:</span> {new Date(latestPost?.createdAt).toLocaleDateString()}</p>
                <p><span className="font-semibold">Last Post Title:</span> {latestPost?.title || "No post yet"}</p>
              </div> */}

              <blockquote className="text-xs mt-2 italic text-muted-foreground border-l-2 border-primary pl-3">
                {
                  "You're basically a statistician with a blog — or a poet with a calculator."
                }
              </blockquote>
              <p className="text-[13px] text-muted-foreground">
                Keep typing… the data gods demand more.
              </p>
            </CardContent>
          </Card>

          {/* 📝 Total Words — hidden on mobile */}
          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle className="text-lg">📝 Total Words</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-2xl font-semibold text-foreground">{totalWords}</p> */}
              <p className="text-sm text-muted-foreground">Across all posts</p>
            </CardContent>
          </Card>

          {/* 📅 Last Post — hidden on mobile */}
          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle className="text-lg">📅 Last Post</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-base font-medium text-foreground">
                {new Date(latestPost?.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {latestPost?.title || "No post yet"}
              </p> */}
            </CardContent>
          </Card>

          {/* ⏳ Avg. Words/Post — hidden on mobile */}
          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle className="text-lg">⏳ Avg. Words/Post</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <p className="text-3xl font-bold text-foreground">{avgWords}</p> */}
              <p className="text-sm text-muted-foreground">Word density</p>
            </CardContent>
          </Card>

          {/* 📦 Total Posts — always visible */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📦 Total Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <div className="text-4xl font-extrabold text-primary">{totalPosts}</div> */}
              <p className="text-sm text-muted-foreground">
                Published till now
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Post Section */}
        <section>
          <RecentPostCard post={posts[0]} />
        </section>
        <section>
          <AddCategory />
        </section>
        {/* All Posts Table */}
        <section>
          <div className="flex items-center justify-between mb-4 mt-10">
            <h2 className="text-xl font-semibold text-foreground">
              📚 All Posts
            </h2>
          </div>
          <PostTable posts={posts} />
        </section>
      </div>
    </div>
  );
}
