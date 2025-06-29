import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/post';
import slugify from '@/lib/slugify';

export async function POST(req: NextRequest) {
  try {
    const { title, content, imageUrl } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: "Missing title or content" }, { status: 400 });
    }

    await dbConnect();

    const slug = slugify(title);

    const exists = await Post.findOne({ slug });
    if (exists) {
      return NextResponse.json({ error: "Post with same title/slug exists" }, { status: 409 });
    }

    const newPost = await Post.create({ title, content, slug, imageUrl }); // ✅ must include imageUrl

    return NextResponse.json(newPost, { status: 201 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
