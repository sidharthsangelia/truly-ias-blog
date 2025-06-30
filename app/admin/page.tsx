import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";
import DashboardStats from "@/components/DashboardStats";
import RecentPostCard from "@/components/RecentPostCard";
import PostTable from "@/components/PostTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboardPage() {
  await dbConnect();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage and monitor your blog posts.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <DashboardStats
          totalPosts={posts.length}
          latestPostDate={posts[0]?.createdAt}
        />
        <Button>
          <Link href="/admin/create">
            Create New Post
          </Link>
        </Button>
        {/* Recent Post */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recent Post
          </h2>
          <RecentPostCard post={posts[0]} />
        </section>

        {/* All Posts Table */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">All Posts</h2>
          </div>
          <PostTable posts={posts} />
        </section>
      </div>
    </div>
  );
}
