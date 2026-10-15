import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  Package,
  Settings2,
  ShoppingBag,
  UserRound,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import Profile from "../components/Profile";
import Settings from "../components/Settings";
import WishlistSection from "../components/WishlistSection";
import CartSection from "../components/CartSection";
import OrderSection from "../components/OrderSection";

const URL = import.meta.env.VITE_BACKEND_URL;

const tabs = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "cart", label: "Cart", icon: ShoppingBag },
  { id: "order", label: "Orders", icon: Package },
  { id: "settings", label: "Settings", icon: Settings2 },
];

const Account = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(`${URL}/account/profile`, {
        credentials: "include",
      });

      if (res.status === 401 || res.status === 403) {
        navigate("/account/auth", { replace: true });
        return;
      }

      if (!res.ok) {
        throw new Error(`Failed to load account: ${res.status}`);
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Account profile error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const selectTab = (tabId) => {
    setActiveTab(tabId);
  };

  const activeTabDetails = tabs.find((tab) => tab.id === activeTab);
  const ActiveIcon = activeTabDetails?.icon ?? UserRound;

  const pageVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -8,
    },
  };

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-background px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-10 h-3 w-28 rounded bg-surface-secondary" />
          <div className="grid gap-6 md:grid-cols-[240px_1fr]">
            <div className="h-80 rounded-2xl bg-surface-secondary" />
            <div className="h-80 rounded-2xl bg-surface-secondary" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-5 text-center">
        <Sparkles size={30} className="mb-5 text-brand" />
        <h1 className="font-display text-3xl">Your space is waiting.</h1>
        <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
          We couldn't load your account details. Check your connection and try
          again.
        </p>

        <button
          type="button"
          onClick={checkAuth}
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
        <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-16">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition hover:text-brand">
            <ArrowLeft size={16} />
            Back to Whiff
          </button>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-brand" />
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                  Your personal space
                </span>
              </div>

              <h1 className="font-display text-4xl leading-tight sm:text-5xl">
                My account<span className="text-brand">.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary sm:text-base">
                Your details, favourite fragrances, and everything you've
                collected along the way.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-text-muted">
              <Sparkles size={15} className="text-accent" />
              <span>A little world of your own</span>
            </div>
          </div>
        </div>
      </section>

      {/* Account dashboard */}
      <section className="mx-auto max-w-[1440px] px-4 py-7 sm:px-8 sm:py-10 lg:px-16 lg:py-14">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_12px_45px_rgba(41,35,33,0.04)] md:grid md:grid-cols-[250px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
          {/* Desktop sidebar */}
          <aside className="hidden border-r border-border bg-surface-secondary/40 p-5 md:block lg:p-6">
            <div className="mb-7 rounded-xl border border-border bg-surface p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-brand">
                <UserRound size={21} />
              </div>

              <p className="mt-4 text-sm font-semibold">
                {user?.firstname
                  ? `Hello, ${user.firstname}`
                  : "Welcome to Whiff"}
              </p>

              <p className="mt-1 break-all text-xs leading-5 text-text-muted">
                {user?.email || "Your fragrance account"}
              </p>
            </div>

            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-muted">
              Manage your account
            </p>

            <nav className="space-y-1" aria-label="Account navigation">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => selectTab(tab.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl px-3.5 py-3 text-left text-sm transition-colors ${
                      isActive
                        ? "font-medium text-brand"
                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                    }`}>
                    {isActive && (
                      <motion.span
                        layoutId="account-active-tab"
                        className="absolute inset-0 rounded-xl border border-brand/15 bg-brand-soft/60"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 350, damping: 30 }
                        }
                      />
                    )}

                    <Icon size={18} className="relative z-10 shrink-0" />
                    <span className="relative z-10 flex-1">{tab.label}</span>

                    {isActive && (
                      <ArrowUpRight size={15} className="relative z-10" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-border pt-5">
              <p className="text-xs leading-6 text-text-muted">
                Good fragrance, good memories. Thanks for being part of Whiff.
              </p>
            </div>
          </aside>

          {/* Mobile tab navigation */}
          <div className="border-b border-border bg-surface px-3 py-3 md:hidden">
            <div
              className="flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Account sections">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectTab(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition ${
                      isActive
                        ? "border-brand bg-brand text-text-inverse"
                        : "border-border bg-background text-text-secondary"
                    }`}>
                    <Icon size={15} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content panel */}
          <div className="min-w-0 p-4 sm:p-6 lg:p-9">
            <div className="mb-7 flex items-center gap-3 border-b border-border pb-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft/60 text-brand">
                <ActiveIcon size={19} />
              </div>

              <div>
                <p className="font-display text-2xl">
                  {activeTabDetails?.label}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  Manage your {activeTabDetails?.label.toLowerCase()} details
                </p>
              </div>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
                className="min-w-0">
                {activeTab === "profile" && <Profile user={user} />}
                {activeTab === "wishlist" && <WishlistSection />}
                {activeTab === "cart" && <CartSection />}
                {activeTab === "order" && <OrderSection />}
                {activeTab === "settings" && <Settings />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Account;
