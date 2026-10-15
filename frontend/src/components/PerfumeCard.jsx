import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

import ProductGallery from "./ProductGallery";
import WhyChooseWhiff from "./WhyChooseWhiff";
import Footer from "./Footer";

const URL = import.meta.env.VITE_BACKEND_URL;

const priceByVolume = {
  "10ml": 199,
  "30ml": 299,
};

const easeLuxury = [0.22, 1, 0.36, 1];

const PerfumeCard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [perfume, setPerfume] = useState(null);
  const [volume, setVolume] = useState("10ml");
  const [cart, setCart] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const basePrice = priceByVolume[volume];
  const finalPrice = hasDiscount ? Math.round(basePrice * 0.9) : basePrice;

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch(`${URL}/account/profile`, {
        credentials: "include",
      });

      if (!response.ok) return;

      const data = await response.json();
      const user = data.user ?? data;

      setHasDiscount(user.isFirstLogin === true);
    } catch (error) {
      console.error("Profile fetch failed:", error);
    }
  }, []);

  const fetchPerfume = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    setPerfume(null);

    try {
      const response = await fetch(
        `${URL}/perfumes/${encodeURIComponent(slug)}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch perfume: ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.status === "error" || !data._id) {
        throw new Error("Perfume not found");
      }

      setPerfume(data);
    } catch (error) {
      console.error("Perfume fetch failed:", error);
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch(`${URL}/cart`, {
        credentials: "include",
      });

      if (!response.ok) return;

      const data = await response.json();

      if (Array.isArray(data.cart)) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Cart fetch failed:", error);
    }
  }, []);

  useEffect(() => {
    fetchPerfume();
    fetchProfile();
    fetchCart();
  }, [fetchPerfume, fetchProfile, fetchCart]);

  const cartItem = useMemo(() => {
    if (!perfume) return undefined;

    return cart.find((item) => {
      const itemId = item.item?._id ?? item.item;

      return (
        item.itemType === "Perfume" &&
        String(itemId) === String(perfume._id) &&
        String(item.volume).trim().toLowerCase() === volume.toLowerCase()
      );
    });
  }, [cart, perfume, volume]);

  const addToCart = async () => {
    if (!perfume || addingToCart) return;

    setAddingToCart(true);

    try {
      const response = await fetch(`${URL}/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: perfume._id,
          itemType: "Perfume",
          volume,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.status === "error") {
        toast.error(
          data.message ||
            (response.status === 401
              ? "Please sign in to add items to your cart."
              : "Unable to add this fragrance to your cart."),
        );
        return;
      }

      if (data.status === "added") {
        toast.success(data.message || "Added to your bag.");
        await fetchCart();
      } else {
        toast.error(data.message || "Unable to add this fragrance.");
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Connection error. Please try again.");
    } finally {
      setAddingToCart(false);
    }
  };

  const removeFromCart = async () => {
    if (!cartItem || cartLoading) return;

    setCartLoading(true);

    try {
      const response = await fetch(`${URL}/cart/remove/${cartItem._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        toast.error(data.message || "Unable to remove this item.");
        return;
      }

      toast.success("Removed from your bag.");
      await fetchCart();
    } catch (error) {
      console.error("Remove from cart failed:", error);
      toast.error("Connection error. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.75,
            delay,
            ease: easeLuxury,
          },
        };

  // Loading state
  if (loading) {
    return (
      <main
        className="min-h-[70vh] bg-background px-6 py-16 sm:px-10 lg:px-16"
        aria-busy="true"
        aria-label="Loading fragrance">
        <div className="mx-auto grid max-w-[1440px] animate-pulse grid-cols-1 gap-10 md:grid-cols-2 lg:gap-20">
          <div className="aspect-[4/5] bg-surface-secondary" />
          <div className="flex flex-col justify-center gap-5">
            <div className="h-3 w-32 bg-surface-secondary" />
            <div className="h-12 w-4/5 bg-surface-secondary" />
            <div className="h-4 w-1/2 bg-surface-secondary" />
            <div className="mt-6 h-24 bg-surface-secondary" />
            <div className="mt-4 h-14 bg-surface-secondary" />
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (loadError || !perfume) {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center bg-background px-6 text-center">
        <Sparkles
          size={28}
          strokeWidth={1.2}
          className="text-brand-muted"
          aria-hidden="true"
        />
        <h1 className="mt-6 font-serif text-3xl text-text-primary">
          This fragrance is elusive.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
          We couldn't find this fragrance right now. Let's return to the
          collection and find another scent.
        </p>

        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="mt-7 inline-flex items-center gap-3 bg-surface-dark px-6 py-4 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <ArrowLeft size={15} aria-hidden="true" />
          Return to collection
        </button>
      </main>
    );
  }

  const images = [perfume.image, perfume.front, perfume.back].filter(Boolean);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-text-primary">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1600px] px-5 pt-6 sm:px-10 lg:px-16">
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
          <ArrowLeft
            size={14}
            className="transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          Back to the collection
        </button>
      </div>

      {/* Product experience */}
      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 pb-20 pt-8 sm:px-10 sm:pb-28 sm:pt-10 md:grid-cols-2 md:items-start lg:gap-20 lg:px-16 lg:pb-36">
        {/* Product gallery */}
        <motion.div {...reveal()} className="min-w-0">
          <div className="relative overflow-hidden bg-surface-secondary">
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-brand sm:left-7 sm:top-7">
              <Sparkles size={13} strokeWidth={1.3} aria-hidden="true" />
              The Whiff collection
            </div>

            <ProductGallery images={images} />
          </div>

          <p className="mt-4 text-center text-[9px] uppercase tracking-[0.2em] text-text-muted">
            Discover the details. Find your signature.
          </p>
        </motion.div>

        {/* Product information */}
        <motion.div
          {...reveal(0.12)}
          className="flex min-w-0 flex-col md:sticky md:top-32 md:pt-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-brand">
            A fragrance by Whiff
          </p>

          <h1 className="mt-5 font-serif text-[clamp(2.75rem,5vw,5rem)] font-normal leading-[0.98] tracking-[-0.055em] text-text-primary">
            {perfume.name}
          </h1>

          {perfume.description && (
            <p className="mt-6 max-w-xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              {perfume.description}
            </p>
          )}

          {perfume.byWhiff && (
            <blockquote className="mt-7 border-l border-brand-muted pl-5 font-serif text-lg italic leading-7 text-brand sm:text-xl">
              “{perfume.byWhiff}”
            </blockquote>
          )}

          <div className="my-8 h-px w-full bg-border" />

          {/* Price */}
          <div aria-live="polite">
            <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted">
              Your selection
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="font-serif text-3xl text-text-primary sm:text-4xl">
                ₹{finalPrice}
              </span>

              {hasDiscount && (
                <>
                  <span className="text-sm text-text-muted line-through">
                    ₹{basePrice}
                  </span>

                  <span className="inline-flex items-center gap-1 bg-[#E4EDE4] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#47765A]">
                    <Sparkles size={12} aria-hidden="true" />
                    10% off
                  </span>
                </>
              )}
            </div>

            {hasDiscount && (
              <p className="mt-2 text-xs text-text-secondary">
                Your first-order discount has been applied.
              </p>
            )}
          </div>

          {/* Volume selector */}
          <fieldset className="mt-9">
            <legend className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-primary">
              Choose your size
            </legend>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {Object.keys(priceByVolume).map((size) => {
                const selected = volume === size;

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setVolume(size)}
                    aria-pressed={selected}
                    className={`relative flex min-h-[76px] items-center justify-between border px-4 py-4 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                      selected
                        ? "border-brand bg-surface-rose"
                        : "border-border bg-surface hover:border-brand-muted"
                    }`}>
                    <span>
                      <span className="block font-serif text-lg">{size}</span>
                      <span className="mt-1 block text-[10px] text-text-secondary">
                        ₹
                        {hasDiscount
                          ? Math.round(priceByVolume[size] * 0.9)
                          : priceByVolume[size]}
                      </span>
                    </span>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        selected
                          ? "border-brand bg-brand text-white"
                          : "border-border text-transparent"
                      }`}>
                      <Check size={12} aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Cart action */}
          <div className="mt-8">
            <button
              type="button"
              onClick={cartItem ? removeFromCart : addToCart}
              disabled={addingToCart || cartLoading}
              className={`group flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60 ${
                cartItem
                  ? "border border-border bg-surface text-text-primary hover:border-brand hover:text-brand"
                  : "bg-surface-dark text-white hover:bg-brand"
              }`}>
              <span className="inline-flex items-center gap-3">
                <ShoppingBag size={17} strokeWidth={1.5} aria-hidden="true" />
                {addingToCart
                  ? "Adding to bag..."
                  : cartLoading
                    ? "Updating bag..."
                    : cartItem
                      ? "Remove from bag"
                      : "Add to bag"}
              </span>

              <span className="flex items-center gap-2">
                ₹{finalPrice}
                {!cartItem && (
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-text-muted">
              <Check size={13} aria-hidden="true" />A considered choice, made
              just for you.
            </div>
          </div>

          {/* Product notes */}
          <div className="mt-10 border-t border-border">
            <div className="flex items-center justify-between gap-4 border-b border-border py-5">
              <span className="text-[10px] uppercase tracking-[0.16em] text-text-secondary">
                Collection
              </span>
              <span className="text-sm text-text-primary">Whiff</span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-border py-5">
              <span className="text-[10px] uppercase tracking-[0.16em] text-text-secondary">
                Selected volume
              </span>
              <span className="text-sm text-text-primary">{volume}</span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-border py-5">
              <span className="text-[10px] uppercase tracking-[0.16em] text-text-secondary">
                Your fragrance
              </span>
              <span className="text-right text-sm text-text-primary">
                {perfume.name}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="group mt-7 inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            Continue exploring
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </motion.div>
      </section>

      {/* Brand story */}
      <WhyChooseWhiff />

      <Footer />
    </main>
  );
};

export default PerfumeCard;
