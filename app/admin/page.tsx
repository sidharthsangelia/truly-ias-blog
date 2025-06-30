import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";
import DashboardStats from "@/components/DashboardStats";
import PostTable from "@/components/PostTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RecentPostCard from "@/components/RecentPostCard";
import { ShinyButton } from "@/components/magicui/shiny-button";

export default async function AdminDashboardPage() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  const totalPosts = posts.length;
  const latestPost = posts[0];
  const totalWords = posts.reduce(
    (acc, post) => acc + post.content.split(" ").length,
    0
  );
  const avgWords = totalPosts ? Math.round(totalWords / totalPosts) : 0;

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
              Welcome back! Here's a quick look at your blog activity.
            </p>
          </div>
          <ShinyButton className="px-5 py-2 text-sm font-medium text-white rounded-lg bg-primary  shadow-sm hover:shadow-md hover:opacity-90 transition-all">
            <Link href="/admin/create" className="text-white">Create New Post</Link>
          </ShinyButton>
        </div>

        {/* Bento Grid for Stats */}
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {/* 1: 🧠 Stats for Nerds */}
          <Card className="row-span-2 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg">🧠 Stats for Nerds</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-between h-full space-y-4 text-sm text-muted-foreground">
              <p className="italic">
                Because what’s a dashboard without numbers and unnecessary
                precision?
              </p>

              <div className="space-y-1 text-foreground">
                <p>
                  <span className="font-semibold">Total Words:</span>{" "}
                  {totalWords}
                </p>
                <p>
                  <span className="font-semibold">Avg Words/Post:</span>{" "}
                  {avgWords}
                </p>
                <p>
                  <span className="font-semibold">Total Posts:</span>{" "}
                  {totalPosts}
                </p>
              </div>

              <blockquote className="text-xs mt-2 italic text-muted-foreground border-l-2 border-primary pl-3">
                "You're basically a statistician with a blog — or a poet with a
                calculator."
              </blockquote>

              <p className="text-[13px] text-muted-foreground">
                Keep typing… the data gods demand more.
              </p>
            </CardContent>
          </Card>

          {/* 2: 📝 Total Words */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">📝 Total Words</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold text-foreground">
                {totalWords}
              </p>
              <p className="text-sm text-muted-foreground">Across all posts</p>
            </CardContent>
          </Card>

          {/* 3: 📅 Last Post */}
          <Card className="col-start-2 row-start-2">
            <CardHeader>
              <CardTitle className="text-lg">📅 Last Post</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium text-foreground">
                {new Date(latestPost?.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {latestPost?.title || "No post yet"}
              </p>
            </CardContent>
          </Card>

          {/* 7: ⏳ Avg. Words/Post */}
          <Card className="col-start-3 row-start-2">
            <CardHeader>
              <CardTitle className="text-lg">⏳ Avg. Words/Post</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{avgWords}</p>
              <p className="text-sm text-muted-foreground">Word density</p>
            </CardContent>
          </Card>

          {/* 8: 📦 Total Posts */}
          <Card className="col-start-3 row-start-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                📦 Total Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-primary">
                {totalPosts}
              </div>
              <p className="text-sm text-muted-foreground">
                Published till now
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Post Section */}
        <section>
          {/* <div className="flex items-center justify-between mb-4 mt-10"> */}
          <RecentPostCard post={posts[0]} />
          {/* </div> */}
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
