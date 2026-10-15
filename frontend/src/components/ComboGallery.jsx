import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

const ComboGallery = ({ images = [] }) => {
  const shouldReduceMotion = useReducedMotion();

  const validImages = images.filter(
    (image) => typeof image === "string" && image.trim().length > 0,
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasMultipleImages = validImages.length > 1;
  const activeImage = validImages[activeIndex];

  const handleNext = useCallback(() => {
    if (validImages.length < 2) return;

    setActiveIndex((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const handlePrev = useCallback(() => {
    if (validImages.length < 2) return;

    setActiveIndex(
      (prev) => (prev - 1 + validImages.length) % validImages.length,
    );
  }, [validImages.length]);

  useEffect(() => {
    setActiveIndex(0);
    setLightboxOpen(false);
  }, [images]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        handleNext();
      }

      if (event.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen, handleNext, handlePrev]);

  if (!activeImage) {
    return (
      <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-2xl bg-surface-secondary text-text-muted">
        <span className="font-display text-3xl">Whiff</span>
        <p className="mt-2 text-sm">Fragrance imagery coming soon</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        {/* Main image stage */}
        <div className="group relative overflow-hidden rounded-xl bg-surface-secondary">
          <div className="pointer-events-none absolute inset-3 z-10 rounded-lg border border-white/40 sm:inset-4" />

          <div className="flex aspect-[4/5] items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={`Combo product image ${activeIndex + 1}`}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, scale: 1.025 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.35,
                }}
                className="h-full w-full object-contain p-5 sm:p-8"
              />
            </AnimatePresence>
          </div>

          {/* Image counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-5 left-5 z-20 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-text-primary backdrop-blur-sm">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(validImages.length).padStart(2, "0")}
            </div>
          )}

          {/* Expand */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="View image fullscreen"
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-background/90 text-text-primary shadow-sm transition hover:bg-surface hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <Expand size={17} />
          </button>

          {/* Previous / next */}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-background/90 text-text-primary opacity-100 shadow-sm transition hover:bg-surface hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:opacity-0 sm:group-hover:opacity-100">
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-background/90 text-text-primary opacity-100 shadow-sm transition hover:bg-surface hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:opacity-0 sm:group-hover:opacity-100">
                <ArrowRight size={17} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {hasMultipleImages && (
          <div className="mt-5">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {validImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={activeIndex === index}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border bg-surface-secondary transition sm:h-24 sm:w-24 ${
                    activeIndex === index
                      ? "border-brand ring-1 ring-brand"
                      : "border-border hover:border-brand-muted"
                  }`}>
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="mt-3 text-xs text-text-muted">
          {hasMultipleImages
            ? "Select an image to explore the details."
            : "A closer look at your fragrance pairing."}
        </p>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-dark/95 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen combo image"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setLightboxOpen(false);
              }
            }}>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close fullscreen view"
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
              <X size={21} />
            </button>

            <motion.img
              key={activeImage}
              src={activeImage}
              alt={`Combo product image ${activeIndex + 1}`}
              initial={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 0, scale: 0.98 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              className="max-h-[85vh] max-w-full object-contain"
            />

            {hasMultipleImages && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8">
                  <ArrowLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8">
                  <ArrowRight size={20} />
                </button>

                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-sm">
                  {activeIndex + 1} of {validImages.length}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ComboGallery;
