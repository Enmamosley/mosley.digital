import React, { useState, useRef } from "react";

interface Props {
  images: string[];
  alt: string;
}

const WorkGallery: React.FC<Props> = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    if (index === current) return;
    setCurrent(index);
    setAnimKey((k) => k + 1);
    const thumbs = thumbsRef.current;
    if (thumbs) {
      const thumb = thumbs.children[index] as HTMLElement;
      if (thumb) thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  };

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = () => goTo((current + 1) % images.length);

  return (
    <>
      <div className="flex flex-col gap-4">

        {/* Main image — fixed height container */}
        <div className="relative rounded-3xl overflow-hidden bg-dark/5 group h-64 sm:h-80 lg:h-[480px]">
          <img
            key={animKey}
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            className="gallery-image-active w-full h-full object-contain"
          />

          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
          >
            <svg className="w-5 h-5 text-text-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
          >
            <svg className="w-5 h-5 text-text-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Bottom bar: counter */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
              {current + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Thumbnails strip */}
        <div ref={thumbsRef} className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === current
                  ? "border-primary opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img src={img} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

      </div>

    </>
  );
};

export default WorkGallery;
