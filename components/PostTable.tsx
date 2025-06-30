import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import DeletePostButton from "./DeletePostButton";

export default function PostTable({ posts }: { posts: any[] }) {
  return (
    <div className="overflow-x-auto border border-border rounded-xl bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-muted-foreground">#</TableHead>
            <TableHead className="text-muted-foreground">Title</TableHead>
            <TableHead className="text-muted-foreground">
              Published At
            </TableHead>
            <TableHead className="text-muted-foreground">Updated At</TableHead>
            <TableHead className="text-right text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => (
            <TableRow
              key={post._id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Link
                  href={`/posts/${post.slug}`}
                  className="hover:underline text-foreground"
                >
                  {post.title}
                </Link>
              </TableCell>
              <TableCell>
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                {new Date(post.updatedAt || post.createdAt).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-4 items-center">
                  <Link
                    href={`/admin/edit/${post.slug}`}
                    className="hover:text-accent-foreground transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <DeletePostButton slug={post.slug} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
