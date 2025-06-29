'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }).max(100).trim(),
  content: z
    .string()
    .min(1, { message: 'Content is required.' })
    .max(10000)
    .trim(),
});

export default function CreatePostPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, imageUrl }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        form.setError('root', {
          message:
            errorData.error ||
            `Failed to create post (status: ${res.status})`,
        });
        return;
      }

      router.push('/admin');
    } catch (err) {
      form.setError('root', {
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create Blog Post</h1>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
        onSuccess={(result, { widget }) => {
          console.log("Upload Result:", result); 
          if (typeof result === 'object' && result !== null && 'info' in result && typeof (result as any).info === 'object' && (result as any).info !== null && 'secure_url' in (result as any).info) {
            setImageUrl((result as any).info.secure_url);
          } else {
            setImageUrl(null);
          }
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
        options={{
          sources: ['local', 'url', 'camera', 'unsplash'],
          multiple: false,
          maxFiles: 1,
        }}
      >
        {({ open }) => {
          const handleOnClick = () => {
            setImageUrl(null);
            open();
          };
          return (
            <Button
              type="button"
              onClick={handleOnClick}
              className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
            >
              {imageUrl ? 'Re-upload Image' : 'Upload an Image'}
            </Button>
          );
        }}
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

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter post content"
                    className="min-h-[200px]"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <div className="p-3 bg-red-100 text-red-700 rounded">
              {form.formState.errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full sm:w-auto"
          >
            {form.formState.isSubmitting ? 'Creating...' : 'Create Post'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
