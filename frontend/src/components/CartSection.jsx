import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  ArrowUpRight,
  Sparkles,
  Tag,
  ShieldCheck,
  RefreshCw,
  PackageCheck,
} from "lucide-react";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const CartSection = () => {
  const [cart, setCart] = useState([]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const fetchCart = useCallback(async () => {
    try {
      setError(false);

      const res = await fetch(`${URL}/cart`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setCart([]);
        toast.error("Please log in again");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to load your cart");
      }

      setCart(Array.isArray(data.cart) ? data.cart : []);
    } catch (err) {
      console.error("Cart fetch failed:", err);
      setError(true);
      toast.error(err.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${URL}/account/profile`, {
        credentials: "include",
      });

      if (!res.ok) return;

      const user = await res.json();
      setHasDiscount(user.isFirstLogin === true);
    } catch (err) {
      console.error("Profile fetch failed:", err);
    }
  }, []);

  useEffect(() => {
    fetchCart();
    fetchProfile();
  }, [fetchCart, fetchProfile]);

  const getFinalPrice = (cartItem) => {
    const basePrice = Number(cartItem?.price) || 0;

    return hasDiscount ? Math.round(basePrice * 0.9) : basePrice;
  };

  const subtotal = cart.reduce(
    (total, item) => total + (Number(item?.price) || 0),
    0,
  );

  const total = cart.reduce((sum, item) => sum + getFinalPrice(item), 0);

  const savings = subtotal - total;

  const handleClick = (item, slug) => {
    if (!item || !slug) {
      toast.error("This product is currently unavailable.");
      return;
    }

    navigate(`/${item}/${encodeURIComponent(slug)}`);
  };

  const removeFromCart = async (id) => {
    if (!id || removingId) return;

    setRemovingId(id);

    try {
      const res = await fetch(`${URL}/cart/remove/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (data.status === "success") {
        setCart((previous) =>
          previous.filter((item) => String(item._id) !== String(id)),
        );

        toast.success(data.message || "Item removed from your cart");
      } else {
        toast.error(data.message || "Unable to remove this item");
      }
    } catch (err) {
      console.error("Cart removal failed:", err);
      toast.error("Error removing item");
    } finally {
      setRemovingId(null);
    }
  };

  const handleCheckout = () => {
    if (!cart.length) {
      toast.error("Your cart is empty");
      return;
    }

    navigate("/checkout", {
      state: { cartId: cart[0]._id },
    });
  };

  if (loading) {
    return (
      <section className="min-w-0 flex-1 bg-background px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="mb-8 h-9 w-52 rounded bg-surface-secondary" />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border bg-surface p-4">
                  <div className="aspect-[4/4.5] rounded-xl bg-surface-secondary" />
                  <div className="mt-5 h-4 w-2/3 rounded bg-surface-secondary" />
                  <div className="mt-3 h-4 w-1/3 rounded bg-surface-secondary" />
                </div>
              ))}
            </div>

            <div className="h-72 rounded-2xl bg-surface-secondary" />
          </div>
        </div>
      </section>
    );
  }

  if (error && cart.length === 0) {
    return (
      <section className="flex min-h-[400px] min-w-0 flex-1 items-center justify-center bg-background px-5 py-12 text-text-primary">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-rose text-brand">
            <RefreshCw size={25} strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-3xl">
            Your cart is taking a break.
          </h2>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            We couldn't load your items right now. Please try again.
          </p>

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              fetchCart();
            }}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-text-inverse transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="flex min-h-[420px] min-w-0 flex-1 items-center justify-center bg-background px-5 py-12 text-text-primary">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-md text-center">
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-rose">
            <ShoppingBag size={38} strokeWidth={1.2} className="text-brand" />

            <Sparkles
              size={17}
              className="absolute right-2 top-2 text-accent"
            />
          </div>

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand">
            Your fragrance journey
          </p>

          <h2 className="font-display text-3xl sm:text-4xl">
            Room for something lovely.
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-text-secondary">
            Your bag is waiting for a fragrance that feels like you. Explore the
            collection and find your next favourite.
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
        {/* Page heading */}
        <div className="mb-8 border-b border-border pb-6 sm:mb-10 sm:pb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand">
            <ShoppingBag size={15} strokeWidth={1.5} />
            <span>Your selection</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                Your bag<span className="text-brand">.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
                Beautiful fragrances, thoughtfully chosen. Your next favourite
                is just a step away.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-text-secondary">
              <ShoppingBag size={14} className="text-brand" />
              {cart.length} {cart.length === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Cart items */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
            {cart.map((item, index) => {
              const product = item.item;
              const isRemoving = String(removingId) === String(item._id);

              return (
                <motion.article
                  key={item._id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: prefersReducedMotion ? 0 : index * 0.06,
                  }}
                  className="group min-w-0 overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:border-brand-muted hover:shadow-[0_16px_40px_rgba(41,35,33,0.06)]">
                  {/* Image */}
                  <button
                    type="button"
                    onClick={() =>
                      product &&
                      handleClick(item.itemType?.toLowerCase(), product.slug)
                    }
                    disabled={!product?.slug}
                    aria-label={`View ${product?.name || "cart item"}`}
                    className="relative block w-full overflow-hidden bg-surface-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand disabled:cursor-default">
                    <div className="aspect-[4/4.2] overflow-hidden">
                      {product?.image ? (
                        <img
                          src={product.image}
                          alt={product.name || "Perfume"}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-text-muted">
                          <PackageCheck size={34} strokeWidth={1.2} />
                        </div>
                      )}
                    </div>

                    <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-surface/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-brand backdrop-blur-sm">
                      {item.itemType || "Fragrance"}
                    </span>
                  </button>

                  {/* Details */}
                  <div className="p-4 sm:p-5">
                    <h2 className="truncate font-display text-xl sm:text-2xl">
                      {product?.name || "Saved item"}
                    </h2>

                    {product?.volume && (
                      <p className="mt-1 text-sm text-text-secondary">
                        Volume: {product.volume}
                      </p>
                    )}

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted">
                          Price
                        </p>

                        <p className="mt-1 text-lg font-semibold">
                          ₹{getFinalPrice(item).toLocaleString("en-IN")}
                        </p>

                        {hasDiscount && (
                          <p className="mt-1 text-xs text-success">
                            First-order discount applied
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        disabled={isRemoving || Boolean(removingId)}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-text-secondary transition hover:bg-surface-rose hover:text-brand disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                        <Trash2 size={14} />
                        {isRemoving ? "Removing…" : "Remove"}
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Order summary */}
          <aside className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_8px_30px_rgba(41,35,33,0.04)]">
              <div className="border-b border-border bg-surface-secondary/60 p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand">
                  Almost yours
                </p>

                <h2 className="mt-2 font-display text-2xl sm:text-3xl">
                  Order summary
                </h2>
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 text-sm text-text-secondary">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm text-text-secondary">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {hasDiscount && savings > 0 && (
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="inline-flex items-center gap-2 text-success">
                      <Tag size={14} />
                      First-order discount
                    </span>

                    <span className="font-medium text-success">
                      −₹{savings.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="border-t border-dashed border-border pt-4">
                  <div className="flex items-end justify-between gap-3">
                    <span className="text-sm font-medium">Estimated total</span>

                    <span className="font-display text-2xl">
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-text-muted">
                    Final charges and product prices will be confirmed during
                    checkout.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={Boolean(removingId)}
                  className="group flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-brand px-5 py-4 text-sm font-medium text-text-inverse shadow-[0_8px_24px_rgba(128,83,91,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[0_12px_30px_rgba(128,83,91,0.22)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                  Continue to checkout
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                <div className="flex items-start justify-center gap-2 pt-1 text-center text-xs leading-5 text-text-muted">
                  <ShieldCheck
                    size={15}
                    className="mt-0.5 shrink-0 text-brand"
                  />
                  <span>
                    Your order details will be reviewed before confirmation.
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm text-text-secondary transition hover:border-brand-muted hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              <ShoppingBag size={15} />
              Continue exploring
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
