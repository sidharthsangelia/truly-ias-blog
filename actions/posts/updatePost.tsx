'use server';

import prisma from '@/lib/prisma';
import slugify from '@/lib/slugify';

export default async function updatePost(formData: FormData) {
  const slug = formData.get('slug') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const categoryIds = JSON.parse(formData.get('categoryIds') as string) as string[];

  const post = await prisma.post.update({
    where: { slug },
    data: {
      title,
      content,
      imageUrl,
      slug: slugify(title),
      categories: {
        set: [], // reset
        connect: categoryIds.map((id) => ({ id })),
      },
    },
  });

  return post;
}
