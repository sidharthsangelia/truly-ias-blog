'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/rich-text-editor'; // <- your editor component
import { ConfettiButton } from './magicui/confetti';

const formSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1).max(10000),
  imageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditPostForm({ post }: { post: FormValues & { slug: string } }) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(post.imageUrl || '');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const response = await fetch(`/api/posts/${post.slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, imageUrl }),
    });

    if (!response.ok) {
      const err = await response.json();
      form.setError('root', {
        message: err.error || 'Failed to update post',
      });
      return;
    }

    router.push('/admin');
  };

  const handleContentChange = (value: string) => {
    form.setValue('content', value);
    form.trigger('content'); // validate on change
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <RichTextEditor
                  content={form.watch('content')}
                  onChange={handleContentChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cloudinary Image Upload */}
        <div>
          <FormLabel>Thumbnail</FormLabel>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="Thumbnail"
              width={500}
              height={300}
              className="rounded mb-2"
            />
          )}
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
            onSuccess={(result: any) => {
              setImageUrl(result?.info?.secure_url);
            }}
          >
            {({ open }) => (
              <Button type="button" variant="outline" onClick={() => open()}>
                {imageUrl ? 'Change Image' : 'Upload Image'}
              </Button>
            )}
          </CldUploadWidget>
        </div>

        {form.formState.errors.root && (
          <p className="p-3 bg-red-100 text-red-700 rounded">
            {form.formState.errors.root.message}
          </p>
        )}

        <ConfettiButton >
          <button type="submit" className="w-full sm:w-auto bg-transparent border-none p-0 m-0">
            Update Post
          </button>
        </ConfettiButton>
      </form>
    </Form>
  );
}
