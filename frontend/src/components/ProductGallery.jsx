import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";

const ProductGallery = ({ images = [] }) => {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const validImages = images.filter(Boolean);
  const hasMultipleImages = validImages.length > 1;
  const activeImage = validImages[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
    setLightboxOpen(false);
  }, [images]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setLightboxOpen(false);

      if (event.key === "ArrowRight" && hasMultipleImages) {
        setActiveIndex((index) => (index + 1) % validImages.length);
      }

      if (event.key === "ArrowLeft" && hasMultipleImages) {
        setActiveIndex(
          (index) => (index - 1 + validImages.length) % validImages.length,
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, hasMultipleImages, validImages.length]);

  const handleNext = () => {
    if (!hasMultipleImages) return;
    setActiveIndex((index) => (index + 1) % validImages.length);
  };

  const handlePrev = () => {
    if (!hasMultipleImages) return;
    setActiveIndex(
      (index) => (index - 1 + validImages.length) % validImages.length,
    );
  };

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center bg-surface-secondary">
        <p className="font-serif text-lg italic text-text-muted">
          Fragrance imagery coming soon
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* Main image stage */}
        <div className="group/gallery relative overflow-hidden bg-surface-secondary">
          <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden sm:aspect-[4/5]">
            {/* Editorial detail */}
            <div className="pointer-events-none absolute inset-5 border border-brand/10 sm:inset-7" />

           

            {/* Active image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={`Product view ${activeIndex + 1}`}
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 1.025 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion ? undefined : { opacity: 0, scale: 0.99 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0 h-full w-full object-contain p-8 sm:p-12 lg:p-14"
                draggable="false"
              />
            </AnimatePresence>

            {/* Image counter */}
            <div className="absolute bottom-7 left-7 z-10 text-[10px] tracking-[0.15em] text-text-secondary">
              <span className="font-medium text-text-primary">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-2 text-brand-muted">/</span>
              {String(validImages.length).padStart(2, "0")}
            </div>

            {/* Expand image */}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="View image fullscreen"
              className="absolute bottom-5 right-5 z-10 flex h-10 w-10 items-center justify-center border border-border/70 bg-background/90 text-text-primary transition-colors hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
              <Expand size={16} strokeWidth={1.4} aria-hidden="true" />
            </button>

            {/* Previous / next controls */}
            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous product image"
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border/60 bg-background/90 text-text-primary transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:left-5">
                  <ArrowLeft size={17} strokeWidth={1.4} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next product image"
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-border/60 bg-background/90 text-text-primary transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:right-5">
                  <ArrowRight size={17} strokeWidth={1.4} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnail selector */}
        {hasMultipleImages && (
          <div className="mt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted">
                Explore the details
              </p>
              <p className="text-[9px] text-text-muted">Select a view</p>
            </div>

            <div
              className="flex gap-3 overflow-x-auto pb-2"
              aria-label="Product image thumbnails">
              {validImages.map((img, index) => {
                const selected = activeIndex === index;

                return (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show product view ${index + 1}`}
                    aria-pressed={selected}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden border bg-surface-secondary transition-all duration-300 sm:h-24 sm:w-24 ${
                      selected
                        ? "border-brand"
                        : "border-border hover:border-brand-muted"
                    }`}>
                    <img
                      src={img}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain p-2"
                    />

                    {selected && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-0.5 bg-brand"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen image viewer */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#211B1A]/95 p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Product image viewer"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxOpen(false);
            }
          }}>
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image viewer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>

          {hasMultipleImages && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10 sm:left-8">
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
          )}

          <img
            src={activeImage}
            alt={`Product view ${activeIndex + 1}`}
            className="max-h-[85vh] max-w-[85vw] object-contain"
          />

          {hasMultipleImages && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/25 text-white transition-colors hover:bg-white/10 sm:right-8">
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          )}

          <p className="absolute bottom-5 text-[10px] uppercase tracking-[0.2em] text-white/65">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(validImages.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </>
  );
};

export default ProductGallery;
