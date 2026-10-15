import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  Heart,
  ArrowUpRight,
  Sparkles,
  Trash2,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const WishlistSection = () => {
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const fetchWishlist = useCallback(async () => {
    try {
      setError(false);

      const res = await fetch(`${URL}/wishlist`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to load your wishlist.");
      }

      if (data.status === "success") {
        setWishList(Array.isArray(data.wishlist) ? data.wishlist : []);
      } else if (data.status === "empty") {
        setWishList([]);
      } else {
        throw new Error(data.message || "Unable to load your wishlist.");
      }
    } catch (err) {
      console.error("Wishlist fetch failed:", err);
      setError(true);
      toast.error(err.message || "Error connecting to the server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleClick = (slug) => {
    if (!slug) {
      toast.error("This perfume is currently unavailable.");
      return;
    }

    navigate(`/perfume/${encodeURIComponent(slug)}`);
  };

  const removeFromWishlist = async (perfumeId) => {
    if (!perfumeId || removingId) return;

    setRemovingId(perfumeId);

    try {
      const res = await fetch(
        `${URL}/wishlist/${encodeURIComponent(perfumeId)}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (data.status === "success") {
        setWishList((previous) =>
          previous.filter(
            (item) => String(item.perfume?._id) !== String(perfumeId),
          ),
        );

        toast.success(data.message || "Removed from your wishlist");
      } else if (data.status === "notfound") {
        toast.error(data.message || "Wishlist item not found");
        await fetchWishlist();
      } else {
        toast.error(data.message || "Could not remove this perfume");
      }
    } catch (err) {
      console.error("Wishlist removal failed:", err);
      toast.error("Error connecting to the server");
    } finally {
      setRemovingId(null);
    }
  };

  const itemCount = wishList.length;

  if (loading) {
    return (
      <section className="min-w-0 flex-1 bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="mb-8 h-9 w-48 rounded bg-surface-secondary" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-border bg-surface p-4">
                <div className="aspect-[4/5] rounded-xl bg-surface-secondary" />
                <div className="mt-5 h-4 w-2/3 rounded bg-surface-secondary" />
                <div className="mt-3 h-4 w-1/3 rounded bg-surface-secondary" />
                <div className="mt-5 h-10 rounded-full bg-surface-secondary" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && wishList.length === 0) {
    return (
      <section className="flex min-h-[400px] min-w-0 flex-1 items-center justify-center bg-background px-5 py-12 text-text-primary">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-rose text-brand">
            <RefreshCw size={25} strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-3xl">A little pause.</h2>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            We couldn't retrieve your saved fragrances right now. Please try
            again in a moment.
          </p>

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              fetchWishlist();
            }}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-text-inverse transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (itemCount === 0) {
    return (
      <section className="flex min-h-[420px] min-w-0 flex-1 items-center justify-center bg-background px-5 py-12 text-text-primary">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md text-center">
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-rose">
            <Heart size={38} strokeWidth={1.2} className="text-brand" />
            <Sparkles
              size={17}
              className="absolute right-2 top-2 text-accent"
            />
          </div>

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand">
            Your personal collection
          </p>

          <h2 className="font-display text-3xl sm:text-4xl">
            Nothing saved. Yet.
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-text-secondary">
            Every signature scent starts somewhere. Save the fragrances you love
            and keep your favourites close.
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand px-7 py-3 text-sm font-medium text-text-inverse transition duration-300 hover:-translate-y-0.5 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            <ShoppingBag size={17} />
            Explore fragrances
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-w-0 flex-1 bg-background px-4 py-6 text-text-primary sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Editorial heading */}
        <div className="mb-8 border-b border-border pb-6 sm:mb-10 sm:pb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand">
            <Heart size={15} strokeWidth={1.6} />
            <span>Saved with love</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                Your wishlist<span className="text-brand">.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
                The fragrances that caught your attention. Your next favourite
                might be right here.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-text-secondary">
              <Heart size={14} className="text-brand" />
              {itemCount} {itemCount === 1 ? "fragrance" : "fragrances"}
            </span>
          </div>
        </div>

        {/* Saved products */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {wishList.map((item, index) => {
            const perfume = item.perfume;

            if (!perfume) return null;

            const isRemoving = String(removingId) === String(perfume._id);

            return (
              <motion.article
                key={item._id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
                }}
                className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:border-brand-muted hover:shadow-[0_16px_40px_rgba(41,35,33,0.07)]">
                {/* Product image */}
                <button
                  type="button"
                  onClick={() => handleClick(perfume.slug)}
                  aria-label={`View ${perfume.name}`}
                  className="relative block w-full overflow-hidden bg-surface-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand">
                  <div className="aspect-[4/4.5] overflow-hidden">
                    {perfume.image ? (
                      <img
                        src={perfume.image}
                        alt={perfume.name || "Saved perfume"}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-text-muted">
                        <Sparkles size={32} strokeWidth={1.2} />
                      </div>
                    )}
                  </div>

                  <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-surface/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-brand backdrop-blur-sm">
                    <Heart size={12} fill="currentColor" />
                    Saved
                  </div>

                  <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text-primary shadow-md transition duration-300 group-hover:bg-brand group-hover:text-text-inverse">
                    <ArrowUpRight size={18} />
                  </div>
                </button>

                {/* Product details */}
                <div className="p-4 sm:p-5">
                  <h2 className="truncate font-display text-xl sm:text-2xl">
                    {perfume.name || "Untitled fragrance"}
                  </h2>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(perfume._id)}
                      disabled={isRemoving || Boolean(removingId)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-xs font-medium text-text-secondary transition hover:bg-surface-rose hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                      <Trash2 size={14} />
                      {isRemoving ? "Removing…" : "Remove"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleClick(perfume.slug)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand px-4 text-xs font-medium text-text-inverse transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                      Discover
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Browse more */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface-secondary/60 p-5 text-center sm:flex-row sm:p-6 sm:text-left">
          <div>
            <h3 className="font-display text-xl">
              Still searching for the one?
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              There are more stories waiting to be discovered.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-brand px-5 py-3 text-sm font-medium text-brand transition hover:bg-brand hover:text-text-inverse focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            Explore the collection
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WishlistSection;
