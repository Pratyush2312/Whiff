import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  RefreshCw,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`${URL}/wishlist`, {
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        toast.error("Please log in to view your wishlist.");
        navigate("/account/auth", { replace: true });
        return;
      }

      if (!res.ok) {
        throw new Error(`Wishlist request failed: ${res.status}`);
      }

      const data = await res.json();

      if (data.status === "success") {
        setWishlist(Array.isArray(data.wishlist) ? data.wishlist : []);
        return;
      }

      if (data.status === "empty") {
        setWishlist([]);
        return;
      }

      throw new Error(data.message || "Unable to load wishlist");
    } catch (err) {
      console.error("Wishlist fetch error:", err);
      setError(true);
      toast.error("Couldn't load your wishlist.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const removeFromWishlist = async (perfumeId) => {
    if (!perfumeId || removingId) return;

    setRemovingId(perfumeId);

    try {
      const res = await fetch(`${URL}/wishlist/${perfumeId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.status !== "success") {
        if (data.status === "notfound") {
          toast.error(
            data.message || "This fragrance is no longer in your wishlist.",
          );
          await fetchWishlist();
          return;
        }

        if (res.status === 401 || res.status === 403) {
          toast.error("Please log in to manage your wishlist.");
          navigate("/account/auth", { replace: true });
          return;
        }

        throw new Error(data.message || "Couldn't remove fragrance");
      }

      // Wishlist entries are objects; remove by the nested perfume ID.
      setWishlist((current) =>
        current.filter(
          (item) => String(item.perfume?._id) !== String(perfumeId),
        ),
      );

      toast.success(data.message || "Removed from your wishlist.");
    } catch (err) {
      console.error("Wishlist removal error:", err);
      toast.error("Couldn't remove this fragrance. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleClick = (slug) => {
    if (!slug) {
      toast.error("This fragrance is currently unavailable.");
      return;
    }

    navigate(`/perfume/${encodeURIComponent(slug)}`);
  };

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Editorial heading */}
      <section className="border-b border-border bg-surface-rose/30">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Saved with love
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Your wishlist<span className="text-brand">.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
                The fragrances that caught your attention. Keep your favourites
                close until you're ready to make them yours.
              </p>
            </div>

            {!loading && !error && wishlist.length > 0 && (
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-text-secondary sm:self-auto">
                <Heart size={16} className="text-brand" />
                {wishlist.length}{" "}
                {wishlist.length === 1 ? "favourite" : "favourites"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Wishlist content */}
      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
        {loading ? (
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            aria-label="Loading wishlist"
            aria-busy="true">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-border bg-surface p-4">
                <div className="aspect-[4/4.2] animate-pulse rounded-xl bg-surface-secondary" />
                <div className="mt-5 h-3 w-1/3 animate-pulse rounded bg-surface-secondary" />
                <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-surface-secondary" />
                <div className="mt-5 h-10 animate-pulse rounded-full bg-surface-secondary" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
            <RefreshCw size={28} className="mb-5 text-brand" />
            <h2 className="font-display text-2xl">
              Your favourites are waiting.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
              We couldn't retrieve your saved fragrances. Please try again.
            </p>
            <button
              type="button"
              onClick={fetchWishlist}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-text-inverse transition hover:bg-brand-hover">
              <RefreshCw size={16} />
              Try again
            </button>
          </div>
        ) : wishlist.length === 0 ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-16 text-center sm:py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft/60 text-brand">
              <Heart size={27} strokeWidth={1.5} />
            </div>

            <h2 className="mt-6 font-display text-3xl">Nothing saved. Yet.</h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
              Sometimes the right fragrance takes a little exploring. Discover
              something wonderful and save it here for later.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-text-inverse transition hover:bg-brand-hover">
              <ShoppingBag size={16} />
              Explore fragrances
              <ArrowRight size={16} />
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.07,
                },
              },
            }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence initial={false}>
              {wishlist.map((item, index) => {
                const perfume = item.perfume;
                if (!perfume) return null;

                const perfumeId = perfume._id;
                const isRemoving = String(removingId) === String(perfumeId);

                return (
                  <motion.article
                    key={item._id || perfumeId}
                    layout={!shouldReduceMotion}
                    variants={reveal}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.96, y: 8 }
                    }
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-brand-muted/60 hover:shadow-[0_14px_40px_rgba(41,35,33,0.07)]">
                    {/* Product image */}
                    <button
                      type="button"
                      onClick={() => handleClick(perfume.slug)}
                      aria-label={`View ${perfume.name}`}
                      className="relative block w-full overflow-hidden bg-surface-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand">
                      <div className="aspect-[4/4.2] overflow-hidden">
                        {perfume.image ? (
                          <img
                            src={perfume.image}
                            alt={perfume.name || "Whiff fragrance"}
                            loading={index < 4 ? "eager" : "lazy"}
                            className="h-full w-full object-contain p-7 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Sparkles size={32} className="text-brand-muted" />
                          </div>
                        )}
                      </div>

                      <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-background/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-primary backdrop-blur-sm">
                        Saved favourite
                      </span>

                      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-primary opacity-100 shadow-sm transition duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                        <ArrowUpRight size={18} />
                      </span>
                    </button>

                    {/* Product details */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                        Whiff fragrance
                      </p>

                      <h2 className="mt-2 font-display text-xl leading-snug">
                        {perfume.name}
                      </h2>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-lg font-medium tabular-nums">
                          ₹{perfume.price}
                        </p>
                        <Heart
                          size={17}
                          className="shrink-0 fill-brand-soft text-brand"
                        />
                      </div>

                      <button
                        type="button"
                        disabled={isRemoving}
                        onClick={() => removeFromWishlist(perfumeId)}
                        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border-strong px-4 py-3 text-sm font-medium text-text-secondary transition hover:border-error hover:bg-error/5 hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                        {isRemoving ? (
                          <RefreshCw size={15} className="animate-spin" />
                        ) : (
                          <Trash2 size={15} />
                        )}
                        {isRemoving ? "Removing..." : "Remove favourite"}
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </main>
  );
};

export default Wishlist;
