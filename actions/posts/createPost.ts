"use server";

import prisma from "@/lib/prisma";
import slugify from "@/lib/slugify";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function createPost(formData: FormData) {
  const { userId } = await auth();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const categoryIds = formData.getAll("categoryIds") as string[];

  if (!title || !content) {
    throw new Error("Missing required fields: title or content");
  }

  const slug = slugify(title);

  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId!,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.post.create({
    data: {
      title,
      content,
      slug,
      imageUrl,
      author: {
        connect: { id: user.id },
      },
      categories: {
        connect: categoryIds.map((id) => ({ id })),
      },
    },
  });

  redirect("/admin");
}
