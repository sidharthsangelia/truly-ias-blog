import prisma from "@/lib/prisma";

export default async function deletePost({ slug }: { slug: string }) {
    await prisma.post.delete({
        where:{
            slug:slug 
        }
    })
}