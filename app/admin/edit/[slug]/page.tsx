import EditPostForm from '@/components/EditPostForm';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/post';
import { Metadata } from "next";
 
// meta data

export const metadata: Metadata = {
  title: "Edit Post - UPSC with Truly IAS",
  description:
    "Manage UPSC blog posts with Truly IAS Admin Dashboard. Create, edit, and organize insights and strategies for aspirants",
  openGraph: {
    title: "Edit Post – UPSC with Truly IAS",
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


export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await dbConnect();
  
  // Await the params Promise
  const { slug } = await params;
  const post = await Post.findOne({ slug }).lean();

  if (!post) {
    return <div className="p-6">Post not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <EditPostForm post={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}