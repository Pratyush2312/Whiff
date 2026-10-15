import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const values = [
  {
    number: "01",
    title: "Crafted with care",
    description:
      "Every fragrance is thoughtfully developed, with attention paid to every detail.",
    accent: "The art of perfumery",
  },
  {
    number: "02",
    title: "Inspired by nature",
    description:
      "Inspired by nature's most beautiful notes and the moments that stay with us.",
    accent: "Nature, reimagined",
  },
  {
    number: "03",
    title: "Designed to last",
    description:
      "Distinctive scents made to accompany your everyday rituals and special moments.",
    accent: "Made for your moments",
  },
];

const easeLuxury = [0.22, 1, 0.36, 1];

const Whiff = () => {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
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
      id="our-story"
      className="overflow-hidden bg-surface px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
      aria-labelledby="whiff-title">
      <div className="mx-auto max-w-[1440px]">
        {/* Editorial introduction */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <motion.div {...reveal()}>
            <p className="mb-7 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em] text-brand sm:text-xs">
              <span className="h-px w-10 bg-brand-muted" />
              The Whiff philosophy
            </p>

            <h2
              id="whiff-title"
              className="font-serif text-[clamp(3.5rem,8vw,7rem)] font-normal leading-[0.9] tracking-[-0.06em] text-text-primary">
              Scent is
              <br />
              <span className="italic text-brand">personal.</span>
              <br />
              Make it yours.
            </h2>
          </motion.div>

          <motion.div {...reveal(0.15)} className="pb-2 lg:pb-4">
            <span
              aria-hidden="true"
              className="mb-6 block h-px w-16 bg-brand-muted"
            />

            <p className="max-w-md text-base leading-8 text-text-secondary sm:text-lg sm:leading-9">
              We believe fragrance is more than what you wear. It's the
              atmosphere you create, the memories you carry, and the quiet
              impression you leave behind.
            </p>

            <p className="mt-5 font-serif text-lg italic text-brand">
              More than a fragrance. A feeling.
            </p>
          </motion.div>
        </div>

        {/* Brand principles */}
        <div className="mt-20 border-t border-border sm:mt-28 lg:mt-36">
          {values.map((value, index) => (
            <motion.article
              key={value.number}
              {...reveal(index * 0.12)}
              className="group grid grid-cols-[42px_1fr] gap-4 border-b border-border py-8 sm:grid-cols-[72px_1fr_1fr_40px] sm:items-center sm:gap-6 sm:py-10 lg:gap-10 lg:py-12">
              <span className="pt-1 font-serif text-sm italic text-brand-muted sm:text-base">
                {value.number}
              </span>

              <h3 className="font-serif text-2xl font-normal leading-tight tracking-[-0.035em] text-text-primary transition-colors duration-500 group-hover:text-brand sm:text-3xl lg:text-4xl">
                {value.title}
              </h3>

              <div className="col-start-2 sm:col-start-auto">
                <p className="max-w-sm text-sm leading-7 text-text-secondary">
                  {value.description}
                </p>

                <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-brand">
                  {value.accent}
                </p>
              </div>

              <span
                aria-hidden="true"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-border text-brand transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-white sm:flex">
                <ArrowDownRight size={18} strokeWidth={1.4} />
              </span>
            </motion.article>
          ))}
        </div>

        {/* Brand manifesto */}
        <motion.div
          {...reveal(0.1)}
          className="relative mt-20 overflow-hidden bg-surface-dark px-6 py-16 text-text-inverse sm:mt-28 sm:px-12 sm:py-24 lg:px-20 lg:py-28">
          {/* Decorative rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full border border-white/[0.08] sm:-right-12 sm:-top-40 sm:h-[440px] sm:w-[440px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border border-white/[0.08] sm:right-8 sm:-top-24 sm:h-[340px] sm:w-[340px]"
          />

          <div className="relative z-10 max-w-4xl">
            <p className="mb-7 text-[9px] font-medium uppercase tracking-[0.28em] text-brand-muted sm:text-[10px]">
              A note from Whiff
            </p>

            <p className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.05em]">
              The best things aren't always seen.
              <br />
              <span className="italic text-[#D5B5BA]">
                Sometimes, they're remembered.
              </span>
            </p>

            <div className="mt-10 flex items-center gap-4 sm:mt-14">
              <span className="h-px w-12 bg-brand-muted" />
              <span className="text-[9px] uppercase tracking-[0.22em] text-white/60">
                Whiff · Your signature, your story
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Whiff;
