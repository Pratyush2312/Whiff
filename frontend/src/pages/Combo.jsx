import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  PackageOpen,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const URL = import.meta.env.VITE_BACKEND_URL;

const Combo = () => {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const fetchCombos = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`${URL}/combos`);

      if (!response.ok) {
        throw new Error("Failed to fetch combos");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected combos response");
      }

      setCombos(data);
    } catch (err) {
      console.error("Error loading combos:", err);
      setError(true);
      toast.error("Couldn't load our fragrance collections.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCombos();
  }, [fetchCombos]);

  const handleClick = (slug) => {
    if (!slug) {
      toast.error("Details for this combo are unavailable.");
      return;
    }

    navigate(`/combo/${encodeURIComponent(slug)}`);
  };

  const reveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-text-primary">
      {/* Editorial hero */}
      <section className="relative border-b border-border bg-surface-rose/40">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand-soft/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-16 lg:py-32">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={reveal}
            transition={{ duration: shouldReduceMotion ? 0 : 0.7 }}
            className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-brand" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">
                The Whiff edit
              </span>
            </div>

            <h1 className="font-display text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              More than a scent.
              <span className="mt-2 block italic text-brand">
                A little collection.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
              Discover fragrances that belong together. Thoughtfully paired
              combinations for your everyday rituals, special occasions, and
              every mood in between.
            </p>

            <button
              onClick={() =>
                document.getElementById("combo-collection")?.scrollIntoView({
                  behavior: shouldReduceMotion ? "auto" : "smooth",
                  block: "start",
                })
              }
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3.5 text-sm font-medium text-text-inverse transition-colors duration-300 hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
              Explore the collection
              <ArrowDown size={16} />
            </button>
          </motion.div>

          <div className="mt-14 flex items-center gap-3 text-sm text-text-muted sm:mt-20">
            <Sparkles size={16} className="text-accent" />
            <span>Curated fragrance pairings, the Whiff way.</span>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section
        id="combo-collection"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Find your pairing
            </p>
            <h2 className="font-display text-3xl sm:text-4xl">
              The combo collection
            </h2>
          </div>

          {!loading && !error && combos.length > 0 && (
            <p className="text-sm text-text-muted">
              {combos.length}{" "}
              {combos.length === 1 ? "collection" : "collections"}
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Loading fragrance combos"
              aria-busy="true">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-border bg-surface p-4">
                  <div className="aspect-[4/4.2] animate-pulse rounded-xl bg-surface-secondary" />
                  <div className="mt-6 h-3 w-1/3 animate-pulse rounded bg-surface-secondary" />
                  <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-surface-secondary" />
                  <div className="mt-6 h-11 animate-pulse rounded-full bg-surface-secondary" />
                </div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <RefreshCw size={28} className="mb-5 text-brand" />
              <h3 className="font-display text-2xl">
                A little pause in the collection.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
                We couldn't bring up our fragrance combos right now. Please try
                again.
              </p>
              <button
                onClick={fetchCombos}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-medium text-text-inverse transition hover:bg-brand-hover">
                <RefreshCw size={15} />
                Try again
              </button>
            </motion.div>
          ) : combos.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
              <PackageOpen size={32} className="mb-5 text-brand" />
              <h3 className="font-display text-2xl">
                Something lovely is brewing.
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">
                Our curated combos will be here soon. In the meantime, explore
                the individual fragrances.
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 text-sm font-medium transition hover:border-brand hover:text-brand">
                Explore fragrances
                <ArrowUpRight size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="collection"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.09,
                  },
                },
              }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
              {combos.map((combo, index) => (
                <motion.article
                  key={combo._id}
                  variants={reveal}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface transition duration-500 hover:-translate-y-1 hover:border-brand-muted/60 hover:shadow-[0_18px_50px_rgba(41,35,33,0.09)]">
                  <button
                    type="button"
                    onClick={() => handleClick(combo.slug)}
                    aria-label={`View ${combo.name}`}
                    className="relative block w-full overflow-hidden bg-surface-secondary text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand">
                    <div className="aspect-[4/4.2] overflow-hidden">
                      {combo.image ? (
                        <img
                          src={combo.image}
                          alt={combo.name || "Whiff fragrance combo"}
                          loading={index < 3 ? "eager" : "lazy"}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Sparkles size={36} className="text-brand-muted" />
                        </div>
                      )}
                    </div>

                    <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-background/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-primary backdrop-blur-sm">
                      Whiff collection
                    </span>

                    <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-surface text-text-primary opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight size={19} />
                    </span>
                  </button>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                      Pairing no. {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="font-display text-2xl leading-snug text-text-primary transition-colors group-hover:text-brand">
                      {combo.name}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      A considered combination, made for the moments that
                      deserve a scent of their own.
                    </p>

                    <button
                      type="button"
                      onClick={() => handleClick(combo.slug)}
                      className="mt-7 flex w-full items-center justify-between border-t border-border pt-5 text-sm font-medium text-text-primary transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4">
                      <span>Discover this combo</span>
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Closing brand note */}
      <section className="border-t border-border bg-surface-rose/30">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Sparkles size={22} className="mx-auto mb-5 text-accent" />
          <h2 className="font-display text-3xl leading-tight sm:text-4xl">
            Your next favourite might come in two.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-text-secondary sm:text-base">
            Explore combinations, discover unexpected favourites, and find the
            scents that feel unmistakably yours.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Combo;
