'use client';

import { useState, useTransition } from 'react';
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
import RichTextEditor from '@/components/rich-text-editor';
import AddCategory from './AddCategory';
import updatePost from '@/actions/posts/updatePost';
  // ✅ Your server action to update post

const formSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string().min(1, 'Content is required'),
  categoryIds: z.array(z.string()).min(1, 'Select at least one category'),
});

type Category = {
  id: string;
  name: string;
};

interface EditPostFormProps {
  post: {
    title: string;
    content: string;
    imageUrl?: string;
    slug: string;
    categoryIds: string[];
  };
  categories: Category[];
}

export default function EditPostForm({ post, categories }: EditPostFormProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(post.imageUrl || '');
  const [allCategories, setAllCategories] = useState(categories);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
      categoryIds: post.categoryIds || [],
    },
  });

  const handleContentChange = (value: string) => {
    form.setValue('content', value);
    form.trigger('content');
  };

  const onCategoryAdded = (category: Category) => {
    setAllCategories((prev) => [...prev, category]);
    form.setValue('categoryIds', [...form.getValues('categoryIds'), category.id]);
    form.trigger('categoryIds');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>

      {/* <AddCategory  /> */}

      <Form {...form}>
        <form
          action={(formData) => {
            formData.append('slug', post.slug); // required by server action
            formData.append('imageUrl', imageUrl || '');
            updatePost(formData).then(() => router.push('/admin'));
          }}
          className="space-y-6"
        >
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
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <div className="flex flex-col gap-2">
                  {allCategories.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={field.value?.includes(category.id)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            field.onChange([...field.value, category.id]);
                          } else {
                            field.onChange(field.value.filter((id) => id !== category.id));
                          }
                        }}
                      />
                      <FormLabel className="text-sm font-normal">{category.name}</FormLabel>
                    </div>
                  ))}
                </div>
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
                <RichTextEditor
                  content={form.watch('content')}
                  onChange={handleContentChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel className="mb-2 block">Thumbnail</FormLabel>
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

          <input type="hidden" name="content" value={form.watch('content') || ''} />
          <input type="hidden" name="imageUrl" value={imageUrl || ''} />
          <input
            type="hidden"
            name="categoryIds"
            value={JSON.stringify(form.watch('categoryIds') || [])}
          />
          <input type="hidden" name="title" value={form.watch('title') || ''} />

          {form.formState.errors.root && (
            <p className="p-3 bg-red-100 text-red-700 rounded">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button
            type="submit"
            className="w-full sm:w-auto border-none p-0 m-0"
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update Post'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
