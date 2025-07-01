"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState, useEffect } from "react";
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
import RichTextEditor from "@/components/rich-text-editor"; // make sure it returns HTML string
import { ConfettiButton } from "@/components/magicui/confetti";
import { Metadata } from "next";
 


 
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }).max(100),
  content: z.string().min(1, { message: "Content is required." }),
});

export default function CreatePostPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, imageUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        form.setError("root", {
          message:
            errorData.error || `Failed to create post (status: ${res.status})`,
        });
        return;
      }

      router.push("/admin");
    } catch (err) {
      form.setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onSuccess={(result, { widget }) => {
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
          <img
            src={imageUrl}
            alt="Preview"
            className="max-h-64 rounded shadow"
          />
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          {/* ✅ Rich Text Editor replacing the textarea */}
          <FormField
            control={form.control}
            name="content"
            render={() => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <RichTextEditor
                  content={form.watch("content")}
                  onChange={handleContentChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              {form.formState.errors.root.message}
            </div>
          )}

          <ConfettiButton>
            <button
              type="submit"
              className="w-full sm:w-auto bg-transparent border-none p-0 m-0"
            >
              
            </button>
            {form.formState.isSubmitting ? "Creating..." : "Publish Post"}
          </ConfettiButton>
        </form>
      </Form>
    </div>
  );
}
