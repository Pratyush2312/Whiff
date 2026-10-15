import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, Check, Plus } from "lucide-react";

const values = [
  {
    number: "01",
    title: "Everyday luxury",
    description:
      "Thoughtfully crafted fragrances that make feeling extraordinary part of everyday life.",
  },
  {
    number: "02",
    title: "Made for your moments",
    description:
      "Scents designed to accompany your rituals, your celebrations, and the memories you make.",
  },
  {
    number: "03",
    title: "A signature of your own",
    description:
      "Explore different fragrance personalities and find the one that feels unmistakably you.",
  },
];

const easeLuxury = [0.22, 1, 0.36, 1];

const WhyChooseWhiff = () => {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-surface px-6 py-20 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1200px]">
        {/* Editorial brand statement */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeLuxury }}
          className="grid grid-cols-1 gap-8 border-b border-border pb-12 sm:pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.25em] text-brand sm:text-xs">
              <span className="h-px w-9 bg-brand-muted" />
              The details matter
            </p>

            <h2 className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.055em] text-text-primary">
              Thoughtful by
              <br />
              <span className="italic text-brand">nature.</span>
            </h2>
          </div>

          <div className="max-w-lg lg:pb-2">
            <p className="text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              Whiff is for fragrance lovers who want to make scent part of their
              everyday identity. Discover fragrances designed to feel personal,
              expressive, and easy to make your own.
            </p>

            <p className="mt-4 text-[9px] uppercase tracking-[0.2em] text-text-muted">
              More than a fragrance. A feeling.
            </p>
          </div>
        </motion.div>

        {/* Brand principles */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {values.map((value, index) => (
            <motion.article
              key={value.number}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: shouldReduceMotion ? 0 : index * 0.1,
                ease: easeLuxury,
              }}
              className={`group py-8 md:px-7 md:py-10 lg:px-10 ${
                index !== values.length - 1
                  ? "border-b border-border md:border-b-0 md:border-r"
                  : ""
              } ${index === 0 ? "md:pl-0" : ""} ${
                index === values.length - 1 ? "md:pr-0" : ""
              }`}>
              <div className="mb-7 flex items-center justify-between">
                <span className="font-serif text-sm italic text-brand-muted">
                  {value.number}
                </span>

                <ArrowDownRight
                  size={18}
                  strokeWidth={1.3}
                  className="text-brand-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-serif text-2xl font-normal tracking-[-0.025em] text-text-primary transition-colors duration-300 group-hover:text-brand sm:text-3xl">
                {value.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-text-secondary">
                {value.description}
              </p>

              <span className="mt-7 block h-px w-8 bg-brand-muted transition-all duration-500 group-hover:w-16" />
            </motion.article>
          ))}
        </div>

        {/* Delivery and returns */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: easeLuxury }}
          className="mt-14 border-y border-border sm:mt-20">
          <button
            type="button"
            id="delivery-returns-trigger"
            aria-expanded={open}
            aria-controls="delivery-returns-panel"
            onClick={() => setOpen((previous) => !previous)}
            className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8">
            <div>
              <p className="mb-2 text-[9px] uppercase tracking-[0.22em] text-brand">
                The practical details
              </p>

              <h3 className="font-serif text-2xl font-normal tracking-[-0.03em] text-text-primary sm:text-3xl">
                Delivery & Returns
              </h3>

              <p className="mt-2 text-sm text-text-secondary">
                Everything you need to know before your order arrives.
              </p>
            </div>

            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                open
                  ? "rotate-45 border-brand bg-brand text-white"
                  : "border-border text-text-primary group-hover:border-brand group-hover:text-brand"
              }`}>
              <Plus size={18} strokeWidth={1.4} aria-hidden="true" />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="delivery-returns-panel"
                role="region"
                aria-labelledby="delivery-returns-trigger"
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { height: 0, opacity: 0 }
                }
                animate={{ height: "auto", opacity: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { height: 0, opacity: 0 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.4,
                  ease: easeLuxury,
                }}
                className="overflow-hidden">
                <div className="grid grid-cols-1 gap-8 pb-8 sm:grid-cols-2 sm:gap-12 sm:pb-10">
                  {/* Delivery */}
                  <div className="bg-background p-6 sm:p-7">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-surface-rose text-brand">
                      <Check size={18} strokeWidth={1.5} aria-hidden="true" />
                    </div>

                    <h4 className="font-serif text-xl text-text-primary">
                      Delivery details
                    </h4>

                    <p className="mt-4 text-sm leading-7 text-text-secondary">
                      Orders are processed within{" "}
                      <strong className="font-semibold text-text-primary">
                        1–3 business days
                      </strong>
                      . Delivery usually takes{" "}
                      <strong className="font-semibold text-text-primary">
                        3–7 business days
                      </strong>{" "}
                      across India.
                    </p>
                  </div>

                  {/* Returns */}
                  <div className="bg-background p-6 sm:p-7">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-surface-rose text-brand">
                      <ArrowDownRight
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>

                    <h4 className="font-serif text-xl text-text-primary">
                      Returns & exchanges
                    </h4>

                    <p className="mt-4 text-sm leading-7 text-text-secondary">
                      Please contact us about:
                    </p>

                    <ul className="mt-3 space-y-3 text-sm leading-6 text-text-secondary">
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-muted" />
                        Damaged products received in transit
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-muted" />
                        Incorrect items received
                      </li>
                    </ul>

                    <p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-text-muted">
                      Please contact us within{" "}
                      <strong className="text-text-primary">24 hours</strong>{" "}
                      and provide photos or videos of the issue.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Closing statement */}
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-12 text-center font-serif text-xl italic text-brand sm:mt-16 sm:text-2xl">
          Find the scent that feels like you.
        </motion.p>
      </div>
    </section>
  );
};

export default WhyChooseWhiff;
