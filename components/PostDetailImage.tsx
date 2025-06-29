'use client';

import { CldImage } from 'next-cloudinary';

interface PostDetailImageProps {
  src: string;
  alt: string;
}

export default function PostDetailImage({ src, alt }: PostDetailImageProps) {
  return (
    <div className="w-full max-h-[500px] rounded-xl overflow-hidden mb-6">
      <CldImage
        src={src}
        alt={alt}
        width={1200}
        height={630}
        className="w-full h-auto object-cover rounded-xl"
        priority
        crop="fill"
        gravity="auto" // auto content-aware cropping
        placeholder="blur"
        blurDataURL="/placeholder.jpg" // optional: custom fallback
      />
    </div>
  );
}
