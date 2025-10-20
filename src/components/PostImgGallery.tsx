"use client";
import { useState } from "react";
import Image from "next/image";

type PostImageGalleryProps = {
  images: string[];  
};

export default function PostImageGallery({images}: PostImageGalleryProps){

    if(!images || images.length === 0)return null;

    //Limiting images to 4 for preview
    const displayImages = images.slice(0,4);
    const hasOverflow = images.length > 4;

    const [scrollIndex, setScrollIndex] = useState(0);

    const handleNext = () => {
      if (scrollIndex < images.length - 4) setScrollIndex(scrollIndex + 1);
    };
    const handlePrev = () => {
      if (scrollIndex > 0) setScrollIndex(scrollIndex - 1)
    };
  const visibleImages = hasOverflow ? images.slice(scrollIndex, scrollIndex + 4) : displayImages;

  return(
    <div className="relative w-full max-w-lg mx-auto">
      <div
      className={`grid gap-1 ${
        visibleImages.length === 1
        ? "grid-cols-1"
        :visibleImages.length === 2
        ? "grid-cols-2"
        : "grid-cols-2"
      }`}
      >
        {visibleImages.map((src, i) => (
          <div
            key={i}
            className="relative w-[150px] h-[150px] overflow-hidden rounded-md"
            onClick={() => alert(`Clicked image`)}
            >
              <Image
              src={src}
              alt={`Post image ${i+1}`}
              fill
              className="object-cover hover:opacity-90 transition"
              />
              </div>
        ))}
      </div>

      {hasOverflow && (
        <div className="flex justify-between mt-2">
          <button
            onClick={handlePrev}
            disabled={scrollIndex === 0}
            className="px-2 py-1 text-sm bg-gray-200 rounded disabled:opacity-50"
            >
               &lt
            </button>
            <button
              onClick={handleNext}
              disabled={scrollIndex >= images.length -4}
              className="px-2 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
              >
                &gt
              </button>
              </div>
      )}
    </div>
  );

}