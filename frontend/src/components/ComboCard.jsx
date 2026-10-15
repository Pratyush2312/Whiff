import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Heart,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";

import WhyChooseWhiff from "./WhyChooseWhiff";
import ComboGallery from "./ComboGallery";
import Footer from "./Footer";

const URL = import.meta.env.VITE_BACKEND_URL;

const ComboCard = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const [combo, setCombo] = useState(null);
  const [cart, setCart] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const basePrice = Number(combo?.price) || 0;

  const finalPrice = hasDiscount ? Math.round(basePrice * 0.9) : basePrice;

  const images = useMemo(() => [combo?.image].filter(Boolean), [combo?.image]);

  const cartItem = useMemo(() => {
    if (!combo?._id || !Array.isArray(cart)) return null;

    return (
      cart.find(
        (item) =>
          String(item.item?._id ?? item.item) === String(combo._id) &&
          item.itemType === "Combo",
      ) ?? null
    );
  }, [cart, combo?._id]);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${URL}/account/profile`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const user = await res.json();
      setHasDiscount(user.isFirstLogin === true);
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  }, []);

  const fetchCombo = useCallback(async () => {
    setLoading(true);
    setPageError(false);
    setCombo(null);

    try {
      const res = await fetch(`${URL}/combos/${encodeURIComponent(slug)}`);

      if (!res.ok) {
        throw new Error(`Failed to load combo: ${res.status}`);
      }

      const data = await res.json();

      if (!data || !data._id) {
        throw new Error("Invalid combo response");
      }

      setCombo(data);
    } catch (err) {
      console.error("Combo fetch error:", err);
      setPageError(true);
      toast.error("Couldn't load this fragrance combo.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(`${URL}/cart`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (err) {
      console.error("Cart fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchCombo();
    fetchProfile();
    fetchCart();
  }, [fetchCombo, fetchProfile, fetchCart]);

  const addToCart = async () => {
    if (!combo?._id || cartLoading) return;

    setCartLoading(true);

    try {
      const res = await fetch(`${URL}/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: combo._id,
          itemType: "Combo",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          toast.error("Please log in to add this combo to your cart.");
        } else {
          toast.error(data.message || "Couldn't add this combo to your cart.");
        }
        return;
      }

      if (data.status === "added") {
        toast.success("Your combo is in the bag!");
        await fetchCart();
      } else {
        toast.error(data.message || "Couldn't add this combo to your cart.");
      }
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async () => {
    if (!cartItem?._id || cartLoading) return;

    setCartLoading(true);

    try {
      const res = await fetch(`${URL}/cart/remove/${cartItem._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Couldn't remove combo from cart");
      }

      toast.success("Combo removed from your bag.");
      await fetchCart();
    } catch (err) {
      console.error("Remove from cart error:", err);
      toast.error("Couldn't remove this combo. Please try again.");
    } finally {
      setCartLoading(false);
    }
  };

  const handleCartAction = () => {
    if (cartItem) {
      removeFromCart();
    } else {
      addToCart();
    }
  };

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background px-5 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-2 md:gap-16">
          <div className="aspect-[4/5] animate-pulse rounded-2xl bg-surface-secondary" />
          <div className="flex flex-col gap-5 py-4">
            <div className="h-3 w-32 animate-pulse rounded bg-surface-secondary" />
            <div className="h-10 w-4/5 animate-pulse rounded bg-surface-secondary" />
            <div className="h-8 w-28 animate-pulse rounded bg-surface-secondary" />
            <div className="mt-5 h-20 animate-pulse rounded bg-surface-secondary" />
            <div className="mt-6 h-14 animate-pulse rounded-full bg-surface-secondary" />
          </div>
        </div>
      </main>
    );
  }

  if (pageError || !combo) {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center bg-background px-5 text-center">
        <Sparkles size={30} className="mb-5 text-brand" />
        <h1 className="font-display text-3xl">This scent has gone quiet.</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
          We couldn't find this combo right now. Head back to the collection or
          give it another try.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate("/combos")}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm transition hover:border-brand hover:text-brand">
            <ArrowLeft size={16} />
            All combos
          </button>
          <button
            onClick={fetchCombo}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm text-text-inverse transition hover:bg-brand-hover">
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-text-primary">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-[1440px] px-5 pt-7 sm:px-8 lg:px-16">
        <button
          onClick={() => navigate("/combos")}
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand">
          <ArrowLeft size={16} />
          Back to the collection
        </button>
      </div>

      {/* Product detail */}
      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-2 md:gap-12 lg:gap-20 lg:px-16 lg:py-16">
        {/* Gallery */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={reveal}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
          className="min-w-0">
          <div className="relative overflow-hidden rounded-2xl bg-surface-rose/40 p-3 sm:p-5">
            <span className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/50 bg-background/90 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm">
              <Sparkles size={13} className="text-accent" />
              The Whiff edit
            </span>
            <ComboGallery images={images} />
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-surface p-4 sm:p-5">
            <PackageCheck className="mt-0.5 shrink-0 text-brand" size={20} />
            <div>
              <p className="text-sm font-medium">A considered pairing</p>
              <p className="mt-1 text-xs leading-5 text-text-secondary">
                Discover a combination curated for your fragrance wardrobe.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Product information */}
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={reveal}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.7,
            delay: shouldReduceMotion ? 0 : 0.12,
          }}
          className="flex min-w-0 flex-col pt-2 md:pt-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Fragrance pairing
            </span>
          </div>

          <h1 className="font-display text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            {combo.name}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-8 text-text-secondary">
            {combo.desc ||
              "Two fragrances, one considered collection. Find a pairing that feels like you."}
          </p>

          {/* Price */}
          <div className="mt-8 border-y border-border py-6">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {hasDiscount && (
                <span className="text-base text-text-muted line-through">
                  ₹{basePrice}
                </span>
              )}

              <span className="font-display text-3xl">₹{finalPrice}</span>

              {hasDiscount && (
                <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                  <Sparkles size={13} />
                  10% off
                </span>
              )}
            </div>

            <p className="mt-2 text-xs leading-5 text-text-muted">
              {hasDiscount
                ? "Your first-order offer has been applied."
                : "A little luxury, thoughtfully priced."}
            </p>
          </div>

          {/* Volume */}
          {combo.volume && (
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Volume
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand bg-surface-rose/40 px-5 py-3 text-sm font-medium">
                <Check size={15} className="text-brand" />
                {combo.volume}
              </span>
            </div>
          )}

          {/* Cart action */}
          <button
            type="button"
            onClick={handleCartAction}
            disabled={cartLoading}
            className={`mt-9 flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
              cartItem
                ? "border border-border-strong bg-surface text-text-primary hover:border-error hover:text-error"
                : "bg-brand text-text-inverse hover:bg-brand-hover"
            }`}>
            {cartLoading ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : cartItem ? (
              <Check size={18} />
            ) : (
              <ShoppingBag size={18} />
            )}

            {cartLoading
              ? "Updating your bag..."
              : cartItem
                ? "Remove from bag"
                : "Add to bag"}

            {!cartLoading && !cartItem && <ArrowUpRight size={18} />}
          </button>

          <p className="mt-3 text-center text-xs text-text-muted">
            Your next favourite fragrance could be right here.
          </p>

          {/* Trust details */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
            <div className="flex items-start gap-3">
              <Truck size={19} className="mt-0.5 shrink-0 text-brand" />
              <div>
                <p className="text-sm font-medium">Pan-India delivery</p>
                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  Delivery across India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-brand" />
              <div>
                <p className="text-sm font-medium">Made for you</p>
                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  A curated fragrance experience
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mt-8 inline-flex items-center gap-2 self-start text-sm text-text-secondary transition-colors hover:text-brand">
            Prefer individual fragrances?
            <span className="font-medium underline underline-offset-4">
              Explore the shop
            </span>
            <ArrowUpRight size={15} />
          </button>
        </motion.div>
      </section>

      {/* Supporting sections */}
      <section className="border-t border-border bg-surface">
        <WhyChooseWhiff />
      </section>

      <Footer />
    </main>
  );
};

export default ComboCard;
