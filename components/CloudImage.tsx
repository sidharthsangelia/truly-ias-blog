// components/CloudImage.tsx
'use client';

import { CldImage } from 'next-cloudinary';

export default function CloudImage({
  src,
  alt,
  width = 800,
  height = 400,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="relative w-full h-48 rounded-t-md overflow-hidden">
      <CldImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        crop="fill"
        gravity="auto"
        className="object-cover w-full h-full"
        priority
      />
    </div>
  );
}
