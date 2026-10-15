import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import Combo1 from "../assets/Combo1-10ML.png";
import Combo2 from "../assets/Combo1-30ML.png";

const combos = [
  {
    id: 1,
    image: Combo1,
    name: "The Mood Spectrum Trio",
    subtitle: "Three scents. Endless moods.",
    label: "THE DISCOVERY SET",
    number: "01",
    tone: "bg-[#F0E7E2]",
    note: "For every version of you",
  },
  {
    id: 2,
    image: Combo2,
    name: "The Breeze & Bloom Duo",
    subtitle: "A little freshness, a little romance.",
    label: "THE SIGNATURE DUO",
    number: "02",
    tone: "bg-[#E9DEDA]",
    note: "Two notes. One feeling.",
  },
];

const easeLuxury = [0.22, 1, 0.36, 1];

const SignatureCollection = () => {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 35 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: {
            duration: 0.85,
            delay,
            ease: easeLuxury,
          },
        };

  return (
    <section
      className="relative overflow-hidden bg-background px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
      aria-labelledby="collection-title">
      <div className="mx-auto max-w-[1440px]">
        {/* Editorial introduction */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <motion.div {...reveal()}>
            <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-brand sm:text-xs">
              <span className="h-px w-10 bg-brand-muted" />A study in fragrance
            </p>

            <h2
              id="collection-title"
              className="max-w-4xl font-serif text-[clamp(3rem,7vw,6.5rem)] font-normal leading-[0.94] tracking-[-0.055em] text-text-primary">
              Every mood,
              <br />
              <span className="italic text-brand">its own signature.</span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Some days call for quiet elegance. Others, a little spontaneity.
              Find a fragrance for every side of your story.
            </p>
          </motion.div>

          <motion.button
            {...reveal(0.15)}
            type="button"
            onClick={() => navigate("/combos")}
            className="group inline-flex w-fit items-center gap-4 border-b border-brand-muted pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-primary transition-colors duration-300 hover:border-brand hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
            Explore the collection
            <ArrowUpRight
              size={17}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </motion.button>
        </div>

        {/* Collection pieces */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:mt-20 sm:grid-cols-2 lg:mt-28 lg:gap-x-12 lg:gap-y-20">
          {combos.map((item, index) => (
            <motion.article
              key={item.id}
              {...reveal(index * 0.16)}
              className={`group min-w-0 ${index === 1 ? "sm:mt-20" : ""}`}>
              {/* Art-directed product panel */}
              <button
                type="button"
                onClick={() => navigate("/combos")}
                aria-label={`Discover ${item.name}`}
                className={`relative block w-full overflow-hidden ${item.tone} text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand`}>
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden sm:aspect-[4/5] lg:aspect-[0.92/1]">
                  {/* Background details */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[68%] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#80535B]/10"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#80535B]/10"
                  />

                  {/* Top editorial label */}
                  <div className="absolute left-5 right-5 top-5 z-10 flex items-center justify-between sm:left-7 sm:right-7 sm:top-7">
                    <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#684149]/80">
                      {item.label}
                    </span>
                    <span className="font-serif text-sm italic text-[#684149]/70">
                      No. {item.number}
                    </span>
                  </div>

                  {/* Product artwork */}
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    initial={false}
                    whileHover={
                      shouldReduceMotion ? undefined : { scale: 1.06, y: -5 }
                    }
                    transition={{
                      duration: 0.8,
                      ease: easeLuxury,
                    }}
                    className="relative z-[1] h-[68%] w-[82%] object-contain drop-shadow-[0_18px_22px_rgba(41,35,33,0.10)] sm:h-[72%] sm:w-[78%]"
                  />

                  {/* Bottom caption */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7">
                    <span className="max-w-[70%] text-[9px] uppercase leading-5 tracking-[0.16em] text-[#684149]/75">
                      {item.note}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#80535B]/25 text-[#684149] transition-all duration-500 group-hover:border-[#80535B] group-hover:bg-[#80535B] group-hover:text-white">
                      <ArrowDownRight
                        size={19}
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </button>

              {/* Product story */}
              <div className="flex items-start justify-between gap-5 border-b border-border py-6 sm:py-7">
                <div>
                  <p className="mb-3 text-[9px] uppercase tracking-[0.22em] text-brand">
                    {item.number} / The collection
                  </p>

                  <h3 className="font-serif text-2xl font-normal leading-tight tracking-[-0.025em] text-text-primary sm:text-3xl">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {item.subtitle}
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/combos")}
                    className="group/link mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-text-primary transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                    Discover this set
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <span
                  aria-hidden="true"
                  className="shrink-0 font-serif text-4xl font-normal tracking-[-0.06em] text-brand/25 sm:text-5xl">
                  {item.number}
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing transition into the brand story */}
        <motion.div
          {...reveal(0.1)}
          className="mt-20 flex flex-col items-center text-center sm:mt-28">
          <span
            aria-hidden="true"
            className="mb-6 h-12 w-px bg-brand-muted/70"
          />

          <p className="font-serif text-2xl italic text-text-primary sm:text-3xl">
            Your scent. Your story.
          </p>

          <p className="mt-3 text-[9px] uppercase tracking-[0.24em] text-text-muted">
            Find the one that feels like you
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SignatureCollection;
