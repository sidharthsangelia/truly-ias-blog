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

// Function to count words in HTML content
function getWordCount(htmlContent: string): number {
  if (!htmlContent) return 0;
  
  // Remove HTML tags
  const textContent = htmlContent.replace(/<[^>]+>/g, ' ');
  
  // Remove extra whitespace and split by spaces
  const words = textContent
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(word => word.length > 0);
    
  return words.length;
}

export default function PostTable({ posts }: { posts: any[] }) {
  return (
    <div className="overflow-x-auto border border-border rounded-xl bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-muted-foreground">#</TableHead>
            <TableHead className="text-muted-foreground">Title</TableHead>
            <TableHead className="text-muted-foreground">Word Count</TableHead>
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
              <TableCell className="text-muted-foreground">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium">
                  {getWordCount(post.content).toLocaleString()} words
                </span>
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