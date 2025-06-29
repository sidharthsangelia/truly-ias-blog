import dbConnect from "@/lib/dbConnect";
import Post from "@/models/post";
import { notFound } from "next/navigation";
import PostDetailImage from "@/components/PostDetailImage";

export const dynamic = "force-dynamic";

interface PostPageProps {
  params: {
    slug: string;
  };
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
  await dbConnect();

  const post = (await Post.findOne({ slug: params.slug }).lean()) as PostType | null;

  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Banner Image */}
      {post.imageUrl && (
        <PostDetailImage src={post.imageUrl} alt={post.title} />
      )}

      {/* Post Metadata */}
      <h1 className="text-4xl font-bold leading-tight tracking-tight mb-2">
        {post.title}
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        {new Date(post.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      {/* Post Content */}
      <article
        className="prose prose-neutral dark:prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
