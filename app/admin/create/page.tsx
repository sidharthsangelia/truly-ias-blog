import AddPostForm from "@/components/Form/AddPostForm";
import prisma from "@/lib/prisma";

export default async function CreatePostPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return (
    <main>
      <AddPostForm categories={categories}/>
    </main>
  );
}
