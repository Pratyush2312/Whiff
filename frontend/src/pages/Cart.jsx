import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Package,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`${URL}/cart`, {
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        toast.error("Please log in to view your bag.");
        navigate("/account/auth", { replace: true });
        return;
      }

      if (!res.ok) {
        throw new Error(`Cart request failed: ${res.status}`);
      }

      const data = await res.json();
      setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (err) {
      console.error("Cart fetch error:", err);
      setError(true);
      toast.error("Couldn't load your shopping bag.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

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

  useEffect(() => {
    fetchCart();
    fetchProfile();
  }, [fetchCart, fetchProfile]);

  const getBasePrice = (item) => Number(item.price) || 0;

  const getFinalPrice = (item) => {
    const price = getBasePrice(item);
    return hasDiscount ? Math.round(price * 0.9) : price;
  };

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + getBasePrice(item), 0);

    const total = cart.reduce((sum, item) => sum + getFinalPrice(item), 0);

    return {
      subtotal,
      total,
      savings: subtotal - total,
      count: cart.length,
    };
  }, [cart, hasDiscount]);

  const removeFromCart = async (cartId) => {
    if (!cartId || removingId) return;

    setRemovingId(cartId);

    try {
      const res = await fetch(`${URL}/cart/remove/${cartId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.status !== "success") {
        if (res.status === 401 || res.status === 403) {
          toast.error("Please log in to manage your bag.");
          navigate("/account/auth", { replace: true });
          return;
        }

        throw new Error(data.message || "Couldn't remove this item");
      }

      setCart((current) =>
        current.filter((item) => String(item._id) !== String(cartId)),
      );

      toast.success(data.message || "Removed from your bag.");
    } catch (err) {
      console.error("Remove cart item error:", err);
      toast.error("Couldn't remove this item. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  const handleProductClick = (item) => {
    const product = item.item || item.combo;
    if (!product?.slug) return;

    const route =
      item.combo || item.itemType?.toLowerCase() === "combo"
        ? "/combo"
        : "/perfume";

    navigate(`${route}/${encodeURIComponent(product.slug)}`);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your bag is empty.");
      return;
    }

    navigate("/checkout", {
      state: { cartId: cart[0]._id },
    });
  };

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-background px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[1280px] animate-pulse">
          <div className="mb-5 h-3 w-28 rounded bg-surface-secondary" />
          <div className="mb-10 h-10 w-64 rounded bg-surface-secondary" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="h-56 rounded-2xl bg-surface-secondary" />
            <div className="h-80 rounded-2xl bg-surface-secondary" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-5 text-center">
        <RefreshCw size={28} className="mb-5 text-brand" />
        <h1 className="font-display text-3xl">Your bag is waiting.</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
          We couldn't retrieve your cart. Please try again.
        </p>
        <button
          type="button"
          onClick={fetchCart}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-text-inverse transition hover:bg-brand-hover">
          <RefreshCw size={16} />
          Try again
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* Editorial header */}
      <section className="border-b border-border bg-surface-rose/30">
        <div className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-16">
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-brand">
            <ArrowLeft size={16} />
            Continue shopping
          </button>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-brand" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Almost yours
                </span>
              </div>

              <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Your bag<span className="text-brand">.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
                Your chosen fragrances, gathered in one place. Take one last
                look before they become part of your story.
              </p>
            </div>

            {cart.length > 0 && (
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-surface px-4 py-2.5 text-sm text-text-secondary sm:self-auto">
                <ShoppingBag size={16} className="text-brand" />
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
        {cart.length === 0 ? (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-16 text-center sm:py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-soft/60 text-brand">
              <ShoppingBag size={27} strokeWidth={1.5} />
            </div>

            <h2 className="mt-6 font-display text-3xl">
              Your bag is taking a breather.
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-text-secondary">
              There are no fragrances here just yet. Explore the collection and
              find something that feels like you.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-text-inverse transition hover:bg-brand-hover">
              Discover fragrances
              <ArrowRight size={16} />
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
            {/* Cart items */}
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-2xl">Your selections</h2>
                <span className="text-xs text-text-muted">Prices in INR</span>
              </div>

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
                className="space-y-4">
                <AnimatePresence initial={false}>
                  {cart.map((item) => {
                    const product = item.combo || item.item;
                    if (!product) return null;

                    const finalPrice = getFinalPrice(item);
                    const basePrice = getBasePrice(item);
                    const isRemoving = String(removingId) === String(item._id);

                    return (
                      <motion.article
                        key={item._id}
                        layout={!shouldReduceMotion}
                        variants={reveal}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, x: 16, height: 0 }
                        }
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.25,
                        }}
                        className="flex min-w-0 flex-col gap-5 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:p-5">
                        {/* Image */}
                        <button
                          type="button"
                          onClick={() => handleProductClick(item)}
                          aria-label={`View ${product.name}`}
                          className="group relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-secondary sm:aspect-square sm:w-36 md:w-40">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name || "Whiff fragrance"}
                              loading="lazy"
                              className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <Sparkles size={28} className="text-brand-muted" />
                          )}

                          <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-brand opacity-0 transition group-hover:opacity-100">
                            <ArrowUpRight size={15} />
                          </span>
                        </button>

                        {/* Details */}
                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                            {item.combo
                              ? "Fragrance collection"
                              : "Whiff fragrance"}
                          </p>

                          <button
                            type="button"
                            onClick={() => handleProductClick(item)}
                            className="mt-2 self-start text-left font-display text-xl leading-snug transition hover:text-brand sm:text-2xl">
                            {product.name}
                          </button>

                          {!item.combo && item.volume && (
                            <p className="mt-2 text-sm text-text-secondary">
                              Volume: {item.volume}
                            </p>
                          )}

                          {item.combo && Array.isArray(item.combo.perfume) && (
                            <ul className="mt-2 space-y-1 text-xs leading-5 text-text-secondary">
                              {item.combo.perfume.map((p, index) => (
                                <li key={p._id || index}>
                                  {p.perfume?.name || "Fragrance"}
                                  {p.volume ? ` · ${p.volume}` : ""}
                                </li>
                              ))}
                            </ul>
                          )}

                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <span className="text-lg font-semibold tabular-nums">
                              ₹{finalPrice}
                            </span>

                            {hasDiscount && basePrice > finalPrice && (
                              <>
                                <span className="text-sm text-text-muted line-through">
                                  ₹{basePrice}
                                </span>
                                <span className="rounded-full bg-brand-soft/60 px-2.5 py-1 text-[10px] font-semibold text-brand">
                                  10% OFF
                                </span>
                              </>
                            )}
                          </div>

                          <button
                            type="button"
                            disabled={isRemoving}
                            onClick={() => removeFromCart(item._id)}
                            className="mt-4 inline-flex items-center gap-2 self-start text-xs font-medium text-text-muted transition hover:text-error disabled:cursor-not-allowed disabled:opacity-60">
                            {isRemoving ? (
                              <RefreshCw size={14} className="animate-spin" />
                            ) : (
                              <Trash2 size={14} />
                            )}
                            {isRemoving ? "Removing..." : "Remove item"}
                          </button>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </section>

            {/* Order summary */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-display text-2xl">Order summary</h2>
                  <ShoppingBag size={19} className="text-brand" />
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4 text-text-secondary">
                    <span>Subtotal ({totals.count} items)</span>
                    <span className="tabular-nums">₹{totals.subtotal}</span>
                  </div>

                  {hasDiscount && totals.savings > 0 && (
                    <div className="flex items-center justify-between gap-4 text-success">
                      <span className="flex items-center gap-2">
                        <Sparkles size={15} />
                        First-order savings
                      </span>
                      <span className="tabular-nums">−₹{totals.savings}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 text-text-secondary">
                    <span>Shipping</span>
                    <span className="text-xs">Calculated at checkout</span>
                  </div>

                  <div className="border-t border-border pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-medium">Estimated total</span>
                      <span className="font-display text-2xl tabular-nums">
                        ₹{totals.total}
                      </span>
                    </div>
                    <p className="mt-2 text-[11px] leading-5 text-text-muted">
                      Final payable amount is confirmed at checkout.
                    </p>
                  </div>
                </div>

                {hasDiscount && totals.savings > 0 && (
                  <div className="mt-5 flex items-start gap-3 rounded-xl bg-brand-soft/50 p-3.5">
                    <Check size={16} className="mt-0.5 shrink-0 text-brand" />
                    <p className="text-xs leading-5 text-brand">
                      Your 10% first-order offer is reflected in this estimate.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-4 text-sm font-semibold text-text-inverse transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                  Proceed to checkout
                  <ArrowRight size={17} />
                </button>

                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-text-muted">
                  <ShieldCheck size={15} />
                  Secure checkout
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-surface p-4">
                  <Truck size={19} className="mb-3 text-brand" />
                  <p className="text-xs font-medium">Pan-India delivery</p>
                  <p className="mt-1 text-[11px] leading-5 text-text-muted">
                    Delivery details at checkout
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-surface p-4">
                  <Package size={19} className="mb-3 text-brand" />
                  <p className="text-xs font-medium">Carefully packed</p>
                  <p className="mt-1 text-[11px] leading-5 text-text-muted">
                    Made for your fragrance ritual
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="mt-5 inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-brand">
                <ArrowLeft size={15} />
                Keep exploring
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;
