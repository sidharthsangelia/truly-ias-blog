'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import DeletePostButton from './DeletePostButton';

export default function PostTable({ posts }: { posts: any[] }) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post._id}>
              <TableCell>
                <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </TableCell>
              <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/admin/edit/${post.slug}`}>
                  <Pencil className="w-4 h-4 text-gray-700 hover:text-blue-600" />
                </Link>
                <DeletePostButton slug={post.slug} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
