import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import {
  Package,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  CalendarDays,
  ReceiptText,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const OrderSection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    try {
      setError(false);

      const res = await fetch(`${URL}/api/orders`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Unable to retrieve your orders.");
      }

      const data = await res.json();

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch (err) {
      console.error("Order fetch failed:", err);
      setError(true);
      toast.error(err.message || "Error connecting to server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleCopy = async (orderId) => {
    if (!orderId) {
      toast.error("Order ID is unavailable");
      return;
    }

    try {
      await navigator.clipboard.writeText(String(orderId));
      setCopiedId(orderId);
      toast.success("Order ID copied");
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Couldn't copy the order ID");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatStatus = (status) => {
    if (!status) return "Placed";

    return String(status)
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  };

  const getStatusStyle = (status) => {
    const normalized = String(status || "placed").toLowerCase();

    if (normalized.includes("deliver") || normalized.includes("complete")) {
      return "border-[#C9DFCF] bg-[#EDF5EF] text-[#47765A]";
    }

    if (
      normalized.includes("cancel") ||
      normalized.includes("fail") ||
      normalized.includes("refund")
    ) {
      return "border-[#E9CDCD] bg-[#FAEEEE] text-[#A34444]";
    }

    if (
      normalized.includes("pending") ||
      normalized.includes("process") ||
      normalized.includes("ship")
    ) {
      return "border-[#E8D9BC] bg-[#F8F1E5] text-[#8C7040]";
    }

    return "border-border bg-surface-secondary text-text-secondary";
  };

  if (loading) {
    return (
      <section className="min-w-0 flex-1 bg-background px-4 py-8 text-text-primary sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-8 h-9 w-56 rounded bg-surface-secondary" />

          <div className="space-y-5">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-surface p-5 sm:p-7">
                <div className="h-5 w-40 rounded bg-surface-secondary" />
                <div className="mt-5 h-4 w-3/4 rounded bg-surface-secondary" />
                <div className="mt-4 h-4 w-1/2 rounded bg-surface-secondary" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex min-h-[400px] min-w-0 flex-1 items-center justify-center bg-background px-5 py-12 text-text-primary">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-rose text-brand">
            <RefreshCw size={25} strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-3xl">
            Your orders are out of reach.
          </h2>

          <p className="mt-3 text-sm leading-6 text-text-secondary">
            We couldn't retrieve your order history. Please try again.
          </p>

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              fetchOrders();
            }}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-text-inverse transition hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-w-0 flex-1 bg-background px-4 py-6 text-text-primary sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8 border-b border-border pb-6 sm:mb-10 sm:pb-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brand">
            <Package size={15} strokeWidth={1.5} />
            <span>Your fragrance journey</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
                Your orders<span className="text-brand">.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
                Every order has a story. Find your purchase details and revisit
                the fragrances you chose.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-text-secondary">
              <ReceiptText size={14} className="text-brand" />
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </span>
          </div>
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-border bg-surface px-5 py-12 text-center">
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-surface-rose">
              <ShoppingBag size={37} strokeWidth={1.2} className="text-brand" />
              <Sparkles
                size={17}
                className="absolute right-2 top-2 text-accent"
              />
            </div>

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand">
              Your story starts here
            </p>

            <h2 className="font-display text-3xl sm:text-4xl">
              No orders just yet.
            </h2>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-text-secondary">
              Your next signature scent is waiting to be discovered. Explore the
              collection when you're ready.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand px-7 py-3 text-sm font-medium text-text-inverse transition duration-300 hover:-translate-y-0.5 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              Explore fragrances
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {orders.map((order, index) => (
              <motion.article
                key={order._id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: prefersReducedMotion ? 0 : index * 0.06,
                }}
                className="overflow-hidden rounded-2xl border border-border bg-surface transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(41,35,33,0.05)]">
                {/* Order header */}
                <div className="border-b border-border bg-surface-secondary/50 p-4 sm:p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                        <ReceiptText size={14} />
                        Order reference
                      </div>

                      <div className="mt-2 flex min-w-0 items-center gap-2">
                        <p className="break-all font-medium text-text-primary">
                          {order.orderId || "ID unavailable"}
                        </p>

                        {order.orderId && (
                          <button
                            type="button"
                            onClick={() => handleCopy(order.orderId)}
                            aria-label="Copy order ID"
                            title="Copy order ID"
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition hover:border-brand-muted hover:bg-surface-rose hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                            {copiedId === order.orderId ? (
                              <Check size={15} />
                            ) : (
                              <Copy size={15} />
                            )}
                          </button>
                        )}
                      </div>

                      <p className="mt-2 flex items-center gap-2 text-xs text-text-muted">
                        <CalendarDays size={13} />
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                        order.status,
                      )}`}>
                      {formatStatus(order.status)}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4 p-4 sm:p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Order details
                  </p>

                  {Array.isArray(order.items) && order.items.length > 0 ? (
                    <div className="space-y-3">
                      {order.items.map((item, itemIndex) => (
                        <div
                          key={item._id || `${order._id}-${itemIndex}`}
                          className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="break-words text-sm font-medium text-text-primary">
                              {item.name || "Fragrance"}
                            </p>

                            {item.volume && (
                              <p className="mt-1 text-xs text-text-secondary">
                                Volume: {item.volume}
                              </p>
                            )}
                          </div>

                          <p className="shrink-0 text-sm font-medium tabular-nums">
                            ₹{Number(item.price || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-text-secondary">
                      Item details are unavailable for this order.
                    </p>
                  )}

                  {/* Total */}
                  <div className="flex items-center justify-between gap-4 border-t border-dashed border-border pt-4">
                    <div>
                      <p className="text-sm font-medium">Order total</p>
                      <p className="mt-1 text-xs text-text-muted">
                        As recorded for this order
                      </p>
                    </div>

                    <p className="font-display text-2xl tabular-nums">
                      ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-surface-secondary/60 p-4 sm:p-5">
            <Sparkles
              size={17}
              className="mt-0.5 shrink-0 text-accent"
              strokeWidth={1.5}
            />
            <p className="text-sm leading-6 text-text-secondary">
              Keep your order reference handy if you need help with a purchase.
              You can copy the order ID directly from each card.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderSection;
