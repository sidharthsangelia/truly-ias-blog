import EditPostForm from '@/components/EditPostForm';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/post';

export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  await dbConnect();
  const post = await Post.findOne({ slug: params.slug }).lean();

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