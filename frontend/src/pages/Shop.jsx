import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Heart,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const easeLuxury = [0.22, 1, 0.36, 1];

const Shop = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [perfumes, setPerfumes] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [wishlistBusy, setWishlistBusy] = useState([]);

  const fetchPerfume = useCallback(async () => {
    setLoading(true);
    setLoadError(false);

    try {
      const response = await fetch(`${URL}/perfumes`);

      if (!response.ok) {
        throw new Error("Failed to fetch perfumes");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected perfume response");
      }

      setPerfumes(data);
    } catch (error) {
      console.error("Failed to load perfumes:", error);
      setLoadError(true);
      toast.error("We couldn't load the collection.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWishlist = useCallback(async () => {
    setWishlistLoading(true);

    try {
      const response = await fetch(`${URL}/wishlist`, {
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status !== 401) {
          console.error("Wishlist request failed:", response.status);
        }
        return;
      }

      const data = await response.json();

      if (data.status === "success" && Array.isArray(data.wishlist)) {
        const ids = data.wishlist
          .map((item) => item.perfume?._id)
          .filter(Boolean)
          .map(String);

        setWishList(ids);
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setWishlistLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPerfume();
    fetchWishlist();
  }, [fetchPerfume, fetchWishlist]);

  const handleClick = (slug) => {
    if (slug) {
      navigate(`/perfume/${encodeURIComponent(slug)}`);
    }
  };

  const toggleWishlist = async (event, perfumeId) => {
    event.stopPropagation();

    const id = String(perfumeId);

    if (wishlistBusy.includes(id)) return;

    setWishlistBusy((previous) => [...previous, id]);

    const isWishlisted = wishList.includes(id);

    try {
      const response = await fetch(
        isWishlisted ? `${URL}/wishlist/${id}` : `${URL}/wishlist/add`,
        {
          method: isWishlisted ? "DELETE" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ perfumeId: id }),
        },
      );

      const data = await response.json();

      if (!response.ok || data.status === "duplicate") {
        toast.error(
          data.message ||
            (response.status === 401
              ? "Please sign in to manage your wishlist."
              : "Unable to update your wishlist."),
        );
        return;
      }

      if (data.status === "notfound") {
        toast.error(data.message || "Item not found in your wishlist.");
        return;
      }

      if (data.status !== "success") {
        toast.error(data.message || "Unable to update your wishlist.");
        return;
      }

      setWishList((previous) =>
        isWishlisted
          ? previous.filter((itemId) => itemId !== id)
          : previous.includes(id)
            ? previous
            : [...previous, id],
      );

      toast.success(
        data.message ||
          (isWishlisted ? "Removed from wishlist" : "Added to wishlist"),
      );
    } catch (error) {
      console.error("Wishlist update failed:", error);
      toast.error("Unable to connect. Please try again.");
    } finally {
      setWishlistBusy((previous) => previous.filter((itemId) => itemId !== id));
    }
  };

  const activePerfumes = perfumes.filter((perfume) => perfume.isActive);

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.12 },
          transition: {
            duration: 0.7,
            delay,
            ease: easeLuxury,
          },
        };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-text-primary">
      {/* Editorial shop introduction */}
      <section className="relative overflow-hidden bg-surface-rose">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-brand/10 sm:-right-10 sm:-top-48 sm:h-[480px] sm:w-[480px]"
        />

        <div className="relative mx-auto grid min-h-[350px] max-w-[1600px] grid-cols-1 items-center gap-8 px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[420px] lg:grid-cols-[1fr_auto] lg:px-16 lg:py-24">
          <motion.div {...reveal()}>
            <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-brand sm:text-xs">
              <span className="h-px w-10 bg-brand-muted" />
              The Whiff fragrance wardrobe
            </p>

            <h1 className="max-w-4xl font-serif text-[clamp(3.25rem,8vw,7rem)] font-normal leading-[0.9] tracking-[-0.06em]">
              Find the scent
              <br />
              <span className="italic text-brand">that feels like you.</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Explore fragrances for every mood, every moment, and every version
              of yourself.
            </p>
          </motion.div>

          <motion.div
            {...reveal(0.15)}
            className="hidden items-center gap-3 lg:flex">
            <Sparkles
              size={17}
              strokeWidth={1.3}
              className="text-brand"
              aria-hidden="true"
            />
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand">
              Made for your moments
            </span>
          </motion.div>

          <button
            type="button"
            onClick={() =>
              document.getElementById("fragrance-grid")?.scrollIntoView({
                behavior: shouldReduceMotion ? "auto" : "smooth",
                block: "start",
              })
            }
            className="absolute bottom-5 right-6 hidden items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-brand/80 transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:flex sm:right-10 lg:right-16">
            Explore collection
            <ArrowDown size={14} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* Collection */}
      <section
        id="fragrance-grid"
        className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          {/* Collection heading and count */}
          <motion.div
            {...reveal()}
            className="mb-9 flex flex-col gap-4 border-b border-border pb-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[9px] uppercase tracking-[0.24em] text-brand">
                Discover your next signature
              </p>

              <h2 className="font-serif text-3xl font-normal tracking-[-0.04em] sm:text-4xl">
                The collection
              </h2>
            </div>

            <p className="text-xs tracking-wide text-text-secondary">
              {loading
                ? "Curating your collection..."
                : `${activePerfumes.length} ${
                    activePerfumes.length === 1 ? "fragrance" : "fragrances"
                  }`}
            </p>
          </motion.div>

          {/* Loading state */}
          {loading ? (
            <div
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4"
              aria-label="Loading perfumes"
              aria-busy="true">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[4/5] bg-surface-secondary" />
                  <div className="mt-5 h-3 w-3/4 bg-surface-secondary" />
                  <div className="mt-3 h-3 w-1/2 bg-surface-secondary" />
                </div>
              ))}
            </div>
          ) : loadError ? (
            /* Error state */
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <p className="font-serif text-2xl">The collection is resting.</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">
                We couldn't load the fragrances just now. Please try again.
              </p>

              <button
                type="button"
                onClick={fetchPerfume}
                className="mt-6 inline-flex items-center gap-2 bg-surface-dark px-5 py-3 text-xs uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                <RefreshCw size={14} aria-hidden="true" />
                Try again
              </button>
            </div>
          ) : activePerfumes.length === 0 ? (
            /* Empty state */
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <Sparkles
                size={26}
                strokeWidth={1.2}
                className="text-brand-muted"
                aria-hidden="true"
              />
              <h3 className="mt-5 font-serif text-2xl">
                Something beautiful is on its way.
              </h3>
              <p className="mt-3 text-sm text-text-secondary">
                Our fragrance collection will be available here soon.
              </p>
            </div>
          ) : (
            /* Product grid */
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16 xl:grid-cols-4">
              {activePerfumes.map((perfume, index) => {
                const id = String(perfume._id);
                const isWishlisted = wishList.includes(id);
                const isBusy = wishlistBusy.includes(id);

                return (
                  <motion.article
                    key={perfume._id}
                    {...reveal((index % 4) * 0.07)}
                    className="group min-w-0">
                    {/* Product image */}
                    <div className="relative overflow-hidden bg-surface-secondary">
                      <button
                        type="button"
                        onClick={() => handleClick(perfume.slug)}
                        aria-label={`View ${perfume.name}`}
                        className="block aspect-[4/5] w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-brand">
                        {perfume.image ? (
                          <motion.img
                            src={perfume.image}
                            alt={perfume.name}
                            loading={index < 4 ? "eager" : "lazy"}
                            initial={false}
                            whileHover={
                              shouldReduceMotion ? undefined : { scale: 1.045 }
                            }
                            transition={{
                              duration: 0.8,
                              ease: easeLuxury,
                            }}
                            className="h-full w-full object-contain p-5 mix-blend-multiply sm:p-7"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center px-4 text-center">
                            <span className="font-serif text-lg italic text-text-muted">
                              {perfume.name}
                            </span>
                          </div>
                        )}
                      </button>

                      {/* Wishlist control */}
                      <button
                        type="button"
                        onClick={(event) => toggleWishlist(event, perfume._id)}
                        disabled={isBusy || wishlistLoading}
                        aria-label={
                          isWishlisted
                            ? `Remove ${perfume.name} from wishlist`
                            : `Add ${perfume.name} to wishlist`
                        }
                        aria-pressed={isWishlisted}
                        className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/90 backdrop-blur-sm transition-all duration-300 hover:border-brand hover:text-brand disabled:cursor-wait disabled:opacity-60 sm:right-4 sm:top-4 ${
                          isWishlisted ? "text-brand" : "text-text-primary"
                        }`}>
                        <Heart
                          size={18}
                          strokeWidth={1.5}
                          fill={isWishlisted ? "currentColor" : "none"}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Hover discovery link */}
                      <button
                        type="button"
                        onClick={() => handleClick(perfume.slug)}
                        className="absolute bottom-3 left-3 right-3 hidden items-center justify-between bg-background/95 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-text-primary opacity-0 transition-all duration-300 hover:bg-white group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand sm:flex">
                        Discover fragrance
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Product details */}
                    <button
                      type="button"
                      onClick={() => handleClick(perfume.slug)}
                      className="mt-4 block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:mt-5">
                      <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-brand-muted">
                        WHIFF / FRAGRANCE
                      </p>

                      <h3 className="font-serif text-base font-normal leading-snug text-text-primary transition-colors duration-300 group-hover:text-brand sm:text-xl">
                        {perfume.name}
                      </h3>

                      <p className="mt-2 text-xs text-text-secondary">
                        Discover your next signature.
                      </p>
                    </button>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Collection closing note */}
          {!loading && !loadError && activePerfumes.length > 0 && (
            <motion.div
              {...reveal()}
              className="mt-16 flex flex-col items-center border-t border-border pt-10 text-center sm:mt-24 sm:pt-14">
              <span className="mb-5 h-10 w-px bg-brand-muted" />
              <p className="font-serif text-xl italic text-text-primary sm:text-2xl">
                Find the fragrance that feels like you.
              </p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-text-muted">
                The Whiff collection
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Shop;
