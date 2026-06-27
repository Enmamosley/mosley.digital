import React, { useState, useRef, useEffect } from "react";

interface Props {
  images: string[];
  alt: string;
}

const WorkGallery: React.FC<Props> = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [lightbox, setLightbox] = useState(false);
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

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") goTo((current + 1) % images.length);
      if (e.key === "ArrowLeft") goTo((current - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, current, images.length]);

  return (
    <>
      <div className="flex flex-col gap-4">

        {/* Main image — fixed height container */}
        <div className="relative rounded-3xl overflow-hidden bg-dark/5 group" style={{ height: "480px" }}>
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

          {/* Bottom bar: counter + expand */}
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
            <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
              {current + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightbox(true)}
              aria-label="Ver en grande"
              className="bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 hover:bg-black/60 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              Ver en grande
            </button>
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            aria-label="Cerrar"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image */}
          <img
            key={`lb-${animKey}`}
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            className="gallery-image-active max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {current + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkGallery;
