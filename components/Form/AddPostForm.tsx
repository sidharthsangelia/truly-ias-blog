"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/rich-text-editor";
import { ConfettiButton } from "@/components/magicui/confetti";
import Image from "next/image";
import createPost from "@/actions/posts/createPost";
import { Checkbox } from "@/components/ui/checkbox";
import AddCategory from "./AddCategory";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).max(100),
  content: z.string().min(1, { message: "Content is required." }),
  categoryIds: z
    .array(z.string())
    .min(1, { message: "Select at least one category." }),
});

type Category = { id: string; name: string };

interface AddPostFormProps {
  categories: Category[];
}

export default function AddPostForm({ categories: initialCategories }: AddPostFormProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialCategories); // 🧠 make it dynamic

  const handleCategoryAdded = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // ✅ Sync content from rich text editor
  const handleContentChange = (value: string) => {
    form.setValue("content", value); // set value in form state
    form.trigger("content"); // manually trigger validation
  };
 
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onSuccess={(result) => {
          if (
            typeof result === "object" &&
            result !== null &&
            "info" in result &&
            typeof (result as any).info === "object" &&
            "secure_url" in (result as any).info
          ) {
            setImageUrl((result as any).info.secure_url);
          } else {
            setImageUrl(null);
          }
        }}
        onQueuesEnd={(result, { widget }) => widget.close()}
        options={{
          sources: ["local", "url", "camera", "unsplash"],
          multiple: false,
          maxFiles: 1,
        }}
      >
        {({ open }) => (
          <Button
            type="button"
            onClick={() => {
              setImageUrl(null);
              open();
            }}
            className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
          >
            {imageUrl ? "Re-upload Image" : "Upload a Thumbnail"}
          </Button>
        )}
      </CldUploadWidget>

      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            width={200}
            height={200}
            alt="Preview"
            className="max-h-64 rounded shadow"
          />
        </div>
      )}
 
      <Form {...form}>
        <form action={createPost} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter post title"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* categories */}

          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <div className="flex  gap-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex flex-row items-center gap-2">
                      <Checkbox
                        id={category.id}
                        checked={field.value?.includes(category.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([
                              ...(field.value || []),
                              category.id,
                            ]);
                          } else {
                            field.onChange(
                              field.value?.filter((id) => id !== category.id)
                            );
                          }
                        }}
                      />
                      <FormLabel className="text-sm font-normal">
                        {category.name}
                      </FormLabel>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ✅ Rich Text Editor replacing the textarea */}
          {/* Rich Text Editor */}
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <RichTextEditor
                  content={form.watch("content")}
                  onChange={(value) => {
                    form.setValue("content", value);
                    form.trigger("content");
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <input
            type="hidden"
            name="content"
            value={form.watch("content") || ""}
          />
          <input type="hidden" name="imageUrl" value={imageUrl ?? ""} />

          {form.formState.errors.root && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              {form.formState.errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full sm:w-auto  border-none p-0 m-0"
          >
            {form.formState.isSubmitting ? "Creating..." : "Publish Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
